import { notFound } from "next/navigation";
import Image from "next/image";
import { getDictionary, hasLocale, type Locale } from "@/dictionaries";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ReservationCTA from "@/components/sections/ReservationCTA";
import { getRoomBySlug, getRooms, getSettings } from "@/lib/queries";
import { localize, localizeArray } from "@/lib/localize";
import { getReservationUrl } from "@/lib/types";
import { Check, Users, Maximize, Eye } from "lucide-react";

export async function generateStaticParams() {
  const rooms = await getRooms();
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  const room = await getRoomBySlug(slug);
  if (!room) return { title: dict.rooms.notFound };
  return { title: `${localize(room, "title", lang)} | Hotel By Karaaslan Inn`, description: localize(room, "short_description", lang) || localize(room, "description", lang) };
}

export default async function RoomDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, room, settings] = await Promise.all([getDictionary(lang as Locale), getRoomBySlug(slug), getSettings()]);

  if (!room) notFound();

  return (
    <main>
      <PageHero title={localize(room, "title", lang)} imageUrl={room.image_url} />
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1000px] mx-auto px-8">
          <ScrollReveal>
            <div className="flex flex-wrap gap-8 mb-12 pb-12 border-b border-cream-dark">
              <div className="flex items-center gap-3">
                <Users size={20} className="text-accent" />
                <div>
                  <div className="text-xs text-text-light uppercase tracking-wider">{dict.rooms.capacity}</div>
                  <div className="text-sm font-semibold text-primary">{room.capacity} {dict.rooms.person}</div>
                </div>
              </div>
              {room.size_m2 && (
                <div className="flex items-center gap-3">
                  <Maximize size={20} className="text-accent" />
                  <div>
                    <div className="text-xs text-text-light uppercase tracking-wider">{dict.rooms.size}</div>
                    <div className="text-sm font-semibold text-primary">{room.size_m2} m²</div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Eye size={20} className="text-accent" />
                <div>
                  <div className="text-xs text-text-light uppercase tracking-wider">{dict.rooms.view}</div>
                  <div className="text-sm font-semibold text-primary">{localize(room, "view_type", lang)}</div>
                </div>
              </div>
            </div>
            <p className="text-text-light text-base leading-8 mb-10">{localize(room, "description", lang)}</p>
            {localizeArray(room, "features", lang).length > 0 && (
              <div className="mb-12">
                <h3 className="font-[family-name:var(--font-heading)] text-xl text-primary mb-6">{dict.rooms.features}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {localizeArray(room, "features", lang).map((feature) => (
                    <span key={feature} className="flex items-center gap-2.5 text-sm text-text-light p-3 bg-cream"><Check size={16} className="text-accent min-w-4" />{feature}</span>
                  ))}
                </div>
              </div>
            )}
            {room.gallery_images.length > 0 && (
              <div className="mb-12">
                <h3 className="font-[family-name:var(--font-heading)] text-xl text-primary mb-6">{dict.rooms.gallery}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.gallery_images.map((img, i) => (
                    <div key={i} className="relative h-[200px]"><Image src={img} alt={`${localize(room, "title", lang)} ${i + 1}`} fill className="object-cover" sizes="33vw" /></div>
                  ))}
                </div>
              </div>
            )}
            <div className="text-center pt-8">
              <a href={getReservationUrl(settings.reservation_url, lang)} target="_blank" rel="noopener noreferrer" className="inline-block px-12 py-4 bg-accent text-white text-xs font-semibold tracking-[3px] uppercase hover:bg-accent-dark transition-colors">{dict.rooms.bookThis}</a>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <ReservationCTA reservationUrl={getReservationUrl(settings.reservation_url, lang)} dict={dict.reservation} />
    </main>
  );
}
