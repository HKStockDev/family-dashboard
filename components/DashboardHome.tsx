import { WeeklyCalendar } from "./WeeklyCalendar";
import { CountdownCard } from "./CountdownCard";
import { TodayFocusCard } from "./TodayFocusCard";
import { MealPlanCard } from "./MealPlanCard";
import { GroceryListCard } from "./GroceryListCard";
import { HabitTrackerCard } from "./HabitTrackerCard";
import { GoalsCard } from "./GoalsCard";
import { NotesCard } from "./NotesCard";

export function DashboardHome() {
  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2.5 px-6 pb-2.5">
      <div className="flex-1 xl:min-h-0 flex flex-col xl:flex-row gap-2.5">
        <div className="h-[520px] xl:h-auto xl:flex-1 xl:min-h-0">
          <WeeklyCalendar />
        </div>
        <div className="flex flex-col gap-2.5 xl:w-[280px] xl:min-h-0 shrink-0">
          <CountdownCard />
          <TodayFocusCard className="xl:flex-1 xl:min-h-0 min-h-[220px]" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5 shrink-0 xl:max-h-[176px]">
        <MealPlanCard />
        <GroceryListCard />
        <HabitTrackerCard />
        <GoalsCard />
        <NotesCard className="hidden md:flex" />
      </div>
    </div>
  );
}
