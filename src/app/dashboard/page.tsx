"use client";

import Link from "next/link";
import { CalendarClock, Package, CreditCard, ArrowRight, Bot, Zap } from "lucide-react";

const MOCK_STATS = {
  activeRentals: 2,
  activeSubscriptions: 1,
  totalOrders: 4,
  totalSpent: 28450,
  nextPayment: "Apr 15, 2026",
  nextPaymentAmount: 4499,
};

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold tracking-[-0.03em]">Dashboard</h1>
        <p className="text-[14px] text-[#888] mt-1">Welcome back. Here&apos;s your fleet overview.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard icon={Bot} label="Active Robots" value={String(MOCK_STATS.activeRentals + MOCK_STATS.activeSubscriptions)} accent />
        <StatCard icon={CalendarClock} label="Subscriptions" value={String(MOCK_STATS.activeSubscriptions)} />
        <StatCard icon={Package} label="Total Orders" value={String(MOCK_STATS.totalOrders)} />
        <StatCard icon={CreditCard} label="Next Payment" value={MOCK_STATS.nextPayment} sub={`€${MOCK_STATS.nextPaymentAmount.toLocaleString()}`} />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <Link
          href="/dashboard/rentals"
          className="group flex items-center justify-between p-6 rounded-2xl bg-gradient-to-b from-[rgba(126,28,38,0.08)] to-[#0a0a0a] border border-[rgba(126,28,38,0.15)] hover:border-[rgba(126,28,38,0.3)] transition-all"
        >
          <div>
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-1">
              Rentals & Subscriptions
            </span>
            <span className="text-[13px] text-[#888]">
              {MOCK_STATS.activeRentals} active rentals, {MOCK_STATS.activeSubscriptions} subscription
            </span>
          </div>
          <ArrowRight size={16} className="text-[#555] group-hover:text-white group-hover:translate-x-1 transition-all" />
        </Link>
        <Link
          href="/dashboard/orders"
          className="group flex items-center justify-between p-6 rounded-2xl bg-gradient-to-b from-[rgba(255,255,255,0.03)] to-[#0a0a0a] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)] transition-all"
        >
          <div>
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-1">
              Purchases
            </span>
            <span className="text-[13px] text-[#888]">
              {MOCK_STATS.totalOrders} orders · €{MOCK_STATS.totalSpent.toLocaleString()} total
            </span>
          </div>
          <ArrowRight size={16} className="text-[#555] group-hover:text-white group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      {/* Recent activity */}
      <div>
        <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-4">
          Recent Activity
        </span>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] overflow-hidden">
          {[
            { date: "Mar 24, 2026", action: "Subscription started", detail: "X2 Ultra · Monthly plan", type: "subscribe" },
            { date: "Mar 20, 2026", action: "Rental completed", detail: "H1 Pro · 14 days", type: "rent" },
            { date: "Mar 15, 2026", action: "Robot purchased", detail: "T3 Companion · €45,000", type: "buy" },
            { date: "Mar 10, 2026", action: "Skill installed", detail: "SLAM Navigation on X2 Ultra", type: "skill" },
            { date: "Mar 5, 2026", action: "Rental started", detail: "Go2 Pro · 7 days", type: "rent" },
          ].map((activity, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-5 py-4 ${
                i > 0 ? "border-t border-[rgba(255,255,255,0.04)]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  activity.type === "subscribe" ? "bg-[rgba(59,130,246,0.1)]" :
                  activity.type === "rent" ? "bg-[rgba(126,28,38,0.1)]" :
                  activity.type === "buy" ? "bg-[rgba(255,255,255,0.05)]" :
                  "bg-[rgba(34,197,94,0.1)]"
                }`}>
                  {activity.type === "skill" ? <Zap size={14} className="text-[#22c55e]" /> :
                   activity.type === "subscribe" ? <CalendarClock size={14} className="text-[#5b9bf5]" /> :
                   activity.type === "rent" ? <CalendarClock size={14} className="text-[#c4484f]" /> :
                   <Package size={14} className="text-[#888]" />}
                </div>
                <div>
                  <span className="text-[13px] text-[#f0f0f8] block">{activity.action}</span>
                  <span className="font-mono text-[11px] text-[#555]">{activity.detail}</span>
                </div>
              </div>
              <span className="font-mono text-[11px] text-[#444] shrink-0">{activity.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, accent }: { icon: React.ElementType; label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]">
      <Icon size={18} className={accent ? "text-[#c4484f]" : "text-[#555]"} />
      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444] block mt-3">{label}</span>
      <span className={`text-[22px] font-bold block mt-1 ${accent ? "text-[#c4484f]" : "text-[#f0f0f8]"}`}>{value}</span>
      {sub && <span className="font-mono text-[11px] text-[#555] block mt-0.5">{sub}</span>}
    </div>
  );
}
