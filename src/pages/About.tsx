import { useContent } from "../store/ContentContext";
import PageHeader from "../components/layout/PageHeader";
import { GlassCard, PrimaryButton } from "../components/ui/Primitives";
import Reveal from "../components/ui/Reveal";
import { User } from "lucide-react";

export default function About() {
  const { content } = useContent();
  const { trader } = content;

  return (
    <>
      <PageHeader eyebrow="About" title="About the Trader" />
      <section className="section-pad mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          <Reveal>
            <GlassCard className="aspect-[4/5] flex items-center justify-center overflow-hidden">
              {trader.photoUrl ? (
                <img src={trader.photoUrl} alt={trader.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-3 text-ink-dim">
                  <div className="h-20 w-20 rounded-full border border-line-strong flex items-center justify-center">
                    <User size={32} />
                  </div>
                  <p className="text-xs uppercase tracking-widest">Trader Photo Coming Soon</p>
                </div>
              )}
            </GlassCard>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-2xl text-ink">{trader.name}</h2>
            <div className="mt-4 flex gap-3 flex-wrap">
              <span className="rounded-full border border-line px-4 py-1.5 text-xs font-mono-num text-gold-bright">
                {trader.experienceYears} Years Experience
              </span>
              <span className="rounded-full border border-line px-4 py-1.5 text-xs font-mono-num text-ink-dim">
                {trader.market} Market
              </span>
            </div>
            <p className="mt-6 text-ink-dim leading-relaxed">{trader.bio}</p>
            <p className="mt-4 text-sm text-ink-dim leading-relaxed">
              MasterShot99 exists to share {trader.name.split(" ")[0]}'s day-to-day market study with a wider
              community — structured updates, not promises. Every trader is responsible for their own decisions
              and risk management.
            </p>
            <div className="mt-8">
              <PrimaryButton href={content.telegram.url}>Join Our Telegram Channel</PrimaryButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
