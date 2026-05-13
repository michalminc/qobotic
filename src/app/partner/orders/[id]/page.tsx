"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X, MessageSquare, Truck, Package, Calendar, CreditCard, MapPin, Mail, Phone, Building2 } from "lucide-react";

const ORDERS: Record<string, {
  id: string; customer: string; email: string; phone: string; company: string;
  address: string; robot: string; robotSku: string; type: string; plan?: string; days?: number;
  amount: number; recurring: boolean; status: string; date: string; skills: string[];
  deposit?: number; tracking?: string; deliveryDate?: string; notes?: string;
  timeline: { date: string; event: string; detail: string }[];
}> = {
  "QBT-A1X": {
    id: "QBT-A1X", customer: "TechFlow GmbH", email: "ops@techflow.de", phone: "+49 30 9876543",
    company: "TechFlow GmbH", address: "Friedrichstr. 100, 10117 Berlin, Germany",
    robot: "X2 Ultra", robotSku: "AGB-X2U-2025", type: "subscribe", plan: "Monthly",
    amount: 17980, recurring: true, status: "active", date: "Mar 25, 2026",
    skills: ["SLAM Navigation", "Object Detection Pro"], deposit: 12500,
    timeline: [
      { date: "Mar 25", event: "Subscription started", detail: "Monthly plan activated" },
      { date: "Mar 24", event: "Robot delivered", detail: "Delivered to Berlin office" },
      { date: "Mar 23", event: "Order confirmed", detail: "Payment processed — €17,980 + €12,500 deposit" },
      { date: "Mar 22", event: "Order placed", detail: "Customer submitted order" },
    ],
  },
  "QBT-B2Y": {
    id: "QBT-B2Y", customer: "AutoLine AG", email: "fleet@autoline.com", phone: "+49 89 1234567",
    company: "AutoLine AG", address: "Industriestr. 42, 80331 Munich, Germany",
    robot: "H1 Pro", robotSku: "UTR-H1P-2025", type: "rent", days: 14,
    amount: 10486, recurring: false, status: "pending", date: "Mar 24, 2026",
    skills: ["Precision Welding"],
    notes: "Customer requested delivery before March 28th.",
    timeline: [
      { date: "Mar 24", event: "Order placed", detail: "Awaiting partner approval" },
    ],
  },
  "QBT-C3Z": {
    id: "QBT-C3Z", customer: "MediBot Inc.", email: "orders@medibot.io", phone: "+49 40 5551234",
    company: "MediBot Inc.", address: "Hafenstr. 88, 20457 Hamburg, Germany",
    robot: "X2 Ultra #2", robotSku: "AGB-X2U-2026", type: "buy",
    amount: 125000, recurring: false, status: "pending", date: "Mar 23, 2026",
    skills: ["Face Recognition", "English Pro"],
    notes: "Enterprise customer. Interested in volume purchase of 3 more units.",
    timeline: [
      { date: "Mar 23", event: "Order placed", detail: "Purchase order — awaiting approval" },
    ],
  },
  "QBT-G7T": {
    id: "QBT-G7T", customer: "WarehousePro", email: "mgr@whpro.com", phone: "+49 69 7773333",
    company: "WarehousePro GmbH", address: "Logistikpark 5, 60311 Frankfurt, Germany",
    robot: "RX-500", robotSku: "DLT-RX5-2025", type: "buy",
    amount: 98000, recurring: false, status: "shipped", date: "Mar 15, 2026",
    skills: ["SLAM Navigation", "Pick & Place", "Object Detection Pro"],
    tracking: "DPD-1847362950", deliveryDate: "Apr 2, 2026",
    timeline: [
      { date: "Mar 20", event: "Shipped", detail: "Tracking: DPD-1847362950" },
      { date: "Mar 18", event: "Skills configured", detail: "3 skills installed and tested" },
      { date: "Mar 16", event: "Order confirmed", detail: "Payment processed — €98,000" },
      { date: "Mar 15", event: "Order placed", detail: "Purchase order submitted" },
    ],
  },
};

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  active: { bg: "bg-[rgba(34,197,94,0.1)]", text: "text-[#22c55e]", border: "border-[rgba(34,197,94,0.2)]" },
  pending: { bg: "bg-[rgba(245,158,11,0.1)]", text: "text-[#f59e0b]", border: "border-[rgba(245,158,11,0.2)]" },
  completed: { bg: "bg-[rgba(255,255,255,0.03)]", text: "text-[#555]", border: "border-[rgba(255,255,255,0.07)]" },
  cancelled: { bg: "bg-[rgba(126,28,38,0.1)]", text: "text-[#c4484f]", border: "border-[rgba(126,28,38,0.2)]" },
  shipped: { bg: "bg-[rgba(59,130,246,0.1)]", text: "text-[#5b9bf5]", border: "border-[rgba(59,130,246,0.2)]" },
};

