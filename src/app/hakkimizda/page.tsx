import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ReservationCTA from "@/components/sections/ReservationCTA";
import { getSettings } from "@/lib/queries";
import { Home, MapPin, Smile, Sun, Wifi, Coffee, Car, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda | Hotel By Karaaslan Inn",
  description: "Hotel By Karaaslan Inn hakkında bilgi edinin. Kuşadası'nın kalbinde 63 odalı otelimiz.",
};

const features = [
  { icon: Home, title: "63 Oda", desc: "58 Standart ve 5 Suite oda ile konforlu konaklama" },
  { icon: MapPin, title: "Merkezi Konum", desc: "Kuşadası Marina karşısında eşsiz konum" },
  { icon: Smile, title: "Misafir Memnuniyeti", desc: "Yüksek puanlı hizmet kalitesi" },
  { icon: Sun, title: "Deniz Manzarası", desc: "Odalardan muhteşem Ege manzarası" },
  { icon: Wifi, title: "Ücretsiz Wi-Fi", desc: "Tüm otel genelinde yüksek hızlı internet" },
  { icon: Coffee, title: "Kahvaltı", desc: "Zengin açık büfe kahvaltı" },
  { icon: Car, title: "Transfer", desc: "Havaalanı ve şehir içi transfer hizmeti" },
  { icon: Globe, title: "Çok Dilli Hizmet", desc: "Türkçe, İngilizce ve Almanca destek" },
];

export default async function HakkimizdaPage() {
  const settings = await getSettings();

  return (
    <>
      <Navbar reservationUrl={settings.reservation_url} />
      <main>
        <PageHero
          title="Hakkımızda"
          subtitle="Kuşadası'nda huzurun ve konforun adresi"
          imageUrl="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
        />

        {/* About Content */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-24">
              <ScrollReveal direction="left">
                <div className="relative w-full h-[400px] lg:h-[500px]">
                  <Image
                    src={settings.about_image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"}
                    alt="Hotel By Karaaslan Inn"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div>
                  <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">
                    Hikayemiz
                  </span>
                  <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-primary leading-tight mb-6">
                    {settings.about_title}
                  </h2>
                  <div className="w-16 h-0.5 bg-accent mb-6" />
                  <p className="text-text-light text-base leading-8 mb-4">
                    {settings.about_text}
                  </p>
                  <p className="text-text-light text-base leading-8">
                    Marina karşısındaki eşsiz konumumuz sayesinde hem şehrin canlı atmosferinden hem de denizin dinlendirici huzurundan yararlanabilirsiniz. Misafirlerimize en iyi hizmeti sunmak için sürekli kendimizi yeniliyoruz.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Features Grid */}
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">
                  Hizmetlerimiz
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold text-primary mb-6">
                  Neden Bizi Tercih Etmelisiniz?
                </h2>
                <div className="w-16 h-0.5 bg-accent mx-auto" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 100}>
                  <div className="text-center p-6 bg-cream hover:-translate-y-1 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-white text-accent">
                      <f.icon size={24} />
                    </div>
                    <h4 className="text-sm font-bold uppercase tracking-[1px] text-primary mb-2">
                      {f.title}
                    </h4>
                    <p className="text-sm text-text-light leading-6">{f.desc}</p>
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
