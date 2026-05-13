"use client";

import Image from "next/image";
import { useCurrency } from "@/lib/currency-context";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Robot = any;

const BRAND_ACCENT = { border: "rgba(126,28,38,0.25)", bar: "#c4484f", glow: "rgba(126,28,38,0.06)" };


function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-[3px] bg-[#222] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}44, ${color})`,
          }}
        />
      </div>
      <span className="font-mono text-[10px] text-[#777] w-7 text-right">{value}</span>
    </div>
  );
}

export function RobotCard({ robot, imageUrl }: { robot: Robot; imageUrl?: string }) {
  const tc = BRAND_ACCENT;
  const { format } = useCurrency();
  const imgSrc = imageUrl || (robot as any).images?.[0]?.url || null;
  const robotSlug = (robot as any).slug || robot.id;
  return (
    <a
      href={`/configurator?robot=${robotSlug}&mode=rent`}
      className="group rounded-2xl border hover:border-[rgba(255,255,255,0.22)] transition-all duration-150 overflow-hidden block cursor-pointer"
      style={{ borderColor: tc.border, background: `linear-gradient(to bottom, ${tc.glow}, #111)` }}
    >
      {/* Image area */}
      <div className="relative h-[280px] bg-[#0e0e0e] flex items-center justify-center overflow-hidden">
        {/* Robot image or fallback */}
        {imgSrc ? (
          <>
            <Image
              src={imgSrc}
              alt={robot.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111] to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#0e0e0e]/60 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#1a1a1a] blur-[60px] opacity-50" />
            <svg width="120" height="160" viewBox="0 0 120 160" fill="none" className="opacity-40">
              <rect x="35" y="10" width="50" height="35" rx="8" stroke="#444" strokeWidth="1.5" fill="none" />
              <circle cx="48" cy="28" r="3" fill="#555" opacity="0.8" />
              <circle cx="72" cy="28" r="3" fill="#555" opacity="0.8" />
              <rect x="52" y="45" width="16" height="10" rx="3" stroke="#333" strokeWidth="1" fill="none" />
              <rect x="25" y="55" width="70" height="50" rx="6" stroke="#333" strokeWidth="1.5" fill="none" />
              <rect x="5" y="58" width="18" height="40" rx="4" stroke="#2a2a2a" strokeWidth="1" fill="none" />
              <rect x="97" y="58" width="18" height="40" rx="4" stroke="#2a2a2a" strokeWidth="1" fill="none" />
              <rect x="32" y="108" width="22" height="42" rx="4" stroke="#2a2a2a" strokeWidth="1" fill="none" />
              <rect x="66" y="108" width="22" height="42" rx="4" stroke="#2a2a2a" strokeWidth="1" fill="none" />
            </svg>
          </>
        )}

        {/* Top badges */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[rgba(0,0,0,0.6)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] text-[#bbb]">
            {robot.skillsInstalled} skills
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider backdrop-blur-sm ${
              robot.available
                ? "bg-[rgba(0,40,0,0.5)] border border-[rgba(74,222,128,0.2)] text-[#4ade80]"
                : "bg-[rgba(126,28,38,0.3)] border border-[rgba(126,28,38,0.3)] text-[#c4484f]"
            }`}
          >
            <span
              className={`w-[5px] h-[5px] rounded-full ${
                robot.available ? "bg-[#4ade80]" : "bg-[#7e1c26]"
              }`}
            />
            {robot.available ? "Available" : "Booked"}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-[20px] font-bold tracking-[-0.03em] text-white">
            {robot.name}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-[12px] uppercase text-[#666] tracking-wider">
              {robot.sku}
            </span>
            <span className="text-[#333]">·</span>
            <span className="font-mono text-[12px] uppercase text-[#666] tracking-wider">
              {robot.brand}
            </span>
          </div>
        </div>

        {/* Spec tags */}
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] text-[#888]">
            {robot.dof} DOF
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] text-[#888]">
            {robot.torque} Nm
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider border"
            style={{ borderColor: tc.border, color: tc.bar, backgroundColor: `${tc.bar}15` }}
          >
            {robot.type}
          </span>
        </div>

        {/* Bars */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase text-[#666] tracking-wider w-14">Speed</span>
            <ProgressBar value={robot.speed} color={tc.bar} />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase text-[#666] tracking-wider w-14">Strength</span>
            <ProgressBar value={robot.strength} color={tc.bar} />
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="font-mono text-[18px] font-bold text-white">
              {format(robot.rentalPrice)}
            </span>
            <span className="font-mono text-[12px] text-[#666]">/day</span>
          </div>
          <span className="font-mono text-[13px] text-[#666]">
            Buy {format(robot.buyPrice)}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-1" onClick={(e) => e.preventDefault()}>
          <span
            role="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/configurator?robot=${robotSlug}&mode=buy`; }}
            className="flex-1 px-4 py-2.5 text-[13px] font-medium text-[#bbb] hover:text-white bg-[#1a1a1a] hover:bg-[#7e1c26] border border-[rgba(255,255,255,0.08)] hover:border-[#7e1c26] rounded-full text-center transition-all duration-200 cursor-pointer"
          >
            Buy
          </span>
          <span
            role="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/configurator?robot=${robotSlug}&mode=rent`; }}
            className="flex-1 px-4 py-2.5 text-[13px] text-[#bbb] hover:text-white bg-[#1a1a1a] hover:bg-[#7e1c26] border border-[rgba(255,255,255,0.08)] hover:border-[#7e1c26] rounded-full text-center transition-all duration-200 cursor-pointer"
          >
            Rent
          </span>
        </div>
      </div>
    </a>
  );
}
