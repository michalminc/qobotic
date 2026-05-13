"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { RobotCard } from "@/components/robot-card";
import { Navbar } from "@/components/navbar";
import {
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  SlidersHorizontal,
  Heart,
  Star,
  Calendar,
} from "lucide-react";


const ROBOT_TYPES = ["Humanoid", "Quadruped", "Reception", "Industrial"] as const;
const MANUFACTURERS = ["Agibot", "Unitree", "Delta Robots", "Booster", "Magic Lab"] as const;

type SortOption = "price-asc" | "price-desc" | "most-booked" | "newest" | "availability";

const SORT_LABELS: Record<SortOption, string> = {
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "most-booked": "Most Booked",
  newest: "Newest",
  availability: "Availability",
};

/* ---------- collapsible filter section ---------- */
function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[rgba(255,255,255,0.05)] pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2 group"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444] group-hover:text-[#888] transition-colors">
          {title}
        </span>
        <ChevronDown
          size={14}
          className={`text-[#444] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function RobotsPage() {
  const [robots, setRobots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");
  const [sortOpen, setSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("All");
  const [rentalStart, setRentalStart] = useState("");
  const [rentalEnd, setRentalEnd] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    fetch("/api/robots")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setRobots(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleType = (t: string) =>
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  const toggleManufacturer = (m: string) =>
    setSelectedManufacturers((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );

  const filtered = useMemo(() => {
    let result = [...robots];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.brand.toLowerCase().includes(q) ||
          r.sku.toLowerCase().includes(q)
      );
    }

    if (searchType !== "All") {
      result = result.filter((r) => r.type === searchType);
    }

    if (selectedTypes.length > 0) {
      result = result.filter((r) => selectedTypes.includes(r.type));
    }
    if (selectedManufacturers.length > 0) {
      result = result.filter((r) => selectedManufacturers.includes(r.brand));
    }
    if (availableOnly) {
      result = result.filter((r) => r.available);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.rentalPrice - b.rentalPrice);
        break;
      case "price-desc":
        result.sort((a, b) => b.rentalPrice - a.rentalPrice);
        break;
      case "most-booked":
        result.sort((a, b) => (b.totalBookings || 0) - (a.totalBookings || 0));
        break;
      case "newest":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "availability":
        result.sort((a, b) => (a.available === b.available ? 0 : a.available ? -1 : 1));
        break;
    }

    return result;
  }, [robots, searchQuery, searchType, selectedTypes, selectedManufacturers, availableOnly, sortBy]);

  /* Featured robot: first available */
  const featured = robots.find((r) => r.available) || robots[0] || null;

  const minPrice = robots.length > 0 ? Math.min(...robots.map((r) => r.rentalPrice)) : 0;
  const maxPrice = robots.length > 0 ? Math.max(...robots.map((r) => r.rentalPrice)) : 0;

  /* ---------- sidebar content ---------- */
  const sidebarContent = (
    <div className="space-y-2 p-4">
      <h3 className="text-[16px] font-semibold text-[#f0f0f8] mb-4">Filter</h3>

      {/* Robot Type */}
      <FilterSection title="Robot Type">
        <div className="flex flex-col gap-1 mt-1">
          {ROBOT_TYPES.map((type) => {
            const checked = selectedTypes.includes(type);
            return (
              <label
                key={type}
                className="flex items-center gap-2.5 cursor-pointer px-1 py-1 rounded-md hover:bg-[rgba(255,255,255,0.03)] transition-colors"
              >
                <div
                  className={`w-[16px] h-[16px] rounded border flex items-center justify-center transition-colors ${
                    checked
                      ? "bg-[#7e1c26] border-[#7e1c26]"
                      : "border-[rgba(255,255,255,0.15)] bg-transparent"
                  }`}
                  onClick={() => toggleType(type)}
                >
                  {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-[13px] text-[#888]">{type}</span>
              </label>
            );
          })}
        </div>
      </FilterSection>

      {/* Manufacturer */}
      <FilterSection title="Manufacturer">
        <div className="flex flex-col gap-1 mt-1">
          {MANUFACTURERS.map((m) => {
            const checked = selectedManufacturers.includes(m);
            return (
              <label
                key={m}
                className="flex items-center gap-2.5 cursor-pointer px-1 py-1 rounded-md hover:bg-[rgba(255,255,255,0.03)] transition-colors"
              >
                <div
                  className={`w-[16px] h-[16px] rounded border flex items-center justify-center transition-colors ${
                    checked
                      ? "bg-[#7e1c26] border-[#7e1c26]"
                      : "border-[rgba(255,255,255,0.15)] bg-transparent"
                  }`}
                  onClick={() => toggleManufacturer(m)}
                >
                  {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-[13px] text-[#888]">{m}</span>
              </label>
            );
          })}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        <label className="flex items-center gap-2.5 cursor-pointer group mt-1 px-1">
          <button
            onClick={() => setAvailableOnly(!availableOnly)}
            className={`relative w-[36px] h-[20px] rounded-full transition-colors ${
              availableOnly ? "bg-[#7e1c26]" : "bg-[#333]"
            }`}
          >
            <div
              className={`absolute top-[2px] w-[16px] h-[16px] rounded-full bg-white transition-transform ${
                availableOnly ? "left-[18px]" : "left-[2px]"
              }`}
            />
          </button>
          <span className="text-[13px] text-[#888] group-hover:text-white transition-colors">
            Available now only
          </span>
        </label>
      </FilterSection>

      {/* Skills */}
      <FilterSection title="Skills">
        <div className="flex items-center gap-2 mt-1 px-1">
          <span className="text-[12px] text-[#666]">0</span>
          <div className="flex-1 h-[3px] rounded-full bg-[#1a1a1a] relative">
            <div className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-[#333] to-[#7e1c26]" />
          </div>
          <span className="text-[12px] text-[#666]">10+</span>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen">

        {/* ═══════════════════════ SECTION 1: HERO ═══════════════════════ */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-12 pb-14">
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

            {/* Left side */}
            <div className="flex-1 min-w-0">
              {/* Mono label */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-[6px] h-[6px] rounded-full bg-[#c4484f]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444]">
                  Robot Rental
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-[48px] md:text-[56px] font-bold tracking-[-0.03em] leading-[1.05]">
                <span className="text-[#f0f0f8]">Browse </span>
                <span className="text-[#c4484f]">Robots</span>
              </h1>

              {/* Subtitle */}
              <p className="text-[16px] text-[#888] mt-4 max-w-[480px] leading-relaxed">
                Find your ideal robot. Compare prices from top manufacturers.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-6 mt-8">
                {[
                  { value: "24+", label: "Robots" },
                  { value: "6", label: "Brands" },
                  { value: "48h", label: "Delivery" },
                  { value: "4.9\u2605", label: "Rating" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-1.5">
                    <span className="text-[18px] font-bold text-white">{stat.value}</span>
                    <span className="text-[13px] text-[#555]">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Featured card */}
            {featured && <div className="w-full lg:w-[340px] flex-shrink-0">
              <div className="relative bg-[#0a0a0a] rounded-xl border border-[rgba(255,255,255,0.07)] overflow-hidden">
                {/* Crimson top accent line */}
                <div className="h-[3px] bg-[#7e1c26]" />

                {/* Available badge (tilted) */}
                {featured.available && (
                  <div className="absolute top-5 right-[-28px] z-10 rotate-[30deg] bg-[#22c55e] px-8 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                    Available
                  </div>
                )}

                <div className="p-5">
                  {/* Rent from label */}
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444]">
                    Rent from
                  </span>
                  {/* Price */}
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-[36px] font-bold text-[#c4484f] leading-none">
                      &euro;{featured.rentalPrice.toFixed(0)}
                    </span>
                    <span className="text-[14px] text-[#555]">/day</span>
                  </div>

                  {/* Robot name + brand */}
                  <div className="mt-4">
                    <h3 className="text-[18px] font-bold text-[#f0f0f8]">{featured.name}</h3>
                    <p className="text-[13px] text-[#555] mt-0.5">{featured.brand}</p>
                  </div>

                  {/* Spec pills + rating */}
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-[#111] border border-[rgba(255,255,255,0.07)] text-[#666]">
                      {featured.dof} DOF
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-[#111] border border-[rgba(255,255,255,0.07)] text-[#666]">
                      {featured.torque} Nm
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-[12px] text-[#f0f0f8]">
                      <Star size={12} className="fill-[#f59e0b] text-[#f59e0b]" />
                      4.8
                    </span>
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </section>

        {/* ═══════════════════════ SECTION 2: SEARCH BAR ═══════════════════════ */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] rounded-xl p-3 sm:p-4">
            <div className="flex gap-2">
              <div className="flex-1 min-w-0 relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search robots by name, brand..."
                  className="w-full h-[42px] pl-9 pr-3 bg-[#111] border border-[rgba(255,255,255,0.07)] rounded-lg text-[13px] text-[#f0f0f8] placeholder-[#444] outline-none focus:border-[rgba(255,255,255,0.15)] transition-colors"
                />
              </div>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-[120px] sm:w-[160px] h-[42px] px-3 bg-[#111] border border-[rgba(255,255,255,0.07)] rounded-lg text-[13px] text-[#f0f0f8] outline-none appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23444' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                }}
              >
                <option value="All">All types</option>
                <option value="Humanoid">Humanoid</option>
                <option value="Quadruped">Quadruped</option>
                <option value="Reception">Reception</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 3: FILTERS TOOLBAR ═══════════════════════ */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
            {/* Left: Filters button + count */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-[13px] text-[#888] hover:text-white bg-[#151515] border border-[rgba(255,255,255,0.07)] rounded-lg transition-colors"
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>
              <span className="font-mono text-[12px] text-[#888]">
                {filtered.length} robot{filtered.length !== 1 ? "s" : ""} found
              </span>
            </div>

            {/* Center: Price range */}
            <div className="hidden md:flex items-center gap-2">
              <span className="font-mono text-[12px] text-[#555]">
                &euro;{minPrice.toFixed(0)} &mdash; &euro;{maxPrice.toFixed(0)} /day
              </span>
            </div>

            {/* Right: Sort + Grid/List + Map */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-[#888] hover:text-white bg-[#151515] border border-[rgba(255,255,255,0.07)] rounded-lg transition-colors"
                >
                  {SORT_LABELS[sortBy]}
                  <ChevronDown size={14} />
                </button>
                {sortOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setSortOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 w-[200px] bg-[#111] border border-[rgba(255,255,255,0.07)] rounded-lg overflow-hidden z-20 shadow-xl">
                      {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSortBy(key);
                            setSortOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 text-[13px] transition-colors ${
                            sortBy === key
                              ? "text-white bg-[rgba(255,255,255,0.05)]"
                              : "text-[#888] hover:text-white hover:bg-[rgba(255,255,255,0.03)]"
                          }`}
                        >
                          {SORT_LABELS[key]}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex rounded-lg overflow-hidden border border-[rgba(255,255,255,0.07)]">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-[rgba(255,255,255,0.08)] text-white"
                      : "text-[#444] hover:text-[#888]"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-[rgba(255,255,255,0.08)] text-white"
                      : "text-[#444] hover:text-[#888]"
                  }`}
                  aria-label="List view"
                >
                  <List size={16} />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 4: MAIN AREA ═══════════════════════ */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex gap-6 pb-16">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-[240px] flex-shrink-0">
            <div className="sticky top-[80px] bg-[#0a0a0a] rounded-xl border border-[rgba(255,255,255,0.07)]">
              {sidebarContent}
            </div>
          </aside>

          {/* Mobile Filter Overlay */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-[#0a0a0a] border-r border-[rgba(255,255,255,0.07)] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.07)]">
                  <h3 className="text-[14px] font-semibold text-[#f0f0f8]">Filters</h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 text-[#888] hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
                {sidebarContent}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* GRID VIEW */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((robot) => (
                  <RobotCard key={robot.id} robot={robot} />
                ))}
              </div>
            )}

            {/* LIST VIEW */}
            {viewMode === "list" && (
              <div className="border border-[rgba(255,255,255,0.07)] rounded-xl overflow-hidden">
                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-[60px_1fr_1fr_120px_140px_160px] items-center h-[40px] px-4 bg-[#0a0a0a] border-b border-[rgba(255,255,255,0.07)]">
                  <span />
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444]">
                    Name / Brand
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444]">
                    Rating
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444]">
                    Status
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444]">
                    Price
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444]">
                    Actions
                  </span>
                </div>

                {/* Rows */}
                {filtered.map((robot) => (
                  <div
                    key={robot.id}
                    className="grid grid-cols-1 sm:grid-cols-[60px_1fr_1fr_120px_140px_160px] items-center min-h-[72px] px-4 border-b border-[rgba(255,255,255,0.07)] last:border-b-0 hover:bg-[#111] transition-colors gap-y-2 sm:gap-y-0 py-3 sm:py-0"
                  >
                    {/* Thumbnail */}
                    <div className="hidden sm:block w-[48px] h-[48px] rounded-lg overflow-hidden relative bg-[#111]">
                      <Image
                        src={robot.images?.[0]?.url || "/placeholder-robot.png"}
                        alt={robot.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Name / Brand */}
                    <div className="min-w-0">
                      <div className="text-[14px] font-semibold text-[#f0f0f8] truncate">
                        {robot.name}
                      </div>
                      <div className="text-[12px] text-[#555] truncate">
                        {robot.brand} &middot; 2025
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                      <Star size={12} className="fill-[#f59e0b] text-[#f59e0b]" />
                      <span className="text-[13px] text-[#f0f0f8]">4.8</span>
                      <span className="text-[11px] text-[#555]">(12)</span>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-[6px] h-[6px] rounded-full ${
                          robot.available ? "bg-[#34d399]" : "bg-[#e5484d]"
                        }`}
                      />
                      <span
                        className={`text-[13px] ${
                          robot.available ? "text-[#34d399]" : "text-[#e5484d]"
                        }`}
                      >
                        {robot.available ? "Available" : "Booked"}
                      </span>
                    </div>

                    {/* Price */}
                    <div>
                      <span className="font-mono text-[14px] font-bold text-[#c4484f]">
                        &euro;{robot.rentalPrice.toFixed(0)}
                      </span>
                      <span className="font-mono text-[11px] text-[#444]">/day</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <a
                        href={`/configurator?robot=${robot.slug || robot.id}&mode=buy`}
                        className="px-3 py-1.5 text-[12px] font-medium bg-[#151515] text-[#888] hover:bg-[#7e1c26] hover:text-white border border-[rgba(255,255,255,0.06)] hover:border-[#7e1c26] rounded-full transition-all duration-200"
                      >
                        Buy
                      </a>
                      <a
                        href={`/configurator?robot=${robot.slug || robot.id}&mode=rent`}
                        className="px-3 py-1.5 text-[12px] font-medium bg-[#151515] text-[#888] hover:bg-[#7e1c26] hover:text-white border border-[rgba(255,255,255,0.06)] hover:border-[#7e1c26] rounded-full transition-all duration-200"
                      >
                        Rent
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-[15px] text-[#888]">No robots match your filters.</p>
                <button
                  onClick={() => {
                    setSelectedTypes([]);
                    setSelectedManufacturers([]);
                    setAvailableOnly(false);
                    setSearchQuery("");
                    setSearchType("All");
                  }}
                  className="mt-3 text-[13px] text-[#c4484f] hover:text-[#e5484d] transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
