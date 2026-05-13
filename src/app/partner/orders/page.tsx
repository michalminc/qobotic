"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Check, X, MessageSquare, Search, ChevronDown } from "lucide-react";

const ORDERS = [
  { id: "QBT-A1X", customer: "TechFlow GmbH", email: "ops@techflow.de", robot: "X2 Ultra", type: "subscribe", plan: "Monthly", amount: 17980, recurring: true, status: "active", date: "Mar 25, 2026", skills: ["SLAM Navigation", "Object Detection Pro"] },
  { id: "QBT-B2Y", customer: "AutoLine AG", email: "fleet@autoline.com", robot: "H1 Pro", type: "rent", days: 14, amount: 10486, recurring: false, status: "pending", date: "Mar 24, 2026", skills: ["Precision Welding"] },
  { id: "QBT-C3Z", customer: "MediBot Inc.", email: "orders@medibot.io", robot: "X2 Ultra #2", type: "buy", days: null, amount: 125000, recurring: false, status: "pending", date: "Mar 23, 2026", skills: ["Face Recognition", "English Pro"] },
  { id: "QBT-D4W", customer: "LogiCorp", email: "tech@logicorp.eu", robot: "RX-500", type: "subscribe", plan: "Quarterly", amount: 10782, recurring: true, status: "active", date: "Mar 22, 2026", skills: ["Pick & Place", "Outdoor Terrain"] },
  { id: "QBT-E5V", customer: "EventPro", email: "hello@eventpro.com", robot: "T3 Companion", type: "rent", days: 3, amount: 897, recurring: false, status: "completed", date: "Mar 20, 2026", skills: ["Dance Routines"] },
  { id: "QBT-F6U", customer: "SecureMax", email: "ops@securemax.de", robot: "Go2 Pro", type: "rent", days: 7, amount: 3143, recurring: false, status: "cancelled", date: "Mar 18, 2026", skills: [] },
  { id: "QBT-G7T", customer: "WarehousePro", email: "mgr@whpro.com", robot: "RX-500", type: "buy", days: null, amount: 98000, recurring: false, status: "shipped", date: "Mar 15, 2026", skills: ["SLAM Navigation", "Pick & Place", "Object Detection Pro"] },
];

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  active: { bg: "bg-[rgba(34,197,94,0.1)]", text: "text-[#22c55e]", border: "border-[rgba(34,197,94,0.2)]" },
  pending: { bg: "bg-[rgba(245,158,11,0.1)]", text: "text-[#f59e0b]", border: "border-[rgba(245,158,11,0.2)]" },
  completed: { bg: "bg-[rgba(255,255,255,0.03)]", text: "text-[#555]", border: "border-[rgba(255,255,255,0.07)]" },
  cancelled: { bg: "bg-[rgba(126,28,38,0.1)]", text: "text-[#c4484f]", border: "border-[rgba(126,28,38,0.2)]" },
  shipped: { bg: "bg-[rgba(59,130,246,0.1)]", text: "text-[#5b9bf5]", border: "border-[rgba(59,130,246,0.2)]" },
};

const TYPE_LABELS: Record<string, string> = {
  buy: "Purchase",
  rent: "Short-term Rental",
  subscribe: "Subscription",
};

type SortKey = "date" | "amount" | "customer";
const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "date", label: "Newest" },
  { value: "amount", label: "Amount" },
  { value: "customer", label: "Customer" },
];

export default function PartnerOrdersPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("date");

  const filtered = useMemo(() => {
    let result = filter === "all" ? [...ORDERS] : ORDERS.filter((o) => o.status === filter);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((o) =>
        o.customer.toLowerCase().includes(q) ||
        o.robot.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      if (sortBy === "customer") return a.customer.localeCompare(b.customer);
      return 0; // date — keep original order (already sorted by date desc)
    });

    return result;
  }, [filter, search, sortBy]);

  const pendingCount = ORDERS.filter((o) => o.status === "pending").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[28px] font-bold tracking-[-0.03em]">Orders & Bookings</h1>
        <p className="text-[14px] text-[#888] mt-1">
          {ORDERS.length} total · {pendingCount} pending approval
        </p>
      </div>

      {/* Search + Sort bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer, robot, order ID, or email..."
            className="w-full pl-11 pr-4 py-3 bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] rounded-xl text-[14px] text-[#f0f0f8] placeholder:text-[#444] outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors"
          />
        </div>
        <div className="relative shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="appearance-none bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] rounded-xl px-4 py-3 pr-9 text-[13px] text-[#888] outline-none focus:border-[rgba(255,255,255,0.2)] cursor-pointer transition-colors"
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
          { key: "all", label: "All", count: ORDERS.length },
          { key: "pending", label: "Pending", count: ORDERS.filter((o) => o.status === "pending").length },
          { key: "active", label: "Active", count: ORDERS.filter((o) => o.status === "active").length },
          { key: "shipped", label: "Shipped", count: ORDERS.filter((o) => o.status === "shipped").length },
          { key: "completed", label: "Completed", count: ORDERS.filter((o) => o.status === "completed").length },
          { key: "cancelled", label: "Cancelled", count: ORDERS.filter((o) => o.status === "cancelled").length },
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
            <span className={`text-[10px] ${filter === tab.key ? "text-white/60" : "text-[#444]"}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[12px] text-[#c4484f]">{filtered.length} orders found</span>
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.map((order) => {
          const st = STATUS_STYLES[order.status] ?? STATUS_STYLES.completed;
          return (
            <Link key={order.id} href={`/partner/orders/${order.id}`} className="block rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)] overflow-hidden transition-all">
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${st.bg} ${st.text} ${st.border}`}>
                    {order.status}
                  </span>
                  <span className="font-mono text-[12px] text-[#888]">{order.id}</span>
                  <span className="font-mono text-[11px] text-[#444]">{order.date}</span>
                </div>
                <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                  {order.status === "pending" && (
                    <>
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 text-[12px] font-medium text-[#22c55e] hover:bg-[#22c55e]/20 transition-all">
                        <Check size={13} /> Approve
                      </button>
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#c4484f]/10 border border-[#c4484f]/20 text-[12px] font-medium text-[#c4484f] hover:bg-[#c4484f]/20 transition-all">
                        <X size={13} /> Decline
                      </button>
                    </>
                  )}
                  <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="p-2 rounded-lg text-[#555] hover:text-white hover:bg-[#111] transition-all" title="Message customer">
                    <MessageSquare size={14} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 pb-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[16px] font-bold text-[#f0f0f8]">{order.robot}</span>
                    <span className="px-2 py-0.5 rounded-lg bg-[#111] border border-[rgba(255,255,255,0.07)] font-mono text-[10px] text-[#888]">
                      {TYPE_LABELS[order.type]}
                      {order.type === "rent" ? ` · ${order.days}d` : order.type === "subscribe" ? ` · ${order.plan}` : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[13px] text-[#888]">{order.customer}</span>
                    <span className="font-mono text-[11px] text-[#444]">{order.email}</span>
                  </div>
                  {order.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {order.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-full bg-[#111] border border-[rgba(255,255,255,0.07)] font-mono text-[10px] text-[#555]">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-[20px] font-bold text-white block">€{order.amount.toLocaleString()}</span>
                  {order.recurring && <span className="font-mono text-[10px] text-[#c4484f]">/month · recurring</span>}
                </div>
              </div>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-[15px] text-[#888] mb-1">No orders found</p>
            <p className="text-[13px] text-[#444]">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
