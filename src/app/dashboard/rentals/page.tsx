"use client";

import Link from "next/link";
import { CalendarClock, Pause, Play, ArrowRight, X } from "lucide-react";

const MOCK_RENTALS = [
  { id: "r1", robot: "Go2 Pro", brand: "Unitree", type: "rent" as const, status: "active", startDate: "Mar 20, 2026", endDate: "Mar 27, 2026", days: 7, dailyRate: 449, total: 3143 },
  { id: "r2", robot: "H1 Pro", brand: "Unitree", type: "rent" as const, status: "completed", startDate: "Mar 5, 2026", endDate: "Mar 19, 2026", days: 14, dailyRate: 749, total: 10486 },
];

const MOCK_SUBS = [
  { id: "s1", robot: "X2 Ultra", brand: "Agibot", plan: "Monthly", status: "active", startDate: "Mar 24, 2026", monthlyRate: 17980, nextBilling: "Apr 24, 2026" },
  { id: "s2", robot: "RX-500", brand: "Delta Robots", plan: "Quarterly (-10%)", status: "paused", startDate: "Feb 1, 2026", monthlyRate: 10782, nextBilling: "—" },
];

export default function RentalsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold tracking-[-0.03em]">Rentals & Subscriptions</h1>
          <p className="text-[14px] text-[#888] mt-1">Manage your active robots</p>
        </div>
        <Link
          href="/robots"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-[#7e1c26] hover:bg-[#962330] rounded-full transition-all"
        >
          Add robot <ArrowRight size={14} />
        </Link>
      </div>

      {/* Subscriptions */}
      <div className="mb-10">
        <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-4">
          Subscriptions ({MOCK_SUBS.length})
        </span>
        <div className="space-y-3">
          {MOCK_SUBS.map((sub) => (
            <div key={sub.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-b from-[rgba(59,130,246,0.04)] to-[#0a0a0a] border border-[rgba(59,130,246,0.12)]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[16px] font-bold text-[#f0f0f8]">{sub.robot}</span>
                  <StatusBadge status={sub.status} />
                </div>
                <span className="font-mono text-[11px] text-[#555] block">{sub.brand} · {sub.plan} · Since {sub.startDate}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="font-mono text-[18px] font-bold text-[#c4484f] block">€{sub.monthlyRate.toLocaleString()}</span>
                  <span className="font-mono text-[10px] text-[#555]">/month · Next: {sub.nextBilling}</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg border border-[rgba(255,255,255,0.07)] text-[#888] hover:text-white hover:bg-[#111] transition-all" title={sub.status === "paused" ? "Resume" : "Pause"}>
                    {sub.status === "paused" ? <Play size={14} /> : <Pause size={14} />}
                  </button>
                  <button className="p-2 rounded-lg border border-[rgba(255,255,255,0.07)] text-[#888] hover:text-[#c4484f] hover:border-[rgba(126,28,38,0.2)] transition-all" title="Cancel">
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Short-term Rentals */}
      <div>
        <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-4">
          Short-term Rentals ({MOCK_RENTALS.length})
        </span>
        <div className="space-y-3">
          {MOCK_RENTALS.map((rental) => (
            <div key={rental.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[16px] font-bold text-[#f0f0f8]">{rental.robot}</span>
                  <StatusBadge status={rental.status} />
                </div>
                <span className="font-mono text-[11px] text-[#555] block">
                  {rental.brand} · {rental.days} days · {rental.startDate} → {rental.endDate}
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-[18px] font-bold text-white block">€{rental.total.toLocaleString()}</span>
                <span className="font-mono text-[10px] text-[#555]">€{rental.dailyRate}/day × {rental.days}d</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    active: "bg-[rgba(34,197,94,0.1)] text-[#22c55e] border-[rgba(34,197,94,0.2)]",
    paused: "bg-[rgba(245,158,11,0.1)] text-[#f59e0b] border-[rgba(245,158,11,0.2)]",
    completed: "bg-[rgba(255,255,255,0.03)] text-[#555] border-[rgba(255,255,255,0.07)]",
    cancelled: "bg-[rgba(126,28,38,0.1)] text-[#c4484f] border-[rgba(126,28,38,0.2)]",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${styles[status as keyof typeof styles] ?? styles.completed}`}>
      {status}
    </span>
  );
}
