"use client";

import { useState } from "react";

const companyLinks = [
  { label: "Intelligence", href: "/intelligence" },
  { label: "Operations", href: "/operations" },
  { label: "Lab", href: "/lab" },
  { label: "Stack", href: "#stack" },
  { label: "Team", href: "#team" },
  { label: "Work with us", href: "#contact" },
];

const partnerLinks = [
  { label: "rentnow.me", href: "https://rentnow.me" },
  { label: "AgiBot", href: "#work" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <footer className="bg-[#070707] border-t border-[rgba(255,255,255,0.07)]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <a href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="font-mono text-[18px] font-bold text-white tracking-[-0.03em]">
                Qobots<span className="text-[#c4484f]">.</span>
              </span>
            </a>
            <p className="text-[13px] text-[#666] leading-relaxed max-w-[260px]">
              The intelligence layer for humanoid robots. Full AI stack, deployed on AgiBot X2 Ultra. Powering enterprise automation and humanoid fleets across Europe.
            </p>
            <div className="flex items-center gap-4 mt-5">
              <a href="https://twitter.com/qobots" className="text-[#444] hover:text-[#888] transition-colors" aria-label="Twitter / X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com/company/qobots" className="text-[#444] hover:text-[#888] transition-colors" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#555] block mb-4">Company</span>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[13px] text-[#888] hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#555] block mb-4">Partners</span>
            <ul className="space-y-2.5">
              {partnerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[13px] text-[#888] hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#555] block mb-4">Stay in the loop</span>
            <p className="text-[13px] text-[#666] mb-4 leading-relaxed">Research updates, deployments, and EU Lab news.</p>
            {subscribed ? (
              <span className="font-mono text-[13px] text-[#c4484f]">You&apos;re in.</span>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-2.5 rounded-lg bg-[#111] border border-[rgba(255,255,255,0.07)] text-[13px] text-white placeholder-[#444] outline-none focus:border-[rgba(196,72,79,0.4)] transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#7e1c26] hover:bg-[#962330] text-[13px] font-medium text-white transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[12px] text-[#444]">
            &copy; 2026 Qobots Intelligence. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-[12px] text-[#444] hover:text-[#666] transition-colors">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
