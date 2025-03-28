import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  cache: process.env.NODE_ENV === 'production',
  staticPageGenerationTimeout: 1000,
  output: 'standalone',
  generateEtags: false,
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;
