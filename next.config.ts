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
      // Redirect old .aspx URLs for SEO
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
    ];
  },
};

export default nextConfig;
