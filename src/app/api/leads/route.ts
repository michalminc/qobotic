import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { withErrorHandling } from "@/lib/api-handler";

const LeadSchema = z.object({
  type: z.enum(["SOFTWARE", "ROBOT_INQUIRY", "GENERAL"]).optional(),
  email: z.string().email().max(254),
  name: z.string().trim().max(120).optional().nullable(),
  company: z.string().trim().max(160).optional().nullable(),
  message: z.string().trim().max(4000).optional().nullable(),
  robotSlug: z.string().trim().max(120).regex(/^[a-z0-9-]+$/i).optional().nullable(),
  source: z.string().trim().max(80).optional().nullable(),
  metadata: z.record(z.string(), z.unknown()).optional().nullable(),
  // Honeypot: bots fill this; humans don't see it.
  website: z.string().max(0).optional(),
});

export const POST = withErrorHandling("leads:POST", async (req: NextRequest) => {
  const ip = getClientIp(req);
  const rl = await rateLimit(`leads:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot tripped — return 200 to avoid signalling.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  let robotId: string | null = null;
  if (data.robotSlug) {
    const r = await prisma.robot.findUnique({ where: { slug: data.robotSlug }, select: { id: true } });
    robotId = r?.id || null;
  }

  const lead = await prisma.lead.create({
    data: {
      type: data.type || "GENERAL",
      email: data.email.toLowerCase().trim(),
      name: data.name || null,
      company: data.company || null,
      message: data.message || null,
      robotId,
      source: data.source || null,
      metadata: (data.metadata ?? undefined) as Prisma.InputJsonValue | undefined,
    },
  });

  return NextResponse.json({ ok: true, id: lead.id });
});
