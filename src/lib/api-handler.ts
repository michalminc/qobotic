import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

type Handler<TArgs extends unknown[]> = (...args: TArgs) => Promise<Response>;

// Wrap a Route Handler so any thrown error is logged and returned as a
// generic 500 — no raw stack to clients, full stack to stderr.
export function withErrorHandling<TArgs extends unknown[]>(
  routeName: string,
  handler: Handler<TArgs>,
): Handler<TArgs> {
  return async (...args: TArgs) => {
    try {
      return await handler(...args);
    } catch (err) {
      logger.error(`api:${routeName} unhandled error`, err);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  };
}
