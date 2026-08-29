import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useContent } from "../../store/ContentContext";
import { SectionHeading } from "../ui/Primitives";
import Reveal from "../ui/Reveal";

export function FaqAccordion({ limit }: { limit?: number }) {
  const { content } = useContent();
  const items = limit ? content.faq.slice(0, limit) : content.faq;
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-base sm:text-lg text-ink">{item.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-gold-bright transition-transform duration-300 motion-reduce:transition-none ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-sm text-ink-dim leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function FaqSection() {
  return (
    <section className="section-pad bg-charcoal border-y border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" align="center" />
        <Reveal delay={100} className="mt-12">
          <FaqAccordion limit={6} />
        </Reveal>
      </div>
    </section>
  );
}
