"use client";

import { useState, useMemo } from "react";
import { skills } from "@/lib/data";
import { SkillCard } from "@/components/skill-card";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/navbar";
import Image from "next/image";

const categories = ["Navigation", "Vision", "Language", "Industrial", "Custom"] as const;
const compatibilities = ["Universal", "Agibot", "Unitree", "Delta"] as const;
const authorTypes = ["All", "Verified company", "Community", "Official Dexio"] as const;
const sortOptions = [
  { value: "installs", label: "Most installed" },
  { value: "newest", label: "Newest" },
  { value: "price", label: "Price" },
  { value: "rating", label: "Rating" },
] as const;

type SortBy = (typeof sortOptions)[number]["value"];

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[rgba(255,255,255,0.07)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444]">
          {title}
        </span>
        <ChevronDown
          size={14}
          className={`text-[#444] transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <div className="px-4 pb-3 space-y-2">{children}</div>}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label onClick={onChange} className="flex items-center gap-2.5 cursor-pointer group">
      <div
        className={`w-3.5 h-3.5 rounded-[3px] border transition-all duration-150 flex items-center justify-center ${
          checked
            ? "bg-white border-white"
            : "border-[rgba(255,255,255,0.15)] group-hover:border-[rgba(255,255,255,0.3)]"
        }`}
      >
        {checked && (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path
              d="M1.5 4L3 5.5L6.5 2"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-[13px] text-[#888] group-hover:text-[#ccc] transition-colors">
        {label}
      </span>
    </label>
  );
}

function Radio({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label onClick={onChange} className="flex items-center gap-2.5 cursor-pointer group">
      <div
        className={`w-3.5 h-3.5 rounded-full border transition-all duration-150 flex items-center justify-center ${
          checked
            ? "border-white"
            : "border-[rgba(255,255,255,0.15)] group-hover:border-[rgba(255,255,255,0.3)]"
        }`}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
      <span className="text-[13px] text-[#888] group-hover:text-[#ccc] transition-colors">
        {label}
      </span>
    </label>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`w-8 h-[18px] rounded-full transition-all duration-150 relative ${
        checked ? "bg-white" : "bg-[#333]"
      }`}
    >
      <div
        className={`w-3.5 h-3.5 rounded-full absolute top-[2px] transition-all duration-150 ${
          checked ? "right-[2px] bg-black" : "left-[2px] bg-[#666]"
        }`}
      />
    </button>
  );
}

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCompatibility, setSelectedCompatibility] = useState<string[]>([]);
  const [selectedAuthorType, setSelectedAuthorType] = useState<string>("All");
  const [freeOnly, setFreeOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortBy>("installs");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleCompatibility = (comp: string) => {
    setSelectedCompatibility((prev) =>
      prev.includes(comp) ? prev.filter((c) => c !== comp) : [...prev, comp]
    );
  };

  const filtered = useMemo(() => {
    let result = [...skills];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.author.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((s) => selectedCategories.includes(s.category));
    }

    if (selectedCompatibility.length > 0) {
      result = result.filter((s) =>
        s.compatibility.some((c) =>
          selectedCompatibility.some((sc) =>
            c.toLowerCase().includes(sc.toLowerCase())
          )
        )
      );
    }

    if (selectedAuthorType !== "All") {
      result = result.filter((s) => s.authorType === selectedAuthorType);
    }

    if (freeOnly) {
      result = result.filter((s) => s.price === 0);
    }

    if (minRating > 0) {
      result = result.filter((s) => s.rating >= minRating);
    }

    switch (sortBy) {
      case "installs":
        result.sort((a, b) => b.installs - a.installs);
        break;
      case "newest":
        result.sort((a, b) => parseFloat(b.version) - parseFloat(a.version));
        break;
      case "price":
        result.sort((a, b) => a.price - b.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [searchQuery, selectedCategories, selectedCompatibility, selectedAuthorType, freeOnly, minRating, sortBy]);

  const editorPicks = useMemo(
    () =>
      skills
        .filter((s) => s.rating >= 4.5 && !s.premium)
        .sort((a, b) => b.installs - a.installs)
        .slice(0, 4),
    []
  );

  const freeCount = filtered.filter((s) => s.price === 0).length;
  const priceRange = filtered.length > 0
    ? { min: Math.min(...filtered.map((s) => s.price)), max: Math.max(...filtered.map((s) => s.price)) }
    : { min: 0, max: 0 };

  const sidebarContent = (
    <>
      <FilterSection title="Category">
        {categories.map((cat) => (
          <Checkbox
            key={cat}
            checked={selectedCategories.includes(cat)}
            onChange={() => toggleCategory(cat)}
            label={cat}
          />
        ))}
      </FilterSection>

      <FilterSection title="Compatibility">
        {compatibilities.map((comp) => (
          <Checkbox
            key={comp}
            checked={selectedCompatibility.includes(comp)}
            onChange={() => toggleCompatibility(comp)}
            label={comp}
          />
        ))}
      </FilterSection>

      <FilterSection title="Author type">
        {authorTypes.map((type) => (
          <Radio
            key={type}
            checked={selectedAuthorType === type}
            onChange={() => setSelectedAuthorType(type)}
            label={type}
          />
        ))}
      </FilterSection>

      <FilterSection title="Price">
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-[13px] text-[#888] group-hover:text-[#ccc] transition-colors">
            Free only
          </span>
          <Toggle checked={freeOnly} onChange={() => setFreeOnly(!freeOnly)} />
        </label>
      </FilterSection>

      <FilterSection title="Rating">
        <div className="flex gap-2">
          <button
            onClick={() => setMinRating(minRating === 4 ? 0 : 4)}
            className={`px-3 py-1 rounded-full text-[12px] font-mono border transition-all duration-150 ${
              minRating === 4
                ? "bg-white text-black border-white"
                : "border-[rgba(255,255,255,0.1)] text-[#888] hover:border-[rgba(255,255,255,0.2)]"
            }`}
          >
            4★+
          </button>
          <button
            onClick={() => setMinRating(minRating === 3 ? 0 : 3)}
            className={`px-3 py-1 rounded-full text-[12px] font-mono border transition-all duration-150 ${
              minRating === 3
                ? "bg-white text-black border-white"
                : "border-[rgba(255,255,255,0.1)] text-[#888] hover:border-[rgba(255,255,255,0.2)]"
            }`}
          >
            3★+
          </button>
        </div>
      </FilterSection>
    </>
  );

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-black">

      {/* ─── HERO SECTION ─── */}
      <section className="relative max-w-[1400px] mx-auto px-6 lg:px-8 pt-12 pb-14 min-h-[320px] overflow-hidden">
        {/* Hero background image */}
        <div className="absolute top-0 -right-[-20%] w-[45%] h-full hidden lg:block">
          <Image
            src="/skills-hero.jpeg"
            alt="Robot with AI skills being installed"
            fill
            className="object-cover object-center opacity-50"
            sizes="55vw"
            priority
          />
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-8">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#c4484f] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c4484f]" />
              AI Skills Store
            </span>
            <h1 className="text-[40px] sm:text-[56px] font-bold tracking-[-0.04em] leading-[1.05]">
              Store{" "}
              <span className="text-[#c4484f]">Skills</span>
            </h1>
            <p className="text-[16px] text-[#888] mt-4 max-w-[480px] leading-relaxed">
              200+ AI modules from verified publishers. Extend your robot with navigation, vision, language, and industrial automation.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-8">
              <StatPill value={`${skills.length}`} label="Skills" accent />
              <StatPill value={`${categories.length}`} label="Categories" />
              <StatPill value={`${freeCount}`} label="Free" accent />
              <StatPill value="4.9★" label="Avg Rating" />
            </div>
          </div>

          {/* Featured skill card */}
          {editorPicks[0] && (
            <div className="w-full lg:w-[320px] shrink-0 rounded-2xl bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-[rgba(255,255,255,0.07)] p-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444] block mb-3">
                Top Skill
              </span>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#151515] border border-[rgba(255,255,255,0.07)] flex items-center justify-center">
                  <span className="font-mono text-[16px] text-[#888]">{editorPicks[0].icon}</span>
                </div>
                <div>
                  <span className="text-[15px] font-medium text-[#f0f0f8] block">{editorPicks[0].name}</span>
                  <span className="font-mono text-[11px] text-[#444]">{editorPicks[0].author}</span>
                </div>
              </div>
              <p className="text-[13px] text-[#888] leading-relaxed line-clamp-2 mb-4">
                {editorPicks[0].description}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[20px] font-bold text-[#c4484f]">
                  {editorPicks[0].price === 0 ? "Free" : `€${editorPicks[0].price}/mo`}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-[#f0f0f8]">
                    {"★".repeat(Math.floor(editorPicks[0].rating))}
                  </span>
                  <span className="font-mono text-[11px] text-[#444]">
                    {(editorPicks[0].installs / 1000).toFixed(1)}k
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── SEARCH BAR ─── */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-6">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search input */}
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills by name, category, or author..."
              className="w-full pl-11 pr-4 py-3 bg-[#111] border border-[rgba(255,255,255,0.07)] rounded-xl text-[14px] text-[#f0f0f8] placeholder:text-[#444] outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors"
            />
          </div>

          {/* Category quick filters */}
          <div className="hidden lg:flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3.5 py-2.5 rounded-xl text-[13px] font-mono transition-all duration-150 border ${
                  selectedCategories.includes(cat)
                    ? "bg-[#7e1c26] text-white border-[#7e1c26]"
                    : "bg-[#111] text-[#888] border-[rgba(255,255,255,0.07)] hover:text-white hover:border-[rgba(255,255,255,0.14)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search button */}
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#151515] border border-[rgba(255,255,255,0.07)] text-[14px] text-[#888] hover:text-white hover:bg-[#7e1c26] hover:border-[#7e1c26] transition-all duration-200">
            <Search size={14} />
            Search
          </button>
        </div>
      </section>

      {/* ─── RESULTS BAR ─── */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[12px] text-[#c4484f]">
              {filtered.length} skills found
            </span>
            {priceRange.max > 0 && (
              <span className="font-mono text-[12px] text-[#888]">
                {priceRange.min === 0 ? "Free" : `€${priceRange.min}`} – €{priceRange.max}/mo
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="appearance-none bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 pr-8 text-[13px] text-[#888] outline-none focus:border-[rgba(255,255,255,0.2)] cursor-pointer transition-colors"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={12}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#444] pointer-events-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT (sidebar + grid) ─── */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-16">
        <div className="flex gap-6">

          {/* Sidebar */}
          <aside className="hidden lg:block w-[220px] shrink-0">
            <div className="sticky top-[84px] rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] overflow-hidden">
              <div className="p-4 border-b border-[rgba(255,255,255,0.07)]">
                <span className="text-[15px] font-bold text-[#f0f0f8]">Filter</span>
              </div>
              {sidebarContent}
            </div>
          </aside>

          {/* Mobile filter toggle */}
          <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-[13px] text-[#888] hover:text-white transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
          </div>

          {/* Mobile filter panel */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 lg:hidden" onClick={() => setMobileFiltersOpen(false)}>
              <div
                className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto bg-[#0a0a0a] border-t border-[rgba(255,255,255,0.1)] rounded-t-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-[#0a0a0a] p-4 border-b border-[rgba(255,255,255,0.07)] flex items-center justify-between">
                  <span className="text-[15px] font-bold text-[#f0f0f8]">Filter</span>
                  <button onClick={() => setMobileFiltersOpen(false)} className="text-[#888] hover:text-white text-[13px]">
                    Close
                  </button>
                </div>
                {sidebarContent}
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {/* Editor's picks */}
            <div className="mb-10">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-4">
                Most Popular
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {editorPicks.map((skill) => (
                  <SkillCard key={`pick-${skill.id}`} skill={skill} featured />
                ))}
              </div>
            </div>

            {/* All skills */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold">
                {filtered.length} Skills
              </span>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {filtered.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] flex items-center justify-center mb-4">
                  <Search size={20} className="text-[#444]" />
                </div>
                <p className="text-[15px] text-[#888] mb-1">No skills found</p>
                <p className="text-[13px] text-[#444]">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

function StatPill({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className={`text-[20px] font-bold tracking-tight ${accent ? "text-[#e8c4c4]" : "text-white"}`}>
        {value}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-wider text-[#555]">{label}</span>
    </div>
  );
}
