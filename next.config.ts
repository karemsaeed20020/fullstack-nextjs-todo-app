import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {}, // ✅ correct type
  },
};

export default nextConfig;
