import { useState } from "react";
import { useContent } from "../../store/ContentContext";
import { AdminCard, Field, TextInput, TextArea, SaveBar } from "../components/FormControls";

export default function SEOEditor() {
  const { content, setContent } = useContent();
  const [saved, setSaved] = useState(false);

  function update<K extends keyof typeof content.seo>(key: K, value: (typeof content.seo)[K]) {
    setContent((prev) => ({ ...prev, seo: { ...prev.seo, [key]: value } }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">SEO</h1>
      <p className="mt-1 text-sm text-ink-dim">Default meta tags. Per-page overrides connect once Supabase is wired.</p>
      <div className="mt-6">
        <AdminCard title="Meta Tags">
          <Field label="Title"><TextInput value={content.seo.title} onChange={(e) => update("title", e.target.value)} /></Field>
          <Field label="Meta Description"><TextArea value={content.seo.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} rows={3} /></Field>
          <Field label="OG Title"><TextInput value={content.seo.ogTitle} onChange={(e) => update("ogTitle", e.target.value)} /></Field>
          <Field label="OG Description"><TextArea value={content.seo.ogDescription} onChange={(e) => update("ogDescription", e.target.value)} rows={3} /></Field>
          <Field label="Canonical URL"><TextInput value={content.seo.canonicalUrl} onChange={(e) => update("canonicalUrl", e.target.value)} /></Field>
          <SaveBar saved={saved} />
        </AdminCard>
      </div>
    </div>
  );
}
