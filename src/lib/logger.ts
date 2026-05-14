// Minimal structured logger. Writes JSON lines to stderr so Docker/Vercel/etc
// pick them up. Replace with Pino if you need rotation, levels-by-namespace, etc.

type Level = "debug" | "info" | "warn" | "error";

type LogContext = Record<string, unknown>;

function emit(level: Level, msg: string, ctx?: LogContext) {
  const line = {
    t: new Date().toISOString(),
    level,
    msg,
    ...(ctx || {}),
  };
  // Always stderr — keeps logs out of stdout where Next prints user data.
  process.stderr.write(JSON.stringify(line) + "\n");
}

function errorContext(err: unknown): LogContext {
  if (err instanceof Error) {
    return {
      err: { name: err.name, message: err.message, stack: err.stack },
    };
  }
  return { err: String(err) };
}

export const logger = {
  debug(msg: string, ctx?: LogContext) {
    if (process.env.LOG_LEVEL === "debug") emit("debug", msg, ctx);
  },
  info(msg: string, ctx?: LogContext) {
    emit("info", msg, ctx);
  },
  warn(msg: string, ctx?: LogContext) {
    emit("warn", msg, ctx);
  },
  error(msg: string, err?: unknown, ctx?: LogContext) {
    emit("error", msg, { ...(ctx || {}), ...errorContext(err) });
  },
};
