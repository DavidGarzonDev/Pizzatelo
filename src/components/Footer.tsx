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
