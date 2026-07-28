"use client";

import { useDashboard } from "@/lib/store";
import { Card } from "./Card";
import { Checkbox } from "./Checkbox";
import { ShoppingBasket } from "lucide-react";

export function GroceryListCard({ className = "" }: { className?: string }) {
  const { data, toggleGrocery } = useDashboard();

  return (
    <Card
      title="Grocery List"
      icon={<ShoppingBasket className="w-4 h-4" strokeWidth={1.8} />}
      className={className}
      bodyClassName="overflow-auto"
    >
      <ul className="flex flex-col gap-1">
        {data.groceries.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <Checkbox checked={item.done} onChange={() => toggleGrocery(item.id)} />
            <span
              className={`text-[12.5px] truncate ${
                item.done ? "line-through text-[var(--color-muted)]" : "text-[var(--color-ink)]"
              }`}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative flourish */}
      <img src="/images/leaf-sprig.png" alt="" className="w-8 h-8 object-contain opacity-50 ml-auto mt-1 -scale-x-100" />
    </Card>
  );
}
