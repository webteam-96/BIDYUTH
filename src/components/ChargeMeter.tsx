import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '../lib/gsap';
import { Bolt } from './MagneticButton';

/** Top progress bar: the page "charges up" as you scroll. */
export function ChargeMeter() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (s) => ref.current?.style.setProperty('--p', s.progress.toFixed(4)),
    });
    return () => st.kill();
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[3px]" style={{ ['--p' as string]: 0 }}>
      <div className="h-full origin-left bg-secondary" style={{ transform: 'scaleX(var(--p))' }} />
      <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: 'calc(var(--p) * 100%)' }}>
        <Bolt className="h-4 w-4 text-secondary drop-shadow-[0_0_6px_rgba(180,48,17,0.8)]" />
      </div>
    </div>
  );
}
