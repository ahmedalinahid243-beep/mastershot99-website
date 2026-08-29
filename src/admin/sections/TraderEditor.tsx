import { useRef, useState } from "react";
import { useContent } from "../../store/ContentContext";
import { AdminCard, Field, TextInput, TextArea, SaveBar } from "../components/FormControls";
import { Upload, User } from "lucide-react";

export default function TraderEditor() {
  const { content, setContent } = useContent();
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof typeof content.trader>(key: K, value: (typeof content.trader)[K]) {
    setContent((prev) => ({ ...prev, trader: { ...prev.trader, [key]: value } }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    update("photoUrl", URL.createObjectURL(file));
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Trader</h1>
      <p className="mt-1 text-sm text-ink-dim">Profile shown on the homepage and About page.</p>

      <div className="mt-6 space-y-5">
        <AdminCard title="Photo">
          <div className="flex items-center gap-5">
            <div className="h-24 w-20 rounded-lg border border-line bg-void flex items-center justify-center overflow-hidden">
              {content.trader.photoUrl ? (
                <img src={content.trader.photoUrl} alt="Trader" className="h-full w-full object-cover" />
              ) : (
                <User size={24} className="text-ink-dim" />
              )}
            </div>
            <div>
              <button
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-4 py-2 text-sm text-ink hover:border-gold-dim hover:text-gold-bright"
              >
                <Upload size={14} /> Upload Photo
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Profile Details">
          <Field label="Name">
            <TextInput value={content.trader.name} onChange={(e) => update("name", e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Experience (years)">
              <TextInput type="number" value={content.trader.experienceYears} onChange={(e) => update("experienceYears", Number(e.target.value))} />
            </Field>
            <Field label="Main Market">
              <TextInput value={content.trader.market} onChange={(e) => update("market", e.target.value)} />
            </Field>
          </div>
          <Field label="Bio" hint="Keep it realistic — no invented licenses, awards, or performance claims.">
            <TextArea value={content.trader.bio} onChange={(e) => update("bio", e.target.value)} rows={5} />
          </Field>
          <SaveBar saved={saved} />
        </AdminCard>
      </div>
    </div>
  );
}
