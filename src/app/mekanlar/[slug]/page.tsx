import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ReservationCTA from "@/components/sections/ReservationCTA";
import { getVenueBySlug, getVenues, getSettings } from "@/lib/queries";

export async function generateStaticParams() {
  const venues = await getVenues();
  return venues.map((venue) => ({ slug: venue.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) return { title: "Mekan Bulunamadı" };
  return {
    title: `${venue.title} | Hotel By Karaaslan Inn`,
    description: venue.short_description || venue.description,
  };
}

export default async function VenueDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [venue, settings] = await Promise.all([getVenueBySlug(slug), getSettings()]);

  if (!venue) notFound();

  return (
    <>
      <Navbar reservationUrl={settings.reservation_url} />
      <main>
        <PageHero title={venue.title} imageUrl={venue.image_url} />

        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-[1000px] mx-auto px-8">
            <ScrollReveal>
              <p className="text-text-light text-base leading-8 mb-10">{venue.description}</p>

              {venue.gallery_images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {venue.gallery_images.map((img, i) => (
                    <div key={i} className="relative h-[200px] md:h-[250px]">
                      <Image src={img} alt={`${venue.title} ${i + 1}`} fill className="object-cover" sizes="33vw" />
                    </div>
                  ))}
                </div>
              )}
            </ScrollReveal>
          </div>
        </section>

        <ReservationCTA reservationUrl={settings.reservation_url} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
