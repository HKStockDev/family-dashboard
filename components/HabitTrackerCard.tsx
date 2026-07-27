"use client";

import { useDashboard } from "@/lib/store";
import { Card } from "./Card";
import { Sprout } from "lucide-react";
import { DAY_KEYS } from "@/lib/types";
import { todayDayKey } from "@/lib/dateUtils";

export function HabitTrackerCard({ className = "" }: { className?: string }) {
  const { data, toggleHabit } = useDashboard();
  const today = todayDayKey();

  return (
    <Card
      title="Habit Tracker"
      icon={<Sprout className="w-4 h-4" strokeWidth={1.8} />}
      className={className}
      bodyClassName="overflow-auto"
    >
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-[1fr_repeat(7,16px)] gap-x-1.5 items-center pb-1">
          <span />
          {DAY_KEYS.map((d) => (
            <span
              key={d}
              className={`text-center text-[9px] font-bold uppercase ${
                d === today ? "text-[var(--color-sage-dark)]" : "text-[var(--color-muted)]"
              }`}
            >
              {d[0]}
            </span>
          ))}
        </div>
        {data.habits.map((habit) => (
          <div key={habit.id} className="grid grid-cols-[1fr_repeat(7,16px)] gap-x-1.5 items-center">
            <span className="text-[11.5px] text-[var(--color-ink)] truncate pr-1">{habit.name}</span>
            {DAY_KEYS.map((day) => {
              const checked = data.habitLog[habit.id]?.[day] ?? false;
              return (
                <button
                  key={day}
                  onClick={() => toggleHabit(habit.id, day)}
                  aria-pressed={checked}
                  className="w-3.5 h-3.5 rounded-full border-2 justify-self-center transition-colors"
                  style={{
                    borderColor: checked ? "var(--color-sage)" : "var(--color-border)",
                    backgroundColor: checked ? "var(--color-sage)" : "transparent",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </Card>
  );
}
