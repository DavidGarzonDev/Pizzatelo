"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

/** Barra flotante con el resumen del pedido; aparece al agregar la primera pizza. */
export function CartBar() {
  const { count, subtotal, open, isOpen } = useCart();
  const visible = count > 0 && !isOpen;

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="cart-bar"
          initial={{ y: 90, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 90, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:bottom-5 sm:left-auto sm:right-5 sm:px-0 sm:pb-0"
        >
          <m.button
            type="button"
            onClick={open}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex w-full items-center justify-between gap-4 rounded-full bg-basil-500 py-2 pl-2 pr-6 font-semibold text-ink shadow-xl shadow-black/50 transition-colors hover:bg-basil-400 sm:w-auto"
          >
            {/* key = count: el número rebota cada vez que cambia */}
            <m.span
              key={count}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 600, damping: 14 }}
              className="flex h-10 min-w-10 items-center justify-center rounded-full bg-ink px-2 text-sm text-basil-300"
            >
              {count}
            </m.span>
            <span>Ver mi pedido</span>
            <span className="font-display text-lg tabular-nums">{formatPrice(subtotal)}</span>
          </m.button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
