"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Brain, Eye, GitBranch, Zap, Navigation2, MessageSquare } from "lucide-react";

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
            <a key="Team" href="/#team" className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-150">
              Team
            </a>
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/heroes/hero-intelligence-light.jpg"
          alt="Human hand and robot hand"
          className="absolute inset-0 w-full h-full object-cover object-center"
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

// ─── APP MOCKUPS (dark, same as original site) ───────────────────────────────

function TelemetryMockup() {
  const joints = [
    { name: "SHOULDER_L", pct: 72 }, { name: "SHOULDER_R", pct: 58 },
    { name: "ELBOW_L", pct: 41 }, { name: "ELBOW_R", pct: 83 },
    { name: "WAIST", pct: 29 }, { name: "HIP_L", pct: 65 },
    { name: "HIP_R", pct: 61 }, { name: "KNEE_L", pct: 48 },
    { name: "KNEE_R", pct: 52 },
  ];
  return (
    <div className="bg-[#0d0d0d] w-full h-full flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1a1a1a] shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
          <span className="font-mono text-[10px] text-[#aaa]">AGIBOT-X2-007</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-[#4ade80]">ONLINE</span>
          <span className="font-mono text-[9px] text-[#444] bg-[#111] px-1.5 py-0.5 rounded">IN PRODUCTION</span>
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 px-3 py-2 border-r border-[#1a1a1a] overflow-hidden">
          <span className="font-mono text-[8px] uppercase tracking-widest text-[#444] block mb-1.5">Joint Torque</span>
          <div className="space-y-1.5">
            {joints.map((j) => (
              <div key={j.name} className="flex items-center gap-2">
                <span className="font-mono text-[8px] text-[#444] w-[72px] shrink-0 truncate">{j.name}</span>
                <div className="flex-1 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#c4484f] rounded-full" style={{ width: `${j.pct}%` }} />
                </div>
                <span className="font-mono text-[8px] text-[#444] w-6 text-right shrink-0">{j.pct}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[130px] shrink-0 flex flex-col px-2.5 py-2 gap-2">
          <div className="space-y-1">
            {[
              { label: "BATTERY", val: "87%", color: "#4ade80" },
              { label: "CPU", val: "34%", color: "#c4484f" },
              { label: "TEMP", val: "42°C", color: "#fbbf24" },
            ].map((v) => (
              <div key={v.label} className="flex items-center justify-between">
                <span className="font-mono text-[8px] text-[#444]">{v.label}</span>
                <span className="font-mono text-[9px] font-bold" style={{ color: v.color }}>{v.val}</span>
              </div>
            ))}
          </div>
          <div className="border border-[#1a1a1a] rounded-lg p-1.5 bg-[#111]">
            <span className="font-mono text-[7px] text-[#444] block mb-1">Joint torque · last 60s</span>
            <svg viewBox="0 0 110 28" className="w-full h-[28px]">
              <polyline points="0,22 10,18 20,20 30,12 40,16 50,8 60,14 70,10 80,18 90,6 100,12 110,9" fill="none" stroke="#c4484f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="border border-[#1a1a1a] rounded-lg p-2 bg-[#111] flex-1">
            <span className="font-mono text-[7px] text-[#444] block mb-1">CURRENT TASK</span>
            <span className="font-mono text-[8px] text-[#aaa] block leading-tight mb-2">Restocking shelf 3</span>
            <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
              <div className="h-full bg-[#c4484f] rounded-full" style={{ width: "64%" }} />
            </div>
            <span className="font-mono text-[7px] text-[#c4484f] block mt-0.5">64%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PerceptionMockup() {
  const detections = [
    { label: "box", conf: "0.94", x: 28, y: 55, w: 72, h: 70 },
    { label: "cup", conf: "0.87", x: 130, y: 80, w: 44, h: 54 },
    { label: "person", conf: "0.99", x: 200, y: 20, w: 65, h: 130 },
  ];
  return (
    <div className="bg-[#0d0d0d] w-full h-full flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1a1a1a] shrink-0">
        <span className="font-mono text-[9px] text-[#555]">RGB-D · YOLO v11</span>
        <span className="font-mono text-[9px] text-[#4ade80]">30 FPS</span>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 relative bg-[#111] m-2 mr-1 rounded-lg overflow-hidden">
          <svg viewBox="0 0 280 180" className="absolute inset-0 w-full h-full opacity-30">
            <rect x="35" y="60" width="65" height="60" rx="3" fill="#333" />
            <rect x="135" y="85" width="38" height="44" rx="6" fill="#2a2a2a" />
            <rect x="200" y="25" width="56" height="108" rx="5" fill="#2a2a2a" />
          </svg>
          <svg viewBox="0 0 280 180" className="absolute inset-0 w-full h-full">
            {detections.map((d) => (
              <g key={d.label}>
                <rect x={d.x} y={d.y} width={d.w} height={d.h} fill="none" stroke="#c4484f" strokeWidth="1.2" strokeDasharray="3,2" />
                <rect x={d.x} y={d.y - 11} width={d.label.length * 5.5 + 22} height="11" fill="#c4484f" rx="2" />
                <text x={d.x + 3} y={d.y - 2} fill="white" fontSize="7" fontFamily="monospace">{d.label} · {d.conf}</text>
              </g>
            ))}
          </svg>
        </div>
        <div className="w-[48px] shrink-0 flex flex-col gap-1 mr-2 my-2">
          <span className="font-mono text-[7px] text-[#444] text-center">DEPTH</span>
          <div className="flex-1 rounded-lg overflow-hidden" style={{ background: "linear-gradient(180deg,#eee 0%,#999 30%,#555 60%,#222 100%)", opacity: 0.5 }} />
        </div>
      </div>
      <div className="px-3 py-2 border-t border-[#1a1a1a] shrink-0">
        <span className="font-mono text-[8px] text-[#444] mr-2">DETECTIONS</span>
        {["box 0.94", "cup 0.87", "person 0.99", "chair 0.76"].map((d, i) => (
          <span key={d} className="font-mono text-[8px] text-[#666] mr-2">{d}{i < 3 ? " ·" : ""}</span>
        ))}
      </div>
    </div>
  );
}

function BehaviorTreeMockup() {
  return (
    <div className="bg-[#0d0d0d] w-full h-full flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#1a1a1a] shrink-0">
        {["Save", "Run"].map((btn) => (
          <button key={btn} className="font-mono text-[9px] px-2.5 py-1 rounded-md border border-[#2a2a2a] text-[#888] bg-[#111]">{btn}</button>
        ))}
        <button className="font-mono text-[9px] px-2.5 py-1 rounded-md border border-[#c4484f] text-[#c4484f] bg-[rgba(196,72,79,0.08)]">Deploy →</button>
        <div className="flex-1" />
        <span className="font-mono text-[8px] text-[#444]">v2.3.1</span>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 relative overflow-hidden">
          <svg viewBox="0 0 230 170" className="w-full h-full">
            <line x1="115" y1="32" x2="45" y2="72" stroke="#2a2a2a" strokeWidth="1" />
            <line x1="115" y1="32" x2="115" y2="72" stroke="#2a2a2a" strokeWidth="1" />
            <line x1="115" y1="32" x2="185" y2="72" stroke="#2a2a2a" strokeWidth="1" />
            <line x1="185" y1="92" x2="155" y2="132" stroke="#2a2a2a" strokeWidth="1" />
            <line x1="185" y1="92" x2="215" y2="132" stroke="#2a2a2a" strokeWidth="1" />
            <rect x="80" y="16" width="70" height="20" rx="4" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
            <text x="115" y="30" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace">Sequence</text>
            {[
              { x: 12, y: 72, w: 64, label: "Perceive", hi: false },
              { x: 80, y: 72, w: 70, label: "Plan", hi: false },
              { x: 152, y: 72, w: 66, label: "Execute", hi: true },
            ].map((n) => (
              <g key={n.label}>
                <rect x={n.x} y={n.y} width={n.w} height="20" rx="4" fill={n.hi ? "rgba(196,72,79,0.15)" : "#1a1a1a"} stroke={n.hi ? "#c4484f" : "#333"} strokeWidth="1" />
                <text x={n.x + n.w / 2} y={n.y + 14} textAnchor="middle" fill={n.hi ? "#c4484f" : "#888"} fontSize="8" fontFamily="monospace">{n.label}</text>
              </g>
            ))}
            <rect x="118" y="132" width="58" height="18" rx="3" fill="#111" stroke="#222" strokeWidth="1" />
            <text x="147" y="144" textAnchor="middle" fill="#555" fontSize="7" fontFamily="monospace">Move arm</text>
            <rect x="184" y="132" width="64" height="18" rx="3" fill="#111" stroke="#222" strokeWidth="1" />
            <text x="216" y="144" textAnchor="middle" fill="#555" fontSize="7" fontFamily="monospace">Grasp object</text>
          </svg>
        </div>
        <div className="w-[80px] shrink-0 border-l border-[#1a1a1a] px-2 py-2 flex flex-col gap-2">
          <span className="font-mono text-[7px] uppercase tracking-widest text-[#444] block">Inspector</span>
          {[{ k: "Type", v: "Action" }, { k: "Timeout", v: "5000ms" }, { k: "Retry", v: "3" }, { k: "Status", v: "running" }].map((f) => (
            <div key={f.k}>
              <span className="font-mono text-[7px] text-[#444] block">{f.k}</span>
              <span className="font-mono text-[8px] text-[#888] block">{f.v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 py-1.5 border-t border-[#1a1a1a] shrink-0 flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
        <span className="font-mono text-[8px] text-[#444]">Tree valid · 12 nodes · last deployed 2h ago</span>
      </div>
    </div>
  );
}

function SkillsConsoleMockup() {
  const skills = [
    { name: "Object Grasping Pro", provider: "by Qobots Lab", version: "v2.3", installed: true },
    { name: "Voice Command EN", provider: "by Qobots Lab", version: "v1.8", installed: true },
    { name: "SLAM Indoor v2.1", provider: "by Qobots Lab", version: "v2.1", installed: true },
    { name: "Face Recognition", provider: "by Dexio Labs", version: "v3.0", installed: false },
    { name: "Stair Climbing", provider: "by Community", version: "v0.9-beta", installed: false },
  ];
  return (
    <div className="bg-[#0d0d0d] w-full h-full flex flex-col">
      <div className="px-3 pt-3 pb-2 border-b border-[#1a1a1a] shrink-0">
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#222] bg-[#111] mb-2">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span className="font-mono text-[9px] text-[#333]">Search skills…</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {["All", "Navigation", "Manipulation", "Language", "Vision"].map((chip, i) => (
            <span key={chip} className={`font-mono text-[7px] px-2 py-0.5 rounded-full border ${i === 0 ? "border-[#c4484f] text-[#c4484f] bg-[rgba(196,72,79,0.1)]" : "border-[#222] text-[#444]"}`}>{chip}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-hidden divide-y divide-[#111]">
        {skills.map((s) => (
          <div key={s.name} className="flex items-center gap-2 px-3 py-2 hover:bg-[#111] transition-colors">
            <div className="flex-1 min-w-0">
              <span className="font-mono text-[9px] font-semibold text-white block truncate">{s.name}</span>
              <span className="font-mono text-[8px] text-[#444] block">{s.provider}</span>
            </div>
            <span className="font-mono text-[8px] text-[#555] bg-[#111] border border-[#222] px-1.5 py-0.5 rounded shrink-0">{s.version}</span>
            {s.installed
              ? <span className="font-mono text-[8px] text-[#4ade80] border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.06)] px-1.5 py-0.5 rounded shrink-0">INSTALLED</span>
              : <span className="font-mono text-[8px] text-[#c4484f] border border-[rgba(196,72,79,0.4)] px-1.5 py-0.5 rounded shrink-0 cursor-pointer hover:bg-[rgba(196,72,79,0.1)]">INSTALL</span>
            }
          </div>
        ))}
      </div>
      <div className="px-3 py-2 border-t border-[#1a1a1a] shrink-0 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
        <span className="font-mono text-[8px] text-[#444]">12 skills installed · 3 updates available</span>
      </div>
    </div>
  );
}

// ─── INTERFACE SLIDER ─────────────────────────────────────────────────────────

const slides = [
  { tag: "Live Telemetry", caption: "Real-time robot state — joints, sensors, battery, task progress." },
  { tag: "Perception", caption: "What the robot sees — RGB-D fused with object detection and 6-DOF pose estimation." },
  { tag: "Behavior Orchestration", caption: "Modular behavior trees — composable, reactive, version-controlled." },
  { tag: "Skills Console", caption: "Install, version, and deploy new behaviors to the robot." },
];

const slideComponents = [TelemetryMockup, PerceptionMockup, BehaviorTreeMockup, SkillsConsoleMockup];

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
        <div className="relative">
          {/* Monitor bezel */}
          <div className="bg-[#1c1c1e] rounded-[20px] p-[10px] shadow-[0_40px_80px_rgba(0,0,0,0.25),inset_0_0_0_1px_rgba(255,255,255,0.06)]">
            {/* Camera dot */}
            <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#3a3a3a] z-10" />
            {/* Screen — aspect 16:10 like Studio Display */}
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

function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form.name && form.email) setSent(true);
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-2">Name</label>
                  <input
                    type="text"
                    required
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
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="What platform? What tasks? What's the deployment context?"
                  className="w-full px-4 py-3 rounded-xl bg-[#f5f5f7] border border-black/[0.08] text-[14px] text-[#1d1d1f] placeholder-[#86868b] outline-none focus:border-black/[0.25] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 text-[14px] font-medium text-white bg-[#1d1d1f] hover:bg-[#333] rounded-full transition-colors"
              >
                Send message →
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
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[13px] text-[#86868b]">© 2025 Qobots Intelligence. All rights reserved.</span>
        <div className="flex items-center gap-6">
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
            <a key="Team" href="/#team" className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-150">
              Team
            </a>
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
