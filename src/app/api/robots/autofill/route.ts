import { NextRequest, NextResponse } from "next/server";
import { findRobotSpec, getAllRobotNames } from "@/lib/robot-knowledge";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") || "";

  if (!query) {
    return NextResponse.json({ suggestions: getAllRobotNames() });
  }

  const spec = findRobotSpec(query);

  if (!spec) {
    return NextResponse.json({
      found: false,
      suggestions: getAllRobotNames().filter((n) =>
        n.toLowerCase().includes(query.toLowerCase())
      ),
    });
  }

  return NextResponse.json({
    found: true,
    data: spec,
  });
}
