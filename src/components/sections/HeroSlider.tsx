"use client";

import { useState, useEffect, useCallback } from "react";
import { localize } from "@/lib/localize";
import type { Slider } from "@/lib/types";

interface HeroSliderProps {
  sliders: Slider[];
  reservationUrl: string;
  dict: { location: string; defaultSubtitle: string; bookNow: string; ourRooms: string; explore: string };
  lang: string;
  phone?: string;
}

export default function HeroSlider({ sliders, reservationUrl, dict, lang, phone }: HeroSliderProps) {
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

  const currentTitle = localize(sliders[current], "title", lang) || "Hotel By Karaaslan Inn";
  const currentSubtitle = localize(sliders[current], "subtitle", lang) || dict.defaultSubtitle;
  const currentButtonText = localize(sliders[current], "button_text", lang) || dict.bookNow;

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
          {phone && (
            <a
              href={`tel:${phone}`}
              className="lg:hidden hero-fade-1 inline-flex items-center gap-2 px-6 py-2.5 mb-8 bg-accent text-white text-xs font-semibold tracking-[2px] uppercase"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.4 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/></svg>
              Hemen Ara · {phone}
            </a>
          )}
          <div className="hero-fade-1 text-sm font-medium tracking-[6px] uppercase text-accent mb-6">{dict.location}</div>
          <h1 className="hero-fade-2 font-[family-name:var(--font-heading)] text-5xl md:text-7xl lg:text-[5.5rem] font-normal leading-[1.1] mb-5">
            {currentTitle}
          </h1>
          <p className="hero-fade-3 text-lg font-light leading-8 text-white/85 mb-11 max-w-xl mx-auto">
            {currentSubtitle}
          </p>
          <div className="hero-fade-4 flex gap-5 justify-center flex-wrap">
            <a href={reservationUrl} target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-accent text-white text-xs font-semibold tracking-[3px] uppercase hover:bg-accent-dark hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(201,169,110,0.35)] transition-all">
              {currentButtonText}
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
