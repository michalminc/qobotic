"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Upload, Plus, Save, Eye, X, Loader2, Sparkles } from "lucide-react";

const ROBOT_TYPES = ["Humanoid", "Quadruped", "Reception", "Industrial"] as const;
const SKILL_CATEGORIES = ["Navigation", "Vision", "Language", "Industrial", "Custom"] as const;

const TABS = [
  { id: 0, label: "Basic Info" },
  { id: 1, label: "Specs" },
  { id: 2, label: "Pricing" },
  { id: 3, label: "Skills" },
  { id: 4, label: "Images" },
] as const;

export default function AddRobotPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuccess, setAiSuccess] = useState(false);
  const [images, setImages] = useState<{ url: string; filename: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        setImages((prev) => [...prev, { url: data.url, filename: data.filename }]);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Upload failed");
    }
    setUploading(false);
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleAiFill() {
    if (!form.name) { alert("Enter a robot name first (e.g. Unitree G1)"); return; }
    setAiLoading(true);
    setAiSuccess(false);
    try {
      const res = await fetch(`/api/robots/autofill?q=${encodeURIComponent(form.name)}`);
      const data = await res.json();
      if (data.found && data.data) {
        const r = data.data;
        setForm((prev) => ({
          ...prev,
          name: r.name,
          sku: r.sku,
          type: r.type,
          dof: String(r.dof),
          torque: String(r.torque),
          weight: String(r.weight),
          speed: String(r.speed),
          strength: String(r.strength),
          aiLevel: String(r.aiLevel),
          batteryLife: String(r.batteryLife),
          warranty: String(r.warranty),
          description: r.description,
          rentalPrice: String(r.suggestedRentalPrice),
          buyPrice: String(r.suggestedBuyPrice),
        }));
        setAiSuccess(true);
        setTimeout(() => setAiSuccess(false), 3000);
      } else {
        const suggestions = data.suggestions?.slice(0, 5).join(", ");
        alert(`Robot not found in database. Try: ${suggestions || "Unitree G1, Tesla Optimus, Boston Dynamics Atlas..."}`);
      }
    } catch {
      alert("Failed to fetch robot data");
    }
    setAiLoading(false);
  }

  const [form, setForm] = useState({
    name: "",
    type: "Humanoid" as string,
    sku: "",
    dof: "",
    torque: "",
    speed: "",
    strength: "",
    aiLevel: "",
    weight: "",
    batteryLife: "",
    description: "",
    rentalPrice: "",
    buyPrice: "",
    subscriptionPrice: "",
    available: true,
    compatibleSkillCategories: [] as string[],
    warranty: "24",
    deliveryDays: "2",
    location: "Berlin, Germany",
  });

  function update(key: string, value: string | boolean | string[]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleSkillCat(cat: string) {
    const current = form.compatibleSkillCategories;
    update(
      "compatibleSkillCategories",
      current.includes(cat) ? current.filter((c) => c !== cat) : [...current, cat]
    );
  }

  async function handleSave(publish: boolean) {
    if (!form.name || !form.sku || !form.rentalPrice) {
      alert("Please fill in name, SKU, and rental price");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/partner/robots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          sku: form.sku,
          type: form.type,
          brand: form.name.split(" ")[0],
          description: form.description,
          location: form.location,
          deliveryDays: parseInt(form.deliveryDays) || 2,
          dof: parseInt(form.dof) || 0,
          torque: parseInt(form.torque) || 0,
          speed: parseInt(form.speed) || 0,
          strength: parseInt(form.strength) || 0,
          rentalPrice: parseInt(form.rentalPrice) || 0,
          buyPrice: parseInt(form.buyPrice) || 0,
          warranty: parseInt(form.warranty) || 24,
          published: publish,
          images: images.map((img) => img.url),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to save robot");
        setSaving(false);
        return;
      }
      window.location.href = "/partner/robots";
    } catch {
      alert("Failed to save robot");
      setSaving(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/partner/robots" className="p-2 rounded-lg text-[#555] hover:text-white hover:bg-[#111] transition-all">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-[28px] font-bold tracking-[-0.03em]">Add New Robot</h1>
            <p className="text-[14px] text-[#888] mt-1">List a new robot on the marketplace</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleSave(false)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] text-[#888] border border-[rgba(255,255,255,0.07)] hover:text-white hover:border-[rgba(255,255,255,0.14)] rounded-full transition-all"
          >
            <Save size={14} /> Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-[#7e1c26] hover:bg-[#962330] rounded-full transition-all disabled:opacity-50"
          >
            <Eye size={14} /> {saving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-lg text-[13px] font-mono transition-all duration-150 ${
              activeTab === tab.id
                ? "bg-[#7e1c26] text-white font-medium"
                : "text-[#888] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] p-6 lg:p-8">

        {/* Tab 0: Basic Info */}
        {activeTab === 0 && (
          <div className="space-y-5 max-w-[800px]">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block">Basic Information</span>

            {/* AI Autofill */}
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Field label="Robot Name / Model *" value={form.name} onChange={(v) => update("name", v)} placeholder="e.g. Unitree G1, Tesla Optimus, Figure 02..." />
              </div>
              <button
                onClick={handleAiFill}
                disabled={aiLoading || !form.name}
                className={`shrink-0 h-[48px] px-5 rounded-xl text-[13px] font-medium flex items-center gap-2 transition-all duration-200 disabled:opacity-40 ${
                  aiSuccess
                    ? "bg-[#22c55e] text-white"
                    : "bg-gradient-to-r from-[#7e1c26] to-[#a03040] text-white hover:brightness-110"
                }`}
              >
                {aiLoading ? (
                  <><Loader2 size={14} className="animate-spin" /> Searching...</>
                ) : aiSuccess ? (
                  <>✓ Filled!</>
                ) : (
                  <><Sparkles size={14} /> AI Autofill</>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Field label="SKU / Serial" value={form.sku} onChange={(v) => update("sku", v)} placeholder="e.g. AGB-X2U-2025" />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-2">Robot Type *</label>
              <div className="flex gap-2">
                {ROBOT_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => update("type", t)}
                    className={`px-4 py-2.5 rounded-xl text-[13px] font-mono transition-all ${
                      form.type === t
                        ? "bg-[#7e1c26] text-white"
                        : "bg-[#151515] text-[#888] border border-[rgba(255,255,255,0.07)] hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={4}
                placeholder="Describe your robot's capabilities, use cases, and features..."
                className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] text-[14px] text-[#f0f0f8] placeholder:text-[#333] outline-none focus:border-[#7e1c26] transition-colors resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Location" value={form.location} onChange={(v) => update("location", v)} />
              <Field label="Delivery Time (days)" value={form.deliveryDays} onChange={(v) => update("deliveryDays", v)} type="number" />
            </div>

            <div className="flex justify-end pt-4">
              <button onClick={() => setActiveTab(1)} className="px-5 py-2.5 rounded-xl bg-[#151515] border border-[rgba(255,255,255,0.07)] text-[13px] text-[#888] hover:text-white hover:border-[rgba(255,255,255,0.14)] transition-all">
                Next: Specs &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: Specifications */}
        {activeTab === 1 && (
          <div className="space-y-5 max-w-[800px]">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block">Specifications</span>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Degrees of Freedom" value={form.dof} onChange={(v) => update("dof", v)} type="number" placeholder="e.g. 42" />
              <Field label="Max Torque (Nm)" value={form.torque} onChange={(v) => update("torque", v)} type="number" placeholder="e.g. 320" />
              <Field label="Weight (kg)" value={form.weight} onChange={(v) => update("weight", v)} type="number" placeholder="e.g. 78" />
              <Field label="Speed Rating (0-100)" value={form.speed} onChange={(v) => update("speed", v)} type="number" placeholder="0-100" />
              <Field label="Strength Rating (0-100)" value={form.strength} onChange={(v) => update("strength", v)} type="number" placeholder="0-100" />
              <Field label="AI Level (0-100)" value={form.aiLevel} onChange={(v) => update("aiLevel", v)} type="number" placeholder="0-100" />
              <Field label="Battery Life (hours)" value={form.batteryLife} onChange={(v) => update("batteryLife", v)} type="number" placeholder="e.g. 4.5" />
              <Field label="Warranty (months)" value={form.warranty} onChange={(v) => update("warranty", v)} type="number" />
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setActiveTab(0)} className="px-5 py-2.5 rounded-xl text-[13px] text-[#888] hover:text-white transition-all">
                &larr; Back
              </button>
              <button onClick={() => setActiveTab(2)} className="px-5 py-2.5 rounded-xl bg-[#151515] border border-[rgba(255,255,255,0.07)] text-[13px] text-[#888] hover:text-white hover:border-[rgba(255,255,255,0.14)] transition-all">
                Next: Pricing &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Pricing */}
        {activeTab === 2 && (
          <div className="space-y-5">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block">Pricing</span>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[rgba(126,28,38,0.05)] border border-[rgba(126,28,38,0.12)]">
                <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#c4484f] block mb-3">Short-term Rental</span>
                <Field label="Daily Rate (€)" value={form.rentalPrice} onChange={(v) => update("rentalPrice", v)} type="number" placeholder="e.g. 899" />
                <p className="font-mono text-[10px] text-[#555] mt-2">1-30 days, paid upfront</p>
              </div>
              <div className="p-5 rounded-2xl bg-[rgba(59,130,246,0.05)] border border-[rgba(59,130,246,0.12)]">
                <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#5b9bf5] block mb-3">Subscription</span>
                <Field label="Monthly Rate (€)" value={form.subscriptionPrice} onChange={(v) => update("subscriptionPrice", v)} type="number" placeholder="e.g. 17980" />
                <p className="font-mono text-[10px] text-[#555] mt-2">Quarterly -10%, Annual -25%</p>
              </div>
              <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)]">
                <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#888] block mb-3">Purchase</span>
                <Field label="Buy Price (€)" value={form.buyPrice} onChange={(v) => update("buyPrice", v)} type="number" placeholder="e.g. 125000" />
                <p className="font-mono text-[10px] text-[#555] mt-2">One-time, includes warranty</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)]">
              <p className="text-[12px] text-[#888]">
                <strong className="text-[#f0f0f8]">Platform fee:</strong> 15% commission on all transactions. Prices shown are what customers pay — your payout is 85%.
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setActiveTab(1)} className="px-5 py-2.5 rounded-xl text-[13px] text-[#888] hover:text-white transition-all">
                &larr; Back
              </button>
              <button onClick={() => setActiveTab(3)} className="px-5 py-2.5 rounded-xl bg-[#151515] border border-[rgba(255,255,255,0.07)] text-[13px] text-[#888] hover:text-white hover:border-[rgba(255,255,255,0.14)] transition-all">
                Next: Skills &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Skills */}
        {activeTab === 3 && (
          <div className="space-y-5 max-w-[800px]">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block">Skills & Compatibility</span>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-2">Compatible Skill Categories</label>
              <div className="flex flex-wrap gap-2">
                {SKILL_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleSkillCat(cat)}
                    className={`px-4 py-2 rounded-xl text-[13px] font-mono transition-all ${
                      form.compatibleSkillCategories.includes(cat)
                        ? "bg-[#7e1c26] text-white"
                        : "bg-[#151515] text-[#888] border border-[rgba(255,255,255,0.07)] hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-2">Pre-installed Skills</label>
              <p className="text-[12px] text-[#555] mb-3">Skills included at no extra cost</p>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151515] border border-dashed border-[rgba(255,255,255,0.1)] text-[13px] text-[#888] hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-all">
                <Plus size={14} /> Add pre-installed skill
              </button>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setActiveTab(2)} className="px-5 py-2.5 rounded-xl text-[13px] text-[#888] hover:text-white transition-all">
                &larr; Back
              </button>
              <button onClick={() => setActiveTab(4)} className="px-5 py-2.5 rounded-xl bg-[#151515] border border-[rgba(255,255,255,0.07)] text-[13px] text-[#888] hover:text-white hover:border-[rgba(255,255,255,0.14)] transition-all">
                Next: Images &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Images */}
        {activeTab === 4 && (
          <div className="space-y-5">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block">Images & Media</span>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
                e.target.value = "";
              }}
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div key={img.filename} className="relative aspect-square rounded-2xl bg-[#111] border border-[rgba(255,255,255,0.07)] overflow-hidden group">
                  <Image src={img.url} alt={`Robot photo ${i + 1}`} fill className="object-cover" sizes="200px" />
                  {i === 0 && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#7e1c26] text-[9px] font-mono text-white uppercase">Main</span>
                  )}
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} className="text-white" />
                  </button>
                </div>
              ))}

              {images.length < 6 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="aspect-square rounded-2xl border border-dashed border-[rgba(255,255,255,0.1)] flex items-center justify-center hover:border-[rgba(255,255,255,0.25)] transition-all disabled:opacity-50"
                >
                  {uploading ? (
                    <Loader2 size={20} className="text-[#444] animate-spin" />
                  ) : (
                    <div className="text-center">
                      <Upload size={20} className="text-[#444] mx-auto mb-2" />
                      <span className="font-mono text-[10px] text-[#444]">Add photo</span>
                    </div>
                  )}
                </button>
              )}
            </div>
            <p className="text-[12px] text-[#555]">JPEG/PNG/WebP, max 5MB. First image is the main listing photo. Up to 6 photos.</p>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-1.5">Video URL (optional)</label>
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                className="w-full max-w-[500px] px-4 py-3 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] text-[14px] text-[#f0f0f8] placeholder:text-[#333] outline-none focus:border-[#7e1c26] transition-colors"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setActiveTab(3)} className="px-5 py-2.5 rounded-xl text-[13px] text-[#888] hover:text-white transition-all">
                &larr; Back
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-[13px] font-medium text-white bg-[#7e1c26] hover:bg-[#962330] rounded-xl transition-all disabled:opacity-50"
              >
                <Eye size={14} /> {saving ? "Publishing..." : "Publish Robot"}
              </button>
            </div>
          </div>
        )}
      </div>
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
