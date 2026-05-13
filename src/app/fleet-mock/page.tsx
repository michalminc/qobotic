"use client";

import { useState } from "react";
import Link from "next/link";

// ─── NAV ─────────────────────────────────────────────────────────────────────

function MockNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06]">
      <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/mock" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full border-2 border-[#1d1d1f] flex items-center justify-center">
            <span className="text-[10px] font-black text-[#1d1d1f]">Q</span>
          </div>
          <span className="text-[13px] font-semibold tracking-tight text-[#1d1d1f]">Qobots</span>
          <span className="text-[11px] text-[#86868b] tracking-widest uppercase font-medium">Fleet</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {["Humanoids", "Industrial", "Quadrupeds", "Reception", "Software"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-150">
              {item}
            </a>
          ))}
        </nav>

        <a href="#contact" className="hidden md:flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#1d1d1f] text-white text-[13px] font-medium hover:bg-[#333] transition-colors duration-150">
          Request software
        </a>
      </div>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-[580px] sm:min-h-[680px] lg:h-[800px] flex items-center overflow-hidden bg-white">
      {/* Photo — right 60% */}
      <div className="absolute top-0 right-0 w-[60%] bottom-0 hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/heroes/hero-fleet-light.jpg"
          alt="Qobots robot fleet"
          className="absolute inset-0 w-full h-full object-cover object-left"
        />
        <div className="absolute inset-y-0 left-0 w-80 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-12 lg:px-16 xl:px-24 pt-28 sm:pt-32 pb-16">
        <div className="max-w-[560px]">
          <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-6">Robot Fleet · 5 platforms</span>

          <h1 className="text-[44px] sm:text-[clamp(52px,5.5vw,80px)] font-extrabold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f]">
            The robots<br />we run.
          </h1>

          <p className="text-[15px] sm:text-[17px] font-light text-[#86868b] mt-6 sm:mt-8 max-w-[460px] leading-[1.7]">
            Five platforms in production. Each integrated with robotManager and Operations Platform. Request software or inquire about a robot.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: "5 platforms", sub: "in fleet" },
              { label: "43 DOF", sub: "max (A2 Series)" },
              { label: "rentnow.me", sub: "active deployment" },
            ].map((s) => (
              <div key={s.label} className="px-4 py-2.5 rounded-2xl border border-black/[0.08] bg-[#f5f5f7]">
                <span className="text-[14px] font-semibold text-[#1d1d1f] block">{s.label}</span>
                <span className="text-[11px] text-[#86868b]">{s.sub}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a href="#fleet" className="px-7 py-3.5 text-[14px] font-medium text-white bg-[#1d1d1f] hover:bg-[#333] rounded-full transition-colors text-center">
              Browse the fleet ↓
            </a>
            <a href="mailto:software@qobots.com" className="px-7 py-3.5 text-[14px] text-[#86868b] hover:text-[#1d1d1f] border border-black/[0.12] hover:border-black/[0.25] rounded-full transition-colors text-center">
              Request software →
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}

// ─── ROBOT DATA ───────────────────────────────────────────────────────────────

type Robot = {
  id: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  features: string[];
  images: string[];
  status: "production" | "lab" | "coming";
};

const robots: Robot[] = [
  {
    id: "agibot-a2",
    name: "AgiBot A2 Series",
    brand: "AgiBot",
    category: "Full-size Humanoid",
    categorySlug: "humanoids",
    tagline: "43 DOF. Full-size. Production-ready.",
    description: "Full-size humanoid built for demanding commercial environments. Combines advanced biomechanics with powerful AI modules. Available in Ultra and Lite configurations.",
    specs: [
      { label: "DOF", value: "42" },
      { label: "Type", value: "Full-size humanoid" },
      { label: "Versions", value: "Ultra / Lite" },
      { label: "AI", value: "AI Assistant" },
      { label: "Navigation", value: "Autonomous" },
      { label: "Interaction", value: "Voice + Touch" },
    ],
    features: ["Voice + Touch interaction", "Autonomous navigation", "42 DOF", "Ultra / Lite versions", "AI Assistant"],
    images: [
      "https://shop.deltarobots.com/cdn/shop/files/16_2e2ea8f2-9fb0-47c9-a696-ab86615adbc6.png?v=1770653836&width=900",
      "https://shop.deltarobots.com/cdn/shop/files/17_d20f8158-df13-4845-92e7-c46b7f093696.png?v=1770653866&width=900",
    ],
    status: "production",
  },
  {
    id: "agibot-x2",
    name: "AgiBot X2 Series",
    brand: "AgiBot",
    category: "Compact Humanoid",
    categorySlug: "humanoids",
    tagline: "25–30 DOF. Agile. Event-ready.",
    description: "Half-sized humanoid with 25–30 DOF. Natural movement, voice interaction and autonomous navigation — ready to work from day one. Our most deployed platform.",
    specs: [
      { label: "DOF", value: "25–30" },
      { label: "Type", value: "Compact humanoid" },
      { label: "Navigation", value: "Autonomous" },
      { label: "Interaction", value: "Voice + Face recognition" },
      { label: "Display", value: "LED Face" },
      { label: "Gestures", value: "Gesture control" },
    ],
    features: ["Voice interaction", "Autonomous navigation", "Face recognition", "Gesture control", "LED Face"],
    images: [
      "https://shop.deltarobots.com/cdn/shop/files/21.png?v=1770654011&width=900",
      "https://shop.deltarobots.com/cdn/shop/files/22.png?v=1770654030&width=900",
    ],
    status: "production",
  },
  {
    id: "agibot-g2",
    name: "AgiBot G2",
    brand: "AgiBot",
    category: "Industrial Manipulator",
    categorySlug: "industrial",
    tagline: "WorkGPT AI. 350 N·m. Factory-grade.",
    description: "Advanced industrial robot with precision force manipulation and WorkGPT AI. Designed for factory environments and complex manual tasks requiring high torque and repeatability.",
    specs: [
      { label: "DOF", value: "7+7 arms" },
      { label: "Torque", value: "350 N·m" },
      { label: "AI", value: "WorkGPT" },
      { label: "Type", value: "Industrial manipulator" },
      { label: "Navigation", value: "Autonomous" },
      { label: "Grippers", value: "Precision end-effectors" },
    ],
    features: ["WorkGPT AI", "350 N·m force manipulation", "Precision grippers", "Autonomous navigation"],
    images: [
      "https://shop.deltarobots.com/cdn/shop/files/18.png?v=1770654116&width=900",
      "https://shop.deltarobots.com/cdn/shop/files/19.png?v=1770654121&width=900",
    ],
    status: "lab",
  },
  {
    id: "delta-dog-l3",
    name: "Delta Dog L3",
    brand: "Delta Robots",
    category: "Quadruped",
    categorySlug: "quadrupeds",
    tagline: "Any terrain. Stairs. 3.5 m/s.",
    description: "Athletic quadruped robot with autonomous navigation. Handles any terrain, climbs stairs — ideal for inspections, events, and environments where wheeled robots fail.",
    specs: [
      { label: "DOF", value: "12" },
      { label: "Speed", value: "3.5 m/s" },
      { label: "Payload", value: "10 kg" },
      { label: "Navigation", value: "SLAM + LiDAR" },
      { label: "Terrain", value: "Off-road + stairs" },
      { label: "Type", value: "Quadruped" },
    ],
    features: ["3.5 m/s max speed", "Off-road capable", "SLAM + LiDAR", "10 kg payload", "Stair climbing"],
    images: [
      "https://shop.deltarobots.com/cdn/shop/files/robotyshopify_13.png?v=1761819504&width=900",
      "https://shop.deltarobots.com/cdn/shop/files/robotyshopify_14.png?v=1761819504&width=900",
    ],
    status: "production",
  },
  {
    id: "greetingbot-nova",
    name: "GreetingBot Nova",
    brand: "Delta Robots",
    category: "Reception Robot",
    categorySlug: "reception",
    tagline: "20+ languages. Hotels. Offices.",
    description: "Compact reception robot with natural dialogue and autonomous navigation. Perfect for hotels, offices and shopping centres. 8h+ battery, LED face, multilingual.",
    specs: [
      { label: "Languages", value: "20+" },
      { label: "Battery", value: "8h+" },
      { label: "Navigation", value: "Autonomous" },
      { label: "Display", value: "LED Face" },
      { label: "Interaction", value: "Voice + Touch" },
      { label: "Type", value: "Service / Reception" },
    ],
    features: ["Voice + Touch dialogue", "Autonomous navigation", "LED Face", "20+ languages", "8h+ battery"],
    images: [
      "https://shop.deltarobots.com/cdn/shop/files/robotyshopify_17.png?v=1761909351&width=900",
      "https://shop.deltarobots.com/cdn/shop/files/robotyshopify_16.png?v=1761909354&width=900",
    ],
    status: "production",
  },
];

// ─── INQUIRY MODAL ────────────────────────────────────────────────────────────

type InquiryType = "software" | "robot";

function InquiryModal({ robot, type, onClose }: { robot: Robot; type: InquiryType; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSent(true);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-[480px] w-full p-8">
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#86868b] hover:bg-[#e8e8ed] transition-colors text-[14px]">✕</button>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-[22px] font-bold text-[#1d1d1f] mb-2">Request sent.</h3>
            <p className="text-[15px] text-[#6e6e73]">We&apos;ll get back to you within 24 hours.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] block mb-1">
                {type === "software" ? "Software inquiry" : "Robot inquiry"}
              </span>
              <h3 className="text-[22px] font-bold text-[#1d1d1f]">{robot.name}</h3>
              <p className="text-[14px] text-[#6e6e73] mt-1">
                {type === "software"
                  ? "Request robotManager / Operations Platform integration for this platform."
                  : "Inquire about renting or purchasing this robot."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#f5f5f7] text-[14px] text-[#1d1d1f] placeholder-[#86868b] outline-none focus:border-black/[0.3] transition-colors"
              />
              <textarea
                placeholder={type === "software"
                  ? "Describe your fleet size, use case, deployment environment…"
                  : "Describe your use case, event details, duration…"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#f5f5f7] text-[14px] text-[#1d1d1f] placeholder-[#86868b] outline-none focus:border-black/[0.3] transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#1d1d1f] hover:bg-[#333] text-white text-[14px] font-medium transition-colors"
              >
                {type === "software" ? "Request software →" : "Inquire about robot →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── ROBOT CARD ───────────────────────────────────────────────────────────────

const statusLabel: Record<Robot["status"], { label: string; style: string }> = {
  production: { label: "In production", style: "text-[#1d1d1f] border-black/[0.15] bg-[#f0f0f0]" },
  lab:        { label: "In lab",        style: "text-[#b45309] border-amber-200 bg-amber-50" },
  coming:     { label: "Coming soon",   style: "text-[#86868b] border-black/[0.08] bg-[#f5f5f7]" },
};

function RobotCard({ robot }: { robot: Robot }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [inquiry, setInquiry] = useState<InquiryType | null>(null);
  const st = statusLabel[robot.status];

  return (
    <>
      {inquiry && (
        <InquiryModal robot={robot} type={inquiry} onClose={() => setInquiry(null)} />
      )}

      <div id={robot.categorySlug} className="bg-white rounded-3xl border border-black/[0.08] overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-black/[0.06]">
          {/* Image */}
          <div className="relative bg-white aspect-square lg:aspect-auto lg:min-h-[480px] cursor-pointer group overflow-hidden"
               onClick={() => setImgIdx((imgIdx + 1) % robot.images.length)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={robot.images[imgIdx]}
              alt={robot.name}
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-200 group-hover:opacity-90 p-6"
            />
            {robot.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {robot.images.map((_, i) => (
                  <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIdx ? "bg-[#1d1d1f]" : "bg-[#c7c7cc]"}`} />
                ))}
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border ${st.style}`}>
                {st.label}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-8 lg:p-10 flex flex-col justify-between bg-[#f9f9f9]">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] block mb-1">{robot.brand} · {robot.category}</span>
              <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.03em] text-[#1d1d1f] leading-tight">{robot.name}</h2>
              <p className="text-[15px] font-medium text-[#86868b] mt-1 mb-4">{robot.tagline}</p>
              <p className="text-[15px] text-[#6e6e73] leading-relaxed">{robot.description}</p>

              {/* Specs grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {robot.specs.map((spec) => (
                  <div key={spec.label} className="p-3 rounded-xl bg-[#f5f5f7]">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#86868b] block mb-0.5">{spec.label}</span>
                    <span className="text-[13px] font-semibold text-[#1d1d1f]">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mt-5 flex flex-wrap gap-2">
                {robot.features.map((f) => (
                  <span key={f} className="text-[12px] text-[#1d1d1f] px-3 py-1 rounded-full border border-black/[0.08] bg-white">{f}</span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setInquiry("software")}
                className="flex-1 py-3.5 rounded-xl bg-[#1d1d1f] hover:bg-[#333] text-white text-[14px] font-medium transition-colors text-center"
              >
                Request software →
              </button>
              <button
                onClick={() => setInquiry("robot")}
                className="flex-1 py-3.5 rounded-xl border border-black/[0.12] hover:border-black/[0.3] text-[#1d1d1f] text-[14px] font-medium transition-colors text-center"
              >
                Rent / Inquire ↗
              </button>
            </div>

            <p className="mt-3 text-[11px] text-[#86868b] text-center">
              Powered by <span className="font-medium text-[#1d1d1f]">robotManager</span> + <span className="font-medium text-[#1d1d1f]">Operations Platform</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── FLEET LIST ───────────────────────────────────────────────────────────────

function FleetSection() {
  const [filter, setFilter] = useState("all");

  const filters = [
    { id: "all", label: "All platforms" },
    { id: "humanoids", label: "Humanoids" },
    { id: "industrial", label: "Industrial" },
    { id: "quadrupeds", label: "Quadrupeds" },
    { id: "reception", label: "Reception" },
  ];

  const filtered = filter === "all" ? robots : robots.filter((r) => r.categorySlug === filter);

  return (
    <section id="fleet" className="bg-white py-16 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 border ${
                filter === f.id
                  ? "bg-[#1d1d1f] text-white border-[#1d1d1f]"
                  : "bg-[#f5f5f7] text-[#6e6e73] border-black/[0.06] hover:border-black/[0.2] hover:text-[#1d1d1f]"
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-[13px] text-[#86868b]">{filtered.length} platform{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        <div className="flex flex-col gap-6">
          {filtered.map((robot) => (
            <RobotCard key={robot.id} robot={robot} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SOFTWARE CTA ─────────────────────────────────────────────────────────────

function SoftwareCTASection() {
  return (
    <section id="software" className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Software</span>
            <h2 className="text-[44px] sm:text-[64px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f]">
              Same stack.<br />Any platform.
            </h2>
            <p className="text-[17px] text-[#6e6e73] mt-6 max-w-[440px] leading-relaxed font-light">
              robotManager and Operations Platform run on all five platforms above. We can integrate your robot in weeks, not months.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href="mailto:software@qobots.com" className="px-7 py-3.5 text-[14px] font-medium text-white bg-[#1d1d1f] hover:bg-[#333] rounded-full transition-colors text-center">
                Talk to our engineers →
              </a>
              <Link href="/intelligence-mock" className="px-7 py-3.5 text-[14px] text-[#86868b] hover:text-[#1d1d1f] border border-black/[0.12] hover:border-black/[0.25] rounded-full transition-colors text-center">
                See Intelligence platform ↗
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "robotManager", desc: "Per-robot AI system — perception, behavior, skills, telemetry, safety" },
              { title: "Operations Platform", desc: "Fleet control plane — OTA, orchestration, audit logs, RBAC" },
              { title: "Skill Marketplace", desc: "Deploy behaviors across the fleet — versioned, staged rollout" },
              { title: "AI Act Compliance", desc: "Immutable audit logs, explainability, high-risk AI classification" },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-2xl border border-black/[0.08] bg-[#f5f5f7]">
                <span className="text-[13px] font-semibold text-[#1d1d1f] block mb-1">{item.title}</span>
                <p className="text-[12px] text-[#6e6e73] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function MockFooter() {
  return (
    <footer className="bg-[#f5f5f7] border-t border-black/[0.06] py-10 px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full border-2 border-[#1d1d1f] flex items-center justify-center">
            <span className="text-[9px] font-black text-[#1d1d1f]">Q</span>
          </div>
          <span className="text-[13px] font-semibold text-[#1d1d1f]">Qobots</span>
        </div>
        <span className="text-[12px] text-[#86868b]">© 2025 Qobots. Fleet mock page.</span>
        <div className="flex items-center gap-6">
          <Link href="/mock" className="text-[12px] text-[#86868b] hover:text-[#1d1d1f] transition-colors">← Home</Link>
          <Link href="/operations-mock" className="text-[12px] text-[#86868b] hover:text-[#1d1d1f] transition-colors">Operations</Link>
          <Link href="/intelligence-mock" className="text-[12px] text-[#86868b] hover:text-[#1d1d1f] transition-colors">Intelligence</Link>
          <Link href="/lab-mock" className="text-[12px] text-[#86868b] hover:text-[#1d1d1f] transition-colors">Lab</Link>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function FleetMockPage() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-white min-h-screen">
      <MockNav />
      <HeroSection />
      <FleetSection />
      <SoftwareCTASection />
      <MockFooter />
    </div>
  );
}
