/** Formatea un precio en pesos colombianos: 25000 -> "$25.000". */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/\s/g, "");
}
