import { useContent } from "../../store/ContentContext";
import { SectionHeading } from "../ui/Primitives";
import Reveal from "../ui/Reveal";
import { PlayCircle } from "lucide-react";

export default function TutorialVideo() {
  const { content } = useContent();
  const { video } = content;

  return (
    <section className="section-pad bg-charcoal border-y border-line">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading title={video.title} description={video.description} align="center" />
        <Reveal delay={100}>
          <div className="mt-10 relative aspect-video rounded-2xl overflow-hidden glass flex items-center justify-center">
            {video.published && video.videoUrl ? (
              <video src={video.videoUrl} controls poster={video.thumbnailUrl ?? undefined} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-3 text-ink-dim">
                <PlayCircle size={48} className="text-gold-bright" />
                <p className="text-sm">Tutorial video coming soon</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
