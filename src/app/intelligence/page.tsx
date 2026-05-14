"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Brain, Eye, GitBranch, Zap, Navigation2, MessageSquare } from "lucide-react";

// ─── NAV ─────────────────────────────────────────────────────────────────────

function MockNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06]">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Qobotic" width={180} height={88} priority className="h-9 w-auto" />
          <span className="text-[11px] text-[#86868b] tracking-widest uppercase font-medium">Intelligence</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
                      <a key="Intelligence" href="/intelligence" className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-150">
              Intelligence
            </a>
            <a key="Operations" href="/operations" className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-150">
              Operations
            </a>
            <a key="Lab" href="/lab" className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-150">
              Lab
            </a>
            <a key="Fleet" href="/fleet" className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-150">
              Fleet
            </a>
            <Link key="Team" href="/#team" className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-150">
              Team
            </Link>
        </nav>

        <a href="#contact" className="hidden md:flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#1d1d1f] text-white text-[13px] font-medium hover:bg-[#333] transition-colors duration-150">
          Work with us
        </a>
      </div>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-[580px] sm:min-h-[700px] lg:h-[880px] flex items-center overflow-hidden bg-white">
      {/* Photo — right 55% */}
      <div className="absolute top-0 right-0 w-[55%] bottom-0 hidden lg:block">
        <Image
          src="/images/heroes/hero-intelligence-light.jpg"
          alt="Human hand and robot hand"
          fill
          priority
          sizes="55vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-y-0 left-0 w-72 bg-gradient-to-r from-white via-white/85 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent" />
        <div className="absolute inset-0 bg-white/10" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-12 lg:px-16 xl:px-24 pt-28 sm:pt-32 pb-16">
        <div className="max-w-[580px]">
          <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-6">robotManager · Per-robot intelligence</span>

          <h1 className="text-[36px] sm:text-[clamp(44px,5.5vw,72px)] font-extrabold tracking-[-0.04em] leading-[1.05] text-[#1d1d1f]">
            The brain we ship<br />
            to every robot.
          </h1>

          <p className="text-[15px] sm:text-[17px] font-light text-[#86868b] mt-6 sm:mt-8 max-w-[480px] leading-[1.7] tracking-[-0.01em]">
            robotManager is our per-robot AI system — six tightly integrated layers from raw sensor data to autonomous task execution.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8 sm:mt-10">
            <a href="#contact" className="px-7 py-3.5 text-[14px] font-medium text-white bg-[#1d1d1f] hover:bg-[#333] rounded-full transition-colors text-center">
              Talk to our engineers →
            </a>
            <a href="#interface" className="px-7 py-3.5 text-[14px] text-[#86868b] hover:text-[#1d1d1f] border border-black/[0.12] hover:border-black/[0.25] rounded-full transition-colors text-center">
              See the interface ↓
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}

// ─── SIX LAYERS ──────────────────────────────────────────────────────────────

const layers = [
  { label: "Vision", desc: "RGB-D perception, object detection, 6-DOF pose estimation", icon: Eye },
  { label: "SLAM", desc: "Real-time 3D mapping, lidar + camera fusion", icon: Navigation2 },
  { label: "NLU", desc: "Natural language task parsing, voice command execution", icon: MessageSquare },
  { label: "Planning", desc: "Hierarchical task planning, constraint satisfaction", icon: Brain },
  { label: "Behavior Trees", desc: "Modular, reactive behavior orchestration", icon: GitBranch },
  { label: "Motor Control", desc: "Low-latency joint control, compliance, collision avoidance", icon: Zap },
];

