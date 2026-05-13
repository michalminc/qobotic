"use client";

import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
// Skill type for installed skills
interface Skill {
  id: string;
  name: string;
  icon?: string;
  author: string;
  version: string;
  description?: string;
  category: string;
  compatibility: string[];
  price: number;
  rating: number;
  installs: number;
  premium?: boolean;
}
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Navbar } from "@/components/navbar";
import { DatePicker } from "@/components/date-picker";
import { useCurrency } from "@/lib/currency-context";
import { monthlyPrice, PLAN_LABELS, PLAN_DISCOUNTS, type SubscriptionPlan } from "@/lib/cart-context";

/* ────────────────────────────────────────────────────── */
/*  Date helpers                                          */
/* ────────────────────────────────────────────────────── */

function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function diffDays(a: Date, b: Date): number {
  return Math.max(1, Math.round((b.getTime() - a.getTime()) / 86_400_000));
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/* ────────────────────────────────────────────────────── */
/*  Constants                                             */
/* ────────────────────────────────────────────────────── */

type PageMode = "buy" | "rent" | "subscribe";

const LONG_TERM_DISCOUNT = 0.7;



/* ────────────────────────────────────────────────────── */
/*  Collapsible Section                                   */
/* ────────────────────────────────────────────────────── */

function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={defaultOpen} className="border-t border-[rgba(255,255,255,0.07)] group">
      <summary className="w-full flex items-center justify-between py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold group-hover:text-[#ccc] transition-colors">
          {title}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-[#444] group-hover:text-[#888] transition-all duration-200 group-open:rotate-180"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div className="pb-6">{children}</div>
    </details>
  );
}

/* ────────────────────────────────────────────────────── */
/*  Stat Badge                                            */
/* ────────────────────────────────────────────────────── */

function StatBadge({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-[rgba(0,0,0,0.6)] backdrop-blur-md border border-[rgba(255,255,255,0.07)]">
      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444]">
        {label}
      </span>
      <span className="font-mono text-[14px] font-bold text-[#f0f0f8]">
        {value}
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/*  Product Page                                          */
/* ────────────────────────────────────────────────────── */

export default function ConfiguratorWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ConfiguratorPage />
    </Suspense>
  );
}

