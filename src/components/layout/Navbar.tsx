"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Phone } from "lucide-react";

interface NavDict {
  about: string;
  rooms: string;
  venues: string;
  gallery: string;
  kusadasi: string;
  contact: string;
  reservation: string;
  menu: string;
}

interface NavbarProps {
  dict: NavDict;
  lang: string;
  reservationUrl?: string;
  phone?: string;
}

const langLabels: Record<string, string> = {
  tr: "TR",
  en: "EN",
  de: "DE",
};

export default function Navbar({
  dict,
  lang,
  reservationUrl = "https://by-karaaslan-inn1.rezervasyonal.com/",
  phone,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();

  const langPrefix = lang === "tr" ? "" : `/${lang}`;

  const isHome =
    pathname === "/" ||
    pathname === "/tr" ||
    pathname === "/en" ||
    pathname === "/de";

  const navLinks = [
    { href: `${langPrefix}/hakkimizda`, label: dict.about },
    { href: `${langPrefix}/odalar`, label: dict.rooms },
    { href: `${langPrefix}/mekanlar`, label: dict.venues },
    { href: `${langPrefix}/galeri`, label: dict.gallery },
    { href: `${langPrefix}/kusadasi`, label: dict.kusadasi },
    { href: `${langPrefix}/iletisim`, label: dict.contact },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [langOpen]);

  const isTransparent = isHome && !scrolled && !mobileOpen;

  function getLangUrl(targetLang: string) {
    let path = pathname;
    if (lang !== "tr") {
      path = path.replace(`/${lang}`, "") || "/";
    }
    if (targetLang === "tr") {
      return path || "/";
    }
    return `/${targetLang}${path === "/" ? "" : path}`;
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
          isTransparent
            ? "py-6 bg-transparent"
            : "py-3 bg-white/97 shadow-[0_2px_30px_rgba(0,0,0,0.08)] backdrop-blur-[10px]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-10 flex items-center justify-between">
          <Link href={langPrefix || "/"} className="flex items-center">
            <Image
              src="/logo.png"
              alt="Hotel By Karaaslan Inn"
              width={220}
              height={75}
              className={`h-[4.5rem] w-auto transition-all duration-400 ${
                isTransparent ? "" : "brightness-0"
              }`}
              priority
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[0.75rem] font-semibold tracking-[2.5px] uppercase relative py-1 transition-colors duration-400 hover:text-accent after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-accent after:transition-all after:duration-400 hover:after:w-full ${
                    isTransparent ? "text-white" : "text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLangOpen(!langOpen);
                }}
                className={`flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[1.5px] uppercase transition-colors duration-400 cursor-pointer ${
                  isTransparent
                    ? "text-white/80 hover:text-white"
                    : "text-text-light hover:text-primary"
                }`}
              >
                <Globe size={14} />
                {langLabels[lang]}
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-3 bg-white shadow-lg border border-gray-100 min-w-[80px]">
                  {Object.entries(langLabels).map(([code, label]) => (
                    <Link
                      key={code}
                      href={getLangUrl(code)}
                      className={`block px-4 py-2.5 text-xs font-semibold tracking-[1.5px] uppercase transition-colors ${
                        code === lang
                          ? "text-accent bg-cream"
                          : "text-primary hover:bg-cream hover:text-accent"
                      }`}
                      onClick={() => setLangOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {phone && (
              <li>
                <a
                  href={`tel:${phone}`}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 text-[0.7rem] font-semibold tracking-[2px] uppercase transition-all duration-400 bg-accent text-white hover:bg-accent-dark`}
                >
                  <Phone size={13} />
                  <span>Hemen Ara<span className="block text-[0.65rem] font-normal tracking-normal normal-case opacity-90">{phone}</span></span>
                </a>
              </li>
            )}

            <li>
              <a
                href={reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block px-6 py-2.5 text-[0.7rem] font-semibold tracking-[2px] uppercase border-[1.5px] transition-all duration-400 ${
                  isTransparent
                    ? "border-white text-white hover:bg-white hover:text-primary"
                    : "border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {dict.reservation}
              </a>
            </li>
          </ul>

          <button
            className="lg:hidden z-[1001] p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={dict.menu}
          >
            {mobileOpen ? (
              <X size={28} className={isTransparent ? "text-white" : "text-primary"} />
            ) : (
              <Menu size={28} className={isTransparent ? "text-white" : "text-primary"} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile call bar - only visible on mobile, below navbar */}
      {phone && (
        <div className={`lg:hidden fixed left-0 right-0 z-40 flex justify-center transition-all duration-400 ${isTransparent ? "top-[5.5rem]" : "top-[4.2rem]"}`}>
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 px-6 py-2 bg-accent text-white text-xs font-semibold tracking-[2px] uppercase shadow-md"
          >
            <Phone size={13} />
            <span>Hemen Ara</span>
            <span className="opacity-80">·</span>
            <span className="font-normal tracking-normal normal-case">{phone}</span>
          </a>
        </div>
      )}

      <div
        className={`fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center gap-8 transition-all duration-400 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="font-[family-name:var(--font-heading)] text-3xl text-white hover:text-accent transition-colors"
          >
            {link.label}
          </Link>
        ))}

        <div className="flex gap-4 mt-2">
          {Object.entries(langLabels).map(([code, label]) => (
            <Link
              key={code}
              href={getLangUrl(code)}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-semibold tracking-[2px] uppercase transition-colors ${
                code === lang ? "text-accent" : "text-white/60 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <a
          href={reservationUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          className="mt-4 px-10 py-4 bg-accent text-white text-sm font-semibold tracking-[3px] uppercase hover:bg-accent-dark transition-colors"
        >
          {dict.reservation}
        </a>

        {phone && (
          <a
            href={`tel:${phone}`}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-10 py-4 border-[1.5px] border-white/30 text-white text-sm font-semibold tracking-[3px] uppercase hover:border-accent hover:text-accent transition-colors"
          >
            <Phone size={16} />
            {phone}
          </a>
        )}
      </div>
    </>
  );
}
