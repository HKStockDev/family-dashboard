"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DashboardData, DashboardSettings, FamilyMember } from "./types";
import { getDefaultData } from "./defaultData";

const STORAGE_KEY = "family-dashboard-data-v1";

interface DashboardContextValue {
  data: DashboardData;
  ready: boolean;
  toggleTodo: (id: string) => void;
  toggleGrocery: (id: string) => void;
  toggleGoal: (id: string) => void;
  toggleHabit: (habitId: string, day: string) => void;
  updateSettings: (settings: Partial<DashboardSettings>) => void;
  updateMember: (id: string, patch: Partial<FamilyMember>) => void;
  resetToDefaults: () => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DashboardData>(() => getDefaultData());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DashboardData;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
        setData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore corrupt storage
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore quota errors
    }
  }, [data, ready]);

  const toggleTodo = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      todos: prev.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }));
  }, []);

  const toggleGrocery = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      groceries: prev.groceries.map((g) => (g.id === id ? { ...g, done: !g.done } : g)),
    }));
  }, []);

  const toggleGoal = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.map((g) => (g.id === id ? { ...g, done: !g.done } : g)),
    }));
  }, []);

  const toggleHabit = useCallback((habitId: string, day: string) => {
    setData((prev) => {
      const habitLog = { ...prev.habitLog };
      const dayMap = { ...(habitLog[habitId] || {}) } as Record<string, boolean>;
      dayMap[day] = !dayMap[day];
      habitLog[habitId] = dayMap as never;
      return { ...prev, habitLog };
    });
  }, []);

  const updateSettings = useCallback((settings: Partial<DashboardSettings>) => {
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...settings } }));
  }, []);

  const updateMember = useCallback((id: string, patch: Partial<FamilyMember>) => {
    setData((prev) => ({
      ...prev,
      members: prev.members.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setData(getDefaultData());
  }, []);

  const value = useMemo(
    () => ({
      data,
      ready,
      toggleTodo,
      toggleGrocery,
      toggleGoal,
      toggleHabit,
      updateSettings,
      updateMember,
      resetToDefaults,
    }),
    [data, ready, toggleTodo, toggleGrocery, toggleGoal, toggleHabit, updateSettings, updateMember, resetToDefaults]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}
