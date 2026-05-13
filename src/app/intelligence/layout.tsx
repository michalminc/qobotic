import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "robotManager · Intelligence — Qobots Intelligence",
  description:
    "The full AI stack for humanoid robots. Perception, SLAM, NLU, behavior trees, and motor control — engineered on AgiBot X2 Ultra.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
