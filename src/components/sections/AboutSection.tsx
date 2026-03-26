import Image from "next/image";
import { Home, MapPin, Smile, Sun } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { localize } from "@/lib/localize";
import type { Settings } from "@/lib/types";

interface AboutSectionProps {
  settings: Settings;
  dict: { label: string; locationText: string; rooms: string; roomsDesc: string; location: string; locationDesc: string; satisfaction: string; satisfactionDesc: string; seaView: string; seaViewDesc: string };
  lang: string;
}

export default function AboutSection({ settings, dict, lang }: AboutSectionProps) {
  const features = [
    { icon: Home, title: dict.rooms, desc: dict.roomsDesc },
    { icon: MapPin, title: dict.location, desc: dict.locationDesc },
    { icon: Smile, title: dict.satisfaction, desc: dict.satisfactionDesc },
    { icon: Sun, title: dict.seaView, desc: dict.seaViewDesc },
  ];

  return (
    <section id="hakkimizda" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative w-full h-[450px] lg:h-[550px]">
                <Image src={settings.about_image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"} alt="Hotel By Karaaslan Inn" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="hidden lg:block absolute -bottom-8 -right-8 w-48 h-48 border-2 border-accent -z-10" />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div>
              <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">{dict.label}</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-primary leading-tight mb-6">{localize(settings, "about_title", lang)}</h2>
              <div className="w-16 h-0.5 bg-accent mb-6" />
              <p className="text-text-light text-base leading-8 mb-4">{localize(settings, "about_text", lang)}</p>
              <p className="text-text-light text-base leading-8">{dict.locationText}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                {features.map((f) => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="w-11 h-11 min-w-[2.75rem] flex items-center justify-center bg-cream text-accent"><f.icon size={20} /></div>
                    <div>
                      <h4 className="text-xs font-bold tracking-[1px] uppercase text-primary mb-1">{f.title}</h4>
                      <p className="text-sm text-text-light">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
