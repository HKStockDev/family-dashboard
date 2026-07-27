import { DAY_KEYS, DayKey } from "./types";

export function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day; // shift to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function dateForDayKey(reference: Date, day: DayKey): Date {
  const monday = startOfWeek(reference);
  const idx = DAY_KEYS.indexOf(day);
  return addDays(monday, idx);
}

export function todayDayKey(date: Date = new Date()): DayKey {
  const idx = (date.getDay() + 6) % 7; // Monday = 0
  return DAY_KEYS[idx];
}

export function formatMonthDay(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatWeekdayShort(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
}

export function formatFullDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function daysUntil(isoDate: string, from: Date = new Date()): number {
  const target = new Date(isoDate + "T00:00:00");
  const start = new Date(from);
  start.setHours(0, 0, 0, 0);
  const ms = target.getTime() - start.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function formatHourLabel(hour: number): string {
  const h = hour % 24;
  const period = h < 12 ? "AM" : "PM";
  let display = h % 12;
  if (display === 0) display = 12;
  return `${display} ${period}`;
}
