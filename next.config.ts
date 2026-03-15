import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/wild", destination: "/commission#the-wild", permanent: true }];
  },
};

export default nextConfig;
