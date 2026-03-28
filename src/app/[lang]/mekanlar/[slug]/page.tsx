import { notFound } from "next/navigation";
import Image from "next/image";
import { getDictionary, hasLocale, type Locale } from "@/dictionaries";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ReservationCTA from "@/components/sections/ReservationCTA";
import { getVenueBySlug, getVenues, getSettings } from "@/lib/queries";
import { localize } from "@/lib/localize";
import { getReservationUrl } from "@/lib/types";

export async function generateStaticParams() {
  const venues = await getVenues();
  return venues.map((venue) => ({ slug: venue.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  const venue = await getVenueBySlug(slug);
  if (!venue) return { title: dict.venues.notFound };
  return { title: `${localize(venue, "title", lang)} | Hotel By Karaaslan Inn`, description: localize(venue, "short_description", lang) || localize(venue, "description", lang) };
}

export default async function VenueDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, venue, settings] = await Promise.all([getDictionary(lang as Locale), getVenueBySlug(slug), getSettings()]);

  if (!venue) notFound();

  return (
    <main>
      <PageHero title={localize(venue, "title", lang)} imageUrl={venue.image_url} />
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1000px] mx-auto px-8">
          <ScrollReveal>
            <p className="text-text-light text-base leading-8 mb-10">{localize(venue, "description", lang)}</p>
            {venue.gallery_images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {venue.gallery_images.map((img, i) => (
                  <div key={i} className="relative h-[200px] md:h-[250px]"><Image src={img} alt={`${localize(venue, "title", lang)} ${i + 1}`} fill className="object-cover" sizes="33vw" /></div>
                ))}
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>
      <ReservationCTA reservationUrl={getReservationUrl(settings.reservation_url, lang)} dict={dict.reservation} />
    </main>
  );
}
