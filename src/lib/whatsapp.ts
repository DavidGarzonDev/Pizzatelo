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
    `¡Hola ${site.name}! 🍕 Quiero pedir una pizza *${pizza.name}* — ${site.size.label}, ${site.size.slices} porciones (${formatPrice(pizza.price)}).`,
  );
}

/** Mensaje genérico para el botón flotante y el pie de página. */
export function generalOrderLink(): string {
  return whatsappLink(`¡Hola ${site.name}! 🍕 Quiero hacer un pedido.`);
}

export interface OrderDetails {
  lines: { name: string; qty: number; price: number }[];
  subtotal: number;
  name: string;
  address: string;
  barrio: string;
  notes: string;
  payment: string;
  /** Con cuánto paga en efectivo, para llevar la devuelta. Vacío si no aplica. */
  cashAmount: number | null;
}

/** Pedido completo armado desde el carrito, listo para enviar por WhatsApp. */
export function orderCartLink(order: OrderDetails): string {
  const items = order.lines
    .map((line) => `• ${line.qty} × ${line.name} — ${formatPrice(line.qty * line.price)}`)
    .join("\n");

  const lines = [
    `¡Hola ${site.name}! 🍕 Quiero hacer este pedido:`,
    "",
    items,
    "",
    `*Total pizzas:* ${formatPrice(order.subtotal)}`,
    "_(el valor del domicilio me lo confirman ustedes)_",
    "",
    `*Nombre:* ${order.name}`,
    `*Dirección:* ${order.address}`,
    `*Barrio:* ${order.barrio}, ${site.city}`,
  ];

  if (order.notes) lines.push(`*Indicaciones:* ${order.notes}`);
  lines.push(`*Pago:* ${order.payment}`);
  if (order.cashAmount) lines.push(`*Pago con:* ${formatPrice(order.cashAmount)}`);

  return whatsappLink(lines.join("\n"));
}
