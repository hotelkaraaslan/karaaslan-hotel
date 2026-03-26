import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/sections/GalleryGrid";
import { getGallery, getSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Galeri | Hotel By Karaaslan Inn",
  description: "Hotel By Karaaslan Inn fotoğraf galerisi. Otelimizi görsellerle keşfedin.",
};

export default async function GaleriPage() {
  const [gallery, settings] = await Promise.all([getGallery(), getSettings()]);

  return (
    <>
      <Navbar reservationUrl={settings.reservation_url} />
      <main>
        <PageHero
          title="Galeri"
          subtitle="Otelimizden kareler"
          imageUrl="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80"
        />
        <GalleryGrid images={gallery} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
