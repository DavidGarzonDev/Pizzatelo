"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { MAX_QTY } from "@/lib/cart";

interface QtyStepperProps {
  qty: number;
  name: string;
  onChange: (qty: number) => void;
  /** "lg" para los botones grandes de tarjeta y detalle; "sm" dentro del carrito. */
  size?: "sm" | "lg";
}

/** Botones − cantidad + con el mismo verde de los botones de pedir. */
export function QtyStepper({ qty, name, onChange, size = "lg" }: QtyStepperProps) {
  const big = size === "lg";
  const button = `flex items-center justify-center rounded-full font-bold text-ink transition-colors hover:bg-basil-300 disabled:opacity-40 ${
    big ? "h-9 w-9 text-lg" : "h-7 w-7 text-base"
  }`;

  return (
    <div
      className={`flex items-center justify-between rounded-full bg-basil-500 ${big ? "p-1" : "p-0.5"}`}
      role="group"
      aria-label={`Cantidad de ${name}`}
    >
      <m.button whileTap={{ scale: 0.85 }} type="button" onClick={() => onChange(qty - 1)} className={button} aria-label={`Quitar una ${name}`}>
        −
      </m.button>
      <span
        className={`relative min-w-8 overflow-hidden text-center font-semibold text-ink ${big ? "text-sm" : "text-xs"}`}
        aria-live="polite"
      >
        {/* El número nuevo entra desde abajo y el anterior sale hacia arriba */}
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={qty}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="inline-block tabular-nums"
          >
            {qty}
          </m.span>
        </AnimatePresence>
        {big ? " en tu pedido" : null}
      </span>
      <m.button
        whileTap={{ scale: 0.85 }}
        type="button"
        onClick={() => onChange(qty + 1)}
        disabled={qty >= MAX_QTY}
        className={button}
        aria-label={`Agregar otra ${name}`}
      >
        +
      </m.button>
    </div>
  );
}
