"use client";

import { useDashboard } from "@/lib/store";
import { Card } from "./Card";
import { Checkbox } from "./Checkbox";
import { ListChecks } from "lucide-react";

export function TasksView() {
  const { data, toggleTodo } = useDashboard();
  const primaryMembers = data.members.slice(0, 2);

  return (
    <div className="flex-1 min-h-0 px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {primaryMembers.map((member) => {
        const todos = data.todos.filter((t) => t.memberId === member.id);
        const doneCount = todos.filter((t) => t.done).length;
        return (
          <Card
            key={member.id}
            title={`${member.name}'s To-Dos`}
            icon={<ListChecks className="w-4 h-4" strokeWidth={1.8} />}
            className="h-full"
            action={
              <span className="text-[11px] text-[var(--color-muted)] font-semibold">
                {doneCount}/{todos.length}
              </span>
            }
          >
            <ul className="flex flex-col gap-3 pt-1">
              {todos.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-3 rounded-xl border border-[var(--color-border)]/70 px-3 py-2.5"
                >
                  <Checkbox checked={t.done} onChange={() => toggleTodo(t.id)} color={member.color} />
                  <span
                    className={`text-[14px] ${
                      t.done ? "line-through text-[var(--color-muted)]" : "text-[var(--color-ink)]"
                    }`}
                  >
                    {t.text}
                  </span>
                </li>
              ))}
              {todos.length === 0 && (
                <li className="text-sm text-[var(--color-muted)] py-6 text-center">All caught up ✨</li>
              )}
            </ul>
          </Card>
        );
      })}
    </div>
  );
}
