"use client";

import Link from "next/link";
import { Bot, ClipboardList, Wallet, TrendingUp, ArrowRight, ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react";

const STATS = {
  activeRobots: 12,
  totalBookings: 47,
  monthlyRevenue: 84200,
  revenueChange: 12.5,
  occupancyRate: 78,
  pendingOrders: 3,
  avgRating: 4.8,
  totalEarnings: 412800,
};

const RECENT_ORDERS = [
  { id: "QBT-A1X", customer: "TechFlow GmbH", robot: "X2 Ultra", type: "subscribe", plan: "Monthly", amount: 17980, status: "active", date: "Mar 25" },
  { id: "QBT-B2Y", customer: "AutoLine AG", robot: "H1 Pro", type: "rent", days: 14, amount: 10486, status: "confirmed", date: "Mar 24" },
  { id: "QBT-C3Z", customer: "MediBot Inc.", robot: "X2 Ultra", type: "buy", days: null, amount: 125000, status: "processing", date: "Mar 23" },
  { id: "QBT-D4W", customer: "LogiCorp", robot: "RX-500", type: "subscribe", plan: "Quarterly", amount: 10782, status: "active", date: "Mar 22" },
  { id: "QBT-E5V", customer: "EventPro", robot: "T3 Companion", type: "rent", days: 3, amount: 897, status: "completed", date: "Mar 20" },
];

const STATUS_STYLES: Record<string, string> = {
  active: "bg-[rgba(34,197,94,0.1)] text-[#22c55e] border-[rgba(34,197,94,0.2)]",
  confirmed: "bg-[rgba(59,130,246,0.1)] text-[#5b9bf5] border-[rgba(59,130,246,0.2)]",
  processing: "bg-[rgba(245,158,11,0.1)] text-[#f59e0b] border-[rgba(245,158,11,0.2)]",
  completed: "bg-[rgba(255,255,255,0.03)] text-[#555] border-[rgba(255,255,255,0.07)]",
  cancelled: "bg-[rgba(126,28,38,0.1)] text-[#c4484f] border-[rgba(126,28,38,0.2)]",
};

export default function PartnerOverview() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold tracking-[-0.03em]">Partner Dashboard</h1>
          <p className="text-[14px] text-[#888] mt-1">Welcome back, Agibot Corp.</p>
        </div>
        <Link
          href="/partner/robots/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-[#7e1c26] hover:bg-[#962330] rounded-full transition-all"
        >
          Add Robot <ArrowRight size={14} />
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Bot} label="Active Robots" value={String(STATS.activeRobots)} sub={`${STATS.occupancyRate}% occupied`} />
        <StatCard icon={ClipboardList} label="Total Bookings" value={String(STATS.totalBookings)} sub={`${STATS.pendingOrders} pending`} accent />
        <StatCard
          icon={Wallet}
          label="Monthly Revenue"
          value={`€${(STATS.monthlyRevenue / 1000).toFixed(1)}k`}
          sub={`${STATS.revenueChange > 0 ? "+" : ""}${STATS.revenueChange}% vs last month`}
          trend={STATS.revenueChange}
        />
        <StatCard icon={TrendingUp} label="Total Earnings" value={`€${(STATS.totalEarnings / 1000).toFixed(0)}k`} sub={`★ ${STATS.avgRating} avg rating`} />
      </div>

      {/* Revenue chart placeholder */}
      <div className="rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold">Revenue Overview</span>
          <div className="flex gap-2">
            {["7d", "30d", "90d", "1y"].map((period, i) => (
              <button
                key={period}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-all ${
                  i === 1 ? "bg-[#7e1c26] text-white" : "text-[#555] hover:text-white"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        {/* Simple bar chart */}
        <div className="flex items-end gap-2 h-[160px]">
          {[45, 62, 38, 71, 55, 84, 67, 92, 78, 65, 88, 74, 96, 82, 70, 58, 90, 85, 72, 95, 68, 80, 88, 76, 92, 84, 78, 86, 90, 84].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-sm transition-all duration-300"
                style={{
                  height: `${val * 1.5}px`,
                  background: i >= 27 ? "#7e1c26" : "linear-gradient(to top, #1a1a1a, #2a2a2a)",
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-mono text-[10px] text-[#333]">Feb 25</span>
          <span className="font-mono text-[10px] text-[#333]">Mar 25</span>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <QuickLink href="/partner/robots" label="Manage Fleet" desc={`${STATS.activeRobots} robots listed`} icon={Bot} />
        <QuickLink href="/partner/orders" label="Orders & Bookings" desc={`${STATS.pendingOrders} pending review`} icon={ClipboardList} />
        <QuickLink href="/partner/earnings" label="Earnings & Payouts" desc="Next payout: Apr 1" icon={Wallet} />
      </div>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold">Recent Orders</span>
          <Link href="/partner/orders" className="text-[13px] text-[#c4484f] hover:text-[#e06068] transition-colors">
            View all &rarr;
          </Link>
        </div>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] overflow-hidden">
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[1fr_1fr_100px_100px_100px_80px] gap-4 px-5 py-3 border-b border-[rgba(255,255,255,0.04)]">
            {["Customer", "Robot", "Type", "Amount", "Date", "Status"].map((h) => (
              <span key={h} className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444]">{h}</span>
            ))}
          </div>
          {/* Rows */}
          {RECENT_ORDERS.map((order, i) => (
            <div
              key={order.id}
              className={`grid grid-cols-1 sm:grid-cols-[1fr_1fr_100px_100px_100px_80px] gap-2 sm:gap-4 px-5 py-4 ${
                i > 0 ? "border-t border-[rgba(255,255,255,0.04)]" : ""
              } hover:bg-[#111]/50 transition-colors`}
            >
              <div>
                <span className="text-[13px] text-[#f0f0f8] block">{order.customer}</span>
                <span className="font-mono text-[10px] text-[#444] sm:hidden">{order.id}</span>
              </div>
              <span className="text-[13px] text-[#888]">{order.robot}</span>
              <span className="font-mono text-[11px] text-[#888] capitalize">
                {order.type}{order.type === "rent" ? ` · ${order.days}d` : order.type === "subscribe" ? ` · ${order.plan}` : ""}
              </span>
              <span className="font-mono text-[13px] text-[#f0f0f8]">€{order.amount.toLocaleString()}</span>
              <span className="font-mono text-[11px] text-[#555]">{order.date}</span>
              <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border w-fit ${STATUS_STYLES[order.status] ?? ""}`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, accent, trend }: {
  icon: React.ElementType; label: string; value: string; sub?: string; accent?: boolean; trend?: number;
}) {
  return (
    <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]">
      <div className="flex items-center justify-between">
        <Icon size={18} className={accent ? "text-[#c4484f]" : "text-[#555]"} />
        {trend !== undefined && (
          <span className={`flex items-center gap-0.5 text-[11px] font-mono ${trend > 0 ? "text-[#22c55e]" : "text-[#c4484f]"}`}>
            {trend > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444] block mt-3">{label}</span>
      <span className={`text-[22px] font-bold block mt-1 ${accent ? "text-[#c4484f]" : "text-[#f0f0f8]"}`}>{value}</span>
      {sub && <span className="font-mono text-[11px] text-[#555] block mt-0.5">{sub}</span>}
    </div>
  );
}

function QuickLink({ href, label, desc, icon: Icon }: { href: string; label: string; desc: string; icon: React.ElementType }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between p-5 rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)] transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] flex items-center justify-center">
          <Icon size={16} className="text-[#888]" />
        </div>
        <div>
          <span className="text-[13px] font-medium text-[#f0f0f8] block">{label}</span>
          <span className="font-mono text-[11px] text-[#555]">{desc}</span>
        </div>
      </div>
      <ArrowRight size={14} className="text-[#444] group-hover:text-white group-hover:translate-x-1 transition-all" />
    </Link>
  );
}
