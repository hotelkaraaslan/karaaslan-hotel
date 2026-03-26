import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Place, Settings } from "@/lib/types";

interface KusadasiSectionProps {
  places: Place[];
  settings: Settings;
  dict: { label: string; title: string };
}

export default function KusadasiSection({ places, settings, dict }: KusadasiSectionProps) {
  return (
    <section id="kusadasi" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <div>
              <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">{dict.label}</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-primary mb-6">{dict.title}</h2>
              <div className="w-16 h-0.5 bg-accent mb-6" />
              <p className="text-text-light text-base leading-8">{settings.kusadasi_text}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
                {places.map((place) => (
                  <div key={place.id} className="p-5 bg-cream hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all">
                    <h4 className="text-xs font-bold uppercase tracking-[1px] text-primary mb-1">{place.title}</h4>
                    <p className="text-xs text-text-light">{place.distance}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <Image src={settings.kusadasi_image || "https://images.unsplash.com/photo-1623238913973-21e45cced554?w=800&q=80"} alt="Kuşadası" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
