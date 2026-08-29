import { Link } from "react-router-dom";
import { AdminCard } from "../components/FormControls";
import { ExternalLink } from "lucide-react";

export default function DisclaimerEditor() {
  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Disclaimer</h1>
      <p className="mt-1 text-sm text-ink-dim">The full disclaimer text lives on the public Disclaimer page.</p>
      <div className="mt-6">
        <AdminCard title="Disclaimer Page" description="A rich-text editor for these sections is the next step once Supabase is connected — for now, edit the content directly in the codebase at src/pages/Disclaimer.tsx.">
          <Link
            to="/disclaimer"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-4 py-2 text-sm text-ink hover:border-gold-dim hover:text-gold-bright"
          >
            View Disclaimer Page <ExternalLink size={14} />
          </Link>
        </AdminCard>
      </div>
    </div>
  );
}
