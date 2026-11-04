"use client";

import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

/** Barra flotante con el resumen del pedido; aparece al agregar la primera pizza. */
export function CartBar() {
  const { count, subtotal, open, isOpen } = useCart();
  const visible = count > 0 && !isOpen;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-all duration-300 sm:bottom-5 sm:left-auto sm:right-5 sm:px-0 sm:pb-0 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={open}
        tabIndex={visible ? 0 : -1}
        className="flex w-full items-center justify-between gap-4 rounded-full bg-basil-500 py-2 pl-2 pr-6 font-semibold text-ink shadow-xl shadow-black/50 transition-colors hover:bg-basil-400 sm:w-auto"
      >
        <span className="flex h-10 min-w-10 items-center justify-center rounded-full bg-ink px-2 text-sm text-basil-300">
          {count}
        </span>
        <span>Ver mi pedido</span>
        <span className="font-display text-lg">{formatPrice(subtotal)}</span>
      </button>
    </div>
  );
}
