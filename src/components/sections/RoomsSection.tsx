import Image from "next/image";
import Link from "next/link";
import { Eye, Layers, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Room } from "@/lib/types";

interface RoomsSectionProps {
  rooms: Room[];
  dict: { label: string; title: string; description: string; room: string; viewDetails: string };
  lang: string;
}

export default function RoomsSection({ rooms, dict, lang }: RoomsSectionProps) {
  const lp = lang === "tr" ? "" : `/${lang}`;

  return (
    <section id="odalar" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-[1200px] mx-auto px-8">
        <ScrollReveal className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">{dict.label}</span>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-primary mb-6">{dict.title}</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-text-light text-base leading-8 max-w-[650px] mx-auto">{dict.description}</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {rooms.map((room, i) => (
            <ScrollReveal key={room.id} delay={i * 150}>
              <Link href={`${lp}/odalar/${room.slug}`} className="block group bg-white overflow-hidden">
                <div className="relative h-[300px] lg:h-[350px] overflow-hidden">
                  <Image src={room.image_url} alt={room.title} fill className="object-cover transition-transform duration-700 group-hover:scale-108" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent flex justify-end gap-4">
                    <span className="flex items-center gap-1.5 text-white text-xs font-medium"><Layers size={14} />{room.room_count} {dict.room}</span>
                    <span className="flex items-center gap-1.5 text-white text-xs font-medium"><Eye size={14} />{room.view_type}</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="font-[family-name:var(--font-heading)] text-sm text-accent tracking-[2px] mb-2">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl text-primary mb-3">{room.title}</h3>
                  <p className="text-sm text-text-light leading-7 mb-5">{room.short_description || room.description}</p>
                  <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[2px] uppercase text-accent group-hover:gap-4 transition-all">{dict.viewDetails}<ArrowRight size={18} /></span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
