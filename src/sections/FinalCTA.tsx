import { useRef } from 'react';
import { FINAL, URLS } from '../data/event';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { MagneticButton } from '../components/MagneticButton';

export function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useScrollTrigger(root, ({ reduce, desktop }) => {
    const el = root.current!;
    if (reduce) {
      el.style.setProperty('--r', '150%');
      return;
    }
    if (!desktop) {
      // mobile: flood from centre, played on enter (reverses if scrolled back up)
      el.style.setProperty('--cx', '50%');
      el.style.setProperty('--cy', '50%');
      const r = { v: 0 };
      const st = { trigger: el, start: 'top 60%', toggleActions: 'play none none reverse' };
      gsap.to(r, { v: 150, duration: 1.1, ease: 'power3.inOut', onUpdate: () => el.style.setProperty('--r', `${r.v}%`), scrollTrigger: st });
      gsap.fromTo('[data-strike]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, delay: 0.5, ease: 'power4.in', scrollTrigger: st });
      gsap.from('[data-big-cta]', { yPercent: 30, opacity: 0, duration: 0.9, delay: 0.3, ease: 'power3.out', scrollTrigger: st });
      return;
    }
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--cx', `${e.clientX - r.left}px`);
      el.style.setProperty('--cy', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', move, { passive: true });
    const r = { v: 0 };
    gsap.to(r, {
      v: 150,
      ease: 'power2.in',
      onUpdate: () => el.style.setProperty('--r', `${r.v}%`),
      scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 10%', scrub: 0.5 },
    });
    gsap.fromTo('[data-strike]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'power4.in', scrollTrigger: { trigger: el, start: 'top 40%', end: 'top 5%', scrub: 0.4 } });
    gsap.from('[data-big-cta]', { yPercent: 40, opacity: 0, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 50%', end: 'top 0%', scrub: 0.6 } });
    // single white flash as the bolt lands (photosensitivity: never repeats)
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 5%',
      once: true,
      onEnter: () => gsap.fromTo('[data-flash]', { opacity: 0.7 }, { opacity: 0, duration: 0.6, ease: 'power2.out' }),
    });
    return () => {
      window.removeEventListener('pointermove', move);
      st.kill();
    };
  });

  return (
    <section
      ref={root}
      id="register"
      data-cursor-invert
      data-bg="var(--bg)"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 py-20 md:px-8 lg:py-28"
      style={{ ['--cx' as string]: '50%', ['--cy' as string]: '50%', ['--r' as string]: '0%' }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-secondary" style={{ clipPath: 'circle(var(--r) at var(--cx) var(--cy))' }} />
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path
          data-strike
          d="M-2 18 L30 30 L26 42 L62 50 L56 62 L104 80"
          fill="none"
          stroke="var(--bg)"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray="1 1"
          strokeLinejoin="bevel"
          style={{ strokeWidth: 6, filter: 'drop-shadow(0 0 10px #fff)' }}
        />
      </svg>
      <div data-flash aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white opacity-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] text-center text-bg">
        <h2 data-big-cta className="display text-display-lg">
          {FINAL.big}
        </h2>
        <p className="serif mt-6 text-display-xs lg:text-[clamp(1.6rem,3.4vw,3rem)]">{FINAL.sub}</p>
        <div className="mt-12 flex flex-col items-stretch gap-10 md:items-center">
          <MagneticButton href={URLS.REGISTRATION_URL} variant="ink" className="w-full px-12 py-5 text-lead md:w-auto md:py-6" strength={0.5}>
            {FINAL.cta}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
