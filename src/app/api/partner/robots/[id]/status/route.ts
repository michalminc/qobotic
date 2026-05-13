import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import {
  requirePartner,
  jsonError,
  jsonSuccess,
} from "@/lib/api-helpers";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const authUser = requirePartner(req);
    const { id } = await params;

    const robot = await prisma.robot.findUnique({
      where: { id },
      include: { partner: { select: { userId: true } } },
    });

    if (!robot) {
      return jsonError("Robot not found", 404);
    }

    if (robot.partner.userId !== authUser.id) {
      return jsonError("Forbidden", 403);
    }

    const newStatus =
      robot.status === "AVAILABLE" ? "MAINTENANCE" : "AVAILABLE";

    const updated = await prisma.robot.update({
      where: { id },
      data: { status: newStatus as "AVAILABLE" | "MAINTENANCE" },
    });

    return jsonSuccess(updated);
  } catch (error) {
    if (error instanceof Response || (error && typeof error === "object" && "status" in error)) {
      return error as Response;
    }
    console.error("PATCH /api/partner/robots/[id]/status error:", error);
    return jsonError("Internal server error", 500);
  }
}
