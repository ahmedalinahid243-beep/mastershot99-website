import { useState } from "react";
import { useContent } from "../../store/ContentContext";
import type { ResultItem } from "../../store/types";
import { AdminCard, Field, TextInput, TextArea, ToggleRow } from "../components/FormControls";
import { Plus, Trash2, ArrowUp, ArrowDown, ImageOff } from "lucide-react";

function emptyResult(): ResultItem {
  return {
    id: crypto.randomUUID(),
    imageUrl: "",
    title: "",
    date: new Date().toISOString().slice(0, 10),
    description: "",
    category: "Update",
    published: false,
  };
}

export default function ResultsManager() {
  const { content, setContent } = useContent();
  const [draft, setDraft] = useState<ResultItem | null>(null);

  function save(item: ResultItem) {
    setContent((prev) => {
      const exists = prev.results.some((r) => r.id === item.id);
      return {
        ...prev,
        results: exists ? prev.results.map((r) => (r.id === item.id ? item : r)) : [...prev.results, item],
      };
    });
    setDraft(null);
  }

  function remove(id: string) {
    setContent((prev) => ({ ...prev, results: prev.results.filter((r) => r.id !== id) }));
  }

  function toggle(id: string) {
    setContent((prev) => ({
      ...prev,
      results: prev.results.map((r) => (r.id === id ? { ...r, published: !r.published } : r)),
    }));
  }

  function move(id: string, dir: -1 | 1) {
    setContent((prev) => {
      const idx = prev.results.findIndex((r) => r.id === id);
      const swap = idx + dir;
      if (swap < 0 || swap >= prev.results.length) return prev;
      const next = [...prev.results];
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return { ...prev, results: next };
    });
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>, apply: (url: string) => void) {
    const file = e.target.files?.[0];
    if (file) apply(URL.createObjectURL(file));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-ink">Results</h1>
          <p className="mt-1 text-sm text-ink-dim">No fake results — only publish real screenshots.</p>
        </div>
        <button
          onClick={() => setDraft(emptyResult())}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-dim to-gold-bright px-4 py-2 text-sm font-semibold text-void"
        >
          <Plus size={14} /> Add Result
        </button>
      </div>

      {draft && (
        <div className="mt-5">
          <AdminCard title={content.results.some((r) => r.id === draft.id) ? "Edit Result" : "New Result"}>
            <Field label="Screenshot">
              <div className="flex items-center gap-4">
                <div className="h-16 w-24 rounded-lg border border-line bg-void flex items-center justify-center overflow-hidden">
                  {draft.imageUrl ? <img src={draft.imageUrl} className="h-full w-full object-cover" /> : <ImageOff size={16} className="text-ink-dim" />}
                </div>
                <input type="file" accept="image/*" onChange={(e) => handleImage(e, (url) => setDraft({ ...draft, imageUrl: url }))} className="text-xs text-ink-dim" />
              </div>
            </Field>
            <Field label="Title"><TextInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Date"><TextInput type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} /></Field>
              <Field label="Category"><TextInput value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} /></Field>
            </div>
            <Field label="Description"><TextArea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={3} /></Field>
            <ToggleRow label="Publish immediately" checked={draft.published} onChange={(v) => setDraft({ ...draft, published: v })} />
            <div className="flex gap-3 pt-2">
              <button onClick={() => save(draft)} className="rounded-lg bg-gold-dim px-4 py-2 text-sm font-semibold text-void">Save</button>
              <button onClick={() => setDraft(null)} className="rounded-lg border border-line px-4 py-2 text-sm text-ink-dim">Cancel</button>
            </div>
          </AdminCard>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {content.results.length === 0 && !draft && (
          <p className="text-sm text-ink-dim">No results yet. Click "Add Result" to publish your first screenshot.</p>
        )}
        {content.results.map((r) => (
          <div key={r.id} className="flex items-center gap-4 rounded-xl border border-line bg-charcoal p-4">
            <div className="h-14 w-20 rounded-lg border border-line bg-void flex items-center justify-center overflow-hidden shrink-0">
              {r.imageUrl ? <img src={r.imageUrl} className="h-full w-full object-cover" /> : <ImageOff size={14} className="text-ink-dim" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink truncate">{r.title || "Untitled"}</p>
              <p className="text-xs text-ink-dim">{r.category} · {r.date} · {r.published ? "Published" : "Hidden"}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => move(r.id, -1)} className="p-1.5 text-ink-dim hover:text-ink"><ArrowUp size={14} /></button>
              <button onClick={() => move(r.id, 1)} className="p-1.5 text-ink-dim hover:text-ink"><ArrowDown size={14} /></button>
              <button onClick={() => toggle(r.id)} className="px-3 py-1.5 text-xs rounded-full border border-line text-ink-dim hover:text-gold-bright hover:border-gold-dim">
                {r.published ? "Hide" : "Publish"}
              </button>
              <button onClick={() => setDraft(r)} className="px-3 py-1.5 text-xs rounded-full border border-line text-ink-dim hover:text-ink">Edit</button>
              <button onClick={() => remove(r.id)} className="p-1.5 text-red hover:text-red"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
