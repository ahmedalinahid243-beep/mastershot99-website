// The signature visual motif for the site: a quiet strip of candlesticks
// used sparingly as texture (hero backdrop, section dividers) rather than
// literal chart data. Deterministic (no Math.random) so SSR/CSR stay in sync.

const HEIGHTS = [22, 40, 18, 55, 30, 46, 20, 60, 34, 26, 48, 16, 38, 52, 24, 44, 30, 58, 20, 36];
const UP = [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1];

export default function CandlestickMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 80"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {HEIGHTS.map((h, i) => {
        const x = i * 20 + 6;
        const isUp = UP[i];
        const color = isUp ? "var(--color-green)" : "var(--color-red)";
        const y = 40 - h / 2;
        return (
          <g key={i} opacity={0.55}>
            <line x1={x + 4} y1={y - 6} x2={x + 4} y2={y + h + 6} stroke={color} strokeWidth="1" />
            <rect x={x} y={y} width="8" height={h} fill={color} rx="1" />
          </g>
        );
      })}
    </svg>
  );
}
