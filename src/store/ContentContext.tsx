import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { SiteContent } from "./types";
import { defaultContent } from "./defaultContent";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const ADMIN_SESSION_KEY = "mastershot99_admin_session";

function getAdminToken(): string | null {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.expires_at && Date.now() / 1000 > parsed.expires_at) return null;
    return parsed?.access_token ?? null;
  } catch {
    return null;
  }
}

interface ContentContextValue {
  content: SiteContent;
  loading: boolean;
  setContent: (updater: (prev: SiteContent) => SiteContent) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const rowIdRef = useRef<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/site_content?select=id,content&order=id.asc&limit=1`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
          }
        );
        const rows = await res.json();
        if (Array.isArray(rows) && rows.length > 0) {
          rowIdRef.current = rows[0].id;
          setContentState({ ...defaultContent, ...rows[0].content });
        }
      } catch {
        // fall back to defaultContent silently
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  function persist(next: SiteContent) {
    const token = getAdminToken();
    if (!token) return; // not logged in as admin, nothing will be saved server-side

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        if (rowIdRef.current !== null) {
          await fetch(`${SUPABASE_URL}/rest/v1/site_content?id=eq.${rowIdRef.current}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${token}`,
              Prefer: "return=minimal",
            },
            body: JSON.stringify({ content: next }),
          });
        } else {
          const res = await fetch(`${SUPABASE_URL}/rest/v1/site_content`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${token}`,
              Prefer: "return=representation",
            },
            body: JSON.stringify({ content: next }),
          });
          const created = await res.json();
          if (Array.isArray(created) && created[0]?.id) {
            rowIdRef.current = created[0].id;
          }
        }
      } catch {
        // silently ignore network errors; local state still updated
      }
    }, 600);
  }

  const value = useMemo<ContentContextValue>(
    () => ({
      content,
      loading,
      setContent: (updater) =>
        setContentState((prev) => {
          const next = updater(prev);
          persist(next);
          return next;
        }),
      resetContent: () =>
        setContentState(() => {
          persist(defaultContent);
          return defaultContent;
        }),
    }),
    [content, loading]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within a ContentProvider");
  return ctx;
}
