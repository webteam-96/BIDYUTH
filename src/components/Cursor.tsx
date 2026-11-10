import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { useMedia, useReducedMotion } from '../hooks/useReducedMotion';

const TANGERINE = ['rgb(232, 163, 23)'];

/** True if the element or a near ancestor has a tangerine background. */
function onTangerine(el: HTMLElement | null) {
  for (let i = 0; el && i < 5; i++, el = el.parentElement) {
    if (TANGERINE.includes(getComputedStyle(el).backgroundColor)) return true;
  }
  return false;
}

/** Tangerine spark cursor. Desktop / fine pointer only. */
export function Cursor() {
  const fine = useMedia('(pointer: fine)');
  const reduce = useReducedMotion();
  return fine && !reduce ? <CursorInner /> : null;
}

function CursorInner() {
  const dot = useRef<HTMLDivElement>(null);
  const sparks = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [hover, setHover] = useState(false);
  const [invert, setInvert] = useState(false);
  const invertRef = useRef(false);

  useEffect(() => {
    document.body.classList.add('has-cursor');
    const xTo = gsap.quickTo(dot.current, 'x', { duration: 0.25, ease: 'power3' });
    const yTo = gsap.quickTo(dot.current, 'y', { duration: 0.25, ease: 'power3' });
    let last = { x: 0, y: 0, t: 0 };
    let lastSpark = 0;

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const now = performance.now();
      const dist = Math.hypot(e.clientX - last.x, e.clientY - last.y);
      const speed = dist / Math.max(1, now - last.t);
      last = { x: e.clientX, y: e.clientY, t: now };
      // tiny trailing sparks on fast movement; throttled to ~20/s
      if (speed > 1.6 && now - lastSpark > 50 && sparks.current) {
        lastSpark = now;
        const s = document.createElement('span');
        s.className = `absolute h-1 w-1 rounded-full ${invertRef.current ? 'bg-ink' : 'bg-secondary'}`;
        s.style.left = `${e.clientX}px`;
        s.style.top = `${e.clientY}px`;
        sparks.current.appendChild(s);
        gsap.to(s, {
          x: gsap.utils.random(-28, 28),
          y: gsap.utils.random(-28, 28),
          scale: 0,
          duration: gsap.utils.random(0.4, 0.7),
          ease: 'power2.out',
          onComplete: () => s.remove(),
        });
      }
    };
    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      const c = t.closest<HTMLElement>('[data-cursor]');
      setLabel(c?.dataset.cursor ?? '');
      setHover(!!t.closest('a,button,[role="tab"]'));
      // tangerine cursor disappears on tangerine surfaces: switch to ink there
      const inv = !!t.closest('[data-cursor-invert]') || onTangerine(t);
      invertRef.current = inv;
      setInvert(inv);
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    return () => {
      document.body.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
    };
  }, []);

  const scale = label ? 1 : hover ? 0.32 : 0.14;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[110]">
      <div ref={sparks} className="absolute inset-0" />
      <div ref={dot} className="absolute left-0 top-0" style={{ transform: 'translate(-100px,-100px)' }}>
        <div
          className={`flex h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[transform,background-color] duration-300 ease-out ${
            invert ? 'bg-ink shadow-[0_0_0_3px_var(--bg)]' : 'bg-secondary shadow-[0_0_24px_rgba(232,163,23,0.55)]'
          }`}
          style={{ transform: `translate(-50%,-50%) scale(${scale})` }}
        >
          <span className={`mono text-label font-bold tracking-normal ${invert ? 'text-secondary' : 'text-ink'} transition-opacity duration-200 ${label ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
        </div>
      </div>
    </div>
  );
}
