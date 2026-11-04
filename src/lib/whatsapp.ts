import { site } from "@/config/site";

/** Enlace de WhatsApp con un mensaje ya redactado, al número que recibe los pedidos. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
