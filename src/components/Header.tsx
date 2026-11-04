"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { generalOrderLink } from "@/lib/whatsapp";

const links = [
  { href: "#menu", label: "Menú" },
  { href: "#pagos", label: "Pagos" },
  { href: "#horarios", label: "Horarios" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-grape-700/50 bg-ink/90 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#inicio" className="flex items-center gap-3" aria-label={`${site.name}, ir al inicio`}>
          <Image
            src="/images/logo.png"
            alt=""
            width={48}
            height={48}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="leading-none">
            <span className="font-display block text-xl text-cream sm:text-2xl">{site.name}</span>
            <span className="block text-[0.65rem] tracking-[0.35em] text-basil-400">{site.city.toUpperCase()}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Secciones">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-cream-dim transition-colors hover:bg-grape-700/40 hover:text-cream"
            >
              {link.label}
            </a>
          ))}
          <a
            href={generalOrderLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-full bg-basil-500 px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-basil-400"
          >
            Pedir ahora
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-grape-600/60 text-cream md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                open ? "top-1/2 rotate-45" : "top-0.5"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                open ? "top-1/2 -rotate-45" : "bottom-0.5"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="menu-movil"
        className={`overflow-hidden border-t border-grape-700/40 transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-72" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Secciones">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-medium text-cream-dim transition-colors hover:bg-grape-700/40 hover:text-cream"
            >
              {link.label}
            </a>
          ))}
          <a
            href={generalOrderLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-xl bg-basil-500 px-3 py-3 text-center text-sm font-semibold text-ink"
          >
            Pedir por WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
