import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withErrorHandling } from "@/lib/api-handler";

export const GET = withErrorHandling("admin/leads:GET", async () => {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { robot: { select: { name: true, slug: true } } },
    take: 500,
  });
  return NextResponse.json(leads);
});
