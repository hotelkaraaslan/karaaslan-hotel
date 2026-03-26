import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ReservationCTA from "@/components/sections/ReservationCTA";
import { getVenues, getSettings } from "@/lib/queries";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Mekanlar | Hotel By Karaaslan Inn",
  description: "Hotel By Karaaslan Inn mekanları. Restoran, bar, havuz ve daha fazlası.",
};

export default async function MekanlarPage() {
  const [venues, settings] = await Promise.all([getVenues(), getSettings()]);

  return (
    <>
      <Navbar reservationUrl={settings.reservation_url} />
      <main>
        <PageHero
          title="Mekanlar"
          subtitle="Otelimizin benzersiz mekanlarını keşfedin"
          imageUrl="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
        />

        <section className="py-24 lg:py-32 bg-white">
          {venues.map((venue, i) => (
            <ScrollReveal key={venue.id}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 mb-0.5 min-h-[450px] lg:min-h-[500px]`}>
                <div className={`relative min-h-[350px] lg:min-h-[500px] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image src={venue.image_url} alt={venue.title} fill className="object-cover" sizes="50vw" />
                </div>
                <div className={`flex flex-col justify-center p-10 lg:p-20 ${i % 2 === 0 ? "bg-cream" : "bg-white"} ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="font-[family-name:var(--font-heading)] text-5xl text-accent/20 font-bold mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h2 className="font-[family-name:var(--font-heading)] text-3xl text-primary mb-4">{venue.title}</h2>
                  <p className="text-text-light leading-8 mb-8">{venue.description}</p>
                  <Link href={`/mekanlar/${venue.slug}`} className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[2px] uppercase text-accent hover:gap-4 transition-all">
                    Detayları Gör
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </section>

        <ReservationCTA reservationUrl={settings.reservation_url} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
