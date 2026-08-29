import { useState } from "react";
import { useContent } from "../../store/ContentContext";
import type { EventItem } from "../../store/types";
import { AdminCard, Field, TextInput, TextArea, ToggleRow } from "../components/FormControls";
import { Plus, Trash2 } from "lucide-react";

function emptyEvent(): EventItem {
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    imageUrl: null,
    date: new Date().toISOString().slice(0, 10),
    time: "9:00 PM",
    buttonText: "Learn More",
    buttonUrl: "",
    published: false,
  };
}

export default function EventsManager() {
  const { content, setContent } = useContent();
  const [draft, setDraft] = useState<EventItem | null>(null);

  function save(item: EventItem) {
    setContent((prev) => {
      const exists = prev.events.some((e) => e.id === item.id);
      return { ...prev, events: exists ? prev.events.map((e) => (e.id === item.id ? item : e)) : [...prev.events, item] };
    });
    setDraft(null);
  }
  function remove(id: string) {
    setContent((prev) => ({ ...prev, events: prev.events.filter((e) => e.id !== id) }));
  }
  function toggle(id: string) {
    setContent((prev) => ({ ...prev, events: prev.events.map((e) => (e.id === id ? { ...e, published: !e.published } : e)) }));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-ink">Events</h1>
          <p className="mt-1 text-sm text-ink-dim">Published events appear automatically on the Events page.</p>
        </div>
        <button onClick={() => setDraft(emptyEvent())} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-dim to-gold-bright px-4 py-2 text-sm font-semibold text-void">
          <Plus size={14} /> Add Event
        </button>
      </div>

      {draft && (
        <div className="mt-5">
          <AdminCard title={content.events.some((e) => e.id === draft.id) ? "Edit Event" : "New Event"}>
            <Field label="Title"><TextInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></Field>
            <Field label="Description"><TextArea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={3} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Date"><TextInput type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} /></Field>
              <Field label="Time"><TextInput value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Button Text"><TextInput value={draft.buttonText} onChange={(e) => setDraft({ ...draft, buttonText: e.target.value })} /></Field>
              <Field label="Button URL"><TextInput value={draft.buttonUrl} onChange={(e) => setDraft({ ...draft, buttonUrl: e.target.value })} /></Field>
            </div>
            <ToggleRow label="Publish immediately" checked={draft.published} onChange={(v) => setDraft({ ...draft, published: v })} />
            <div className="flex gap-3 pt-2">
              <button onClick={() => save(draft)} className="rounded-lg bg-gold-dim px-4 py-2 text-sm font-semibold text-void">Save</button>
              <button onClick={() => setDraft(null)} className="rounded-lg border border-line px-4 py-2 text-sm text-ink-dim">Cancel</button>
            </div>
          </AdminCard>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {content.events.length === 0 && !draft && <p className="text-sm text-ink-dim">No events yet.</p>}
        {content.events.map((e) => (
          <div key={e.id} className="flex items-center gap-4 rounded-xl border border-line bg-charcoal p-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink truncate">{e.title || "Untitled"}</p>
              <p className="text-xs text-ink-dim">{e.date} · {e.time} · {e.published ? "Published" : "Hidden"}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => toggle(e.id)} className="px-3 py-1.5 text-xs rounded-full border border-line text-ink-dim hover:text-gold-bright hover:border-gold-dim">
                {e.published ? "Hide" : "Publish"}
              </button>
              <button onClick={() => setDraft(e)} className="px-3 py-1.5 text-xs rounded-full border border-line text-ink-dim hover:text-ink">Edit</button>
              <button onClick={() => remove(e.id)} className="p-1.5 text-red hover:text-red"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
