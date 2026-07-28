"use client";

import { useDashboard } from "@/lib/store";
import { Checkbox } from "./Checkbox";
import { Card } from "./Card";
import { ListChecks } from "lucide-react";
import { FamilyMember, TodoItem } from "@/lib/types";

function MemberSection({ member, todos }: { member: FamilyMember; todos: TodoItem[] }) {
  const { toggleTodo } = useDashboard();
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
          style={{ backgroundColor: member.color }}
        >
          {member.initial}
        </span>
        <p className="text-[12px] font-bold text-[var(--color-brown-dark)] truncate">{member.name}</p>
      </div>
      <ul className="flex flex-col gap-1.5">
        {todos.map((t) => (
          <li key={t.id} className="flex items-center gap-2">
            <Checkbox checked={t.done} onChange={() => toggleTodo(t.id)} color={member.color} />
            <span
              className={`text-[12.5px] leading-tight ${
                t.done ? "line-through text-[var(--color-muted)]" : "text-[var(--color-ink)]"
              }`}
            >
              {t.text}
            </span>
          </li>
        ))}
        {todos.length === 0 && <li className="text-[12px] text-[var(--color-muted)]">All clear ✨</li>}
      </ul>
    </div>
  );
}

export function TodayFocusCard({ className = "" }: { className?: string }) {
  const { data } = useDashboard();
  const primaryMembers = data.members.slice(0, 2);

  return (
    <Card
      title="Today's Focus"
      icon={<ListChecks className="w-4 h-4" strokeWidth={1.8} />}
      className={className}
      bodyClassName="overflow-auto"
    >
      <div className="flex flex-col gap-3">
        {primaryMembers.map((m, i) => (
          <div key={m.id} className={i > 0 ? "border-t border-[var(--color-border)] pt-2.5" : ""}>
            <MemberSection member={m} todos={data.todos.filter((t) => t.memberId === m.id)} />
          </div>
        ))}
      </div>
    </Card>
  );
}
