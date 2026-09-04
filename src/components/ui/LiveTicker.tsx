import CandlestickMotif from "./CandlestickMotif";

// Two copies placed side by side inside a wider track, animated leftward
// on an infinite loop — creates a continuously moving live-chart feel.
export default function LiveTicker({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex w-[200%] animate-ticker-scroll motion-reduce:animate-none">
        <CandlestickMotif className="w-1/2 h-full" />
        <CandlestickMotif className="w-1/2 h-full" />
      </div>
    </div>
  );
}
