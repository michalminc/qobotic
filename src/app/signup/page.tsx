"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", company: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all required fields"); return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords don't match"); return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters"); return;
    }
    setLoading(true);
    setError("");
    const result = await signup(form);
    setLoading(false);
    if (result.ok) window.location.href = "/dashboard";
    else setError(result.error || "Something went wrong");
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left — hero image panel */}
      <div className="hidden lg:flex w-[45%] items-center justify-center bg-[#070707] border-r border-[rgba(255,255,255,0.05)] relative overflow-hidden">
        <Image
          src="/signup-hero.jpeg"
          alt="Robot"
          fill
          className="object-cover opacity-40"
          sizes="45vw"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#7e1c26] blur-[150px] opacity-15" />

        <div className="relative z-10 text-center max-w-[320px]">
          <Image src="/logo.png" alt="Qobots" width={160} height={54} className="mx-auto h-[48px] w-auto mb-6 opacity-80" />
          <p className="text-[16px] font-light text-[#999] leading-relaxed">
            Join 500+ companies deploying robots with Qobots. Get started in minutes.
          </p>
          <div className="mt-8 space-y-3 text-left max-w-[260px] mx-auto">
            {["48-hour delivery to 6 countries", "200+ AI skills marketplace", "Cancel subscriptions anytime", "24-month warranty on purchases"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7e1c26]" />
                <span className="text-[13px] text-[#888]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[400px]">
          <Link href="/" className="inline-block mb-10">
            <Image src="/logo.png" alt="Qobots" width={120} height={40} className="h-[36px] w-auto" />
          </Link>

          <h1 className="text-[28px] font-bold tracking-[-0.03em] mb-2">Create account</h1>
          <p className="text-[14px] text-[#888] mb-8">Start renting or buying robots today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name *" value={form.firstName} onChange={(v) => update("firstName", v)} />
              <Field label="Last Name *" value={form.lastName} onChange={(v) => update("lastName", v)} />
            </div>
            <Field label="Company (optional)" value={form.company} onChange={(v) => update("company", v)} />
            <Field label="Email *" value={form.email} onChange={(v) => update("email", v)} type="email" placeholder="you@company.com" />
            <Field label="Password *" value={form.password} onChange={(v) => update("password", v)} type="password" placeholder="Min 6 characters" />
            <Field label="Confirm Password *" value={form.confirm} onChange={(v) => update("confirm", v)} type="password" />

            {error && <p className="text-[13px] text-[#c4484f]">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#7e1c26] hover:bg-[#962330] text-[14px] font-medium text-white transition-all duration-200 disabled:opacity-50"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-[11px] text-[#444] mt-4 leading-relaxed">
            By creating an account you agree to our Terms of Service and Privacy Policy.
          </p>

          <p className="text-center text-[13px] text-[#888] mt-8">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#c4484f] hover:text-[#e06068] transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] text-[14px] text-[#f0f0f8] placeholder:text-[#333] outline-none focus:border-[#7e1c26] transition-colors"
      />
    </div>
  );
}
