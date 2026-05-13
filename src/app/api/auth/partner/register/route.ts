import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import { partnerRegisterSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = partnerRegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 },
      );
    }

    const { email, password, firstName, lastName, companyName, taxId, phone, website } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashed,
          firstName,
          lastName,
          role: "PARTNER",
        },
      });

      const partnerProfile = await tx.partnerProfile.create({
        data: {
          userId: user.id,
          companyName,
          taxId,
          phone,
          website,
        },
      });

      return { user, partnerProfile };
    });

    const token = await signToken(result.user.id, result.user.role);

    const res = NextResponse.json({
      user: {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        role: result.user.role,
      },
      partnerProfile: {
        id: result.partnerProfile.id,
        companyName: result.partnerProfile.companyName,
        taxId: result.partnerProfile.taxId,
        phone: result.partnerProfile.phone,
        website: result.partnerProfile.website,
      },
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Partner register error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
