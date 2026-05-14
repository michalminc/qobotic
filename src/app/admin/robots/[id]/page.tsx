import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import RobotForm from "../robot-form";

export const dynamic = "force-dynamic";

export default async function EditRobotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const robot = await prisma.robot.findUnique({
    where: { id },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
  if (!robot) notFound();

  return (
    <RobotForm
      mode="edit"
      initial={{
        id: robot.id,
        slug: robot.slug,
        name: robot.name,
        brand: robot.brand,
        category: robot.category,
        status: robot.status,
        published: robot.published,
        sortOrder: robot.sortOrder,
        tagline: robot.tagline,
        description: robot.description,
        specs: (robot.specs as { label: string; value: string }[]) || [],
        features: (robot.features as string[]) || [],
        images: robot.images.map((img) => ({
          id: img.id,
          url: img.url,
          alt: img.alt || "",
          sortOrder: img.sortOrder,
        })),
      }}
    />
  );
}
