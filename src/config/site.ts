/**
 * Datos del negocio. Este es el único archivo que hay que tocar para cambiar
 * teléfonos, cuentas de pago, horarios o redes sociales.
 */
export const site = {
  name: "Pizzatelo",
  city: "Yumbo",
  tagline: "Pizza artesanal de cocina oculta",
  description:
    "Menú de Pizzatelo Yumbo: pizzas artesanales horneadas al momento. Pepperoni, Hawaiana, Samba, Pollo Champiñones y nuestra Especial. Haz tu pedido a domicilio en Yumbo.",
  url: "https://pizzatelo-menu.vercel.app",

  /** Número que recibe los pedidos, en formato internacional sin signos. */
  whatsapp: "573233484308",
  /** El mismo número, formateado para mostrar en pantalla. */
  phoneDisplay: "323 348 4308",

  /** Tamaño único de todas las pizzas. Si algún día hay varios, esto crece. */
  size: {
    label: "Mediana",
    slices: 4,
    diameterCm: 30,
    /** Frase lista para mostrar: "Mediana · 4 porciones · 30 cm". */
    summary: "Mediana · 4 porciones · 30 cm",
  },

  /**
   * Horario de atención (hora de Colombia). `weekdays` usa 0 = domingo …
   * 6 = sábado; `open` y `close` van en formato 24 h. Con esto la página
   * dice si estamos abiertos y ofrece programar el pedido si no.
   * Si cambias un horario, cambia también `time`, que es lo que se muestra.
   */
  hours: [
    { days: "Lunes a Jueves", time: "5:00 p.m. – 10:00 p.m.", weekdays: [1, 2, 3, 4], open: "17:00", close: "22:00" },
    { days: "Viernes y Sábado", time: "5:00 p.m. – 11:00 p.m.", weekdays: [5, 6], open: "17:00", close: "23:00" },
    { days: "Domingo", time: "5:00 p.m. – 10:00 p.m.", weekdays: [0], open: "17:00", close: "22:00" },
  ],
  timeZone: "America/Bogota",

  // Ojo: el Nequi es un número distinto al de contacto (whatsapp, arriba).
  // Este sale del flyer de métodos de pago y es donde llega la plata: no lo
  // cambies sin confirmarlo con el negocio.
  payments: [
    {
      id: "nequi",
      label: "Nequi",
      account: "3108484727",
      display: "310 848 4727",
      note: "Pagos y transferencias",
    },
    {
      id: "bancolombia",
      label: "Bancolombia",
      account: "62172683253",
      display: "621 726 832 53",
      note: "Cuenta de ahorros",
    },
    {
      id: "efectivo",
      label: "Efectivo",
      account: null,
      display: null,
      note: "Contra entrega",
    },
  ],

  social: {
    instagram: "https://www.instagram.com/_pizzatelo",
  },
} as const;

export type PaymentMethod = (typeof site.payments)[number];
