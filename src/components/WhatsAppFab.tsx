"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useCart } from "@/lib/cart";
import { directOrderLink } from "@/lib/whatsapp";

/**
 * Botón flotante para pedir directo por WhatsApp; aparece una vez el
 * visitante pasa el hero. Si hay un pedido en curso, sube para quedar
 * encima de la barra "Ver mi pedido" en vez de taparla.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const { count, isOpen } = useCart();
  const raised = count > 0;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shown = visible && !isOpen;

  return (
    <a
      href={directOrderLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir por WhatsApp"
      tabIndex={shown ? 0 : -1}
      className={`fixed right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-ink shadow-xl shadow-black/50 transition-all duration-300 hover:scale-105 ${
        raised ? "bottom-24" : "bottom-5"
      } ${shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
