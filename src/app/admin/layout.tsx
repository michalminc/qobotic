import Link from "next/link";
import { getAdminUser } from "@/lib/admin";
import LogoutButton from "./logout-button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();

  // No user — render children only (login page handles its own UI)
  if (!user) {
    return <>{children}</>;
  }

  const nav = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/robots", label: "Robots" },
    { href: "/admin/pages", label: "Pages" },
    { href: "/admin/media", label: "Media" },
    { href: "/admin/leads", label: "Leads" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex">
      {/* Sidebar */}
      <aside className="w-[240px] shrink-0 bg-white border-r border-black/[0.06] flex flex-col">
        <div className="px-6 py-5 border-b border-black/[0.06]">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full border-2 border-[#1d1d1f] flex items-center justify-center">
              <span className="text-[10px] font-black text-[#1d1d1f]">Q</span>
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-[#1d1d1f]">Qobots Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-lg text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors mb-0.5"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-black/[0.06]">
          <div className="px-3 py-2 mb-1">
            <p className="text-[12px] font-medium text-[#1d1d1f] truncate">{user.firstName} {user.lastName}</p>
            <p className="text-[11px] text-[#86868b] truncate">{user.email}</p>
          </div>
          <LogoutButton />
          <Link href="/" target="_blank" className="block mt-1 px-3 py-2 rounded-lg text-[12px] text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors">
            View site ↗
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
