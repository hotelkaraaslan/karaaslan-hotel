import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ReservationCTA from "@/components/sections/ReservationCTA";
import { getPlaces, getSettings } from "@/lib/queries";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Kuşadası | Hotel By Karaaslan Inn",
  description: "Kuşadası rehberi. Efes, Güvercinada, Dilek Yarımadası ve daha fazlası.",
};

export default async function KusadasiPage() {
  const [places, settings] = await Promise.all([getPlaces(), getSettings()]);

  return (
    <>
      <Navbar reservationUrl={settings.reservation_url} />
      <main>
        <PageHero
          title="Kuşadası"
          subtitle="Ege'nin incisini keşfedin"
          imageUrl="https://images.unsplash.com/photo-1623238913973-21e45cced554?w=1920&q=80"
        />

        {/* Intro */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-[1200px] mx-auto px-8">
            <ScrollReveal>
              <div className="max-w-[800px] mx-auto text-center mb-20">
                <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">
                  Ege&apos;nin İncisi
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-primary mb-6">
                  Kuşadası&apos;nı Keşfedin
                </h2>
                <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
                <p className="text-text-light text-base leading-8">
                  {settings.kusadasi_text}
                </p>
              </div>
            </ScrollReveal>

            {/* Places Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {places.map((place, i) => (
                <ScrollReveal key={place.id} delay={i * 100}>
                  <div className="group">
                    <div className="relative h-[250px] overflow-hidden mb-5">
                      <Image
                        src={place.image_url || `https://images.unsplash.com/photo-1623238913973-21e45cced554?w=600&q=80`}
                        alt={place.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl text-primary mb-2">
                      {place.title}
                    </h3>
                    {place.distance && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-accent font-medium mb-3">
                        <MapPin size={12} />
                        {place.distance}
                      </span>
                    )}
                    {place.description && (
                      <p className="text-sm text-text-light leading-7">{place.description}</p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <ReservationCTA reservationUrl={settings.reservation_url} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
