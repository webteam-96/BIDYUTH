import { FEATURES } from '../data/event';
import { SectionLabel, SplitText } from '../components/SplitText';
import { ComingSoon } from '../components/ComingSoon';

// Event highlights. The old app-feature cards + KYT dashboard mock live in git history (9da6252).
export function Features() {
  return (
    <section id="highlights" data-bg="var(--bg)" className="relative px-4 py-20 md:px-8 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel label={FEATURES.label} className="mb-6 lg:mb-8" />
        <SplitText title={FEATURES.title} accent={FEATURES.titleAccent} className="mb-8 lg:mb-10" />
        {FEATURES.items.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.items.map((f) => (
              <div key={f.title} className="rounded-[28px] border-2 border-ink p-5 shadow-[5px_5px_0_var(--ink)] md:p-6">
                <h3 className="display mb-3 text-display-xs">{f.title}</h3>
                <p className="text-body opacity-80">{f.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <ComingSoon text={FEATURES.comingSoon} />
        )}
      </div>
    </section>
  );
}
