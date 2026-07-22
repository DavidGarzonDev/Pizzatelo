import Image from "next/image";
import { site } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-grape-700/40 bg-ink-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6">
        <Image
          src="/images/logo.png"
          alt={`Logo de ${site.name}`}
          width={96}
          height={98}
          className="h-20 w-20 object-contain"
        />

        <div>
          <p className="font-display text-2xl text-cream">
            {site.name} {site.city}
          </p>
          <p className="mt-1 text-sm text-cream-dim">{site.tagline}</p>
        </div>

        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-grape-600/60 px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:border-basil-400 hover:text-basil-300"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.66-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.93 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0z" />
            <path d="M12 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
            <circle cx="18.41" cy="5.59" r="1.44" />
          </svg>
          @_pizzatelo
        </a>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-cream-dim">
          <a href="#menu" className="transition-colors hover:text-basil-300">
            Menú
          </a>
          <a href="#pagos" className="transition-colors hover:text-basil-300">
            Métodos de pago
          </a>
          <a href="#horarios" className="transition-colors hover:text-basil-300">
            Horarios
          </a>
          <a href={`tel:+${site.whatsapp}`} className="transition-colors hover:text-basil-300">
            {site.phoneDisplay}
          </a>
        </div>

        <p className="text-xs text-cream-dim/70">
          © {year} {site.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
