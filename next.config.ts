import type { NextConfig } from "next";
import path from "path";

const projectRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/wild", destination: "/commission#the-wild", permanent: true },
      { source: "/tuzivugire", destination: "/conservation", permanent: true },
      { source: "/tuzivugire/:path*", destination: "/conservation/:path*", permanent: true },
    ];
  },
  turbopack: {
    root: projectRoot,
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  // Fix resolution from wrong directory (e.g. when package.json exists in parent)
  webpack: (config) => {
    config.context = projectRoot;
    config.resolve = config.resolve ?? {};
    config.resolve.modules = [...(config.resolve.modules ?? ["node_modules"]), path.join(projectRoot, "node_modules")];
    return config;
  },
};

export default nextConfig;
