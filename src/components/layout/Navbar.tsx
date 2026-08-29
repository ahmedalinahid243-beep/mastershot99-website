import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useContent } from "../../store/ContentContext";
import LanguageSelector from "./LanguageSelector";
import { PrimaryButton } from "../ui/Primitives";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/results", label: "Results" },
  { to: "/how-to-join", label: "How to Join" },
  { to: "/quotex-guide", label: "Quotex Guide" },
  { to: "/events", label: "Events" },
  { to: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const { content } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-void/90 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-3">
        <Link to="/" className="flex items-center" aria-label={`${content.settings.brandName} home`}>
          <img
            src={content.settings.logoUrl}
            alt={content.settings.brandName}
            style={{ height: "auto", width: "auto", objectFit: "contain", maxHeight: "48px" }}
            className="max-w-[160px]"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive ? "text-gold-bright" : "text-ink-dim hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSelector />
          <PrimaryButton href={content.telegram.url} className="px-5 py-2 text-xs">
            Join Telegram
          </PrimaryButton>
        </div>

        <button
          className="lg:hidden text-ink p-2"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-void lg:hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-line">
            <img
              src={content.settings.logoUrl}
              alt={content.settings.brandName}
              style={{ height: "auto", width: "auto", objectFit: "contain", maxHeight: "40px" }}
              className="max-w-[140px]"
            />
            <button className="text-ink p-2" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8 gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `py-3 border-b border-line text-lg ${isActive ? "text-gold-bright" : "text-ink"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="px-6 flex flex-col gap-4">
            <LanguageSelector />
            <PrimaryButton href={content.telegram.url} className="w-full">
              Join Our Telegram Channel
            </PrimaryButton>
          </div>
        </div>
      )}
    </header>
  );
}
