import { lazy, Suspense, useRef } from 'react';
import { EVENT, HERO, URLS } from '../data/event';
import { gsap } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { useActivePhase } from '../hooks/useActivePhase';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Countdown } from '../components/Countdown';
import { MagneticButton } from '../components/MagneticButton';

const HeroLightning = lazy(() => import('../components/HeroLightning'));

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const { active } = useActivePhase();
  const reduce = useReducedMotion();

  useScrollTrigger(
    root,
    ({ reduce, desktop }) => {
      if (!ready || reduce) return;
      const chars = gsap.utils.toArray<HTMLElement>('[data-char]');
      gsap
        .timeline()
        .from(chars, { yPercent: -140, opacity: 0, duration: desktop ? 1.6 : 1.2, ease: 'elastic.out(1, 0.45)', stagger: desktop ? 0.07 : 0.05 })
        .from('[data-year]', { yPercent: 60, opacity: 0, duration: 1, ease: 'power4.out' }, 0.5)
        .from('[data-rise]', { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }, 0.6)
        .from('[data-tag]', { y: -16, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 }, 0.9);

      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.8 };
      gsap.to('[data-tint]', { opacity: 1, ease: 'none', scrollTrigger: st });

      if (desktop) {
        // letters split apart and fly outward
        const mid = (chars.length - 1) / 2;
        gsap.to(chars, {
          x: (i) => (i - mid) * window.innerWidth * 0.11,
          y: (i) => (i % 2 ? -1 : 1) * window.innerHeight * (0.18 + Math.abs(i - mid) * 0.05),
          rotation: (i) => (i - mid) * 14,
          scale: 1.25,
          ease: 'none',
          scrollTrigger: st,
        });
        gsap.to('[data-year]', { yPercent: -120, ease: 'none', scrollTrigger: st });
      } else {
        // lighter mobile version: title shrinks + fades, date row drifts up
        gsap.to('[data-title]', { scale: 0.85, opacity: 0.25, ease: 'none', transformOrigin: '50% 30%', scrollTrigger: st });
        gsap.to('[data-tag]', { y: -40, ease: 'none', scrollTrigger: st });
      }
    },
    [ready],
  );

  return (
    <section ref={root} id="top" data-bg="var(--bg)" className="relative flex min-h-[100svh] flex-col overflow-hidden px-4 pb-6 pt-24 md:px-8 md:pt-28">
      <div data-tint aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-primary-2 via-primary/60 to-primary opacity-0" />
      {!reduce && (
        <Suspense fallback={null}>
          <HeroLightning />
        </Suspense>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
        <div className="relative flex flex-1 flex-col items-center justify-center py-8 lg:py-10">
          {/* w-fit: the date row spans exactly the wordmark */}
          <div data-title className="relative mx-auto w-fit">
            <div className="mb-3 flex items-end justify-end gap-4 lg:mb-5">
              <time data-tag dateTime={HERO.date.iso} className="text-right">
                <span className="display block text-display-sm">{HERO.date.range}</span>
                <span className="mono mt-1 block text-meta">{HERO.date.monthYear}</span>
              </time>
            </div>
            <h1 className="display relative select-none whitespace-nowrap text-center text-hero text-primary lg:text-hero-lg" aria-label={EVENT.fullName}>
              <span aria-hidden="true" className="inline-flex">
                {EVENT.name.split('').map((c, i) => (
                  <span key={i} data-char className="inline-block will-change-transform">
                    {c}
                  </span>
                ))}
              </span>
              <span
                data-year
                aria-hidden="true"
                className="serif absolute -bottom-[0.34em] right-0 text-[0.42em] text-secondary [text-shadow:2px_2px_0_var(--ink)] lg:right-[0.5em] lg:[text-shadow:3px_3px_0_var(--ink)]"
              >
                {EVENT.year}
              </span>
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 md:items-center md:gap-4">
          {active.deadline && (
            <div data-rise className="flex flex-col items-center gap-2 rounded-3xl border border-ink/20 bg-bg/75 px-5 py-3 backdrop-blur">
              <span className="mono whitespace-nowrap text-label">{HERO.countdownLabel}</span>
              <Countdown to={active.deadline} />
            </div>
          )}
          <div data-rise className="w-full md:w-auto">
            <MagneticButton href={URLS.REGISTRATION_URL} className="w-full text-lead md:w-auto">
              {HERO.cta}
            </MagneticButton>
          </div>
        </div>

        <ul data-rise className="mono mt-6 flex flex-col items-center gap-1 border-t border-line pt-3 text-center text-meta md:mt-8 md:grid md:grid-cols-2 md:gap-0 md:pt-0 md:text-left">
          {HERO.meta.map((m, i) => (
            <li
              key={m}
              className={`${i > 0 ? 'md:border-l md:border-line md:pl-4 md:text-right' : ''} md:py-3`}
            >
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
