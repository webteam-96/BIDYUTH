import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

type Geo = { w: number; h: number; a: string; b: string | null; nodes: [number, number][]; mobile: boolean };

/** Build a circuit-style rail that jogs in and out down the page. */
function rail(x: number, h: number, dir: 1 | -1, phase: number, jogSize: number): { d: string; nodes: [number, number][] } {
  const step = 640;
  const jog = jogSize * dir;
  let y = 80 + phase;
  let d = `M${x},0 L${x},${y}`;
  const nodes: [number, number][] = [];
  while (y + step < h) {
    const a = y + step * 0.55;
    d += ` L${x},${a} L${x + jog},${a + jogSize} L${x + jog},${a + 160} L${x},${a + 160 + jogSize}`;
    nodes.push([x + jog, a + 90]);
    y += step;
  }
  d += ` L${x},${h}`;
  return { d, nodes };
}

/** Sky-blue current lines drawn along the page edges as you scroll. Mobile: one thin rail. */
export function CurrentLines() {
  const wrap = useRef<HTMLDivElement>(null);
  const pathA = useRef<SVGPathElement>(null);
  const pathB = useRef<SVGPathElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  useEffect(() => {
    const host = wrap.current?.parentElement;
    if (!host) return;
    const measure = () => {
      const w = host.clientWidth;
      const h = host.scrollHeight;
      const mobile = w < 1024;
      const a = rail(mobile ? 6 : 28, h, 1, 0, mobile ? 6 : 22);
      const b = mobile ? null : rail(w - 28, h, -1, 320, 22);
      setGeo({ w, h, a: a.d, b: b?.d ?? null, nodes: [...a.nodes, ...(b?.nodes ?? [])], mobile });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!geo || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const host = wrap.current?.parentElement;
    const tw = gsap.fromTo(
      [pathA.current, pathB.current].filter(Boolean),
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: host, start: 'top top', end: 'bottom bottom', scrub: 0.6 } },
    );
    ScrollTrigger.refresh();
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [geo]);

  return (
    <div ref={wrap} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {geo && (
        <svg width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} className="absolute left-0 top-0">
          <g fill="none" stroke="var(--primary)" strokeWidth={geo.mobile ? 1 : 1.5} strokeLinejoin="round">
            <path ref={pathA} d={geo.a} pathLength={1} strokeDasharray="1 1" />
            {geo.b && <path ref={pathB} d={geo.b} pathLength={1} strokeDasharray="1 1" opacity="0.7" />}
          </g>
          {!geo.mobile &&
            geo.nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" fill="var(--bg)" stroke="var(--primary)" strokeWidth="1.5" />)}
        </svg>
      )}
    </div>
  );
}
