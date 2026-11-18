import { useState } from 'react';
import { FAQ as DATA } from '../data/event';
import { SectionLabel, SplitText } from '../components/SplitText';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" data-bg="var(--bg-alt)" className="relative px-4 py-20 md:px-8 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <div>
          <SectionLabel label={DATA.label} className="mb-6 lg:mb-8" />
          <SplitText title={DATA.title} accent={DATA.titleAccent} />
        </div>
        <ul className="border-t-2 border-ink">
          {DATA.items.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q} className="border-b border-ink/20">
                <h3>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                    className="flex min-h-11 w-full items-center justify-between gap-4 py-5 text-left md:gap-6 md:py-6"
                  >
                    <span className="display text-display-xs leading-[1.1]">{f.q}</span>
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink text-2xl leading-none transition-transform duration-200 ease-out ${on ? 'rotate-45 bg-secondary text-bg' : ''}`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </h3>
                {/* grid-rows 0fr -> 1fr animates to the answer's real height */}
                <div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  aria-hidden={!on}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[60ch] pb-6 text-lead opacity-80">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
