import { prisma } from "@/lib/db";
import Link from "next/link";
import { LEAD_TYPE_LABEL, LEAD_STATUS_BADGE } from "@/lib/admin-ui";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [robotCount, leadCount, newLeadCount, mediaCount, pageCount, recentLeads] = await Promise.all([
    prisma.robot.count(),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.mediaAsset.count(),
    prisma.page.count(),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { robot: { select: { name: true, slug: true } } },
    }),
  ]);

  const stats = [
    { label: "Robots", value: robotCount, href: "/admin/robots" },
    { label: "Pages", value: pageCount, href: "/admin/pages" },
    { label: "Media files", value: mediaCount, href: "/admin/media" },
    { label: "New leads", value: newLeadCount, sub: `${leadCount} total`, href: "/admin/leads" },
  ];

  return (
    <div className="p-8 max-w-[1200px]">
      <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#1d1d1f] mb-1">Dashboard</h1>
      <p className="text-[14px] text-[#86868b] mb-8">Overview of your content and inbound inquiries.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="block p-6 rounded-2xl bg-white border border-black/[0.06] hover:shadow-md transition-shadow"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-2">{s.label}</p>
            <p className="text-[32px] font-bold text-[#1d1d1f] leading-none">{s.value}</p>
            {s.sub && <p className="text-[12px] text-[#86868b] mt-1">{s.sub}</p>}
          </Link>
        ))}
      </div>

      <section className="bg-white rounded-2xl border border-black/[0.06] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-semibold text-[#1d1d1f]">Recent leads</h2>
          <Link href="/admin/leads" className="text-[13px] text-[#86868b] hover:text-[#1d1d1f]">View all →</Link>
        </div>
        {recentLeads.length === 0 ? (
          <p className="text-[14px] text-[#86868b] py-8 text-center">No leads yet.</p>
        ) : (
          <div className="divide-y divide-black/[0.06]">
            {recentLeads.map((lead) => (
              <Link
                key={lead.id}
                href={`/admin/leads/${lead.id}`}
                className="flex items-center justify-between py-3 hover:bg-[#f5f5f7] px-3 -mx-3 rounded-lg transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-medium text-[#1d1d1f] truncate">{lead.email}</p>
                  <p className="text-[12px] text-[#86868b] truncate">
                    {LEAD_TYPE_LABEL[lead.type] || lead.type}
                    {lead.robot && ` · ${lead.robot.name}`}
                  </p>
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${LEAD_STATUS_BADGE[lead.status] || "bg-gray-100 text-gray-600"}`}>
                  {lead.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
