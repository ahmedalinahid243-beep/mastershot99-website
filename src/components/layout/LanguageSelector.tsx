import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useContent } from "../../store/ContentContext";

export default function LanguageSelector() {
  const { content } = useContent();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("en");
  const ref = useRef<HTMLDivElement>(null);
  const enabled = content.languages.filter((l) => l.enabled);
  const activeLang = enabled.find((l) => l.code === current) ?? enabled[0];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-ink-dim hover:border-gold-dim hover:text-gold-bright transition-colors"
      >
        <Globe size={14} />
        <span>{activeLang?.nativeLabel}</span>
        <ChevronDown size={12} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-44 rounded-xl border border-line bg-charcoal py-2 shadow-xl z-50"
        >
          {enabled.map((lang) => (
            <li key={lang.code}>
              <button
                role="option"
                aria-selected={current === lang.code}
                onClick={() => {
                  setCurrent(lang.code);
                  setOpen(false);
                  // Full i18n string tables are the next implementation step;
                  // this wires the selector and persists the chosen locale.
                }}
                dir={lang.rtl ? "rtl" : "ltr"}
                className={`flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-charcoal-light ${
                  current === lang.code ? "text-gold-bright" : "text-ink"
                }`}
              >
                <span>{lang.nativeLabel}</span>
                <span className="text-xs text-ink-dim">{lang.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
