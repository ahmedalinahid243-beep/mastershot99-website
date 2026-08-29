import { useState } from "react";
import { useContent } from "../../store/ContentContext";
import type { FaqItem } from "../../store/types";
import { AdminCard, Field, TextInput, TextArea } from "../components/FormControls";
import { Plus, Trash2 } from "lucide-react";

export default function FAQEditor() {
  const { content, setContent } = useContent();
  const [draft, setDraft] = useState<FaqItem | null>(null);

  function save(item: FaqItem) {
    setContent((prev) => {
      const exists = prev.faq.some((f) => f.id === item.id);
      return { ...prev, faq: exists ? prev.faq.map((f) => (f.id === item.id ? item : f)) : [...prev.faq, item] };
    });
    setDraft(null);
  }
  function remove(id: string) {
    setContent((prev) => ({ ...prev, faq: prev.faq.filter((f) => f.id !== id) }));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-ink">FAQ</h1>
          <p className="mt-1 text-sm text-ink-dim">Shown on the homepage (first 6) and the full FAQ page.</p>
        </div>
        <button onClick={() => setDraft({ id: crypto.randomUUID(), question: "", answer: "" })} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-dim to-gold-bright px-4 py-2 text-sm font-semibold text-void">
          <Plus size={14} /> Add Question
        </button>
      </div>

      {draft && (
        <div className="mt-5">
          <AdminCard title="Question">
            <Field label="Question"><TextInput value={draft.question} onChange={(e) => setDraft({ ...draft, question: e.target.value })} /></Field>
            <Field label="Answer"><TextArea value={draft.answer} onChange={(e) => setDraft({ ...draft, answer: e.target.value })} rows={4} /></Field>
            <div className="flex gap-3 pt-2">
              <button onClick={() => save(draft)} className="rounded-lg bg-gold-dim px-4 py-2 text-sm font-semibold text-void">Save</button>
              <button onClick={() => setDraft(null)} className="rounded-lg border border-line px-4 py-2 text-sm text-ink-dim">Cancel</button>
            </div>
          </AdminCard>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {content.faq.map((f) => (
          <div key={f.id} className="flex items-center gap-4 rounded-xl border border-line bg-charcoal p-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink truncate">{f.question}</p>
              <p className="text-xs text-ink-dim truncate">{f.answer}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => setDraft(f)} className="px-3 py-1.5 text-xs rounded-full border border-line text-ink-dim hover:text-ink">Edit</button>
              <button onClick={() => remove(f.id)} className="p-1.5 text-red hover:text-red"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
