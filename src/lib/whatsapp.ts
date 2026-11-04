import { site } from "@/config/site";

/** Enlace de WhatsApp con un mensaje ya redactado, al número que recibe los pedidos. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Pedido directo por chat, para quien prefiere escribir en vez de armar el pedido aquí. */
export function directOrderLink(): string {
  return whatsappLink(`¡Hola ${site.name}! 🍕 Quiero hacer un pedido.`);
}
