import { useContent } from "../store/ContentContext";
import PageHeader from "../components/layout/PageHeader";
import { Send, Music2, MessageCircle } from "lucide-react";
import Reveal from "../components/ui/Reveal";
import { FacebookGlyph } from "../components/ui/BrandGlyphs";

export default function Contact() {
  const { content } = useContent();
  const cards = [
    { icon: Send, label: "Telegram", value: "t.me/mastershot99", href: content.social.telegram },
    { icon: FacebookGlyph, label: "Facebook", value: "MasterShot99 on Facebook", href: content.social.facebook },
    { icon: Music2, label: "TikTok", value: "@mastershot.99", href: content.social.tiktok },
    { icon: MessageCircle, label: "WhatsApp", value: content.social.whatsapp, href: `https://wa.me/${content.social.whatsapp.replace(/^0/, "88")}` },
  ];

  return (
    <>
      <PageHeader eyebrow="Get in Touch" title="Contact MasterShot99" />
      <section className="section-pad mx-auto max-w-5xl px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 gap-6">
          {cards.map(({ icon: Icon, label, value, href }, i) => (
            <Reveal key={label} delay={i * 80}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-2xl p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform"
              >
                <div className="h-12 w-12 rounded-xl bg-gold-dim/15 flex items-center justify-center text-gold-bright shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-ink-dim uppercase tracking-wider">{label}</p>
                  <p className="mt-1 text-ink">{value}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
