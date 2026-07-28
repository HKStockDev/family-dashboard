"use client";

import { useDashboard } from "@/lib/store";
import { Card } from "./Card";
import { UtensilsCrossed } from "lucide-react";
import { DAY_KEYS } from "@/lib/types";
import { todayDayKey } from "@/lib/dateUtils";

export function MealPlanCard({ className = "" }: { className?: string }) {
  const { data } = useDashboard();
  const today = todayDayKey();

  return (
    <Card
      title="Weekly Meal Plan"
      icon={<UtensilsCrossed className="w-4 h-4" strokeWidth={1.8} />}
      className={className}
      bodyClassName="overflow-auto"
    >
      <div className="flex gap-3 h-full">
        <ul className="flex-1 min-w-0 flex flex-col gap-1">
          {DAY_KEYS.map((day) => {
            const entry = data.meals.find((m) => m.day === day);
            const isToday = day === today;
            return (
              <li
                key={day}
                className={`flex items-center gap-2 rounded-lg px-1.5 py-0.5 ${
                  isToday ? "bg-[var(--color-sage)]/10" : ""
                }`}
              >
                <span
                  className={`w-9 shrink-0 text-[10.5px] font-bold uppercase tracking-wide ${
                    isToday ? "text-[var(--color-sage-dark)]" : "text-[var(--color-muted)]"
                  }`}
                >
                  {day}
                </span>
                <span className="text-[12.5px] text-[var(--color-ink)] truncate">{entry?.meal ?? "—"}</span>
              </li>
            );
          })}
        </ul>
        <div className="hidden lg:block w-16 shrink-0 rounded-2xl overflow-hidden self-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- small static decorative thumbnail */}
          <img src="/images/meal-bowl.png" alt="" className="w-full h-full object-cover aspect-square" />
        </div>
      </div>
    </Card>
  );
}
