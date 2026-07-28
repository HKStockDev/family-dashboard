"use client";

import { useDashboard } from "@/lib/store";
import { Card } from "./Card";
import { Checkbox } from "./Checkbox";
import { Target } from "lucide-react";

export function GoalsCard({ className = "" }: { className?: string }) {
  const { data, toggleGoal } = useDashboard();

  return (
    <Card
      title="Goals"
      icon={<Target className="w-4 h-4" strokeWidth={1.8} />}
      className={className}
      bodyClassName="overflow-auto"
    >
      <div className="flex gap-3 h-full">
        <ul className="flex-1 min-w-0 flex flex-col gap-1">
          {data.goals.map((goal) => (
            <li key={goal.id} className="flex items-center gap-2">
              <Checkbox checked={goal.done} onChange={() => toggleGoal(goal.id)} color="var(--color-gold)" />
              <span
                className={`text-[12.5px] truncate ${
                  goal.done ? "line-through text-[var(--color-muted)]" : "text-[var(--color-ink)]"
                }`}
              >
                {goal.text}
              </span>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block w-16 shrink-0 rounded-2xl overflow-hidden self-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- small static decorative thumbnail */}
          <img src="/images/goals-plant.png" alt="" className="w-full h-full object-cover aspect-square" />
        </div>
      </div>
    </Card>
  );
}
