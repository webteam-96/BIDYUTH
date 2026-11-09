import { useRef, type ElementType } from 'react';
import SplitType from 'split-type';
import { gsap } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

type Props = { title: string; accent?: string; as?: ElementType; className?: string };

/** Headline with an Instrument Serif accent; words rise in on scroll (SplitType). Runs on all widths. */
export function SplitText({ title, accent, as: Tag = 'h2', className = '' }: Props) {
  const ref = useRef<HTMLElement>(null);
  useScrollTrigger(ref, ({ reduce, mobile }) => {
    if (reduce || !ref.current) return;
    const split = new SplitType(ref.current, { types: 'words', wordClass: 'split-word' });
    gsap.from(split.words ?? [], {
      yPercent: mobile ? 60 : 110,
      rotate: mobile ? 3 : 6,
      opacity: 0,
      duration: mobile ? 0.8 : 1,
      ease: 'power4.out',
      stagger: mobile ? 0.04 : 0.06,
      scrollTrigger: { trigger: ref.current, start: 'top 88%' },
    });
    return () => split.revert();
  });
  return (
    <Tag ref={ref} className={`display text-display-md ${className}`}>
      {title}
      {accent && ' '}
      {accent && <span className="serif">{accent}</span>}
    </Tag>
  );
}

/** Section eyebrow: plain section name only. */
export function SectionLabel({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={`mono flex items-center gap-4 text-label ${className}`}>
      <span className="font-bold">{label}</span>
      <span className="h-px flex-1 bg-current opacity-20" />
    </div>
  );
}
