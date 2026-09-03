import { useContent } from "../../store/ContentContext";
import Reveal from "../ui/Reveal";

export default function Stats() {
  const { content } = useContent();
  const stats = [
    { label: "Telegram Members", value: content.telegram.memberCount },
    { label: "Trading Experience", value: `${content.trader.experienceYears} Years` },
    { label: "Daily Signal Time", value: content.telegram.signalTime },
    { label: "Main Market", value: content.trader.market },
  ];

  return (
    <section className="border-y border-line bg-charcoal">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} direction={i % 2 === 0 ? "left" : "right"} className="text-center lg:text-left lg:border-l lg:first:border-l-0 lg:border-line lg:pl-6 lg:first:pl-0">
            <p className="font-mono-num text-2xl sm:text-3xl text-gold-bright">{s.value}</p>
            <p className="mt-1 text-xs sm:text-sm text-ink-dim">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
