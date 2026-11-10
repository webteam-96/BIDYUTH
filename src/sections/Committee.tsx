import { COMMITTEE } from '../data/event';
import { SectionLabel } from '../components/SplitText';
import { ComingSoon } from '../components/ComingSoon';
import { Bolt } from '../components/MagneticButton';

export function Committee() {
  return (
    <section id="committee" data-bg="var(--bg)" className="relative px-4 py-20 md:px-8 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel label={COMMITTEE.label} className="mb-6 lg:mb-8" />
        {COMMITTEE.ready ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMMITTEE.members.map((m) => (
              <li key={m.name} className="flex min-h-[9rem] flex-col justify-between gap-6 rounded-[28px] border-2 border-ink bg-bg p-5 shadow-[5px_5px_0_var(--ink)] md:p-6">
                <Bolt className="h-5 w-5 text-secondary" />
                <div>
                  <p className="display text-display-xs leading-tight">{m.name}</p>
                  {m.role && <p className="mono mt-2 text-label opacity-70">{m.role}</p>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ComingSoon text={COMMITTEE.comingSoon} />
        )}
      </div>
    </section>
  );
}
