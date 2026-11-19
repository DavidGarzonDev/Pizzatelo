"use client";

import { useStoreStatus } from "@/lib/useStoreStatus";

/** "● Abierto ahora · hasta las 10:00 p.m." o "● Cerrado · abrimos hoy a las 5:00 p.m." */
export function StoreStatusBadge({ className = "" }: { className?: string }) {
  const status = useStoreStatus();

  // Reserva el espacio mientras se calcula para que nada salte
  if (!status) return <span className={`inline-block h-7 ${className}`} aria-hidden="true" />;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${
        status.open
          ? "border-basil-500/40 bg-basil-500/10 text-basil-300"
          : "border-crust/40 bg-crust/10 text-crust"
      } ${className}`}
      role="status"
    >
      <span className="relative flex h-2 w-2">
        {status.open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-basil-400 opacity-60" />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${status.open ? "bg-basil-400" : "bg-crust"}`} />
      </span>
      {status.open
        ? `Abierto ahora · hasta las ${status.closesAt}`
        : `Cerrado · abrimos ${status.opensDay} a las ${status.opensAt}`}
    </span>
  );
}
