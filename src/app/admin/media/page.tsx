import { prisma } from "@/lib/db";
import MediaClient from "./media-client";
import { Pagination, parsePageParam } from "@/components/pagination";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 60;

export default async function MediaPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  const page = parsePageParam(sp.page);

  const [items, total] = await Promise.all([
    prisma.mediaAsset.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.mediaAsset.count(),
  ]);

  return (
    <>
      <MediaClient
        initial={items.map((i) => ({
          id: i.id,
          url: i.url,
          filename: i.filename,
          mimeType: i.mimeType,
          size: i.size,
          folder: i.folder,
          alt: i.alt,
          createdAt: i.createdAt.toISOString(),
        }))}
        total={total}
      />
      <div className="px-8 pb-8 max-w-[1200px]">
        <Pagination basePath="/admin/media" page={page} pageSize={PAGE_SIZE} total={total} />
      </div>
    </>
  );
}
