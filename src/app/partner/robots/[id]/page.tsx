"use client";

import { ROBOT_IMAGES } from "@/lib/data";
import { use } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Edit3, Pause, Play, Trash2, Calendar, TrendingUp, Users, Star, MapPin, Cpu, Zap, Battery, Weight, Settings } from "lucide-react";


const FLEET = [
  { id: "agibot-x2-ultra", name: "X2 Ultra", type: "Humanoid", sku: "AGB-X2U-2025", dof: 42, torque: 320, weight: 78, battery: 4.5, dailyRate: 899, monthlyRate: 17980, buyPrice: 125000, status: "rented", renter: "TechFlow GmbH", renterEmail: "ops@techflow.de", until: "Apr 24, 2026", since: "Mar 10, 2026", bookings: 12, revenue: 42500, rating: 4.9, reviews: 8, speed: 82, strength: 91, aiLevel: 88, location: "Berlin, Germany", skills: ["SLAM Navigation", "Object Detection Pro"], description: "Flagship humanoid robot with 42 DOF and advanced AI capabilities. Ideal for industrial automation, research, and service applications." },
  { id: "agibot-x2-ultra", name: "X2 Ultra #2", type: "Humanoid", sku: "AGB-X2U-2026", dof: 42, torque: 320, weight: 78, battery: 4.5, dailyRate: 899, monthlyRate: 17980, buyPrice: 125000, status: "available", renter: null, renterEmail: null, until: null, since: null, bookings: 8, revenue: 28900, rating: 4.8, reviews: 5, speed: 82, strength: 91, aiLevel: 88, location: "Berlin, Germany", skills: ["English Pro"], description: "Second X2 Ultra unit. Same capabilities, currently available for rental or subscription." },
  { id: "unitree-h1", name: "H1 Pro", type: "Humanoid", sku: "UTR-H1P-2025", dof: 26, torque: 280, weight: 65, battery: 5, dailyRate: 749, monthlyRate: 14980, buyPrice: 98000, status: "rented", renter: "AutoLine AG", renterEmail: "fleet@autoline.com", until: "Apr 5, 2026", since: "Mar 22, 2026", bookings: 15, revenue: 56200, rating: 4.7, reviews: 12, speed: 75, strength: 80, aiLevel: 72, location: "Munich, Germany", skills: ["Precision Welding", "Pick & Place"], description: "Versatile humanoid for assembly lines and precision tasks." },
  { id: "delta-rx-500", name: "RX-500", type: "Industrial", sku: "DLT-RX5-2025", dof: 28, torque: 450, weight: 120, battery: 6, dailyRate: 599, monthlyRate: 11980, buyPrice: 98000, status: "subscribed", renter: "LogiCorp", renterEmail: "tech@logicorp.eu", until: "Ongoing", since: "Jan 15, 2026", bookings: 6, revenue: 64700, rating: 4.9, reviews: 4, speed: 65, strength: 98, aiLevel: 60, location: "Frankfurt, Germany", skills: ["Pick & Place", "Outdoor Terrain", "SLAM Navigation"], description: "Heavy-duty industrial robot for warehouse and logistics operations." },
  { id: "booster-t3", name: "T3 Companion", type: "Reception", sku: "BST-T3C-2025", dof: 24, torque: 120, weight: 35, battery: 8, dailyRate: 299, monthlyRate: 5980, buyPrice: 45000, status: "maintenance", renter: null, renterEmail: null, until: null, since: null, bookings: 22, revenue: 18400, rating: 4.6, reviews: 18, speed: 55, strength: 35, aiLevel: 78, location: "Berlin, Germany", skills: ["Dance Routines", "English Pro"], description: "Friendly companion robot for events, reception, and customer engagement." },
  { id: "unitree-go2", name: "Go2 Pro", type: "Quadruped", sku: "UTR-G2P-2025", dof: 12, torque: 180, weight: 15, battery: 3, dailyRate: 449, monthlyRate: 8980, buyPrice: 68000, status: "available", renter: null, renterEmail: null, until: null, since: null, bookings: 9, revenue: 21300, rating: 4.8, reviews: 6, speed: 88, strength: 62, aiLevel: 70, location: "Berlin, Germany", skills: ["Outdoor Terrain"], description: "Agile quadruped for security patrols, inspection, and outdoor operations." },
];

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string; label: string }> = {
  available: { bg: "bg-[rgba(34,197,94,0.1)]", text: "text-[#22c55e]", border: "border-[rgba(34,197,94,0.2)]", label: "Available" },
  rented: { bg: "bg-[rgba(59,130,246,0.1)]", text: "text-[#5b9bf5]", border: "border-[rgba(59,130,246,0.2)]", label: "Rented" },
  subscribed: { bg: "bg-[rgba(168,85,247,0.1)]", text: "text-[#a855f7]", border: "border-[rgba(168,85,247,0.2)]", label: "Subscribed" },
  maintenance: { bg: "bg-[rgba(245,158,11,0.1)]", text: "text-[#f59e0b]", border: "border-[rgba(245,158,11,0.2)]", label: "Maintenance" },
};

