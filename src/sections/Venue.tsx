import { useRef } from 'react';
import { URLS, VENUE } from '../data/event';
import { gsap } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { SectionLabel } from '../components/SplitText';
import { Bolt, MagneticButton } from '../components/MagneticButton';

const PLACEHOLDER_BG = [
  'linear-gradient(135deg,#cfe8e6 0%,#1a9a94 60%,#0f5f63 100%)',
  'linear-gradient(160deg,#f6eedd 0%,#e8a317 100%)',
  'linear-gradient(120deg,#f6eedd 0%,#cfe8e6 100%)',
];

export function Venue() {
  const root = useRef<HTMLElement>(null);

  useScrollTrigger(root, ({ reduce, desktop }) => {
    if (reduce) {
      gsap.set('[data-fill]', { clipPath: 'inset(0 0% 0 0)' });
      return;
    }
    const st = { trigger: root.current, start: 'top 80%', end: 'bottom 20%', scrub: 0.6 };
    gsap.fromTo('[data-fill]', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'none', scrollTrigger: { ...st, end: 'center 40%' } });
    gsap.fromTo('[data-big]', { xPercent: 4 }, { xPercent: desktop ? -30 : -55, ease: 'none', scrollTrigger: st });
    gsap.utils.toArray<HTMLElement>('[data-par]').forEach((el) => {
      const amt = Number(el.dataset.par) * (desktop ? 1 : 0.5); // mobile parallax at half intensity
      gsap.fromTo(el, { yPercent: amt }, { yPercent: -amt, ease: 'none', scrollTrigger: st });
    });
  });

  return (
    <section ref={root} data-bg="var(--bg-alt)" className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <SectionLabel label={VENUE.label} className="mb-8 lg:mb-10" />
      </div>

      <div data-big className="relative whitespace-nowrap" aria-hidden="true">
        <p className="display outline-text text-[clamp(4.5rem,26vw,20rem)] lg:text-[clamp(5rem,17vw,20rem)]">{VENUE.big}</p>
        <p data-fill className="display absolute inset-0 text-[clamp(4.5rem,26vw,20rem)] text-ink lg:text-[clamp(5rem,17vw,20rem)]">
          {VENUE.big}
        </p>
      </div>
      <h2 className="sr-only">
        {VENUE.big}, {VENUE.city}
      </h2>

      <div className="mx-auto mt-10 grid max-w-[1400px] gap-10 px-4 md:px-8 lg:mt-14 lg:grid-cols-[1.2fr_1fr]">
        <figure className="flex flex-col gap-4">
        <div className="relative h-[24rem] md:h-[35rem]">
          {VENUE.images.map((img, i) => (
            <figure
              key={i}
              data-par={[12, 28, 18][i]}
              className={`absolute overflow-hidden rounded-[28px] border-2 border-ink shadow-[6px_6px_0_var(--ink)] ${
                ['left-0 top-0 h-[62%] w-[70%]', 'right-0 top-[22%] z-10 h-[48%] w-[48%]', 'bottom-0 left-[12%] z-20 h-[36%] w-[46%]'][i]
              }`}
              style={{ background: PLACEHOLDER_BG[i] }}
            >
              {img.src ? (
                <img src={img.src} srcSet={img.srcSet || undefined} sizes="(min-width: 1024px) 40vw, 90vw" alt={img.alt} title={`Photo: ${img.credit.who}, ${img.credit.license}, Wikimedia Commons`} loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <figcaption className="mono absolute bottom-3 left-4 right-4 text-label">{img.alt}</figcaption>
              )}
            </figure>
          ))}
        </div>

        {/* city caption replaces the old sticker */}
        <figcaption className="flex items-center gap-3 border-t-2 border-ink pt-3">
          <Bolt className="h-5 w-5 shrink-0 text-secondary" />
          <span className="display text-display-xs">{VENUE.city}</span>
          <span className="mono ml-auto text-meta opacity-80">{VENUE.coords}</span>
        </figcaption>
        </figure>

        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="serif mb-4 text-display-sm">{VENUE.city}, {VENUE.region}</p>
            <p className="max-w-[44ch] text-lead opacity-80">{VENUE.body}</p>
            <address className="mono mt-6 text-label not-italic leading-relaxed opacity-80">{VENUE.address}</address>
          </div>
          <div className="overflow-hidden rounded-[28px] border-2 border-ink">
            <iframe
              title={`Map of ${VENUE.big}, ${VENUE.city}`}
              src={URLS.MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[15rem] w-full grayscale-[0.6]"
            />
          </div>
          <MagneticButton href={URLS.MAPS_LINK} cursor="VIEW" className="w-full md:w-auto md:self-start">
            {VENUE.mapsCta}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
