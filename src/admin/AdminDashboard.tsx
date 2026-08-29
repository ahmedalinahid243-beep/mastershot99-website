import { Link } from "react-router-dom";
import { useContent } from "../store/ContentContext";
import { LineChart, Calendar, Megaphone, HelpCircle } from "lucide-react";

export default function AdminDashboard() {
  const { content } = useContent();

  const cards = [
    { label: "Published Results", value: content.results.filter((r) => r.published).length, icon: LineChart, to: "/admin/results" },
    { label: "Published Events", value: content.events.filter((e) => e.published).length, icon: Calendar, to: "/admin/events" },
    { label: "Active Announcements", value: content.announcements.filter((a) => a.enabled).length, icon: Megaphone, to: "/admin/announcements" },
    { label: "FAQ Entries", value: content.faq.length, icon: HelpCircle, to: "/admin/faq" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-dim">
        Changes made here update the live site immediately in this preview. Connect Supabase later to persist
        this data to a real database.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {cards.map(({ label, value, icon: Icon, to }) => (
          <Link key={label} to={to} className="rounded-2xl border border-line bg-charcoal p-5 hover:border-gold-dim/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="h-9 w-9 rounded-lg bg-gold-dim/15 flex items-center justify-center text-gold-bright">
                <Icon size={16} />
              </span>
              <span className="font-mono-num text-2xl text-ink">{value}</span>
            </div>
            <p className="mt-3 text-sm text-ink-dim">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-line-strong p-5">
        <h2 className="font-display text-ink">Next Steps</h2>
        <ul className="mt-3 space-y-2 text-sm text-ink-dim list-disc list-inside">
          <li>Connect this Admin Panel to your existing <span className="text-gold-bright">mastershot99</span> Supabase project.</li>
          <li>Replace the demo password login with Supabase Auth.</li>
          <li>Wire image/video uploads to Supabase Storage.</li>
          <li>Add real translation strings for each enabled language.</li>
        </ul>
      </div>
    </div>
  );
}
