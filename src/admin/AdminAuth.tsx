import { createContext, useContext, useState, type ReactNode } from "react";

// Placeholder auth only — this checks a local flag so the Admin UI can be
// previewed end-to-end. Wire this up to Supabase Auth before going live;
// never ship a real deployment with a hardcoded password like this.
const DEMO_PASSWORD = "mastershot99admin";
const SESSION_KEY = "mastershot99_admin_session";

interface AdminAuthValue {
  isAuthed: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");

  const login = (password: string) => {
    if (password === DEMO_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setIsAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthed(false);
  };

  return <AdminAuthContext.Provider value={{ isAuthed, login, logout }}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}

export { DEMO_PASSWORD };
