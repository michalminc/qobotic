import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { withErrorHandling } from "@/lib/api-handler";

const SlugRe = /^[a-z0-9-]+$/;

const PageInputSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  content: z.record(z.string(), z.unknown()).optional(),
  metaTitle: z.string().trim().max(200).optional().nullable(),
  metaDesc: z.string().trim().max(400).optional().nullable(),
  published: z.boolean().optional(),
});

export const GET = withErrorHandling(
  "admin/pages/[slug]:GET",
  async (_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    if (!SlugRe.test(slug)) return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    const page = await prisma.page.findUnique({ where: { slug } });
    if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(page);
  },
);

export const PUT = withErrorHandling(
  "admin/pages/[slug]:PUT",
  async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  if (!SlugRe.test(slug) || slug.length > 120) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = PageInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }
  const { title, content, metaTitle, metaDesc, published } = parsed.data;

  const page = await prisma.page.upsert({
    where: { slug },
    create: {
      slug,
      title: title || slug,
      content: (content || {}) as Prisma.InputJsonValue,
      metaTitle: metaTitle || null,
      metaDesc: metaDesc || null,
      published: published !== false,
    },
    update: {
      title,
      content: (content || {}) as Prisma.InputJsonValue,
      metaTitle: metaTitle || null,
      metaDesc: metaDesc || null,
      published: published !== false,
    },
  });

    return NextResponse.json(page);
  },
);
