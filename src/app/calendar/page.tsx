"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { ChevronDown, ChevronLeft, ChevronRight, Plus, X, Loader2 } from "lucide-react";

type Robot = any;


/* ─── Types ─── */
interface Booking {
  id: string;
  robotId: string;
  label: string;
  start: Date;
  end: Date;
  type: "yours" | "booked";
  price: number;
}

interface SkillSlot {
  id: string;
  name: string;
  price: number;
}

/* ─── Mock bookings ─── */
// Generate sample bookings from actual robots
function generateBookings(robotsList: Robot[]): Booking[] {
  if (robotsList.length === 0) return [];
  const bookings: Booking[] = [];
  let id = 1;
  for (const robot of robotsList) {
    // Each robot gets 2 sample bookings
    bookings.push({
      id: `b${id++}`,
      robotId: robot.id,
      label: robot.name,
      start: new Date(2026, 3, 6 + Math.floor(Math.random() * 10)),
      end: new Date(2026, 3, 18 + Math.floor(Math.random() * 10)),
      type: "yours",
      price: robot.rentalPrice * 12,
    });
    bookings.push({
      id: `b${id++}`,
      robotId: robot.id,
      label: robot.name,
      start: new Date(2026, 4, 4 + Math.floor(Math.random() * 15)),
      end: new Date(2026, 4, 18 + Math.floor(Math.random() * 10)),
      type: "booked",
      price: robot.rentalPrice * 14,
    });
  }
  return bookings;
}

/* ─── Available skill add-ons ─── */
function getSkillsForRobot(robot: Robot, allSkills: any[]): SkillSlot[] {
  return allSkills
    .filter((s: any) => s.compatibility?.includes("Universal") || s.compatibility?.includes(robot.brand))
    .map((s: any) => ({ id: s.id, name: s.name, price: s.price }));
}

