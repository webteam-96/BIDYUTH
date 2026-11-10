import { COMMITTEE } from '../data/event';
import { SectionLabel } from '../components/SplitText';
import { ComingSoon } from '../components/ComingSoon';

export function Committee() {
  return (
    <section id="committee" data-bg="var(--bg)" className="relative px-4 py-20 md:px-8 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel label={COMMITTEE.label} className="mb-6 lg:mb-8" />
        {COMMITTEE.ready ? (
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {COMMITTEE.members.map((m, i) => (
              <li key={i} className="rounded-[24px] border border-line p-3 md:p-4">
                <div className="mb-4 aspect-square rounded-2xl bg-bg-alt" aria-hidden="true" />
                <p className="text-body font-medium">{m.name}</p>
                <p className="mono text-label opacity-70">{m.role}</p>
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
