import { UI } from '../data/event';

/** Stand-in for a section whose content isn't confirmed yet. */
export function ComingSoon({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-[28px] border-2 border-dashed border-ink/30 px-6 py-12 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-16">
      <p className="display text-display-sm">{UI.comingSoon}</p>
      <p className="max-w-[40ch] text-body opacity-80">{text}</p>
    </div>
  );
}
