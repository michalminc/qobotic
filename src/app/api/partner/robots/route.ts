import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import {
  requirePartner,
  jsonError,
  jsonSuccess,
} from "@/lib/api-helpers";
import { createRobotSchema } from "@/lib/validation";

export async function GET(req: NextRequest) {
  try {
    const authUser = requirePartner(req);

    const partner = await prisma.partnerProfile.findUnique({
      where: { userId: authUser.id },
      select: { id: true },
    });

    if (!partner) {
      return jsonError("Partner profile not found", 404);
    }

    const { searchParams } = req.nextUrl;
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = { partnerId: partner.id };

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { brand: { contains: search, mode: "insensitive" } },
        { sku: { contains: search, mode: "insensitive" } },
      ];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any = { createdAt: "desc" };
    if (sortBy === "name") orderBy = { name: "asc" };
    else if (sortBy === "price") orderBy = { rentalPrice: "asc" };
    else if (sortBy === "status") orderBy = { status: "asc" };

    const robots = await prisma.robot.findMany({
      where,
      orderBy,
      include: {
        images: { select: { id: true } },
        orders: {
          where: { status: { in: ["PENDING", "APPROVED", "SHIPPED", "ACTIVE"] } },
          select: {
            id: true,
            orderNumber: true,
            type: true,
            status: true,
            amount: true,
            createdAt: true,
          },
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    const result = robots.map((robot) => ({
      ...robot,
      imageCount: robot.images.length,
      currentOrder: robot.orders[0] ?? null,
      images: undefined,
      orders: undefined,
    }));

    return jsonSuccess(result);
  } catch (error) {
    if (error instanceof Response || (error && typeof error === "object" && "status" in error)) {
      return error as Response;
    }
    console.error("GET /api/partner/robots error:", error);
    return jsonError("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = requirePartner(req);

    const partner = await prisma.partnerProfile.findUnique({
      where: { userId: authUser.id },
      select: { id: true },
    });

    if (!partner) {
      return jsonError("Partner profile not found", 404);
    }

    const body = await req.json();
    const parsed = createRobotSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0].message, 400);
    }

    const data = parsed.data;

    // Auto-generate slug from name
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    const slug =
      data.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "") +
      "-" +
      randomSuffix;

    // Extract images before passing to Prisma
    const { images: imageUrls, ...robotData } = data as any;

    const robot = await prisma.robot.create({
      data: {
        ...robotData,
        slug,
        partnerId: partner.id,
      },
    });

    // Create robot images if provided
    if (imageUrls && Array.isArray(imageUrls) && imageUrls.length > 0) {
      await prisma.robotImage.createMany({
        data: imageUrls.map((url: string, i: number) => ({
          robotId: robot.id,
          url,
          alt: robot.name,
          sortOrder: i,
        })),
      });
    }

    return jsonSuccess(robot, 201);
  } catch (error) {
    if (error instanceof Response || (error && typeof error === "object" && "status" in error)) {
      return error as Response;
    }
    console.error("POST /api/partner/robots error:", error);
    return jsonError("Internal server error", 500);
  }
}
