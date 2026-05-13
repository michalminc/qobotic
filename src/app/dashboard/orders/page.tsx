"use client";

import { Package, Truck, CheckCircle2, Clock } from "lucide-react";

const MOCK_ORDERS = [
  {
    id: "QBT-KX8F2A",
    date: "Mar 15, 2026",
    robot: "T3 Companion",
    brand: "Booster",
    type: "Purchase",
    total: 45000,
    status: "delivered",
    skills: ["English Pro", "Dance Routines"],
    tracking: "DHL-9283746501",
    deliveryDate: "Mar 22, 2026",
  },
  {
    id: "QBT-J7M3PQ",
    date: "Feb 28, 2026",
    robot: "PM-01",
    brand: "Magic Lab",
    type: "Purchase",
    total: 98000,
    status: "in_transit",
    skills: ["SLAM Navigation", "Object Detection Pro"],
    tracking: "DPD-1847362950",
    deliveryDate: "Apr 2, 2026",
  },
  {
    id: "QBT-R4N9WX",
    date: "Jan 12, 2026",
    robot: "X2 Ultra",
    brand: "Agibot",
    type: "Purchase",
    total: 125000,
    status: "delivered",
    skills: ["Face Recognition", "Brand Host", "Precision Welding"],
    tracking: "FDX-5738291640",
    deliveryDate: "Jan 20, 2026",
  },
];

const STATUS_CONFIG = {
  delivered: { label: "Delivered", icon: CheckCircle2, color: "text-[#22c55e]", bg: "bg-[rgba(34,197,94,0.1)]", border: "border-[rgba(34,197,94,0.2)]" },
  in_transit: { label: "In Transit", icon: Truck, color: "text-[#5b9bf5]", bg: "bg-[rgba(59,130,246,0.1)]", border: "border-[rgba(59,130,246,0.2)]" },
  processing: { label: "Processing", icon: Clock, color: "text-[#f59e0b]", bg: "bg-[rgba(245,158,11,0.1)]", border: "border-[rgba(245,158,11,0.2)]" },
};

export default function OrdersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[28px] font-bold tracking-[-0.03em]">Purchases</h1>
        <p className="text-[14px] text-[#888] mt-1">{MOCK_ORDERS.length} orders · €{MOCK_ORDERS.reduce((s, o) => s + o.total, 0).toLocaleString()} total</p>
      </div>

      <div className="space-y-4">
        {MOCK_ORDERS.map((order) => {
          const sc = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.processing;
          const StatusIcon = sc.icon;
          return (
            <div key={order.id} className="rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] overflow-hidden">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-[rgba(255,255,255,0.04)]">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${sc.bg} flex items-center justify-center`}>
                    <StatusIcon size={14} className={sc.color} />
                  </div>
                  <div>
                    <span className="font-mono text-[12px] text-[#888] block">{order.id}</span>
                    <span className="font-mono text-[10px] text-[#444]">{order.date}</span>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border ${sc.bg} ${sc.color} ${sc.border}`}>
                  {sc.label}
                </span>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-[18px] font-bold text-[#f0f0f8]">{order.robot}</h3>
                    <span className="font-mono text-[11px] text-[#555] block mt-0.5">{order.brand} · {order.type}</span>
                    {order.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {order.skills.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded-full bg-[#111] border border-[rgba(255,255,255,0.07)] font-mono text-[10px] text-[#555]">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-[22px] font-bold text-white block">€{order.total.toLocaleString()}</span>
                    {order.tracking && (
                      <span className="font-mono text-[10px] text-[#555] block mt-1">
                        Tracking: {order.tracking}
                      </span>
                    )}
                  </div>
                </div>

                {/* Delivery info */}
                {order.status === "in_transit" && (
                  <div className="mt-4 p-3 rounded-xl bg-[rgba(59,130,246,0.05)] border border-[rgba(59,130,246,0.1)]">
                    <span className="font-mono text-[11px] text-[#5b9bf5]">
                      Estimated delivery: {order.deliveryDate}
                    </span>
                  </div>
                )}

                {/* Warranty info for delivered */}
                {order.status === "delivered" && (
                  <div className="mt-4 flex items-center gap-4">
                    <span className="px-3 py-1 rounded-lg bg-[#111] border border-[rgba(255,255,255,0.07)] font-mono text-[10px] text-[#555]">
                      Warranty: 24 months
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#111] border border-[rgba(255,255,255,0.07)] font-mono text-[10px] text-[#555]">
                      Delivered: {order.deliveryDate}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
