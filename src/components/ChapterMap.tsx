import { STATS } from '../data/event';
import { INDIA_STATES } from '../data/indiaStates';

// palette taken from the BBB statewise chapters sheet
const C = { active: '#F27E19', idle: '#F8EDC5', border: '#8B6B3D', line: '#B9B6AE', card: '#FDFCF8', cardEdge: '#EDE6D8', title: '#C0412D', text: '#1B2033' };
const ACTIVE = new Set(STATS.chapters.map((c) => c.state));
// cream states labelled on the sheet; [x, y] in viewBox units
const LABELS: [string, number, number][] = [
  ['Ladakh', 667, 100], ['Punjab', 604, 196], ['Arunachal Pradesh', 1055, 258],
  ['Assam', 1031, 324], ['Bihar', 851, 340], ['Madhya Pradesh', 676, 405],
];
const CARD = { w: 337, h: 100, top: 60, gap: 110, left: 15, right: 1190 };
const fmt = (n: number) => n.toLocaleString('en-IN');

function Map({ cards }: { cards: boolean }) {
  const rows = { left: 0, right: 0 };
  const placed = STATS.chapters.map((c) => {
    const y = CARD.top + rows[c.side]++ * CARD.gap;
    const x = c.side === 'left' ? CARD.left : CARD.right;
    return { ...c, x, y, dot: INDIA_STATES[c.state].c };
  });
  return (
    <svg
      viewBox={cards ? '0 0 1560 880' : '410 0 760 880'}
      className="h-auto w-full"
      role="img"
      aria-label={`Map of India: BBB chapters in ${STATS.chapters.length} states`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <g stroke={C.border} strokeWidth="1.2" strokeLinejoin="round">
        {Object.entries(INDIA_STATES).map(([name, s]) => (
          <path key={name} d={s.d} fill={ACTIVE.has(name) ? C.active : C.idle} />
        ))}
      </g>
      <g fontSize="15" fontWeight="700" fill="#2A2A2A" textAnchor="middle">
        {LABELS.map(([t, x, y]) => (
          <text key={t} x={x} y={y}>{t}</text>
        ))}
      </g>
      {cards && (
        <g stroke={C.line} strokeWidth="2.5">
          {placed.map((p) => (
            <line key={p.state} x1={p.side === 'left' ? p.x + CARD.w : p.x} y1={p.y + CARD.h / 2} x2={p.dot[0]} y2={p.dot[1]} />
          ))}
        </g>
      )}
      <g fill="none" stroke="#FCE3C8" strokeWidth="2">
        {placed.map((p) => (
          <circle key={p.state} cx={p.dot[0]} cy={p.dot[1]} r="5" />
        ))}
      </g>
      {cards &&
        placed.map((p) => (
          <g key={p.state} transform={`translate(${p.x} ${p.y})`}>
            <rect width={CARD.w} height={CARD.h} rx="6" fill={C.card} stroke={C.cardEdge} strokeWidth="2" />
            <rect width="5" height={CARD.h} rx="2" fill={C.active} />
            <text x="16" y="30" fontSize="24" fontWeight="700" fill={C.title}>{p.state}</text>
            <text x="16" y="58" fontSize="17" fontWeight="700" fill={C.text}>Chapters: {p.chapters}</text>
            <text x="16" y="83" fontSize="17" fontWeight="700" fill={C.text}>Members: {fmt(p.members)}</text>
          </g>
        ))}
    </svg>
  );
}

/** BBB chapters by state: full sheet on desktop; map + card grid on smaller screens where SVG text would be too small. */
export function ChapterMap() {
  return (
    <div>
      <div className="hidden lg:block">
        <Map cards />
      </div>
      <div className="lg:hidden">
        <div className="mx-auto max-w-[28rem]">
          <Map cards={false} />
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {STATS.chapters.map((c) => (
            <li key={c.state} className="rounded-md border-2 border-l-[5px] p-3" style={{ background: C.card, borderColor: C.cardEdge, borderLeftColor: C.active }}>
              <p className="font-bold" style={{ color: C.title }}>{c.state}</p>
              <p className="text-sm font-bold" style={{ color: C.text }}>Chapters: {c.chapters}</p>
              <p className="text-sm font-bold" style={{ color: C.text }}>Members: {fmt(c.members)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
