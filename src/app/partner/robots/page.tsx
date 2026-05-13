"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit3, Trash2, Eye, EyeOff, ChevronDown, Search, Loader2 } from "lucide-react";

interface RobotItem {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  type: string;
  sku: string;
  rentalPrice: number;
  buyPrice: number;
  status: string;
  available: boolean;
  published: boolean;
  totalBookings: number;
  totalRevenue: number;
  avgRating: number;
  imageCount: number;
  currentOrder: { id: string; type: string; status: string } | null;
  images?: { url: string }[];
}

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string; label: string }> = {
  AVAILABLE: { bg: "bg-[rgba(34,197,94,0.1)]", text: "text-[#22c55e]", border: "border-[rgba(34,197,94,0.2)]", label: "Available" },
  RENTED: { bg: "bg-[rgba(59,130,246,0.1)]", text: "text-[#5b9bf5]", border: "border-[rgba(59,130,246,0.2)]", label: "Rented" },
  SUBSCRIBED: { bg: "bg-[rgba(168,85,247,0.1)]", text: "text-[#a855f7]", border: "border-[rgba(168,85,247,0.2)]", label: "Subscribed" },
  MAINTENANCE: { bg: "bg-[rgba(245,158,11,0.1)]", text: "text-[#f59e0b]", border: "border-[rgba(245,158,11,0.2)]", label: "Maintenance" },
  SOLD: { bg: "bg-[rgba(255,255,255,0.03)]", text: "text-[#555]", border: "border-[rgba(255,255,255,0.07)]", label: "Sold" },
  DRAFT: { bg: "bg-[rgba(255,255,255,0.03)]", text: "text-[#555]", border: "border-[rgba(255,255,255,0.07)]", label: "Draft" },
};

type SortKey = "name" | "rentalPrice";
const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "rentalPrice", label: "Price" },
];

