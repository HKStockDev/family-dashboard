"use client";

import { useDashboard } from "@/lib/store";
import { Checkbox } from "./Checkbox";
import { Card } from "./Card";
import { ListChecks } from "lucide-react";
import { FamilyMember, TodoItem } from "@/lib/types";

function MemberColumn({ member, todos }: { member: FamilyMember; todos: TodoItem[] }) {
  const { toggleTodo } = useDashboard();
  return (
    <div className="flex-1 min-w-0">
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
              className={`text-[12.5px] leading-tight truncate ${
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
    <Card title="Today's Focus" icon={<ListChecks className="w-4 h-4" strokeWidth={1.8} />} className={className}>
      <div className="flex gap-4 h-full">
        {primaryMembers.map((m) => (
          <MemberColumn key={m.id} member={m} todos={data.todos.filter((t) => t.memberId === m.id)} />
        ))}
      </div>
    </Card>
  );
}
