import { useContent } from "../../store/ContentContext";
import { PrimaryButton } from "../ui/Primitives";
import { Send } from "lucide-react";
import Reveal from "../ui/Reveal";

export default function TelegramCTA() {
  const { content } = useContent();

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl glass px-8 py-14 text-center">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-dim/10 via-transparent to-transparent" />
          <div className="relative">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-gold-dim/15 flex items-center justify-center text-gold-bright">
              <Send size={24} />
            </div>
            <h2 className="mt-6 font-display text-2xl sm:text-3xl text-ink">Join the MasterShot99 Telegram Community</h2>
            <p className="mt-3 text-ink-dim max-w-md mx-auto">
              {content.telegram.memberCount} members already inside. Daily signal at {content.telegram.signalTime}.
            </p>
            <div className="mt-8">
              <PrimaryButton href={content.telegram.url}>Join Our Telegram Channel</PrimaryButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
