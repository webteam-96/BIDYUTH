import { useEffect, useRef, useState } from 'react';
import { PRICING, URLS } from '../data/event';
import { gsap } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { priceLabel, useActivePhase, type PhaseView } from '../hooks/useActivePhase';
import { Countdown } from '../components/Countdown';
import { MagneticButton } from '../components/MagneticButton';
import { SectionLabel, SplitText } from '../components/SplitText';

function Card({ p, isNext }: { p: PhaseView; isNext: boolean }) {
  const closed = p.status === 'closed';
  const active = p.status === 'active';
  return (
    <article
      data-price-card
      aria-current={active ? 'true' : undefined}
      className={`relative flex min-h-[21rem] w-[76vw] max-w-[22rem] shrink-0 snap-center flex-col rounded-[28px] border-2 border-ink p-5 shadow-[6px_6px_0_var(--ink)] md:w-[44vw] md:p-6 lg:w-auto lg:max-w-none ${
        active ? 'pulse-glow bg-secondary text-bg' : 'bg-bg'
      } ${closed ? 'opacity-70' : ''}`}
    >
      <div className="mb-auto flex min-h-8 items-center justify-between gap-2">
        <h3 className="mono text-label font-bold">{p.label}</h3>
        {active && <span className="sticker rotate-3 bg-bg text-ink">{PRICING.activeLabel}</span>}
        {isNext && <span className="sticker -rotate-2 bg-bg !shadow-none">{PRICING.upcoming}</span>}
      </div>
      <p className={`display my-6 tabular-nums ${p.price == null ? 'text-display-sm' : 'text-price'} ${closed ? 'line-through decoration-[3px]' : ''}`}>{priceLabel(p)}</p>
      <p className="mono text-label">{p.deadlineLabel}</p>
      {active && p.deadline && (
        <div className="mt-4 rounded-2xl bg-ink px-4 py-3 text-bg">
          <p className="mono mb-1 text-label opacity-70">{PRICING.endsIn}</p>
          <Countdown to={p.deadline} tone="light" />
        </div>
      )}
      {/* charge bar */}
      <div className="mt-5 h-2 overflow-hidden rounded-full border border-ink/40" aria-hidden="true">
        <div data-charge className={`h-full origin-left ${active ? 'bg-ink' : closed ? 'bg-ink/40' : 'bg-primary'}`} />
      </div>
      {closed && (
        <span className="display pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-xl border-4 border-ink px-4 py-1 text-display-sm text-ink/80 mix-blend-multiply">
          {PRICING.closed.toUpperCase()}
        </span>
      )}
    </article>
  );
}

export function Pricing() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { list: phases, active } = useActivePhase();
  // phases without a price yet (Regular = TBA) stay hidden until a price is set
  const list = phases.filter((p) => p.price != null);
  const activeIdx = list.findIndex((p) => p.status === 'active');
  const [slide, setSlide] = useState(activeIdx);

  const cardAt = (i: number) => track.current?.querySelectorAll<HTMLElement>('[data-price-card]')[i];
  const centerOn = (i: number, smooth: boolean) => {
    const t = track.current;
    const c = cardAt(i);
    if (!t || !c || t.scrollWidth <= t.clientWidth) return;
    t.scrollTo({ left: c.offsetLeft - (t.clientWidth - c.offsetWidth) / 2, behavior: smooth ? 'smooth' : 'auto' });
  };

  // carousel: start centred on the active phase, keep dots in sync with swipe
  useEffect(() => {
    centerOn(activeIdx, false);
    const t = track.current!;
    const onScroll = () => {
      const mid = t.scrollLeft + t.clientWidth / 2;
      let best = 0;
      t.querySelectorAll<HTMLElement>('[data-price-card]').forEach((c, i) => {
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        const bd = Math.abs((cardAt(best)?.offsetLeft ?? 0) + (cardAt(best)?.offsetWidth ?? 0) / 2 - mid);
        if (d < bd) best = i;
      });
      setSlide(best);
    };
    t.addEventListener('scroll', onScroll, { passive: true });
    return () => t.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  useScrollTrigger(root, ({ reduce, desktop }) => {
    if (reduce) return;
    const cards = gsap.utils.toArray<HTMLElement>('[data-price-card]');
    const bars = gsap.utils.toArray<HTMLElement>('[data-charge]');
    if (desktop) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: '+=140%', pin: true, scrub: 0.6 } });
      cards.forEach((c, i) => {
        tl.from(c, { x: () => window.innerWidth, rotation: 8, ease: 'power3.out', duration: 1 }, i * 0.45);
        tl.from(bars[i], { scaleX: 0, ease: 'none', duration: 0.5 }, i * 0.45 + 0.7);
      });
    } else {
      // mobile: cards rise in with stagger, then charge bars fill
      const st = { trigger: track.current, start: 'top 85%' };
      gsap.from(cards, { y: 48, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: st });
      gsap.from(bars, { scaleX: 0, duration: 1, delay: 0.4, stagger: 0.15, ease: 'power2.out', scrollTrigger: st });
    }
  });

  const firstUpcoming = list.findIndex((p) => p.status === 'upcoming');

  return (
    <section ref={root} id="pricing" data-bg="var(--primary-2)" className="relative overflow-hidden bg-primary-2 px-4 py-20 md:px-8 lg:flex lg:min-h-[100svh] lg:items-center lg:py-12">
      <div className="mx-auto w-full max-w-[1400px]">
        <SectionLabel label={PRICING.label} className="mb-6 lg:mb-8" />
        <div className="mb-8 flex flex-col justify-between gap-4 lg:mb-10 lg:flex-row lg:items-end lg:gap-6">
          <SplitText title={PRICING.title} accent={PRICING.titleAccent} />
          <p className="mono text-label">{PRICING.sub}</p>
        </div>
        <div
          ref={track}
          className="no-scrollbar isolate -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[12vw] pb-6 pt-2 md:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0"
        >
          {list.map((p, i) => (
            <Card key={p.id} p={p} isNext={i === firstUpcoming} />
          ))}
        </div>
        <div className="flex justify-center lg:hidden">
          {list.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => centerOn(i, true)}
              aria-label={`${PRICING.dotsLabel}: ${p.label}`}
              aria-current={slide === i ? 'true' : undefined}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span className={`block h-2.5 rounded-full border border-ink transition-all duration-300 ${slide === i ? 'w-7 bg-ink' : 'w-2.5 bg-transparent'}`} />
            </button>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-stretch gap-6 border-t border-ink/30 pt-6 md:mt-8 md:flex-row md:justify-end">
          <MagneticButton href={URLS.REGISTRATION_URL} className="shrink-0 text-lead">
            {PRICING.cta} · {priceLabel(active)}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
