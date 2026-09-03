// Quotex-style candlestick chart — vivid solid colors, tall crisp bodies,
// no blur/glow. Deterministic (no Math.random).

const CLOSES = [
  100, 108, 104, 116, 110, 124, 117, 132, 122, 138,
  128, 148, 136, 130, 150, 140, 158, 146, 168, 154,
  176, 162, 182, 168, 196, 178, 204, 186, 218, 196,
  228, 204, 236, 210, 244, 216, 252, 222, 260, 232,
];

function buildCandles() {
  const candles = [];
  for (let i = 0; i < CLOSES.length; i++) {
    const open = i === 0 ? CLOSES[0] - 6 : CLOSES[i - 1];
    const close = CLOSES[i];
    const isUp = close >= open;
    const bodyTop = Math.max(open, close);
    const bodyBot = Math.min(open, close);
    const wickTop = bodyTop + 4 + ((i * 7) % 8);
    const wickBot = bodyBot - 4 - ((i * 5) % 7);
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
  const H = 100;
  const step = W / candles.length;
  const scaleY = (v: number) => H - 4 - ((v - min) / range) * (H - 8);

  const GREEN = "#00d68f";
  const RED = "#ff4d5e";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} preserveAspectRatio="none" aria-hidden="true">
      {candles.map((c, i) => {
        const x = i * step + step * 0.22;
        const bodyW = step * 0.56;
        const color = c.isUp ? GREEN : RED;
        const bodyYTop = scaleY(c.bodyTop);
        const bodyYBot = scaleY(c.bodyBot);
        const bodyH = Math.max(2.5, bodyYBot - bodyYTop);
        return (
          <g key={i}>
            <line
              x1={x + bodyW / 2}
              y1={scaleY(c.wickTop)}
              x2={x + bodyW / 2}
              y2={scaleY(c.wickBot)}
              stroke={color}
              strokeWidth="1.5"
            />
            <rect x={x} y={bodyYTop} width={bodyW} height={bodyH} fill={color} rx="0.5" />
          </g>
        );
      })}
    </svg>
  );
}
