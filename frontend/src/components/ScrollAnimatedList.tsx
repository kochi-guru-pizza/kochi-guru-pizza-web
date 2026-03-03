// src/components/ScrollAnimatedList.tsx
"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";

/**
 * Collects items whose whileInView fires within the same event-loop flush
 * (setTimeout(0)), then distributes stagger delays in the order they
 * registered with the coordinator. This typically corresponds to the render
 * (and thus DOM) order, but no explicit DOM-based sorting is performed.
 */
class StaggerCoordinator {
  private batch: Array<(delay: number) => void> = [];
  private scheduled = false;
  private readonly step: number;

  constructor(step: number = 0.1) {
    this.step = step;
  }

  register(callback: (delay: number) => void) {
    this.batch.push(callback);
    if (!this.scheduled) {
      this.scheduled = true;
      setTimeout(() => {
        this.batch.forEach((fn, i) => fn(i * this.step));
        this.batch = [];
        this.scheduled = false;
      }, 0);
    }
  }
}

const CoordinatorContext = createContext<StaggerCoordinator | null>(null);

export const useStaggerCoordinator = () => useContext(CoordinatorContext);

interface ScrollAnimatedListProps {
  children: ReactNode;
  className?: string;
  staggerStep?: number;
}

/**
 * Wraps a list or grid and provides a StaggerCoordinator to all
 * ScrollAnimatedItem children via context.
 * Each instance gets its own coordinator, so multiple lists on the
 * same page (e.g. menu categories) stagger independently.
 */
export default function ScrollAnimatedList({
  children,
  className = "",
  staggerStep = 0.1
}: ScrollAnimatedListProps) {
  const coordinator = useMemo(
    () => new StaggerCoordinator(staggerStep),
    [staggerStep]
  );
  return (
    <CoordinatorContext.Provider value={coordinator}>
      <div className={className}>{children}</div>
    </CoordinatorContext.Provider>
  );
}
