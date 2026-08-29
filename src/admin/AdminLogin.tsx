import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAdminAuth } from "./AdminAuth";
import { useContent } from "../store/ContentContext";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const { content } = useContent();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const result = await login(email, password);
    setSubmitting(false);
    if (result.ok) {
      navigate("/admin");
    } else {
      setError(result.error || "Login failed.");
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
            <label htmlFor="email" className="block text-xs text-ink-dim mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="w-full rounded-lg bg-charcoal-light border border-line px-4 py-2.5 text-ink focus:outline-none focus:border-gold-dim"
              autoFocus
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs text-ink-dim mb-1.5">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="w-full rounded-lg bg-charcoal-light border border-line px-4 py-2.5 text-ink focus:outline-none focus:border-gold-dim"
              required
            />
            {error && <p className="mt-2 text-xs text-red">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-gradient-to-r from-gold-dim to-gold-bright py-2.5 text-sm font-semibold text-void disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
