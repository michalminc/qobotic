"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "REJECTED"] as const;
type Status = typeof STATUSES[number];

export default function LeadActions({ id, status: initialStatus, notes: initialNotes }: { id: string; status: string; notes: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<string>(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);

  async function save(updates: Record<string, unknown>) {
    setSaving(true);
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (res.ok) router.refresh();
    setSaving(false);
  }

  function handleStatusChange(s: Status) {
    setStatus(s);
    const updates: Record<string, unknown> = { status: s };
    if (s === "CONTACTED" && initialStatus !== "CONTACTED") {
      updates.contactedAt = new Date().toISOString();
    }
    save(updates);
  }

  async function handleDelete() {
    if (!confirm("Delete this lead permanently?")) return;
    const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/leads");
  }

  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] p-6">
      <h2 className="text-[16px] font-semibold text-[#1d1d1f] mb-4">Actions</h2>

      <div className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-2">Status</p>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              disabled={saving}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-colors ${
                status === s ? "bg-[#1d1d1f] text-white border-[#1d1d1f]" : "bg-white text-[#86868b] border-black/[0.1] hover:border-black/[0.3]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-2">Internal notes</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full px-3 py-2.5 rounded-lg border border-black/[0.1] bg-white text-[14px] text-[#1d1d1f] outline-none focus:border-black/[0.3]"
          placeholder="Private notes about this lead..."
        />
        <button
          onClick={() => save({ notes })}
          disabled={saving}
          className="mt-2 px-4 py-2 rounded-lg bg-[#1d1d1f] hover:bg-[#333] text-white text-[12px] font-medium transition-colors"
        >
          {saving ? "Saving..." : "Save notes"}
        </button>
      </div>

      <div className="pt-4 border-t border-black/[0.06]">
        <button onClick={handleDelete} className="text-[12px] text-red-600 hover:text-red-700">Delete lead</button>
      </div>
    </div>
  );
}
