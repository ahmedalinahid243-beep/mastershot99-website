import { useContent } from "../../store/ContentContext";
import { AdminCard, Field, TextInput } from "../components/FormControls";

export default function SettingsPage() {
  const { content, setContent, resetContent } = useContent();

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Settings</h1>
      <p className="mt-1 text-sm text-ink-dim">General site settings and data controls.</p>

      <div className="mt-6 space-y-5">
        <AdminCard title="WhatsApp Number">
          <Field label="Number">
            <TextInput
              value={content.settings.whatsapp}
              onChange={(e) => setContent((prev) => ({ ...prev, settings: { ...prev.settings, whatsapp: e.target.value } }))}
            />
          </Field>
        </AdminCard>

        <AdminCard title="Data" description="This preview stores content in your browser only. Nothing is sent anywhere yet.">
          <button
            onClick={() => {
              if (confirm("Reset all content back to the original defaults? This can't be undone.")) resetContent();
            }}
            className="rounded-lg border border-red/40 px-4 py-2 text-sm text-red hover:bg-red/10"
          >
            Reset All Content to Defaults
          </button>
        </AdminCard>

        <AdminCard title="Supabase Connection">
          <p className="text-sm text-ink-dim leading-relaxed">
            Connect the existing <span className="text-gold-bright">mastershot99</span> Supabase project by adding
            your project URL and anon key as environment variables, then swapping the ContentContext's
            localStorage calls for Supabase queries. Never expose the service-role key in frontend code.
          </p>
        </AdminCard>
      </div>
    </div>
  );
}
