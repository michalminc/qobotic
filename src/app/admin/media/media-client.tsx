"use client";

import { useState } from "react";

type Media = {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  folder: string | null;
  alt: string | null;
  createdAt: string;
};

const FOLDERS = ["heroes", "robots", "lab", "general"];

export default function MediaClient({ initial, total }: { initial: Media[]; total: number }) {
  const [items, setItems] = useState<Media[]>(initial);
  const [folder, setFolder] = useState("general");
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    const results = await Promise.all(
      Array.from(files).map(async (f) => {
        const fd = new FormData();
        fd.append("file", f);
        fd.append("folder", folder);
        const res = await fetch("/api/admin/media", { method: "POST", body: fd });
        return res.ok ? (res.json() as Promise<Media>) : null;
      })
    );
    const fresh = results.filter((m): m is Media => !!m);
    setItems([...fresh, ...items]);
    setUploading(false);
    e.target.value = "";
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this file? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    if (res.ok) setItems(items.filter((i) => i.id !== id));
  }

  return (
    <div className="p-8 max-w-[1200px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#1d1d1f] mb-1">Media library</h1>
          <p className="text-[14px] text-[#86868b]">{total} file{total !== 1 ? "s" : ""} · showing {items.length}</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="px-3 py-2 rounded-lg border border-black/[0.1] bg-white text-[13px]"
          >
            {FOLDERS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          <label className="px-5 py-2.5 rounded-full bg-[#1d1d1f] hover:bg-[#333] text-white text-[13px] font-medium cursor-pointer transition-colors">
            {uploading ? "Uploading..." : "+ Upload"}
            <input type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
          </label>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-black/[0.06] p-12 text-center">
          <p className="text-[14px] text-[#86868b]">No files yet. Upload some images.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((m) => (
            <div key={m.id} className="group relative bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
              <div className="aspect-square bg-[#f5f5f7] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.alt || m.filename} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="p-3 border-t border-black/[0.06]">
                <p className="text-[12px] font-medium text-[#1d1d1f] truncate">{m.filename}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-[#86868b]">{m.folder || "—"} · {(m.size / 1024).toFixed(0)} KB</span>
                  <button onClick={() => navigator.clipboard.writeText(m.url)} className="text-[10px] text-[#86868b] hover:text-[#1d1d1f]">Copy URL</button>
                </div>
              </div>
              <button
                onClick={() => handleDelete(m.id)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow text-[12px] text-[#86868b] hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
