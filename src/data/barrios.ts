/**
 * Barrios y zonas de Yumbo con el valor del domicilio (tabla de precios del negocio).
 *
 * Solo entregamos en Yumbo, así que no hay selector de ciudad: el cliente
 * busca su barrio y el domicilio se suma solo al total. Para cambiar un
 * precio o agregar un barrio, edítalo aquí (en orden alfabético).
 *
 * `fee: null` = barrio donde entregamos pero sin precio definido todavía: el
 * pedido sale con "domicilio por confirmar". Lo mismo pasa si el cliente
 * escribe un barrio que no está en la lista.
 */
export interface Barrio {
  name: string;
  /** Valor del domicilio en pesos, o null si se confirma por WhatsApp. */
  fee: number | null;
}

export const barrios: Barrio[] = [
  { name: "Acacias", fee: 5000 },
  { name: "Barrio Chino", fee: 4000 },
  { name: "Belalcázar", fee: 4000 },
  { name: "Bellavista", fee: 4000 },
  { name: "Bellavista parte alta", fee: 5000 },
  { name: "Bolívar", fee: 4000 },
  { name: "Bosques del Samán", fee: 4000 },
  { name: "Brisas de Campestre", fee: 4500 },
  { name: "Brisas de la Sultana", fee: 5000 },
  { name: "Buenos Aires", fee: 4000 },
  { name: "Buenos Aires parte alta", fee: 5000 },
  { name: "Cacique Jacinto", fee: 4500 },
  { name: "Campestre Real", fee: 4500 },
  { name: "Cartón Colombia", fee: 7000 },
  { name: "Ceiba parte alta", fee: 5000 },
  { name: "Cementos Argos", fee: 7000 },
  { name: "Cencar", fee: 8000 },
  { name: "Colinas", fee: 4000 },
  { name: "Colinas del Norte", fee: 8000 },
  { name: "Comfandi", fee: 4000 },
  { name: "Corvivalle", fee: 4000 },
  { name: "Cruces parte alta", fee: 5000 },
  { name: "Dionisio", fee: 4500 },
  { name: "Empresas de Gas Américas", fee: 7000 },
  { name: "Estancia", fee: 5000 },
  { name: "Eternit", fee: 7000 },
  { name: "Finlandia", fee: 4000 },
  { name: "Flor de Montenegro", fee: 4000 },
  { name: "Floral", fee: 4000 },
  { name: "Fray Peña", fee: 4000 },
  { name: "Gaitán", fee: 4000 },
  { name: "Good Year", fee: 7000 },
  { name: "Guabinas", fee: 8000 },
  { name: "Guacandá", fee: 4000 },
  { name: "Guadalupe", fee: 5000 },
  { name: "Hacienda Verde", fee: 5000 },
  { name: "Juan Pablo", fee: 5000 },
  { name: "La Ceiba", fee: 4000 },
  { name: "Las Américas", fee: null },
  { name: "Las Cruces", fee: 4000 },
  { name: "Las Vegas", fee: 4000 },
  { name: "Lleras", fee: 4000 },
  { name: "Maderkit", fee: 8000 },
  { name: "Madrigal", fee: 4000 },
  { name: "Municipal", fee: 4000 },
  { name: "Nuevo Horizonte", fee: 5000 },
  { name: "Panorama", fee: 6000 },
  { name: "Parques del Pinar", fee: 5000 },
  { name: "Pedregal", fee: 4000 },
  { name: "Pizarro", fee: 4500 },
  { name: "Portales de Comfandi", fee: null },
  { name: "Portales de Yumbo", fee: 4000 },
  { name: "Propal", fee: 8000 },
  { name: "Puerto Isaac", fee: 5000 },
  { name: "Residencias Santana San Jorge", fee: 7000 },
  { name: "Riveras de Yumbo", fee: 6000 },
  { name: "San Fernando", fee: 4000 },
  { name: "San Fernando parte alta", fee: 5000 },
  { name: "San Jorge", fee: null },
  { name: "San Marcos", fee: null },
  { name: "San Rafael Plaza", fee: 5000 },
  { name: "Trinidad", fee: 5000 },
  { name: "Uribe", fee: 4000 },
];

/** Valor del domicilio para un barrio elegido; null si no tiene precio o no está en la lista. */
export function deliveryFee(name: string): number | null {
  return barrios.find((b) => b.name === name)?.fee ?? null;
}
