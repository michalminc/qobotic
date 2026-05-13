import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { jsonError, jsonSuccess } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const type = searchParams.get("type");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = { published: true };

    if (type) {
      where.type = type;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { brand: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any = { createdAt: "desc" };
    if (sortBy === "price-asc") orderBy = { rentalPrice: "asc" };
    else if (sortBy === "price-desc") orderBy = { rentalPrice: "desc" };

    const robots = await prisma.robot.findMany({
      where,
      orderBy,
      include: {
        images: { orderBy: { sortOrder: "asc" }, take: 1 },
      },
    });

    return jsonSuccess(robots);
  } catch (error) {
    console.error("GET /api/robots error:", error);
    return jsonError(String(error), 500);
  }
}
