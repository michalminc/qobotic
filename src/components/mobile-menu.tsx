"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export function MobileMenu() {
  return (
    <details className="lg:hidden group">
      <summary className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 text-white list-none cursor-pointer [&::-webkit-details-marker]:hidden">
        <Menu className="w-5 h-5 group-open:hidden" />
        <svg className="w-5 h-5 hidden group-open:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </summary>

      <div className="fixed top-[60px] left-0 right-0 bg-[#0a0a0a] border-t border-[rgba(255,255,255,0.08)] z-[200]">
        <div className="px-4 py-4 space-y-1">
          <a href="/robots" className="block py-3 px-4 text-[15px] text-[#999] rounded-xl hover:bg-white/5">
            Robots
          </a>
          <a href="/skills" className="block py-3 px-4 text-[15px] text-[#999] rounded-xl hover:bg-white/5">
            Skills
          </a>
          <a href="/calendar" className="block py-3 px-4 text-[15px] text-[#999] rounded-xl hover:bg-white/5">
            Long-term
          </a>
          <hr className="border-[rgba(255,255,255,0.07)] !my-3" />
          <a href="/partner/login" className="block py-3 px-4 text-[15px] text-[#c4484f] rounded-xl hover:bg-white/5">
            Partner Portal
          </a>
          <a href="/signin" className="block py-3 mt-2 text-[15px] font-semibold text-black bg-white rounded-xl text-center">
            Sign in
          </a>
        </div>
      </div>
    </details>
  );
}
