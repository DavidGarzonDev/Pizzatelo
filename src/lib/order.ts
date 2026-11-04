import { site, type PaymentMethod } from "@/config/site";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";

/** Pedido terminado: lo que se manda por WhatsApp y lo que se muestra en el recibo. */
export interface Order {
  /** Referencia corta para ubicar el pedido y su pago, p. ej. "PZT-1104-K7Q2". */
  ref: string;
  lines: { name: string; qty: number; price: number }[];
  subtotal: number;
  name: string;
  address: string;
  barrio: string;
  notes: string;
  payment: PaymentMethod;
  /** Con cuánto paga en efectivo, para llevar la devuelta. */
  cashAmount: number | null;
}

// Sin letras ni números que se confundan al dictarlos (0/O, 1/I/L)
const REF_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

/** Referencia del pedido: PZT + mes y día en Colombia + 4 caracteres al azar. */
export function createOrderRef(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  // padStart: algunos navegadores devuelven "4" aunque se pida "2-digit"
  const pick = (type: string) => (parts.find((p) => p.type === type)?.value ?? "0").padStart(2, "0");
  const month = pick("month");
  const day = pick("day");

  const random = new Uint32Array(4);
  crypto.getRandomValues(random);
  const code = Array.from(random, (n) => REF_ALPHABET[n % REF_ALPHABET.length]).join("");

  return `PZT-${month}${day}-${code}`;
}

/** Cuánto hay que pagar, en texto: el domicilio lo confirma el negocio. */
export function amountToPay(order: Order): string {
  return `${formatPrice(order.subtotal)} + domicilio`;
}

/** Instrucciones de pago en una línea, para el mensaje de WhatsApp. */
function paymentLine(order: Order): string {
  const method = order.payment;
  if (!method.account) {
    const change = order.cashAmount ? ` Pago con ${formatPrice(order.cashAmount)}.` : "";
    return `💵 *Pago:* ${method.label} contra entrega.${change}`;
  }
  return [
    `💳 *Pago:* ${method.label}`,
    `Transfiero ${amountToPay(order)} a ${method.label} *${method.display}* (${method.note.toLowerCase()})`,
    `y envío el comprobante a este chat con la referencia *${order.ref}*.`,
  ].join("\n");
}

/** Mensaje completo del pedido, listo para WhatsApp. */
export function orderMessage(order: Order): string {
  const items = order.lines
    .map((line) => `• ${line.qty} × ${line.name} — ${formatPrice(line.qty * line.price)}`)
    .join("\n");

  const lines = [
    `🍕 *Pedido ${order.ref}*`,
    `¡Hola ${site.name}! Quiero hacer este pedido:`,
    "",
    items,
    "",
    `*Total pizzas:* ${formatPrice(order.subtotal)}`,
    "_(+ domicilio, me lo confirman)_",
    "",
    `*Nombre:* ${order.name}`,
    `*Dirección:* ${order.address}`,
    `*Barrio:* ${order.barrio}, ${site.city}`,
  ];
  if (order.notes) lines.push(`*Indicaciones:* ${order.notes}`);
  lines.push("", paymentLine(order));

  return lines.join("\n");
}

export function orderLink(order: Order): string {
  return whatsappLink(orderMessage(order));
}
