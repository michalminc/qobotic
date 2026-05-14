import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { withErrorHandling } from "@/lib/api-handler";

const LeadPatchSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "REJECTED"]).optional(),
  notes: z.string().max(20_000).optional(),
  contactedAt: z.string().datetime().optional().nullable(),
});

export const PATCH = withErrorHandling(
  "admin/leads/[id]:PATCH",
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    const parsed = LeadPatchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const updates: Prisma.LeadUpdateInput = {};
    if (parsed.data.status) updates.status = parsed.data.status;
    if (parsed.data.notes !== undefined) updates.notes = parsed.data.notes;
    if (parsed.data.contactedAt) updates.contactedAt = new Date(parsed.data.contactedAt);

    try {
      const lead = await prisma.lead.update({ where: { id }, data: updates });
      return NextResponse.json(lead);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      throw e;
    }
  },
);

export const DELETE = withErrorHandling(
  "admin/leads/[id]:DELETE",
  async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      await prisma.lead.delete({ where: { id } });
      return NextResponse.json({ ok: true });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      throw e;
    }
  },
);
