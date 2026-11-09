import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
                    <span className="display text-display-xs">{f.q}</span>
                    <motion.span
                      animate={{ rotate: on ? 45 : 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink text-2xl leading-none ${on ? 'bg-secondary' : ''}`}
                      aria-hidden="true"
                    >
                      +
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`faq-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[60ch] pb-6 text-lead opacity-80">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
