// Display helpers and client-safe utilities for the admin UI.
// No server-only imports (no Prisma, no next/headers, no cookies).

export const LEAD_TYPE_LABEL: Record<string, string> = {
  SOFTWARE: "Software",
  ROBOT_INQUIRY: "Robot",
  GENERAL: "General",
};

export const LEAD_STATUS_BADGE: Record<string, string> = {
  NEW:       "bg-amber-50 text-amber-700",
  CONTACTED: "bg-blue-50 text-blue-700",
  QUALIFIED: "bg-green-50 text-green-700",
  CLOSED:    "bg-gray-100 text-gray-600",
  REJECTED:  "bg-gray-100 text-gray-600",
};

export const ROBOT_STATUS_BADGE: Record<string, string> = {
  PRODUCTION: "bg-green-50 text-green-700",
  LAB:        "bg-amber-50 text-amber-700",
  COMING:     "bg-blue-50 text-blue-700",
  ARCHIVED:   "bg-gray-100 text-gray-600",
};

export const adminFormClasses = {
  field:   "w-full px-3 py-2.5 rounded-lg border border-black/[0.1] bg-white text-[14px] text-[#1d1d1f] outline-none focus:border-black/[0.3] transition-colors",
  label:   "block text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-1.5",
  section: "bg-white rounded-2xl border border-black/[0.06] p-6 mb-4",
};

export async function uploadMedia(file: File, folder = "general"): Promise<string | null> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  const res = await fetch("/api/admin/media", { method: "POST", body: fd });
  if (!res.ok) return null;
  const json = await res.json();
  return json.url;
}
