import { useRef } from 'react';
import { STATS } from '../data/event';
import { gsap } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { SplitText } from '../components/SplitText';

function Odometer({ value, suffix }: { value: number; suffix: string }) {
  const digits = String(value).split('').map(Number);
  return (
    <span className="inline-flex leading-none" aria-hidden="true">
      {digits.map((d, i) => (
        <span key={i} className="relative inline-block h-[1.3em] overflow-hidden">
          {/* invisible final digit sets the column width, so a "1" doesn't sit in a "0"-wide slot */}
          <span className="invisible flex h-[1.3em] items-center">{d}</span>
          <span data-roll={d} className="absolute inset-x-0 top-0 flex flex-col items-center">
            {Array.from({ length: 20 }, (_, n) => (
              <span key={n} className="flex h-[1.3em] items-center">{n % 10}</span>
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
                {/* 26cqw keeps the widest value ("3000+", 5 Playfair glyphs) inside its cell */}
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

          <img src="./map/bbb-statewise-chapters.webp" alt="BBB statewise chapters map: 100 chapters and 4,304 members across India" width={1600} height={1448} loading="lazy" decoding="async" className="mx-auto w-full max-w-[40rem] rounded-[28px] border-2 border-ink" />
        </div>
      </div>
    </section>
  );
}
