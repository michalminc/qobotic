import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { prisma } from "@/lib/db";
import { putObject } from "@/lib/storage";
import { withErrorHandling } from "@/lib/api-handler";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

const ALLOWED_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

function detectMime(buf: Buffer): string | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "image/png";
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return "image/gif";
  if (
    buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
    buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50
  ) return "image/webp";
  if (buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70) {
    const brand = buf.subarray(8, 12).toString("ascii");
    if (brand === "avif" || brand === "avis" || brand === "mif1") return "image/avif";
  }
  return null;
}

export const GET = withErrorHandling("admin/media:GET", async () => {
  const items = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  return NextResponse.json(items);
});

export const POST = withErrorHandling("admin/media:POST", async (req: NextRequest) => {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }
  if (file.size === 0) {
    return NextResponse.json({ error: "Empty file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 413 });
  }

  const folderRaw = (formData.get("folder") as string | null) || "general";
  const alt = ((formData.get("alt") as string | null) || "").slice(0, 250) || null;
  const safeFolder = folderRaw.replace(/[^a-z0-9-]/gi, "").toLowerCase().slice(0, 40) || "general";

  const bytes = Buffer.from(await file.arrayBuffer());
  const detected = detectMime(bytes);
  if (!detected || !ALLOWED_MIME[detected]) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
  }

  const ext = ALLOWED_MIME[detected];
  const hash = crypto.randomBytes(8).toString("hex");
  const filename = `${Date.now()}-${hash}.${ext}`;
  const key = `${safeFolder}/${filename}`;

  const { url } = await putObject(key, bytes, detected);

  const asset = await prisma.mediaAsset.create({
    data: {
      url,
      filename,
      mimeType: detected,
      size: bytes.length,
      folder: safeFolder,
      alt,
    },
  });

  return NextResponse.json(asset);
});
