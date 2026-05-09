import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // next.config.js
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'nzusi.wizards.co.in', pathname: '/public/storage/**' }
    ]
  }
};

export default nextConfig;
