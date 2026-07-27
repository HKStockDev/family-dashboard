import { MealPlanCard } from "./MealPlanCard";
import { GroceryListCard } from "./GroceryListCard";

export function MealsView() {
  return (
    <div className="flex-1 min-h-0 px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <MealPlanCard className="h-full" />
      <GroceryListCard className="h-full" />
    </div>
  );
}
