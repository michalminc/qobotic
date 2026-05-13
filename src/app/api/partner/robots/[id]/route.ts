import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import {
  requirePartner,
  jsonError,
  jsonSuccess,
} from "@/lib/api-helpers";
import { updateRobotSchema } from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const authUser = requirePartner(req);
    const { id } = await params;

    const robot = await prisma.robot.findUnique({
      where: { id },
      include: {
        partner: { select: { userId: true } },
        images: { orderBy: { sortOrder: "asc" } },
        installedSkills: {
          include: { skill: true },
        },
        orders: {
          orderBy: { createdAt: "desc" },
          include: {
            customer: {
              select: { id: true, firstName: true, lastName: true, email: true },
            },
          },
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

    if (robot.partner.userId !== authUser.id) {
      return jsonError("Forbidden", 403);
    }

    return jsonSuccess(robot);
  } catch (error) {
    if (error instanceof Response || (error && typeof error === "object" && "status" in error)) {
      return error as Response;
    }
    console.error("GET /api/partner/robots/[id] error:", error);
    return jsonError("Internal server error", 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const authUser = requirePartner(req);
    const { id } = await params;

    const existing = await prisma.robot.findUnique({
      where: { id },
      include: { partner: { select: { userId: true } } },
    });

    if (!existing) {
      return jsonError("Robot not found", 404);
    }

    if (existing.partner.userId !== authUser.id) {
      return jsonError("Forbidden", 403);
    }

    const body = await req.json();
    const parsed = updateRobotSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0].message, 400);
    }

    const { images, ...rest } = parsed.data;
    const robot = await prisma.robot.update({
      where: { id },
      data: {
        ...rest,
        ...(images !== undefined && {
          images: {
            deleteMany: {},
            create: images.map((url: string) => ({ url })),
          },
        }),
      },
    });

    return jsonSuccess(robot);
  } catch (error) {
    if (error instanceof Response || (error && typeof error === "object" && "status" in error)) {
      return error as Response;
    }
    console.error("PUT /api/partner/robots/[id] error:", error);
    return jsonError("Internal server error", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const authUser = requirePartner(req);
    const { id } = await params;

    const existing = await prisma.robot.findUnique({
      where: { id },
      include: { partner: { select: { userId: true } } },
    });

    if (!existing) {
      return jsonError("Robot not found", 404);
    }

    if (existing.partner.userId !== authUser.id) {
      return jsonError("Forbidden", 403);
    }

    // Check for active orders
    const activeOrders = await prisma.order.count({
      where: {
        robotId: id,
        status: { in: ["PENDING", "APPROVED", "SHIPPED", "ACTIVE"] },
      },
    });

    if (activeOrders > 0) {
      return jsonError("Cannot delete robot with active orders", 400);
    }

    await prisma.robot.delete({ where: { id } });

    return jsonSuccess({ message: "Robot deleted successfully" });
  } catch (error) {
    if (error instanceof Response || (error && typeof error === "object" && "status" in error)) {
      return error as Response;
    }
    console.error("DELETE /api/partner/robots/[id] error:", error);
    return jsonError("Internal server error", 500);
  }
}
