import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Lab — Qobots Intelligence",
  description:
    "EU-funded research facility for embodied AI. Sim-to-real transfer, skill acquisition, foundation models for robots, and safe AI behavior — built in Europe.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
