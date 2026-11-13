import { Fragment } from 'react';
import { UI } from './data/event';
import { OPS_EMAIL, POLICIES, type Block } from './data/legal';
import { SectionLabel } from './components/SplitText';
import { Bolt } from './components/MagneticButton';
import { Nav } from './components/Nav';
import { Footer } from './sections/Footer';

/** Turns the operations email inside policy text into a mailto link. */
function Text({ t }: { t: string }) {
  const parts = t.split(OPS_EMAIL);
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {p}
          {i < parts.length - 1 && (
            <a href={`mailto:${OPS_EMAIL}`} className="font-bold text-secondary underline underline-offset-2">
              {OPS_EMAIL}
            </a>
          )}
        </Fragment>
      ))}
    </>
  );
}

function PolicyBlock({ b }: { b: Block }) {
  if (typeof b === 'string') return <p><Text t={b} /></p>;
  if ('h' in b) return <h3 className="display pt-6 text-display-xs">{b.h}</h3>;
  if ('list' in b)
    return (
      <ul className="flex flex-col gap-2 pl-1">
        {b.list.map((li) => (
          <li key={li} className="flex gap-3">
            <Bolt className="mt-[0.35em] h-3.5 w-3.5 shrink-0 text-secondary" />
            <span><Text t={li} /></span>
          </li>
        ))}
      </ul>
    );
  return (
    <p>
      <strong>{b.lead}.</strong> <Text t={b.t} />
    </p>
  );
}

/** One policy per page; which one comes from <body data-policy> in privacy/terms/refund.html. */
export function PolicyPage({ id }: { id: string }) {
  const p = POLICIES.find((x) => x.id === id) ?? POLICIES[0];
  const others = POLICIES.filter((x) => x.id !== p.id);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-secondary focus:text-bg focus:px-4 focus:py-2">
        {UI.skip}
      </a>
      <Nav onHome={false} />
      <main id="main" className="px-4 pb-20 pt-32 md:px-8 lg:pb-28 lg:pt-40">
        <article className="mx-auto max-w-[1400px]">
          <SectionLabel label="Policies" className="mb-8" />
          <h1 className="display text-display-md">{p.title}</h1>
          {p.meta && <p className="mono mt-4 text-label opacity-70">{p.meta}</p>}
          <div className="mt-12 grid gap-12 border-t-2 border-ink pt-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="mono mb-4 text-label opacity-70">Also read</p>
              <ul className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
                {others.map((o) => (
                  <li key={o.id}>
                    <a href={`${o.id}.html`} className="mono inline-flex min-h-11 items-center rounded-full border-2 border-ink px-4 text-label hover:bg-ink hover:text-bg">
                      {o.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
            <div className="flex max-w-[75ch] flex-col gap-4 text-body">
              {p.blocks.map((b, i) => (
                <PolicyBlock key={i} b={b} />
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer onHome={false} />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
