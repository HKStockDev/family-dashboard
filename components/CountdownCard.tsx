"use client";

import { useMemo } from "react";
import { useDashboard } from "@/lib/store";
import { daysUntil } from "@/lib/dateUtils";
import { Mountain } from "lucide-react";

export function CountdownCard() {
  const { data } = useDashboard();

  const sorted = useMemo(() => {
    return [...data.countdowns]
      .map((c) => ({ ...c, days: daysUntil(c.date) }))
      .filter((c) => c.days >= 0)
      .sort((a, b) => a.days - b.days);
  }, [data.countdowns]);

  const featured = sorted[0];
  const rest = sorted.slice(1, 4);

  return (
    <section className="rounded-3xl bg-[var(--color-forest)] text-[#EFEADD] p-5 card-shadow flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[10.5px] font-bold tracking-wider uppercase text-[#C7D2B7]">
        <Mountain className="w-3.5 h-3.5" strokeWidth={2} />
        Countdown To
      </div>
      {featured ? (
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-lg leading-tight">{featured.label}</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-display text-4xl">{featured.days}</span>
              <span className="text-xs text-[#C7D2B7] uppercase tracking-wide">days left</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 opacity-90">
            {/* eslint-disable-next-line @next/next/no-img-element -- small static decorative thumbnail */}
            <img src="/images/mountain-scene.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      ) : (
        <p className="text-sm text-[#C7D2B7]">No upcoming events yet.</p>
      )}
      {rest.length > 0 && (
        <ul className="mt-1 flex flex-col gap-1.5 border-t border-white/10 pt-2.5">
          {rest.map((c) => (
            <li key={c.id} className="flex items-center justify-between text-[12.5px]">
              <span className="text-[#DDE3CC] truncate pr-2">{c.label}</span>
              <span className="text-[#A9B896] font-semibold shrink-0">{c.days}d</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
