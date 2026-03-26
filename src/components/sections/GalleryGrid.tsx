"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X } from "lucide-react";
import type { GalleryImage } from "@/lib/types";

interface GalleryGridProps {
  images: GalleryImage[];
}

const categories = [
  { key: "all", label: "Tümü" },
  { key: "genel", label: "Genel" },
  { key: "odalar", label: "Odalar" },
  { key: "mekanlar", label: "Mekanlar" },
];

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [filter, setFilter] = useState("all");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const filtered = filter === "all" ? images : images.filter((img) => img.category === filter);

  return (
    <>
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          {/* Filter tabs */}
          <div className="flex justify-center gap-6 mb-14 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`text-xs font-semibold tracking-[2px] uppercase pb-2 border-b-2 transition-all cursor-pointer ${
                  filter === cat.key
                    ? "text-accent border-accent"
                    : "text-text-light border-transparent hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img) => (
              <div
                key={img.id}
                className="relative h-[220px] md:h-[260px] overflow-hidden cursor-pointer group"
                onClick={() => setLightboxSrc(img.image_url)}
              >
                <Image
                  src={img.image_url}
                  alt={img.title || "Galeri"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                  <ZoomIn
                    size={28}
                    className="text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all"
                  />
                </div>
                {img.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-white text-xs">{img.title}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 bg-black/92 z-[9999] flex items-center justify-center"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-8 right-8 text-white hover:text-accent transition-colors bg-transparent border-none cursor-pointer"
            onClick={() => setLightboxSrc(null)}
          >
            <X size={32} />
          </button>
          <Image
            src={lightboxSrc}
            alt="Galeri"
            width={1200}
            height={800}
            className="object-contain max-h-[85vh] w-auto"
          />
        </div>
      )}
    </>
  );
}
