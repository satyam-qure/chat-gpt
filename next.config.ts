import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  cache: process.env.NODE_ENV === 'production',
  staticPageGenerationTimeout: 0,
  output: 'standalone',
  generateEtags: false,
};

export default nextConfig;
