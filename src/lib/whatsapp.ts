import { site } from "@/config/site";
import { formatPrice } from "@/lib/format";
import type { Pizza } from "@/types/menu";

/** Enlace de WhatsApp con un mensaje ya redactado. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Pedido de una pizza concreta. */
export function orderPizzaLink(pizza: Pizza): string {
  return whatsappLink(
    `¡Hola ${site.name}! 🍕 Quiero pedir una pizza *${pizza.name}* (${formatPrice(pizza.price)}).`,
  );
}

/** Mensaje genérico para el botón flotante y el pie de página. */
export function generalOrderLink(): string {
  return whatsappLink(`¡Hola ${site.name}! 🍕 Quiero hacer un pedido.`);
}
