"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

export function Payments() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      window.setTimeout(() => setCopied((current) => (current === id ? null : current)), 2000);
    } catch {
      // Sin permiso de portapapeles (o http): el número sigue visible para copiarlo a mano.
      setCopied(null);
    }
  }

  return (
    <section id="pagos" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-basil-400">Fácil y seguro</p>
          <h2 className="font-display text-brand-gradient mt-3 text-[clamp(2.25rem,6vw,3.5rem)] leading-none">
            Métodos de pago
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {site.payments.map((method, index) => {
            const account: string | null = method.account;
            const display: string | null = method.display;

            return (
              <Reveal as="li" key={method.id} delay={index * 90} className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-grape-700/45 bg-ink-card p-6 transition-colors hover:border-grape-400/70">
                  <span className="font-display text-2xl text-cream">{method.label}</span>
                  <span className="mt-1 text-xs uppercase tracking-widest text-basil-400">{method.note}</span>

                  {account ? (
                    <>
                      <p className="font-display mt-6 text-2xl text-cream sm:text-[1.75rem]">
                        {display ?? account}
                      </p>
                      <button
                        type="button"
                        onClick={() => copy(method.id, account)}
                        className="mt-auto self-start rounded-full border border-grape-600/70 px-4 py-2 text-xs font-semibold text-cream-dim transition-colors hover:border-basil-400 hover:text-basil-300"
                      >
                        {copied === method.id ? "¡Copiado!" : "Copiar número"}
                      </button>
                    </>
                  ) : (
                    <p className="mt-6 text-sm leading-relaxed text-cream-dim">
                      Paga en efectivo cuando recibas tu pedido. Avísanos si necesitas devuelta.
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={140}>
          <p className="mt-8 text-center text-sm text-cream-dim">
            Envía el comprobante por WhatsApp al{" "}
            <span className="font-semibold text-cream">{site.phoneDisplay}</span> para confirmar tu pedido.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
