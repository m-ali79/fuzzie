import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
