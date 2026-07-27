"use client";

import { Cloud, CloudRain, CloudSnow, CloudFog, Sun, CloudSun, Zap } from "lucide-react";
import { useWeather, weatherLabel } from "@/lib/useWeather";
import { useDashboard } from "@/lib/store";

function WeatherIcon({ code, className }: { code: number | null; className?: string }) {
  const props = { className, strokeWidth: 1.6 };
  if (code === 0) return <Sun {...props} />;
  if (code === 1 || code === 2) return <CloudSun {...props} />;
  if (code === 3) return <Cloud {...props} />;
  if (code !== null && [45, 48].includes(code)) return <CloudFog {...props} />;
  if (code !== null && [51, 53, 55, 61, 63, 65, 80, 81].includes(code)) return <CloudRain {...props} />;
  if (code !== null && [71, 73, 75].includes(code)) return <CloudSnow {...props} />;
  if (code !== null && [95, 96, 99, 82].includes(code)) return <Zap {...props} />;
  return <CloudSun {...props} />;
}

export function WeatherWidget() {
  const { data } = useDashboard();
  const { settings } = data;
  const { temperature, weatherCode, loading } = useWeather(
    settings.latitude,
    settings.longitude,
    settings.temperatureUnit
  );
  const unitLabel = settings.temperatureUnit === "fahrenheit" ? "°F" : "°C";

  return (
    <div className="flex items-center gap-2.5">
      <WeatherIcon code={weatherCode} className="w-7 h-7 text-[var(--color-sage-dark)]" />
      <div className="leading-tight">
        <p className="font-display text-xl text-[var(--color-brown-dark)]">
          {loading || temperature === null ? "--" : Math.round(temperature)}
          {unitLabel}
        </p>
        <p className="text-[11px] text-[var(--color-muted)] truncate max-w-[110px]">
          {loading ? "Loading…" : weatherLabel(weatherCode)} · {settings.locationLabel}
        </p>
      </div>
    </div>
  );
}
