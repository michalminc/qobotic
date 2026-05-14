import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const KNOWN_PAGES = [
  { slug: "home", label: "Home", path: "/" },
  { slug: "intelligence", label: "Intelligence", path: "/intelligence" },
  { slug: "operations", label: "Operations", path: "/operations" },
  { slug: "lab", label: "Lab", path: "/lab" },
  { slug: "fleet", label: "Fleet", path: "/fleet" },
];

export default async function AdminPagesPage() {
  const pages = await prisma.page.findMany({ orderBy: { slug: "asc" } });
  const bySlug = new Map(pages.map((p) => [p.slug, p]));

  return (
    <div className="p-8 max-w-[1000px]">
      <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#1d1d1f] mb-1">Pages</h1>
      <p className="text-[14px] text-[#86868b] mb-8">Edit hero text and section content on each page.</p>

      <div className="bg-white rounded-2xl border border-black/[0.06] divide-y divide-black/[0.06]">
        {KNOWN_PAGES.map((p) => {
          const existing = bySlug.get(p.slug);
          return (
            <Link
              key={p.slug}
              href={`/admin/pages/${p.slug}`}
              className="flex items-center justify-between p-5 hover:bg-[#f9f9f9] transition-colors"
            >
              <div>
                <p className="text-[15px] font-medium text-[#1d1d1f]">{p.label}</p>
                <p className="text-[12px] text-[#86868b]">{p.path} · {existing ? `last edited ${new Date(existing.updatedAt).toLocaleDateString()}` : "not configured yet"}</p>
              </div>
              <span className="text-[13px] text-[#86868b]">Edit →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
