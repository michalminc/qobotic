"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/intelligence", label: "Intelligence" },
  { href: "/operations", label: "Operations" },
  { href: "/lab", label: "Lab" },
  { href: "#stack", label: "Stack" },
  { href: "#team", label: "Team" },
];

export function Navbar({ transparent }: { transparent?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    } else {
      setMobileOpen(false);
    }
  }

  return (
    <>
      {!transparent && <div className="h-[60px] lg:h-[84px]" />}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            : transparent
              ? "bg-transparent"
              : "bg-[#0a0a0a]/95 backdrop-blur-xl"
        } lg:top-4 lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100%-2rem)] lg:max-w-[1400px] lg:rounded-2xl lg:border ${
          scrolled || !transparent ? "lg:border-[rgba(255,255,255,0.08)]" : "lg:border-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-[60px] lg:h-[64px] px-4 lg:px-8">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image src="/logo.png" alt="Qobots" width={140} height={47} className="shrink-0 h-[28px] lg:h-[40px] w-auto" />
          </Link>

          {/* Desktop nav links — centered */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="px-4 py-1.5 rounded-lg text-[14px] transition-all duration-150 text-[#888] hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop right — CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, "#contact")}
              className="px-5 py-2 text-[13px] font-medium text-black bg-white hover:bg-[#e0e0e0] rounded-full transition-all duration-150"
            >
              Work with us
            </a>
          </div>

          {/* Mobile right */}
          <button
            className="flex lg:hidden items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition-all text-[#999]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-[14px] text-[#888] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, "#contact")}
              className="mt-2 px-5 py-2.5 text-[13px] font-medium text-black bg-white hover:bg-[#e0e0e0] rounded-full transition-all text-center"
            >
              Work with us
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
