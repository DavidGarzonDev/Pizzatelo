/** Normaliza texto para buscar sin acentos ni mayúsculas: "Belalcázar" -> "belalcazar". */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}
