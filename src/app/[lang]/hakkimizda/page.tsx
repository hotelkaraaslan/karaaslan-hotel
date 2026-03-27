import { notFound } from "next/navigation";
import Image from "next/image";
import { getDictionary, hasLocale, type Locale } from "@/dictionaries";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ReservationCTA from "@/components/sections/ReservationCTA";
import { getSettings } from "@/lib/queries";
import { localize } from "@/lib/localize";
import { Home, MapPin, Smile, Sun, Wifi, Coffee, Car, Globe } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: dict.meta.aboutTitle, description: dict.meta.aboutDesc };
}

const icons = [Home, MapPin, Smile, Sun, Wifi, Coffee, Car, Globe];

export default async function HakkimizdaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, settings] = await Promise.all([getDictionary(lang as Locale), getSettings()]);

  const ap = dict.aboutPage;
  const featureData = [
    { title: ap.f_rooms, desc: ap.f_roomsDesc },
    { title: ap.f_location, desc: ap.f_locationDesc },
    { title: ap.f_satisfaction, desc: ap.f_satisfactionDesc },
    { title: ap.f_seaView, desc: ap.f_seaViewDesc },
    { title: ap.f_wifi, desc: ap.f_wifiDesc },
    { title: ap.f_breakfast, desc: ap.f_breakfastDesc },
    { title: ap.f_transfer, desc: ap.f_transferDesc },
    { title: ap.f_multilingual, desc: ap.f_multilingualDesc },
  ];

  return (
    <main>
      <PageHero
        title={dict.about.label}
        subtitle={ap.subtitle}
        imageUrl="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
      />
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-24">
            <ScrollReveal direction="left">
              <div className="relative w-full h-[400px] lg:h-[500px]">
                <Image src={settings.about_image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"} alt="Hotel By Karaaslan Inn" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div>
                <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">{ap.story}</span>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-primary leading-tight mb-6">{localize(settings, "about_title", lang)}</h2>
                <div className="w-16 h-0.5 bg-accent mb-6" />
                <p className="text-text-light text-base leading-8 mb-4">{localize(settings, "about_text", lang)}</p>
                <p className="text-text-light text-base leading-8">{ap.locationText}</p>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">{ap.servicesLabel}</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold text-primary mb-6">{ap.whyUs}</h2>
              <div className="w-16 h-0.5 bg-accent mx-auto" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureData.map((f, i) => {
              const Icon = icons[i];
              return (
                <ScrollReveal key={f.title} delay={i * 100} className="h-full">
                  <div className="text-center p-6 bg-cream hover:-translate-y-1 hover:shadow-lg transition-all h-full">
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-white text-accent"><Icon size={24} /></div>
                    <h4 className="text-sm font-bold uppercase tracking-[1px] text-primary mb-2">{f.title}</h4>
                    <p className="text-sm text-text-light leading-6">{f.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
      <ReservationCTA reservationUrl={settings.reservation_url} dict={dict.reservation} />
    </main>
  );
}
