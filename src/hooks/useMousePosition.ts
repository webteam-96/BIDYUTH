import { useEffect, useRef } from 'react';

/** Mouse position in a ref (no re-renders). */
export function useMousePosition() {
  const pos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: 0 });
  useEffect(() => {
    const on = (e: PointerEvent) => (pos.current = { x: e.clientX, y: e.clientY });
    window.addEventListener('pointermove', on, { passive: true });
    return () => window.removeEventListener('pointermove', on);
  }, []);
  return pos;
}
