import { useRef, useState } from "react";
import { useContent } from "../../store/ContentContext";
import { AdminCard, Field, TextInput, TextArea, SaveBar } from "../components/FormControls";
import { Upload } from "lucide-react";

export default function BrandEditor() {
  const { content, setContent } = useContent();
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof typeof content.settings>(key: K, value: (typeof content.settings)[K]) {
    setContent((prev) => ({ ...prev, settings: { ...prev.settings, [key]: value } }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    update("logoUrl", url);
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Brand</h1>
      <p className="mt-1 text-sm text-ink-dim">Logo, name, and tagline used across the whole site.</p>

      <div className="mt-6 space-y-5">
        <AdminCard title="Logo" description="Used exactly as uploaded in the navbar, hero, footer, mobile menu, and admin branding.">
          <div className="flex items-center gap-5">
            <div className="h-20 w-32 rounded-lg border border-line bg-void flex items-center justify-center overflow-hidden">
              <img src={content.settings.logoUrl} alt="Logo preview" style={{ height: "auto", width: "auto", objectFit: "contain", maxHeight: "72px", maxWidth: "120px" }} />
            </div>
            <div>
              <button
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-4 py-2 text-sm text-ink hover:border-gold-dim hover:text-gold-bright"
              >
                <Upload size={14} /> Replace Logo
              </button>
              <input ref={fileRef} type="file" accept="image/png,image/svg+xml,image/webp" className="hidden" onChange={handleLogoUpload} />
              <p className="mt-2 text-[11px] text-ink-dim">PNG or SVG with a transparent background recommended.</p>
            </div>
          </div>
          <SaveBar saved={saved} />
        </AdminCard>

        <AdminCard title="Brand Details">
          <Field label="Brand Name">
            <TextInput value={content.settings.brandName} onChange={(e) => update("brandName", e.target.value)} />
          </Field>
          <Field label="Tagline">
            <TextInput value={content.settings.tagline} onChange={(e) => update("tagline", e.target.value)} />
          </Field>
          <Field label="Bengali Supporting Message">
            <TextArea value={content.settings.taglineBn} onChange={(e) => update("taglineBn", e.target.value)} rows={3} />
          </Field>
        </AdminCard>
      </div>
    </div>
  );
}
