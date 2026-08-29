import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAdminAuth, DEMO_PASSWORD } from "./AdminAuth";
import { useContent } from "../store/ContentContext";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const { content } = useContent();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (login(password)) {
      navigate("/admin");
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-void bg-grid px-5">
      <div className="w-full max-w-sm glass rounded-2xl p-8">
        <img
          src={content.settings.logoUrl}
          alt={content.settings.brandName}
          style={{ height: "auto", width: "auto", objectFit: "contain", maxHeight: "44px" }}
          className="max-w-[150px] mx-auto mb-6"
        />
        <div className="flex items-center justify-center gap-2 text-gold-bright mb-6">
          <Lock size={16} />
          <span className="text-sm uppercase tracking-widest">Admin Login</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-xs text-ink-dim mb-1.5">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full rounded-lg bg-charcoal-light border border-line px-4 py-2.5 text-ink focus:outline-none focus:border-gold-dim"
              autoFocus
            />
            {error && <p className="mt-2 text-xs text-red">Incorrect password. Try again.</p>}
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-gold-dim to-gold-bright py-2.5 text-sm font-semibold text-void"
          >
            Sign In
          </button>
        </form>
        <p className="mt-5 text-[11px] text-ink-dim text-center leading-relaxed">
          Demo credential: <span className="font-mono-num text-gold-bright">{DEMO_PASSWORD}</span>
          <br />Replace with Supabase Auth before launch.
        </p>
      </div>
    </div>
  );
}
