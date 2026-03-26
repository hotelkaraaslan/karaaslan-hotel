import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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

export default async function HomePage() {
  const [sliders, rooms, venues, gallery, places, settings] = await Promise.all([
    getSliders(),
    getRooms(),
    getVenues(),
    getGallery(),
    getPlaces(),
    getSettings(),
  ]);

  return (
    <>
      <Navbar reservationUrl={settings.reservation_url} transparent />
      <main>
        <HeroSlider sliders={sliders} reservationUrl={settings.reservation_url} />
        <BookingBar reservationUrl={settings.reservation_url} />
        <AboutSection settings={settings} />
        <RoomsSection rooms={rooms} />
        <VenuesSection venues={venues} />
        <GallerySection images={gallery} />
        <KusadasiSection places={places} settings={settings} />
        <ReservationCTA reservationUrl={settings.reservation_url} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
