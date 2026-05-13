import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operations Platform — Qobots Intelligence",
  description:
    "Private control plane for humanoid fleets. OTA behavior deployments, real-time telemetry, AI Act-compliant audit logs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
