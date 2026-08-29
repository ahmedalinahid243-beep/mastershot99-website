import { useContent } from "../../store/ContentContext";

export default function AnnouncementTicker() {
  const { content } = useContent();
  const active = content.announcements.filter((a) => a.enabled);
  if (active.length === 0) return null;

  const items = [...active, ...active]; // duplicate for seamless loop

  return (
    <div className="relative z-40 overflow-hidden border-b border-line bg-charcoal text-xs sm:text-sm">
      <div className="flex whitespace-nowrap py-2 animate-[ticker_28s_linear_infinite] motion-reduce:animate-none motion-reduce:overflow-x-auto">
        {items.map((a, i) => {
          const content_ = (
            <span className="mx-8 inline-flex items-center gap-2 text-ink-dim">
              <span className="text-gold-bright">●</span>
              {a.text}
            </span>
          );
          return a.url ? (
            <a key={i} href={a.url} className="hover:text-gold-bright transition-colors">
              {content_}
            </a>
          ) : (
            <span key={i}>{content_}</span>
          );
        })}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
