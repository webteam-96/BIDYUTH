import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EVENT, NAV, UI, URLS } from '../data/event';
import { ScrollTrigger, getLenis, scrollToHash } from '../lib/gsap';
import { Bolt } from './MagneticButton';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&';

function Scramble({ text }: { text: string }) {
  const [out, setOut] = useState(text);
  const timer = useRef<number>(0);
  const run = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let f = 0;
    window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      f++;
      setOut(text.split('').map((c, i) => (i < f / 2 ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(''));
      if (f / 2 >= text.length) window.clearInterval(timer.current);
    }, 28);
  };
  useEffect(() => () => window.clearInterval(timer.current), []);
  return (
    <span aria-hidden="true" onMouseEnter={run} className="inline-block min-w-[4ch]">
      {out}
    </span>
  );
}

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => setHidden(s.direction === 1 && s.scroll() > 240) });
    return () => st.kill();
  }, []);

  // lock page scroll + Escape to close while the overlay is open
  useEffect(() => {
    if (!open) return;
    const l = getLenis();
    l?.stop();
    document.documentElement.style.overflow = 'hidden';
    const key = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', key);
    return () => {
      l?.start();
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', key);
      menuBtn.current?.focus();
    };
  }, [open]);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    // wait one frame so the scroll lock is released first
    requestAnimationFrame(() => scrollToHash(href));
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-3 z-[72] px-4 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] md:px-8 ${hidden && !open ? '-translate-y-[140%]' : ''}`}
      >
        <nav aria-label={UI.navLabel} className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-line bg-bg/85 py-1.5 pl-3 pr-1.5 backdrop-blur-md">
          <a href="#top" onClick={(e) => go(e, '#top')} className="flex min-h-11 items-center gap-2" aria-label={UI.home}>
            <img src={EVENT.logos.bidyuth} alt="" className="h-8 w-auto md:h-9" width={2036} height={490} />
          </a>
          <ul className="hidden items-center gap-5 xl:flex 2xl:gap-7">
            {NAV.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => go(e, l.href)} aria-label={l.label} className="mono flex min-h-11 min-w-11 items-center justify-center text-label hover:text-secondary">
                  <Scramble text={l.label.toUpperCase()} />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5">
            <a
              href={URLS.REGISTRATION_URL}
              target="_blank"
              rel="noopener"
              data-cursor="REGISTER"
              className="mono inline-flex min-h-11 items-center gap-1.5 rounded-full bg-secondary px-4 text-label font-bold text-ink"
            >
              {NAV.cta} <Bolt className="h-3.5 w-3.5" />
            </a>
            <button
              ref={menuBtn}
              type="button"
              className="mono min-h-11 rounded-full border border-line px-4 text-label xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? UI.menuClose : UI.menuOpen}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={UI.menuOpen}
            className="fixed inset-0 z-[71] flex flex-col bg-bg px-4 pb-8 pt-24 xl:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
          >
            <motion.ul
              className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto [justify-content:safe_center]"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
            >
              {NAV.links.map((l) => (
                <motion.li key={l.href} variants={{ hidden: { y: 40, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } } }}>
                  <a href={l.href} onClick={(e) => go(e, l.href)} className="display block border-b border-line py-3 text-display-md">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <p className="mono text-label">
              {EVENT.dateShort} · {EVENT.venueFull}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