export default function PartnerRobotsPage() {
  const [robots, setRobots] = useState<RobotItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("name");

  useEffect(() => {
    fetch("/api/partner/robots")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRobots(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = filter === "all" ? [...robots] : robots.filter((r) => r.status === filter.toUpperCase());

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((r) =>
        r.name.toLowerCase().includes(q) ||
        r.sku.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        (r.brand?.toLowerCase().includes(q) ?? false)
      );
    }

    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return b.rentalPrice - a.rentalPrice;
    });

    return result;
  }, [robots, filter, search, sortBy]);

  const totalRevenue = robots.reduce((s, r) => s + r.totalRevenue, 0);

  async function handleDelete(robotId: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this robot?")) return;
    const res = await fetch(`/api/partner/robots/${robotId}`, { method: "DELETE" });
    if (res.ok) {
      setRobots((prev) => prev.filter((r) => r.id !== robotId));
    } else {
      const data = await res.json();
      alert(data.error || "Failed to delete");
    }
  }

  async function handleToggleStatus(robot: RobotItem, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const res = await fetch(`/api/partner/robots/${robot.id}/status`, { method: "PATCH" });
    if (res.ok) {
      const updated = await res.json();
      setRobots((prev) => prev.map((r) => r.id === robot.id ? { ...r, status: updated.status } : r));
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={24} className="animate-spin text-[#888]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[28px] font-bold tracking-[-0.03em]">My Robots</h1>
          <p className="text-[14px] text-[#888] mt-1">{robots.length} robots · €{totalRevenue.toLocaleString()} total revenue</p>
        </div>
        <Link href="/partner/robots/new" className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-[#7e1c26] hover:bg-[#962330] rounded-full transition-all">
          <Plus size={14} /> Add Robot
        </Link>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, SKU, type, or brand..."
            className="w-full pl-11 pr-4 py-3 bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] rounded-xl text-[14px] text-[#f0f0f8] placeholder:text-[#444] outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors"
          />
        </div>
        <div className="relative shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="appearance-none bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] rounded-xl px-4 py-3 pr-9 text-[13px] text-[#888] outline-none cursor-pointer transition-colors"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>Sort: {opt.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] pointer-events-none" />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { key: "all", label: "All", count: robots.length },
          { key: "available", label: "Available", count: robots.filter((r) => r.status === "AVAILABLE").length },
          { key: "rented", label: "Rented", count: robots.filter((r) => r.status === "RENTED").length },
          { key: "maintenance", label: "Maintenance", count: robots.filter((r) => r.status === "MAINTENANCE").length },
          { key: "draft", label: "Draft", count: robots.filter((r) => r.status === "DRAFT").length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-mono transition-all shrink-0 ${
              filter === tab.key
                ? "bg-[#7e1c26] text-white"
                : "bg-[#111] text-[#888] hover:text-white border border-[rgba(255,255,255,0.07)]"
            }`}
          >
            {tab.label}
            {tab.count > 0 && <span className={`text-[10px] ${filter === tab.key ? "text-white/60" : "text-[#444]"}`}>{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[12px] text-[#c4484f]">{filtered.length} robots found</span>
      </div>

      {/* Robot list */}
      <div className="space-y-3">
        {filtered.map((robot) => {
          const st = STATUS_STYLES[robot.status] ?? STATUS_STYLES.AVAILABLE;
          // Try to find first image from the robot data
          const imgUrl = (robot as any).images?.[0]?.url || null;
          return (
            <div key={robot.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)] transition-all">
              {/* Thumbnail */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#111] shrink-0 flex items-center justify-center">
                {imgUrl ? (
                  <Image src={imgUrl} alt={robot.name} fill className="object-cover" sizes="64px" />
                ) : (
                  <span className="font-mono text-[18px] text-[#333]">{robot.name[0]}</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[15px] font-bold text-[#f0f0f8]">{robot.name}</span>
                  {robot.brand && <span className="text-[12px] text-[#666]">{robot.brand}</span>}
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${st.bg} ${st.text} ${st.border}`}>
                    {st.label}
                  </span>
                  {!robot.published && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[rgba(255,255,255,0.03)] text-[#555] border border-[rgba(255,255,255,0.07)]">
                      Unpublished
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-[#555]">{robot.sku}</span>
                  <span className="font-mono text-[11px] text-[#555]">{robot.type}</span>
                  <span className="font-mono text-[11px] text-[#c4484f]">€{robot.rentalPrice}/day</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 shrink-0">
                <div className="text-center">
                  <span className="font-mono text-[14px] font-bold text-[#f0f0f8] block">{robot.totalBookings}</span>
                  <span className="font-mono text-[9px] text-[#444] uppercase">Bookings</span>
                </div>
                <div className="text-center">
                  <span className="font-mono text-[14px] font-bold text-[#f0f0f8] block">€{robot.totalRevenue > 0 ? (robot.totalRevenue / 1000).toFixed(1) + "k" : "0"}</span>
                  <span className="font-mono text-[9px] text-[#444] uppercase">Revenue</span>
                </div>
                <div className="text-center">
                  <span className="font-mono text-[14px] font-bold text-[#f0f0f8] block">★ {robot.avgRating > 0 ? robot.avgRating.toFixed(1) : "—"}</span>
                  <span className="font-mono text-[9px] text-[#444] uppercase">Rating</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <Link href={`/partner/robots/${robot.id}`} className="p-2 rounded-lg text-[#555] hover:text-white hover:bg-[#111] transition-all" title="Edit">
                  <Edit3 size={14} />
                </Link>
                <button onClick={(e) => handleToggleStatus(robot, e)} className="p-2 rounded-lg text-[#555] hover:text-[#f59e0b] hover:bg-[rgba(245,158,11,0.05)] transition-all" title={robot.status === "MAINTENANCE" ? "Set available" : "Set maintenance"}>
                  {robot.status === "MAINTENANCE" ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button onClick={(e) => handleDelete(robot.id, e)} className="p-2 rounded-lg text-[#555] hover:text-[#c4484f] hover:bg-[rgba(126,28,38,0.05)] transition-all" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && !loading && (
          <div className="py-16 text-center">
            <p className="text-[15px] text-[#888] mb-1">{robots.length === 0 ? "No robots yet" : "No robots found"}</p>
            <p className="text-[13px] text-[#444] mb-4">{robots.length === 0 ? "Add your first robot to the marketplace" : "Try adjusting your search or filters"}</p>
            {robots.length === 0 && (
              <Link href="/partner/robots/new" className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-[#7e1c26] hover:bg-[#962330] rounded-full transition-all">
                <Plus size={14} /> Add Robot
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
