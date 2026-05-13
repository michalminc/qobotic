"use client";

import { useState } from "react";
import Link from "next/link";
import { FlaskConical, ArrowRight } from "lucide-react";

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
          <span className="text-[11px] text-[#86868b] tracking-widest uppercase font-medium">Lab</span>
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

        <a href="#collaborate" className="hidden md:flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#1d1d1f] text-white text-[13px] font-medium hover:bg-[#333] transition-colors duration-150">
          Collaborate
        </a>
      </div>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-[580px] sm:min-h-[700px] lg:h-[880px] flex items-center overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-[60%] bottom-0 hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/heroes/hero-lab-light.jpg"
          alt="Qobots Lab — robotics R&D facility"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-y-0 left-0 w-80 bg-gradient-to-r from-white via-white/85 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent" />
        <div className="absolute inset-0 bg-white/05" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-12 lg:px-16 xl:px-24 pt-28 sm:pt-32 pb-16">
        <div className="max-w-[580px]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/[0.1] bg-[#f5f5f7] text-[11px] text-[#86868b] mb-6 font-medium">
            <FlaskConical size={11} className="text-[#1d1d1f]" />
            RESEARCH · EU-FUNDED
          </div>

          <h1 className="text-[36px] sm:text-[clamp(44px,5.5vw,72px)] font-extrabold tracking-[-0.04em] leading-[1.05] text-[#1d1d1f]">
            Where European<br />
            embodied AI<br />
            gets built.
          </h1>

          <p className="text-[15px] sm:text-[17px] font-light text-[#86868b] mt-6 sm:mt-8 max-w-[480px] leading-[1.7] tracking-[-0.01em]">
            A dedicated robotic AI research facility. Sim-to-real transfer, skill acquisition from demonstration, foundation models for embodied agents, and safe AI behavior — all under one roof. Opening 2026/2027.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8 sm:mt-10">
            <a href="#collaborate" className="px-7 py-3.5 text-[14px] font-medium text-white bg-[#1d1d1f] hover:bg-[#333] rounded-full transition-colors text-center">
              Collaborate with the Lab →
            </a>
            <a href="#manifesto" className="px-7 py-3.5 text-[14px] text-[#86868b] hover:text-[#1d1d1f] border border-black/[0.12] hover:border-black/[0.25] rounded-full transition-colors text-center">
              Read the manifesto ↓
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────

