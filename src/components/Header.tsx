"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#formulario", label: "Registre sua demanda" },
  { href: "#devolutivas", label: "Devolutivas" },
  { href: "#mapa", label: "Mapa" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-primary-dark/95 backdrop-blur-lg shadow-deep"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16 md:h-[72px]">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/logo-puxirum.png"
            alt="Puxirum"
            width={160}
            height={40}
            className="h-[43px] md:h-[54px] w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-[1.02]"
            priority
            unoptimized
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#formulario"
            className="ml-3 bg-accent hover:bg-accent-light text-white text-sm font-heading font-bold px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_2px_12px_-2px_rgba(201,148,46,0.4)] hover:shadow-[0_4px_16px_-2px_rgba(201,148,46,0.5)]"
          >
            Participar
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2 -mr-2"
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[9px]" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[9px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-primary-dark/95 backdrop-blur-lg border-t border-white/5 px-5 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-white/70 hover:text-white hover:bg-white/5 text-sm font-medium py-3 px-4 rounded-xl transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#formulario"
              onClick={() => setMenuOpen(false)}
              className="block text-center bg-accent hover:bg-accent-light text-white text-sm font-heading font-bold py-3 rounded-full transition-all duration-300"
            >
              Quero participar
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
