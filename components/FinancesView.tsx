"use client";

import { Card } from "./Card";
import { GoalsCard } from "./GoalsCard";
import { PiggyBank } from "lucide-react";

const MOCK_PROGRESS = 0.62;
const MOCK_SAVED = 3100;
const MOCK_TARGET = 5000;

export function FinancesView() {
  return (
    <div className="flex-1 min-h-0 px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card title="Savings Goal" icon={<PiggyBank className="w-4 h-4" strokeWidth={1.8} />} className="h-full">
        <div className="flex flex-col gap-4 pt-2">
          <div>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl text-[var(--color-brown-dark)]">
                ${MOCK_SAVED.toLocaleString()}
              </span>
              <span className="text-sm text-[var(--color-muted)]">of ${MOCK_TARGET.toLocaleString()}</span>
            </div>
            <div className="mt-2 h-3 w-full rounded-full bg-[var(--color-cream)] overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--color-sage)]"
                style={{ width: `${MOCK_PROGRESS * 100}%` }}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-[var(--color-muted)]">
              {Math.round(MOCK_PROGRESS * 100)}% toward this year&apos;s goal
            </p>
          </div>
          <p className="text-[12.5px] text-[var(--color-muted)] leading-relaxed border-t border-[var(--color-border)] pt-3">
            Connect this card to your budgeting sheet (YNAB, Google Sheets, etc.) to show real balances,
            monthly spending, or bill due dates.
          </p>
        </div>
      </Card>
      <GoalsCard className="h-full" />
    </div>
  );
}
