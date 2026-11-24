"use client";

import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/format";

interface CountUpProps {
  to: number;
  /** "price" lo muestra como precio ($22.000); por defecto, número simple. */
  format?: "price" | "number";
  /** Espera antes de empezar, en ms. */
  delay?: number;
  duration?: number;
}

/**
 * Número que cuenta desde 0 hasta `to` cuando entra en pantalla.
 * El HTML inicial ya trae el valor final (buscadores y sin JavaScript), y si
 * el visitante prefiere menos movimiento se queda quieto en el valor final.
 */
export function CountUp({ to, format = "number", delay = 0, duration = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let timer = 0;
    setValue(0);

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(to * eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        timer = window.setTimeout(run, delay);
      }
    });
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [to, delay, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {format === "price" ? formatPrice(value) : value}
    </span>
  );
}
