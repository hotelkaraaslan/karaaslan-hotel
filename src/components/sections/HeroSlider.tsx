"use client";

import { useState, useEffect, useCallback } from "react";
import type { Slider } from "@/lib/types";

interface HeroSliderProps {
  sliders: Slider[];
  reservationUrl: string;
  dict: { location: string; defaultSubtitle: string; bookNow: string; ourRooms: string; explore: string };
  lang: string;
}

export default function HeroSlider({ sliders, reservationUrl, dict, lang }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const langPrefix = lang === "tr" ? "" : `/${lang}`;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % sliders.length);
  }, [sliders.length]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (sliders.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, sliders.length]);

  if (!sliders.length) return null;

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {sliders.map((slide, i) => (
          <div key={slide.id} className={`hero-slide ${i === current ? "active" : ""}`} style={{ backgroundImage: `url(${slide.image_url})`, backgroundColor: "#1a3a4a" }} />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,30,40,0.4)] via-[rgba(10,30,40,0.5)] to-[rgba(10,30,40,0.7)] z-[1]" />
      {loaded && (
        <div className="relative z-[2] text-center text-white max-w-[850px] px-8">
          <div className="hero-fade-1 text-sm font-medium tracking-[6px] uppercase text-accent mb-6">{dict.location}</div>
          <h1 className="hero-fade-2 font-[family-name:var(--font-heading)] text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] mb-5">
            Hotel By<br />Karaaslan Inn
          </h1>
          <p className="hero-fade-3 text-lg font-light leading-8 text-white/85 mb-11 max-w-xl mx-auto">
            {sliders[current]?.subtitle || dict.defaultSubtitle}
          </p>
          <div className="hero-fade-4 flex gap-5 justify-center flex-wrap">
            <a href={reservationUrl} target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-accent text-white text-xs font-semibold tracking-[3px] uppercase hover:bg-accent-dark hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(201,169,110,0.35)] transition-all">
              {dict.bookNow}
            </a>
            <a href={`${langPrefix}/odalar`} className="px-10 py-4 border-[1.5px] border-white text-white text-xs font-semibold tracking-[3px] uppercase hover:bg-white hover:text-primary transition-all">
              {dict.ourRooms}
            </a>
          </div>
        </div>
      )}
      {loaded && (
        <div className="hero-fade-4 absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2.5 text-white/60 text-[0.7rem] tracking-[3px] uppercase">
          <span>{dict.explore}</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent scroll-pulse" />
        </div>
      )}
      {sliders.length > 1 && (
        <div className="absolute bottom-10 right-10 z-[2] hidden md:flex gap-2.5">
          {sliders.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-[3px] transition-all cursor-pointer ${i === current ? "w-[60px] bg-accent" : "w-10 bg-white/30 hover:bg-white/50"}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      )}
    </section>
  );
}
