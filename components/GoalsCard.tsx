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
      <ul className="flex flex-col gap-1">
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
    </Card>
  );
}
