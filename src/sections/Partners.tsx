import { useRef } from 'react';
import { PARTNERS, URLS } from '../data/event';
import { ScrollTrigger } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { SectionLabel, SplitText } from '../components/SplitText';
import { Bolt } from '../components/MagneticButton';

const SPANS = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-4'];
const TONES = ['bg-bg', 'bg-primary-2', 'bg-secondary-2', 'bg-bg'];

export function Partners() {
  const root = useRef<HTMLElement>(null);
  // touch: each card's border current runs once as it enters (desktop keeps hover)
  useScrollTrigger(root, ({ mobile, reduce }) => {
    if (!mobile || reduce) return;
    root.current!.querySelectorAll('.charge-card').forEach((card) =>
      ScrollTrigger.create({ trigger: card, start: 'top 75%', once: true, onEnter: () => card.classList.add('is-charged') }),
    );
    return () => root.current?.querySelectorAll('.charge-card').forEach((c) => c.classList.remove('is-charged'));
  });

  return (
    <section ref={root} id="partner" data-bg="var(--bg)" className="relative px-4 py-20 md:px-8 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel label={PARTNERS.label} className="mb-6 lg:mb-8" />
        <SplitText title={PARTNERS.title} accent={PARTNERS.titleAccent} className="mb-10 max-w-[16ch] lg:mb-14" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {PARTNERS.items.map((p, i) => (
            <article key={p.title} className={`charge-card group relative flex min-h-[16rem] flex-col justify-between gap-8 rounded-[30px] border-2 border-ink p-5 md:min-h-[19rem] md:p-7 ${TONES[i]} ${SPANS[i]}`}>
              <svg className="charge-border pointer-events-none absolute -inset-[2px] h-[calc(100%+4px)] w-[calc(100%+4px)] overflow-visible" aria-hidden="true">
                <rect x="0" y="0" width="100%" height="100%" rx="30" fill="none" stroke="var(--secondary)" strokeWidth="5" pathLength={100} strokeLinecap="round" />
              </svg>
              <div className="flex items-start justify-end">
                <Bolt className="h-8 w-8 text-ink transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-125 group-hover:text-secondary" />
              </div>
              <div>
                <h3 className="display mb-3 text-display-sm">{p.title}</h3>
                <p className="mb-6 max-w-[42ch] text-body opacity-80">{p.body}</p>
                <a
                  href={URLS.PARTNER_ENQUIRY_URL}
                  data-cursor="VIEW"
                  className="mono inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink bg-ink px-5 text-label font-bold text-bg transition-colors hover:bg-secondary hover:text-ink"
                  aria-label={`${PARTNERS.cta}: ${p.title}`}
                >
                  {PARTNERS.cta} →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
