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
  async redirects() {
    return [
      // Old .aspx URLs
      {
        source: "/rezervasyon.aspx",
        destination: "/rezervasyon",
        permanent: true,
      },
      {
        source: "/covid-19-bilgilendirme.aspx",
        destination: "/",
        permanent: true,
      },
      // Old room URLs (were at root level, now under /odalar/)
      {
        source: "/standart-oda",
        destination: "/odalar/standart-oda",
        permanent: true,
      },
      {
        source: "/suit-oda",
        destination: "/odalar/suit-oda",
        permanent: true,
      },
      // Catch any other .aspx pages
      {
        source: "/:path*.aspx",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
