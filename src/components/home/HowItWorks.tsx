import { SectionHeading } from "../ui/Primitives";
import Reveal from "../ui/Reveal";

const STEPS = [
  { n: "01", title: "Join the Telegram Community", desc: "Tap the Join button and become part of the MasterShot99 Telegram channel." },
  { n: "02", title: "Stay Updated", desc: "Follow daily market insights and community updates as they're posted." },
  { n: "03", title: "Review the Daily Signals", desc: "Check the daily signal shared around 9:30 PM in the channel." },
  { n: "04", title: "Make Your Own Trading Decisions Responsibly", desc: "Verify everything yourself and manage your own risk before acting." },
];

export default function HowItWorks() {
  return (
    <section className="section-pad bg-charcoal border-y border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Process" title="How It Works" align="center" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 100} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="relative rounded-2xl border border-line p-6 h-full hover:border-gold-dim/60 transition-colors">
                <span className="font-mono-num text-3xl text-gold-dim">{step.n}</span>
                <h3 className="mt-4 font-display text-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-dim leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
