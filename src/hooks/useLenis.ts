import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, setLenis } from '../lib/gsap';

/** Lenis smooth scroll driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    // wheel smoothing only; touch scroll stays native
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [enabled]);
}
