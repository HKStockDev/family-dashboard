import { HabitTrackerCard } from "./HabitTrackerCard";
import { GoalsCard } from "./GoalsCard";

export function HabitsView() {
  return (
    <div className="flex-1 min-h-0 px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <HabitTrackerCard className="h-full" />
      <GoalsCard className="h-full" />
    </div>
  );
}
