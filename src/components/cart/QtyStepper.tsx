"use client";

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
      <button type="button" onClick={() => onChange(qty - 1)} className={button} aria-label={`Quitar una ${name}`}>
        −
      </button>
      <span className={`min-w-8 text-center font-semibold text-ink ${big ? "text-sm" : "text-xs"}`} aria-live="polite">
        {big ? `${qty} en tu pedido` : qty}
      </span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        disabled={qty >= MAX_QTY}
        className={button}
        aria-label={`Agregar otra ${name}`}
      >
        +
      </button>
    </div>
  );
}