function LayersSection() {
  return (
    <section className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Architecture</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f] max-w-[640px]">
          Six layers. One robot.
        </h2>
        <p className="text-[19px] text-[#6e6e73] mt-5 max-w-[460px] leading-relaxed font-light">
          Tightly integrated from raw sensor data to autonomous task execution.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <div key={layer.label} className="p-6 rounded-2xl bg-[#f5f5f7] hover:bg-[#ebebeb] transition-colors duration-200">
                <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                  <Icon size={14} className="text-[#6e6e73]" />
                </div>
                <span className="text-[14px] font-semibold text-[#1d1d1f] block mb-1.5">{layer.label}</span>
                <p className="text-[13px] text-[#6e6e73] leading-relaxed">{layer.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ─── INTERFACE SLIDER ─────────────────────────────────────────────────────────

const slides = [
  { tag: "Dashboard",          image: "/images/app/reference_dashboard.jpg", caption: "Real-time robot state — joints, sensors, battery, mission progress." },
  { tag: "Robot Control",      image: "/images/app/reference_control.jpg",   caption: "Direct teleoperation and supervised control for any deployed unit." },
  { tag: "Object Recognition", image: "/images/app/reference_object.jpg",    caption: "RGB-D perception fused with object detection and 6-DOF pose estimation." },
  { tag: "Training",           image: "/images/app/reference_training.jpg",  caption: "Train new skills from demonstration and deploy them across the fleet." },
];

function InterfaceSlider() {
  const [active, setActive] = useState(0);

  return (
    <section id="interface" className="bg-[#f5f5f7] py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Interface</span>
        <div className="mb-12">
          <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f]">
            One control plane<br />per robot.
          </h2>
          <p className="text-[19px] text-[#6e6e73] mt-5 max-w-[500px] leading-relaxed font-light">
            robotManager exposes the full intelligence stack through a unified interface — for operators in the field and developers in the lab.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {slides.map((s, i) => (
            <button
              key={s.tag}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-150 ${
                active === i
                  ? "bg-[#1d1d1f] text-white"
                  : "bg-white text-[#6e6e73] hover:text-[#1d1d1f] border border-black/[0.08]"
              }`}
            >
              {s.tag}
            </button>
          ))}
        </div>

        {/* Static monitor frame */}
        <div className="relative max-w-[900px] mx-auto">
          {/* Monitor bezel */}
          <div className="bg-[#1c1c1e] rounded-[20px] p-[10px] shadow-[0_40px_80px_rgba(0,0,0,0.25),inset_0_0_0_1px_rgba(255,255,255,0.06)]">
            {/* Camera dot */}
            <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#3a3a3a] z-10" />
            {/* Screen — 3:2 to match the reference renders (1536x1024) */}
            <div className="relative rounded-[12px] overflow-hidden bg-[#0d0d0d]" style={{ aspectRatio: "3/2" }}>
              {slides.map((s, i) => (
                <div
                  key={s.tag}
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ opacity: active === i ? 1 : 0, pointerEvents: active === i ? "auto" : "none" }}
                  aria-hidden={active !== i}
                >
                  <Image
                    src={s.image}
                    alt={s.tag}
                    fill
                    sizes="(min-width: 1280px) 1260px, 90vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Stand neck */}
          <div className="flex flex-col items-center mt-0">
            <div className="w-[56px] h-[36px] bg-[#2a2a2a]" style={{ clipPath: "polygon(22% 0%, 78% 0%, 88% 100%, 12% 100%)" }} />
            <div className="w-[220px] h-[8px] bg-[#2a2a2a] rounded-full" />
          </div>
        </div>

        {/* Caption */}
        <p className="text-[15px] text-[#6e6e73] mt-6 font-light text-center">{slides[active].caption}</p>
      </div>
    </section>
  );
}

// ─── STATS ───────────────────────────────────────────────────────────────────

function StatsSection() {
  return (
    <section className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black/[0.06] rounded-2xl overflow-hidden border border-black/[0.06]">
          {[
            { value: "<80ms", label: "Perception-to-action latency" },
            { value: "43 DOF", label: "Full-body articulation" },
            { value: "12+", label: "Autonomous task portfolio" },
            { value: "24/7", label: "Production deployment" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 sm:p-8 flex flex-col gap-1">
              <span className="text-[28px] sm:text-[36px] font-bold text-[#1d1d1f] tracking-[-0.03em]">{stat.value}</span>
              <span className="text-[13px] text-[#86868b] leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PLATFORMS ───────────────────────────────────────────────────────────────

function PlatformsSection() {
  return (
    <section className="bg-[#f5f5f7] py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Hardware</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f] max-w-[640px]">
          One brain. Any body.
        </h2>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "AgiBot X2 Ultra", status: "Production", statusCls: "bg-[#dcfce7] text-[#16a34a]", detail: "43 DOF · live in production" },
            { label: "Unitree G1", status: "Supported", statusCls: "bg-[#dbeafe] text-[#2563eb]", detail: "Integration ready" },
            { label: "Custom Platforms", status: "Engineered per project", statusCls: "bg-white text-[#6e6e73] border border-black/[0.08]", detail: "HAL-based adaptation" },
            { label: "Future Platforms", status: "Open SDK", statusCls: "bg-white text-[#6e6e73] border border-black/[0.08]", detail: "Ship your robot with our brain" },
          ].map((p) => (
            <div key={p.label} className="p-6 sm:p-8 rounded-2xl bg-white hover:shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-shadow duration-200">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[15px] font-semibold text-[#1d1d1f]">{p.label}</span>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${p.statusCls}`}>{p.status}</span>
              </div>
              <p className="text-[14px] text-[#6e6e73]">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

// RFC-5322-lite: good enough for client-side hint; server still validates with Zod.
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function ContactSection() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const email = form.email.trim();
    const name = form.name.trim();

    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.message.length > 4000) {
      setError("Message is too long (max 4000 characters).");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "SOFTWARE",
          email,
          name,
          message: form.message.trim() || null,
          source: "intelligence-contact",
          website: form.website, // honeypot — must stay empty
        }),
      });
      if (res.status === 429) {
        setError("Too many requests. Please try again in a minute.");
        setSubmitting(false);
        return;
      }
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error || "Failed to send. Please try again.");
        setSubmitting(false);
        return;
      }
      setSent(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[900px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Contact</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f]">
          Talk to our engineers.
        </h2>
        <p className="text-[19px] text-[#6e6e73] mt-5 max-w-[460px] leading-relaxed font-light">
          Tell us about your robot platform and requirements. We move fast.
        </p>

        <div className="mt-12">
          {sent ? (
            <div className="p-8 rounded-2xl bg-[#f5f5f7] text-center">
              <h3 className="text-[20px] font-bold text-[#1d1d1f] mb-2">Got it.</h3>
              <p className="text-[15px] text-[#6e6e73]">We&apos;ll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Honeypot — hidden from humans, bots fill it. */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.website}
                onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                className="absolute -left-[9999px] w-px h-px opacity-0"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-2">Name</label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl bg-[#f5f5f7] border border-black/[0.08] text-[14px] text-[#1d1d1f] placeholder-[#86868b] outline-none focus:border-black/[0.25] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-2">Email</label>
                  <input
                    type="email"
                    required
                    maxLength={254}
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#f5f5f7] border border-black/[0.08] text-[14px] text-[#1d1d1f] placeholder-[#86868b] outline-none focus:border-black/[0.25] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-2">Tell us about your robot</label>
                <textarea
                  rows={4}
                  maxLength={4000}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="What platform? What tasks? What's the deployment context?"
                  className="w-full px-4 py-3 rounded-xl bg-[#f5f5f7] border border-black/[0.08] text-[14px] text-[#1d1d1f] placeholder-[#86868b] outline-none focus:border-black/[0.25] transition-colors resize-none"
                />
              </div>
              {error && (
                <p role="alert" className="text-[13px] text-red-600">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3.5 text-[14px] font-medium text-white bg-[#1d1d1f] hover:bg-[#333] rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending…" : "Send message →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function MockFooter() {
  return (
    <footer className="bg-[#f5f5f7] border-t border-black/[0.06] py-10 px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-6 flex-wrap">
          <a href="/intelligence" className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-150">Intelligence</a>
          <a href="/operations" className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-150">Operations</a>
          <a href="/lab" className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-150">Lab</a>
          <a href="/fleet" className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-150">Fleet</a>
          <Link href="/#team" className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-150">Team</Link>
        </div>
        <div className="pt-6 border-t border-black/[0.06] flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-end">
          <div className="text-[12px] text-[#86868b] leading-relaxed">
            <p className="text-[#1d1d1f] font-medium">RENTNOW GROUP sp. z o.o.</p>
            <p>ul. Złota 75A lok. 7, 00-819 Warszawa</p>
            <p className="text-[#86868b]">KRS 0001235271 · NIP 5273214205 · REGON 544497775</p>
          </div>
          <span className="text-[12px] text-[#86868b] shrink-0">© 2026 Qobots Intelligence. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function IntelligencePage() {
  return (
    <div className="flex flex-col bg-white font-[family-name:var(--font-geist-sans)]">
      <MockNav />
      <HeroSection />
      <LayersSection />
      <InterfaceSlider />
      <StatsSection />
      <PlatformsSection />
      <ContactSection />
      <MockFooter />
    </div>
  );
}
