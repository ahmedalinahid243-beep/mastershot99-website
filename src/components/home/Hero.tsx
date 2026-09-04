import { useContent } from "../../store/ContentContext";
import { PrimaryButton, SecondaryButton } from "../ui/Primitives";
import CandlestickMotif from "../ui/CandlestickMotif";
import TickerStrip from "../ui/TickerStrip";
import { TrendingUp, ShieldCheck } from "lucide-react";

export default function Hero() {
  const { content } = useContent();

  return (
    <section className="relative overflow-hidden bg-grid">
      {/* base gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void via-void to-void-soft" />

      {/* ambient glow orbs — gold right, purple left */}
      <div className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-gold-dim/15 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-purple-dim/20 blur-[110px]" />

      {/* hairline top accent */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-bright/50 to-transparent" />

      {/* dense ticker strip divider along the bottom */}
      <div className="pointer-events-none absolute bottom-8 left-0 w-full h-16 opacity-70">
        <TickerStrip className="w-full h-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 sm:pt-24 pb-28 sm:pb-36 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-dim/40 bg-purple-dim/5 px-4 py-1.5 text-xs text-purple-bright font-mono-num uppercase tracking-wider shadow-[0_0_20px_-8px_var(--color-purple-bright)]">
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
          <div className="glass rounded-3xl p-6 sm:p-8 rotate-0 sm:rotate-1 shadow-[0_0_60px_-20px_var(--color-purple-dim)]">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono-num uppercase tracking-widest text-ink-dim">Signal Feed</span>
              <span className="flex items-center gap-1.5 text-xs text-green">
                <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse motion-reduce:animate-none" />
                Live
              </span>
            </div>
            <div className="rounded-xl overflow-hidden bg-void-soft/60 border border-line p-2">
              <CandlestickMotif className="w-full h-36" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-line bg-charcoal/40 p-4">
                <p className="text-xs text-ink-dim">Daily Signal</p>
                <p className="mt-1 font-mono-num text-xl text-gold-bright">{content.telegram.signalTime}</p>
              </div>
              <div className="rounded-xl border border-purple-dim/30 bg-charcoal/40 p-4">
                <p className="text-xs text-ink-dim">Community</p>
                <p className="mt-1 font-mono-num text-xl text-purple-bright">{content.telegram.memberCount}</p>
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
