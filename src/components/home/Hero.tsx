import { useContent } from "../../store/ContentContext";
import { PrimaryButton, SecondaryButton } from "../ui/Primitives";
import CandlestickMotif from "../ui/CandlestickMotif";
import { TrendingUp, ShieldCheck } from "lucide-react";

export default function Hero() {
  const { content } = useContent();

  return (
    <section className="relative overflow-hidden bg-grid">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void via-void to-void-soft" />
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-gold-dim/10 blur-3xl" />
      <CandlestickMotif className="pointer-events-none absolute bottom-0 left-0 w-full h-20 opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 sm:pt-24 pb-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-xs text-gold-bright font-mono-num uppercase tracking-wider">
            <TrendingUp size={13} /> Binary Market Signals
          </span>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.08] text-ink">
            Master the Market.<br />
            Follow the <span className="gold-text">Signal</span>.<br />
            Trade with Confidence.
          </h1>
          <p className="mt-6 text-lg text-ink-dim leading-relaxed max-w-lg">
            {content.hero.subheadingBn}
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <PrimaryButton href={content.telegram.url}>Join Our Telegram Channel</PrimaryButton>
            <SecondaryButton href="/results">Explore Results</SecondaryButton>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs text-ink-dim">
            <ShieldCheck size={14} className="text-green" />
            No guaranteed profit claims — trading carries risk.
          </div>
        </div>

        <div className="relative">
          <div className="glass rounded-3xl p-6 sm:p-8 rotate-0 sm:rotate-1">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono-num uppercase tracking-widest text-ink-dim">Signal Feed</span>
              <span className="flex items-center gap-1.5 text-xs text-green">
                <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse motion-reduce:animate-none" />
                Live
              </span>
            </div>
            <CandlestickMotif className="w-full h-32" />
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-line p-4">
                <p className="text-xs text-ink-dim">Daily Signal</p>
                <p className="mt-1 font-mono-num text-xl text-gold-bright">{content.telegram.signalTime}</p>
              </div>
              <div className="rounded-xl border border-line p-4">
                <p className="text-xs text-ink-dim">Community</p>
                <p className="mt-1 font-mono-num text-xl text-ink">{content.telegram.memberCount}</p>
              </div>
            </div>
            <div className="mt-5 rounded-xl bg-charcoal-light border border-line p-4">
              <p className="text-xs text-ink-dim leading-relaxed">
                Signals shared for education and analysis. Always verify and manage your own risk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
