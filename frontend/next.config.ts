import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  async redirects() {
    return [
      { source: "/wild", destination: "/commission#the-wild", permanent: true },
      { source: "/tuzivugire", destination: "/conservation", permanent: true },
      { source: "/tuzivugire/:path*", destination: "/conservation/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
