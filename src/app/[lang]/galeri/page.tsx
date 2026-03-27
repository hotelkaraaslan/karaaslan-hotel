import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/dictionaries";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/sections/GalleryGrid";
import { getGallery, getSettings, getPageHeroImage } from "@/lib/queries";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: dict.meta.galleryTitle, description: dict.meta.galleryDesc };
}

export default async function GaleriPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, gallery, heroImage] = await Promise.all([getDictionary(lang as Locale), getGallery(), getPageHeroImage('gallery')]);

  return (
    <main>
      <PageHero title={dict.gallery.label} subtitle={dict.gallery.subtitle} imageUrl={heroImage || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80"} />
      <GalleryGrid images={gallery} dict={dict.gallery} />
    </main>
  );
}
