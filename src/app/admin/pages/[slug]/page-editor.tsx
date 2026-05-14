"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminFormClasses } from "@/lib/admin-ui";

type PageData = {
  slug: string;
  title: string;
  content: Record<string, unknown>;
  metaTitle: string;
  metaDesc: string;
  published: boolean;
};

export default function PageEditor({ initial, existsInDb }: { initial: PageData; existsInDb: boolean }) {
  const router = useRouter();
  const [data, setData] = useState<PageData>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField(key: string, value: string | boolean) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function updateContent(key: string, value: string) {
    setData((d) => ({ ...d, content: { ...d.content, [key]: value } }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/pages/${data.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          metaTitle: data.metaTitle || null,
          metaDesc: data.metaDesc || null,
          published: data.published,
        }),
      });
      if (!res.ok) {
        const j = await res.json();
        setError(j.error || "Failed to save");
        setSaving(false);
        return;
      }
      router.refresh();
      setSaving(false);
    } catch {
      setError("Network error");
      setSaving(false);
    }
  }

  const { field, label, section } = adminFormClasses;
  const contentKeys = Object.keys(data.content);

  return (
    <form onSubmit={handleSave} className="p-8 max-w-[900px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/pages" className="text-[13px] text-[#86868b] hover:text-[#1d1d1f]">← Back to pages</Link>
          <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#1d1d1f] mt-1">{data.title}</h1>
          <p className="text-[13px] text-[#86868b]">/{data.slug === "home" ? "" : data.slug} · {existsInDb ? "saved in CMS" : "using defaults"}</p>
        </div>
        <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-full bg-[#1d1d1f] hover:bg-[#333] disabled:opacity-60 text-white text-[13px] font-medium transition-colors">
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>

      {error && <p className="text-[13px] text-red-600 mb-4 p-3 bg-red-50 rounded-lg">{error}</p>}

      <div className={section}>
        <h2 className="text-[16px] font-semibold text-[#1d1d1f] mb-4">Page basics</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>Title</label>
            <input className={field} value={data.title} onChange={(e) => updateField("title", e.target.value)} required />
          </div>
          <div>
            <label className={label}>Published</label>
            <label className="flex items-center gap-2 mt-2.5">
              <input type="checkbox" checked={data.published} onChange={(e) => updateField("published", e.target.checked)} />
              <span className="text-[13px] text-[#1d1d1f]">Visible on the site</span>
            </label>
          </div>
        </div>
      </div>

      <div className={section}>
        <h2 className="text-[16px] font-semibold text-[#1d1d1f] mb-1">Content fields</h2>
        <p className="text-[12px] text-[#86868b] mb-4">Hero text, CTAs, image paths. Add custom keys as needed.</p>

        <div className="space-y-3">
          {contentKeys.map((key) => {
            const val = String(data.content[key] ?? "");
            const isLong = val.length > 80 || key.toLowerCase().includes("subtitle") || key.toLowerCase().includes("desc");
            return (
              <div key={key}>
                <label className={label}>{key}</label>
                {isLong ? (
                  <textarea className={field} rows={3} value={val} onChange={(e) => updateContent(key, e.target.value)} />
                ) : (
                  <input className={field} value={val} onChange={(e) => updateContent(key, e.target.value)} />
                )}
              </div>
            );
          })}

          <AddFieldRow onAdd={(k) => updateContent(k, "")} existing={contentKeys} />
        </div>
      </div>

      <div className={section}>
        <h2 className="text-[16px] font-semibold text-[#1d1d1f] mb-4">SEO</h2>
        <div className="space-y-3">
          <div>
            <label className={label}>Meta title</label>
            <input className={field} value={data.metaTitle} onChange={(e) => updateField("metaTitle", e.target.value)} />
          </div>
          <div>
            <label className={label}>Meta description</label>
            <textarea className={field} rows={2} value={data.metaDesc} onChange={(e) => updateField("metaDesc", e.target.value)} />
          </div>
        </div>
      </div>
    </form>
  );
}

function AddFieldRow({ onAdd, existing }: { onAdd: (key: string) => void; existing: string[] }) {
  const [k, setK] = useState("");
  return (
    <div className="flex gap-2 pt-3 border-t border-black/[0.06] mt-3">
      <input
        className="flex-1 px-3 py-2 rounded-lg border border-black/[0.1] bg-white text-[13px]"
        placeholder="newFieldName (camelCase)"
        value={k}
        onChange={(e) => setK(e.target.value)}
      />
      <button
        type="button"
        disabled={!k || existing.includes(k)}
        onClick={() => { onAdd(k); setK(""); }}
        className="px-4 py-2 rounded-lg text-[13px] text-[#86868b] hover:text-[#1d1d1f] disabled:opacity-40"
      >
        + Add field
      </button>
    </div>
  );
}
