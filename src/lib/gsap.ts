import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
// mobile URL-bar show/hide must not trigger a full refresh; keep native touch scrolling
ScrollTrigger.config({ ignoreMobileResize: true });
ScrollTrigger.normalizeScroll(false);
// dev-only handle for QA scripts (ScrollTrigger.getAll().length)
if (import.meta.env.DEV) (window as unknown as { ScrollTrigger: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;

/**
 * Media contexts for every scroll effect. Desktop and mobile both animate;
 * only `reduce` strips motion.
 */
export const MQ = {
  desktop: '(min-width: 1024px)',
  mobile: '(max-width: 1023px)',
  reduce: '(prefers-reduced-motion: reduce)',
  motion: '(prefers-reduced-motion: no-preference)',
};

let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => (lenis = l);
export const getLenis = () => lenis;

/** Smooth-scroll to an in-page anchor (falls back to native). */
export function scrollToHash(hash: string) {
  const el = hash === '#top' ? document.body : (document.querySelector(hash) as HTMLElement | null);
  if (!el) return;
  // pixel target, not the element: Lenis re-resolves an element mid-scroll and pinned sections shift it
  if (lenis) lenis.scrollTo(hash === '#top' ? 0 : el.getBoundingClientRect().top + window.scrollY, { duration: 1.4 });
  else if (hash === '#top') window.scrollTo({ top: 0, behavior: 'smooth' });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export const EASE = { out: 'power3.out', inOut: 'power3.inOut', elastic: 'elastic.out(1, 0.45)' };

export { gsap, ScrollTrigger };
