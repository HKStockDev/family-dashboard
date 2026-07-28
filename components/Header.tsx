"use client";

import { useDashboard } from "@/lib/store";
import { ClockDate } from "./ClockDate";
import { WeatherWidget } from "./WeatherWidget";

export function Header() {
  const { data } = useDashboard();
  const { settings } = data;

  return (
    <header className="flex items-stretch gap-4 px-6 pt-3 pb-2 shrink-0">
      <div className="hidden md:flex items-center gap-3 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] card-shadow px-4 py-2.5">
        <div className="w-11 h-11 rounded-2xl overflow-hidden shrink-0 bg-[var(--color-sage)]">
          {/* eslint-disable-next-line @next/next/no-img-element -- small static decorative thumbnail */}
          <img src="/images/header-nature.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center gap-4">
          <ClockDate />
          <div className="w-px self-stretch bg-[var(--color-border)]" />
          <WeatherWidget />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
        <div className="flex items-center justify-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative flourish */}
          <img src="/images/leaf-sprig.png" alt="" className="hidden sm:block w-7 h-7 object-contain opacity-70 -scale-x-100" />
          <h1 className="font-display text-3xl md:text-[34px] tracking-wide text-[var(--color-brown-dark)]">
            {settings.familyName}
          </h1>
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative flourish */}
          <img src="/images/leaf-sprig.png" alt="" className="hidden sm:block w-7 h-7 object-contain opacity-70" />
        </div>
        <p className="text-[11px] md:text-[12px] tracking-[0.25em] uppercase text-[var(--color-sage-dark)] mt-1">
          {settings.tagline}
        </p>
      </div>

      <div className="hidden lg:flex items-center gap-2 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] card-shadow px-5 py-2.5 max-w-[280px]">
        <p className="text-[12.5px] italic leading-snug text-[var(--color-ink)]">
          “{settings.quote.text}”
          <span className="block not-italic text-[11px] text-[var(--color-muted)] mt-1">
            — {settings.quote.source}
          </span>
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative flourish */}
        <img src="/images/leaf-sprig.png" alt="" className="w-6 h-6 object-contain opacity-60 shrink-0 self-start" />
      </div>
    </header>
  );
}
