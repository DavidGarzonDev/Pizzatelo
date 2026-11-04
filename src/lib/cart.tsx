"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { pizzas } from "@/data/menu";
import type { Pizza } from "@/types/menu";

/** Cantidad máxima por pizza, para evitar pedidos por error. */
export const MAX_QTY = 20;

const STORAGE_KEY = "pizzatelo:carrito";

export interface CartLine {
  pizza: Pizza;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  /** Total de pizzas en el carrito. */
  count: number;
  /** Suma de los precios, sin domicilio. */
  subtotal: number;
  qtyOf: (slug: string) => number;
  add: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

type Quantities = Record<string, number>;

/** Lee el carrito guardado; si el navegador no deja, empieza vacío. */
function readStored(): Quantities {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const result: Quantities = {};
    for (const [slug, qty] of Object.entries(parsed as Record<string, unknown>)) {
      // Ignora pizzas que ya no están en el menú o cantidades raras
      if (typeof qty === "number" && qty > 0 && pizzas.some((p) => p.slug === slug)) {
        result[slug] = Math.min(Math.floor(qty), MAX_QTY);
      }
    }
    return result;
  } catch {
    return {};
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [quantities, setQuantities] = useState<Quantities>({});
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // El carrito se recupera después de montar para no romper la hidratación
  useEffect(() => {
    setQuantities(readStored());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
    } catch {
      // Modo privado o almacenamiento bloqueado: el carrito vive solo en esta visita
    }
  }, [quantities, loaded]);

  const setQty = useCallback((slug: string, qty: number) => {
    setQuantities((current) => {
      const next = { ...current };
      const clamped = Math.max(0, Math.min(Math.floor(qty), MAX_QTY));
      if (clamped === 0) delete next[slug];
      else next[slug] = clamped;
      return next;
    });
  }, []);

  const add = useCallback(
    (slug: string) => setQuantities((current) => ({ ...current, [slug]: Math.min((current[slug] ?? 0) + 1, MAX_QTY) })),
    [],
  );

  const clear = useCallback(() => setQuantities({}), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    // Respeta el orden del menú para que el pedido se lea igual que la carta
    const lines = pizzas
      .filter((pizza) => quantities[pizza.slug])
      .map((pizza) => ({ pizza, qty: quantities[pizza.slug] }));

    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.qty, 0),
      subtotal: lines.reduce((sum, line) => sum + line.qty * line.pizza.price, 0),
      qtyOf: (slug) => quantities[slug] ?? 0,
      add,
      setQty,
      clear,
      isOpen,
      open,
      close,
    };
  }, [quantities, add, setQty, clear, isOpen, open, close]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return context;
}
