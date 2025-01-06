import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https', // Corrected from 'https:'
        hostname: '*',     // Wildcard for all hostnames
      },
    ],
  },
};

export default nextConfig;
