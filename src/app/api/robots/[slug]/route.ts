import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { jsonError, jsonSuccess } from "@/lib/api-helpers";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(
  _req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { slug } = await params;

    const robot = await prisma.robot.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        installedSkills: {
          include: { skill: true },
        },
        reviews: {
          orderBy: { createdAt: "desc" },
          include: {
            customer: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
        },
      },
    });

    if (!robot) {
      return jsonError("Robot not found", 404);
    }

    return jsonSuccess(robot);
  } catch (error) {
    console.error("GET /api/robots/[slug] error:", error);
    return jsonError("Internal server error", 500);
  }
}
