import { GroceryListCard } from "./GroceryListCard";
import { NotesCard } from "./NotesCard";
import { GoalsCard } from "./GoalsCard";

export function ListsView() {
  return (
    <div className="flex-1 min-h-0 px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <GroceryListCard className="h-full" />
      <GoalsCard className="h-full" />
      <NotesCard className="h-full" />
    </div>
  );
}
