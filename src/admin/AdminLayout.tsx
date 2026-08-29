import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Image, User, Send, Share2, LineChart,
  Images, Video, Calendar, Megaphone, HelpCircle, ShieldAlert,
  Languages, Search, Settings, LogOut, ExternalLink,
} from "lucide-react";
import { useAdminAuth } from "./AdminAuth";
import { useContent } from "../store/ContentContext";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true }],
  },
  {
    label: "Homepage",
    items: [
      { to: "/admin/hero", label: "Hero", icon: Image },
      { to: "/admin/brand", label: "Brand", icon: Image },
      { to: "/admin/trader", label: "Trader", icon: User },
    ],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/results", label: "Results", icon: LineChart },
      { to: "/admin/videos", label: "Videos", icon: Video },
      { to: "/admin/events", label: "Events", icon: Calendar },
      { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
      { to: "/admin/faq", label: "FAQ", icon: HelpCircle },
      { to: "/admin/disclaimer", label: "Disclaimer", icon: ShieldAlert },
    ],
  },
  {
    label: "Connections",
    items: [
      { to: "/admin/telegram", label: "Telegram", icon: Send },
      { to: "/admin/social", label: "Social Links", icon: Share2 },
      { to: "/admin/quotex", label: "Quotex", icon: LineChart },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/admin/translations", label: "Translations", icon: Languages },
      { to: "/admin/seo", label: "SEO", icon: Search },
      { to: "/admin/images", label: "Image Library", icon: Images },
      { to: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { logout } = useAdminAuth();
  const { content } = useContent();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-void">
      <aside className="w-64 shrink-0 border-r border-line bg-charcoal hidden md:flex flex-col">
        <div className="px-5 py-5 border-b border-line">
          <img
            src={content.settings.logoUrl}
            alt={content.settings.brandName}
            style={{ height: "auto", width: "auto", objectFit: "contain", maxHeight: "36px" }}
            className="max-w-[130px]"
          />
          <p className="mt-2 text-[10px] uppercase tracking-widest text-gold-bright">Admin Panel</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="px-3 text-[10px] uppercase tracking-widest text-ink-dim mb-2">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={"end" in item ? item.end : false}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive ? "bg-gold-dim/15 text-gold-bright" : "text-ink-dim hover:text-ink hover:bg-charcoal-light"
                      }`
                    }
                  >
                    <item.icon size={16} />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-line space-y-1">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-dim hover:text-ink hover:bg-charcoal-light">
            <ExternalLink size={16} /> View Site
          </a>
          <button
            onClick={() => { logout(); navigate("/admin/login"); }}
            className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red hover:bg-charcoal-light"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
