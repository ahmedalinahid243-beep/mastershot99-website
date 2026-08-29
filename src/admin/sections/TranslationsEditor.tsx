import { useContent } from "../../store/ContentContext";
import { AdminCard, ToggleRow } from "../components/FormControls";

export default function TranslationsEditor() {
  const { content, setContent } = useContent();

  function toggle(code: string) {
    setContent((prev) => ({
      ...prev,
      languages: prev.languages.map((l) => (l.code === code ? { ...l, enabled: !l.enabled } : l)),
    }));
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Translations</h1>
      <p className="mt-1 text-sm text-ink-dim">Enable or disable languages shown in the navbar selector.</p>
      <div className="mt-6">
        <AdminCard title="Languages" description="Full string-level translation editing connects here once real translation tables are wired to Supabase.">
          {content.languages.map((lang) => (
            <ToggleRow key={lang.code} label={`${lang.nativeLabel} (${lang.label})${lang.rtl ? " · RTL" : ""}`} checked={lang.enabled} onChange={() => toggle(lang.code)} />
          ))}
        </AdminCard>
      </div>
    </div>
  );
}
