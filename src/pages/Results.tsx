import { useContent } from "../store/ContentContext";
import PageHeader from "../components/layout/PageHeader";
import { EmptyState } from "../components/ui/Primitives";
import Reveal from "../components/ui/Reveal";

export default function ResultsPage() {
  const { content } = useContent();
  const published = content.results.filter((r) => r.published);

  return (
    <>
      <PageHeader
        eyebrow="Track Record"
        title="Results & Community Updates"
        description="Screenshots and updates are published here as they become available. No results shown are simulated or guaranteed."
      />
      <section className="section-pad mx-auto max-w-7xl px-5 sm:px-8">
        {published.length === 0 ? (
          <Reveal>
            <EmptyState
              title="Results & Updates"
              description="Published community results and updates will appear here."
            />
          </Reveal>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {published.map((r, i) => (
              <Reveal key={r.id} delay={i * 80}>
                <div className="glass rounded-2xl overflow-hidden">
                  <img src={r.imageUrl} alt={r.title} className="w-full aspect-video object-cover" />
                  <div className="p-5">
                    <p className="text-xs text-gold-bright">{r.category} · {r.date}</p>
                    <h3 className="mt-1 font-display text-ink">{r.title}</h3>
                    <p className="mt-2 text-sm text-ink-dim">{r.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
