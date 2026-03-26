import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/dictionaries";
import HeroSlider from "@/components/sections/HeroSlider";
import BookingBar from "@/components/sections/BookingBar";
import AboutSection from "@/components/sections/AboutSection";
import RoomsSection from "@/components/sections/RoomsSection";
import VenuesSection from "@/components/sections/VenuesSection";
import GallerySection from "@/components/sections/GallerySection";
import KusadasiSection from "@/components/sections/KusadasiSection";
import ReservationCTA from "@/components/sections/ReservationCTA";
import { getSliders, getRooms, getVenues, getGallery, getPlaces, getSettings } from "@/lib/queries";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: dict.meta.homeTitle, description: dict.meta.homeDesc };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  const [sliders, rooms, venues, gallery, places, settings] = await Promise.all([
    getSliders(), getRooms(), getVenues(), getGallery(), getPlaces(), getSettings(),
  ]);

  return (
    <main>
      <HeroSlider sliders={sliders} reservationUrl={settings.reservation_url} dict={dict.hero} lang={lang} />
      <BookingBar reservationUrl={settings.reservation_url} dict={dict.booking} />
      <AboutSection settings={settings} dict={dict.about} lang={lang} />
      <RoomsSection rooms={rooms} dict={dict.rooms} lang={lang} />
      <VenuesSection venues={venues} dict={dict.venues} lang={lang} />
      <GallerySection images={gallery} dict={dict.gallery} lang={lang} />
      <KusadasiSection places={places} settings={settings} dict={dict.kusadasi} lang={lang} />
      <ReservationCTA reservationUrl={settings.reservation_url} dict={dict.reservation} />
    </main>
  );
}
