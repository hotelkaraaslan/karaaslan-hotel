"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ZoomIn, X } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { GalleryImage } from "@/lib/types";

interface GallerySectionProps {
  images: GalleryImage[];
  dict: { label: string; title: string; viewAll: string };
  lang: string;
}

export default function GallerySection({ images, dict, lang }: GallerySectionProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const lp = lang === "tr" ? "" : `/${lang}`;

  return (
    <>
      <section id="galeri" className="py-24 lg:py-32 bg-primary text-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">{dict.label}</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-white mb-6">{dict.title}</h2>
            <div className="w-16 h-0.5 bg-accent mx-auto" />
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 auto-rows-[280px]">
              {images.slice(0, 5).map((img, i) => (
                <div key={img.id} className={`relative overflow-hidden cursor-pointer group ${i === 0 ? "col-span-2 row-span-2" : ""}`} onClick={() => setLightboxSrc(img.image_url)}>
                  <Image src={img.image_url} alt={img.title || "Gallery"} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes={i === 0 ? "50vw" : "25vw"} />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                    <ZoomIn size={32} className="text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal className="text-center mt-12">
            <Link href={`${lp}/galeri`} className="inline-block px-10 py-4 border-[1.5px] border-white text-white text-xs font-semibold tracking-[3px] uppercase hover:bg-white hover:text-primary transition-all">{dict.viewAll}</Link>
          </ScrollReveal>
        </div>
      </section>
      {lightboxSrc && (
        <div className="fixed inset-0 bg-black/92 z-[9999] flex items-center justify-center" onClick={() => setLightboxSrc(null)}>
          <button className="absolute top-8 right-8 text-white text-3xl hover:text-accent transition-colors bg-transparent border-none cursor-pointer" onClick={() => setLightboxSrc(null)}><X size={32} /></button>
          <div className="relative max-w-[85%] max-h-[85vh] w-auto h-auto">
            <Image src={lightboxSrc} alt="Gallery" width={1200} height={800} className="object-contain max-h-[85vh] w-auto" />
          </div>
        </div>
      )}
    </>
  );
}
