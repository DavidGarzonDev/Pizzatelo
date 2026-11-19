import { site } from "@/config/site";

/** Minutos desde la medianoche: 17:30 -> 1050. */
type Minutes = number;

interface Window {
  open: Minutes;
  close: Minutes;
}

/** Cada cuánto se ofrecen horas para programar el pedido. */
const SLOT_STEP = 30;
/** Lo mínimo que tarda un pedido: no se ofrece programar antes de esto. */
const MIN_LEAD = 45;

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

function toMinutes(hhmm: string): Minutes {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Horario de un día de la semana (0 = domingo), o null si no abrimos. */
function windowFor(weekday: number): Window | null {
  const slot = site.hours.find((h) => (h.weekdays as readonly number[]).includes(weekday));
  return slot ? { open: toMinutes(slot.open), close: toMinutes(slot.close) } : null;
}

/** Día de la semana y minuto actual en Colombia, sin importar la zona del celular. */
export function localNow(date: Date): { weekday: number; minutes: Minutes } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { weekday, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

/** 1050 -> "5:30 p.m." */
export function formatTime(minutes: Minutes): string {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${h24 < 12 ? "a.m." : "p.m."}`;
}

/** 0 -> "hoy", 1 -> "mañana", 2+ -> "el viernes". */
function dayLabel(offset: number, weekday: number): string {
  if (offset === 0) return "hoy";
  if (offset === 1) return "mañana";
  return `el ${DAY_NAMES[weekday]}`;
}

export type StoreStatus =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; /** "hoy", "mañana" o "el lunes" */ opensDay: string };

/** Próxima apertura a partir de ahora (hoy más tarde, o un día siguiente). */
function nextOpening(weekday: number, minutes: Minutes): { offset: number; weekday: number; window: Window } | null {
  for (let offset = 0; offset < 8; offset++) {
    const day = (weekday + offset) % 7;
    const window = windowFor(day);
    if (!window) continue;
    if (offset === 0 && minutes >= window.open) continue;
    return { offset, weekday: day, window };
  }
  return null;
}

export function storeStatus(date: Date): StoreStatus {
  const { weekday, minutes } = localNow(date);
  const today = windowFor(weekday);
  if (today && minutes >= today.open && minutes < today.close) {
    return { open: true, closesAt: formatTime(today.close) };
  }
  const next = nextOpening(weekday, minutes);
  return {
    open: false,
    opensAt: next ? formatTime(next.window.open) : "",
    opensDay: next ? dayLabel(next.offset, next.weekday) : "",
  };
}

export interface DeliverySlot {
  /** Valor para el formulario; "asap" = lo antes posible. */
  value: string;
  /** Texto para el cliente y para el mensaje: "Hoy 6:30 p.m." */
  label: string;
}

export const ASAP = "asap";

/**
 * Horas de entrega que se pueden elegir. Abiertos: "lo antes posible" y
 * las horas que quedan hoy. Cerrados: las horas de la próxima apertura.
 */
export function deliverySlots(date: Date): DeliverySlot[] {
  const { weekday, minutes } = localNow(date);
  const today = windowFor(weekday);
  const isOpen = !!today && minutes >= today.open && minutes < today.close;

  const target = isOpen
    ? { offset: 0, weekday, window: today! }
    : nextOpening(weekday, minutes);
  if (!target) return [];

  const label = dayLabel(target.offset, target.weekday);
  const capitalized = label.charAt(0).toUpperCase() + label.slice(1);

  // Desde la apertura (o desde ahora + tiempo de preparación) hasta media hora antes de cerrar
  const earliest = isOpen
    ? Math.ceil((minutes + MIN_LEAD) / SLOT_STEP) * SLOT_STEP
    : target.window.open;
  const slots: DeliverySlot[] = isOpen ? [{ value: ASAP, label: "Lo antes posible" }] : [];
  for (let t = earliest; t <= target.window.close - SLOT_STEP; t += SLOT_STEP) {
    slots.push({ value: `${target.offset}-${t}`, label: `${capitalized} ${formatTime(t)}` });
  }
  return slots;
}
