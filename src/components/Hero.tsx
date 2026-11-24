import Image from "next/image";
import { site } from "@/config/site";
import { pizzas } from "@/data/menu";
import { StoreStatusBadge } from "@/components/StoreStatusBadge";
import { CountUp } from "@/components/ui/CountUp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { directOrderLink } from "@/lib/whatsapp";

/** Chispas del logo: posiciones fijas (no aleatorias) para que servidor y navegador coincidan. */
const embers = [
  { left: 8, size: 4, color: "#e8a13c", delay: 0, duration: 5.2, drift: -18 },
  { left: 22, size: 3, color: "#96c93d", delay: 1.6, duration: 4.6, drift: 12 },
  { left: 37, size: 5, color: "#e8a13c", delay: 3.1, duration: 5.8, drift: -8 },
  { left: 52, size: 3, color: "#c08fdd", delay: 0.8, duration: 4.9, drift: 20 },
  { left: 66, size: 4, color: "#e8a13c", delay: 2.4, duration: 5.5, drift: -14 },
  { left: 80, size: 3, color: "#96c93d", delay: 3.8, duration: 4.4, drift: 10 },
  { left: 92, size: 4, color: "#e8a13c", delay: 1.2, duration: 6, drift: -20 },
];

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
        <div className="min-w-0 text-center lg:text-left">
          <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-basil-500/40 bg-basil-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-basil-300">
            <span className="h-1.5 w-1.5 rounded-full bg-basil-400" />
            COCINA OCULTA · {site.city.toUpperCase()}
          </p>

          {/* Cada línea sube desde detrás de una máscara, una después de la otra */}
          <h1 className="font-display mt-6 text-[clamp(3rem,13vw,6.5rem)] leading-[0.95]">
            {["Cocina", "oculta"].map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span
                  className="text-brand-gradient animate-line-up block"
                  style={{ animationDelay: `${120 + index * 130}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="animate-rise mx-auto mt-6 max-w-md text-base leading-relaxed text-cream-dim lg:mx-0 sm:text-lg"
            style={{ animationDelay: "380ms" }}
          >
            Sin local, sin filas: cocinamos solo para domicilio. Masa artesanal, ingredientes
            frescos y combinaciones que solo encuentras aquí.
          </p>

          <div className="animate-rise" style={{ animationDelay: "480ms" }}>
            <StoreStatusBadge className="mt-7" />
          </div>

          <p className="animate-rise mt-4 text-sm font-semibold text-basil-300" style={{ animationDelay: "540ms" }}>
            Registra tu pedido fácilmente aquí, o escríbenos directo.
          </p>

          <div
            className="animate-rise mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            style={{ animationDelay: "620ms" }}
          >
            <a
              href="#menu"
              className="shine-sweep w-full rounded-full bg-grape-500 px-8 py-3.5 text-center font-semibold text-cream shadow-lg shadow-grape-700/40 transition-all hover:-translate-y-0.5 hover:bg-grape-400 sm:w-auto"
            >
              Hacer mi pedido
            </a>
            <a
              href={directOrderLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-cream/25 font-semibold text-cream transition-all hover:-translate-y-0.5 hover:border-basil-400 hover:text-basil-300 w-full px-8 py-3.5 sm:w-auto"
            >
              <WhatsAppIcon />
              Pedir por WhatsApp
            </a>
          </div>

          <dl
            className="animate-rise mt-10 flex flex-wrap justify-center gap-x-5 gap-y-4 sm:gap-x-8 lg:justify-start"
            style={{ animationDelay: "720ms" }}
          >
            <div>
              <dt className="text-xs uppercase tracking-widest text-cream-dim">Desde</dt>
              <dd className="font-display mt-1 text-xl text-basil-300 sm:text-2xl">
                <CountUp to={cheapest} format="price" delay={800} />
              </dd>
            </div>
            <div className="border-l border-grape-700/60 pl-5 sm:pl-8">
              <dt className="text-xs uppercase tracking-widest text-cream-dim">Sabores</dt>
              <dd className="font-display mt-1 text-xl text-basil-300 sm:text-2xl">
                <CountUp to={pizzas.length} delay={800} duration={900} />
              </dd>
            </div>
            <div className="border-l border-grape-700/60 pl-5 sm:pl-8">
              <dt className="text-xs uppercase tracking-widest text-cream-dim">Entrega</dt>
              <dd className="font-display mt-1 text-xl text-basil-300 sm:text-2xl">Domicilio</dd>
            </div>
          </dl>
        </div>

        {/* Logo: discreto en móvil (el header ya lo muestra) y protagonista en escritorio */}
        <div
          className="animate-pop relative mx-auto w-full max-w-[13rem] xs:max-w-[15rem] sm:max-w-xs lg:max-w-md"
          style={{ animationDelay: "120ms" }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-6 rounded-full bg-grape-500/25 blur-2xl sm:blur-3xl"
          />

          {/* Anillos punteados que giran lento detrás del logo */}
          <svg aria-hidden="true" viewBox="0 0 200 200" className="animate-spin-slow absolute -inset-[6%] h-[112%] w-[112%]">
            <circle cx="100" cy="100" r="96" fill="none" stroke="var(--color-grape-400)" strokeOpacity="0.45" strokeWidth="0.8" strokeDasharray="2 7" strokeLinecap="round" />
          </svg>
          <svg aria-hidden="true" viewBox="0 0 200 200" className="animate-spin-slower absolute -inset-[14%] h-[128%] w-[128%]">
            <circle cx="100" cy="100" r="97" fill="none" stroke="var(--color-basil-400)" strokeOpacity="0.3" strokeWidth="0.6" strokeDasharray="14 10 2 10" strokeLinecap="round" />
          </svg>

          {/* Chispas de horno que suben */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-[15%] bottom-[18%] h-0">
            {embers.map((ember, index) => (
              <span
                key={index}
                className="animate-ember absolute bottom-0 rounded-full"
                style={
                  {
                    left: `${ember.left}%`,
                    width: ember.size,
                    height: ember.size,
                    background: ember.color,
                    boxShadow: `0 0 ${ember.size * 3}px ${ember.color}`,
                    animationDelay: `${ember.delay}s`,
                    animationDuration: `${ember.duration}s`,
                    "--ember-x": `${ember.drift}px`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          <div className="animate-float relative">
          <Image
            src="/images/logo.png"
            alt={`Logo de ${site.name}`}
            width={708}
            height={720}
            priority
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 448px"
            className="relative w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.6)] sm:drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)]"
          />
          </div>
        </div>
      </div>
    </section>
  );
}
