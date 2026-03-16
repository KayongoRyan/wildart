import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  async redirects() {
    return [
      { source: "/wild", destination: "/shop#the-wild", permanent: true },
      { source: "/tuzivugire", destination: "/conservation", permanent: true },
      { source: "/tuzivugire/:path*", destination: "/conservation/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
