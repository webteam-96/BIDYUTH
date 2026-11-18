import { useRef } from 'react';
import { FEATURES } from '../data/event';
import { gsap } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { SectionLabel, SplitText } from '../components/SplitText';

const TONES = ['bg-bg', 'bg-primary-2', 'bg-bg', 'bg-secondary-2', 'bg-bg', 'bg-primary-2'];

export function Features() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useScrollTrigger(root, ({ reduce, desktop }) => {
    if (reduce) return;
    const cards = gsap.utils.toArray<HTMLElement>('[data-card]');
    if (desktop) {
      // stacked deck in the grid centre → fanned out to the grid
      const offset = (el: HTMLElement, axis: 'x' | 'y') => {
        const g = grid.current!.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        return axis === 'x' ? g.left + g.width / 2 - (r.left + r.width / 2) : g.top + g.height / 2 - (r.top + r.height / 2);
      };
      gsap.fromTo(
        cards,
        { x: (_i, el) => offset(el, 'x'), y: (_i, el) => offset(el, 'y'), rotation: (i) => (i - (cards.length - 1) / 2) * 5 },
        {
          x: 0,
          y: 0,
          rotation: 0,
          ease: 'power2.inOut',
          stagger: 0.04,
          scrollTrigger: { trigger: grid.current, start: 'center center', end: '+=110%', pin: root.current, scrub: 0.6, invalidateOnRefresh: true },
        },
      );
    } else {
      // mobile: vertical stack, each card scales up and un-rotates as it enters
      cards.forEach((c, i) =>
        gsap.fromTo(
          c,
          { scale: 0.92, rotation: i % 2 ? 3 : -3 },
          { scale: 1, rotation: 0, ease: 'none', scrollTrigger: { trigger: c, start: 'top 95%', end: 'top 60%', scrub: 0.5 } },
        ),
      );
    }
  });

  return (
      <section ref={root} id="highlights" data-bg="var(--bg)" className="relative px-4 py-20 md:px-8 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:py-16">
        <div className="mx-auto w-full max-w-[1400px]">
          <SectionLabel label={FEATURES.label} className="mb-6 lg:mb-8" />
          <SplitText title={FEATURES.title} accent={FEATURES.titleAccent} className="mb-8 lg:mb-10" />
          <div ref={grid} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.items.map((f, i) => (
              <div key={f.title} data-card style={{ zIndex: 10 - i }} className="relative">
                <div className={`h-full rounded-[28px] border-2 border-ink p-5 md:p-6 ${TONES[i]}`}>
                  <h3 className="display mb-3 text-display-xs lg:mt-10">{f.title}</h3>
                  <p className="text-body opacity-80">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
