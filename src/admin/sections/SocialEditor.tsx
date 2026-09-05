import { useState } from "react";
import { useContent } from "../../store/ContentContext";
import { AdminCard, Field, TextInput, SaveBar } from "../components/FormControls";

export default function SocialEditor() {
  const { content, setContent } = useContent();
  const [saved, setSaved] = useState(false);

  function update<K extends keyof typeof content.social>(key: K, value: (typeof content.social)[K]) {
    setContent((prev) => ({ ...prev, social: { ...prev.social, [key]: value } }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Social Links</h1>
      <p className="mt-1 text-sm text-ink-dim">Shown in the footer and Contact page.</p>
      <div className="mt-6">
        <AdminCard title="Links">
          <Field label="Facebook URL">
            <TextInput value={content.social.facebook} onChange={(e) => update("facebook", e.target.value)} />
          </Field>
          <Field label="TikTok URL">
            <TextInput value={content.social.tiktok} onChange={(e) => update("tiktok", e.target.value)} />
          </Field>
          <Field label="YouTube URL">
            <TextInput value={content.social.youtube} onChange={(e) => update("youtube", e.target.value)} />
          </Field>
          <Field label="WhatsApp Number">
            <TextInput value={content.social.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
          </Field>
          <Field label="Telegram URL">
            <TextInput value={content.social.telegram} onChange={(e) => update("telegram", e.target.value)} />
          </Field>
          <SaveBar saved={saved} />
        </AdminCard>
      </div>
    </div>
  );
}
