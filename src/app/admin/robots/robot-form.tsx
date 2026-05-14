"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminFormClasses, uploadMedia } from "@/lib/admin-ui";

type Spec = { label: string; value: string };
type ImageInput = { id?: string; url: string; alt: string; sortOrder: number };

export type RobotFormData = {
  id?: string;
  slug: string;
  name: string;
  brand: string;
  category: "HUMANOID" | "INDUSTRIAL" | "QUADRUPED" | "RECEPTION" | "CUSTOM";
  status: "PRODUCTION" | "LAB" | "COMING" | "ARCHIVED";
  published: boolean;
  sortOrder: number;
  tagline: string;
  description: string;
  specs: Spec[];
  features: string[];
  images: ImageInput[];
};

const CATEGORIES: { value: RobotFormData["category"]; label: string }[] = [
  { value: "HUMANOID",   label: "Humanoid" },
  { value: "INDUSTRIAL", label: "Industrial" },
  { value: "QUADRUPED",  label: "Quadruped" },
  { value: "RECEPTION",  label: "Reception" },
  { value: "CUSTOM",     label: "Custom" },
];

const STATUSES: { value: RobotFormData["status"]; label: string }[] = [
  { value: "PRODUCTION", label: "In production" },
  { value: "LAB",        label: "In lab" },
  { value: "COMING",     label: "Coming soon" },
  { value: "ARCHIVED",   label: "Archived" },
];

