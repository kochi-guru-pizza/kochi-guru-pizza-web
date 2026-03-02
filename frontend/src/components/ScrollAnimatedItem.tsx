// src/components/ScrollAnimatedItem.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useStaggerCoordinator } from "@components/ScrollAnimatedList";

interface ScrollAnimatedItemProps {
  children: ReactNode;
  className?: string;
  /**
   * Slide direction on entrance.
   * "up"   → slides up from below (default)
   * "left" → slides in from the left
   * "right" → slides in from the right
   * "down" → slides down from above
   */
  direction?: "up" | "left" | "right" | "down";
  duration?: number;
}

const variants = {
  up: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  left: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  },
  right: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  },
  down: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  }
};

/**
 * Animates its child when it scrolls into the viewport.
 * When wrapped in a ScrollAnimatedList, registers with the shared
 * StaggerCoordinator so that all items entering the viewport in the
 * same event-loop tick receive sequential delays — adapting to the
 * actual number of items visible, not a hardcoded column count.
 *
 * Works without a ScrollAnimatedList parent too (animates immediately).
 */
export default function ScrollAnimatedItem({
  children,
  className = "",
  direction = "up",
  duration = 0.5
}: ScrollAnimatedItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const coordinator = useStaggerCoordinator();

  const [visible, setVisible] = useState(false);
  const [delay, setDelay] = useState(0);

  useEffect(() => {
    if (isInView) {
      if (coordinator) {
        coordinator.register((d) => {
          setDelay(d);
          setVisible(true);
        });
      } else {
        setVisible(true);
      }
    } else {
      setVisible(false);
      setDelay(0);
    }
  }, [isInView, coordinator]);

  return (
    <motion.div
      ref={ref}
      variants={variants[direction]}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      transition={
        visible ? { duration, ease: "easeOut", delay } : { duration: 0.5 }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
