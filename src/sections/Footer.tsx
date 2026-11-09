import { CONTACT, EVENT, NAV, TECH } from '../data/event';
import { scrollToHash } from '../lib/gsap';

const LINK = 'inline-flex min-h-11 min-w-11 items-center';

function Swap({ text }: { text: string }) {
  return (
    <span className="swap" aria-hidden="true">
      {text.split('').map((c, i) => (
        <span key={i} data-c={c} style={{ transitionDelay: `${i * 18}ms` }}>
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </span>
  );
}

export function Footer() {
  return (
    <footer data-bg="var(--ink)" className="relative overflow-hidden bg-ink px-4 pt-16 text-bg md:px-8 md:pt-20">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-4 md:gap-12">
        <div className="md:col-span-2">
          <div className="mb-6 flex items-center gap-4">
            <img src={EVENT.logos.bbb} alt={`${EVENT.organiserShort} logo`} className="h-10 w-auto rounded-full bg-bg p-1" width={120} height={40} loading="lazy" />
            <img src={EVENT.logos.kaizen} alt={`${TECH.name} logo`} className="h-10 w-auto rounded-lg bg-bg p-1" width={200} height={40} loading="lazy" />
          </div>
          <p className="serif text-display-xs">{EVENT.tagline}.</p>
          <p className="mono mt-3 text-label opacity-80">
            {EVENT.dateShort} · {EVENT.venueFull}
          </p>
        </div>
        <div>
          <h2 className="mono mb-2 text-label text-primary">{CONTACT.contactLabel}</h2>
          <ul className="text-lead">
            <li>
              <a className={LINK} href={`mailto:${CONTACT.email}`} aria-label={CONTACT.email}>
                <Swap text={CONTACT.email} />
              </a>
            </li>
            <li>
              <a className={LINK} href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} aria-label={CONTACT.phone}>
                <Swap text={CONTACT.phone} />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mono mb-2 text-label text-primary">{CONTACT.followLabel}</h2>
          <ul className="text-lead">
            {CONTACT.socials.map((s) => (
              <li key={s.label}>
                <a className={LINK} href={s.href} target="_blank" rel="noopener" aria-label={s.label}>
                  <Swap text={s.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1400px] flex-col justify-between gap-4 border-t border-bg/15 py-6 md:flex-row md:items-center">
        <ul className="mono flex flex-wrap gap-x-5 text-label opacity-80">
          {NAV.links.map((l) => (
            <li key={l.href}>
              <a
                className={LINK}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash(l.href);
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mono text-label normal-case tracking-normal opacity-70">{CONTACT.copyright}</p>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToHash('#top');
          }}
          className="mono inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-bg/30 px-4 text-label hover:bg-secondary hover:text-ink md:self-auto"
        >
          ↑ {CONTACT.backToTop}
        </a>
      </div>

      <p aria-hidden="true" className="display pointer-events-none -mb-[0.24em] select-none whitespace-nowrap text-center text-[19vw] leading-[0.8] text-bg">
        {EVENT.name} <span className="serif text-secondary">{EVENT.year}</span>
      </p>
    </footer>
  );
}
