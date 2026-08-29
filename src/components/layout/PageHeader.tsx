import type { ReactNode } from "react";

export default function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: ReactNode }) {
  return (
    <div className="border-b border-line bg-grid">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 py-16 sm:py-20 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-gold-bright font-mono-num">{eyebrow}</span>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl text-ink">{title}</h1>
        {description && <div className="mt-4 text-ink-dim leading-relaxed max-w-xl mx-auto">{description}</div>}
      </div>
    </div>
  );
}
