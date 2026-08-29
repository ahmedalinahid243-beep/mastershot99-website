import type { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass rounded-2xl ${className}`}>{children}</div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-mono-num uppercase tracking-[0.2em] text-gold-bright">
      <span className="h-px w-6 bg-gold-dim" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className={align === "center" ? "flex justify-center" : ""}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ink">{title}</h2>
      {description && <p className="mt-3 text-ink-dim leading-relaxed">{description}</p>}
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
  className = "",
  onClick,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-dim to-gold-bright px-6 py-3 text-sm font-semibold text-void shadow-[0_0_0_1px_#00000022] transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`;
  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function SecondaryButton({
  href,
  children,
  className = "",
  onClick,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-gold-dim hover:text-gold-bright ${className}`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="glass rounded-2xl border-dashed px-6 py-16 text-center">
      <div className="mx-auto mb-4 h-10 w-10 rounded-full border border-line-strong flex items-center justify-center text-gold-bright font-mono-num">
        —
      </div>
      <h3 className="font-display text-lg text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-dim max-w-sm mx-auto">{description}</p>
    </div>
  );
}