function ConfiguratorPage() {
  const searchParams = useSearchParams();
  const { format } = useCurrency();

  const [robots, setRobots] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRobotId, setSelectedRobotId] = useState<string>("");

  useEffect(() => {
    Promise.all([
      fetch("/api/robots").then((r) => r.json()),
      fetch("/api/skills").then((r) => r.json()),
    ]).then(([robotsData, skillsData]) => {
      if (Array.isArray(robotsData)) setRobots(robotsData);
      if (Array.isArray(skillsData)) setSkills(skillsData);
      const param = searchParams.get("robot") ?? "";
      const found = (robotsData || []).find((r: any) => r.id === param || r.slug === param);
      setSelectedRobotId(found?.id ?? robotsData?.[0]?.id ?? "");
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const modeParam = searchParams.get("mode");
  const [mode, setMode] = useState<PageMode>((modeParam === "buy" ? "buy" : modeParam === "subscribe" ? "subscribe" : "rent") as PageMode);
  const [longTermDiscount, setLongTermDiscount] = useState(false);
  const [installedSkills, setInstalledSkills] = useState<Skill[]>([]);
  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const [duration, setDuration] = useState(7);
  const [startDate, setStartDate] = useState(() => toDateStr(addDays(new Date(), 1)));
  const [endDate, setEndDate] = useState(() => toDateStr(addDays(new Date(), 8)));
  const [subPlan, setSubPlan] = useState<SubscriptionPlan>("monthly");

  const handleDurationChange = useCallback((d: number) => {
    setDuration(d);
    const s = new Date(startDate);
    setEndDate(toDateStr(addDays(s, d)));
  }, [startDate]);

  const handleStartDateChange = useCallback((val: string) => {
    setStartDate(val);
    const s = new Date(val);
    const e = new Date(endDate);
    if (s >= e) {
      const newEnd = addDays(s, 1);
      setEndDate(toDateStr(newEnd));
      setDuration(1);
    } else {
      setDuration(diffDays(s, e));
    }
  }, [endDate]);

  const handleEndDateChange = useCallback((val: string) => {
    setEndDate(val);
    const s = new Date(startDate);
    const e = new Date(val);
    if (e <= s) return;
    setDuration(diffDays(s, e));
  }, [startDate]);

  const selectedRobot =
    robots.find((r: any) => r.id === selectedRobotId || r.slug === selectedRobotId) ?? robots[0];
  const robotImage = selectedRobot?.images?.[0]?.url || null;

  /* ── Available skills (compatible with selected robot, not installed) ── */
  const availableSkills = useMemo(() => {
    const installedIds = new Set(installedSkills.map((s) => s.id));
    return skills.filter(
      (s) =>
        !installedIds.has(s.id) &&
        (s.compatibility.includes("Universal") || s.compatibility.includes(selectedRobot.brand))
    );
  }, [installedSkills, selectedRobot]);

  const filteredSkills = useMemo(() => {
    if (!skillSearchQuery) return availableSkills;
    const q = skillSearchQuery.toLowerCase();
    return availableSkills.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q)
    );
  }, [availableSkills, skillSearchQuery]);

  function addSkill(skill: Skill) {
    if (installedSkills.length >= 6) return;
    setInstalledSkills((prev) => [...prev, skill]);
    setSkillDialogOpen(false);
    setSkillSearchQuery("");
  }

  function removeSkill(skillId: string) {
    setInstalledSkills((prev) => prev.filter((s) => s.id !== skillId));
  }

  /* ── Price calculations ── */
  const skillsCost = installedSkills.reduce((sum, s) => sum + s.price, 0);

  // Rent calculations
  const dailyRate = selectedRobot?.rentalPrice ?? 0;
  const discountMultiplier = longTermDiscount ? LONG_TERM_DISCOUNT : 1;
  const effectiveDaily = Math.round(dailyRate * discountMultiplier);
  const rentalRobotCost = effectiveDaily * duration;
  const rentalTotal = rentalRobotCost + skillsCost;

  // Buy calculations
  const buyPrice = selectedRobot?.buyPrice ?? 0;
  const buyTotal = buyPrice + skillsCost;

  // Subscribe calculations
  const subMonthly = selectedRobot ? monthlyPrice(selectedRobot) : 0;
  const subDiscount = PLAN_DISCOUNTS[subPlan];
  const subEffective = Math.round(subMonthly * subDiscount);
  const subTotal = subEffective + skillsCost;

  const totalCost = mode === "rent" ? rentalTotal : mode === "buy" ? buyTotal : subTotal;


  /* ── Slot array (always 6 slots) ── */
  const slots = Array.from({ length: 6 }, (_, i) => installedSkills[i] ?? null);

  if (loading || !selectedRobot) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#7e1c26] border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  if (robots.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <p className="text-[#888] font-mono text-[14px]">No robots available.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* ══════════════ PRICE CARD — top of page ══════════════ */}
      <div className="bg-black">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-0">
          <div className="rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] p-4 sm:p-6">

            {/* Row 1: Name + Mode Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h1 className="text-[22px] lg:text-[26px] font-bold tracking-[-0.03em] text-[#f0f0f8] leading-tight">
                  {selectedRobot.name}
                </h1>
                <p className="text-[13px] text-[#666] mt-0.5">
                  {selectedRobot.brand} &middot; {selectedRobot.type} &middot; {selectedRobot.dof} DOF
                </p>
              </div>
              <div className="inline-flex rounded-xl border border-[rgba(255,255,255,0.07)] p-1 bg-[#111]">
                {(["buy", "rent", "subscribe"] as const).map((m) => (
                  <label
                    key={m}
                    className={`px-5 py-2.5 rounded-lg text-[13px] font-medium font-mono uppercase tracking-[0.04em] transition-all duration-200 cursor-pointer ${
                      mode === m
                        ? "bg-[#7e1c26] text-white"
                        : "text-[#666] hover:text-white"
                    }`}
                  >
                    <input type="radio" name="mode" value={m} checked={mode === m} onChange={() => setMode(m)} className="sr-only" />
                    {m}
                  </label>
                ))}
              </div>
            </div>

            {/* Row 2: Price + Add to Cart */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[rgba(255,255,255,0.07)]">
              {/* Price info */}
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <div>
                  <span className="font-mono text-[32px] sm:text-[36px] font-bold text-[#c4484f]">
                    {format(totalCost)}
                  </span>
                  {mode === "subscribe" && <span className="font-mono text-[14px] text-[#555]">/month</span>}
                </div>
                <div className="flex flex-col gap-0.5">
                  {mode === "rent" && (
                    <>
                      <span className="font-mono text-[12px] text-[#888]">
                        {format(effectiveDaily)}/day × {duration} {duration === 1 ? "day" : "days"}
                      </span>
                      <span className="font-mono text-[11px] text-[#555]">
                        {fmtDate(new Date(startDate))} → {fmtDate(new Date(endDate))}
                      </span>
                    </>
                  )}
                  {mode === "buy" && (
                    <span className="font-mono text-[12px] text-[#888]">One-time purchase</span>
                  )}
                  {mode === "subscribe" && (
                    <span className="font-mono text-[12px] text-[#888]">{PLAN_LABELS[subPlan]}</span>
                  )}
                  {skillsCost > 0 && (
                    <span className="font-mono text-[11px] text-[#555]">+ {format(skillsCost)} skills</span>
                  )}
                  {longTermDiscount && mode === "rent" && (
                    <span className="font-mono text-[11px] text-[#4ade80]">−30% long-term discount</span>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`/cart?add=${selectedRobotId}&mode=${mode}`}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-full text-[14px] font-medium text-center bg-white text-black hover:bg-[#e0e0e0] transition-all duration-200"
                >
                  Add to Cart →
                </a>
                <a
                  href="/cart"
                  className="px-4 py-3 rounded-full text-[13px] font-mono text-[#888] hover:text-[#c4484f] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)] transition-all"
                >
                  Cart
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <div className="min-h-screen bg-black">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">

            {/* ════════════════ LEFT COLUMN ════════════════ */}
            <div className="w-full lg:w-[55%]">

              {/* ── Robot Image Area ── */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]">
                {robotImage ? (
                  <Image
                    src={robotImage}
                    alt={`${selectedRobot.brand} ${selectedRobot.name}`}
                    fill
                    className="object-contain p-4"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      width="220"
                      height="300"
                      viewBox="0 0 220 300"
                      fill="none"
                      className="opacity-30"
                    >
                      <line x1="110" y1="20" x2="110" y2="45" stroke="#444" strokeWidth="2" />
                      <circle cx="110" cy="16" r="4" fill="#444" opacity="0.8" />
                      <rect x="70" y="45" width="80" height="55" rx="12" stroke="#444" strokeWidth="2" fill="none" />
                      <circle cx="93" cy="72" r="6" fill="#7e1c26" opacity="0.6" />
                      <circle cx="127" cy="72" r="6" fill="#7e1c26" opacity="0.6" />
                      <line x1="110" y1="100" x2="110" y2="115" stroke="#444" strokeWidth="2" />
                      <rect x="60" y="115" width="100" height="90" rx="14" stroke="#444" strokeWidth="2" fill="none" />
                      <line x1="60" y1="130" x2="30" y2="165" stroke="#444" strokeWidth="2" />
                      <line x1="30" y1="165" x2="25" y2="210" stroke="#444" strokeWidth="2" />
                      <circle cx="25" cy="214" r="5" stroke="#444" strokeWidth="1.5" fill="none" />
                      <line x1="160" y1="130" x2="190" y2="165" stroke="#444" strokeWidth="2" />
                      <line x1="190" y1="165" x2="195" y2="210" stroke="#444" strokeWidth="2" />
                      <circle cx="195" cy="214" r="5" stroke="#444" strokeWidth="1.5" fill="none" />
                      <line x1="90" y1="205" x2="80" y2="265" stroke="#444" strokeWidth="2" />
                      <line x1="80" y1="265" x2="65" y2="280" stroke="#444" strokeWidth="2" />
                      <line x1="130" y1="205" x2="140" y2="265" stroke="#444" strokeWidth="2" />
                      <line x1="140" y1="265" x2="155" y2="280" stroke="#444" strokeWidth="2" />
                    </svg>
                  </div>
                )}

                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

                {/* Robot name overlay bottom-left */}
                <div className="absolute bottom-4 left-5">
                  <h2 className="text-[28px] lg:text-[36px] font-bold tracking-[-0.03em] text-[#f0f0f8] leading-tight">
                    {selectedRobot.name}
                  </h2>
                  <p className="text-[13px] text-[#888] mt-0.5">
                    {selectedRobot.type} &middot; {selectedRobot.dof} DOF &middot; SKU {selectedRobot.sku}
                  </p>
                </div>

                {/* Brand overlay bottom-right */}
                <div className="absolute bottom-5 right-5">
                  <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#888]">
                    {selectedRobot.brand}
                  </span>
                </div>

                {/* Stat badges floating top-right */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <StatBadge label="Speed" value={selectedRobot.speed} />
                  <StatBadge label="Strength" value={selectedRobot.strength} />
                  <StatBadge label="AI" value={selectedRobot.aiLevel} />
                  <StatBadge label="Battery" value="96%" />
                </div>
              </div>

              {/* ── Description — right under image ── */}
              {selectedRobot.description && (
                <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]">
                  <p className="text-[14px] leading-relaxed text-[#999]">
                    {selectedRobot.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#111] border border-[rgba(255,255,255,0.07)] font-mono text-[10px] uppercase tracking-[0.06em] text-[#555]">
                      {selectedRobot.type}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#111] border border-[rgba(255,255,255,0.07)] font-mono text-[10px] uppercase tracking-[0.06em] text-[#555]">
                      {selectedRobot.dof} DOF
                    </span>
                    <span className={`px-3 py-1 rounded-full border font-mono text-[10px] uppercase tracking-[0.06em] ${
                      selectedRobot.available
                        ? "bg-[rgba(0,40,0,0.3)] border-[rgba(74,222,128,0.2)] text-[#4ade80]"
                        : "bg-[rgba(126,28,38,0.15)] border-[rgba(126,28,38,0.3)] text-[#c4484f]"
                    }`}>
                      {selectedRobot.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
              )}

              {/* ── Key Features ── */}
              <div className="mt-6">
                <CollapsibleSection title="Key Features" defaultOpen={true}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Hand Type", value: "Dexterous", sub: "5-Finger Articulated" },
                      { label: "Degrees of Freedom", value: `${selectedRobot.dof} DOF`, sub: "Full Body" },
                      { label: "Type", value: selectedRobot.type, sub: "Classification" },
                      { label: "Max Joint Torque", value: `${selectedRobot.torque} Nm`, sub: "Peak Output" },
                      { label: "Speed Rating", value: `${selectedRobot.speed}/100`, sub: "Locomotion" },
                      { label: "AI Level", value: `${selectedRobot.aiLevel}/100`, sub: "Cognitive" },
                      { label: "Weight", value: "78 kg", sub: "Operational" },
                      { label: "Battery", value: "4.5 hrs", sub: "Runtime" },
                      { label: "Warranty", value: "24 mo", sub: "Coverage" },
                    ].map((spec) => (
                      <div
                        key={spec.label}
                        className="p-4 rounded-xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444] block">
                          {spec.label}
                        </span>
                        <span className="text-[16px] font-semibold text-[#f0f0f8] block mt-1">
                          {spec.value}
                        </span>
                        <span className="font-mono text-[10px] text-[#444] block mt-0.5">
                          {spec.sub}
                        </span>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              </div>


              {/* ── Specifications ── */}
              <CollapsibleSection title="Specifications" defaultOpen={false}>
                <div className="space-y-3">
                  {[
                    ["SKU", selectedRobot.sku],
                    ["Type", selectedRobot.type],
                    ["Degrees of Freedom", `${selectedRobot.dof}`],
                    ["Max Joint Torque", `${selectedRobot.torque} Nm`],
                    ["Speed Rating", `${selectedRobot.speed}/100`],
                    ["Strength Rating", `${selectedRobot.strength}/100`],
                    ["AI Level", `${selectedRobot.aiLevel}/100`],
                    ["Skills Pre-installed", `${selectedRobot.skillsInstalled}`],
                    ["Rental Price", `${format(selectedRobot.rentalPrice)}/day`],
                    ["Buy Price", format(selectedRobot.buyPrice)],
                    ["Availability", selectedRobot.available ? "In Stock" : "Out of Stock"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.04)]"
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444]">
                        {label}
                      </span>
                      <span className="text-[13px] text-[#888]">{value}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* ════════════════ RIGHT COLUMN (45%) ════════════════ */}
            <div className="w-full lg:w-[45%]">

              {/* ──────── 1. RENTAL PERIOD (rent only) ──────── */}
              {mode === "rent" && (
                <div className="mb-8 rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] p-5">
                  <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-5">
                    Rental Period
                  </span>

                  {/* Date pickers row */}
                  <div className="flex items-end gap-3 mb-5">
                    <div className="flex-1">
                      <DatePicker
                        label="From"
                        value={startDate}
                        min={toDateStr(new Date())}
                        onChange={handleStartDateChange}
                      />
                    </div>
                    <div className="flex items-center justify-center pb-3">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10h12M12 6l4 4-4 4" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <DatePicker
                        label="To"
                        value={endDate}
                        min={toDateStr(addDays(new Date(startDate), 1))}
                        onChange={handleEndDateChange}
                      />
                    </div>
                  </div>

                  {/* Duration result — prominent */}
                  <div className="flex items-center justify-center gap-3 py-3 mb-5 rounded-xl bg-[rgba(126,28,38,0.1)] border border-[rgba(126,28,38,0.2)]">
                    <span className="font-mono text-[32px] font-bold text-[#c4484f] leading-none">
                      {duration}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[12px] font-medium text-[#c4484f] leading-tight">
                        {duration === 1 ? "day" : "days"}
                      </span>
                      <span className="font-mono text-[10px] text-[#888] leading-tight">
                        {fmtDate(new Date(startDate))} &ndash; {fmtDate(new Date(endDate))}
                      </span>
                    </div>
                  </div>

                  {/* Quick presets + custom input in one row */}
                  <div className="flex items-center gap-2">
                    {[1, 3, 7, 14, 30, 90].map((d) => (
                      <button
                        key={d}
                        onClick={() => handleDurationChange(d)}
                        className={`flex-1 py-2 rounded-lg text-[12px] font-mono font-medium transition-all duration-150 ${
                          duration === d
                            ? "bg-[#7e1c26] text-white shadow-[0_0_12px_rgba(126,28,38,0.3)]"
                            : "bg-[#151515] text-[#666] hover:text-white hover:bg-[#1a1a1a]"
                        }`}
                      >
                        {d}d
                      </button>
                    ))}
                    <div className="w-px h-6 bg-[rgba(255,255,255,0.07)] mx-1" />
                    <input
                      type="number"
                      min={1}
                      max={365}
                      value={duration}
                      onChange={(e) => {
                        const v = Math.max(1, Math.min(365, parseInt(e.target.value) || 1));
                        handleDurationChange(v);
                      }}
                      className="w-16 py-2 rounded-lg bg-[#151515] border border-[rgba(255,255,255,0.07)] text-[12px] text-[#f0f0f8] font-mono outline-none focus:border-[#7e1c26] transition-colors text-center"
                    />
                  </div>
                </div>
              )}

              {/* ──────── 2. SKILL SLOTS ──────── */}
              <div className={mode === "rent" ? "mt-6" : "mt-0"}>
                <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-4">
                  Skill Slots ({installedSkills.length}/6)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {slots.map((skill, i) =>
                    skill ? (
                      <div
                        key={skill.id}
                        onClick={() => removeSkill(skill.id)}
                        className="group relative p-4 rounded-xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)] transition-all duration-200 cursor-pointer min-h-[110px]"
                      >
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#111] border border-[rgba(255,255,255,0.07)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[#888] hover:text-white text-[10px]">
                          &times;
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-[#111] border border-[rgba(255,255,255,0.07)] flex items-center justify-center mb-2">
                          <span className="font-mono text-[12px] text-[#888]">
                            {skill.icon}
                          </span>
                        </div>
                        <p className="text-[12px] font-medium text-[#ccc] truncate">
                          {skill.name}
                        </p>
                        <p className="font-mono text-[11px] text-[#c4484f] mt-0.5">
                          {skill.price === 0 ? "Free" : format(skill.price)}
                        </p>
                      </div>
                    ) : (
                      <button
                        key={`empty-${i}`}
                        onClick={() => {
                          if (installedSkills.length < 6) {
                            setSkillDialogOpen(true);
                          }
                        }}
                        className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] transition-all duration-200 min-h-[110px] cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg border border-dashed border-[rgba(255,255,255,0.1)] group-hover:border-[rgba(255,255,255,0.2)] flex items-center justify-center mb-2 transition-colors">
                          <span className="text-[16px] text-[#444] group-hover:text-[#666] transition-colors">
                            +
                          </span>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444] group-hover:text-[#666] transition-colors">
                          Slot {i + 1}
                        </span>
                      </button>
                    )
                  )}
                </div>
                <button
                  onClick={() => setSkillDialogOpen(true)}
                  className="mt-4 px-5 py-2 rounded-lg bg-[#151515] text-[12px] font-mono text-[#888] border border-[rgba(255,255,255,0.07)] hover:bg-[#7e1c26] hover:text-white hover:border-[#7e1c26] transition-all duration-200"
                >
                  Browse Skills Marketplace
                </button>
              </div>

              {/* ──────── 3. LONG-TERM DISCOUNT (rent only) ──────── */}
              {mode === "rent" && (
                <div className="mt-8">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]">
                    <div>
                      <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block">
                        Long-term Discount
                      </span>
                      <span className="text-[13px] text-[#888] block mt-0.5">
                        Save 30% on daily rate for extended contracts
                      </span>
                    </div>
                    <button
                      onClick={() => setLongTermDiscount(!longTermDiscount)}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                        longTermDiscount ? "bg-[#7e1c26]" : "bg-[#222]"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                          longTermDiscount ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                  {longTermDiscount && (
                    <p className="text-[12px] text-[#c4484f] mt-3 font-mono pl-1">
                      30% discount applied &mdash; effective rate: {format(effectiveDaily)}/day
                    </p>
                  )}
                </div>
              )}

              {/* ──────── SUBSCRIPTION PLAN (subscribe only) ──────── */}
              {mode === "subscribe" && (
                <div className="mt-8">
                  <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-4">
                    Subscription Plan
                  </span>
                  <div className="space-y-2">
                    {(["monthly", "quarterly", "annual"] as const).map((plan) => {
                      const planMonthly = Math.round(subMonthly * PLAN_DISCOUNTS[plan]);
                      return (
                        <button
                          key={plan}
                          onClick={() => setSubPlan(plan)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left ${
                            subPlan === plan
                              ? "bg-[#111] border-[#7e1c26]"
                              : "bg-[#0a0a0a] border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)]"
                          }`}
                        >
                          <div>
                            <span className="text-[14px] font-medium text-[#f0f0f8] block">
                              {PLAN_LABELS[plan]}
                            </span>
                            <span className="font-mono text-[11px] text-[#555] block mt-0.5">
                              {plan === "monthly" ? "Cancel anytime" : plan === "quarterly" ? "3 month commitment" : "12 month commitment"}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-mono text-[16px] font-bold text-[#c4484f] block">
                              {format(planMonthly)}
                            </span>
                            <span className="font-mono text-[10px] text-[#555]">/month</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ──────── WARRANTY INFO (buy only) ──────── */}
              {mode === "buy" && (
                <div className="mt-10">
                  <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-4">
                    Warranty &amp; Support
                  </span>
                  <div className="space-y-3">
                    {[
                      { label: "Standard Warranty", value: "24 months", desc: "Full parts and labour coverage included with purchase" },
                      { label: "Extended Warranty", value: "+12 months", desc: "Optional extended coverage available at checkout" },
                      { label: "On-site Support", value: "Included", desc: "Priority on-site technician within 24 hrs (first year)" },
                      { label: "Software Updates", value: "Lifetime", desc: "OTA firmware and skill-runtime updates at no extra cost" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="p-4 rounded-xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444]">
                            {item.label}
                          </span>
                          <span className="font-mono text-[13px] text-[#c4484f]">
                            {item.value}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#888] mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* ══════════════ OTHER MODELS ══════════════ */}
      <div className="bg-black border-t border-[rgba(255,255,255,0.07)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
          <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-6">
            Other Models
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {robots.map((robot: any) => {
              const miniImage = robot.images?.[0]?.url || null;
              return (
                <button
                  key={robot.id}
                  onClick={() => {
                    setSelectedRobotId(robot.id);
                    setInstalledSkills([]);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`relative p-4 rounded-xl border text-left transition-all duration-200 overflow-hidden ${
                    selectedRobotId === robot.id
                      ? "bg-[#111] border-[#7e1c26]"
                      : "bg-[#0a0a0a] border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)]"
                  }`}
                >
                  {selectedRobotId === robot.id && (
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#7e1c26]" />
                  )}
                  {miniImage && (
                    <div className="relative w-full h-24 mb-2 rounded-lg overflow-hidden bg-black">
                      <Image
                        src={miniImage}
                        alt={robot.name}
                        fill
                        className="object-contain p-1 opacity-70"
                        sizes="200px"
                      />
                    </div>
                  )}
                  <span className="text-[13px] font-medium text-[#f0f0f8] block">
                    {robot.name}
                  </span>
                  <span className="font-mono text-[11px] text-[#444] block mt-0.5">
                    {robot.brand}
                  </span>
                  <span className="font-mono text-[12px] text-[#c4484f] block mt-2">
                    {mode === "rent"
                      ? `${format(robot.rentalPrice)}/day`
                      : format(robot.buyPrice)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════════════════ SKILL SELECTOR DIALOG ════════════════ */}
      <Dialog open={skillDialogOpen} onOpenChange={setSkillDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[70vh] overflow-hidden flex flex-col bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]">
          <DialogHeader>
            <DialogTitle className="text-[#f0f0f8]">Add a Skill</DialogTitle>
            <DialogDescription className="text-[#888]">
              Choose from {availableSkills.length} available modules
            </DialogDescription>
          </DialogHeader>

          {/* Search */}
          <div className="px-0 pb-2">
            <input
              type="text"
              placeholder="Search skills..."
              value={skillSearchQuery}
              onChange={(e) => setSkillSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#111] border border-[rgba(255,255,255,0.07)] text-[13px] text-[#f0f0f8] placeholder:text-[#444] outline-none focus:border-[rgba(255,255,255,0.25)] transition-colors"
            />
          </div>

          {/* Skills list */}
          <div className="flex-1 overflow-y-auto -mx-4 px-4 space-y-1.5">
            {filteredSkills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => addSkill(skill)}
                className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-[#111] transition-colors text-left group"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-[#111] group-hover:bg-[#1a1a1a] border border-[rgba(255,255,255,0.07)] flex items-center justify-center">
                  <span className="font-mono text-[12px] text-[#888]">
                    {skill.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] font-medium text-[#ccc] group-hover:text-white truncate transition-colors">
                      {skill.name}
                    </span>
                    <span className="font-mono text-[12px] text-[#c4484f] shrink-0">
                      {skill.price === 0 ? "Free" : format(skill.price)}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#666] mt-0.5 line-clamp-1">
                    {skill.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-[10px] text-[#444] uppercase">
                      {skill.category}
                    </span>
                    <span className="font-mono text-[10px] text-[#444]">
                      v{skill.version}
                    </span>
                    <span className="font-mono text-[10px] text-[#444]">
                      {skill.rating.toFixed(1)} stars
                    </span>
                  </div>
                </div>
              </button>
            ))}
            {filteredSkills.length === 0 && (
              <div className="py-8 text-center text-[13px] text-[#444]">
                No matching skills found
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
