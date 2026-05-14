import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { deleteObject } from "@/lib/storage";
import { withErrorHandling } from "@/lib/api-handler";

export const DELETE = withErrorHandling(
  "admin/media/[id]:DELETE",
  async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      const asset = await prisma.mediaAsset.delete({ where: { id } });
      await deleteObject(asset.url);
      return NextResponse.json({ ok: true });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      throw e;
    }
  },
);
