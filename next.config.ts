import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Robust __dirname for both ESM and CJS contexts when loaded by Next.js.
const projectDir = typeof __dirname !== "undefined"
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

function s3RemotePattern() {
  const url = process.env.S3_PUBLIC_URL;
  if (!url) return [];
  try {
    const { protocol, hostname } = new URL(url);
    return [{ protocol: protocol.replace(":", "") as "http" | "https", hostname }];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  turbopack: {
    root: projectDir,
  },
  allowedDevOrigins: ["192.168.100.130", "192.168.100.*", "*.local"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: s3RemotePattern(),
  },
  async redirects() {
    return [
      { source: "/robots", destination: "/intelligence", permanent: true },
      { source: "/skills", destination: "/operations", permanent: true },
      { source: "/long-term", destination: "/operations", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
