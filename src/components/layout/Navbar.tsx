"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  reservationUrl?: string;
  transparent?: boolean;
}

const navLinks = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/odalar", label: "Odalar" },
  { href: "/mekanlar", label: "Mekanlar" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kusadasi", label: "Kuşadası" },
];

export default function Navbar({
  reservationUrl = "https://by-karaaslan-inn1.rezervasyonal.com/",
  transparent = false,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = transparent && !scrolled && !mobileOpen;

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
          <Link href="/" className="flex flex-col items-start">
            <span
              className={`font-[family-name:var(--font-heading)] text-2xl font-bold tracking-[3px] leading-tight transition-colors duration-400 ${
                isTransparent ? "text-white" : "text-primary"
              }`}
            >
              Karaaslan Inn
            </span>
            <span
              className={`font-[family-name:var(--font-body)] text-[0.6rem] tracking-[5px] uppercase transition-colors duration-400 ${
                isTransparent ? "text-white/70" : "text-text-light"
              }`}
            >
              Hotel &bull; Kuşadası
            </span>
          </Link>

          {/* Desktop Menu */}
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
                Rezervasyon
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="lg:hidden z-[1001] p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü"
          >
            {mobileOpen ? (
              <X
                size={28}
                className={isTransparent ? "text-white" : "text-primary"}
              />
            ) : (
              <Menu
                size={28}
                className={isTransparent ? "text-white" : "text-primary"}
              />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
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
        <a
          href={reservationUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          className="mt-4 px-10 py-4 bg-accent text-white text-sm font-semibold tracking-[3px] uppercase hover:bg-accent-dark transition-colors"
        >
          Rezervasyon
        </a>
      </div>
    </>
  );
}
