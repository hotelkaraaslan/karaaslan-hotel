import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "nfbgrcdtwlgwhnzuqfyf.supabase.co",
      },
    ],
  },
};

export default nextConfig;
