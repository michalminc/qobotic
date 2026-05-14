"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

// ─── NAV ─────────────────────────────────────────────────────────────────────

function MockNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06]">
      <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full border-2 border-[#1d1d1f] flex items-center justify-center">
            <span className="text-[10px] font-black text-[#1d1d1f]">Q</span>
          </div>
          <span className="text-[13px] font-semibold tracking-tight text-[#1d1d1f]">Qobots</span>
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

// ─── MOCKUP COMPONENTS ────────────────────────────────────────────────────────

function FleetDashboardMockup() {
  const robots = [
    { id: "AB-X2-007", task: "Reception · Hotel Bristol", battery: "87%", status: "green" },
    { id: "AB-X2-012", task: "Inventory · Site B", battery: "42%", status: "green" },
    { id: "UT-G1-003", task: "Charging", battery: "12%", status: "blue" },
    { id: "AB-X2-019", task: "Greeting · Lobby", battery: "64%", status: "green" },
    { id: "UT-G1-008", task: "Transit → Kraków", battery: "91%", status: "yellow" },
  ];
  const statusDot: Record<string, string> = {
    green: "#4ade80", yellow: "#fbbf24", blue: "#60a5fa", gray: "#555",
  };
  const counters = [
    { label: "ACTIVE", val: 12, color: "#4ade80" },
    { label: "TRANSIT", val: 3, color: "#fbbf24" },
    { label: "CHARG.", val: 2, color: "#60a5fa" },
    { label: "MAINT.", val: 1, color: "#f97316" },
    { label: "OFFLINE", val: 1, color: "#555" },
  ];
  return (
    <div className="bg-[#0d0d0d] w-full h-full flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#1a1a1a] shrink-0 flex-wrap">
        <span className="font-mono text-[9px] text-[#aaa] border border-[#2a2a2a] bg-[#111] px-2 py-0.5 rounded shrink-0">rentnow.me ▾</span>
        <div className="flex items-center gap-1.5 flex-1 min-w-0 px-2 py-1 rounded-lg bg-[#111] border border-[#1a1a1a]">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span className="font-mono text-[8px] text-[#333]">Search robots…</span>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {counters.map((c) => (
            <div key={c.label} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
              <span className="font-mono text-[8px] text-[#555]">{c.val} {c.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 relative bg-[#0a0a0a] m-2 mr-1 rounded-lg overflow-hidden border border-[#1a1a1a]">
          <svg viewBox="0 0 160 140" className="absolute inset-0 w-full h-full opacity-60">
            {[20,40,60,80,100,120].map(y => <line key={y} x1="0" y1={y} x2="160" y2={y} stroke="#161616" strokeWidth="0.5" />)}
            {[20,40,60,80,100,120,140].map(x => <line key={x} x1={x} y1="0" x2={x} y2="140" stroke="#161616" strokeWidth="0.5" />)}
            <circle cx="45" cy="55" r="4" fill="#c4484f" opacity="0.9" />
            <circle cx="80" cy="90" r="4" fill="#4ade80" opacity="0.9" />
            <circle cx="120" cy="40" r="4" fill="#4ade80" opacity="0.9" />
            <circle cx="60" cy="110" r="4" fill="#fbbf24" opacity="0.9" />
            <circle cx="140" cy="80" r="4" fill="#4ade80" opacity="0.9" />
            <text x="48" y="50" fill="#666" fontSize="6" fontFamily="monospace">Warsaw HQ</text>
            <text x="84" y="86" fill="#666" fontSize="6" fontFamily="monospace">Kraków Site</text>
            <text x="95" y="36" fill="#666" fontSize="6" fontFamily="monospace">Wrocław Pop-up</text>
          </svg>
        </div>
        <div className="w-[160px] shrink-0 flex flex-col overflow-hidden divide-y divide-[#111] mr-1 my-1">
          {robots.map((r) => (
            <div key={r.id} className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-[#111] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: statusDot[r.status] }} />
              <div className="flex-1 min-w-0">
                <span className="font-mono text-[9px] text-white block">{r.id}</span>
                <span className="font-mono text-[7px] text-[#444] block truncate">{r.task}</span>
              </div>
              <span className="font-mono text-[8px] text-[#555] shrink-0">{r.battery}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 py-1.5 border-t border-[#1a1a1a] shrink-0">
        <span className="font-mono text-[8px] text-[#444]">Total fleet: 19 robots · Uptime today: 96.4% · Active deployments: 7</span>
      </div>
    </div>
  );
}

function OTAMockup() {
  const stages = [
    { label: "CANARY", pct: "5%", done: true, active: false, sub: "2 robots · 100% healthy" },
    { label: "EARLY", pct: "25%", done: true, active: false, sub: "5 robots · 100% healthy" },
    { label: "BROAD", pct: "50%", done: false, active: true, sub: "10 robots · deploying…" },
    { label: "FULL", pct: "100%", done: false, active: false, sub: "pending" },
  ];
  const logs = [
    "[12:04:11] AB-X2-012 · deploying v2.4",
    "[12:04:14] AB-X2-012 · install OK · restart",
    "[12:04:22] AB-X2-012 · v2.4 active · healthy",
    "[12:04:28] AB-X2-019 · deploying v2.4",
  ];
  return (
    <div className="bg-[#0d0d0d] w-full h-full flex flex-col">
      <div className="px-3 pt-3 pb-2 border-b border-[#1a1a1a] shrink-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-mono text-[10px] text-white font-semibold">Deploy: skill-grasp-v2.4 → fleet</span>
          <span className="font-mono text-[8px] text-[#c4484f] border border-[rgba(196,72,79,0.3)] px-1.5 py-0.5 rounded">LIVE</span>
        </div>
        <span className="font-mono text-[8px] text-[#444]">Build #1247 · signed by qobots-ci · 12 MB</span>
      </div>
      <div className="px-3 py-4 shrink-0">
        <div className="flex items-center gap-0">
          {stages.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1">
              <div className={`flex flex-col items-center flex-1 ${i < stages.length - 1 ? "relative" : ""}`}>
                <div className={`w-7 h-7 rounded-full border flex items-center justify-center mb-1 ${
                  s.done ? "bg-[rgba(74,222,128,0.1)] border-[#4ade80]" :
                  s.active ? "bg-[rgba(196,72,79,0.1)] border-[#c4484f]" :
                  "bg-[#111] border-[#2a2a2a]"
                }`}>
                  {s.done ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : s.active ? (
                    <span className="w-2 h-2 rounded-full bg-[#c4484f] animate-pulse" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#333]" />
                  )}
                </div>
                <span className={`font-mono text-[7px] uppercase tracking-wider ${s.active ? "text-[#c4484f]" : s.done ? "text-[#4ade80]" : "text-[#333]"}`}>{s.label}</span>
                <span className={`font-mono text-[7px] ${s.done || s.active ? "text-[#555]" : "text-[#333]"}`}>{s.pct}</span>
                <span className={`font-mono text-[6px] text-center leading-tight mt-0.5 w-[64px] ${s.done || s.active ? "text-[#444]" : "text-[#2a2a2a]"}`}>{s.sub}</span>
              </div>
              {i < stages.length - 1 && (
                <div className={`h-px w-4 shrink-0 -mt-8 ${i < 2 ? "bg-[#4ade80]" : "bg-[#222]"}`} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 mx-3 mb-2 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] p-2 overflow-hidden min-h-0">
        <span className="font-mono text-[7px] uppercase tracking-widest text-[#333] block mb-1.5">Live log</span>
        {logs.map((line, i) => (
          <div key={i} className={`font-mono text-[8px] leading-[1.6] ${i === logs.length - 1 ? "text-[#888]" : "text-[#444]"}`}>{line}</div>
        ))}
      </div>
      <div className="flex items-center gap-2 px-3 pb-3 shrink-0">
        <button className="font-mono text-[8px] px-2.5 py-1.5 rounded-lg border border-[rgba(196,72,79,0.5)] text-[#c4484f] bg-[rgba(196,72,79,0.06)]">Pause rollout</button>
        <button className="font-mono text-[8px] px-2.5 py-1.5 rounded-lg border border-[#2a2a2a] text-[#555]">Rollback to v2.3</button>
      </div>
    </div>
  );
}

type GanttTask = { x: number; w: number; label: string; red?: boolean; gray?: boolean; conflict?: boolean; outline?: boolean };

function OrchestrationMockup() {
  const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
  const rows: { id: string; tasks: GanttTask[] }[] = [
    { id: "AB-X2-007", tasks: [{ x: 0, w: 28, label: "Hotel reception", red: true }, { x: 65, w: 22, label: "Greeting", gray: true }] },
    { id: "AB-X2-012", tasks: [{ x: 15, w: 35, label: "Inventory sweep", gray: true }, { x: 55, w: 18, label: "CONFLICT", conflict: true }] },
    { id: "UT-G1-003", tasks: [{ x: 55, w: 18, label: "CONFLICT", conflict: true }, { x: 75, w: 20, label: "Demo session", gray: true }] },
    { id: "AB-X2-019", tasks: [{ x: 0, w: 22, label: "Reception", red: true }, { x: 40, w: 30, label: "Inventory", gray: true }] },
    { id: "UT-G1-008", tasks: [{ x: 10, w: 72, label: "Maintenance window", outline: true }] },
  ];
  return (
    <div className="bg-[#0d0d0d] w-full h-full flex flex-col">
      <div className="flex items-center gap-0 px-3 border-b border-[#1a1a1a] shrink-0">
        {["Calendar", "Timeline", "Map"].map((tab) => (
          <span key={tab} className={`font-mono text-[9px] px-3 py-2.5 border-b-2 -mb-px transition-colors ${tab === "Timeline" ? "border-[#c4484f] text-[#c4484f]" : "border-transparent text-[#444] hover:text-[#888]"}`}>
            {tab}
          </span>
        ))}
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 flex flex-col px-2 py-2 min-w-0 overflow-hidden">
          <div className="flex ml-[56px] mb-1">
            {hours.map((h) => (
              <span key={h} className="font-mono text-[7px] text-[#333] flex-1 text-center">{h}</span>
            ))}
          </div>
          {rows.map((row) => (
            <div key={row.id} className="flex items-center h-8 mb-1">
              <span className="font-mono text-[8px] text-[#555] w-[56px] shrink-0 text-right pr-2 truncate">{row.id}</span>
              <div className="flex-1 relative h-5 bg-[#0a0a0a] rounded border border-[#111] overflow-hidden">
                {row.tasks.map((task, ti) => (
                  <div
                    key={ti}
                    className={`absolute h-full rounded flex items-center px-1.5 overflow-hidden ${
                      task.conflict ? "border border-[#fbbf24]" :
                      task.red ? "bg-[rgba(196,72,79,0.25)] border border-[rgba(196,72,79,0.4)]" :
                      task.outline ? "border border-[#2a2a2a]" :
                      "bg-[#1a1a1a] border border-[#222]"
                    }`}
                    style={{ left: `${task.x}%`, width: `${task.w}%` }}
                  >
                    <span className={`font-mono text-[6px] truncate ${task.conflict ? "text-[#fbbf24]" : task.red ? "text-[#c4484f]" : "text-[#555]"}`}>{task.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="w-[90px] shrink-0 border-l border-[#1a1a1a] px-2 py-2 flex flex-col gap-2">
          <span className="font-mono text-[7px] uppercase tracking-widest text-[#fbbf24] block">Conflicts · 1</span>
          <div className="p-1.5 rounded bg-[rgba(251,191,36,0.05)] border border-[rgba(251,191,36,0.2)]">
            <span className="font-mono text-[7px] text-[#fbbf24] block leading-tight">Elevator B</span>
            <span className="font-mono text-[7px] text-[#444] block leading-tight mt-0.5">AB-X2-012 ↔ UT-G1-003</span>
            <span className="font-mono text-[7px] text-[#333] block">11:30</span>
            <button className="font-mono text-[7px] text-[#c4484f] mt-1.5 hover:underline">Resolve →</button>
          </div>
        </div>
      </div>
      <div className="px-3 py-1.5 border-t border-[#1a1a1a] shrink-0 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
        <span className="font-mono text-[8px] text-[#444]">Total today: 23 tasks · 7 active robots · 1 conflict</span>
      </div>
    </div>
  );
}

function AuditLogMockup() {
  const filters = ["All events", "AI decisions", "User actions", "System"];
  const actorColors: Record<string, string> = { AI: "#c4484f", USER: "#60a5fa", SYSTEM: "#555" };
  const rows = [
    { ts: "12:04:11.234", actor: "AI", subject: "AB-X2-007", event: "grasp object 'cup' · conf 0.94 · VLA-v2.1", critical: false },
    { ts: "12:04:19.001", actor: "USER", subject: "m.mincberg@…", event: "approved skill deploy 'grasp-v2.4'", critical: false },
    { ts: "12:05:03.771", actor: "AI", subject: "AB-X2-012", event: "path replan · obstacle detected", critical: false },
    { ts: "12:07:44.309", actor: "SYSTEM", subject: "scheduler", event: "rollback triggered · skill-vision-v1.2", critical: true },
    { ts: "12:08:11.002", actor: "USER", subject: "m.mincberg@…", event: "paused OTA rollout", critical: false },
    { ts: "12:09:55.881", actor: "AI", subject: "AB-X2-019", event: "refused cmd 'climb shelf' · safety constraint", critical: false },
  ];
  return (
    <div className="bg-[#0d0d0d] w-full h-full flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#1a1a1a] shrink-0 flex-wrap">
        <div className="flex items-center gap-1 flex-wrap">
          {filters.map((f, i) => (
            <span key={f} className={`font-mono text-[8px] px-2 py-0.5 rounded-full border ${i === 0 ? "border-[rgba(196,72,79,0.4)] text-[#c4484f] bg-[rgba(196,72,79,0.08)]" : "border-[#222] text-[#444]"}`}>{f}</span>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <span className="font-mono text-[8px] text-[#444] border border-[#222] px-2 py-0.5 rounded">Last 24h ▾</span>
          <span className="font-mono text-[8px] text-[#555] border border-[#222] px-2 py-0.5 rounded cursor-pointer hover:border-[#444]">Export ↓</span>
        </div>
      </div>
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="flex-1 overflow-hidden divide-y divide-[#0f0f0f]">
          {rows.map((row, i) => (
            <div key={i} className={`flex items-center gap-2 px-3 py-1.5 hover:bg-[#111] transition-colors relative ${row.critical ? "border-l-2 border-[#c4484f]" : "border-l-2 border-transparent"}`}>
              <span className="font-mono text-[8px] text-[#333] shrink-0 w-[72px]">{row.ts}</span>
              <span className="font-mono text-[7px] px-1.5 py-0.5 rounded shrink-0" style={{ color: actorColors[row.actor], backgroundColor: `${actorColors[row.actor]}18`, border: `1px solid ${actorColors[row.actor]}44` }}>{row.actor}</span>
              <span className="font-mono text-[8px] text-[#555] shrink-0 w-[80px] truncate">{row.subject}</span>
              <span className={`font-mono text-[8px] flex-1 truncate ${row.critical ? "text-[#c4484f]" : "text-[#666]"}`}>{row.event}</span>
            </div>
          ))}
        </div>
        <div className="w-[90px] shrink-0 border-l border-[#1a1a1a] px-2 py-2 flex flex-col gap-1.5">
          <span className="font-mono text-[7px] uppercase tracking-widest text-[#444] block">Compliance</span>
          {[
            { k: "AI Act Class", v: "High-risk" },
            { k: "Logs", v: "Immutable" },
            { k: "Retention", v: "7 years" },
          ].map((c) => (
            <div key={c.k}>
              <span className="font-mono text-[7px] text-[#333] block">{c.k}</span>
              <span className="font-mono text-[8px] text-[#777] block">{c.v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 py-1.5 border-t border-[#1a1a1a] shrink-0 flex items-center justify-between">
        <span className="font-mono text-[8px] text-[#444]">1–7 of 12,847 events</span>
        <span className="font-mono text-[7px] text-[#333]">SHA-256 chain · signed</span>
      </div>
    </div>
  );
}

// ─── INTERFACE SLIDER ─────────────────────────────────────────────────────────

const slides = [
  { tag: "Fleet Dashboard", caption: "Every robot, every location, every status — at a glance." },
  { tag: "OTA Deployment", caption: "Push new behaviors to the fleet — staged rollout, one-click rollback." },
  { tag: "Orchestration", caption: "Schedule tasks across the fleet. Resolve conflicts. Coordinate teams of robots." },
  { tag: "Audit Log", caption: "Every decision, every action, fully traceable. AI Act-ready by default." },
];

const slideComponents = [FleetDashboardMockup, OTAMockup, OrchestrationMockup, AuditLogMockup];

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
        <div className="relative max-w-[960px]">
          <div className="bg-[#1c1c1e] rounded-[20px] p-[10px] shadow-[0_40px_80px_rgba(0,0,0,0.25),inset_0_0_0_1px_rgba(255,255,255,0.06)]">
            <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#3a3a3a] z-10" />
            <div className="relative rounded-[12px] overflow-hidden" style={{ aspectRatio: "16/10" }}>
              {slideComponents.map((Comp, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ opacity: active === i ? 1 : 0, pointerEvents: active === i ? "auto" : "none" }}
                >
                  <Comp />
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
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full border-2 border-[#1d1d1f] flex items-center justify-center">
              <span className="text-[9px] font-black text-[#1d1d1f]">Q</span>
            </div>
            <span className="text-[13px] font-semibold text-[#1d1d1f]">Qobots</span>
          </div>
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
