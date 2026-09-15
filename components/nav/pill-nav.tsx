"use client";

// Sliding-pill nav. Source of truth: invest-your-time/src/components/nav-pill.tsx
// (copied by hand into orbit-analytics already — this file makes that copy official).
//
// Requires framer-motion and these CSS variables on the consuming project:
// --surface, --border, --text, --text-muted. Swap the highlight color per project
// via `indicatorClassName` (e.g. "bg-gold text-[#14110a]" or "bg-primary text-white").

import { useId } from "react";
import { motion } from "framer-motion";

export interface NavItem<T extends string> {
  key: T;
  label: string;
}

export function PillNav<T extends string>({
  items,
  active,
  onChange,
  indicatorClassName = "bg-primary",
  indicatorTextClassName = "text-white",
}: {
  items: NavItem<T>[];
  active: T;
  onChange: (key: T) => void;
  /** Background of the sliding highlight behind the active item. */
  indicatorClassName?: string;
  /** Text color used on the active item while the indicator sits behind it. */
  indicatorTextClassName?: string;
}) {
  const layoutId = `nav-pill-highlight-${useId()}`;

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface/80 p-1 backdrop-blur">
      {items.map((item) => {
        const isActive = item.key === active;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm ${
              isActive ? indicatorTextClassName : "text-text-muted"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className={`absolute inset-0 rounded-full ${indicatorClassName}`}
                transition={{ type: "spring", stiffness: 480, damping: 34 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
