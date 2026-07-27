"use client";

import { useEffect, useState } from "react";
import { formatFullDate, formatTime } from "@/lib/dateUtils";

export function ClockDate() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- bootstrap client-only clock, avoids SSR/client mismatch
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return <div className="h-[42px]" />;
  }

  return (
    <div className="leading-tight">
      <p className="text-[13px] font-medium text-[var(--color-muted)]">{formatFullDate(now)}</p>
      <p className="font-display text-2xl text-[var(--color-brown-dark)]">{formatTime(now)}</p>
    </div>
  );
}
