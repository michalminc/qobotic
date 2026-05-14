import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { buildRobotData, RobotInputSchema } from "./shared";
import { withErrorHandling } from "@/lib/api-handler";

export const GET = withErrorHandling("admin/robots:GET", async () => {
  const robots = await prisma.robot.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { images: { orderBy: { sortOrder: "asc" } } },
    take: 500,
  });
  return NextResponse.json(robots);
});

export const POST = withErrorHandling("admin/robots:POST", async (req: NextRequest) => {
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

  try {
    const data = buildRobotData(parsed.data);
    const robot = await prisma.robot.create({
      data: {
        ...data,
        images: { create: data.images },
      },
    });
    return NextResponse.json(robot, { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return NextResponse.json({ error: "Slug already in use" }, { status: 400 });
    }
    throw e;
  }
});
