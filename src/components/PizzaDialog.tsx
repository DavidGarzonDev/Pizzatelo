"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { formatPrice } from "@/lib/format";
import { orderPizzaLink } from "@/lib/whatsapp";
import type { Pizza } from "@/types/menu";

interface PizzaDialogProps {
  pizza: Pizza | null;
  onClose: () => void;
}

export function PizzaDialog({ pizza, onClose }: PizzaDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!pizza) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    // Bloquea el scroll del fondo mientras el detalle está abierto
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [pizza, onClose]);

  if (!pizza) return null;

  return (
    <div
      className="animate-fade fixed inset-0 z-[60] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detalle-titulo"
      onClick={onClose}
    >
      <div
        className="animate-pop relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-grape-600/50 bg-ink-soft sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink/80 text-xl text-cream backdrop-blur transition-colors hover:bg-grape-600"
          aria-label="Cerrar detalles"
        >
          ×
        </button>

        <div className="grid gap-0 sm:grid-cols-2">
          <div className="relative aspect-[3/4] w-full bg-black sm:aspect-auto sm:min-h-full">
            <Image
              src={pizza.poster}
              alt={`Pieza gráfica de la pizza ${pizza.name}`}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 384px"
              className="object-cover object-top"
            />
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-basil-400">
              {pizza.category === "clasicas" ? "Clásica" : "Especial de la casa"}
            </span>

            <h2 id="detalle-titulo" className="font-display mt-2 text-4xl text-cream">
              {pizza.name}
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-cream-dim">{pizza.description}</p>

            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-cream-dim">
                Ingredientes
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pizza.ingredients.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-grape-600/60 bg-grape-700/25 px-3 py-1.5 text-xs text-cream"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-8">
              <div className="flex items-baseline justify-between border-t border-grape-700/50 pt-5">
                <span className="text-sm text-cream-dim">Precio</span>
                <span className="font-display text-4xl text-basil-300">{formatPrice(pizza.price)}</span>
              </div>

              <a
                href={orderPizzaLink(pizza)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block rounded-full bg-basil-500 px-6 py-3.5 text-center font-semibold text-ink transition-colors hover:bg-basil-400"
              >
                Pedir esta pizza
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
