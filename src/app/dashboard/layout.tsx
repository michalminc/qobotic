"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { LayoutDashboard, CalendarClock, Package, User, CreditCard } from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/rentals", label: "Rentals & Subscriptions", icon: CalendarClock },
  { href: "/dashboard/orders", label: "Purchases", icon: Package },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block w-[220px] shrink-0">
              <div className="sticky top-[100px] space-y-1">
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
                    </Link>
                  );
                })}
              </div>
            </aside>

            {/* Mobile nav */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[rgba(255,255,255,0.07)] px-2 py-2 flex justify-around">
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
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
