import { useState } from "react";
import { useContent } from "../../store/ContentContext";
import { AdminCard, Field, TextInput, TextArea, SaveBar } from "../components/FormControls";

export default function QuotexEditor() {
  const { content, setContent } = useContent();
  const [saved, setSaved] = useState(false);

  function update<K extends keyof typeof content.quotex>(key: K, value: (typeof content.quotex)[K]) {
    setContent((prev) => ({ ...prev, quotex: { ...prev.quotex, [key]: value } }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Quotex</h1>
      <p className="mt-1 text-sm text-ink-dim">Referral section shown on the homepage and Quotex Guide page.</p>
      <div className="mt-6">
        <AdminCard title="Referral Section">
          <Field label="Referral URL">
            <TextInput value={content.quotex.referralUrl} onChange={(e) => update("referralUrl", e.target.value)} />
          </Field>
          <Field label="Heading">
            <TextInput value={content.quotex.heading} onChange={(e) => update("heading", e.target.value)} />
          </Field>
          <Field label="Description">
            <TextArea value={content.quotex.description} onChange={(e) => update("description", e.target.value)} rows={3} />
          </Field>
          <Field label="Button Label">
            <TextInput value={content.quotex.buttonLabel} onChange={(e) => update("buttonLabel", e.target.value)} />
          </Field>
          <Field label="Referral Disclosure" hint="Required — never remove this disclosure.">
            <TextArea value={content.quotex.disclosure} onChange={(e) => update("disclosure", e.target.value)} rows={3} />
          </Field>
          <SaveBar saved={saved} />
        </AdminCard>
      </div>
    </div>
  );
}