/* ─── Helpers ─── */
const MONTH_ABBR = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function fmt(n: number): string {
  return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function getWeekNumber(d: Date): number {
  const target = new Date(d.getTime());
  target.setHours(0, 0, 0, 0);
  target.setDate(target.getDate() + 3 - ((target.getDay() + 6) % 7));
  const week1 = new Date(target.getFullYear(), 0, 4);
  return 1 + Math.round(((target.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

function dateStr(d: Date): string {
  return `${MONTH_ABBR[d.getMonth()]} ${d.getDate()}`;
}

/* ─── Robot thumbnail ─── */
function RobotThumb({ robot, size = 32 }: { robot: Robot; size?: number }) {
  const img = robot.images?.[0]?.url;
  if (img) {
    return (
      <div className="relative rounded-md overflow-hidden shrink-0" style={{ width: size, height: size }}>
        <Image src={img} alt={robot.name} fill className="object-cover" sizes={`${size}px`} />
      </div>
    );
  }
  return (
    <div className="rounded-md bg-[#111] border border-[rgba(255,255,255,0.07)] flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <span className="font-mono text-[8px] text-[#444]">{robot.name[0]}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TIMELINE CONFIG
   ═══════════════════════════════════════════════════════ */
const WEEK_PX = 120; // pixels per week
const TIMELINE_START = new Date(2026, 3, 1); // Apr 1, 2026
const TIMELINE_MONTHS = 6; // Apr–Sep

function getTimelineEnd(): Date {
  return new Date(2026, 3 + TIMELINE_MONTHS, 0); // end of Sep
}

function getMonths(): { label: string; start: Date; weeks: number }[] {
  const months: { label: string; start: Date; weeks: number }[] = [];
  for (let i = 0; i < TIMELINE_MONTHS; i++) {
    const mIdx = (3 + i) % 12;
    const year = 2026 + Math.floor((3 + i) / 12);
    const start = new Date(year, mIdx, 1);
    const end = new Date(year, mIdx + 1, 0);
    const days = end.getDate();
    months.push({ label: MONTH_ABBR[mIdx], start, weeks: days / 7 });
  }
  return months;
}

function dateToX(d: Date): number {
  const diffMs = d.getTime() - TIMELINE_START.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return (diffDays / 7) * WEEK_PX;
}

function getTotalWeeks(): number {
  const end = getTimelineEnd();
  const diffDays = daysBetween(TIMELINE_START, end);
  return Math.ceil(diffDays / 7);
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export default function CalendarPage() {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRobots, setSelectedRobots] = useState<Set<string>>(new Set());
  const [selectedRobot, setSelectedRobot] = useState<Robot | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [addedSkills, setAddedSkills] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/robots").then((r) => r.json()),
      fetch("/api/skills").then((r) => r.json()),
    ]).then(([robotsData, skillsData]) => {
      if (Array.isArray(robotsData) && robotsData.length > 0) {
        setRobots(robotsData);
        setSelectedRobots(new Set(robotsData.map((r: any) => r.id)));
        setSelectedRobot(robotsData[0]);
      }
      if (Array.isArray(skillsData)) setSkills(skillsData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const totalWeeks = getTotalWeeks();
  const timelineWidth = totalWeeks * WEEK_PX;
  const months = getMonths();

  const allBookings = useMemo(() => generateBookings(robots), [robots]);

  /* ─── Filter bookings by selected robots ─── */
  const filteredBookings = useMemo(
    () => allBookings.filter((b) => selectedRobots.has(b.robotId)),
    [allBookings, selectedRobots]
  );

  /* ─── Group bookings into rows (per robot) ─── */
  const robotRows = useMemo(() => {
    const map = new Map<string, Booking[]>();
    for (const b of filteredBookings) {
      const existing = map.get(b.robotId) || [];
      existing.push(b);
      map.set(b.robotId, existing);
    }
    return Array.from(map.entries()).map(([robotId, bookings]) => ({
      robotId,
      robot: robots.find((r) => r.id === robotId)!,
      bookings: bookings.sort((a, b) => a.start.getTime() - b.start.getTime()),
    }));
  }, [filteredBookings, robots]);

  /* ─── Toggle robot filter ─── */
  function toggleRobotFilter(id: string) {
    setSelectedRobots((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  /* ─── Pricing calc ─── */
  const parsedStart = startDate ? new Date(startDate) : null;
  const parsedEnd = endDate ? new Date(endDate) : null;
  const rentalDays =
    parsedStart && parsedEnd && parsedEnd > parsedStart
      ? daysBetween(parsedStart, parsedEnd)
      : 0;
  const basePrice = rentalDays * (selectedRobot?.rentalPrice ?? 0);
  const robotSkills = useMemo(() => selectedRobot ? getSkillsForRobot(selectedRobot, skills) : [], [selectedRobot, skills]);
  const skillsPrice = Array.from(addedSkills).reduce((sum, sid) => {
    const skill = robotSkills.find((s) => s.id === sid);
    return sum + (skill ? skill.price : 0);
  }, 0);
  const totalPrice = basePrice + skillsPrice * rentalDays;

  /* ─── Toggle skill ─── */
  function toggleSkill(id: string) {
    setAddedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /* ─── Week gridlines data ─── */
  const weekLines = useMemo(() => {
    const lines: { x: number; week: number }[] = [];
    const current = new Date(TIMELINE_START);
    // Align to Monday
    const dayOfWeek = current.getDay();
    const daysToMonday = dayOfWeek === 0 ? 1 : (dayOfWeek === 1 ? 0 : 8 - dayOfWeek);
    current.setDate(current.getDate() + daysToMonday);
    while (current <= getTimelineEnd()) {
      lines.push({ x: dateToX(current), week: getWeekNumber(current) });
      current.setDate(current.getDate() + 7);
    }
    return lines;
  }, []);

  /* ─── Scroll helpers ─── */
  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -WEEK_PX * 4, behavior: "smooth" });
  }
  function scrollRight() {
    scrollRef.current?.scrollBy({ left: WEEK_PX * 4, behavior: "smooth" });
  }

  const ROW_HEIGHT = 56;
  const HEADER_HEIGHT = 64;
  const RULER_HEIGHT = HEADER_HEIGHT;

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-[#888]" />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-[#f0f0f8]">
        {/* ─── HERO SECTION ─── */}
        <section className="relative max-w-[1400px] mx-auto px-6 lg:px-8 pt-12 pb-14 min-h-[280px] overflow-hidden">
          {/* Hero background image */}
          <div className="absolute top-0 -right-[10%] w-[55%] h-full hidden lg:block">
            <Image
              src="/calendar-hero.jpeg"
              alt="Robot rental facility"
              fill
              className="object-cover object-center opacity-40"
              sizes="55vw"
              priority
            />
            <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent" />
          </div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#c4484f] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c4484f]" />
              Long-term Rental
            </span>
            <h1 className="text-[40px] sm:text-[56px] font-bold tracking-[-0.04em] leading-[1.05]">
              Rental{" "}
              <span className="text-[#c4484f]">Schedule</span>
            </h1>
            <p className="text-[16px] text-[#888] mt-4 max-w-[480px] leading-relaxed">
              Timeline view of all robot bookings and availability. Plan and manage your fleet rentals.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-8">
              {[
                { value: `${robots.length}`, label: "Robots" },
                { value: `${allBookings.length}`, label: "Bookings" },
                { value: "6mo", label: "Timeline" },
                { value: "24/7", label: "Support" },
              ].map((stat, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className={`text-[24px] font-bold tracking-[-0.02em] ${i % 2 === 0 ? "text-white" : "text-[#888]"}`}>{stat.value}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ MAIN CONTENT — Booking ═══════════════════════ */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">

          {/* ─── Step 1: Select Robot ─── */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-[#7e1c26] flex items-center justify-center text-[12px] font-mono font-bold text-white">1</span>
              <span className="text-[14px] font-semibold tracking-[-0.02em]">Select a robot</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {robots.map((r) => {
                const img = r.images?.[0]?.url;
                const active = selectedRobot?.id === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setSelectedRobot(r);
                      setAddedSkills(new Set());
                    }}
                    className={`relative rounded-xl border overflow-hidden text-left transition-all duration-150 ${
                      active
                        ? "border-[#7e1c26] bg-[rgba(126,28,38,0.1)] ring-1 ring-[#7e1c26]"
                        : "border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] hover:border-[rgba(255,255,255,0.18)]"
                    }`}
                  >
                    <div className="relative h-[120px] bg-[#080808]">
                      {img ? (
                        <>
                          <Image src={img} alt={r.name} fill className="object-cover object-top" sizes="200px" />
                          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-mono text-[24px] text-[#333]">{r.name[0]}</span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <span className={`w-2.5 h-2.5 rounded-full block ${r.available ? "bg-[#4ade80]" : "bg-[#7e1c26]"}`} />
                      </div>
                      {active && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#7e1c26] text-[9px] font-mono text-white uppercase tracking-wider">
                          Selected
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <div className="text-[13px] font-semibold font-mono text-[#f0f0f8] truncate">{r.name}</div>
                      <div className="text-[11px] font-mono text-[#666] mt-0.5">{r.brand}</div>
                      <div className="text-[13px] font-mono text-[#c4484f] font-bold mt-1.5">
                        ${fmt(r.rentalPrice)}<span className="text-[#444] font-normal text-[11px]">/day</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── Step 2 & 3: Dates + Skills (two columns) ─── */}
          <div className="flex flex-col lg:flex-row gap-6 mb-10">

            {/* Left: Dates & Duration */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-7 rounded-full bg-[#7e1c26] flex items-center justify-center text-[12px] font-mono font-bold text-white">2</span>
                <span className="text-[14px] font-semibold tracking-[-0.02em]">Choose dates</span>
              </div>
              <div className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="text-[10px] font-mono text-[#444] uppercase tracking-[0.08em] block mb-1.5">Start date</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-[#111] border border-[rgba(255,255,255,0.07)] text-[13px] font-mono text-[#f0f0f8] outline-none focus:border-[#7e1c26] transition-colors duration-150 [color-scheme:dark]" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#444] uppercase tracking-[0.08em] block mb-1.5">End date</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-[#111] border border-[rgba(255,255,255,0.07)] text-[13px] font-mono text-[#f0f0f8] outline-none focus:border-[#7e1c26] transition-colors duration-150 [color-scheme:dark]" />
                  </div>
                </div>
                <div className="flex justify-between items-center px-4 py-3 rounded-lg bg-[#111] border border-[rgba(255,255,255,0.07)]">
                  <span className="text-[12px] font-mono text-[#888]">Duration</span>
                  <span className="text-[16px] font-mono text-[#f0f0f8] font-semibold">
                    {rentalDays > 0 ? `${rentalDays} day${rentalDays !== 1 ? "s" : ""}` : "--"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Skills */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-7 rounded-full bg-[#7e1c26] flex items-center justify-center text-[12px] font-mono font-bold text-white">3</span>
                <span className="text-[14px] font-semibold tracking-[-0.02em]">Add skills</span>
              </div>
              <div className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto">
                  {robotSkills.map((skill) => {
                    const active = addedSkills.has(skill.id);
                    return (
                      <button key={skill.id} onClick={() => toggleSkill(skill.id)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-[12px] font-mono transition-all duration-150 ${
                          active
                            ? "bg-[rgba(126,28,38,0.15)] border border-[#7e1c26] text-[#f0f0f8]"
                            : "bg-[#111] border border-[rgba(255,255,255,0.07)] text-[#888] hover:border-[rgba(255,255,255,0.18)]"
                        }`}
                      >
                        <span className="truncate">{skill.name}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[#c4484f]">{skill.price === 0 ? "Free" : `$${fmt(skill.price)}/d`}</span>
                          {active ? <X size={12} className="text-[#c4484f]" /> : <Plus size={12} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ─── Pricing Summary ─── */}
          <div className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] p-6 mb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6 text-[13px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-[#888]">Robot:</span>
                  <span className="text-[#f0f0f8] font-semibold">{selectedRobot?.name ?? "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#888]">Rental:</span>
                  <span className="text-[#f0f0f8]">{rentalDays > 0 ? `$${fmt(basePrice)}` : "$0"}</span>
                </div>
                {addedSkills.size > 0 && rentalDays > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#888]">Skills ({addedSkills.size}):</span>
                    <span className="text-[#f0f0f8]">${fmt(skillsPrice * rentalDays)}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#444] uppercase tracking-[0.08em] block">Total</span>
                  <span className="text-[28px] font-bold text-[#c4484f] font-mono">${fmt(totalPrice)}</span>
                </div>
                {rentalDays > 0 && selectedRobot ? (
                  <a
                    href={`/cart?add=${selectedRobot.id}&mode=rent`}
                    className="px-8 py-3 rounded-full text-[14px] font-mono font-medium bg-white text-black hover:bg-[#e0e0e0] transition-all duration-150"
                  >
                    Confirm Booking →
                  </a>
                ) : (
                  <span className="px-8 py-3 rounded-full text-[14px] font-mono font-medium bg-[#111] text-[#333] cursor-not-allowed">
                    Confirm Booking →
                  </span>
                )}
              </div>
            </div>
            <p className="text-[10px] text-[#444] mt-3 font-mono">Free cancellation up to 24h before start</p>
          </div>

          {/* ─── Collapsible Calendar ─── */}
          <details className="mb-10 group">
            <summary className="flex items-center gap-3 mb-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className="text-[14px] font-semibold tracking-[-0.02em] text-[#888] group-hover:text-white transition-colors">
                Availability Calendar
              </span>
              <ChevronDown size={16} className="text-[#444] transition-transform duration-200 group-open:rotate-180" />
            </summary>

            <div>
                {/* Robot filter pills */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-4">
                  {robots.map((r) => {
                    const active = selectedRobots.has(r.id);
                    return (
                      <button key={r.id} onClick={() => toggleRobotFilter(r.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[12px] font-mono whitespace-nowrap transition-all duration-150 shrink-0 ${
                          active
                            ? "bg-[#151515] border-[rgba(255,255,255,0.14)] text-[#f0f0f8]"
                            : "bg-transparent border-[rgba(255,255,255,0.07)] text-[#444] hover:text-[#888] hover:border-[rgba(255,255,255,0.14)]"
                        }`}
                      >
                        <RobotThumb robot={r} size={18} />
                        {r.name}
                        <span className={`w-1.5 h-1.5 rounded-full ${r.available ? "bg-[#10b981]" : "bg-[#e5484d]"}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Scroll controls */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-[#444] uppercase tracking-[0.08em]">
                    {MONTH_ABBR[TIMELINE_START.getMonth()]} {TIMELINE_START.getFullYear()} &mdash; {MONTH_ABBR[getTimelineEnd().getMonth()]} {getTimelineEnd().getFullYear()}
                  </span>
                  <div className="flex gap-1">
                    <button onClick={scrollLeft} className="w-7 h-7 rounded-md bg-[#151515] text-[#888] hover:bg-[#7e1c26] hover:text-white flex items-center justify-center transition-all duration-150">
                      <ChevronLeft size={14} />
                    </button>
                    <button onClick={scrollRight} className="w-7 h-7 rounded-md bg-[#151515] text-[#888] hover:bg-[#7e1c26] hover:text-white flex items-center justify-center transition-all duration-150">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Timeline */}
                <div className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] overflow-hidden">
                  <div ref={scrollRef} className="overflow-x-auto no-scrollbar" style={{ position: "relative" }}>
                    <div style={{ width: timelineWidth, minHeight: RULER_HEIGHT + Math.max(robotRows.length, 1) * ROW_HEIGHT + 20, position: "relative" }}>
                      {/* Month ruler */}
                      <div className="flex border-b border-[rgba(255,255,255,0.07)]" style={{ height: HEADER_HEIGHT / 2, position: "relative" }}>
                        {months.map((m, i) => {
                          const x = dateToX(m.start);
                          const nextMonth = i < months.length - 1 ? dateToX(months[i + 1].start) : timelineWidth;
                          return (
                            <div key={m.label} className="absolute top-0 flex items-center justify-center text-[11px] font-mono text-[#888] font-semibold tracking-[0.1em] border-r border-[rgba(255,255,255,0.07)]"
                              style={{ left: x, width: nextMonth - x, height: HEADER_HEIGHT / 2 }}>
                              {m.label}
                            </div>
                          );
                        })}
                      </div>
                      {/* Week numbers */}
                      <div className="border-b border-[rgba(255,255,255,0.07)]" style={{ height: HEADER_HEIGHT / 2, position: "relative" }}>
                        {weekLines.map((wl, i) => (
                          <div key={i} className="absolute top-0 flex items-center justify-center text-[9px] font-mono text-[#444]"
                            style={{ left: wl.x, width: WEEK_PX, height: HEADER_HEIGHT / 2 }}>
                            W{wl.week}
                          </div>
                        ))}
                      </div>
                      {/* Gridlines */}
                      {weekLines.map((wl, i) => (
                        <div key={`grid-${i}`} className="absolute top-0" style={{ left: wl.x, height: "100%", width: 1, borderLeft: "1px dashed rgba(255,255,255,0.05)" }} />
                      ))}
                      {/* Booking rows */}
                      {robotRows.map((row, rowIdx) => {
                        const y = RULER_HEIGHT + rowIdx * ROW_HEIGHT;
                        return (
                          <div key={row.robotId} className="absolute left-0 right-0 border-b border-[rgba(255,255,255,0.04)]" style={{ top: y, height: ROW_HEIGHT }}>
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#444] z-10 pointer-events-none" style={{ maxWidth: 80 }}>
                              {row.robot.name}
                            </div>
                            {row.bookings.map((booking) => {
                              const bStart = booking.start < TIMELINE_START ? TIMELINE_START : booking.start;
                              const bEnd = booking.end > getTimelineEnd() ? getTimelineEnd() : booking.end;
                              const x = dateToX(bStart);
                              const w = dateToX(bEnd) - x;
                              const days = daysBetween(booking.start, booking.end);
                              const isYours = booking.type === "yours";
                              return (
                                <div key={booking.id}
                                  className={`absolute top-[10px] rounded-lg flex items-center gap-2 px-3 cursor-default ${isYours ? "bg-[#7e1c26] hover:bg-[#8f2330]" : "bg-[#1a1a1a] border border-dashed border-[rgba(255,255,255,0.14)]"}`}
                                  style={{ left: Math.max(x, 90), width: Math.max(w - Math.max(0, 90 - x), 40), height: ROW_HEIGHT - 20 }}
                                  title={`${booking.label} · ${days}d · $${fmt(booking.price)}`}>
                                  <span className={`text-[11px] font-mono truncate ${isYours ? "text-white" : "text-[#888]"}`}>{booking.label}</span>
                                  <span className={`text-[10px] font-mono shrink-0 ${isYours ? "text-[rgba(255,255,255,0.6)]" : "text-[#444]"}`}>{days}d</span>
                                  <span className={`text-[10px] font-mono shrink-0 ${isYours ? "text-[#c4484f]" : "text-[#444]"}`}>${fmt(booking.price)}</span>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                      {/* Today line */}
                      {(() => {
                        const today = new Date();
                        if (today >= TIMELINE_START && today <= getTimelineEnd()) {
                          const x = dateToX(today);
                          return (
                            <div className="absolute top-0" style={{ left: x, height: "100%", width: 2, background: "#7e1c26", zIndex: 20 }}>
                              <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-[#7e1c26] text-white text-[8px] font-mono px-1.5 py-0.5 rounded-b">TODAY</div>
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-5 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-2.5 rounded-sm bg-[#7e1c26]" />
                    <span className="text-[10px] font-mono text-[#888]">Your bookings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-2.5 rounded-sm bg-[#1a1a1a] border border-dashed border-[rgba(255,255,255,0.14)]" />
                    <span className="text-[10px] font-mono text-[#888]">Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-2.5 rounded-sm bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]" />
                    <span className="text-[10px] font-mono text-[#888]">Available</span>
                  </div>
                </div>
              </div>
          </details>
        </div>
      </div>

      {/* ─── Global style for hiding scrollbar ─── */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
