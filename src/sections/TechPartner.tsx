import { useRef } from 'react';
import { EVENT, TECH } from '../data/event';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { Bolt } from '../components/MagneticButton';

export function TechPartner() {
  const root = useRef<HTMLElement>(null);
  useScrollTrigger(root, ({ motion }) => {
    ScrollTrigger.create({ trigger: '[data-strip]', start: 'top 85%', once: true, toggleClass: { targets: '[data-strip]', className: 'is-in' } });
    if (!motion) return;
    // entrance: card charges up, logo plate pops, bolt flickers like a spark
    gsap
      .timeline({ scrollTrigger: { trigger: '[data-strip]', start: 'top 85%', once: true } })
      .from('[data-frame]', { scale: 0.9, autoAlpha: 0, duration: 0.6, ease: 'power3.out' })
      .from('[data-plate]', { scale: 0.6, rotate: -8, autoAlpha: 0, duration: 0.7, ease: 'back.out(2)' }, '-=0.3')
      .from('[data-line]', { y: 24, autoAlpha: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.45')
      .fromTo('[data-spark]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.06, repeat: 6, yoyo: true, ease: 'none' }, '-=0.2');
  });

  return (
    <section ref={root} data-bg="var(--bg)" aria-label={TECH.label} className="relative px-4 py-12 md:px-8 lg:py-16">
      <div data-frame className="live-current mx-auto max-w-[1400px] rounded-[32px] p-1">
        <a
          data-strip
          href={TECH.url}
          target="_blank"
          rel="noopener"
          data-cursor="VIEW"
          className="shimmer grid gap-5 rounded-[28px] bg-ink p-5 text-bg md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10 md:p-10"
        >
          {/* logo sits on an off-white plate: the mark is drawn for light backgrounds */}
          <span data-plate className="flex items-center justify-center rounded-2xl bg-bg px-6 py-5 md:px-8">
            <img src={EVENT.logos.kaizen} alt={`${TECH.name} logo`} className="h-24 w-auto md:h-28" width={602} height={376} loading="lazy" />
          </span>
          <span className="flex min-w-0 flex-col gap-3">
            <span data-line className="mono flex items-center gap-2 text-label text-secondary-2">
              <span data-spark className="inline-flex"><Bolt className="h-4 w-4 text-secondary" /></span>
              {TECH.label}
            </span>
            {/* one line on every width: size scales with the viewport */}
            <span data-line className="display whitespace-nowrap text-[clamp(0.95rem,4.5vw,1.6rem)] md:text-[clamp(1.4rem,2.6vw,2.9rem)]">
              {TECH.name}
            </span>
          </span>
          <span data-line className="mono inline-flex min-h-11 items-center justify-center rounded-full border-2 border-bg px-5 text-label font-bold transition-colors hover:bg-bg hover:text-ink md:justify-self-end">
            {TECH.cta} →
          </span>
        </a>
      </div>
    </section>
  );
}
