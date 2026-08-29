import { SectionHeading } from "../ui/Primitives";
import Reveal from "../ui/Reveal";
import { Radio, LineChart, CalendarClock, Users, BookOpen, GraduationCap } from "lucide-react";

const FEATURES = [
  { icon: Radio, title: "Live Trading Signals", desc: "Shared with the community around a consistent daily schedule." },
  { icon: LineChart, title: "Market Insights", desc: "Analysis of market movement patterns and structure." },
  { icon: CalendarClock, title: "Daily Updates", desc: "Regular updates so you never miss what's happening." },
  { icon: Users, title: "Community Access", desc: "Be part of a focused, active trading community." },
  { icon: BookOpen, title: "Trading-Focused Content", desc: "Content built specifically around trading and market study." },
  { icon: GraduationCap, title: "Educational Resources", desc: "Learn the reasoning behind the approach, not just the calls." },
];

export default function Features() {
  return (
    <section className="section-pad mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading eyebrow="What You Get" title="Built for Serious Market Followers" align="center" />
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map(({ icon: Icon, title, desc }, i) => (
          <Reveal key={title} delay={i * 70}>
            <div className="glass rounded-2xl p-6 h-full hover:-translate-y-1 transition-transform">
              <div className="h-11 w-11 rounded-xl bg-gold-dim/15 flex items-center justify-center text-gold-bright">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 font-display text-lg text-ink">{title}</h3>
              <p className="mt-2 text-sm text-ink-dim leading-relaxed">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
