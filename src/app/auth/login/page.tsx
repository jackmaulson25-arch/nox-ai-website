"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else window.location.href = "/dashboard";
    setLoading(false);
  };

  const handleGithub = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github", options: { redirectTo: `${location.origin}/auth/callback` } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 grid-bg">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nox-900/30 via-transparent to-transparent" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-nox-600 flex items-center justify-center font-bold">N</div>
            <span className="font-bold text-white text-xl">Nox AI</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-nox-400 text-sm">Sign in to your command center</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <button onClick={handleGithub} className="w-full py-3 rounded-xl border border-nox-700/50 hover:border-nox-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            Continue with GitHub
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-nox-800/50" />
            <span className="text-xs text-nox-500">or</span>
            <div className="flex-1 h-px bg-nox-800/50" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-nox-400 mb-1.5 block">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-nox-900/40 border border-nox-800/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-nox-600 focus:outline-none focus:border-nox-500" placeholder="you@email.com" />
            </div>
            <div>
              <label className="text-xs text-nox-400 mb-1.5 block">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-nox-900/40 border border-nox-800/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-nox-600 focus:outline-none focus:border-nox-500" placeholder="••••••••" />
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-nox-600 hover:bg-nox-500 disabled:opacity-50 rounded-xl text-white font-semibold text-sm transition-all">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-nox-500 mt-6">
            Don&apos;t have an account? <Link href="/auth/signup" className="text-nox-400 hover:text-white">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
