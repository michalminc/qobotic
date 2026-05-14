import { prisma } from "@/lib/db";
import PageEditor from "./page-editor";

export const dynamic = "force-dynamic";

const PAGE_DEFAULTS: Record<string, { title: string; content: Record<string, unknown> }> = {
  home: {
    title: "Home",
    content: {
      heroEyebrow: "Qobots",
      heroTitle: "We build the intelligence layer for humanoid robots.",
      heroSubtitle: "Full AI stack, deployed on AgiBot X2 Ultra. Powering enterprise automation and humanoid fleets across Europe.",
      heroPrimaryCta: "See our work →",
      heroSecondaryCta: "Work with us",
      heroImage: "/images/heroes/hero-home-light.jpg",
    },
  },
  intelligence: {
    title: "Intelligence",
    content: {
      heroEyebrow: "robotManager · Per-robot intelligence",
      heroTitle: "The brain we ship to every robot.",
      heroSubtitle: "robotManager is our per-robot AI system — six tightly integrated layers from raw sensor data to autonomous task execution.",
      heroImage: "/images/heroes/hero-intelligence-light.jpg",
    },
  },
  operations: {
    title: "Operations",
    content: {
      heroEyebrow: "Operations Platform · Fleet control plane",
      heroTitle: "Run humanoids in production.",
      heroSubtitle: "The private control plane for humanoid fleets. OTA behavior deployments, real-time telemetry, multi-robot orchestration, and AI Act-compliant audit logs — all in one platform.",
      heroImage: "/images/heroes/hero-operations-light.jpg",
    },
  },
  lab: {
    title: "Lab",
    content: {
      heroEyebrow: "Research · EU-funded",
      heroTitle: "Where European embodied AI gets built.",
      heroSubtitle: "A dedicated robotic AI research facility. Sim-to-real transfer, skill acquisition from demonstration, foundation models for embodied agents, and safe AI behavior — all under one roof. Opening 2026/2027.",
      heroImage: "/images/heroes/hero-lab-light.jpg",
    },
  },
  fleet: {
    title: "Fleet",
    content: {
      heroEyebrow: "Robot Fleet · 5 platforms",
      heroTitle: "The robots we run.",
      heroSubtitle: "Five platforms in production. Each integrated with robotManager and Operations Platform. Request software or inquire about a robot.",
      heroImage: "/images/heroes/hero-fleet-light.jpg",
    },
  },
};

export default async function EditPagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const existing = await prisma.page.findUnique({ where: { slug } });
  const defaults = PAGE_DEFAULTS[slug] || { title: slug, content: {} };

  const initial = existing
    ? {
        slug: existing.slug,
        title: existing.title,
        content: (existing.content as Record<string, unknown>) || {},
        metaTitle: existing.metaTitle || "",
        metaDesc: existing.metaDesc || "",
        published: existing.published,
      }
    : {
        slug,
        title: defaults.title,
        content: defaults.content,
        metaTitle: "",
        metaDesc: "",
        published: true,
      };

  return <PageEditor initial={initial} existsInDb={!!existing} />;
}
