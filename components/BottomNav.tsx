"use client";

import {
  CalendarDays,
  CheckSquare,
  UtensilsCrossed,
  Sprout,
  PiggyBank,
  ListChecks,
  Image as ImageIcon,
  Settings,
} from "lucide-react";

export type TabId = "calendar" | "tasks" | "meals" | "habits" | "finances" | "lists" | "photos" | "settings";

const TABS: { id: TabId; label: string; icon: typeof CalendarDays }[] = [
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "meals", label: "Meals", icon: UtensilsCrossed },
  { id: "habits", label: "Habits", icon: Sprout },
  { id: "finances", label: "Finances", icon: PiggyBank },
  { id: "lists", label: "Lists", icon: ListChecks },
  { id: "photos", label: "Photos", icon: ImageIcon },
  { id: "settings", label: "Settings", icon: Settings },
];

export function BottomNav({ active, onChange }: { active: TabId; onChange: (t: TabId) => void }) {
  return (
    <nav className="shrink-0 bg-[var(--color-forest)] px-4 py-2.5">
      <ul className="flex items-center justify-center gap-1 md:gap-2 flex-wrap">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === active;
          return (
            <li key={tab.id}>
              <button
                onClick={() => onChange(tab.id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11.5px] font-semibold tracking-wide uppercase transition-colors ${
                  isActive ? "bg-[#EFEADD] text-[var(--color-forest)]" : "text-[#C7D2B7] hover:text-[#EFEADD]"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.9} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
