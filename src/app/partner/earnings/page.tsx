"use client";

import { Wallet, ArrowUpRight, Calendar, Download } from "lucide-react";

const PAYOUTS = [
  { id: "PAY-001", date: "Mar 1, 2026", amount: 28400, status: "paid", method: "Bank Transfer", robots: 4 },
  { id: "PAY-002", date: "Feb 1, 2026", amount: 24800, status: "paid", method: "Bank Transfer", robots: 4 },
  { id: "PAY-003", date: "Jan 1, 2026", amount: 31200, status: "paid", method: "Bank Transfer", robots: 5 },
  { id: "PAY-004", date: "Dec 1, 2025", amount: 19600, status: "paid", method: "Bank Transfer", robots: 3 },
];

const BREAKDOWN = [
  { label: "Rental income", amount: 42800, pct: 51 },
  { label: "Subscription income", amount: 28760, pct: 34 },
  { label: "Robot sales", amount: 12640, pct: 15 },
];

export default function PartnerEarningsPage() {
  const totalEarnings = 412800;
  const thisMonth = 84200;
  const pendingPayout = 28400;
  const nextPayoutDate = "Apr 1, 2026";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold tracking-[-0.03em]">Earnings</h1>
          <p className="text-[14px] text-[#888] mt-1">Track your revenue and payouts</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] text-[#888] border border-[rgba(255,255,255,0.07)] hover:text-white hover:border-[rgba(255,255,255,0.14)] rounded-full transition-all">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-6 rounded-2xl bg-gradient-to-b from-[rgba(126,28,38,0.08)] to-[#0a0a0a] border border-[rgba(126,28,38,0.15)]">
          <Wallet size={18} className="text-[#c4484f]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444] block mt-3">Total Earnings</span>
          <span className="text-[28px] font-bold text-[#c4484f] block mt-1">€{totalEarnings.toLocaleString()}</span>
          <span className="font-mono text-[11px] text-[#555]">All time</span>
        </div>
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]">
          <ArrowUpRight size={18} className="text-[#22c55e]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444] block mt-3">This Month</span>
          <span className="text-[28px] font-bold text-[#f0f0f8] block mt-1">€{thisMonth.toLocaleString()}</span>
          <span className="font-mono text-[11px] text-[#22c55e]">+12.5% vs last month</span>
        </div>
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]">
          <Calendar size={18} className="text-[#5b9bf5]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444] block mt-3">Next Payout</span>
          <span className="text-[28px] font-bold text-[#f0f0f8] block mt-1">€{pendingPayout.toLocaleString()}</span>
          <span className="font-mono text-[11px] text-[#555]">{nextPayoutDate}</span>
        </div>
      </div>

      {/* Revenue breakdown */}
      <div className="rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] p-6 mb-8">
        <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-5">
          Revenue Breakdown (This Month)
        </span>
        <div className="space-y-4">
          {BREAKDOWN.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[13px] text-[#888]">{item.label}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[13px] text-[#f0f0f8]">€{item.amount.toLocaleString()}</span>
                  <span className="font-mono text-[11px] text-[#555] w-10 text-right">{item.pct}%</span>
                </div>
              </div>
              <div className="h-2 bg-[#151515] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#7e1c26] to-[#c4484f] transition-all duration-500"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payout history */}
      <div>
        <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-4">
          Payout History
        </span>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] overflow-hidden">
          {/* Header */}
          <div className="hidden sm:grid grid-cols-[1fr_120px_120px_100px_80px] gap-4 px-5 py-3 border-b border-[rgba(255,255,255,0.04)]">
            {["Payout ID", "Date", "Amount", "Robots", "Status"].map((h) => (
              <span key={h} className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444]">{h}</span>
            ))}
          </div>
          {PAYOUTS.map((payout, i) => (
            <div
              key={payout.id}
              className={`grid grid-cols-1 sm:grid-cols-[1fr_120px_120px_100px_80px] gap-2 sm:gap-4 px-5 py-4 ${
                i > 0 ? "border-t border-[rgba(255,255,255,0.04)]" : ""
              }`}
            >
              <span className="font-mono text-[13px] text-[#f0f0f8]">{payout.id}</span>
              <span className="font-mono text-[13px] text-[#888]">{payout.date}</span>
              <span className="font-mono text-[15px] font-bold text-white">€{payout.amount.toLocaleString()}</span>
              <span className="font-mono text-[13px] text-[#888]">{payout.robots} robots</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[rgba(34,197,94,0.1)] text-[#22c55e] border border-[rgba(34,197,94,0.2)] w-fit">
                {payout.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
