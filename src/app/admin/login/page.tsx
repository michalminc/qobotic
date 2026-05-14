"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] px-6">
      <div className="w-full max-w-[400px] bg-white rounded-3xl border border-black/[0.08] p-8 shadow-sm">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-full border-2 border-[#1d1d1f] flex items-center justify-center">
            <span className="text-[11px] font-black text-[#1d1d1f]">Q</span>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-[#1d1d1f]">Qobots Admin</span>
        </div>

        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#1d1d1f] mb-1">Sign in</h1>
        <p className="text-[13px] text-[#86868b] mb-6">Access the content management system.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="email@qobots.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#f5f5f7] text-[14px] text-[#1d1d1f] placeholder-[#86868b] outline-none focus:border-black/[0.3] transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#f5f5f7] text-[14px] text-[#1d1d1f] placeholder-[#86868b] outline-none focus:border-black/[0.3] transition-colors"
          />
          {error && <p className="text-[13px] text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#1d1d1f] hover:bg-[#333] disabled:opacity-60 text-white text-[14px] font-medium transition-colors"
          >
            {loading ? "Signing in..." : "Sign in →"}
          </button>
        </form>
      </div>
    </div>
  );
}
