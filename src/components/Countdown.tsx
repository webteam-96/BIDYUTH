import { useEffect, useState } from 'react';
import { UI } from '../data/event';

const pad = (n: number) => String(n).padStart(2, '0');

/** Live countdown to an ISO date. Digits ≥20px, unit labels ≥13px. Screen readers get one static label. */
export function Countdown({ to, className = '', tone = 'ink' }: { to: string; className?: string; tone?: 'ink' | 'light' }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const ms = Math.max(0, new Date(to).getTime() - now);
  const d = Math.floor(ms / 864e5);
  const h = Math.floor((ms / 36e5) % 24);
  const m = Math.floor((ms / 6e4) % 60);
  const s = Math.floor((ms / 1e3) % 60);
  return (
    <span className={`inline-flex items-start gap-3 tabular-nums ${className}`} role="timer" aria-label={UI.countdownAria(d, h, m)}>
      {[d, h, m, s].map((v, i) => (
        <span key={i} aria-hidden="true" className="flex flex-col items-center">
          <span className="mono text-countdown font-bold">{pad(v)}</span>
          <span className={`mono text-label normal-case tracking-normal ${tone === 'ink' ? 'opacity-70' : 'opacity-80'}`}>{UI.countdownUnits[i]}</span>
        </span>
      ))}
    </span>
  );
}
