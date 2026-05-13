"use client";

import { useState } from "react";
import Image from "next/image";
import { Save, Upload, Building2, CreditCard, Bell, Shield, Globe } from "lucide-react";

export default function PartnerSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"company" | "bank" | "notifications" | "security">("company");

  const [company, setCompany] = useState({
    name: "Agibot Corp.",
    legalName: "Agibot Technologies GmbH",
    taxId: "DE123456789",
    email: "partner@agibot.com",
    phone: "+49 30 1234567",
    website: "https://agibot.com",
    address: "Berliner Str. 42",
    city: "Berlin",
    zip: "10115",
    country: "Germany",
    description: "Leading manufacturer of humanoid robots with advanced AI capabilities. Specializing in X2 Ultra series for industrial and service applications.",
  });

  const [bank, setBank] = useState({
    accountHolder: "Agibot Technologies GmbH",
    iban: "DE89 3704 0044 0532 0130 00",
    bic: "COBADEFFXXX",
    bankName: "Commerzbank AG",
    payoutSchedule: "monthly",
    minPayout: "500",
  });

  const [notifications, setNotifications] = useState({
    newOrder: true,
    orderStatusChange: true,
    newReview: true,
    payoutCompleted: true,
    robotStatusChange: false,
    weeklyReport: true,
    marketingEmails: false,
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const tabs = [
    { key: "company" as const, label: "Company", icon: Building2 },
    { key: "bank" as const, label: "Payouts", icon: CreditCard },
    { key: "notifications" as const, label: "Notifications", icon: Bell },
    { key: "security" as const, label: "Security", icon: Shield },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold tracking-[-0.03em]">Settings</h1>
          <p className="text-[14px] text-[#888] mt-1">Manage your partner account</p>
        </div>
        <button
          onClick={handleSave}
          className={`inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium rounded-full transition-all duration-200 ${
            saved
              ? "bg-[#22c55e] text-white"
              : "bg-[#7e1c26] hover:bg-[#962330] text-white"
          }`}
        >
          <Save size={14} />
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] transition-all shrink-0 ${
                activeTab === tab.key
                  ? "bg-[#7e1c26] text-white font-medium"
                  : "bg-[#111] text-[#888] hover:text-white border border-[rgba(255,255,255,0.07)]"
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Company Profile */}
      {activeTab === "company" && (
        <div className="space-y-6">
          {/* Logo upload */}
          <div className="flex items-center gap-6 p-6 rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#111] border border-[rgba(255,255,255,0.07)] flex items-center justify-center">
              <Image src="/logo.png" alt="Company" width={60} height={60} className="object-contain p-2" />
            </div>
            <div>
              <span className="text-[14px] font-medium text-[#f0f0f8] block mb-1">Company Logo</span>
              <p className="text-[12px] text-[#555] mb-3">PNG or SVG, max 2MB</p>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111] border border-[rgba(255,255,255,0.07)] text-[12px] text-[#888] hover:text-white hover:border-[rgba(255,255,255,0.14)] transition-all">
                <Upload size={12} /> Upload new logo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block">Company Information</span>
              <Field label="Company Name" value={company.name} onChange={(v) => setCompany({ ...company, name: v })} />
              <Field label="Legal Name" value={company.legalName} onChange={(v) => setCompany({ ...company, legalName: v })} />
              <Field label="Tax ID / VAT" value={company.taxId} onChange={(v) => setCompany({ ...company, taxId: v })} />
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-1.5">Description</label>
                <textarea
                  value={company.description}
                  onChange={(e) => setCompany({ ...company, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] text-[14px] text-[#f0f0f8] placeholder:text-[#333] outline-none focus:border-[#7e1c26] transition-colors resize-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block">Contact & Address</span>
              <Field label="Email" value={company.email} onChange={(v) => setCompany({ ...company, email: v })} type="email" />
              <Field label="Phone" value={company.phone} onChange={(v) => setCompany({ ...company, phone: v })} type="tel" />
              <Field label="Website" value={company.website} onChange={(v) => setCompany({ ...company, website: v })} />
              <Field label="Address" value={company.address} onChange={(v) => setCompany({ ...company, address: v })} />
              <div className="grid grid-cols-3 gap-3">
                <Field label="City" value={company.city} onChange={(v) => setCompany({ ...company, city: v })} />
                <Field label="ZIP" value={company.zip} onChange={(v) => setCompany({ ...company, zip: v })} />
                <Field label="Country" value={company.country} onChange={(v) => setCompany({ ...company, country: v })} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bank / Payouts */}
      {activeTab === "bank" && (
        <div className="space-y-6">
          <div className="max-w-[600px] space-y-4">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block">Bank Account</span>
            <Field label="Account Holder" value={bank.accountHolder} onChange={(v) => setBank({ ...bank, accountHolder: v })} />
            <Field label="IBAN" value={bank.iban} onChange={(v) => setBank({ ...bank, iban: v })} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="BIC / SWIFT" value={bank.bic} onChange={(v) => setBank({ ...bank, bic: v })} />
              <Field label="Bank Name" value={bank.bankName} onChange={(v) => setBank({ ...bank, bankName: v })} />
            </div>
          </div>

          <div className="max-w-[600px] space-y-4 pt-6 border-t border-[rgba(255,255,255,0.07)]">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block">Payout Settings</span>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-1.5">Payout Schedule</label>
              <div className="flex gap-2">
                {["weekly", "biweekly", "monthly"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setBank({ ...bank, payoutSchedule: s })}
                    className={`px-4 py-2.5 rounded-xl text-[13px] font-mono capitalize transition-all ${
                      bank.payoutSchedule === s
                        ? "bg-[#7e1c26] text-white"
                        : "bg-[#111] text-[#888] border border-[rgba(255,255,255,0.07)] hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Minimum Payout (€)" value={bank.minPayout} onChange={(v) => setBank({ ...bank, minPayout: v })} type="number" />
          </div>

          {/* Payout info */}
          <div className="max-w-[600px] p-5 rounded-2xl bg-[rgba(59,130,246,0.05)] border border-[rgba(59,130,246,0.1)]">
            <div className="flex items-center gap-2 mb-2">
              <Globe size={14} className="text-[#5b9bf5]" />
              <span className="text-[13px] font-medium text-[#5b9bf5]">Platform Fee</span>
            </div>
            <p className="text-[13px] text-[#888] leading-relaxed">
              Qobots charges a <strong className="text-[#f0f0f8]">15% platform fee</strong> on all transactions (rentals, subscriptions, and sales). Payouts are processed after deducting the fee.
            </p>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === "notifications" && (
        <div className="max-w-[600px] space-y-2">
          <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-4">Email Notifications</span>
          {[
            { key: "newOrder", label: "New order received", desc: "Get notified when a customer places an order" },
            { key: "orderStatusChange", label: "Order status changes", desc: "Updates when orders are confirmed, shipped, or completed" },
            { key: "newReview", label: "New review", desc: "When a customer leaves a review on your robot" },
            { key: "payoutCompleted", label: "Payout completed", desc: "Confirmation when funds are transferred to your account" },
            { key: "robotStatusChange", label: "Robot status changes", desc: "When a robot goes online/offline or changes status" },
            { key: "weeklyReport", label: "Weekly summary report", desc: "Revenue, bookings, and performance digest every Monday" },
            { key: "marketingEmails", label: "Marketing & tips", desc: "Platform updates, tips, and promotional content" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]">
              <div>
                <span className="text-[13px] text-[#f0f0f8] block">{item.label}</span>
                <span className="text-[12px] text-[#555]">{item.desc}</span>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
                  notifications[item.key as keyof typeof notifications] ? "bg-[#7e1c26]" : "bg-[#222]"
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                  notifications[item.key as keyof typeof notifications] ? "translate-x-5" : "translate-x-0.5"
                }`} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <div className="max-w-[600px] space-y-6">
          <div className="space-y-4">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block">Change Password</span>
            <Field label="Current Password" value="" onChange={() => {}} type="password" placeholder="••••••••" />
            <Field label="New Password" value="" onChange={() => {}} type="password" placeholder="Min 8 characters" />
            <Field label="Confirm New Password" value="" onChange={() => {}} type="password" />
            <button className="px-5 py-2.5 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] text-[13px] text-[#888] hover:text-white hover:border-[rgba(255,255,255,0.14)] transition-all">
              Update Password
            </button>
          </div>

          <div className="pt-6 border-t border-[rgba(255,255,255,0.07)] space-y-4">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block">Two-Factor Authentication</span>
            <div className="flex items-center justify-between p-5 rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]">
              <div>
                <span className="text-[14px] font-medium text-[#f0f0f8] block">2FA is disabled</span>
                <span className="text-[12px] text-[#555]">Add an extra layer of security to your account</span>
              </div>
              <button className="px-4 py-2 rounded-lg bg-[#7e1c26] text-[12px] font-medium text-white hover:bg-[#962330] transition-all">
                Enable 2FA
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-[rgba(255,255,255,0.07)]">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#c4484f] font-bold block mb-4">Danger Zone</span>
            <div className="p-5 rounded-2xl border border-[rgba(126,28,38,0.2)] bg-[rgba(126,28,38,0.05)]">
              <span className="text-[14px] font-medium text-[#f0f0f8] block mb-1">Delete Partner Account</span>
              <p className="text-[12px] text-[#888] mb-4">
                This will permanently delete your partner account, remove all robots from the marketplace, and cancel all active subscriptions.
              </p>
              <button className="px-4 py-2 rounded-lg border border-[rgba(126,28,38,0.3)] text-[12px] text-[#c4484f] hover:bg-[rgba(126,28,38,0.1)] transition-all">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] text-[14px] text-[#f0f0f8] placeholder:text-[#333] outline-none focus:border-[#7e1c26] transition-colors"
      />
    </div>
  );
}
