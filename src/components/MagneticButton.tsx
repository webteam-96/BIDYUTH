import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  cursor?: string;
  ariaLabel?: string;
  variant?: 'tangerine' | 'ink';
};

/** Primary pill link. Press feedback only: the shadow tucks in on hover and the button dips on tap. */
export function MagneticButton({ href, children, className = '', cursor = 'REGISTER', ariaLabel, variant = 'tangerine' }: Props) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener' : undefined}
      aria-label={ariaLabel}
      data-cursor={cursor}
      className={`group relative inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 font-medium transition-[box-shadow,transform] duration-150 ease-out active:scale-[0.97] ${variant === 'ink' ? 'bg-ink text-bg shadow-[4px_4px_0_var(--bg)]' : 'bg-secondary text-bg shadow-[4px_4px_0_var(--ink)] hover:shadow-[2px_2px_0_var(--ink)]'} ${className}`}
    >
      {children}
      <Bolt className="h-4 w-4" />
    </a>
  );
}

export function Bolt({ className = '', fill = 'currentColor' }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M13.5 1 3 14h7l-1.5 9L19 10h-7z" fill={fill} />
    </svg>
  );
}
