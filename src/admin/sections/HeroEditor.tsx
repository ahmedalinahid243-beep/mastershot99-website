import { useState } from "react";
import { useContent } from "../../store/ContentContext";
import { AdminCard, Field, TextInput, TextArea, SaveBar } from "../components/FormControls";

export default function HeroEditor() {
  const { content, setContent } = useContent();
  const [saved, setSaved] = useState(false);

  function update<K extends keyof typeof content.hero>(key: K, value: (typeof content.hero)[K]) {
    setContent((prev) => ({ ...prev, hero: { ...prev.hero, [key]: value } }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Hero</h1>
      <p className="mt-1 text-sm text-ink-dim">The first section visitors see on the homepage.</p>
      <div className="mt-6 space-y-5">
        <AdminCard title="Hero Content">
          <Field label="Heading">
            <TextArea value={content.hero.heading} onChange={(e) => update("heading", e.target.value)} rows={3} />
          </Field>
          <Field label="Bengali Subheading">
            <TextArea value={content.hero.subheadingBn} onChange={(e) => update("subheadingBn", e.target.value)} rows={3} />
          </Field>
          <Field label="Primary CTA Label">
            <TextInput value={content.hero.primaryCtaLabel} onChange={(e) => update("primaryCtaLabel", e.target.value)} />
          </Field>
          <Field label="Secondary CTA Label">
            <TextInput value={content.hero.secondaryCtaLabel} onChange={(e) => update("secondaryCtaLabel", e.target.value)} />
          </Field>
          <SaveBar saved={saved} />
        </AdminCard>
      </div>
    </div>
  );
}
