import { useState } from "react";
import { useContent } from "../../store/ContentContext";
import type { Announcement } from "../../store/types";
import { AdminCard, Field, TextInput, ToggleRow } from "../components/FormControls";
import { Plus, Trash2 } from "lucide-react";

function emptyAnnouncement(): Announcement {
  return { id: crypto.randomUUID(), text: "", url: "", startDate: null, endDate: null, enabled: true };
}

export default function AnnouncementsManager() {
  const { content, setContent } = useContent();
  const [draft, setDraft] = useState<Announcement | null>(null);

  function save(item: Announcement) {
    setContent((prev) => {
      const exists = prev.announcements.some((a) => a.id === item.id);
      return { ...prev, announcements: exists ? prev.announcements.map((a) => (a.id === item.id ? item : a)) : [...prev.announcements, item] };
    });
    setDraft(null);
  }
  function remove(id: string) {
    setContent((prev) => ({ ...prev, announcements: prev.announcements.filter((a) => a.id !== id) }));
  }
  function toggle(id: string) {
    setContent((prev) => ({ ...prev, announcements: prev.announcements.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)) }));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-ink">Announcements</h1>
          <p className="mt-1 text-sm text-ink-dim">Controls the scrolling ticker at the top of every page.</p>
        </div>
        <button onClick={() => setDraft(emptyAnnouncement())} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-dim to-gold-bright px-4 py-2 text-sm font-semibold text-void">
          <Plus size={14} /> Add Announcement
        </button>
      </div>

      {draft && (
        <div className="mt-5">
          <AdminCard title="Announcement">
            <Field label="Text"><TextInput value={draft.text} onChange={(e) => setDraft({ ...draft, text: e.target.value })} /></Field>
            <Field label="Link URL (optional)"><TextInput value={draft.url ?? ""} onChange={(e) => setDraft({ ...draft, url: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Start Date (optional)"><TextInput type="date" value={draft.startDate ?? ""} onChange={(e) => setDraft({ ...draft, startDate: e.target.value || null })} /></Field>
              <Field label="End Date (optional)"><TextInput type="date" value={draft.endDate ?? ""} onChange={(e) => setDraft({ ...draft, endDate: e.target.value || null })} /></Field>
            </div>
            <ToggleRow label="Enabled" checked={draft.enabled} onChange={(v) => setDraft({ ...draft, enabled: v })} />
            <div className="flex gap-3 pt-2">
              <button onClick={() => save(draft)} className="rounded-lg bg-gold-dim px-4 py-2 text-sm font-semibold text-void">Save</button>
              <button onClick={() => setDraft(null)} className="rounded-lg border border-line px-4 py-2 text-sm text-ink-dim">Cancel</button>
            </div>
          </AdminCard>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {content.announcements.map((a) => (
          <div key={a.id} className="flex items-center gap-4 rounded-xl border border-line bg-charcoal p-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink truncate">{a.text}</p>
              <p className="text-xs text-ink-dim">{a.enabled ? "Enabled" : "Disabled"}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => toggle(a.id)} className="px-3 py-1.5 text-xs rounded-full border border-line text-ink-dim hover:text-gold-bright hover:border-gold-dim">
                {a.enabled ? "Disable" : "Enable"}
              </button>
              <button onClick={() => setDraft(a)} className="px-3 py-1.5 text-xs rounded-full border border-line text-ink-dim hover:text-ink">Edit</button>
              <button onClick={() => remove(a.id)} className="p-1.5 text-red hover:text-red"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
