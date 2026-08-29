import { Link } from "react-router-dom";
import { Send, Music2, MessageCircle } from "lucide-react";
import { useContent } from "../../store/ContentContext";
import { FacebookGlyph } from "../ui/BrandGlyphs";

export default function Footer() {
  const { content } = useContent();

  return (
    <footer className="border-t border-line bg-void-soft">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={content.settings.logoUrl}
            alt={content.settings.brandName}
            style={{ height: "auto", width: "auto", objectFit: "contain", maxHeight: "44px" }}
            className="max-w-[150px] mb-4"
          />
          <p className="text-sm text-ink-dim leading-relaxed max-w-xs">
            {content.settings.tagline}
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider text-gold-bright mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-ink-dim">
            <li><Link to="/about" className="hover:text-ink">About Trader</Link></li>
            <li><Link to="/results" className="hover:text-ink">Results</Link></li>
            <li><Link to="/how-to-join" className="hover:text-ink">How to Join</Link></li>
            <li><Link to="/events" className="hover:text-ink">Events / Updates</Link></li>
            <li><Link to="/faq" className="hover:text-ink">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider text-gold-bright mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-ink-dim">
            <li><Link to="/disclaimer" className="hover:text-ink">Disclaimer</Link></li>
            <li><Link to="/privacy" className="hover:text-ink">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-ink">Terms &amp; Conditions</Link></li>
            <li><Link to="/contact" className="hover:text-ink">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider text-gold-bright mb-4">Connect</h4>
          <div className="flex gap-3">
            <a href={content.social.telegram} aria-label="Telegram" className="h-10 w-10 flex items-center justify-center rounded-full border border-line hover:border-gold-dim hover:text-gold-bright transition-colors">
              <Send size={16} />
            </a>
            <a href={content.social.facebook} aria-label="Facebook" className="h-10 w-10 flex items-center justify-center rounded-full border border-line hover:border-gold-dim hover:text-gold-bright transition-colors">
              <FacebookGlyph size={16} />
            </a>
            <a href={content.social.tiktok} aria-label="TikTok" className="h-10 w-10 flex items-center justify-center rounded-full border border-line hover:border-gold-dim hover:text-gold-bright transition-colors">
              <Music2 size={16} />
            </a>
            <a href={`https://wa.me/${content.social.whatsapp.replace(/^0/, "88")}`} aria-label="WhatsApp" className="h-10 w-10 flex items-center justify-center rounded-full border border-line hover:border-gold-dim hover:text-gold-bright transition-colors">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-dim">
          <p>© {new Date().getFullYear()} {content.settings.brandName}. All rights reserved.</p>
          <p className="text-center sm:text-right max-w-md">
            Trading involves risk. Signals and content are for informational purposes only and do not guarantee results.
          </p>
        </div>
      </div>
    </footer>
  );
}
