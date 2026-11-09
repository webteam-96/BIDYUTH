import { useLayoutEffect, type DependencyList, type RefObject } from 'react';
import { gsap, MQ } from '../lib/gsap';

export type Conditions = { motion: boolean; desktop: boolean; mobile: boolean; reduce: boolean };

/**
 * Scoped gsap.matchMedia: effects re-run when breakpoint / motion prefs change,
 * and every tween + ScrollTrigger is reverted (killed) on unmount.
 * Setup is deferred to its own task (FIFO, so DOM/pin order is kept) to split
 * boot work into short tasks while the preloader covers the page.
 */
export function useScrollTrigger(
  scope: RefObject<HTMLElement | null>,
  setup: (c: Conditions) => void | (() => void),
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    let mm: gsap.MatchMedia | null = null;
    const id = window.setTimeout(() => {
      if (!scope.current) return;
      mm = gsap.matchMedia(scope.current);
      mm.add(MQ, (ctx) => setup(ctx.conditions as Conditions));
    }, 0);
    return () => {
      window.clearTimeout(id);
      mm?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
