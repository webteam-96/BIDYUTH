import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  cursor?: string;
  strength?: number;
  ariaLabel?: string;
  variant?: 'tangerine' | 'ink';
};

/** Anchor that drifts toward the pointer. */
export function MagneticButton({ href, children, className = '', cursor = 'REGISTER', strength = 0.35, ariaLabel, variant = 'tangerine' }: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 14, mass: 0.4 });
  const ix = useSpring(useMotionValue(0), { stiffness: 220, damping: 14 });
  const iy = useSpring(useMotionValue(0), { stiffness: 220, damping: 14 });

  const move = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
    ix.set(dx * strength * 0.4);
    iy.set(dy * strength * 0.4);
  };
  const leave = () => [x, y, ix, iy].forEach((v) => v.set(0));
  const external = /^https?:/.test(href);

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener' : undefined}
      aria-label={ariaLabel}
      data-cursor={cursor}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 font-medium transition-shadow ${variant === 'ink' ? 'bg-ink text-bg shadow-[4px_4px_0_var(--bg)]' : 'bg-secondary text-ink shadow-[4px_4px_0_var(--ink)] hover:shadow-[2px_2px_0_var(--ink)]'} ${className}`}
    >
      <motion.span style={{ x: ix, y: iy }} className="relative inline-flex items-center gap-3">
        {children}
        <Bolt className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
      </motion.span>
    </motion.a>
  );
}

export function Bolt({ className = '', fill = 'currentColor' }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M13.5 1 3 14h7l-1.5 9L19 10h-7z" fill={fill} />
    </svg>
  );
}
