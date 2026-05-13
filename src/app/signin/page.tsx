"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  const { login } = useAuth();
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
    const result = await login(email, password);
    setLoading(false);
    if (result.ok) window.location.href = "/dashboard";
    else setError(result.error || "Invalid credentials");
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left — hero image panel */}
      <div className="hidden lg:flex w-[45%] items-center justify-center bg-[#070707] border-r border-[rgba(255,255,255,0.05)] relative overflow-hidden">
        <Image
          src="/login-hero.jpeg"
          alt="Robot"
          fill
          className="object-cover opacity-40"
          sizes="45vw"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#7e1c26] blur-[150px] opacity-15" />

        <div className="relative z-10 text-center max-w-[320px]">
          <Image src="/logo.png" alt="Qobots" width={160} height={54} className="mx-auto h-[48px] w-auto mb-6 opacity-80" />
          <p className="text-[16px] font-light text-[#999] leading-relaxed">
            One platform to rent, buy, and subscribe to humanoid robots with AI skills.
          </p>
          <div className="flex justify-center gap-8 mt-8">
            <div><span className="text-[22px] font-bold text-white/60 block">24+</span><span className="font-mono text-[10px] text-[#555]">ROBOTS</span></div>
            <div><span className="text-[22px] font-bold text-white/60 block">200+</span><span className="font-mono text-[10px] text-[#555]">SKILLS</span></div>
            <div><span className="text-[22px] font-bold text-white/60 block">6</span><span className="font-mono text-[10px] text-[#555]">COUNTRIES</span></div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[400px]">
          <Link href="/" className="inline-block mb-10">
            <Image src="/logo.png" alt="Qobots" width={120} height={40} className="h-[36px] w-auto" />
          </Link>

          <h1 className="text-[28px] font-bold tracking-[-0.03em] mb-2">Welcome back</h1>
          <p className="text-[14px] text-[#888] mb-8">Sign in to manage your robots and subscriptions</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
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

            {error && (
              <p className="text-[13px] text-[#c4484f]">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#7e1c26] hover:bg-[#962330] text-[14px] font-medium text-white transition-all duration-200 disabled:opacity-50"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[rgba(255,255,255,0.07)]" /></div>
            <div className="relative flex justify-center"><span className="px-3 bg-black text-[12px] text-[#444]">or</span></div>
          </div>

          {/* Social buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] text-[14px] text-[#888] hover:text-white hover:border-[rgba(255,255,255,0.14)] transition-all">
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] text-[14px] text-[#888] hover:text-white hover:border-[rgba(255,255,255,0.14)] transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              Continue with GitHub
            </button>
          </div>

          <p className="text-center text-[13px] text-[#888] mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#c4484f] hover:text-[#e06068] transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
