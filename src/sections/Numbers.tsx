import { useRef } from 'react';
import { STATS } from '../data/event';
import { gsap } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { SplitText } from '../components/SplitText';

// stylised India outline, [lon, lat]
const OUTLINE: [number, number][] = [
  [74.6, 37], [75.8, 36.6], [77.8, 35.5], [78.9, 34.3], [78.4, 32.6], [79.4, 31.1], [80.9, 30.2], [81.6, 30.4], [83.3, 29.4],
  [85.1, 28.6], [86.9, 27.9], [88.1, 27.9], [88.8, 27.3], [88.9, 26.8], [89.9, 26.9], [92, 26.9], [92.6, 27.8], [94.6, 29.3],
  [96.2, 29.2], [97.3, 28.3], [97, 27.2], [95.8, 26.6], [95.2, 26], [94.6, 25.1], [94.2, 23.9], [93.4, 23], [93.2, 22.1],
  [92.6, 21.9], [92.3, 23.4], [91.8, 23.1], [91.2, 23.6], [91.6, 24.2], [92.2, 24.3], [92.4, 25], [90.4, 25.2], [89.8, 25.4],
  [89.9, 26], [88.6, 26.4], [88.1, 25.6], [88.7, 24.9], [88.2, 24.2], [88.9, 23.4], [88.9, 22.2], [88.6, 21.6], [87.1, 21.5],
  [86.9, 20.8], [86.4, 20], [85.1, 19.4], [84.1, 18.3], [83.2, 17.6], [82.3, 16.6], [81.3, 15.9], [80.3, 15.4], [80.1, 13.6],
  [80.3, 13], [79.9, 11.9], [79.8, 10.3], [79.2, 10.3], [78.4, 9.1], [77.5, 8.1], [76.6, 8.9], [76.3, 9.8], [75.8, 11.1],
  [75, 12.6], [74.6, 14], [73.9, 15.6], [73.4, 16.9], [73, 18.8], [72.8, 20.4], [72.6, 21.4], [72.1, 21.2], [70.8, 20.7],
  [69.1, 22.4], [69.6, 22.8], [70.4, 23], [68.4, 23.6], [68.8, 24.3], [70, 24.4], [71.1, 24.4], [70.3, 25.7], [70.1, 26.6],
  [69.5, 27], [70.6, 28], [71.9, 27.9], [72.9, 29], [73.4, 29.9], [74.5, 31], [74.6, 32], [75.3, 32.3], [74.4, 33], [74, 33.9],
  [74.2, 34.7], [73.7, 35.2], [74.1, 36],
];
const P = ([lon, lat]: [number, number]): [number, number] => [(lon - 67.5) * 20, (37.8 - lat) * 20];
const outlineD = 'M' + OUTLINE.map((p) => P(p).map((n) => n.toFixed(1)).join(',')).join(' L') + ' Z';
const hub = P(STATS.cities.find((c) => c.name === STATS.hub)!.at);

function Odometer({ value, suffix }: { value: number; suffix: string }) {
  const digits = String(value).split('').map(Number);
  return (
    <span className="inline-flex leading-none" aria-hidden="true">
      {digits.map((d, i) => (
        <span key={i} className="relative inline-block h-[1em] overflow-hidden">
          {/* invisible final digit sets the column width, so a "1" doesn't sit in a "0"-wide slot */}
          <span className="invisible">{d}</span>
          <span data-roll={d} className="absolute inset-x-0 top-0 flex flex-col items-center">
            {Array.from({ length: 20 }, (_, n) => (
              <span key={n} className="h-[1em]">{n % 10}</span>
            ))}
          </span>
        </span>
      ))}
      {suffix && <span className="serif text-secondary">{suffix}</span>}
    </span>
  );
}

export function Numbers() {
  const root = useRef<HTMLElement>(null);

  useScrollTrigger(root, ({ reduce }) => {
    const rolls = gsap.utils.toArray<HTMLElement>('[data-roll]');
    // 20 rows: land on the second copy so every digit visibly spins
    const to = (el: HTMLElement) => -((10 + Number(el.dataset.roll)) / 20) * 100;
    if (reduce) {
      rolls.forEach((el) => gsap.set(el, { yPercent: to(el) }));
      return;
    }
    rolls.forEach((el, i) =>
      gsap.to(el, {
        yPercent: to(el),
        duration: 1.8 + (i % 4) * 0.25,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 65%' },
      }),
    );
    const tl = gsap.timeline({ scrollTrigger: { trigger: '[data-map]', start: 'top 75%', end: 'bottom 45%', scrub: 0.6 } });
    tl.fromTo('[data-outline]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, ease: 'none' })
      .fromTo('[data-link]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, stagger: 0.06, ease: 'none' }, 0.3)
      .fromTo('[data-city]', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, stagger: 0.06, ease: 'back.out(3)', transformOrigin: 'center' }, 0.4);
  });

  return (
    <section ref={root} data-bg="var(--bg-alt)" className="relative overflow-hidden px-4 py-20 md:px-8 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SplitText title={STATS.title.split(' ').slice(0, 2).join(' ')} accent={STATS.title.split(' ').slice(2).join(' ')} className="mb-10 max-w-[14ch] lg:mb-16" />

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
            {STATS.items.map((s) => (
              <div key={s.label} className="@container border-t border-ink pt-4">
                <dt className="mono mb-2 text-label md:mb-3">{s.label}</dt>
                {/* 26cqw keeps the widest value ("3000+", 5 Marcellus glyphs) inside its cell */}
                <dd className="display text-[min(26cqw,8rem)]">
                  <span className="sr-only">
                    {s.value}
                    {s.suffix}
                  </span>
                  <Odometer value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>

          <figure data-map className="relative mx-auto w-full max-w-[22rem] md:max-w-[30rem] lg:max-w-[35rem]">
            <svg viewBox="0 0 620 640" className="w-full overflow-visible" role="img" aria-label={`Map of India with ${STATS.cities.length} participating cities connected to ${STATS.hub}`}>
              <path data-outline d={outlineD} pathLength={1} strokeDasharray="1 1" fill="var(--bg)" fillOpacity="0.5" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
              <g fill="none" stroke="var(--primary)" strokeWidth="1.4">
                {STATS.cities.map((c) => {
                  if (c.name === STATS.hub) return null;
                  const [x, y] = P(c.at);
                  const mx = (x + hub[0]) / 2 + (y - hub[1]) * 0.12;
                  const my = (y + hub[1]) / 2 - (x - hub[0]) * 0.12;
                  return <path key={c.name} data-link d={`M${hub[0]},${hub[1]} Q${mx},${my} ${x},${y}`} pathLength={1} strokeDasharray="1 1" />;
                })}
              </g>
              {STATS.cities.map((c) => {
                const [x, y] = P(c.at);
                const isHub = c.name === STATS.hub;
                return (
                  <g key={c.name} data-city>
                    <circle cx={x} cy={y} r={isHub ? 10 : 5} fill={isHub ? 'var(--secondary)' : 'var(--primary)'} stroke="var(--ink)" strokeWidth="1.5" />
                    {isHub && (
                      <text x={x + 16} y={y + 5} className="mono" fontSize="14" fontWeight="700" fill="var(--ink)">
                        {c.name.toUpperCase()}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </figure>
        </div>
      </div>
    </section>
  );
}
