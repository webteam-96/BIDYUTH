import { useLayoutEffect } from 'react';
import { gsap } from '../lib/gsap';
import { EVENT, HERO, MARQUEE, PRELOADER } from '../data/event';

const NS = 'http://www.w3.org/2000/svg';
// Only two panel tones, ~0.05 apart in relative luminance, so rapid cuts never read as flashes.
const TONES = ['#F7E4DF', '#CFE8E6'];

function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>, text?: string) {
  const n = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, String(v)));
  if (text) n.textContent = text;
  return n;
}

/** One comic panel: flat tone, halftone dots, a huge event phrase and a couple of ink slashes. */
function panel(phrase: string, i: number) {
  const g = el('g', {});
  g.append(
    el('rect', { x: 0, y: 0, width: 1000, height: 240, fill: TONES[i % 2] }),
    el('rect', { x: 0, y: 0, width: 1000, height: 240, fill: 'url(#pl-dots)' }),
    el('rect', { x: -50, y: 40 + (i % 3) * 50, width: 1100, height: 10, fill: '#1F2A2E', transform: `rotate(${i % 2 ? -8 : 7} 500 120)` }),
  );
  const t = el('text', { x: i % 2 ? 40 : 980, y: 175, 'text-anchor': i % 2 ? 'start' : 'end', class: 'pl-word', fill: '#1F2A2E', 'font-size': 150, 'data-phrase': '' }, phrase);
  g.append(t);
  return g;
}

/**
 * Marvel-style intro: comic panels flip through *inside* the BIDYUTH letters while the
 * camera pulls back, the word settles to solid sky blue, a current line draws across and
 * the dark panel collapses onto it to reveal the site. No white flashes.
 * Markup lives in index.html (#preloader) so the outline paints before the JS bundle boots.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  useLayoutEffect(() => {
    const root = document.getElementById('preloader');
    if (!root) return void onDone();
    root.setAttribute('aria-label', PRELOADER.aria);
    root.querySelector('[data-label-text]')!.textContent = PRELOADER.label;
    root.querySelectorAll('[data-word]').forEach((w) => (w.textContent = EVENT.name));

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 1023px)').matches;
    const phrases = [...MARQUEE, `${HERO.date.range} ${HERO.date.monthYear.split(' ')[0].slice(0, 3).toUpperCase()}`];
    const reel = root.querySelector('[data-reel]')!;
    const panels = phrases.map((p, i) => reel.appendChild(panel(p, i)));

    // mobile ≈1.6s total, desktop ≈2.9s
    const reelTime = reduce ? 0.5 : mobile ? 0.95 : 1.8;
    const step = reelTime / panels.length;

    const ctx = gsap.context(() => {
      const num = root.querySelector('[data-num]')!;
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          root.remove();
          onDone();
        },
      });
      tl.to(counter, {
        v: 100,
        duration: reelTime,
        ease: 'none',
        onUpdate: () => (num.textContent = String(Math.round(counter.v)).padStart(3, '0')),
      });

      if (reduce) {
        tl.set('[data-solid]', { opacity: 1 }, 0).to(root, { opacity: 0, duration: 0.3 });
        return;
      }

      gsap.set(panels, { y: 240 });
      // camera pulls back while the pages flip
      tl.fromTo('[data-logo]', { scale: mobile ? 1.25 : 1.45 }, { scale: 1, duration: reelTime + 0.35, ease: 'power3.out', transformOrigin: '50% 50%' }, 0);
      panels.forEach((p, i) => {
        const at = i * step;
        // page flips up into place with a little overshoot skew, phrase keeps drifting
        tl.fromTo(p, { y: 240, skewY: -6 }, { y: 0, skewY: 0, duration: step * 0.9, ease: 'power3.out' }, at);
        tl.fromTo(p.querySelector('[data-phrase]'), { x: i % 2 ? 60 : -60 }, { x: i % 2 ? -40 : 40, duration: step * 2, ease: 'none' }, at);
      });
      tl.to('[data-solid]', { opacity: 1, duration: 0.3, ease: 'power2.out' }, reelTime - 0.05)
        .to('[data-line]', { scaleX: 1, duration: mobile ? 0.25 : 0.4, ease: 'power3.inOut' }, '+=0.05')
        // panel closes onto the line, revealing the page from the centre out
        .to('[data-panel]', { clipPath: 'inset(50% 0 50% 0)', duration: mobile ? 0.45 : 0.7, ease: 'power4.inOut' })
        .to('[data-line]', { scaleX: 0, transformOrigin: 'right center', duration: mobile ? 0.25 : 0.35, ease: 'power3.in' }, '-=0.15');
    }, root);
    return () => {
      ctx.revert();
      panels.forEach((p) => p.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
