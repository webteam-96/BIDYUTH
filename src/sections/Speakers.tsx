import { useRef } from 'react';
import { SPEAKERS } from '../data/event';
import { gsap, getLenis } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { SectionLabel, SplitText } from '../components/SplitText';
import { ComingSoon } from '../components/ComingSoon';

function Silhouette() {
  return (
    <svg viewBox="0 0 200 260" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMax slice">
      <rect width="200" height="260" fill="#cfe8e6" />
      <circle cx="100" cy="100" r="44" fill="#8fbfbb" />
      <path d="M20 260c6-62 40-96 80-96s74 34 80 96z" fill="#8fbfbb" />
    </svg>
  );
}

function Portrait({ image, srcSet, alt, children }: { image: string; srcSet: string; alt: string; children?: React.ReactNode }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border-2 border-ink grayscale">
      {image ? <img src={image} srcSet={srcSet || undefined} sizes="(min-width: 1024px) 300px, 80vw" alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" /> : <Silhouette />}
      {/* sky duotone wipe (hover on desktop) */}
      <div className="absolute inset-0 bg-primary mix-blend-multiply transition-[clip-path] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)]" />
      <div className="absolute inset-0 bg-secondary/40 mix-blend-screen transition-[clip-path] delay-100 duration-700 [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)]" />
      {children}
    </div>
  );
}

export function Speakers() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useScrollTrigger(root, ({ reduce, desktop }) => {
    if (!desktop) {
      // mobile: single placeholder card, clip-path reveal on enter
      if (!reduce)
        gsap.fromTo('[data-reveal]', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: '[data-reveal]', start: 'top 85%' } });
      return;
    }
    if (!track.current) return;
    const dist = () => track.current!.scrollWidth - window.innerWidth + 64;
    gsap.to(track.current, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: reduce ? true : 0.6, invalidateOnRefresh: true },
    });

    // drag to scrub the horizontal pin
    const el = track.current;
    let down = false;
    let lastX = 0;
    const pd = (e: PointerEvent) => ((down = true), (lastX = e.clientX));
    const pm = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      const l = getLenis();
      if (l) l.scrollTo(l.scroll - dx * 1.4, { immediate: true });
      else window.scrollBy(0, -dx * 1.4);
    };
    const pu = () => (down = false);
    el.addEventListener('pointerdown', pd);
    window.addEventListener('pointermove', pm);
    window.addEventListener('pointerup', pu);
    return () => {
      el.removeEventListener('pointerdown', pd);
      window.removeEventListener('pointermove', pm);
      window.removeEventListener('pointerup', pu);
    };
  });

  const first = SPEAKERS.items[0];
  return (
    <section id="speakers" ref={root} data-bg="var(--bg-alt)" className={`relative overflow-hidden py-20 ${SPEAKERS.ready ? 'lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:py-12' : 'lg:py-24'}`}>
      <div className="mx-auto mb-8 w-full max-w-[1464px] px-4 md:px-8 lg:mb-10">
        <SectionLabel label={SPEAKERS.label} className="mb-6 lg:mb-8" />
        <SplitText title={SPEAKERS.title} accent={SPEAKERS.titleAccent} />
      </div>

      {!SPEAKERS.ready ? (
        <div data-reveal className="mx-auto w-full max-w-[1464px] px-4 md:px-8">
          <ComingSoon text={SPEAKERS.comingSoon} />
        </div>
      ) : (
      <>
      {/* mobile / tablet: one honest placeholder card */}
      <div className="px-4 md:px-8 lg:hidden">
        <article data-reveal className="mx-auto max-w-[24rem]">
          <Portrait image={first.image} srcSet={first.srcSet} alt={first.name} />
          <h3 className="display mt-4 text-display-xs">{SPEAKERS.mobileTitle}</h3>
        </article>
      </div>

      {/* desktop: horizontal pinned scroll */}
      <div ref={track} data-cursor="DRAG" className="hidden w-max select-none gap-5 pl-[max(2rem,calc((100vw-1400px)/2+2rem))] lg:flex">
        {SPEAKERS.items.map((s, i) => (
          <article key={i} className="group w-[300px] shrink-0">
            <Portrait image={s.image} srcSet={s.srcSet} alt={s.name}>
              <span className="display absolute bottom-3 right-4 text-6xl text-bg/90" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
            </Portrait>
            <h3 className="display mt-4 text-display-xs">{s.name}</h3>
          </article>
        ))}
      </div>
      </>
      )}
    </section>
  );
}
