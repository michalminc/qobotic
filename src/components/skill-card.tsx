"use client";

import Link from "next/link";
import type { Skill } from "@/lib/data";
import { Lock } from "lucide-react";
import { useCurrency } from "@/lib/currency-context";

const CATEGORY_COLORS: Record<string, { border: string; icon: string; glow: string }> = {
  Navigation: { border: "rgba(59,130,246,0.2)", icon: "text-[#5b9bf5]", glow: "rgba(59,130,246,0.06)" },
  Vision:     { border: "rgba(168,85,247,0.2)", icon: "text-[#a855f7]", glow: "rgba(168,85,247,0.06)" },
  Language:   { border: "rgba(34,197,94,0.2)",  icon: "text-[#22c55e]", glow: "rgba(34,197,94,0.06)" },
  Industrial: { border: "rgba(245,158,11,0.2)", icon: "text-[#f59e0b]", glow: "rgba(245,158,11,0.06)" },
  Custom:     { border: "rgba(236,72,153,0.2)", icon: "text-[#ec4899]", glow: "rgba(236,72,153,0.06)" },
};

const DEFAULT_COLOR = { border: "rgba(255,255,255,0.07)", icon: "text-[#888]", glow: "transparent" };

export function SkillCard({ skill, featured }: { skill: Skill; featured?: boolean }) {
  const isFree = skill.price === 0;
  const cat = CATEGORY_COLORS[skill.category] ?? DEFAULT_COLOR;
  const { format } = useCurrency();

  return (
    <div
      className={`group relative rounded-2xl border hover:border-[rgba(255,255,255,0.18)] transition-all duration-200 overflow-hidden ${
        skill.premium ? "opacity-70" : ""
      } ${featured ? "hover:shadow-[0_4px_24px_rgba(126,28,38,0.12)]" : ""}`}
      style={{
        borderColor: cat.border,
        background: `linear-gradient(to bottom, ${cat.glow}, #0a0a0a)`,
      }}
    >
      {skill.premium && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111] border border-[rgba(255,255,255,0.07)]">
            <Lock size={12} className="text-[#888]" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#888]">Pro plan</span>
          </div>
        </div>
      )}

      <Link href={`/skills/${skill.id}`} className="block p-5 space-y-3">
        {/* Icon + Name + Price */}
        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0"
            style={{ borderColor: cat.border, backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <span className={`font-mono text-[14px] font-bold ${cat.icon}`}>{skill.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[15px] font-medium text-[#f0f0f8] truncate group-hover:text-white transition-colors">{skill.name}</h4>
            <p className="font-mono text-[10px] text-[#444] mt-0.5">
              by {skill.author} · v{skill.version}
            </p>
          </div>
          <span className="font-mono text-[16px] font-bold text-white shrink-0">
            {isFree ? "Free" : format(skill.price)}
            {!isFree && <span className="text-[10px] text-[#444] font-normal">/mo</span>}
          </span>
        </div>

        {/* Description */}
        <p className="text-[13px] font-light text-[#888] leading-relaxed line-clamp-2">
          {skill.description}
        </p>

        {/* Compatibility */}
        <div className="flex flex-wrap gap-1.5">
          {skill.compatibility.map((c) => (
            <span key={c} className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] text-[#555]">
              {c}
            </span>
          ))}
        </div>

        {/* Rating + Installs */}
        <div className="flex items-center gap-3">
          <span className="text-[12px] text-[#f0f0f8]">
            {"★".repeat(Math.floor(skill.rating))}
            {"☆".repeat(5 - Math.floor(skill.rating))}
          </span>
          <span className="font-mono text-[11px] text-[#444]">
            {skill.installs >= 1000 ? `${(skill.installs / 1000).toFixed(1)}k` : skill.installs} installs
          </span>
        </div>
      </Link>

      {/* Install button */}
      <div className="px-5 pb-5">
        <button
          disabled={skill.installed || skill.premium}
          className={`w-full py-2.5 text-[13px] rounded-xl border transition-all duration-200 ${
            skill.installed
              ? "border-[rgba(255,255,255,0.07)] text-[#666] bg-[rgba(255,255,255,0.02)] cursor-default"
              : "border-[rgba(255,255,255,0.07)] text-[#888] hover:text-white hover:bg-[#7e1c26] hover:border-[#7e1c26]"
          }`}
        >
          {skill.installed ? "Installed ✓" : "Install skill"}
        </button>
      </div>
    </div>
  );
}
