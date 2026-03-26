import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, hasLocale, type Locale } from "@/dictionaries";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ReservationCTA from "@/components/sections/ReservationCTA";
import { getRooms, getSettings } from "@/lib/queries";
import { Eye, Layers, ArrowRight, Check } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: dict.meta.roomsTitle, description: dict.meta.roomsDesc };
}

export default async function OdalarPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, rooms, settings] = await Promise.all([getDictionary(lang as Locale), getRooms(), getSettings()]);
  const lp = lang === "tr" ? "" : `/${lang}`;

  return (
    <main>
      <PageHero title={dict.rooms.title} subtitle={dict.rooms.subtitle} imageUrl="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80" />
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          {rooms.map((room, i) => (
            <ScrollReveal key={room.id}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 mb-20 last:mb-0 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative h-[350px] lg:h-[500px]">
                  <Image src={room.image_url} alt={room.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent flex justify-end gap-4">
                    <span className="flex items-center gap-1.5 text-white text-xs font-medium"><Layers size={14} />{room.room_count} {dict.rooms.room}</span>
                    <span className="flex items-center gap-1.5 text-white text-xs font-medium"><Eye size={14} />{room.view_type}</span>
                  </div>
                </div>
                <div className={`flex flex-col justify-center p-10 lg:p-16 ${i % 2 === 0 ? "bg-cream" : "bg-white border border-cream-dark"}`}>
                  <div className="font-[family-name:var(--font-heading)] text-sm text-accent tracking-[2px] mb-2">{String(i + 1).padStart(2, "0")}</div>
                  <h2 className="font-[family-name:var(--font-heading)] text-3xl text-primary mb-4">{room.title}</h2>
                  <p className="text-text-light leading-8 mb-6">{room.description}</p>
                  {room.features.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-8">
                      {room.features.map((feature) => (
                        <span key={feature} className="flex items-center gap-2 text-sm text-text-light"><Check size={14} className="text-accent" />{feature}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4 flex-wrap">
                    <Link href={`${lp}/odalar/${room.slug}`} className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[2px] uppercase text-accent hover:gap-4 transition-all">{dict.rooms.viewDetails}<ArrowRight size={18} /></Link>
                    <a href={settings.reservation_url} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-accent text-white text-xs font-semibold tracking-[2px] uppercase hover:bg-accent-dark transition-colors">{dict.nav.reservation}</a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <ReservationCTA reservationUrl={settings.reservation_url} dict={dict.reservation} />
    </main>
  );
}
