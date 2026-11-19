"use client";

import { useEffect, useState } from "react";
import { storeStatus, type StoreStatus } from "@/lib/hours";

/**
 * Estado abierto/cerrado, recalculado cada minuto. Devuelve null en el
 * primer render (servidor) para no mostrar una hora equivocada al hidratar.
 */
export function useNow(): Date | null {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function useStoreStatus(): StoreStatus | null {
  const now = useNow();
  return now ? storeStatus(now) : null;
}
