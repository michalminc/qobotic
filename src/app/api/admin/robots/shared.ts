import { z } from "zod";

const SlugRe = /^[a-z0-9-]+$/;
const InternalUrl = z.string().trim().max(2048).regex(/^(\/|https?:\/\/)/, "Must be absolute URL or root-relative path");

export const RobotInputSchema = z.object({
  slug: z.string().trim().min(1).max(120).regex(SlugRe, "Slug must be lowercase alphanumeric with dashes"),
  name: z.string().trim().min(1).max(160),
  brand: z.string().trim().max(120).optional(),
  category: z.enum(["HUMANOID", "INDUSTRIAL", "QUADRUPED", "RECEPTION", "CUSTOM"]),
  status: z.enum(["PRODUCTION", "LAB", "COMING", "ARCHIVED"]),
  published: z.boolean().optional(),
  sortOrder: z.number().int().min(-10_000).max(10_000).optional(),
  tagline: z.string().trim().max(400).optional(),
  description: z.string().trim().max(20_000).optional(),
  specs: z.array(z.object({
    label: z.string().trim().min(1).max(80),
    value: z.string().trim().min(1).max(200),
  })).max(50).optional(),
  features: z.array(z.string().trim().min(1).max(200)).max(50).optional(),
  images: z.array(z.object({
    url: InternalUrl,
    alt: z.string().trim().max(250).optional(),
    sortOrder: z.number().int().min(0).max(1000).optional(),
  })).max(30).optional(),
});

export type RobotInput = z.infer<typeof RobotInputSchema>;

export function buildRobotData(body: RobotInput) {
  return {
    slug: body.slug,
    name: body.name,
    brand: body.brand || "",
    category: body.category,
    status: body.status,
    published: !!body.published,
    sortOrder: body.sortOrder || 0,
    tagline: body.tagline || "",
    description: body.description || "",
    specs: body.specs || [],
    features: body.features || [],
    images: (body.images || []).map((img, idx) => ({
      url: img.url,
      alt: img.alt || body.name,
      sortOrder: img.sortOrder ?? idx,
    })),
  };
}
