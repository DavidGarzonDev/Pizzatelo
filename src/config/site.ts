/**
 * Datos del negocio. Este es el único archivo que hay que tocar para cambiar
 * teléfonos, cuentas de pago, horarios o redes sociales.
 */
export const site = {
  name: "Pizzatelo",
  city: "Yumbo",
  tagline: "Pizza artesanal con actitud ninja",
  description:
    "Menú de Pizzatelo Yumbo: pizzas artesanales horneadas al momento. Pepperoni, Hawaiana, Samba, Pollo Champiñones y nuestra Especial. Pide por WhatsApp.",
  url: "https://pizzatelo-menu.vercel.app",

  /** Número que recibe los pedidos, en formato internacional sin signos. */
  whatsapp: "573108484727",
  /** El mismo número, formateado para mostrar en pantalla. */
  phoneDisplay: "310 848 4727",

  hours: [
    { days: "Lunes a Jueves", time: "5:00 p.m. – 10:00 p.m." },
    { days: "Viernes y Sábado", time: "5:00 p.m. – 11:00 p.m." },
    { days: "Domingo", time: "5:00 p.m. – 10:00 p.m." },
  ],

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
    instagram: "https://instagram.com/pizzatelo",
    facebook: "https://facebook.com/pizzatelo",
  },
} as const;

export type PaymentMethod = (typeof site.payments)[number];
