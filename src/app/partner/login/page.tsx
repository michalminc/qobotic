"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Bot } from "lucide-react";

export default function PartnerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/partner/login", {
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
      window.location.href = "/partner";
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left — hero */}
      <div className="hidden lg:flex w-[45%] items-center justify-center bg-[#070707] border-r border-[rgba(255,255,255,0.05)] relative overflow-hidden">
        <Image src="/robot-hero-profile.jpeg" alt="Robot" fill className="object-cover opacity-30" sizes="45vw" />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#7e1c26] blur-[150px] opacity-15" />

        <div className="relative z-10 text-center max-w-[340px]">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image src="/logo.png" alt="Qobots" width={140} height={47} className="h-[40px] w-auto opacity-80" />
            <span className="px-2.5 py-1 rounded-lg bg-[#7e1c26]/20 text-[#c4484f] text-[11px] font-mono font-bold uppercase tracking-wider">
              Partner
            </span>
          </div>
          <p className="text-[16px] font-light text-[#999] leading-relaxed mb-8">
            Manage your fleet, track bookings, and grow your robot rental business.
          </p>
          <div className="space-y-3 text-left max-w-[280px] mx-auto">
            {[
              "List unlimited robots on the marketplace",
              "Real-time booking & subscription management",
              "Automated monthly payouts",
              "Fleet analytics & performance metrics",
              "Direct customer messaging",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7e1c26] mt-1.5 shrink-0" />
                <span className="text-[13px] text-[#888]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[400px]">
          <div className="flex items-center gap-3 mb-10">
            <Link href="/">
              <Image src="/logo.png" alt="Qobots" width={120} height={40} className="h-[36px] w-auto" />
            </Link>
            <span className="px-2 py-0.5 rounded-md bg-[#7e1c26]/20 text-[#c4484f] text-[10px] font-mono font-bold uppercase tracking-wider">
              Partner
            </span>
          </div>

          <h1 className="text-[28px] font-bold tracking-[-0.03em] mb-2">Partner Portal</h1>
          <p className="text-[14px] text-[#888] mb-8">Sign in to manage your robots and bookings</p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-[rgba(126,28,38,0.15)] border border-[rgba(126,28,38,0.3)] text-[13px] text-[#c4484f]">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="partner@company.com"
                className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] text-[14px] text-[#f0f0f8] placeholder:text-[#333] outline-none focus:border-[#7e1c26] transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] text-[14px] text-[#f0f0f8] placeholder:text-[#333] outline-none focus:border-[#7e1c26] transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#7e1c26] hover:bg-[#962330] text-[14px] font-medium text-white transition-all duration-200 disabled:opacity-50"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Signing in..." : "Sign in to Partner Portal"}
            </button>
          </form>

          <div className="mt-8 p-4 rounded-xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]">
            <div className="flex items-center gap-2 mb-2">
              <Bot size={16} className="text-[#c4484f]" />
              <span className="text-[13px] font-medium text-[#f0f0f8]">Become a partner</span>
            </div>
            <p className="text-[12px] text-[#888] leading-relaxed">
              Own robots? List them on Qobots and earn from rentals, subscriptions, and sales.{" "}
              <Link href="/list" className="text-[#c4484f] hover:text-[#e06068] transition-colors">
                Apply now &rarr;
              </Link>
            </p>
          </div>

          <p className="text-center text-[13px] text-[#888] mt-8">
            Customer account?{" "}
            <Link href="/signin" className="text-[#c4484f] hover:text-[#e06068] transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
