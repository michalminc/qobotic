import { prisma } from "@/lib/db";
import FleetContent, { type Robot } from "./fleet-content";

export const revalidate = 60;

const CATEGORY_LABEL: Record<string, { label: string; slug: string }> = {
  HUMANOID:    { label: "Humanoid",            slug: "humanoids" },
  INDUSTRIAL:  { label: "Industrial",          slug: "industrial" },
  QUADRUPED:   { label: "Quadruped",           slug: "quadrupeds" },
  RECEPTION:   { label: "Reception Robot",     slug: "reception" },
  CUSTOM:      { label: "Custom",              slug: "custom" },
};

const STATUS_DISPLAY: Record<string, "production" | "lab" | "coming"> = {
  PRODUCTION: "production",
  LAB:        "lab",
  COMING:     "coming",
};

export default async function FleetPage() {
  const dbRobots = await prisma.robot.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });

  const robots: Robot[] = dbRobots.map((r) => {
    const cat = CATEGORY_LABEL[r.category] || { label: r.category, slug: r.category.toLowerCase() };
    return {
      id: r.id,
      slug: r.slug,
      name: r.name,
      brand: r.brand,
      category: cat.label,
      categorySlug: cat.slug,
      tagline: r.tagline,
      description: r.description,
      specs: (r.specs as { label: string; value: string }[]) || [],
      features: (r.features as string[]) || [],
      images: r.images.map((i) => i.url),
      status: STATUS_DISPLAY[r.status] || "production",
    };
  });

  return <FleetContent robots={robots} />;
}
