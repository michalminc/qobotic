import Link from "next/link";
import { prisma } from "@/lib/db";
import { ROBOT_STATUS_BADGE } from "@/lib/admin-ui";
import { Pagination, parsePageParam } from "@/components/pagination";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

export default async function AdminRobotsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  const page = parsePageParam(sp.page);

  const [robots, total] = await Promise.all([
    prisma.robot.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: { images: { take: 1, orderBy: { sortOrder: "asc" } }, _count: { select: { leads: true } } },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.robot.count(),
  ]);

  return (
    <div className="p-8 max-w-[1200px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#1d1d1f] mb-1">Robots</h1>
          <p className="text-[14px] text-[#86868b]">{total} platform{total !== 1 ? "s" : ""} in fleet</p>
        </div>
        <Link href="/admin/robots/new" className="px-5 py-2.5 rounded-full bg-[#1d1d1f] hover:bg-[#333] text-white text-[13px] font-medium transition-colors">
          + Add robot
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
        {robots.length === 0 ? (
          <p className="p-12 text-center text-[14px] text-[#86868b]">No robots yet. Add your first one.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-[#f5f5f7] border-b border-black/[0.06]">
              <tr>
                <th className="text-left px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-[#86868b]">Robot</th>
                <th className="text-left px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-[#86868b]">Category</th>
                <th className="text-left px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-[#86868b]">Status</th>
                <th className="text-left px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-[#86868b]">Leads</th>
                <th className="text-left px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-[#86868b]">Published</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06]">
              {robots.map((r) => (
                <tr key={r.id} className="hover:bg-[#f9f9f9] transition-colors">
                  <td className="px-6 py-3">
                    <Link href={`/admin/robots/${r.id}`} className="flex items-center gap-3 group">
                      <div className="w-10 h-10 rounded-lg bg-[#f5f5f7] flex items-center justify-center overflow-hidden">
                        {r.images[0] ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={r.images[0].url} alt={r.name} className="w-full h-full object-cover" />
                        ) : <span className="text-[10px] text-[#86868b]">—</span>}
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-[#1d1d1f] group-hover:underline">{r.name}</p>
                        <p className="text-[12px] text-[#86868b]">{r.brand} · /{r.slug}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#1d1d1f]">{r.category}</td>
                  <td className="px-6 py-3">
                    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${ROBOT_STATUS_BADGE[r.status] || "bg-gray-100 text-gray-600"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#1d1d1f]">{r._count.leads}</td>
                  <td className="px-6 py-3">
                    <span className={`text-[12px] ${r.published ? "text-green-700" : "text-[#86868b]"}`}>
                      {r.published ? "● Published" : "○ Draft"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination basePath="/admin/robots" page={page} pageSize={PAGE_SIZE} total={total} />
    </div>
  );
}
