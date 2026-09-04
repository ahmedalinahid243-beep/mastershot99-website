// Dense market-ticker style divider strip — many thin bars, deterministic heights.

const HEIGHTS = [
  22, 38, 15, 44, 28, 52, 18, 34, 46, 12, 40, 26, 55, 20, 32, 48, 14, 36, 42, 24,
  58, 16, 30, 44, 20, 50, 26, 38, 12, 46, 32, 54, 18, 28, 40, 22, 48, 14, 36, 60,
  24, 42, 16, 34, 50, 20, 44, 28, 56, 18, 32, 46, 12, 38, 24, 52, 16, 40, 30, 48,
];

export default function TickerStrip({ className = "" }: { className?: string }) {
  const W = 1200;
  const H = 64;
  const gap = 4;
  const barW = W / HEIGHTS.length - gap;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} preserveAspectRatio="none" aria-hidden="true">
      {HEIGHTS.map((h, i) => {
        const isUp = i % 3 !== 1;
        const x = i * (barW + gap);
        const y = (H - h) / 2;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={h}
            rx={barW / 2}
            fill={isUp ? "var(--color-green)" : "var(--color-red)"}
            opacity={0.85}
          />
        );
      })}
    </svg>
  );
}
