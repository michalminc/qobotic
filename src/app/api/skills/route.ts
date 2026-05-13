import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { jsonError, jsonSuccess } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const compatibility = searchParams.get("compatibility");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = { published: true };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (compatibility) {
      where.compatibility = { has: compatibility };
    }

    const skills = await prisma.skill.findMany({
      where,
      orderBy: { installs: "desc" },
    });

    return jsonSuccess(skills);
  } catch (error) {
    console.error("GET /api/skills error:", error);
    return jsonError("Internal server error", 500);
  }
}
