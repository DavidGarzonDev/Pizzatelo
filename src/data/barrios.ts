/**
 * Barrios de Yumbo que aparecen en el selector del pedido.
 *
 * Solo entregamos en Yumbo, así que no hay selector de ciudad: el cliente
 * elige su barrio y listo. Si falta alguno, agrégalo aquí (en orden
 * alfabético). El cliente siempre puede elegir "Otro barrio" y escribirlo.
 */
export const barrios: string[] = [
  "Asovivir",
  "Belalcázar",
  "Bellavista",
  "Bolívar",
  "Buenos Aires",
  "Ciudadela Fray Peña",
  "Corvivienda",
  "El Pedregal",
  "Guacandá",
  "Juan Pablo II",
  "La Estancia",
  "La Trinidad",
  "Las Américas",
  "Las Cruces",
  "Lleras",
  "Nuevo Horizonte",
  "Panorama",
  "Puerto Isaacs",
  "San Fernando",
  "San Jorge",
  "Santa Inés",
  "Uribe Uribe",
];

/** Valor del selector cuando el barrio no está en la lista. */
export const OTRO_BARRIO = "__otro__";
