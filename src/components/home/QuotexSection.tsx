import { useContent } from "../../store/ContentContext";
import { PrimaryButton } from "../ui/Primitives";
import Reveal from "../ui/Reveal";
import { ExternalLink, Info } from "lucide-react";

export default function QuotexSection() {
  const { content } = useContent();
  const { quotex } = content;

  return (
    <section className="section-pad mx-auto max-w-5xl px-5 sm:px-8">
      <Reveal>
        <div className="glass rounded-3xl p-8 sm:p-12 grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold-bright font-mono-num">Broker Account</span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl text-ink">{quotex.heading}</h2>
            <p className="mt-4 text-ink-dim leading-relaxed">{quotex.description}</p>
            <div className="mt-6 flex items-start gap-2 text-xs text-ink-dim bg-charcoal-light border border-line rounded-xl p-4">
              <Info size={14} className="mt-0.5 shrink-0 text-gold-bright" />
              <p>{quotex.disclosure}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <PrimaryButton href={quotex.referralUrl} className="w-full">
              {quotex.buttonLabel} <ExternalLink size={14} />
            </PrimaryButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
