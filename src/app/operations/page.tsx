"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

// ─── NAV ─────────────────────────────────────────────────────────────────────

function MockNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06]">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Qobotic" width={180} height={88} priority className="h-9 w-auto" />
          <span className="text-[11px] text-[#86868b] tracking-widest uppercase font-medium">Operations</span>
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
          Book a demo
        </a>
      </div>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-[580px] sm:min-h-[700px] lg:h-[880px] flex items-center overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-[55%] bottom-0 hidden lg:block">
        <Image
          src="/images/heroes/hero-operations-light.jpg"
          alt="Robot fleet operations"
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
          <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-6">Operations Platform · Fleet control plane</span>

          <h1 className="text-[36px] sm:text-[clamp(44px,5.5vw,72px)] font-extrabold tracking-[-0.04em] leading-[1.05] text-[#1d1d1f]">
            Run humanoids<br />
            in production.
          </h1>

          <p className="text-[15px] sm:text-[17px] font-light text-[#86868b] mt-6 sm:mt-8 max-w-[480px] leading-[1.7] tracking-[-0.01em]">
            The private control plane for humanoid fleets. OTA behavior deployments, real-time telemetry, multi-robot orchestration, and AI Act-compliant audit logs — all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8 sm:mt-10">
            <a href="#contact" className="px-7 py-3.5 text-[14px] font-medium text-white bg-[#1d1d1f] hover:bg-[#333] rounded-full transition-colors text-center">
              Book a demo →
            </a>
            <a href="https://rentnow.me" target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 text-[14px] text-[#86868b] hover:text-[#1d1d1f] border border-black/[0.12] hover:border-black/[0.25] rounded-full transition-colors text-center">
              See it on rentnow.me ↗
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}

// ─── MODULES ──────────────────────────────────────────────────────────────────

const modules = [
  {
    label: "OPERATIONS",
    sub: "Daily fleet management",
    bullets: ["Fleet Dashboard", "Robot Management", "OTA Updates", "Scheduling & Dispatch"],
  },
  {
    label: "INTELLIGENCE",
    sub: "Telemetry & insights",
    bullets: ["Real-time telemetry", "Alerts & incidents", "Performance reports", "Predictive maintenance"],
  },
  {
    label: "SKILLS",
    sub: "Behavior libraries",
    bullets: ["Skill marketplace per tenant", "Deployment to robot subsets", "Version management", "Custom skills upload"],
  },
  {
    label: "COMPLIANCE",
    sub: "Audit & access",
    bullets: ["Immutable audit logs", "AI Act reporting templates", "User & role management (RBAC)", "GDPR / data retention"],
  },
];

