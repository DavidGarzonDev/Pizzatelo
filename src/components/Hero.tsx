import Image from "next/image";
import { site } from "@/config/site";
import { pizzas } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import { generalOrderLink } from "@/lib/whatsapp";

export function Hero() {
  const cheapest = Math.min(...pizzas.map((p) => p.price));

  return (
    <section id="inicio" className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-32">
      {/* Halos de color de la marca */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift absolute -left-24 top-8 h-80 w-80 rounded-full bg-grape-500/25 blur-[110px]" />
        <div
          className="animate-drift absolute -right-16 top-40 h-72 w-72 rounded-full bg-basil-500/20 blur-[110px]"
          style={{ animationDelay: "-6s" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* min-w-0 evita que el contenido más ancho estire la columna del grid */}
        <div className="animate-rise min-w-0 text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-basil-500/40 bg-basil-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-basil-300">
            <span className="h-1.5 w-1.5 rounded-full bg-basil-400" />
            COCINA OCULTA · {site.city.toUpperCase()}
          </p>

          <h1 className="font-display text-brand-gradient mt-6 text-[clamp(3rem,11vw,5.75rem)] leading-[0.95]">
            Pizza de
            <br />
            cocina oculta
          </h1>

          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-cream-dim lg:mx-0 sm:text-lg">
            Sin local, sin filas: cocinamos solo para domicilio. Masa artesanal, ingredientes
            frescos y combinaciones que solo encuentras aquí. Pídela por WhatsApp en un toque.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#menu"
              className="w-full rounded-full bg-grape-500 px-8 py-3.5 text-center font-semibold text-cream shadow-lg shadow-grape-700/40 transition-all hover:-translate-y-0.5 hover:bg-grape-400 sm:w-auto"
            >
              Ver el menú
            </a>
            <a
              href={generalOrderLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border border-cream/25 px-8 py-3.5 text-center font-semibold text-cream transition-all hover:-translate-y-0.5 hover:border-basil-400 hover:text-basil-300 sm:w-auto"
            >
              Pedir por WhatsApp
            </a>
          </div>

          <dl className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-4 sm:gap-x-8 lg:justify-start">
            <div>
              <dt className="text-xs uppercase tracking-widest text-cream-dim">Desde</dt>
              <dd className="font-display mt-1 text-xl text-basil-300 sm:text-2xl">
                {formatPrice(cheapest)}
              </dd>
            </div>
            <div className="border-l border-grape-700/60 pl-5 sm:pl-8">
              <dt className="text-xs uppercase tracking-widest text-cream-dim">Sabores</dt>
              <dd className="font-display mt-1 text-xl text-basil-300 sm:text-2xl">{pizzas.length}</dd>
            </div>
            <div className="border-l border-grape-700/60 pl-5 sm:pl-8">
              <dt className="text-xs uppercase tracking-widest text-cream-dim">Entrega</dt>
              <dd className="font-display mt-1 text-xl text-basil-300 sm:text-2xl">Domicilio</dd>
            </div>
          </dl>
        </div>

        <div className="animate-pop relative mx-auto w-full max-w-md" style={{ animationDelay: "120ms" }}>
          <div
            aria-hidden="true"
            className="absolute inset-6 rounded-full bg-grape-500/25 blur-3xl"
          />
          <Image
            src="/images/logo.png"
            alt={`Logo de ${site.name}`}
            width={708}
            height={720}
            priority
            className="relative w-full drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)]"
          />
        </div>
      </div>
    </section>
  );
}