const BOOKING_HISTORY = [
  { customer: "TechFlow GmbH", type: "Subscription", period: "Mar 10 – Ongoing", amount: 17980, status: "active" },
  { customer: "MediBot Inc.", type: "Rental · 7d", period: "Feb 20 – Feb 27", amount: 6293, status: "completed" },
  { customer: "EventPro", type: "Rental · 3d", period: "Feb 10 – Feb 13", amount: 2697, status: "completed" },
  { customer: "AutoLine AG", type: "Rental · 14d", period: "Jan 5 – Jan 19", amount: 12586, status: "completed" },
];

export default function RobotDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "reviews">("overview");

  const idx = parseInt(id) || 0;
  const robot = FLEET[idx] ?? FLEET[0];
  const img = ROBOT_IMAGES[robot.id] ?? null;
  const st = STATUS_STYLES[robot.status] ?? STATUS_STYLES.available;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/partner/robots" className="p-2 rounded-lg text-[#555] hover:text-white hover:bg-[#111] transition-all">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-[28px] font-bold tracking-[-0.03em]">{robot.name}</h1>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${st.bg} ${st.text} ${st.border}`}>
              {st.label}
            </span>
          </div>
          <p className="text-[14px] text-[#888] mt-0.5">{robot.sku} · {robot.type}</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] text-[#888] border border-[rgba(255,255,255,0.07)] hover:text-white hover:border-[rgba(255,255,255,0.14)] transition-all">
            <Edit3 size={14} /> Edit
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] text-[#888] border border-[rgba(255,255,255,0.07)] hover:text-[#f59e0b] hover:border-[rgba(245,158,11,0.2)] transition-all">
            {robot.status === "maintenance" ? <Play size={14} /> : <Pause size={14} />}
            {robot.status === "maintenance" ? "Activate" : "Pause"}
          </button>
        </div>
      </div>

      {/* Robot card + image */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Image */}
        <div className="relative w-full lg:w-[320px] aspect-square rounded-2xl overflow-hidden bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] shrink-0">
          {img && <Image src={img} alt={robot.name} fill className="object-contain p-6" sizes="320px" />}
        </div>

        {/* Stats grid */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <MiniStat icon={TrendingUp} label="Total Revenue" value={`€${(robot.revenue / 1000).toFixed(1)}k`} accent />
          <MiniStat icon={Calendar} label="Bookings" value={String(robot.bookings)} />
          <MiniStat icon={Star} label="Rating" value={`${robot.rating} ★`} sub={`${robot.reviews} reviews`} />
          <MiniStat icon={Users} label="Current Renter" value={robot.renter ?? "None"} sub={robot.until ? `Until ${robot.until}` : undefined} />
          <MiniStat icon={Cpu} label="AI Level" value={`${robot.aiLevel}/100`} />
          <MiniStat icon={Zap} label="Speed" value={`${robot.speed}/100`} />
          <MiniStat icon={Weight} label="Weight" value={`${robot.weight} kg`} />
          <MiniStat icon={Battery} label="Battery" value={`${robot.battery} hrs`} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] w-fit">
        {(["overview", "bookings", "reviews"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-lg text-[13px] font-mono capitalize transition-all ${
              activeTab === tab ? "bg-[#7e1c26] text-white font-medium" : "text-[#888] hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] p-6">

        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Description */}
            <div>
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-3">Description</span>
              <p className="text-[14px] text-[#888] leading-relaxed">{robot.description}</p>
            </div>

            {/* Specs */}
            <div>
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-3">Specifications</span>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  ["DOF", `${robot.dof}`],
                  ["Max Torque", `${robot.torque} Nm`],
                  ["Speed", `${robot.speed}/100`],
                  ["Strength", `${robot.strength}/100`],
                  ["AI Level", `${robot.aiLevel}/100`],
                  ["Weight", `${robot.weight} kg`],
                  ["Battery", `${robot.battery} hrs`],
                  ["Location", robot.location],
                ].map(([label, value]) => (
                  <div key={label} className="p-3 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.05)]">
                    <span className="font-mono text-[10px] uppercase text-[#444] block">{label}</span>
                    <span className="text-[14px] font-medium text-[#f0f0f8] block mt-0.5">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div>
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-3">Pricing</span>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[rgba(126,28,38,0.05)] border border-[rgba(126,28,38,0.1)]">
                  <span className="font-mono text-[10px] uppercase text-[#c4484f] block">Daily Rate</span>
                  <span className="font-mono text-[20px] font-bold text-[#c4484f] block mt-1">€{robot.dailyRate}</span>
                  <span className="font-mono text-[10px] text-[#555]">/day · Short-term rental</span>
                </div>
                <div className="p-4 rounded-xl bg-[rgba(59,130,246,0.05)] border border-[rgba(59,130,246,0.1)]">
                  <span className="font-mono text-[10px] uppercase text-[#5b9bf5] block">Monthly Rate</span>
                  <span className="font-mono text-[20px] font-bold text-[#5b9bf5] block mt-1">€{robot.monthlyRate.toLocaleString()}</span>
                  <span className="font-mono text-[10px] text-[#555]">/month · Subscription</span>
                </div>
                <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)]">
                  <span className="font-mono text-[10px] uppercase text-[#888] block">Buy Price</span>
                  <span className="font-mono text-[20px] font-bold text-white block mt-1">€{robot.buyPrice.toLocaleString()}</span>
                  <span className="font-mono text-[10px] text-[#555]">One-time · Purchase</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-3">Installed Skills</span>
              <div className="flex flex-wrap gap-2">
                {robot.skills.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] text-[13px] text-[#888]">{s}</span>
                ))}
              </div>
            </div>

            {/* Current renter */}
            {robot.renter && (
              <div>
                <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-3">Current Customer</span>
                <div className="p-4 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] flex items-center justify-between">
                  <div>
                    <span className="text-[15px] font-medium text-[#f0f0f8] block">{robot.renter}</span>
                    <span className="font-mono text-[11px] text-[#555]">{robot.renterEmail} · Since {robot.since}</span>
                  </div>
                  <span className="font-mono text-[12px] text-[#888]">Until {robot.until}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "bookings" && (
          <div>
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-4">Booking History</span>
            <div className="space-y-2">
              {BOOKING_HISTORY.map((b, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.05)]">
                  <div>
                    <span className="text-[14px] font-medium text-[#f0f0f8] block">{b.customer}</span>
                    <span className="font-mono text-[11px] text-[#555]">{b.type} · {b.period}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[15px] font-bold text-white">€{b.amount.toLocaleString()}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${
                      b.status === "active"
                        ? "bg-[rgba(34,197,94,0.1)] text-[#22c55e] border-[rgba(34,197,94,0.2)]"
                        : "bg-[rgba(255,255,255,0.03)] text-[#555] border-[rgba(255,255,255,0.07)]"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-4">
              Customer Reviews ({robot.reviews})
            </span>
            <div className="space-y-3">
              {[
                { customer: "TechFlow GmbH", rating: 5, date: "Mar 20, 2026", text: "Excellent robot, exceeded our expectations. The AI capabilities are impressive and the support team was very responsive." },
                { customer: "MediBot Inc.", rating: 5, date: "Mar 1, 2026", text: "Perfect for our research lab. Smooth delivery and setup process." },
                { customer: "EventPro", rating: 4, date: "Feb 15, 2026", text: "Great for events. Battery life could be slightly better but overall very satisfied." },
                { customer: "AutoLine AG", rating: 5, date: "Jan 22, 2026", text: "Integrated seamlessly into our assembly line. Will rent again." },
              ].map((review, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.05)]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-medium text-[#f0f0f8]">{review.customer}</span>
                      <span className="text-[12px] text-[#f0f0f8]">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#444]">{review.date}</span>
                  </div>
                  <p className="text-[13px] text-[#888] leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value, sub, accent }: {
  icon: React.ElementType; label: string; value: string; sub?: string; accent?: boolean;
}) {
  return (
    <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]">
      <Icon size={14} className={accent ? "text-[#c4484f]" : "text-[#555]"} />
      <span className="font-mono text-[10px] uppercase text-[#444] block mt-2">{label}</span>
      <span className={`text-[15px] font-bold block mt-0.5 ${accent ? "text-[#c4484f]" : "text-[#f0f0f8]"}`}>{value}</span>
      {sub && <span className="font-mono text-[10px] text-[#555] block">{sub}</span>}
    </div>
  );
}