const TYPE_LABELS: Record<string, string> = { buy: "Purchase", rent: "Short-term Rental", subscribe: "Subscription" };

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = ORDERS[id] ?? ORDERS["QBT-A1X"];
  const st = STATUS_STYLES[order.status] ?? STATUS_STYLES.completed;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/partner/orders" className="p-2 rounded-lg text-[#555] hover:text-white hover:bg-[#111] transition-all">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] font-bold tracking-[-0.03em]">{order.id}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${st.bg} ${st.text} ${st.border}`}>
                {order.status}
              </span>
            </div>
            <p className="text-[14px] text-[#888] mt-0.5">{order.date} · {TYPE_LABELS[order.type]}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {order.status === "pending" && (
            <>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 text-[13px] font-medium text-[#22c55e] hover:bg-[#22c55e]/20 transition-all">
                <Check size={14} /> Approve
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#c4484f]/10 border border-[#c4484f]/20 text-[13px] font-medium text-[#c4484f] hover:bg-[#c4484f]/20 transition-all">
                <X size={14} /> Decline
              </button>
            </>
          )}
          <Link href="/partner/messages" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] text-[#888] border border-[rgba(255,255,255,0.07)] hover:text-white hover:border-[rgba(255,255,255,0.14)] transition-all">
            <MessageSquare size={14} /> Message
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order details */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] p-6">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-4">Order Details</span>
            <div className="space-y-3">
              <Row label="Robot" value={`${order.robot} (${order.robotSku})`} />
              <Row label="Type" value={`${TYPE_LABELS[order.type]}${order.plan ? ` · ${order.plan}` : ""}${order.days ? ` · ${order.days} days` : ""}`} />
              <Row label="Amount" value={`€${order.amount.toLocaleString()}${order.recurring ? "/month" : ""}`} accent />
              {order.deposit && <Row label="Deposit" value={`€${order.deposit.toLocaleString()} (refundable)`} />}
              {order.tracking && <Row label="Tracking" value={order.tracking} />}
              {order.deliveryDate && <Row label="Est. Delivery" value={order.deliveryDate} />}
            </div>

            {order.skills.length > 0 && (
              <div className="mt-5 pt-5 border-t border-[rgba(255,255,255,0.05)]">
                <span className="font-mono text-[10px] uppercase text-[#444] block mb-2">Installed Skills</span>
                <div className="flex flex-wrap gap-2">
                  {order.skills.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] text-[12px] text-[#888]">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {order.notes && (
              <div className="mt-5 pt-5 border-t border-[rgba(255,255,255,0.05)]">
                <span className="font-mono text-[10px] uppercase text-[#444] block mb-2">Notes</span>
                <p className="text-[13px] text-[#888] leading-relaxed bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.1)] rounded-xl p-3">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] p-6">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-4">Timeline</span>
            <div className="space-y-0">
              {order.timeline.map((event, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full shrink-0 ${i === 0 ? "bg-[#7e1c26]" : "bg-[#222]"}`} />
                    {i < order.timeline.length - 1 && <div className="w-px flex-1 bg-[rgba(255,255,255,0.07)] my-1" />}
                  </div>
                  <div className="pb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-medium text-[#f0f0f8]">{event.event}</span>
                      <span className="font-mono text-[11px] text-[#444]">{event.date}</span>
                    </div>
                    <span className="text-[12px] text-[#888]">{event.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer info */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] p-6">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-4">Customer</span>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#151515] border border-[rgba(255,255,255,0.07)] flex items-center justify-center text-[12px] font-bold text-[#888]">
                  {order.customer.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <span className="text-[14px] font-medium text-[#f0f0f8] block">{order.customer}</span>
                  <span className="font-mono text-[11px] text-[#555]">{order.company}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-[rgba(255,255,255,0.05)] space-y-2.5">
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-[#444] shrink-0" />
                  <span className="text-[13px] text-[#888]">{order.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-[#444] shrink-0" />
                  <span className="text-[13px] text-[#888]">{order.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={13} className="text-[#444] shrink-0 mt-0.5" />
                  <span className="text-[13px] text-[#888]">{order.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment summary */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] p-6">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-4">Payment</span>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[13px] text-[#888]">Robot {order.recurring ? "(monthly)" : ""}</span>
                <span className="font-mono text-[13px] text-[#f0f0f8]">€{order.amount.toLocaleString()}</span>
              </div>
              {order.deposit && (
                <div className="flex justify-between">
                  <span className="text-[13px] text-[#888]">Deposit</span>
                  <span className="font-mono text-[13px] text-[#f0f0f8]">€{order.deposit.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[13px] text-[#888]">Platform fee (15%)</span>
                <span className="font-mono text-[13px] text-[#c4484f]">-€{Math.round(order.amount * 0.15).toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[rgba(255,255,255,0.05)]">
                <span className="text-[14px] font-bold text-white">Your Payout</span>
                <span className="font-mono text-[16px] font-bold text-[#22c55e]">€{Math.round(order.amount * 0.85).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shipping */}
          {order.tracking && (
            <div className="rounded-2xl border border-[rgba(59,130,246,0.15)] bg-[rgba(59,130,246,0.03)] p-6">
              <div className="flex items-center gap-2 mb-3">
                <Truck size={16} className="text-[#5b9bf5]" />
                <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#5b9bf5] font-bold">Shipping</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[13px] text-[#888]">Tracking</span>
                  <span className="font-mono text-[13px] text-[#f0f0f8]">{order.tracking}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[13px] text-[#888]">Est. Delivery</span>
                  <span className="font-mono text-[13px] text-[#f0f0f8]">{order.deliveryDate}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.04)]">
      <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444]">{label}</span>
      <span className={`text-[13px] ${accent ? "font-bold text-[#c4484f]" : "text-[#f0f0f8]"}`}>{value}</span>
    </div>
  );
}
