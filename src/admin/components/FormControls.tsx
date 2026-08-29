import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-ink-dim mb-1.5">{label}</span>
      {children}
      {hint && <span className="block mt-1 text-[11px] text-ink-dim">{hint}</span>}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg bg-void border border-line px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-dim ${props.className ?? ""}`}
    />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={props.rows ?? 4}
      className={`w-full rounded-lg bg-void border border-line px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-dim resize-y ${props.className ?? ""}`}
    />
  );
}

export function AdminCard({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-charcoal p-6">
      <h2 className="font-display text-lg text-ink">{title}</h2>
      {description && <p className="mt-1 text-sm text-ink-dim">{description}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

export function SaveBar({ saved }: { saved: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs text-green h-5">
      {saved && <span>✓ Saved automatically</span>}
    </div>
  );
}

export function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between rounded-lg border border-line px-3.5 py-2.5 cursor-pointer">
      <span className="text-sm text-ink">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-gold-dim" : "bg-charcoal-light"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-ink transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </label>
  );
}
