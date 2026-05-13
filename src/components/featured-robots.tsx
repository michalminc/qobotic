"use client";

import { useState, useEffect } from "react";
import { RobotCard } from "@/components/robot-card";
import { Reveal } from "@/components/reveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedRobots() {
  const [robots, setRobots] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/robots")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRobots(data.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  if (robots.length === 0) return null;

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-8 sm:mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#444] block mb-3 sm:mb-4">
            Featured
          </span>
          <h2 className="text-[28px] sm:text-[40px] lg:text-[56px] font-bold tracking-[-0.04em]">
            Popular robots
          </h2>
          <p className="text-[14px] sm:text-[16px] font-light text-[#888] mt-3 max-w-[480px]">
            Most booked models this month. Configure and deploy in under 48 hours.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {robots.map((robot: any, i: number) => (
            <Reveal key={robot.id} delay={i * 0.1}>
              <RobotCard robot={robot} imageUrl={robot.images?.[0]?.url} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/robots" className="inline-flex items-center gap-2 text-[14px] text-[#888] hover:text-white transition-colors">
            View all robots <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
