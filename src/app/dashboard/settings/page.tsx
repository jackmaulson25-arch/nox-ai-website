"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [user, setUser] = useState<{ email?: string; user_metadata?: { full_name?: string } } | null>(null);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setName(data.user?.user_metadata?.full_name || "");
    });
  }, []);

  const handleSave = async () => {
    await supabase.auth.updateUser({ data: { full_name: name } });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-nox-400 mb-1.5 block">Email</label>
            <input type="email" value={user?.email || ""} disabled className="w-full bg-nox-900/20 border border-nox-800/20 rounded-xl px-4 py-3 text-sm text-nox-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="text-xs text-nox-400 mb-1.5 block">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-nox-900/40 border border-nox-800/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-nox-500" />
          </div>
          <button onClick={handleSave} className="px-6 py-2.5 bg-nox-600 hover:bg-nox-500 rounded-xl text-white text-sm font-semibold transition-all">
            {saved ? "✓ Saved" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">API Keys</h2>
        <div className="space-y-4">
          {[
            { label: "Supabase URL", value: process.env.NEXT_PUBLIC_SUPABASE_URL || "••••" },
            { label: "Stripe Key", value: "rk_live_••••••••" },
            { label: "Groq Key", value: "gsk_••••••••" },
          ].map((key, i) => (
            <div key={i}>
              <label className="text-xs text-nox-400 mb-1.5 block">{key.label}</label>
              <input type="text" value={key.value} disabled className="w-full bg-nox-900/20 border border-nox-800/20 rounded-xl px-4 py-3 text-sm text-nox-500 font-mono cursor-not-allowed" />
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 border-red-500/20">
        <h2 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h2>
        <p className="text-sm text-nox-400 mb-4">Permanently delete your account and all associated data.</p>
        <button className="px-6 py-2.5 border border-red-500/30 hover:bg-red-500/10 rounded-xl text-red-400 text-sm font-semibold transition-all">
          Delete Account
        </button>
      </div>
    </div>
  );
}
