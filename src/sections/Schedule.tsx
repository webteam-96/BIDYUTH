import { useState } from 'react';
import { SCHEDULE } from '../data/event';
import { SectionLabel, SplitText } from '../components/SplitText';
import { ComingSoon } from '../components/ComingSoon';

export function Schedule() {
  const [day, setDay] = useState(SCHEDULE.days[0].id);
  const [openRow, setOpenRow] = useState<string | null>(null);
  const current = SCHEDULE.days.find((d) => d.id === day)!;

  const pick = (id: string) => {
    setDay(id);
    setOpenRow(null);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = SCHEDULE.days.findIndex((d) => d.id === day);
    const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + SCHEDULE.days.length) % SCHEDULE.days.length;
    pick(SCHEDULE.days[n].id);
    document.getElementById(`tab-${SCHEDULE.days[n].id}`)?.focus();
  };

  return (
    <section id="schedule" data-bg="var(--bg)" className="relative px-4 py-20 md:px-8 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel label={SCHEDULE.label} className="mb-6 lg:mb-8" />
        {!SCHEDULE.ready ? (
          <>
            <SplitText title={SCHEDULE.title} accent={SCHEDULE.titleAccent} className="mb-8 lg:mb-12" />
            <ComingSoon text={SCHEDULE.comingSoon} />
          </>
        ) : (
        <>
        <div className="mb-8 flex flex-col justify-between gap-6 lg:mb-12 lg:flex-row lg:items-end lg:gap-8">
          <SplitText title={SCHEDULE.title} accent={SCHEDULE.titleAccent} />
          <div role="tablist" aria-label={SCHEDULE.tablistLabel} className="grid grid-cols-2 gap-1 rounded-full border-2 border-ink p-1 lg:flex lg:gap-2" onKeyDown={onKey}>
            {SCHEDULE.days.map((d) => {
              const on = d.id === day;
              return (
                <button
                  key={d.id}
                  id={`tab-${d.id}`}
                  role="tab"
                  aria-selected={on}
                  aria-controls={`panel-${d.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => pick(d.id)}
                  className={`relative min-h-11 rounded-full px-5 py-2.5 text-left transition-colors duration-200 lg:px-6 lg:py-3 ${on ? 'bg-ink' : ''}`}
                >
                  <span className={`relative block ${on ? 'text-bg' : ''}`}>
                    <span className="display block text-display-xs">{d.tab}</span>
                    <span className="mono text-label opacity-80">{d.date}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

          <div key={day} id={`panel-${day}`} role="tabpanel" aria-labelledby={`tab-${day}`}>
          <ol className="border-t-2 border-ink">
            {current.sessions.map((s) => {
              const id = s.time + s.title;
              const on = openRow === id;
              return (
                <li key={id} className="border-b border-line">
                  {/* tap to expand works everywhere; hover flood is a desktop bonus */}
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => setOpenRow(on ? null : id)}
                    className={`flood grid w-full grid-cols-1 gap-1 px-2 py-4 text-left md:grid-cols-[9rem_1fr_auto] md:items-center md:gap-4 md:px-4 md:py-5 ${on ? 'is-on' : ''}`}
                  >
                    <time className="mono text-meta font-bold tabular-nums">{s.time}</time>
                    <span className="display text-display-xs">{s.title}</span>
                    <span className="mono mt-1 w-max rounded-full border border-ink px-3 py-1 text-label md:mt-0">{s.type}</span>
                  </button>
                  <div aria-hidden={!on} className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <p className="overflow-hidden px-2 text-body md:pl-[10rem]">
                      <span className="block pb-4">{SCHEDULE.detailPlaceholder}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
          </div>
        <p className="mono mt-6 text-label opacity-70">{SCHEDULE.placeholderNote}</p>
        </>
        )}
      </div>
    </section>
  );
}
