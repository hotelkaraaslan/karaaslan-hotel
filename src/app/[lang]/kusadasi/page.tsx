import { notFound } from "next/navigation";
import Image from "next/image";
import { getDictionary, hasLocale, type Locale } from "@/dictionaries";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ReservationCTA from "@/components/sections/ReservationCTA";
import { getPlaces, getSettings } from "@/lib/queries";
import { MapPin } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: dict.meta.kusadasiTitle, description: dict.meta.kusadasiDesc };
}

export default async function KusadasiPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, places, settings] = await Promise.all([getDictionary(lang as Locale), getPlaces(), getSettings()]);

  return (
    <main>
      <PageHero title={dict.kusadasi.title} subtitle={dict.kusadasi.subtitle} imageUrl="https://images.unsplash.com/photo-1623238913973-21e45cced554?w=1920&q=80" />
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <div className="max-w-[800px] mx-auto text-center mb-20">
              <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">{dict.kusadasi.pearlOfAegean}</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-primary mb-6">{dict.kusadasi.discover}</h2>
              <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
              <p className="text-text-light text-base leading-8">{settings.kusadasi_text}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place, i) => (
              <ScrollReveal key={place.id} delay={i * 100}>
                <div className="group">
                  <div className="relative h-[250px] overflow-hidden mb-5">
                    <Image src={place.image_url || "https://images.unsplash.com/photo-1623238913973-21e45cced554?w=600&q=80"} alt={place.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl text-primary mb-2">{place.title}</h3>
                  {place.distance && <span className="inline-flex items-center gap-1.5 text-xs text-accent font-medium mb-3"><MapPin size={12} />{place.distance}</span>}
                  {place.description && <p className="text-sm text-text-light leading-7">{place.description}</p>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <ReservationCTA reservationUrl={settings.reservation_url} dict={dict.reservation} />
    </main>
  );
}
