"use client";

import { useEffect, useMemo, useState } from "react";
import { useDashboard } from "@/lib/store";
import { CATEGORY_STYLES } from "@/lib/categories";
import { DAY_KEYS, DayKey } from "@/lib/types";
import {
  dateForDayKey,
  formatMonthDay,
  formatWeekdayShort,
  parseTimeToMinutes,
  todayDayKey,
} from "@/lib/dateUtils";
import { Card } from "./Card";
import { CalendarDays } from "lucide-react";

const START_HOUR = 6;
const END_HOUR = 22;
const SLOT_MINUTES = 30;
const TOTAL_ROWS = ((END_HOUR - START_HOUR) * 60) / SLOT_MINUTES;

function rowForMinutes(minutes: number): number {
  const clamped = Math.min(Math.max(minutes, START_HOUR * 60), END_HOUR * 60);
  return (clamped - START_HOUR * 60) / SLOT_MINUTES + 2; // +2: header row is row 1
}

export function WeeklyCalendar() {
  const { data } = useDashboard();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- bootstrap client-only clock, avoids SSR/client mismatch
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const today = todayDayKey();
  const referenceDate = now ?? new Date();

  const hourMarks = useMemo(() => {
    const marks: number[] = [];
    for (let h = START_HOUR; h < END_HOUR; h++) marks.push(h);
    return marks;
  }, []);

  const currentMinutes = now ? now.getHours() * 60 + now.getMinutes() : -1;
  const showNowLine = currentMinutes >= START_HOUR * 60 && currentMinutes <= END_HOUR * 60;

  return (
    <Card
      title="Weekly Calendar"
      icon={<CalendarDays className="w-4 h-4" strokeWidth={1.8} />}
      className="h-full"
      bodyClassName="overflow-auto"
    >
      <div
        className="grid min-w-[760px]"
        style={{
          gridTemplateColumns: `52px repeat(7, minmax(0, 1fr))`,
          gridTemplateRows: `44px repeat(${TOTAL_ROWS}, minmax(22px, 1fr))`,
        }}
      >
        {/* corner cell */}
        <div className="sticky top-0 z-20 bg-[var(--color-card)]" style={{ gridColumn: 1, gridRow: 1 }} />

        {/* day headers */}
        {DAY_KEYS.map((day, i) => {
          const d = dateForDayKey(referenceDate, day);
          const isToday = day === today;
          return (
            <div
              key={day}
              className="sticky top-0 z-20 bg-[var(--color-card)] flex flex-col items-center justify-center pb-1.5 border-b border-[var(--color-border)]"
              style={{ gridColumn: i + 2, gridRow: 1 }}
            >
              <span
                className={`text-[10.5px] font-bold tracking-wider ${
                  isToday ? "text-[var(--color-sage-dark)]" : "text-[var(--color-muted)]"
                }`}
              >
                {formatWeekdayShort(d)}
              </span>
              <span
                className={`mt-0.5 flex items-center justify-center font-display text-[13px] ${
                  isToday
                    ? "w-6 h-6 rounded-full bg-[var(--color-sage)] text-white"
                    : "text-[var(--color-brown-dark)]"
                }`}
              >
                {formatMonthDay(d).split(" ")[1]}
              </span>
            </div>
          );
        })}

        {/* hour labels */}
        {hourMarks.map((h) => (
          <div
            key={h}
            className="text-right pr-2 text-[10px] text-[var(--color-muted)] -translate-y-2"
            style={{ gridColumn: 1, gridRow: rowForMinutes(h * 60) }}
          >
            {h === 12 ? "12 PM" : h > 12 ? `${h - 12} PM` : `${h} AM`}
          </div>
        ))}

        {/* gridlines */}
        {DAY_KEYS.map((day, di) =>
          hourMarks.map((h) => (
            <div
              key={`${day}-${h}`}
              className={`border-t border-[var(--color-border)]/70 ${
                di < 6 ? "border-r" : ""
              } ${day === today ? "bg-[var(--color-sage)]/[0.04]" : ""}`}
              style={{ gridColumn: di + 2, gridRow: `${rowForMinutes(h * 60)} / span 2` }}
            />
          ))
        )}

        {/* now indicator */}
        {showNowLine && (
          <div
            className="relative z-10 pointer-events-none"
            style={{ gridColumn: DAY_KEYS.indexOf(today) + 2, gridRow: rowForMinutes(currentMinutes) }}
          >
            <div className="absolute left-0 right-0 top-0 h-[2px] bg-[#C9614C]">
              <span className="absolute -left-1 -top-[3px] w-2 h-2 rounded-full bg-[#C9614C]" />
            </div>
          </div>
        )}

        {/* events */}
        {data.events.map((ev) => {
          const dayIndex = DAY_KEYS.indexOf(ev.day as DayKey);
          const startRow = rowForMinutes(parseTimeToMinutes(ev.start));
          const endRow = rowForMinutes(parseTimeToMinutes(ev.end));
          const span = Math.max(endRow - startRow, 1);
          const style = CATEGORY_STYLES[ev.category];
          const member = data.members.find((m) => m.id === ev.memberId);
          return (
            <div
              key={ev.id}
              className="px-1 py-[2px] z-[5]"
              style={{ gridColumn: dayIndex + 2, gridRow: `${startRow} / span ${span}` }}
            >
              <div
                className={`h-full w-full rounded-lg border ${style.bg} ${style.border} px-2 py-1 flex flex-col justify-start overflow-hidden`}
              >
                <div className="flex items-center gap-1 min-w-0">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
                  <span className={`text-[11px] font-semibold leading-tight truncate ${style.text}`}>
                    {ev.title}
                  </span>
                </div>
                {member && (
                  <span className={`text-[9.5px] leading-tight ${style.text} opacity-80 truncate`}>
                    {member.name}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
