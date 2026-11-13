import { useEffect, useState } from 'react';
import { MARQUEE, UI, URLS } from './data/event';
import { gsap, ScrollTrigger, getLenis, scrollToHash } from './lib/gsap';
import { useLenis } from './hooks/useLenis';
import { useReducedMotion } from './hooks/useReducedMotion';
import { priceLabel, useActivePhase } from './hooks/useActivePhase';
import { Preloader } from './components/Preloader';
import { Nav } from './components/Nav';
import { ChargeMeter } from './components/ChargeMeter';
import { CurrentLines } from './components/CurrentLines';
import { Marquee } from './components/Marquee';
import { Bolt } from './components/MagneticButton';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Numbers } from './sections/Numbers';
import { Features } from './sections/Features';
import { Pricing } from './sections/Pricing';
import { Speakers } from './sections/Speakers';
import { Schedule } from './sections/Schedule';
import { Venue } from './sections/Venue';
import { Partners } from './sections/Partners';
// import { AppTeaser } from './sections/AppTeaser';
import { Committee } from './sections/Committee';
import { FAQ } from './sections/FAQ';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './sections/Footer';

function MobileRegisterBar() {
  const { active } = useActivePhase();
  const [show, setShow] = useState(false);
  const [inPricing, setInPricing] = useState(false);
  useEffect(() => {
    // pricing has its own register button: don't stack the bar on top of it
    const pr = ScrollTrigger.create({ trigger: '[data-pricing-cta]', start: 'top bottom', end: 'bottom top', onToggle: (s) => setInPricing(s.isActive) });
    // visible after the hero, hidden once the final CTA (and the footer below it) arrives
    const st = ScrollTrigger.create({
      trigger: '#top',
      start: 'bottom 80%',
      endTrigger: '#register',
      end: 'top bottom',
      refreshPriority: -1,
      onToggle: (s) => setShow(s.isActive),
    });
    return () => (st.kill(), pr.kill());
  }, []);
  const visible = show && !inPricing;
  return (
    <a
      href={URLS.REGISTRATION_URL}
      target="_blank"
      rel="noopener"
      className={`fixed inset-x-4 bottom-3 z-[75] flex min-h-14 items-center justify-between rounded-full border-2 border-ink bg-secondary px-6 text-bg shadow-[4px_4px_0_var(--ink)] transition-transform duration-500 lg:hidden ${visible ? '' : 'translate-y-[160%]'}`}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <span className="mono text-meta font-bold">
        {UI.mobileBar} {priceLabel(active)} →
      </span>
      <Bolt className="h-5 w-5" />
    </a>
  );
}

export default function App() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  useLenis(!reduce);

  // hold scroll while the preloader runs
  useEffect(() => {
    const l = getLenis();
    if (!ready) {
      l?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      l?.start();
      document.documentElement.style.overflow = '';
      ScrollTrigger.refresh();
      // arriving from the about page with a section hash (e.g. ./#faq)
      if (location.hash) requestAnimationFrame(() => scrollToHash(location.hash));
    }
  }, [ready, reduce]);

  // refresh pins once web fonts settle; background interpolates between sections
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    // resolve var(--x) to a real colour: GSAP can't interpolate CSS custom properties
    const root = getComputedStyle(document.documentElement);
    const resolve = (v = '') => (v.startsWith('var(') ? root.getPropertyValue(v.slice(4, -1)).trim() : v);
    // Colour = last section whose top has passed 55% of the viewport. Tops are measured on the
    // pin-spacer when a section is pinned, so there is no gap while a pin is active.
    const els = gsap.utils.toArray<HTMLElement>('[data-bg]');
    let tops: number[] = [];
    let current = '';
    const measure = () => {
      tops = els.map((el) => {
        const box = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
        return box.getBoundingClientRect().top + window.scrollY;
      });
    };
    const apply = (y: number) => {
      const line = y + window.innerHeight * 0.55;
      let i = 0;
      tops.forEach((t, k) => t <= line && (i = k));
      const c = resolve(els[i]?.dataset.bg);
      if (c && c !== current) {
        current = c;
        gsap.to(document.body, { backgroundColor: c, duration: 0.7, overwrite: true });
      }
    };
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      refreshPriority: -1, // measure after every pin has been laid out
      onRefresh: (s) => (measure(), apply(s.scroll())),
      onUpdate: (s) => apply(s.scroll()),
    });
    return () => st.kill();
  }, []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-secondary focus:text-bg focus:px-4 focus:py-2">
        {UI.skip}
      </a>
      <Preloader onDone={() => setReady(true)} />
      <ChargeMeter />
      <Nav />
      <main id="main" className="relative">
        <CurrentLines />
        <Hero ready={ready} />
        <div className="relative z-10 -my-2 overflow-hidden py-10">
          <Marquee items={MARQUEE} className="-rotate-2 scale-[1.03]" />
          <Marquee items={MARQUEE} tone="sky" reverse className="-mt-6 rotate-1 scale-[1.03]" />
        </div>
        <About />
        <Numbers />
        <Features />
        <Pricing />
        <Speakers />
        <Schedule />
        <Venue />
        <Partners />
        {/* hidden: delegate app teaser */}
        <Committee />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileRegisterBar />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
