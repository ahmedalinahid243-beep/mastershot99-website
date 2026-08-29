import { useState } from "react";
import { useContent } from "../../store/ContentContext";
import { AdminCard, Field, TextInput, SaveBar } from "../components/FormControls";

export default function TelegramEditor() {
  const { content, setContent } = useContent();
  const [saved, setSaved] = useState(false);

  function update<K extends keyof typeof content.telegram>(key: K, value: (typeof content.telegram)[K]) {
    setContent((prev) => ({ ...prev, telegram: { ...prev.telegram, [key]: value } }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Telegram</h1>
      <p className="mt-1 text-sm text-ink-dim">Powers every "Join Our Telegram Channel" CTA on the site.</p>
      <div className="mt-6">
        <AdminCard title="Telegram Settings">
          <Field label="Channel URL">
            <TextInput value={content.telegram.url} onChange={(e) => update("url", e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Member Count">
              <TextInput value={content.telegram.memberCount} onChange={(e) => update("memberCount", e.target.value)} />
            </Field>
            <Field label="Daily Signal Time">
              <TextInput value={content.telegram.signalTime} onChange={(e) => update("signalTime", e.target.value)} />
            </Field>
          </div>
          <SaveBar saved={saved} />
        </AdminCard>
      </div>
    </div>
  );
}
