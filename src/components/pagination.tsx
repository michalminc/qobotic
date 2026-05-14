import Link from "next/link";

type Props = {
  basePath: string;
  page: number;
  pageSize: number;
  total: number;
  // Extra query params to preserve (e.g. ?status=new)
  query?: Record<string, string | undefined>;
};

export function Pagination({ basePath, page, pageSize, total, query }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  function href(p: number) {
    const params = new URLSearchParams();
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v) params.set(k, v);
      }
    }
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const prevPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <nav className="flex items-center justify-between mt-6 pt-4 border-t border-black/[0.06]">
      <p className="text-[12px] text-[#86868b]">
        {from}–{to} of {total}
      </p>
      <div className="flex items-center gap-2">
        <PageLink href={href(prevPage)} disabled={page <= 1}>← Prev</PageLink>
        <span className="text-[12px] text-[#86868b] px-2">
          Page {page} / {totalPages}
        </span>
        <PageLink href={href(nextPage)} disabled={page >= totalPages}>Next →</PageLink>
      </div>
    </nav>
  );
}

function PageLink({ href, disabled, children }: { href: string; disabled: boolean; children: React.ReactNode }) {
  const className = "px-3 py-1.5 rounded-lg text-[12px] font-medium border border-black/[0.1] transition-colors";
  if (disabled) {
    return <span className={`${className} text-[#c7c7cc] cursor-not-allowed bg-[#f5f5f7]`}>{children}</span>;
  }
  return (
    <Link href={href} className={`${className} text-[#1d1d1f] hover:bg-[#f5f5f7]`}>
      {children}
    </Link>
  );
}

export function parsePageParam(p: string | undefined, max = 10_000): number {
  const n = parseInt(p || "1", 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, max);
}
