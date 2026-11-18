import { useEffect, useRef, useState } from 'react';
import { EVENT, NAV, UI, URLS } from '../data/event';
import { getLenis, scrollToHash } from '../lib/gsap';
import { Bolt } from './MagneticButton';

/** onHome=false (about page): links load the home page section instead of scrolling in place. */
export function Nav({ onHome = true }: { onHome?: boolean }) {
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

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

  const link = (href: string) => (onHome ? href : href === '#top' ? './' : `./${href}`);
  const go = (e: React.MouseEvent, href: string) => {
    if (!onHome) return;
    e.preventDefault();
    setOpen(false);
    // wait one frame so the scroll lock is released first
    requestAnimationFrame(() => scrollToHash(href));
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-3 z-[72] px-4 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] md:px-8`}
      >
        <nav aria-label={UI.navLabel} className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-line bg-bg py-1.5 pl-3 pr-1.5">
          <a href={link('#top')} onClick={(e) => go(e, '#top')} className="flex min-h-11 items-center gap-2" aria-label={UI.home}>
            <img src={EVENT.logos.bidyuth} alt="" className="h-6 w-auto sm:h-8 md:h-9" width={2036} height={490} />
          </a>
          <ul className="hidden items-center gap-5 xl:flex 2xl:gap-7">
            {NAV.links.map((l) => (
              <li key={l.href}>
                <a href={link(l.href)} onClick={(e) => go(e, l.href)} aria-label={l.label} className="mono flex min-h-11 min-w-11 items-center justify-center text-label hover:text-secondary">
                  {l.label.toUpperCase()}
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
              className="mono inline-flex min-h-11 items-center gap-1.5 rounded-full bg-secondary px-3 text-label font-bold text-bg sm:px-4"
            >
              {NAV.cta} <Bolt className="h-3.5 w-3.5" />
            </a>
            <button
              ref={menuBtn}
              type="button"
              className="mono min-h-11 rounded-full border border-line px-3 text-label sm:px-4 xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? UI.menuClose : UI.menuOpen}
            </button>
          </div>
        </nav>
      </header>

        {open && (
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={UI.menuOpen}
            className="menu-in fixed inset-0 z-[71] flex flex-col bg-bg px-4 pb-8 pt-24 xl:hidden"
          >
            <ul className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto [justify-content:safe_center]">
              {NAV.links.map((l, i) => (
                <li key={l.href} className="menu-item" style={{ animationDelay: `${200 + i * 70}ms` }}>
                  <a href={link(l.href)} onClick={(e) => go(e, l.href)} className="display block border-b border-line py-3 text-display-md">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mono text-label">
              {EVENT.dateShort} · {EVENT.venueFull}
            </p>
          </div>
        )}
    </>
  );
}
