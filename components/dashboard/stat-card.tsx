// Dashboard stat tile: label, big value, optional hint and accent icon.
// Source: growthpilot/frontend/src/components/StatCard.tsx.
// One accent color family per project (see tokens/design-tokens.md) — pass a
// tone map with your own project's colors rather than adding more built-in tones.

import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  accent?: string;
  accentClassName?: Record<string, string>;
  icon?: ReactNode;
}

export function StatCard({
  label,
  value,
  hint,
  accent = "default",
  accentClassName = { default: "bg-slate-100 text-slate-700" },
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs font-medium uppercase tracking-wide text-text-muted">{label}</div>
        {icon && (
          <div className={`flex h-7 w-7 items-center justify-center rounded-md ${accentClassName[accent]}`}>
            {icon}
          </div>
        )}
      </div>
      <div className="text-3xl font-semibold tracking-tight">{value}</div>
      {hint && <div className="mt-1 text-xs text-text-muted/70">{hint}</div>}
    </div>
  );
}
