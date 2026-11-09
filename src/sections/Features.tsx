import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { FEATURES } from '../data/event';
import { gsap } from '../lib/gsap';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { SectionLabel, SplitText } from '../components/SplitText';

function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });
  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

const TONES = ['bg-bg', 'bg-primary-2', 'bg-bg', 'bg-secondary-2', 'bg-bg', 'bg-primary-2'];

function Dashboard() {
  const d = FEATURES.dashboard;
  const ref = useRef<HTMLDivElement>(null);
  useScrollTrigger(ref, ({ reduce }) => {
    const el = ref.current!.querySelector<HTMLElement>('[data-count]')!;
    const end = d.counter.value;
    if (reduce) return void (el.textContent = end.toLocaleString('en-IN'));
    const o = { v: 0 };
    gsap.to(o, {
      v: end,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString('en-IN')),
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    });
    gsap.from('[data-leader]', { x: -24, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
  });
  return (
    <div ref={ref} className="relative overflow-hidden rounded-[28px] border-2 border-ink bg-ink p-5 text-bg md:p-8">
      <h3 className="display text-display-sm">{d.title}</h3>
      <p className="mono mb-6 mt-2 flex items-center gap-2 text-label text-primary">
        <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-secondary [animation-duration:2s]" aria-hidden="true" />
        {d.caption}
      </p>
      <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
        <div className="rounded-2xl border border-bg/15 p-4">
          <p className="mono mb-2 text-label opacity-70">{d.counter.label}</p>
          <p className="display text-[clamp(3rem,14vw,4.5rem)] text-primary tabular-nums" data-count>
            0
          </p>
        </div>
        <ul className="divide-y divide-bg/10 rounded-2xl border border-bg/15">
          {d.leaders.map((l) => (
            <li key={l.label} data-leader className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="mono text-label text-secondary">{l.label}</span>
              <span className="text-body opacity-80">{l.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Features() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useScrollTrigger(root, ({ reduce, desktop }) => {
    if (reduce) return;
    const cards = gsap.utils.toArray<HTMLElement>('[data-card]');
    if (desktop) {
      // stacked deck in the grid centre → fanned out to the grid
      const offset = (el: HTMLElement, axis: 'x' | 'y') => {
        const g = grid.current!.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        return axis === 'x' ? g.left + g.width / 2 - (r.left + r.width / 2) : g.top + g.height / 2 - (r.top + r.height / 2);
      };
      gsap.fromTo(
        cards,
        { x: (_i, el) => offset(el, 'x'), y: (_i, el) => offset(el, 'y'), rotation: (i) => (i - 2.5) * 5 },
        {
          x: 0,
          y: 0,
          rotation: 0,
          ease: 'power2.inOut',
          stagger: 0.04,
          scrollTrigger: { trigger: grid.current, start: 'center center', end: '+=110%', pin: root.current, scrub: 0.6, invalidateOnRefresh: true },
        },
      );
    } else {
      // mobile: vertical stack, each card scales up and un-rotates as it enters
      cards.forEach((c, i) =>
        gsap.fromTo(
          c,
          { scale: 0.92, rotation: i % 2 ? 3 : -3 },
          { scale: 1, rotation: 0, ease: 'none', scrollTrigger: { trigger: c, start: 'top 95%', end: 'top 60%', scrub: 0.5 } },
        ),
      );
    }
  });

  return (
    <>
      <section ref={root} data-bg="var(--bg)" className="relative px-4 py-20 md:px-8 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:py-16">
        <div className="mx-auto w-full max-w-[1400px]">
          <SectionLabel label={FEATURES.label} className="mb-6 lg:mb-8" />
          <SplitText title={FEATURES.title} accent={FEATURES.titleAccent} className="mb-8 lg:mb-10" />
          <div ref={grid} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.items.map((f, i) => (
              <div key={f.title} data-card style={{ zIndex: 10 - i }} className="relative">
                <Tilt className={`h-full rounded-[28px] border-2 border-ink p-5 md:p-6 ${TONES[i]} shadow-[5px_5px_0_var(--ink)]`}>
                  <h3 className="display mb-3 text-display-xs lg:mt-10">{f.title}</h3>
                  <p className="text-body opacity-80">{f.body}</p>
                </Tilt>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative px-4 pb-20 md:px-8 lg:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <Dashboard />
        </div>
      </section>
    </>
  );
}