export default function RobotForm({ initial, mode }: { initial: RobotFormData; mode: "new" | "edit" }) {
  const router = useRouter();
  const [data, setData] = useState<RobotFormData>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof RobotFormData>(key: K, value: RobotFormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const uploaded = await Promise.all(Array.from(files).map((f) => uploadMedia(f, "robots")));
    const newImages: ImageInput[] = uploaded
      .filter((url): url is string => !!url)
      .map((url, i) => ({ url, alt: data.name, sortOrder: data.images.length + i }));
    update("images", [...data.images, ...newImages]);
    e.target.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const url = mode === "new" ? "/api/admin/robots" : `/api/admin/robots/${data.id}`;
      const method = mode === "new" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Failed to save");
        setSaving(false);
        return;
      }
      router.push("/admin/robots");
      router.refresh();
    } catch {
      setError("Network error");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!data.id) return;
    if (!confirm(`Delete "${data.name}"? This cannot be undone.`)) return;
    setSaving(true);
    const res = await fetch(`/api/admin/robots/${data.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/robots");
      router.refresh();
    } else {
      setError("Delete failed");
      setSaving(false);
    }
  }

  const { field, label, section } = adminFormClasses;

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-[1000px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/robots" className="text-[13px] text-[#86868b] hover:text-[#1d1d1f]">← Back to robots</Link>
          <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#1d1d1f] mt-1">
            {mode === "new" ? "Add robot" : `Edit ${data.name || "robot"}`}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {mode === "edit" && (
            <button type="button" onClick={handleDelete} className="px-4 py-2 rounded-full text-[13px] text-red-600 hover:bg-red-50 transition-colors">
              Delete
            </button>
          )}
          <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-full bg-[#1d1d1f] hover:bg-[#333] disabled:opacity-60 text-white text-[13px] font-medium transition-colors">
            {saving ? "Saving..." : mode === "new" ? "Create robot" : "Save changes"}
          </button>
        </div>
      </div>

      {error && <p className="text-[13px] text-red-600 mb-4 p-3 bg-red-50 rounded-lg">{error}</p>}

      <div className={section}>
        <h2 className="text-[16px] font-semibold text-[#1d1d1f] mb-4">Basics</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>Name</label>
            <input className={field} value={data.name} onChange={(e) => update("name", e.target.value)} required />
          </div>
          <div>
            <label className={label}>Slug (URL)</label>
            <input className={field} value={data.slug} onChange={(e) => update("slug", e.target.value)} required pattern="[a-z0-9-]+" />
          </div>
          <div>
            <label className={label}>Brand</label>
            <input className={field} value={data.brand} onChange={(e) => update("brand", e.target.value)} required />
          </div>
          <div>
            <label className={label}>Category</label>
            <select className={field} value={data.category} onChange={(e) => update("category", e.target.value as RobotFormData["category"])}>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className={label}>Tagline (short)</label>
            <input className={field} value={data.tagline} onChange={(e) => update("tagline", e.target.value)} placeholder="43 DOF. Full-size. Production-ready." />
          </div>
          <div className="col-span-2">
            <label className={label}>Description</label>
            <textarea className={field} rows={4} value={data.description} onChange={(e) => update("description", e.target.value)} />
          </div>
        </div>
      </div>

      <div className={section}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold text-[#1d1d1f]">Specs</h2>
          <button
            type="button"
            onClick={() => update("specs", [...data.specs, { label: "", value: "" }])}
            className="text-[12px] text-[#86868b] hover:text-[#1d1d1f]"
          >
            + Add spec
          </button>
        </div>
        <div className="space-y-2">
          {data.specs.map((spec, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={`${field} w-1/3`}
                placeholder="Label (e.g., DOF)"
                value={spec.label}
                onChange={(e) => {
                  const next = [...data.specs];
                  next[i] = { ...next[i], label: e.target.value };
                  update("specs", next);
                }}
              />
              <input
                className={`${field} flex-1`}
                placeholder="Value (e.g., 42)"
                value={spec.value}
                onChange={(e) => {
                  const next = [...data.specs];
                  next[i] = { ...next[i], value: e.target.value };
                  update("specs", next);
                }}
              />
              <button
                type="button"
                onClick={() => update("specs", data.specs.filter((_, idx) => idx !== i))}
                className="px-3 text-[#86868b] hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          {data.specs.length === 0 && <p className="text-[13px] text-[#86868b] italic">No specs yet.</p>}
        </div>
      </div>

      <div className={section}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold text-[#1d1d1f]">Features (tags)</h2>
          <button
            type="button"
            onClick={() => update("features", [...data.features, ""])}
            className="text-[12px] text-[#86868b] hover:text-[#1d1d1f]"
          >
            + Add feature
          </button>
        </div>
        <div className="space-y-2">
          {data.features.map((f, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={`${field} flex-1`}
                placeholder="e.g., Voice + Touch interaction"
                value={f}
                onChange={(e) => {
                  const next = [...data.features];
                  next[i] = e.target.value;
                  update("features", next);
                }}
              />
              <button
                type="button"
                onClick={() => update("features", data.features.filter((_, idx) => idx !== i))}
                className="px-3 text-[#86868b] hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          {data.features.length === 0 && <p className="text-[13px] text-[#86868b] italic">No features yet.</p>}
        </div>
      </div>

      <div className={section}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold text-[#1d1d1f]">Images</h2>
          <label className="text-[12px] text-[#86868b] hover:text-[#1d1d1f] cursor-pointer">
            + Upload image
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {data.images.map((img, i) => (
            <div key={i} className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt} className="w-full h-32 object-contain bg-[#f5f5f7] rounded-lg" />
              <button
                type="button"
                onClick={() => update("images", data.images.filter((_, idx) => idx !== i))}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white shadow text-[12px] text-[#86868b] hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
          {data.images.length === 0 && (
            <p className="col-span-3 text-[13px] text-[#86868b] italic py-6 text-center">No images yet. Upload some.</p>
          )}
        </div>
      </div>

      <div className={section}>
        <h2 className="text-[16px] font-semibold text-[#1d1d1f] mb-4">Status</h2>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={label}>Status badge</label>
            <select className={field} value={data.status} onChange={(e) => update("status", e.target.value as RobotFormData["status"])}>
              {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Sort order</label>
            <input className={field} type="number" value={data.sortOrder} onChange={(e) => update("sortOrder", parseInt(e.target.value) || 0)} />
          </div>
          <div>
            <label className={label}>Published</label>
            <label className="flex items-center gap-2 mt-2.5">
              <input type="checkbox" checked={data.published} onChange={(e) => update("published", e.target.checked)} />
              <span className="text-[13px] text-[#1d1d1f]">Visible on /fleet</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
