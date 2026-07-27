"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav, TabId } from "@/components/BottomNav";
import { DashboardHome } from "@/components/DashboardHome";
import { TasksView } from "@/components/TasksView";
import { MealsView } from "@/components/MealsView";
import { HabitsView } from "@/components/HabitsView";
import { FinancesView } from "@/components/FinancesView";
import { ListsView } from "@/components/ListsView";
import { PhotosView } from "@/components/PhotosView";
import { SettingsView } from "@/components/SettingsView";

export default function Home() {
  const [tab, setTab] = useState<TabId>("calendar");

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto] overflow-hidden">
      <Header />
      <div className="min-h-0 flex flex-col overflow-y-auto overflow-x-hidden">
        {tab === "calendar" && <DashboardHome />}
        {tab === "tasks" && <TasksView />}
        {tab === "meals" && <MealsView />}
        {tab === "habits" && <HabitsView />}
        {tab === "finances" && <FinancesView />}
        {tab === "lists" && <ListsView />}
        {tab === "photos" && <PhotosView />}
        {tab === "settings" && <SettingsView />}
      </div>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
