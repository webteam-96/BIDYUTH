import { useRef } from 'react';
import { ABOUT } from '../data/event';
import { gsap } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { SectionLabel } from '../components/SplitText';
import { Bolt } from '../components/MagneticButton';

const words = ABOUT.manifesto.flatMap((s) => s.t.split(' ').map((w) => ({ w, hl: !!s.hl })));

export function About() {
  const root = useRef<HTMLElement>(null);

  useScrollTrigger(root, ({ reduce, desktop }) => {
    if (reduce) return;
    const els = gsap.utils.toArray<HTMLElement>('[data-w]');
    const tl = gsap.timeline({
      scrollTrigger: desktop
        ? { trigger: root.current, start: 'top top', end: '+=160%', pin: true, scrub: 0.5 }
        : // mobile: no pin, fill as the paragraph passes
          { trigger: '[data-manifesto]', start: 'top 80%', end: 'bottom 40%', scrub: 0.5 },
    });
    els.forEach((el, i) => {
      tl.fromTo(el, { opacity: 0.15 }, { opacity: 1, duration: 0.1, ease: 'none' }, i * 0.1);
      const ul = el.querySelector('[data-ul]');
      const sp = el.querySelector('[data-spark]');
      if (ul) tl.fromTo(ul, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.out' }, i * 0.1);
      if (sp) tl.fromTo(sp, { scale: 0, rotate: -40 }, { scale: 1, rotate: 0, duration: 0.3, ease: 'back.out(3)' }, i * 0.1 + 0.3);
    });
  });

  return (
    <section ref={root} id="about" data-bg="var(--bg)" className="relative px-4 py-20 md:px-8 lg:flex lg:min-h-[100svh] lg:items-center lg:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <SectionLabel label={ABOUT.label} className="mb-8 lg:mb-12" />
        <p data-manifesto className="display max-w-[28ch] text-manifesto tracking-[-0.03em]">
          {words.map(({ w, hl }, i) => (
            <span key={i} data-w className="relative inline-block">
              {hl ? (
                <span className="relative inline-block text-ink">
                  {w}
                  <span data-ul aria-hidden="true" className="absolute -bottom-[0.06em] left-0 h-[0.1em] w-full origin-left rounded-full bg-secondary" />
                  <span data-spark aria-hidden="true" className="absolute -right-[0.35em] -top-[0.2em] inline-block text-secondary">
                    <Bolt className="h-[0.4em] w-[0.4em]" />
                  </span>
                </span>
              ) : (
                w
              )}
              {' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
