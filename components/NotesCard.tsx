"use client";

import { useDashboard } from "@/lib/store";
import { Card } from "./Card";
import { Bell } from "lucide-react";

export function NotesCard({ className = "" }: { className?: string }) {
  const { data } = useDashboard();

  return (
    <Card
      title="Notes & Reminders"
      icon={<Bell className="w-4 h-4" strokeWidth={1.8} />}
      className={className}
      bodyClassName="overflow-auto"
    >
      <ul className="flex flex-col gap-1.5">
        {data.notes.map((note) => (
          <li
            key={note.id}
            className="text-[12.5px] leading-snug text-[var(--color-ink)] pl-3 border-l-2 border-[var(--color-sage)]/40"
          >
            {note.text}
          </li>
        ))}
      </ul>
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative flourish */}
      <img src="/images/leaf-sprig.png" alt="" className="w-8 h-8 object-contain opacity-50 ml-auto mt-1" />
    </Card>
  );
}
