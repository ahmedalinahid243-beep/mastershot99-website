import { useEffect, useState } from "react";
import LiveTicker from "../ui/LiveTicker";

const SESSION_KEY = "mastershot99_splash_shown";

function alreadyShownThisSession() {
  if (typeof window === "undefined") return true;
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

export default function SplashScreen() {
  const [visible, setVisible] = useState(() => !alreadyShownThisSession());
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    document.body.style.overflow = "hidden";

    const fadeTimer = setTimeout(() => setFading(true), 2000);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 2600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-void overflow-hidden transition-opacity duration-600 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-gold-dim/15 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 -left-20 h-96 w-96 rounded-full bg-purple-dim/20 blur-[110px]" />

      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-40 sm:h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent z-10" />
        <LiveTicker className="w-full h-full opacity-70" />
      </div>

      <div className="relative flex flex-col items-center gap-4 px-6 animate-splash-in">
        <span className="text-xs uppercase tracking-[0.3em] text-purple-bright font-mono-num">
          Binary Market Signals
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-semibold text-center text-ink">
          Welcome to <span className="gold-text">MasterShot99</span>
        </h1>
        <div className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-gold-bright to-transparent" />
      </div>
    </div>
  );
}
