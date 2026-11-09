import { useEffect, useState } from 'react';
import { PRICING, type Phase } from '../data/event';

export type PhaseStatus = 'closed' | 'active' | 'upcoming';
export type PhaseView = Phase & { status: PhaseStatus };

const t = (iso: string) => new Date(iso).getTime();

/** Pure: resolve phase statuses for a given time. */
export function resolvePhases(phases: Phase[], now: number): { list: PhaseView[]; active: PhaseView } {
  let activeIdx = phases.findIndex((p) => p.activeOverride);
  if (activeIdx < 0) activeIdx = phases.findIndex((p) => (p.deadline ? t(p.deadline) >= now : true));
  if (activeIdx < 0) activeIdx = phases.length - 1;
  const list = phases.map((p, i) => ({
    ...p,
    status: (i === activeIdx ? 'active' : i < activeIdx ? 'closed' : 'upcoming') as PhaseStatus,
  }));
  return { list, active: list[activeIdx] };
}

// self-check (dev only): phase rollover boundaries
if (import.meta.env.DEV) {
  const at = (iso: string) => resolvePhases(PRICING.phases, t(iso)).active.id;
  console.assert(at('2026-11-09T10:00:00+05:30') === 'eb1', 'phase: eb1');
  console.assert(at('2026-11-30T23:59:59+05:30') === 'eb1', 'phase: eb1 last second');
  console.assert(at('2026-12-01T00:00:00+05:30') === 'eb2', 'phase: eb2');
  console.assert(at('2026-12-31T12:00:00+05:30') === 'eb3', 'phase: eb3');
  console.assert(at('2027-01-01T00:00:00+05:30') === 'regular', 'phase: regular');
}

/** Current registration phase; re-evaluates every 30s so a deadline rollover flips the UI live. */
export function useActivePhase() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return resolvePhases(PRICING.phases, now);
}

export const formatINR = (n: number) => '₹' + n.toLocaleString('en-IN');
export const priceLabel = (p: Phase) => (p.price == null ? PRICING.tba : formatINR(p.price));
