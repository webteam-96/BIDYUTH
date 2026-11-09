import { useRef } from 'react';
import { APP } from '../data/event';
import { gsap } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { SplitText } from '../components/SplitText';
import { Bolt } from '../components/MagneticButton';

/** Text-free UI sketches so the phone shows the feature, not filler copy. */
function Mock({ i }: { i: number }) {
  if (i === 0)
    return (
      <ul className="space-y-2.5" aria-hidden="true">
        {[0, 1, 2, 3].map((r) => (
          <li key={r} className="flex items-center gap-3 rounded-2xl border border-line bg-bg-alt p-2.5">
            <span className={`h-9 w-9 shrink-0 rounded-full ${r % 2 ? 'bg-secondary' : 'bg-primary'}`} />
            <span className="flex-1 space-y-1.5">
              <span className="block h-2 w-3/4 rounded-full bg-ink/70" />
              <span className="block h-2 w-1/2 rounded-full bg-ink/20" />
            </span>
          </li>
        ))}
      </ul>
    );
  if (i === 1)
    return (
      <div className="grid grid-cols-3 gap-2" aria-hidden="true">
        {Array.from({ length: 9 }, (_, k) => (
          <span key={k} className={`h-12 rounded-xl border-2 border-ink ${k === 4 ? 'bg-secondary' : k % 3 === 0 ? 'bg-ink/10' : 'bg-bg'}`} />
        ))}
      </div>
    );
  if (i === 2)
    return (
      <div className="flex justify-center rounded-3xl border-2 border-ink bg-bg p-4">
        <QR />
      </div>
    );
  return (
    <div className="relative h-40" aria-hidden="true">
      <span className="absolute inset-x-3 top-0 h-28 rotate-[-4deg] rounded-2xl border-2 border-ink bg-primary" />
      <span className="absolute inset-x-0 top-6 flex h-28 flex-col justify-end gap-1.5 rounded-2xl border-2 border-ink bg-secondary p-3">
        <span className="block h-2 w-2/3 rounded-full bg-ink/80" />
        <span className="block h-2 w-1/3 rounded-full bg-ink/40" />
      </span>
    </div>
  );
}

export function AppTeaser() {
  const root = useRef<HTMLElement>(null);

  useScrollTrigger(root, ({ reduce, desktop }) => {
    const screens = gsap.utils.toArray<HTMLElement>('[data-screen]');
    if (reduce) {
      gsap.set(screens.slice(1), { opacity: 0 });
      return;
    }
    // screens crossfade one after another (old clears before new arrives, so nothing overlaps)
    gsap.set(screens.slice(1), { opacity: 0 });
    const tl = gsap.timeline({
      scrollTrigger: desktop
        ? { trigger: root.current, start: 'top top', end: '+=150%', pin: true, scrub: 0.6 }
        : { trigger: '[data-phone]', start: 'top 75%', end: 'bottom 25%', scrub: 0.5 },
    });
    screens.slice(1).forEach((s, i) => {
      tl.to(screens[i], { opacity: 0, y: -16, duration: 0.45 }, i).fromTo(s, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45 }, i + 0.55);
    });
    gsap.from('[data-chip]', { y: 16, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '[data-chips]', start: 'top 90%' } });
  });

  return (
    <section ref={root} data-bg="var(--primary-2)" className="relative overflow-hidden px-4 py-20 md:px-8 lg:flex lg:min-h-[100svh] lg:items-center lg:py-12">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div>
          <SplitText title={APP.title} accent={APP.titleAccent} className="mb-6" />
          <p className="mb-8 max-w-[44ch] text-lead">{APP.body}</p>
          <ul data-chips className="mb-8 flex flex-wrap gap-2">
            {APP.chips.map((c) => (
              <li key={c} data-chip className="mono rounded-full border-2 border-ink bg-bg px-4 py-2 text-label font-bold">
                {c}
              </li>
            ))}
          </ul>
          <p className="mono flex items-center gap-2 text-meta">
            <Bolt className="h-4 w-4 text-secondary" />
            {APP.badge}
          </p>
        </div>

        <div data-phone className="relative mx-auto w-[16.5rem] md:w-[19rem]">
          <div className="relative aspect-[9/19] rounded-[48px] border-[10px] border-ink bg-ink shadow-[12px_12px_0_var(--secondary)]">
            <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
            <div className="relative h-full overflow-hidden rounded-[38px] bg-bg">
              {APP.screens.map((s, i) => (
                <div key={s.title} data-screen className="absolute inset-0 flex flex-col gap-4 px-4 pb-5 pt-11" aria-hidden={i > 0 ? 'true' : undefined}>
                  <p className="display text-[1.75rem] leading-none">{s.title}</p>
                  <Mock i={i} />
                  <p className="mt-auto text-body leading-snug">{s.line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QR() {
  // decorative pseudo-QR
  const cells = Array.from({ length: 81 }, (_, i) => ((i * 37) % 7) % 3 === 0 || [0, 1, 2, 9, 11, 18, 19, 20, 6, 7, 8, 15, 17, 24, 25, 26, 54, 55, 56, 63, 65, 72, 73, 74].includes(i));
  return (
    <div className="grid w-full grid-cols-9 gap-[3px]" aria-hidden="true">
      {cells.map((on, i) => (
        <span key={i} className={`aspect-square ${on ? 'bg-ink' : 'bg-transparent'}`} />
      ))}
    </div>
  );
}
