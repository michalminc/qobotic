"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bot, ClipboardList, Wallet, MessageSquare, Settings, LogOut, ChevronRight } from "lucide-react";
import { useCurrency, type CurrencyCode } from "@/lib/currency-context";

const currencies: CurrencyCode[] = ["EUR", "USD", "PLN"];

const sidebarLinks = [
  { href: "/partner", label: "Overview", icon: LayoutDashboard },
  { href: "/partner/robots", label: "My Robots", icon: Bot },
  { href: "/partner/orders", label: "Orders & Bookings", icon: ClipboardList },
  { href: "/partner/messages", label: "Messages", icon: MessageSquare },
  { href: "/partner/earnings", label: "Earnings", icon: Wallet },
  { href: "/partner/settings", label: "Settings", icon: Settings },
];

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();

  // Skip layout for login page
  if (pathname === "/partner/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] shrink-0 border-r border-[rgba(255,255,255,0.07)] bg-[#070707]">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-[rgba(255,255,255,0.07)]">
          <Link href="/partner" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Qobots" width={100} height={34} className="h-[28px] w-auto" />
            <span className="px-2 py-0.5 rounded-md bg-[#7e1c26]/20 text-[#c4484f] text-[10px] font-mono font-bold uppercase tracking-wider">
              Partner
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarLinks.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] transition-all duration-150 ${
                  active
                    ? "bg-[#7e1c26]/80 text-white font-medium"
                    : "text-[#888] hover:text-white hover:bg-[#111]"
                }`}
              >
                <Icon size={16} />
                {link.label}
                {active && <ChevronRight size={14} className="ml-auto text-[#c4484f]" />}
              </Link>
            );
          })}
        </nav>

        {/* Currency switcher */}
        <div className="px-6 py-3 border-t border-[rgba(255,255,255,0.07)]">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#444] block mb-2">Currency</span>
          <div className="flex rounded-full bg-[#111] border border-[rgba(255,255,255,0.07)] p-0.5">
            {currencies.map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`flex-1 px-2 py-1 rounded-full text-[11px] font-mono font-medium transition-all duration-150 ${
                  currency === c
                    ? "bg-[#7e1c26] text-white"
                    : "text-[#555] hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-[rgba(255,255,255,0.07)]">
          <div className="flex items-center gap-3 px-4 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#7e1c26] flex items-center justify-center text-[11px] font-bold text-white">
              AB
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[13px] text-[#f0f0f8] block truncate">Agibot Corp.</span>
              <span className="font-mono text-[10px] text-[#555]">Partner Account</span>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 rounded-xl text-[13px] text-[#555] hover:text-[#c4484f] transition-colors"
          >
            <LogOut size={14} />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-[56px] bg-[#070707]/95 backdrop-blur-xl border-b border-[rgba(255,255,255,0.07)] flex items-center justify-between px-4">
        <Link href="/partner" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Qobots" width={80} height={27} className="h-[24px] w-auto" />
          <span className="px-1.5 py-0.5 rounded bg-[#7e1c26]/20 text-[#c4484f] text-[9px] font-mono font-bold uppercase">Partner</span>
        </Link>
        <div className="flex rounded-full bg-[#111] border border-[rgba(255,255,255,0.07)] p-0.5">
          {currencies.map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium transition-all duration-150 ${
                currency === c ? "bg-[#7e1c26] text-white" : "text-[#555]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070707]/95 backdrop-blur-xl border-t border-[rgba(255,255,255,0.07)] px-2 py-2 flex justify-around">
        {sidebarLinks.slice(0, 4).map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] transition-colors ${
                active ? "text-[#c4484f]" : "text-[#555]"
              }`}
            >
              <Icon size={18} />
              {link.label.split(" ")[0]}
            </Link>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 lg:ml-0">
        <div className="px-6 lg:px-10 py-8 lg:py-10 mt-[56px] lg:mt-0 mb-[72px] lg:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
