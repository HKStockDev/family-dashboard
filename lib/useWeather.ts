"use client";

import { useEffect, useState } from "react";

export interface WeatherState {
  temperature: number | null;
  weatherCode: number | null;
  loading: boolean;
  error: boolean;
}

// WMO weather codes -> condition label
const WEATHER_LABELS: Record<number, string> = {
  0: "Clear",
  1: "Mostly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  71: "Light Snow",
  73: "Snow",
  75: "Heavy Snow",
  80: "Rain Showers",
  81: "Rain Showers",
  82: "Storms",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
};

export function weatherLabel(code: number | null): string {
  if (code === null) return "";
  return WEATHER_LABELS[code] ?? "Partly Cloudy";
}

export function useWeather(
  latitude: number,
  longitude: number,
  unit: "fahrenheit" | "celsius" = "fahrenheit"
): WeatherState {
  const [state, setState] = useState<WeatherState>({
    temperature: null,
    weatherCode: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mark loading before kicking off the fetch below
    setState((s) => ({ ...s, loading: true, error: false }));

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=${unit}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("weather fetch failed");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        setState({
          temperature: json?.current?.temperature_2m ?? null,
          weatherCode: json?.current?.weather_code ?? null,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setState({ temperature: null, weatherCode: null, loading: false, error: true });
      });

    return () => {
      cancelled = true;
    };
  }, [latitude, longitude, unit]);

  return state;
}
