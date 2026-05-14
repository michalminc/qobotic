import Link from "next/link";
import { prisma } from "@/lib/db";
import type { LeadStatus, Prisma } from "@prisma/client";
import { LEAD_TYPE_LABEL, LEAD_STATUS_BADGE } from "@/lib/admin-ui";
import { Pagination, parsePageParam } from "@/components/pagination";

export const dynamic = "force-dynamic";

const VALID_STATUSES = new Set<LeadStatus>(["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "REJECTED"]);
const PAGE_SIZE = 50;

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ status?: string; page?: string }> }) {
  const sp = await searchParams;
  const statusParam = sp.status?.toUpperCase();
  const where: Prisma.LeadWhereInput = statusParam && VALID_STATUSES.has(statusParam as LeadStatus)
    ? { status: statusParam as LeadStatus }
    : {};

  const page = parsePageParam(sp.page);

  const [leads, filteredCount, counts] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { robot: { select: { name: true, slug: true } } },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.lead.count({ where }),
    prisma.lead.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  const countMap: Record<string, number> = {};
  counts.forEach((c) => { countMap[c.status] = c._count._all; });
  const total = Object.values(countMap).reduce((a, b) => a + b, 0);

  const filters = [
    { id: "all", label: "All", count: total },
    { id: "new", label: "New", count: countMap.NEW || 0 },
    { id: "contacted", label: "Contacted", count: countMap.CONTACTED || 0 },
    { id: "qualified", label: "Qualified", count: countMap.QUALIFIED || 0 },
    { id: "closed", label: "Closed", count: countMap.CLOSED || 0 },
  ];

  const activeId = sp.status || "all";

  return (
    <div className="p-8 max-w-[1200px]">
      <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#1d1d1f] mb-1">Leads</h1>
      <p className="text-[14px] text-[#86868b] mb-6">Inquiries from the public site.</p>

      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {filters.map((f) => {
          const active = activeId === f.id;
          return (
            <Link
              key={f.id}
              href={`/admin/leads${f.id === "all" ? "" : `?status=${f.id}`}`}
              className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                active ? "bg-[#1d1d1f] text-white border-[#1d1d1f]" : "bg-white text-[#6e6e73] border-black/[0.1] hover:border-black/[0.25]"
              }`}
            >
              {f.label} <span className={`ml-1 ${active ? "opacity-70" : "text-[#86868b]"}`}>{f.count}</span>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
        {leads.length === 0 ? (
          <p className="p-12 text-center text-[14px] text-[#86868b]">
            No leads {activeId !== "all" ? `with status ${activeId}` : "yet"}.
          </p>
        ) : (
          <table className="w-full">
            <thead className="bg-[#f5f5f7] border-b border-black/[0.06]">
              <tr>
                <th className="text-left px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-[#86868b]">Date</th>
                <th className="text-left px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-[#86868b]">Email</th>
                <th className="text-left px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-[#86868b]">Type</th>
                <th className="text-left px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-[#86868b]">Robot</th>
                <th className="text-left px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-[#86868b]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06]">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-[#f9f9f9] transition-colors">
                  <td className="px-6 py-3 text-[12px] text-[#86868b]">
                    <Link href={`/admin/leads/${l.id}`} className="block">
                      {new Date(l.createdAt).toLocaleDateString()} {new Date(l.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Link>
                  </td>
                  <td className="px-6 py-3 text-[14px] text-[#1d1d1f]">
                    <Link href={`/admin/leads/${l.id}`} className="hover:underline">{l.email}</Link>
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#1d1d1f]">{LEAD_TYPE_LABEL[l.type] || l.type}</td>
                  <td className="px-6 py-3 text-[13px] text-[#86868b]">{l.robot?.name || "—"}</td>
                  <td className="px-6 py-3">
                    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${LEAD_STATUS_BADGE[l.status] || "bg-gray-100 text-gray-600"}`}>
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination
        basePath="/admin/leads"
        page={page}
        pageSize={PAGE_SIZE}
        total={filteredCount}
        query={{ status: sp.status }}
      />
    </div>
  );
}
