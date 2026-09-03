// Realistic candlestick chart motif — organic price action with proper
// wicks, gradient bodies, and a soft glow. Deterministic (no Math.random).

const CLOSES = [
  100, 106, 103, 112, 108, 118, 114, 124, 119, 130,
  126, 138, 132, 128, 140, 136, 148, 142, 155, 150,
  162, 157, 168, 163, 176, 170, 182, 177, 190, 184,
  196, 189, 200, 194, 206, 199, 212, 205, 218, 214,
];

function buildCandles() {
  const candles = [];
  for (let i = 0; i < CLOSES.length; i++) {
    const open = i === 0 ? CLOSES[0] - 4 : CLOSES[i - 1];
    const close = CLOSES[i];
    const isUp = close >= open;
    const bodyTop = Math.max(open, close);
    const bodyBot = Math.min(open, close);
    const wickTop = bodyTop + 3 + ((i * 7) % 6);
    const wickBot = bodyBot - 3 - ((i * 5) % 5);
    candles.push({ open, close, isUp, bodyTop, bodyBot, wickTop, wickBot });
  }
  return candles;
}

export default function CandlestickMotif({ className = "" }: { className?: string }) {
  const candles = buildCandles();
  const min = Math.min(...candles.map((c) => c.wickBot));
  const max = Math.max(...candles.map((c) => c.wickTop));
  const range = max - min;
  const W = 400;
  const H = 80;
  const step = W / candles.length;
  const scaleY = (v: number) => H - 6 - ((v - min) / range) * (H - 12);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="candleUp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-green)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--color-green-dim)" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="candleDown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-red)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--color-red-dim)" stopOpacity="0.85" />
        </linearGradient>
        <filter id="candleGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {candles.map((c, i) => {
        const x = i * step + step * 0.28;
        const bodyW = step * 0.44;
        const fill = c.isUp ? "url(#candleUp)" : "url(#candleDown)";
        const stroke = c.isUp ? "var(--color-green)" : "var(--color-red)";
        const bodyYTop = scaleY(c.bodyTop);
        const bodyYBot = scaleY(c.bodyBot);
        const bodyH = Math.max(1.5, bodyYBot - bodyYTop);
        return (
          <g key={i} filter="url(#candleGlow)" opacity={0.9}>
            <line
              x1={x + bodyW / 2}
              y1={scaleY(c.wickTop)}
              x2={x + bodyW / 2}
              y2={scaleY(c.wickBot)}
              stroke={stroke}
              strokeWidth="1"
              opacity={0.7}
            />
            <rect x={x} y={bodyYTop} width={bodyW} height={bodyH} fill={fill} rx="0.8" />
          </g>
        );
      })}
    </svg>
  );
}
