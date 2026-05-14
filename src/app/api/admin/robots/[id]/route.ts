import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { buildRobotData, RobotInputSchema } from "../shared";
import { withErrorHandling } from "@/lib/api-handler";

export const GET = withErrorHandling(
  "admin/robots/[id]:GET",
  async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const robot = await prisma.robot.findUnique({
      where: { id },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    });
    if (!robot) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(robot);
  },
);

export const PUT = withErrorHandling(
  "admin/robots/[id]:PUT",
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    const parsed = RobotInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }
    const data = buildRobotData(parsed.data);

    try {
      const updated = await prisma.$transaction(async (tx) => {
        await tx.robotImage.deleteMany({ where: { robotId: id } });
        return tx.robot.update({
          where: { id },
          data: {
            ...data,
            images: { create: data.images },
          },
          include: { images: { orderBy: { sortOrder: "asc" } } },
        });
      });
      return NextResponse.json(updated);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") return NextResponse.json({ error: "Slug already in use" }, { status: 400 });
        if (e.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      throw e;
    }
  },
);

export const DELETE = withErrorHandling(
  "admin/robots/[id]:DELETE",
  async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      await prisma.robot.delete({ where: { id } });
      return NextResponse.json({ ok: true });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      throw e;
    }
  },
);
