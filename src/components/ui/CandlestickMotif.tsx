// Realistic candlestick — thin wick, sharp rectangular body. Deterministic.

const CLOSES = [
  100, 92, 98, 88, 104, 96, 112, 102, 118, 108,
  128, 116, 122, 132, 124, 140, 130, 148, 138, 152,
  144, 160, 150, 168, 156, 172, 162, 180, 168, 190,
  176, 196, 182, 204, 190, 210, 196, 218, 202, 224,
];

function buildCandles() {
  const candles = [];
  for (let i = 0; i < CLOSES.length; i++) {
    const open = i === 0 ? CLOSES[0] - 6 : CLOSES[i - 1];
    const close = CLOSES[i];
    const isUp = close >= open;
    const bodyTop = Math.max(open, close);
    const bodyBot = Math.min(open, close);
    const wickTop = bodyTop + 4 + ((i * 7) % 10);
    const wickBot = bodyBot - 4 - ((i * 5) % 9);
    candles.push({ isUp, bodyTop, bodyBot, wickTop, wickBot });
  }
  return candles;
}

export default function CandlestickMotif({ className = "" }: { className?: string }) {
  const candles = buildCandles();
  const min = Math.min(...candles.map((c) => c.wickBot));
  const max = Math.max(...candles.map((c) => c.wickTop));
  const range = max - min;
  const W = 500;
  const H = 110;
  const step = W / candles.length;
  const scaleY = (v: number) => H - 6 - ((v - min) / range) * (H - 12);

  const GREEN = "#00d68f";
  const RED = "#ff4d5e";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} preserveAspectRatio="none" aria-hidden="true">
      {candles.map((c, i) => {
        const cx = i * step + step / 2;
        const bodyW = step * 0.42;
        const color = c.isUp ? GREEN : RED;
        const bodyYTop = scaleY(c.bodyTop);
        const bodyYBot = scaleY(c.bodyBot);
        const bodyH = Math.max(2, bodyYBot - bodyYTop);
        return (
          <g key={i}>
            <line x1={cx} y1={scaleY(c.wickTop)} x2={cx} y2={scaleY(c.wickBot)} stroke={color} strokeWidth="1.4" />
            <rect x={cx - bodyW / 2} y={bodyYTop} width={bodyW} height={bodyH} fill={color} />
          </g>
        );
      })}
    </svg>
  );
}
