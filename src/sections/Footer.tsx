import { CONTACT, EVENT, HERO, NAV, POLICY_LINKS, TECH } from '../data/event';
import { scrollToHash } from '../lib/gsap';

/** onHome=false (about page): section links load the home page instead of scrolling in place. */
export function Footer({ onHome = true }: { onHome?: boolean }) {
  return (
    <footer data-bg="var(--ink)" className="bg-ink px-4 pb-8 pt-16 text-bg md:px-8 md:pt-20">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <img src={EVENT.logos.bidyuthWhite} alt={`${EVENT.organiserShort} ${EVENT.name} logo`} className="h-12 w-auto md:h-14" width={2036} height={490} loading="lazy" />
          <p className="serif mt-5 text-display-xs">{EVENT.tagline}.</p>
          <p className="mt-2 text-body opacity-80">
            {HERO.date.range} {HERO.date.monthYear} · {EVENT.venueFull}
          </p>
        </div>
        <nav aria-label={CONTACT.footerNavLabel}>
          <ul className="flex flex-wrap gap-x-8 gap-y-1 text-body">
            {NAV.links.map((l) => (
              <li key={l.href}>
                <a
                  className="inline-flex min-h-11 items-center hover:text-secondary"
                  href={onHome ? l.href : `./${l.href}`}
                  onClick={(e) => {
                    if (!onHome) return;
                    e.preventDefault();
                    scrollToHash(l.href);
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1400px] flex-col gap-4 border-t border-bg/15 pt-6 text-meta md:flex-row md:items-center md:justify-between">
        <p className="opacity-70">{CONTACT.copyright}</p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <ul className="flex flex-wrap gap-x-6">
            {POLICY_LINKS.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="inline-flex min-h-11 items-center opacity-70 hover:text-secondary hover:opacity-100">
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="flex items-center gap-3">
            <span className="opacity-70">{CONTACT.techLabel}</span>
            <img src={EVENT.logos.kaizen} alt={TECH.name} className="h-9 w-auto rounded-md bg-bg p-0.5" width={602} height={376} loading="lazy" />
          </span>
        </div>
      </div>
    </footer>
  );
}
