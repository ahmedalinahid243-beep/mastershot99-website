import { useContent } from "../../store/ContentContext";
import { PrimaryButton } from "../ui/Primitives";
import CandlestickMotif from "../ui/CandlestickMotif";
import Reveal from "../ui/Reveal";

export default function FinalCTA() {
  const { content } = useContent();

  return (
    <section className="relative overflow-hidden bg-charcoal border-t border-line">
      <CandlestickMotif className="pointer-events-none absolute top-0 left-0 w-full h-16 opacity-20" />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 py-20 text-center">
        <Reveal>
          <h2 className="font-display text-2xl sm:text-3xl text-ink">
            Ready to <span className="gold-text">Follow the Signal</span>?
          </h2>
          <p className="mt-3 text-ink-dim">
            Join {content.telegram.memberCount} traders already inside the MasterShot99 community.
          </p>
          <div className="mt-8">
            <PrimaryButton href={content.telegram.url}>Join Our Telegram Channel</PrimaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
