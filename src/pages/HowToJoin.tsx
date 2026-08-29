import { useContent } from "../store/ContentContext";
import PageHeader from "../components/layout/PageHeader";
import { PrimaryButton } from "../components/ui/Primitives";
import Reveal from "../components/ui/Reveal";

const STEPS = [
  { n: "01", title: "Open Telegram", desc: "Make sure the Telegram app is installed on your phone or desktop." },
  { n: "02", title: "Tap Join Our Telegram Channel", desc: "Use any Telegram button on this site, or open t.me/mastershot99 directly." },
  { n: "03", title: "Turn on Notifications", desc: "Enable notifications for the channel so you don't miss the daily signal." },
  { n: "04", title: "Follow the Daily Signal", desc: "Check the channel around 9:30 PM for the daily update." },
  { n: "05", title: "Trade Responsibly", desc: "Review everything yourself, manage your risk, and make your own decisions." },
];

export default function HowToJoin() {
  const { content } = useContent();
  return (
    <>
      <PageHeader eyebrow="Get Started" title="How to Join the Community" />
      <section className="section-pad mx-auto max-w-3xl px-5 sm:px-8">
        <div className="space-y-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="flex gap-5 items-start rounded-2xl border border-line p-5">
                <span className="font-mono-num text-2xl text-gold-dim shrink-0">{s.n}</span>
                <div>
                  <h3 className="font-display text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink-dim">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <PrimaryButton href={content.telegram.url}>Join Our Telegram Channel</PrimaryButton>
        </div>
      </section>
    </>
  );
}
