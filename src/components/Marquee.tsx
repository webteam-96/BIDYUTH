import { useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { Bolt } from './MagneticButton';

type Props = { items: string[]; tone?: 'tangerine' | 'sky'; reverse?: boolean; className?: string };

/** Infinite marquee whose speed + direction follow scroll velocity and skews on fast scroll. */
export function Marquee({ items, tone = 'tangerine', reverse, className = '' }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useScrollTrigger(root, ({ motion }) => {
    if (!motion || !track.current) return;
    const base = reverse ? -1 : 1;
    const tween = gsap.to(track.current, { xPercent: -50, ease: 'none', duration: 28, repeat: -1 });
    tween.totalTime(tween.duration() * 1000); // start deep in the loop so negative timeScale can run
    const skew = gsap.quickTo(track.current, 'skewX', { duration: 0.4, ease: 'power3' });
    let target = base;
    let ts = base;
    let dir = 1;
    const st = ScrollTrigger.create({
      onUpdate: (s) => {
        const v = s.getVelocity();
        dir = s.direction;
        target = base * dir * (1 + Math.min(Math.abs(v) / 350, 7));
        skew(gsap.utils.clamp(-12, 12, v / -260));
      },
    });
    const tick = () => {
      target += (base * dir - target) * 0.04;
      ts += (target - ts) * 0.12;
      tween.timeScale(ts);
      if (Math.abs(target - base * dir) < 0.05) skew(0);
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  });

  const row = [...items, ...items];
  const bg = tone === 'tangerine' ? 'bg-secondary' : 'bg-primary';
  return (
    <div ref={root} data-cursor-invert={tone === 'tangerine' ? '' : undefined} className={`overflow-hidden ${bg} border-y-2 border-ink py-4 ${className}`} aria-label={items.join(', ')} role="marquee">
      <div ref={track} className="flex w-max will-change-transform" aria-hidden="true">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((t, i) => (
              <span key={i} className="flex items-center">
                <span className="display whitespace-nowrap rounded-full border-2 border-ink bg-bg px-6 py-2 text-[clamp(1.5rem,4vw,3.5rem)] leading-none">
                  {t}
                </span>
                <Bolt className="mx-5 h-8 w-8 text-ink md:h-12 md:w-12" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
