"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Brain, Factory, Rocket, Cpu, Eye, Navigation2, MessageSquare, GitBranch, Zap, FlaskConical, Building2, Newspaper, ChevronRight } from "lucide-react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
// Apple/Tesla light theme
// bg:       #ffffff  /  #f5f5f7
// text-1:   #1d1d1f
// text-2:   #6e6e73
// text-3:   #86868b
// border:   rgba(0,0,0,0.08)
// accent:   #1d1d1f (strong)  |  #6e6e73 (muted)
// shadow:   0 2px 12px rgba(0,0,0,0.06)

// ─── NAV ─────────────────────────────────────────────────────────────────────

function MockNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06]">
      <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full border-2 border-[#1d1d1f] flex items-center justify-center">
            <span className="text-[10px] font-black text-[#1d1d1f]">Q</span>
          </div>
          <span className="text-[13px] font-semibold tracking-tight text-[#1d1d1f]">Qobots</span>
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
            <a key="Team" href="#team" className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-150">
              Team
            </a>
        </nav>

        <a
          href="#contact"
          className="hidden md:flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#1d1d1f] text-white text-[13px] font-medium hover:bg-[#333] transition-colors duration-150"
        >
          Work with us
        </a>
      </div>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-[580px] sm:min-h-[700px] lg:h-[920px] flex items-center overflow-hidden bg-white">
      {/* Photo — right 58%, full height */}
      <div className="absolute top-0 right-0 w-[58%] bottom-0 hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/heroes/hero-home-light.jpg"
          alt="Engineer programming a humanoid robot"
          className="absolute inset-0 w-full h-full object-cover object-[50%_30%]"
        />
        {/* Fade left — grey-to-white blend */}
        <div className="absolute inset-y-0 left-0 w-80 bg-gradient-to-r from-white via-white/80 to-transparent" />
        {/* Fade top (under nav) */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/60 to-transparent" />
        {/* Fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent" />
        {/* Very light overlay to stay bright */}
        <div className="absolute inset-0 bg-white/10" />
      </div>

      {/* Content — left side, same structure as dark site */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-12 lg:px-16 xl:px-24 pt-28 sm:pt-32 lg:pt-28 pb-16">
        <div className="max-w-[600px]">
          <h1 className="text-[36px] sm:text-[clamp(44px,5.5vw,72px)] font-extrabold tracking-[-0.04em] leading-[1.05] text-[#1d1d1f]">
            We build the<br />
            intelligence layer<br />
            for <span className="text-[#86868b]">humanoid</span> robots.
          </h1>

          <p className="text-[15px] sm:text-[17px] font-light text-[#86868b] mt-6 sm:mt-8 max-w-[480px] leading-[1.7] tracking-[-0.01em]">
            Full AI stack, deployed on AgiBot X2 Ultra. Powering enterprise automation and humanoid fleets across Europe.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8 sm:mt-10">
            <a href="#work" className="px-7 py-3.5 text-[14px] font-medium text-white bg-[#1d1d1f] hover:bg-[#333] rounded-full transition-colors text-center">
              See our work →
            </a>
            <a href="#contact" className="px-7 py-3.5 text-[14px] text-[#86868b] hover:text-[#1d1d1f] border border-black/[0.12] hover:border-black/[0.25] rounded-full transition-colors text-center">
              Work with us
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}

// ─── CASE STUDY ──────────────────────────────────────────────────────────────

const stackModules = [
  { icon: <Eye size={15} />, name: "Vision", desc: "RGB-D perception, object detection, 6-DOF pose estimation" },
  { icon: <Navigation2 size={15} />, name: "SLAM", desc: "Real-time 3D mapping, lidar + camera fusion" },
  { icon: <MessageSquare size={15} />, name: "NLU", desc: "Natural language task parsing, voice command execution" },
  { icon: <Brain size={15} />, name: "Planning", desc: "Hierarchical task planning, constraint satisfaction" },
  { icon: <GitBranch size={15} />, name: "Behavior Trees", desc: "Modular, reactive behavior orchestration" },
  { icon: <Zap size={15} />, name: "Motor Control", desc: "Low-latency joint control, compliance, collision avoidance" },
];

function CaseStudySection() {
  return (
    <section id="work" className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Case Study · AgiBot X2 Ultra</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f] max-w-[800px]">
          From silicon to behavior:<br />the brain we shipped.
        </h2>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Photo */}
          <div className="relative rounded-3xl overflow-hidden bg-white shadow-[0_4px_40px_rgba(0,0,0,0.10)] h-[340px] sm:h-[480px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/agibot-case-study-light.jpg"
              alt="AgiBot X2 Ultra"
              className="absolute inset-0 w-full h-full object-cover object-[50%_15%]"
            />
          </div>

          {/* Stack modules */}
          <div className="flex flex-col gap-3">
            {stackModules.map((mod) => (
              <div key={mod.name} className="flex items-center gap-5 p-5 rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] flex items-center justify-center shrink-0 text-[#1d1d1f]">
                  {mod.icon}
                </div>
                <div>
                  <span className="text-[16px] font-semibold text-[#1d1d1f] block">{mod.name}</span>
                  <span className="text-[14px] text-[#86868b] leading-relaxed">{mod.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PILLARS ─────────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: <Brain size={20} />,
    label: "Robot Intelligence",
    headline: "The full AI stack for humanoids.",
    body: "Perception, SLAM navigation, manipulation, NLU, behavior trees — custom-built for manufacturers and integrators.",
    tags: ["Vision & SLAM", "NLU", "Behavior Trees", "Motor Control"],
    cta: "See robotManager",
    href: "/intelligence",
    image: "/images/pillars/pillar-intelligence-light.jpg",
  },
  {
    icon: <Factory size={20} />,
    label: "Robot Operations",
    headline: "Run humanoids in production.",
    body: "The operating system for humanoid fleets. OTA behavior deployments, real-time telemetry, multi-robot orchestration.",
    tags: ["OTA Deployment", "Fleet Telemetry", "Orchestration", "Audit & Compliance"],
    cta: "Explore Operations",
    href: "/operations",
    image: "/images/pillars/pillar-operations-light.jpg",
  },
  {
    icon: <Rocket size={20} />,
    label: "Commercialization",
    headline: "You build the robot. We give it a brain and a market.",
    body: "Bringing a humanoid to market? We handle AI stack development and go-to-market deployment.",
    tags: ["AI Stack Dev", "Go-to-Market", "rentnow.me", "Fleet Deployment"],
    cta: "Explore partnership",
    href: "#contact",
    image: "/images/pillars/pillar-commercialization-light.jpg",
  },
];

function PillarsSection() {
  return (
    <section className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">What we do</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f] max-w-[700px]">
          Three ways we deploy intelligence.
        </h2>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map((p) => (
            <div key={p.label} className="group relative rounded-3xl overflow-hidden h-[560px] bg-[#f5f5f7] flex flex-col justify-between">
              {/* Full-bleed image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />

              {/* Top gradient for text */}
              <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white/95 via-white/70 to-transparent" />
              {/* Bottom gradient for CTA */}
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white/90 to-transparent" />

              {/* Text — top */}
              <div className="relative z-10 p-7 pt-8">
                <h3 className="text-[32px] font-bold tracking-[-0.03em] leading-[1.15] text-[#1d1d1f]">{p.headline}</h3>
              </div>

              {/* CTA — bottom */}
              <div className="relative z-10 p-7">
                <a href={p.href} className="inline-flex items-center gap-1 text-[15px] font-medium text-[#1d1d1f] hover:gap-2.5 transition-all duration-150">
                  {p.cta} <ChevronRight size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LAB ─────────────────────────────────────────────────────────────────────

function LabSection() {
  return (
    <section id="lab" className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Header — same style as Stack/Pillars */}
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Research Facility</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f] max-w-[640px]">
          The Lab.
        </h2>
        <p className="text-[19px] text-[#6e6e73] mt-5 max-w-[460px] leading-relaxed font-light">
          A dedicated research facility for sim-to-real transfer, skill acquisition, and foundation model fine-tuning.
        </p>

        {/* Wide image box */}
        <div className="group relative w-full rounded-3xl overflow-hidden mt-16 bg-[#f5f5f7]" style={{ aspectRatio: "21/9" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/lab-section-light.jpg"
            alt="The Lab — robotics AI research facility"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
          />
          {/* Bottom gradient for CTA */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/90 to-transparent" />

          {/* CTA — bottom-left */}
          <div className="absolute bottom-0 left-0 z-10 p-7">
            <a href="/lab" className="inline-flex items-center gap-1 text-[15px] font-medium text-[#1d1d1f] hover:gap-2.5 transition-all duration-150">
              Explore the Lab <ChevronRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── STACK ────────────────────────────────────────────────────────────────────

const stackLayers = [
  { layer: "Foundation Models", items: ["Claude Opus 4.7", "Frontier VLMs", "Custom VLAs", "Embodied LLMs"], desc: "Multimodal understanding, natural language grounding, scene reasoning" },
  { layer: "Robotics Frameworks", items: ["ROS 2 Humble", "MoveIt 2", "Nav2", "Isaac Sim"], desc: "Motion planning, navigation stack, physics simulation" },
  { layer: "Perception", items: ["YOLO v11", "SAM 2", "FoundationPose", "DepthAnything"], desc: "Object detection, segmentation, 6-DOF pose estimation" },
  { layer: "Training Infrastructure", items: ["PyTorch", "Lerobot", "RLPD", "Diffusion Policy"], desc: "Imitation learning, offline RL, diffusion-based policy" },
  { layer: "Deployment", items: ["ONNX Runtime", "TensorRT", "Edge GPU", "OTA Updates"], desc: "On-device inference for real-time robot control" },
];

function StackSection() {
  return (
    <section id="stack" className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Technology</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f] max-w-[640px]">
          The Stack.
        </h2>
        <p className="text-[19px] text-[#6e6e73] mt-5 max-w-[460px] leading-relaxed font-light">
          No off-the-shelf middleware. Every layer custom-built.
        </p>

        <div className="mt-16 flex flex-col gap-3">
          {stackLayers.map((layer) => (
            <div key={layer.layer} className="grid grid-cols-1 sm:grid-cols-[240px_1fr_auto] gap-4 sm:gap-8 p-6 rounded-2xl bg-[#f5f5f7] hover:bg-[#ebebeb] items-center transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <Cpu size={14} className="text-[#6e6e73]" />
                </div>
                <span className="text-[14px] font-semibold text-[#1d1d1f]">{layer.layer}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <span key={item} className="px-3.5 py-1.5 rounded-full bg-white shadow-sm text-[13px] text-[#1d1d1f] font-medium">{item}</span>
                ))}
              </div>
              <p className="text-[14px] text-[#86868b] leading-relaxed sm:text-right">{layer.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PARTNERS ─────────────────────────────────────────────────────────────────

function PartnersSection() {
  return (
    <section className="bg-[#f5f5f7] py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Partners & Deployments</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f] max-w-[640px]">
          Where our robots work.
        </h2>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* rentnow.me */}
          <div className="p-8 rounded-3xl bg-white border border-black/[0.07] shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] transition-shadow duration-400">
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] block mb-2">Commercialization Channel</span>
                <h3 className="text-[28px] font-bold tracking-[-0.03em] text-[#1d1d1f]">rentnow.me</h3>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#f5f5f7] flex items-center justify-center">
                <Rocket size={18} className="text-[#1d1d1f]" />
              </div>
            </div>
            <p className="text-[14px] text-[#6e6e73] leading-relaxed mb-6">
              Europe&apos;s humanoid robot rental marketplace. Qobots AI-powered robots deployed through rentnow.me reach enterprise customers across 6 countries — with full logistics, support, and skill-stack management handled end-to-end.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-black/[0.06]">
              {[{ v: "6", l: "Countries" }, { v: "48h", l: "Deployment" }, { v: "B2B", l: "Focus" }].map((item) => (
                <div key={item.l}>
                  <span className="text-[22px] font-bold text-[#1d1d1f] block tracking-tight">{item.v}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b]">{item.l}</span>
                </div>
              ))}
            </div>
            <a href="https://rentnow.me" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1d1d1f] mt-6 hover:gap-3 transition-all duration-150">
              Visit rentnow.me <ChevronRight size={13} />
            </a>
          </div>

          {/* AgiBot */}
          <div className="p-8 rounded-3xl bg-white border border-black/[0.07] shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] transition-shadow duration-400">
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] block mb-2">Hardware Partner</span>
                <h3 className="text-[28px] font-bold tracking-[-0.03em] text-[#1d1d1f]">AgiBot</h3>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#f5f5f7] flex items-center justify-center">
                <Brain size={18} className="text-[#1d1d1f]" />
              </div>
            </div>
            <p className="text-[14px] text-[#6e6e73] leading-relaxed mb-6">
              Primary hardware platform for our AI stack. We deployed the full intelligence layer on AgiBot X2 Ultra — 43-DOF humanoid designed for industrial and service environments.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-black/[0.06]">
              {[{ v: "X2 Ultra", l: "Platform" }, { v: "43 DOF", l: "Articulation" }, { v: "2025", l: "Deployed" }].map((item) => (
                <div key={item.l}>
                  <span className="text-[22px] font-bold text-[#1d1d1f] block tracking-tight">{item.v}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b]">{item.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TEAM ─────────────────────────────────────────────────────────────────────

function TeamSection() {
  return (
    <section id="team" className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Team</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f] max-w-[640px]">
          The people behind the stack.
        </h2>
        <p className="text-[19px] text-[#6e6e73] mt-5 font-light">
          No bloat. Every person ships.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Founder card */}
          <div className="p-7 rounded-3xl bg-[#f5f5f7] border border-black/[0.06]">
            <div className="w-14 h-14 rounded-2xl bg-[#1d1d1f] flex items-center justify-center mb-5">
              <span className="text-[14px] font-bold text-white">MM</span>
            </div>
            <h3 className="text-[16px] font-bold tracking-tight text-[#1d1d1f]">Michał Mincberg</h3>
            <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mt-1">CEO & Co-founder</span>
            <p className="text-[13px] text-[#6e6e73] leading-relaxed mt-3">Product strategy, commercialization, EU grants</p>
          </div>

          {/* Open roles */}
          {[
            { role: "Head of Robotics AI", focus: "Perception, motion planning, full-stack robot intelligence", level: "Senior / Lead" },
            { role: "ML Engineer", focus: "Training infrastructure, sim-to-real, behavior learning", level: "Mid / Senior" },
          ].map((job) => (
            <div key={job.role} className="p-7 rounded-3xl border border-dashed border-black/[0.12] bg-white hover:bg-[#f5f5f7] transition-colors duration-200">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] block mb-2">Open Role · {job.level}</span>
              <h3 className="text-[16px] font-bold tracking-tight text-[#1d1d1f] mb-2">{job.role}</h3>
              <p className="text-[13px] text-[#6e6e73] leading-relaxed mb-5">{job.focus}</p>
              <a href="#contact" className="inline-flex items-center gap-1 text-[13px] font-medium text-[#1d1d1f] hover:gap-2.5 transition-all">
                Apply <ChevronRight size={13} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

const contactPaths = [
  { icon: <Brain size={18} />, id: "robots", label: "I build robots", desc: "Manufacturer or integrator looking for an AI stack partner" },
  { icon: <Building2 size={18} />, id: "enterprise", label: "I want AI in my company", desc: "Enterprise automation, factory vision systems, AI agents" },
  { icon: <Newspaper size={18} />, id: "press", label: "Press / partnerships / grants", desc: "Media inquiries, research collaboration, EU program interest" },
];

function ContactSection() {
  const [selected, setSelected] = useState("robots");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form.name && form.email) setSent(true);
  }

  return (
    <section id="contact" className="bg-[#f5f5f7] py-24 sm:py-32 px-6">
      <div className="max-w-[860px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Contact</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f]">
          Work with us.
        </h2>
        <p className="text-[19px] text-[#6e6e73] mt-5 font-light">
          Tell us what you&apos;re building. We move fast.
        </p>

        <div className="mt-12">
          {/* Path selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {contactPaths.map((path) => (
              <button
                key={path.id}
                onClick={() => setSelected(path.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                  selected === path.id
                    ? "border-[#1d1d1f] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
                    : "border-black/[0.08] bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                }`}
              >
                <div className={`mb-2.5 ${selected === path.id ? "text-[#1d1d1f]" : "text-[#86868b]"}`}>{path.icon}</div>
                <span className={`text-[13px] font-semibold block mb-1 ${selected === path.id ? "text-[#1d1d1f]" : "text-[#6e6e73]"}`}>{path.label}</span>
                <span className="text-[12px] text-[#86868b] leading-tight">{path.desc}</span>
              </button>
            ))}
          </div>

          {sent ? (
            <div className="p-10 rounded-3xl bg-white border border-black/[0.07] text-center">
              <div className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto mb-4">
                <ArrowRight size={20} className="text-[#1d1d1f]" />
              </div>
              <h3 className="text-[20px] font-bold text-[#1d1d1f] mb-2">Message sent.</h3>
              <p className="text-[14px] text-[#6e6e73]">We&apos;ll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white border border-black/[0.07] shadow-[0_2px_16px_rgba(0,0,0,0.06)] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f5f5f7] border border-black/[0.06] text-[14px] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f5f5f7] border border-black/[0.06] text-[14px] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f]/20 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project or question..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#f5f5f7] border border-black/[0.06] text-[14px] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f]/20 resize-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#1d1d1f] text-white text-[14px] font-semibold hover:bg-[#333] transition-colors duration-150"
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
    <footer className="bg-[#1d1d1f] py-16 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
                <span className="text-[9px] font-black text-white">Q</span>
              </div>
              <span className="text-[13px] font-semibold text-white">Qobots Intelligence</span>
            </div>
            <p className="text-[12px] text-white/40 leading-relaxed max-w-[200px]">
              Powering enterprise automation and humanoid fleets across Europe.
            </p>
          </div>
          {[
            { label: "Product", links: [["Intelligence", "/intelligence"], ["Operations", "/operations"], ["The Lab", "/lab"]] },
            { label: "Company", links: [["Stack", "#stack"], ["Team", "#team"], ["Contact", "#contact"]] },
            { label: "Partners", links: [["rentnow.me", "https://rentnow.me"], ["AgiBot", "#"]] },
          ].map((col) => (
            <div key={col.label}>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-white/30 block mb-4">{col.label}</span>
              <div className="flex flex-col gap-2.5">
                {col.links.map(([label, href]) => (
                  <a key={label} href={href} className="text-[13px] text-white/60 hover:text-white transition-colors">{label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between gap-2">
          <span className="text-[12px] text-white/30">© 2025 Qobots Intelligence. All rights reserved.</span>
          <span className="text-[12px] text-white/30">Warsaw, Poland · EU</span>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <MockNav />
      <HeroSection />

      <PillarsSection />
      <LabSection />
      <StackSection />
      <PartnersSection />
      <TeamSection />
      <ContactSection />
      <MockFooter />
    </div>
  );
}
