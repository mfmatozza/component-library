"use client";

// Sticky, blurred header: Logo — PillNav — actions, in a 3-col grid on desktop,
// PillNav drops below the row on mobile. Source: invest-your-time's landing-header.tsx.
// Pair with pill-nav.tsx.

import type { ReactNode } from "react";
import { PillNav, type NavItem } from "./pill-nav";

export function SiteHeader<T extends string>({
  logo,
  navItems,
  active,
  onChange,
  actions,
  indicatorClassName,
  indicatorTextClassName,
}: {
  logo: ReactNode;
  navItems: NavItem<T>[];
  active: T;
  onChange: (key: T) => void;
  /** Right-aligned slot: login link, CTA button, whatever the project needs. */
  actions?: ReactNode;
  indicatorClassName?: string;
  indicatorTextClassName?: string;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
        <div className="flex items-center justify-between sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
          {logo}

          <div className="hidden sm:block">
            <PillNav
              items={navItems}
              active={active}
              onChange={onChange}
              indicatorClassName={indicatorClassName}
              indicatorTextClassName={indicatorTextClassName}
            />
          </div>

          <div className="flex items-center justify-end gap-3 sm:gap-4">{actions}</div>
        </div>

        <div className="mt-3 flex justify-center sm:hidden">
          <PillNav
            items={navItems}
            active={active}
            onChange={onChange}
            indicatorClassName={indicatorClassName}
            indicatorTextClassName={indicatorTextClassName}
          />
        </div>
      </div>
    </header>
  );
}
