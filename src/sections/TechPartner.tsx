import { useRef } from 'react';
import { COMMITTEE, EVENT, TECH } from '../data/event';
import { ScrollTrigger } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

export function TechPartner() {
  const root = useRef<HTMLElement>(null);
  useScrollTrigger(root, () => {
    ScrollTrigger.create({ trigger: '[data-strip]', start: 'top 85%', once: true, toggleClass: { targets: '[data-strip]', className: 'is-in' } });
  });

  return (
    <section ref={root} data-bg="var(--bg)" className="relative px-4 py-20 md:px-8 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <a
          data-strip
          href={TECH.url}
          target="_blank"
          rel="noopener"
          data-cursor="VIEW"
          className="shimmer flex flex-col items-start justify-between gap-5 rounded-[28px] border-2 border-ink bg-bg-alt px-5 py-6 md:flex-row md:items-center md:px-10"
        >
          <span className="mono text-label">{TECH.label}</span>
          <span className="display text-display-xs">{TECH.name}</span>
          <img src={EVENT.logos.kaizen} alt={`${TECH.name} logo`} className="h-10 w-auto" width={200} height={40} loading="lazy" />
        </a>

        <div className="mt-16 lg:mt-20">
          <h2 className="mono mb-6 text-label font-bold">{COMMITTEE.label}</h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {COMMITTEE.groups.flatMap((g) => g.members).map((m, i) => (
              <li key={i} className="rounded-[24px] border border-line p-3 md:p-4">
                <div className="mb-4 aspect-square rounded-2xl bg-bg-alt" aria-hidden="true" />
                <p className="text-body font-medium">{m.name}</p>
                <p className="mono text-label opacity-70">{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
