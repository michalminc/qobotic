"use client";

import { use } from "react";
import Link from "next/link";
import { skills } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { ArrowLeft } from "lucide-react";

export default function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const skill = skills.find((s) => s.id === id);

  if (!skill) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-[#888]">Skill not found.</p>
        </div>
      </>
    );
  }

  const isFree = skill.price === 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8 py-10">
          {/* Back link */}
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-[13px] text-[#666] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Skills
          </Link>

          {/* Header */}
          <div className="flex items-start gap-5 mb-10">
            <div className="w-14 h-14 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] flex items-center justify-center shrink-0">
              <span className="font-mono text-[20px] font-bold text-[#888]">{skill.icon}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-[28px] font-bold tracking-[-0.03em] text-[#f0f0f8]">
                {skill.name}
              </h1>
              <p className="font-mono text-[12px] text-[#444] mt-1">
                by {skill.author} · v{skill.version} · {skill.authorType}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="font-mono text-[28px] font-bold text-[#c4484f]">
                {isFree ? "Free" : `€${skill.price}`}
              </span>
              {!isFree && <span className="font-mono text-[12px] text-[#444]">/mo</span>}
            </div>
          </div>

          {/* Install button */}
          <button className="w-full py-3 rounded-lg bg-[#151515] text-[14px] font-medium text-[#888] border border-[rgba(255,255,255,0.07)] hover:bg-[#7e1c26] hover:text-white hover:border-[#7e1c26] transition-all duration-200 mb-10">
            Install skill
          </button>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444] block">Rating</span>
              <span className="text-[18px] text-[#f0f0f8] block mt-1">
                {"★".repeat(Math.floor(skill.rating))}{"☆".repeat(5 - Math.floor(skill.rating))}
              </span>
              <span className="font-mono text-[11px] text-[#444]">{skill.rating}/5</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444] block">Installs</span>
              <span className="font-mono text-[22px] font-bold text-[#f0f0f8] block mt-1">
                {skill.installs >= 1000 ? `${(skill.installs / 1000).toFixed(1)}k` : skill.installs}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444] block">Category</span>
              <span className="text-[14px] font-medium text-[#f0f0f8] block mt-2">{skill.category}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444] mb-4">Description</h2>
            <p className="text-[15px] font-light text-[#888] leading-[1.8]">
              {skill.description}
            </p>
          </div>

          {/* What it does */}
          <div className="mb-10">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444] mb-4">What this skill does</h2>
            <div className="space-y-4">
              {getSkillFeatures(skill.category).map((feature, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-md bg-[#111] border border-[rgba(255,255,255,0.07)] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[11px] text-[#666]">{i + 1}</span>
                  </div>
                  <p className="text-[14px] text-[#888] leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibility */}
          <div className="mb-10">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444] mb-4">Compatibility</h2>
            <div className="flex flex-wrap gap-2">
              {skill.compatibility.map((c) => (
                <span key={c} className="px-4 py-2 rounded-xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] font-mono text-[12px] text-[#888]">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-10">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444] mb-4">Specifications</h2>
            <div className="space-y-0">
              {[
                ["Version", `v${skill.version}`],
                ["Author", skill.author],
                ["Author type", skill.authorType],
                ["Category", skill.category],
                ["Price", isFree ? "Free" : `€${skill.price}/mo`],
                ["Total installs", skill.installs.toString()],
                ["Rating", `${skill.rating}/5`],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.04)]">
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444]">{label}</span>
                  <span className="text-[13px] text-[#888]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function getSkillFeatures(category: string): string[] {
  const features: Record<string, string[]> = {
    Navigation: [
      "Autonomous path planning with real-time obstacle avoidance using LiDAR and depth cameras.",
      "Dynamic map building (SLAM) that updates as the environment changes.",
      "Multi-floor navigation with elevator interaction and door handling capabilities.",
      "Integration with fleet management systems for coordinated multi-robot operations.",
    ],
    Vision: [
      "Real-time object detection and classification using state-of-the-art neural networks.",
      "Depth estimation and 3D scene reconstruction from stereo or monocular cameras.",
      "Supports custom training on domain-specific datasets for specialized recognition tasks.",
      "Edge-optimized inference with sub-50ms latency on supported hardware.",
    ],
    Language: [
      "Natural language understanding with intent recognition and entity extraction.",
      "Multi-turn dialogue management with context retention across conversations.",
      "Sentiment analysis and emotional tone detection for appropriate responses.",
      "Supports custom vocabulary, domain terminology, and brand voice configuration.",
    ],
    Industrial: [
      "High-precision control with sub-millimeter accuracy for manufacturing tasks.",
      "Real-time quality inspection with defect detection and classification.",
      "Adaptive force control that adjusts grip and pressure based on material properties.",
      "Safety-certified operation modes compliant with ISO 10218 and ISO/TS 15066.",
    ],
    Custom: [
      "Fully customizable behavior scripts with visual programming interface.",
      "Pre-built templates for common use cases — events, hospitality, retail.",
      "A/B testing support for comparing different interaction patterns.",
      "Analytics dashboard with engagement metrics and interaction logs.",
    ],
  };
  return features[category] ?? features.Custom;
}
