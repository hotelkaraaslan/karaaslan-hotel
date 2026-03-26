import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Venue } from "@/lib/types";

interface VenuesSectionProps {
  venues: Venue[];
}

export default function VenuesSection({ venues }: VenuesSectionProps) {
  return (
    <section id="mekanlar" className="py-24 lg:py-32 bg-white">
      <ScrollReveal className="text-center mb-16 px-8">
        <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">
          Mekanlar
        </span>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-primary mb-6">
          Otelimizi Keşfedin
        </h2>
        <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
        <p className="text-text-light text-base leading-8 max-w-[650px] mx-auto">
          Her köşesinde ayrı bir deneyim sunan mekanlarımızla tatilinizi zenginleştirin.
        </p>
      </ScrollReveal>

      {venues.map((venue, i) => (
        <ScrollReveal key={venue.id}>
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 mb-0.5 min-h-[450px] lg:min-h-[500px]`}
          >
            <div
              className={`relative min-h-[350px] lg:min-h-[500px] ${
                i % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={venue.image_url}
                alt={venue.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div
              className={`flex flex-col justify-center p-10 lg:p-20 ${
                i % 2 === 0 ? "bg-cream" : "bg-white"
              } ${i % 2 === 1 ? "lg:order-1" : ""}`}
            >
              <div className="font-[family-name:var(--font-heading)] text-5xl text-accent/20 font-bold mb-4">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-3xl text-primary mb-4">
                {venue.title}
              </h3>
              <p className="text-text-light leading-8 mb-8">
                {venue.short_description || venue.description}
              </p>
              <Link
                href={`/mekanlar/${venue.slug}`}
                className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[2px] uppercase text-accent hover:gap-4 transition-all"
              >
                Daha Fazla
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </section>
  );
}
