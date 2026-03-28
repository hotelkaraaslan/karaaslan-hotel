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
      // Old PDF document URLs → Supabase storage
      {
        source: "/kvkk_basvuru_formu.pdf",
        destination: "https://nfbgrcdtwlgwhnzuqfyf.supabase.co/storage/v1/object/public/images/documents/1774599254673-kvkk_basvuru_formu.pdf",
        permanent: true,
      },
      {
        source: "/gizlilik.pdf",
        destination: "https://nfbgrcdtwlgwhnzuqfyf.supabase.co/storage/v1/object/public/images/documents/1774599266597-gizlilik.pdf",
        permanent: true,
      },
      {
        source: "/kisisel_verileri_koruma_saklama_imha_politikasi.pdf",
        destination: "https://nfbgrcdtwlgwhnzuqfyf.supabase.co/storage/v1/object/public/images/documents/1774599286781-kisisel_verileri_koruma_saklama_imha_politikasi.pdf",
        permanent: true,
      },
      {
        source: "/aydinlatma_metni.pdf",
        destination: "https://nfbgrcdtwlgwhnzuqfyf.supabase.co/storage/v1/object/public/images/documents/1774599296495-aydinlatma_metni.pdf",
        permanent: true,
      },
      {
        source: "/surdurulebilirlik-politikalari.pdf",
        destination: "https://nfbgrcdtwlgwhnzuqfyf.supabase.co/storage/v1/object/public/images/documents/1774599306828-surdurulebilirlik-politikalari.pdf",
        permanent: true,
      },
      {
        source: "/surdurulebilirlik-raporu.pdf",
        destination: "https://nfbgrcdtwlgwhnzuqfyf.supabase.co/storage/v1/object/public/images/documents/1774599319664-surdurulebilirlik-raporu.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
