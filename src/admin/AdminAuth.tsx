import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const SESSION_KEY = "mastershot99_admin_session";

interface AdminAuthValue {
  isAuthed: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthValue | null>(null);

function getStoredToken(): string | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.expires_at && Date.now() / 1000 > parsed.expires_at) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return parsed?.access_token ?? null;
  } catch {
    return null;
  }
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsAuthed(!!getStoredToken());
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.access_token) {
        return { ok: false, error: data.error_description || data.msg || "Invalid email or password." };
      }
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ access_token: data.access_token, expires_at: data.expires_at })
      );
      setIsAuthed(true);
      return { ok: true };
    } catch {
      return { ok: false, error: "Network error. Please try again." };
    }
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthed(false);
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthed, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
