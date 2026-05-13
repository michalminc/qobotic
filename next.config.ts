import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.100.130", "192.168.100.*", "*.local"],
  async redirects() {
    return [
      { source: "/robots", destination: "/intelligence", permanent: true },
      { source: "/skills", destination: "/operations", permanent: true },
      { source: "/long-term", destination: "/operations", permanent: true },
    ];
  },
};

export default nextConfig;
