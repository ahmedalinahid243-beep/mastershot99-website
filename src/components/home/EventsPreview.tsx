import { useContent } from "../../store/ContentContext";
import { SectionHeading, EmptyState, SecondaryButton } from "../ui/Primitives";
import Reveal from "../ui/Reveal";
import { Calendar } from "lucide-react";

export default function EventsPreview() {
  const { content } = useContent();
  const published = content.events.filter((e) => e.published);

  return (
    <section className="section-pad mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading eyebrow="Community" title="Events & Updates" align="center" />
      <div className="mt-12">
        {published.length === 0 ? (
          <Reveal>
            <EmptyState
              title="No events published yet"
              description="New events and community updates will appear here as soon as they're published."
            />
          </Reveal>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {published.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 80}>
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-xs text-gold-bright">
                    <Calendar size={13} /> {ev.date} · {ev.time}
                  </div>
                  <h3 className="mt-3 font-display text-lg text-ink">{ev.title}</h3>
                  <p className="mt-2 text-sm text-ink-dim">{ev.description}</p>
                  {ev.buttonUrl && (
                    <div className="mt-4">
                      <SecondaryButton href={ev.buttonUrl} className="text-xs px-4 py-2">
                        {ev.buttonText || "Learn More"}
                      </SecondaryButton>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
