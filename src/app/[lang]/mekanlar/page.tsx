import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, hasLocale, type Locale } from "@/dictionaries";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ReservationCTA from "@/components/sections/ReservationCTA";
import { getVenues, getSettings, getPageHeroImage } from "@/lib/queries";
import { localize } from "@/lib/localize";
import { getReservationUrl } from "@/lib/types";
import { ArrowRight } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: dict.meta.venuesTitle, description: dict.meta.venuesDesc };
}

export default async function MekanlarPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, venues, settings, heroImage] = await Promise.all([getDictionary(lang as Locale), getVenues(), getSettings(), getPageHeroImage('venues')]);
  const lp = lang === "tr" ? "" : `/${lang}`;

  return (
    <main>
      <PageHero title={dict.venues.label} subtitle={dict.venues.subtitle} imageUrl={heroImage || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"} />
      <section className="py-24 lg:py-32 bg-white">
        {venues.map((venue, i) => (
          <ScrollReveal key={venue.id}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 mb-0.5 min-h-[450px] lg:min-h-[500px]`}>
              <div className={`relative min-h-[350px] lg:min-h-[500px] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image src={venue.image_url} alt={localize(venue, "title", lang)} fill className="object-cover" sizes="50vw" />
              </div>
              <div className={`flex flex-col justify-center p-10 lg:p-20 ${i % 2 === 0 ? "bg-cream" : "bg-white"} ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="font-[family-name:var(--font-heading)] text-5xl text-accent/20 font-bold mb-4">{String(i + 1).padStart(2, "0")}</div>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl text-primary mb-4">{localize(venue, "title", lang)}</h2>
                <p className="text-text-light leading-8 mb-8">{localize(venue, "description", lang)}</p>
                <Link href={`${lp}/mekanlar/${venue.slug}`} className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[2px] uppercase text-accent hover:gap-4 transition-all">{dict.venues.viewDetails}<ArrowRight size={18} /></Link>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>
      <ReservationCTA reservationUrl={getReservationUrl(settings.reservation_url, lang)} dict={dict.reservation} />
    </main>
  );
}
