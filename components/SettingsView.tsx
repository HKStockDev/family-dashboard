"use client";

import { useState } from "react";
import { useDashboard } from "@/lib/store";
import { Card } from "./Card";
import { Settings as SettingsIcon, RotateCcw, MapPin } from "lucide-react";

const PRESET_LOCATIONS = [
  { label: "Austin, TX", latitude: 30.2672, longitude: -97.7431 },
  { label: "New York, NY", latitude: 40.7128, longitude: -74.006 },
  { label: "Los Angeles, CA", latitude: 34.0522, longitude: -118.2437 },
  { label: "Chicago, IL", latitude: 41.8781, longitude: -87.6298 },
  { label: "Denver, CO", latitude: 39.7392, longitude: -104.9903 },
  { label: "Seattle, WA", latitude: 47.6062, longitude: -122.3321 },
  { label: "Miami, FL", latitude: 25.7617, longitude: -80.1918 },
];

function inputClass() {
  return "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-3 py-2 text-[13px] text-[var(--color-ink)] outline-none focus:border-[var(--color-sage)] transition-colors";
}

export function SettingsView() {
  const { data, updateSettings, updateMember, resetToDefaults } = useDashboard();
  const [confirmingReset, setConfirmingReset] = useState(false);

  return (
    <div className="flex-1 min-h-0 px-6 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-auto">
      <Card title="Dashboard Details" icon={<SettingsIcon className="w-4 h-4" strokeWidth={1.8} />} className="h-fit">
        <div className="flex flex-col gap-3 pt-1">
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wide">
              Family Name
            </span>
            <input
              className={inputClass()}
              value={data.settings.familyName}
              onChange={(e) => updateSettings({ familyName: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wide">
              Tagline
            </span>
            <input
              className={inputClass()}
              value={data.settings.tagline}
              onChange={(e) => updateSettings({ tagline: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wide">
              Quote / Verse
            </span>
            <textarea
              className={inputClass()}
              rows={2}
              value={data.settings.quote.text}
              onChange={(e) => updateSettings({ quote: { ...data.settings.quote, text: e.target.value } })}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wide">
              Quote Source
            </span>
            <input
              className={inputClass()}
              value={data.settings.quote.source}
              onChange={(e) => updateSettings({ quote: { ...data.settings.quote, source: e.target.value } })}
            />
          </label>
        </div>
      </Card>

      <Card title="Location & Weather" icon={<MapPin className="w-4 h-4" strokeWidth={1.8} />} className="h-fit">
        <div className="flex flex-col gap-3 pt-1">
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wide">
              Preset City
            </span>
            <select
              className={inputClass()}
              value={data.settings.locationLabel}
              onChange={(e) => {
                const preset = PRESET_LOCATIONS.find((p) => p.label === e.target.value);
                if (preset) {
                  updateSettings({
                    locationLabel: preset.label,
                    latitude: preset.latitude,
                    longitude: preset.longitude,
                  });
                }
              }}
            >
              {!PRESET_LOCATIONS.some((p) => p.label === data.settings.locationLabel) && (
                <option value={data.settings.locationLabel}>{data.settings.locationLabel} (custom)</option>
              )}
              {PRESET_LOCATIONS.map((p) => (
                <option key={p.label} value={p.label}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wide">
              Units
            </span>
            <div className="flex rounded-full border border-[var(--color-border)] overflow-hidden">
              {(["fahrenheit", "celsius"] as const).map((unit) => (
                <button
                  key={unit}
                  onClick={() => updateSettings({ temperatureUnit: unit })}
                  className={`px-3 py-1 text-[11px] font-semibold uppercase ${
                    data.settings.temperatureUnit === unit
                      ? "bg-[var(--color-sage)] text-white"
                      : "bg-transparent text-[var(--color-muted)]"
                  }`}
                >
                  {unit === "fahrenheit" ? "°F" : "°C"}
                </button>
              ))}
            </div>
          </div>
          <p className="text-[12px] text-[var(--color-muted)] leading-relaxed">
            Weather is live, pulled from Open-Meteo for the selected coordinates — no API key required.
          </p>
        </div>
      </Card>

      <Card title="Family Members & Colors" className="h-fit lg:col-span-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 pt-1">
          {data.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] px-3 py-2.5"
            >
              <input
                type="color"
                value={member.color}
                onChange={(e) => updateMember(member.id, { color: e.target.value })}
                className="w-9 h-9 rounded-lg border border-[var(--color-border)] cursor-pointer shrink-0"
              />
              <div className="flex-1 min-w-0">
                <input
                  className="w-full bg-transparent text-[13px] font-semibold text-[var(--color-ink)] outline-none"
                  value={member.name}
                  onChange={(e) => updateMember(member.id, { name: e.target.value })}
                />
                <input
                  className="w-full bg-transparent text-[11px] text-[var(--color-muted)] outline-none"
                  value={member.role ?? ""}
                  placeholder="Role"
                  onChange={(e) => updateMember(member.id, { role: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] text-[var(--color-muted)] leading-relaxed">
          The first two members shown here power the &quot;Today&apos;s Focus&quot; and Tasks columns. Reorder or
          rename via your data source to change who&apos;s featured.
        </p>
      </Card>

      <Card className="h-fit lg:col-span-2">
        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="text-[13px] font-semibold text-[var(--color-ink)]">Reset dashboard</p>
            <p className="text-[12px] text-[var(--color-muted)]">
              Restore all sample data, tasks, and settings to their original defaults.
            </p>
          </div>
          <button
            onClick={() => {
              if (confirmingReset) {
                resetToDefaults();
                setConfirmingReset(false);
              } else {
                setConfirmingReset(true);
                setTimeout(() => setConfirmingReset(false), 3000);
              }
            }}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-semibold transition-colors ${
              confirmingReset
                ? "bg-[#C9614C] text-white"
                : "bg-[var(--color-cream-soft)] text-[var(--color-brown-dark)] border border-[var(--color-border)]"
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} />
            {confirmingReset ? "Confirm reset?" : "Reset to defaults"}
          </button>
        </div>
      </Card>
    </div>
  );
}