function ModulesSection() {
  return (
    <section id="platform" className="bg-[#f5f5f7] py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Platform</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f] max-w-[640px]">
          Four modules.
        </h2>
        <p className="text-[19px] text-[#6e6e73] mt-5 max-w-[460px] leading-relaxed font-light">
          One platform to deploy, orchestrate, and audit your entire humanoid fleet.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modules.map((mod) => (
            <div key={mod.label} className="p-8 rounded-2xl border border-black/[0.08] bg-white hover:shadow-md transition-all duration-300 h-full">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] block mb-1">{mod.label}</span>
              <span className="text-[14px] text-[#86868b] block mb-5">{mod.sub}</span>
              <ul className="space-y-2.5">
                {mod.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1d1d1f] mt-[7px] shrink-0" />
                    <span className="text-[15px] text-[#1d1d1f]">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INTERFACE SLIDER ─────────────────────────────────────────────────────────

const slides = [
  { tag: "Fleet Dashboard", image: "/images/app/fleet_dashboard.jpg", caption: "Every robot, every location, every status — at a glance." },
  { tag: "Orchestration",   image: "/images/app/fleet_orch.jpg",      caption: "Schedule tasks across the fleet. Resolve conflicts. Coordinate teams of robots." },
  { tag: "OTA Deployment",  image: "/images/app/fleet_ota.jpg",       caption: "Push new behaviors to the fleet — staged rollout, one-click rollback." },
  { tag: "Audit Log",       image: "/images/app/fleet_audit.jpg",     caption: "Every decision, every action, fully traceable. AI Act-ready by default." },
];

function InterfaceSlider() {
  const [active, setActive] = useState(0);

  return (
    <section id="interface" className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Interface</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f] max-w-[760px]">
          The control plane<br />for your fleet.
        </h2>
        <p className="text-[19px] text-[#6e6e73] mt-5 max-w-[500px] leading-relaxed font-light">
          One pane of glass across every robot, every deployment, every audit log.
        </p>

        {/* Tab bar */}
        <div className="flex items-center gap-2 mt-10 mb-8 flex-wrap">
          {slides.map((s, i) => (
            <button
              key={s.tag}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 border ${
                active === i
                  ? "bg-[#1d1d1f] text-white border-[#1d1d1f]"
                  : "bg-white text-[#6e6e73] border-black/[0.12] hover:border-black/[0.25] hover:text-[#1d1d1f]"
              }`}
            >
              {s.tag}
            </button>
          ))}
        </div>

        {/* Monitor */}
        <div className="relative max-w-[900px] mx-auto">
          <div className="bg-[#1c1c1e] rounded-[20px] p-[10px] shadow-[0_40px_80px_rgba(0,0,0,0.25),inset_0_0_0_1px_rgba(255,255,255,0.06)]">
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
          {/* Stand */}
          <div className="flex flex-col items-center mt-0">
            <div className="w-[56px] h-[36px] bg-[#2a2a2a]" style={{ clipPath: "polygon(22% 0%, 78% 0%, 88% 100%, 12% 100%)" }} />
            <div className="w-[220px] h-[8px] bg-[#2a2a2a] rounded-full" />
          </div>
        </div>

        {/* Caption */}
        <p className="text-[15px] text-[#86868b] mt-8 max-w-[500px] leading-relaxed">
          {slides[active].caption}
        </p>
      </div>
    </section>
  );
}

// ─── CONTEXTS ─────────────────────────────────────────────────────────────────

const contexts = [
  {
    label: "THE LAB",
    sub: "Internal R&D",
    desc: "Multi-platform robot training. Our own EU-funded research facility runs on Operations Platform.",
  },
  {
    label: "RENTNOW.ME",
    sub: "Commercial fleet",
    desc: "Europe's humanoid rental marketplace. Active production deployment across 6 countries.",
  },
  {
    label: "ENTERPRISE",
    sub: "On-prem deployments",
    desc: "Private fleets for regulated industries — manufacturing, logistics, hospitality.",
  },
];

function ContextsSection() {
  return (
    <section id="deployment" className="bg-[#f5f5f7] py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Deployment</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f] max-w-[640px]">
          Three contexts.
        </h2>
        <p className="text-[19px] text-[#6e6e73] mt-5 max-w-[460px] leading-relaxed font-light">
          From internal R&D to commercial deployments to enterprise on-prem.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {contexts.map((ctx) => (
            <div key={ctx.label} className="p-8 rounded-2xl border border-black/[0.08] bg-white hover:shadow-md transition-all duration-300 h-full">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] block mb-1">{ctx.label}</span>
              <span className="text-[14px] text-[#86868b] block mb-4">{ctx.sub}</span>
              <p className="text-[15px] text-[#1d1d1f] leading-relaxed">{ctx.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ON-PREM ──────────────────────────────────────────────────────────────────

function OnPremSection() {
  return (
    <section id="infrastructure" className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Infrastructure</span>
            <h2 className="text-[44px] sm:text-[64px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f]">
              On your<br />infrastructure.
            </h2>
            <p className="text-[17px] sm:text-[19px] text-[#6e6e73] mt-6 max-w-[440px] leading-relaxed font-light">
              We deploy the Operations Platform on your infrastructure — no cloud lock-in, no data leaving your premises. Purpose-built for regulated industries where data sovereignty matters.
            </p>
          </div>

          <div className="space-y-4 mt-2">
            {[
              { title: "Data sovereignty", desc: "All telemetry and audit logs stay on your servers" },
              { title: "Air-gapped capable", desc: "Operates without internet connectivity for high-security environments" },
              { title: "Enterprise SSO", desc: "SAML 2.0, Active Directory, and custom IdP support" },
              { title: "AI Act compliance", desc: "Immutable logs and reporting templates built-in by default" },
              { title: "Scalable from day one", desc: "Single robot to multi-site fleet without re-architecture" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-5 rounded-2xl border border-black/[0.08] bg-[#f5f5f7]">
                <CheckCircle size={16} className="text-[#1d1d1f] mt-0.5 shrink-0" />
                <div>
                  <span className="text-[15px] font-semibold text-[#1d1d1f] block mb-0.5">{item.title}</span>
                  <span className="text-[13px] text-[#6e6e73]">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── INTEGRATIONS ─────────────────────────────────────────────────────────────

const integrationTags = ["REST API", "Webhooks", "SSO/SAML", "Sim Bridge", "ERP Connectors", "PagerDuty", "Slack", "MS Teams"];

function IntegrationSection() {
  return (
    <section className="bg-[#f5f5f7] py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Integrations</span>
        <h2 className="text-[44px] sm:text-[64px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f] max-w-[640px]">
          Wires into<br />your stack.
        </h2>
        <p className="text-[19px] text-[#6e6e73] mt-5 max-w-[440px] leading-relaxed font-light">
          Open APIs and native connectors for the tools your team already uses.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {integrationTags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full border border-black/[0.08] bg-white text-[13px] text-[#1d1d1f] font-mono hover:border-black/[0.25] transition-all duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto text-center">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Contact</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f]">
          Ready to deploy?
        </h2>
        <p className="text-[19px] text-[#6e6e73] mt-5 max-w-[480px] mx-auto leading-relaxed font-light">
          Book a demo or talk to our team about your fleet requirements.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <a href="mailto:hello@qobots.com" className="px-8 py-4 text-[15px] font-medium text-white bg-[#1d1d1f] hover:bg-[#333] rounded-full transition-colors">
            Book a demo →
          </a>
          <a href="https://rentnow.me" target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-[15px] text-[#86868b] hover:text-[#1d1d1f] border border-black/[0.12] hover:border-black/[0.25] rounded-full transition-colors">
            See rentnow.me ↗
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function MockFooter() {
  return (
    <footer className="bg-[#f5f5f7] border-t border-black/[0.06] py-10 px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Image src="/logo.png" alt="Qobotic" width={180} height={88} className="h-8 w-auto" />
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[12px] text-[#86868b] hover:text-[#1d1d1f] transition-colors">Home</Link>
            <Link href="/intelligence" className="text-[12px] text-[#86868b] hover:text-[#1d1d1f] transition-colors">Intelligence</Link>
          </div>
        </div>
        <div className="pt-6 border-t border-black/[0.06] flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-end">
          <div className="text-[12px] text-[#86868b] leading-relaxed">
            <p className="text-[#1d1d1f] font-medium">RENTNOW GROUP sp. z o.o.</p>
            <p>ul. Złota 75A lok. 7, 00-819 Warszawa</p>
            <p className="text-[#86868b]">KRS 0001235271 · NIP 5273214205 · REGON 544497775</p>
          </div>
          <span className="text-[12px] text-[#86868b] shrink-0">© 2026 Qobots. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function OperationsPage() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-white min-h-screen">
      <MockNav />
      <HeroSection />
      <ModulesSection />
      <InterfaceSlider />
      <ContextsSection />
      <OnPremSection />
      <IntegrationSection />
      <ContactSection />
      <MockFooter />
    </div>
  );
}
