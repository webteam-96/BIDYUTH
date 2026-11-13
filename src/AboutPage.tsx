import { EVENT, NAV, STATS, UI, URLS } from './data/event';
import { ABOUT_PAGE as A } from './data/legal';
import { SectionLabel } from './components/SplitText';
import { MagneticButton } from './components/MagneticButton';
import { Nav } from './components/Nav';
import { Footer } from './sections/Footer';

export function AboutPage() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-secondary focus:text-bg focus:px-4 focus:py-2">
        {UI.skip}
      </a>
      <Nav onHome={false} />

      <main id="main">
        {/* hero: headline + key facts */}
        <section className="px-4 pb-16 pt-32 md:px-8 lg:pb-24 lg:pt-40">
          <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:gap-16">
            <div>
              <SectionLabel label={A.label} className="mb-8" />
              <h1 className="display text-display-md max-w-[16ch]">
                {A.title} <span className="serif">{A.titleAccent}</span>
              </h1>
            </div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border-2 border-ink bg-ink shadow-[5px_5px_0_var(--ink)]">
              {[
                ['Dates', EVENT.dateLabel],
                ['Venue', EVENT.venueFull],
                ...STATS.items.map((s) => [s.label, `${s.value}${s.suffix}`]),
              ].map(([k, v]) => (
                <div key={k} className="bg-bg-alt p-4 md:p-5">
                  <dt className="mono text-label opacity-70">{k}</dt>
                  <dd className="mt-1 font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* the letter, read as one column */}
        <section id="event" className="border-t-2 border-ink px-4 py-16 md:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="mono text-label opacity-70">{A.letterLabel}</p>
              <p className="serif mt-3 text-display-xs">{A.salutation}</p>
            </div>
            <div className="flex max-w-[65ch] flex-col gap-6 text-lead">
              <p>{A.intro}</p>
              <h2 className="mono pt-4 text-label text-secondary">{A.overviewLabel}</h2>
              <p>{A.overview}</p>
              <p>{A.closing}</p>
              <div className="pt-4">
                <p className="text-body opacity-80">{A.signOff}</p>
                <p className="serif mt-1 text-display-xs">{A.signature}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y-2 border-ink bg-primary-2 px-4 py-16 md:px-8 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="display mb-10 text-display-sm">{A.whyLabel}</h2>
            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {A.why.map((w, i) => (
                <li key={w} className="flex min-h-[10rem] flex-col justify-between gap-6 rounded-[28px] border-2 border-ink bg-bg-alt p-5 shadow-[5px_5px_0_var(--ink)]">
                  <span className="mono text-label text-secondary">0{i + 1}</span>
                  <p className="text-lead font-bold leading-snug">{w}</p>
                </li>
              ))}
            </ol>
            <MagneticButton href={URLS.REGISTRATION_URL} className="mt-12">{NAV.cta}</MagneticButton>
          </div>
        </section>

      </main>
      <Footer onHome={false} />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
