export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export const DAY_KEYS: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const DAY_LABELS: Record<DayKey, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export type EventCategory =
  | "work"
  | "class"
  | "appointment"
  | "church"
  | "trip"
  | "event"
  | "dateNight"
  | "family"
  | "fitness"
  | "chores";

export interface CategoryStyle {
  label: string;
  bg: string;
  border: string;
  text: string;
  dot: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  role?: string;
  color: string; // hex accent color
  initial: string;
}

export interface CalendarEvent {
  id: string;
  day: DayKey;
  start: string; // "HH:MM" 24h
  end: string; // "HH:MM" 24h
  title: string;
  memberId?: string;
  category: EventCategory;
  icon?: string;
}

export interface TodoItem {
  id: string;
  memberId: string;
  text: string;
  done: boolean;
}

export interface MealPlanEntry {
  day: DayKey;
  meal: string;
}

export interface GroceryItem {
  id: string;
  text: string;
  done: boolean;
}

export interface HabitDef {
  id: string;
  name: string;
}

export type HabitLog = Record<string, Record<DayKey, boolean>>; // habitId -> day -> done

export interface Goal {
  id: string;
  text: string;
  done: boolean;
}

export interface CountdownItem {
  id: string;
  label: string;
  date: string; // ISO date string YYYY-MM-DD
  icon?: string;
}

export interface NoteItem {
  id: string;
  text: string;
}

export interface Quote {
  text: string;
  source: string;
}

export interface DashboardSettings {
  familyName: string;
  tagline: string;
  quote: Quote;
  latitude: number;
  longitude: number;
  locationLabel: string;
  temperatureUnit: "fahrenheit" | "celsius";
}

export interface DashboardData {
  settings: DashboardSettings;
  members: FamilyMember[];
  events: CalendarEvent[];
  todos: TodoItem[];
  meals: MealPlanEntry[];
  groceries: GroceryItem[];
  habits: HabitDef[];
  habitLog: HabitLog;
  goals: Goal[];
  countdowns: CountdownItem[];
  notes: NoteItem[];
}
