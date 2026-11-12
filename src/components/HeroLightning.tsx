import { useEffect, useRef } from 'react';

type Pt = [number, number];

/** Midpoint-displacement lightning path. */
function bolt(a: Pt, b: Pt, spread: number, depth: number): Pt[] {
  if (depth === 0) return [a, b];
  const mx = (a[0] + b[0]) / 2 + (Math.random() - 0.5) * spread;
  const my = (a[1] + b[1]) / 2 + (Math.random() - 0.5) * spread * 0.3;
  const m: Pt = [mx, my];
  return [...bolt(a, m, spread / 2, depth - 1).slice(0, -1), ...bolt(m, b, spread / 2, depth - 1)];
}

/**
 * Ambient current lines that bend toward the cursor + an occasional bolt
 * (one every ~3s — well under the 3-flashes/second photosensitivity limit).
 * Lazy-loaded; pauses when off-screen.
 */
export default function HeroLightning() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext('2d')!;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let strike: { pts: Pt[]; born: number } | null = null;
    let nextStrike = performance.now() + 1200;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = (e.clientY - r.top) / r.height;
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      ctx.clearRect(0, 0, w, h);
      const t = now / 1000;

      // ambient current lines
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 7; i++) {
        const base = h * (0.18 + i * 0.11);
        ctx.beginPath();
        for (let x = 0; x <= w; x += 12) {
          const nx = x / w;
          const pull = Math.exp(-((nx - mouse.x) ** 2) * 18) * (mouse.y * h - base) * 0.35;
          const jitter = Math.sin(x * 0.012 + t * (1.2 + i * 0.2) + i) * 10 + Math.sin(x * 0.05 + t * 3) * 1.6;
          const y = base + jitter + pull;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(124,196,238,${0.18 + (i % 3) * 0.1})`;
        ctx.stroke();
      }

      // occasional bolt toward the cursor
      if (now > nextStrike) {
        const sx = w * (0.15 + Math.random() * 0.7);
        strike = { pts: bolt([sx, -10], [mouse.x * w + (Math.random() - 0.5) * 120, h * (0.55 + Math.random() * 0.4)], 180, 6), born: now };
        nextStrike = now + 2600 + Math.random() * 2200;
      }
      if (strike) {
        const age = (now - strike.born) / 420;
        if (age >= 1) strike = null;
        else {
          ctx.save();
          ctx.globalAlpha = 1 - age;
          ctx.shadowColor = '#099C98';
          ctx.shadowBlur = 18;
          ctx.strokeStyle = '#CFE8E6';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          strike.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
          ctx.stroke();
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();
          ctx.restore();
        }
      }
    };

    resize();
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cv);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
