import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";
import { generalOrderLink } from "@/lib/whatsapp";

export function Hours() {
  return (
    <section id="horarios" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] border border-grape-700/45 bg-gradient-to-br from-grape-700/25 via-ink-card to-ink-card">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-basil-400">
                Estamos abiertos
              </p>
              <h2 className="font-display text-brand-gradient mt-3 text-[clamp(2.25rem,6vw,3.25rem)] leading-none">
                Horarios
              </h2>

              <dl className="mt-8 space-y-4">
                {site.hours.map((slot) => (
                  <div
                    key={slot.days}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-grape-700/40 pb-4"
                  >
                    <dt className="text-sm font-medium text-cream">{slot.days}</dt>
                    <dd className="text-sm text-basil-300">{slot.time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={100} className="flex flex-col justify-center">
              <h3 className="font-display text-3xl text-cream">¿Listo para pedir?</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                Escríbenos por WhatsApp con la pizza que quieres y tu dirección. Te confirmamos el
                tiempo de entrega al instante.
              </p>

              <a
                href={generalOrderLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 self-start rounded-full bg-basil-500 px-7 py-3.5 font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-basil-400"
              >
                Escribir por WhatsApp
              </a>

              <p className="mt-5 text-sm text-cream-dim">
                O llámanos al{" "}
                <a
                  href={`tel:+${site.whatsapp}`}
                  className="font-semibold text-cream underline underline-offset-4 hover:text-basil-300"
                >
                  {site.phoneDisplay}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