function LabImage({ src, alt, caption, aspect }: {
  src: string;
  alt: string;
  caption: string;
  aspect: string;
}) {
  const [errored, setErrored] = useState(false);
  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-black/[0.06] group hover:scale-[1.005] transition-transform duration-500 bg-[#f5f5f7] ${aspect}`}
    >
      {!errored ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <span className="text-[11px] uppercase tracking-widest text-[#86868b] font-mono">Image pending</span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-2.5 left-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-white/80">{caption}</span>
      </div>
    </div>
  );
}

function GallerySection() {
  return (
    <section id="facility" className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">The Facility</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f] max-w-[760px]">
          A controlled environment<br />for embodied AI.
        </h2>
        <p className="text-[19px] text-[#6e6e73] mt-5 max-w-[520px] leading-relaxed font-light">
          Multi-platform humanoids, motion capture, simulation infrastructure, and GPU compute — all under one roof. Targeting operational 2026/2027.
        </p>

        <div className="mt-16 flex flex-col gap-3">
          {/* Row 1 — Hero 21:9 */}
          <LabImage
            src="/images/lab/01-facility-overview.jpg"
            alt="Qobots Lab — facility overview"
            caption="THE FACILITY · concept render"
            aspect="aspect-[21/9]"
          />

          {/* Row 2 — three 4:3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <LabImage
              src="/images/lab/02-motion-capture.jpg"
              alt="Humanoid robot with motion capture markers"
              caption="MOTION CAPTURE"
              aspect="aspect-[4/3]"
            />
            <LabImage
              src="/images/lab/03-sim-to-real.jpg"
              alt="Researcher monitoring physics simulation"
              caption="SIM-TO-REAL"
              aspect="aspect-[4/3]"
            />
            <LabImage
              src="/images/lab/04-gpu-cluster.jpg"
              alt="GPU server cluster"
              caption="COMPUTE INFRASTRUCTURE"
              aspect="aspect-[4/3]"
            />
          </div>

          {/* Row 3 — two 16:9 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <LabImage
              src="/images/lab/05-multi-platform-fleet.jpg"
              alt="Multiple humanoid robot platforms"
              caption="MULTI-PLATFORM FLEET"
              aspect="aspect-[16/9]"
            />
            <LabImage
              src="/images/lab/06-training-session.jpg"
              alt="Robot performing manipulation task"
              caption="TRAINING IN PROGRESS"
              aspect="aspect-[16/9]"
            />
          </div>
        </div>

        <p className="mt-6 text-[12px] text-[#86868b] leading-relaxed max-w-[640px]">
          Lab is currently in the design phase — images above are concept renders of the planned facility. Live photography will be added as the lab comes online.
        </p>
        <div className="mt-5 flex items-center gap-2 text-[14px]">
          <span className="text-[#86868b]">Want to visit? Or partner on the facility build?</span>
          <a href="#collaborate" className="text-[#1d1d1f] hover:text-[#6e6e73] transition-colors inline-flex items-center gap-1 font-medium">
            Reach the Lab <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── MANIFESTO ────────────────────────────────────────────────────────────────

function ManifestoSection() {
  return (
    <section id="manifesto" className="bg-[#f5f5f7] py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Manifesto</span>
        <h2 className="text-[44px] sm:text-[64px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f] max-w-[800px]">
          Europe needs a sovereign<br />embodied AI stack.
        </h2>

        <div className="mt-10 max-w-[720px] space-y-5 text-[17px] text-[#6e6e73] leading-relaxed">
          <p>
            The next decade will be defined by physical AI — robots that perceive, reason, and act in the real world. The infrastructure that powers them will determine who controls the factories, hospitals, and logistics networks of tomorrow.
          </p>
          <p>
            Right now, that infrastructure is being built almost entirely outside Europe. Proprietary stacks, closed models, hardware with undefined data pipelines. A continent that cannot build, deploy, and audit its own embodied AI systems is a continent that will import its industrial future.
          </p>
          <p>
            The Lab exists to change that. We are building an open, auditable, sovereign embodied AI stack — trained in Europe, deployed in Europe, compliant with European law by design. Not as an afterthought. As the foundation.
          </p>
          <p>
            This is not a research-for-research&apos;s-sake facility. Every technique we develop goes into production robots. Every safety mechanism we design goes into real deployments. The Lab is the R&D arm of a company that ships.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── RESEARCH PILLARS ─────────────────────────────────────────────────────────

const pillars = [
  {
    label: "SIM-TO-REAL TRANSFER",
    status: "ACTIVE",
    statusStyle: "text-[#1d1d1f] border-black/[0.15] bg-[#f0f0f0]",
    desc: "Physics simulation → physical robot, no manual tuning. Training pipelines and environment libraries for efficient behavior transfer.",
  },
  {
    label: "SKILL ACQUISITION FROM DEMONSTRATION",
    status: "ACTIVE",
    statusStyle: "text-[#1d1d1f] border-black/[0.15] bg-[#f0f0f0]",
    desc: "Few-shot learning of new robot behaviors from human demonstration. Minutes, not weeks of reinforcement learning.",
  },
  {
    label: "FOUNDATION MODELS FOR EMBODIED AI",
    status: "BUILDING",
    statusStyle: "text-[#b45309] border-amber-200 bg-amber-50",
    desc: "Adaptation of VLMs and LLMs into vision-language-action models for embodied agents. Custom VLA distillation.",
  },
  {
    label: "SAFE & AUDITABLE ROBOT BEHAVIOR",
    status: "PLANNED",
    statusStyle: "text-[#86868b] border-black/[0.08] bg-[#f5f5f7]",
    desc: "Formal safety constraints, explainability, AI Act-ready logs by default. Built into the architecture, not retrofit.",
  },
];

function PillarsSection() {
  return (
    <section id="research" className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Research</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f]">
          Four pillars.
        </h2>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((pillar) => (
            <div key={pillar.label} className="p-8 rounded-2xl border border-black/[0.08] bg-[#f5f5f7] hover:shadow-md transition-all duration-300 h-full">
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#1d1d1f] leading-snug">{pillar.label}</span>
                <span className={`font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border shrink-0 ${pillar.statusStyle}`}>{pillar.status}</span>
              </div>
              <p className="text-[15px] text-[#6e6e73] leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INFRASTRUCTURE ───────────────────────────────────────────────────────────

const infraItems = [
  { label: "GPU CLUSTER", desc: "Training + inference at scale" },
  { label: "MOTION CAPTURE", desc: "Vicon-class rig, full-body human + robot" },
  { label: "HUMANOID FLEET", desc: "AgiBot, Unitree, custom test platforms" },
  { label: "SIMULATION STACK", desc: "Isaac Sim, MuJoCo, custom environments" },
  { label: "EDGE INFERENCE LAB", desc: "Benchmarking real-time control loops" },
  { label: "OPERATIONS BRIDGE", desc: "Sim-to-real pipeline into Operations Platform" },
];

function InfrastructureSection() {
  return (
    <section id="infrastructure" className="bg-[#f5f5f7] py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Facility</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f]">
          One facility.<br />Multiple platforms.
        </h2>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {infraItems.map((item) => (
            <div key={item.label} className="p-8 rounded-2xl border border-black/[0.08] bg-white hover:shadow-md transition-all duration-300 h-full">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] block mb-2">{item.label}</span>
              <p className="text-[17px] font-medium text-[#1d1d1f]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FUNDING ──────────────────────────────────────────────────────────────────

function FundingSection() {
  return (
    <section className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Status</span>
        <h2 className="text-[44px] sm:text-[64px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f]">
          Where we are.
        </h2>

        <div className="mt-10 p-8 rounded-2xl border border-black/[0.08] bg-[#f5f5f7]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "FUNDING", value: "EU Grant Program", sub: "Application submitted" },
              { label: "PHASE", value: "Facility Design", sub: "Architecture & partners" },
              { label: "TARGET", value: "2026/2027", sub: "Operational date" },
              { label: "STATUS", value: "Seeking Partners", sub: "Academic & industrial" },
            ].map((item) => (
              <div key={item.label}>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] block mb-1">{item.label}</span>
                <span className="text-[20px] font-bold text-[#1d1d1f] block">{item.value}</span>
                <span className="text-[13px] text-[#86868b]">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COLLABORATE ──────────────────────────────────────────────────────────────

const collaborateCards = [
  {
    label: "ACADEMIC PARTNERS",
    sub: "Joint research",
    desc: "Co-author research, access the facility for experiments, contribute to open datasets. We publish. We share credit.",
  },
  {
    label: "INDUSTRY PARTNERS",
    sub: "Applied R&D",
    desc: "Commission specific research questions. Get early access to techniques before they go into production. Shape the roadmap.",
  },
  {
    label: "ROBOT MANUFACTURERS",
    sub: "Platform integration",
    desc: "We test our stack on your hardware. You get a validated AI stack. Together we accelerate time-to-market.",
  },
];

function CollaborateSection() {
  return (
    <section id="collaborate" className="bg-[#f5f5f7] py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Collaborate</span>
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f]">
          Three ways in.
        </h2>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {collaborateCards.map((card) => (
            <div key={card.label} className="p-8 rounded-2xl border border-black/[0.08] bg-white hover:shadow-md transition-all duration-300 h-full">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] block mb-1">{card.label}</span>
              <span className="text-[14px] text-[#86868b] block mb-4">{card.sub}</span>
              <p className="text-[15px] text-[#1d1d1f] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PUBLICATIONS ─────────────────────────────────────────────────────────────

function PublicationsSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(""); }
  }

  return (
    <section id="publications" className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#86868b] block mb-5">Publications</span>
        <h2 className="text-[44px] sm:text-[64px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f]">
          Coming soon.
        </h2>
        <p className="text-[19px] text-[#6e6e73] mt-5 max-w-[520px] leading-relaxed font-light">
          The Lab is in pre-operational phase. Research outputs, technical reports, and datasets will be published as the facility comes online. Subscribe to be notified.
        </p>

        <div className="mt-8 max-w-[400px]">
          {subscribed ? (
            <span className="text-[15px] text-[#1d1d1f] font-medium">You&apos;re on the list.</span>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-xl bg-[#f5f5f7] border border-black/[0.08] text-[14px] text-[#1d1d1f] placeholder-[#86868b] outline-none focus:border-black/[0.25] transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-[#1d1d1f] hover:bg-[#333] text-[14px] font-medium text-white transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────

function FinalCTASection() {
  return (
    <section className="bg-[#f5f5f7] py-24 sm:py-32 px-6">
      <div className="max-w-[1280px] mx-auto text-center">
        <h2 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1.0] text-[#1d1d1f]">
          Build embodied AI<br />with us.
        </h2>
        <p className="text-[19px] text-[#6e6e73] mt-5 max-w-[440px] mx-auto leading-relaxed font-light">
          Whether you&apos;re a researcher, manufacturer, or enterprise — reach the Lab.
        </p>
        <a
          href="mailto:lab@qobots.com"
          className="inline-flex items-center gap-2 mt-10 px-8 py-4 text-[15px] font-medium text-white bg-[#1d1d1f] hover:bg-[#333] rounded-full transition-colors"
        >
          Reach the Lab <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function MockFooter() {
  return (
    <footer className="bg-white border-t border-black/[0.06] py-10 px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full border-2 border-[#1d1d1f] flex items-center justify-center">
            <span className="text-[9px] font-black text-[#1d1d1f]">Q</span>
          </div>
          <span className="text-[13px] font-semibold text-[#1d1d1f]">Qobots</span>
        </div>
        <span className="text-[12px] text-[#86868b]">© 2025 Qobots Lab. Mock page.</span>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-[12px] text-[#86868b] hover:text-[#1d1d1f] transition-colors">← Home mock</Link>
          <Link href="/intelligence" className="text-[12px] text-[#86868b] hover:text-[#1d1d1f] transition-colors">Intelligence</Link>
          <Link href="/operations" className="text-[12px] text-[#86868b] hover:text-[#1d1d1f] transition-colors">Operations</Link>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function LabPage() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-white min-h-screen">
      <MockNav />
      <HeroSection />
      <GallerySection />
      <ManifestoSection />
      <PillarsSection />
      <InfrastructureSection />
      <FundingSection />
      <CollaborateSection />
      <PublicationsSection />
      <FinalCTASection />
      <MockFooter />
    </div>
  );
}
