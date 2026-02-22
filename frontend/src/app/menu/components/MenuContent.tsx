// src/app/menu/components/MenuContent.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  MenuItem,
  MenuCategory,
  CATEGORY_LABELS,
  CATEGORIES
} from "@typings/menu";
import { UtensilsCrossed } from "lucide-react";

interface MenuContentProps {
  grouped: Partial<Record<MenuCategory, MenuItem[]>>;
}

const CATEGORY_ICONS: Record<MenuCategory, string> = {
  pizza: "🍕",
  pasta: "🍝",
  bun: "🍔",
  sandwich: "🥪",
  snack: "🍟",
  fresh_juice: "🥤",
  milkshake: "🥛",
  mojito: "🍹",
  soft_drinks: "🥤",
  add_on: "✨"
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

function PriceDisplay({ item }: { item: MenuItem }) {
  if (item.variants && item.variants.length > 0) {
    const sorted = [...item.variants].sort((a, b) => {
      const order = { large: 0, medium: 1, small: 2 };
      return order[a.size] - order[b.size];
    });
    return (
      <div className="flex flex-wrap gap-1.5 mt-2">
        {sorted.map((v) => (
          <span
            key={v.size}
            className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 px-2.5 py-1 rounded-lg font-semibold border border-orange-100 dark:border-orange-800/30"
          >
            <span className="capitalize">{v.size[0].toUpperCase()}</span> · Rs.{" "}
            {v.price.toLocaleString()}
          </span>
        ))}
      </div>
    );
  }
  return (
    <p className="text-lg font-bold text-orange-600 dark:text-orange-400 mt-2">
      Rs. {item.price?.toLocaleString()}
    </p>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      variants={itemVariants}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 bg-orange-50 dark:bg-gray-700 overflow-hidden shrink-0">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-40">
              {CATEGORY_ICONS[item.category]}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-heading text-base font-bold text-gray-900 dark:text-white leading-snug">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="mt-auto">
          <PriceDisplay item={item} />
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuContent({ grouped }: MenuContentProps) {
  const availableCategories = CATEGORIES.filter((cat) => grouped[cat]?.length);
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "all">(
    "all"
  );

  const visibleCategories =
    activeCategory === "all"
      ? availableCategories
      : availableCategories.filter((c) => c === activeCategory);

  if (availableCategories.length === 0) {
    return (
      <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 rounded-2xl bg-orange-50 dark:bg-orange-900/10 flex items-center justify-center mx-auto mb-6">
            <UtensilsCrossed className="w-9 h-9 text-orange-400" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Menu coming soon
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            We&apos;re still setting things up. Check back shortly!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sticky category filter tabs */}
        <div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm pt-2 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-10">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeCategory === "all"
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:text-orange-600 dark:hover:text-orange-400"
              }`}
            >
              All
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:text-orange-600 dark:hover:text-orange-400"
                }`}
              >
                <span>{CATEGORY_ICONS[cat]}</span>
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Category sections */}
        <div className="space-y-14">
          <AnimatePresence mode="wait">
            {visibleCategories.map((cat) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Category heading */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{CATEGORY_ICONS[cat]}</span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {CATEGORY_LABELS[cat]}
                    </h2>
                  </div>
                  <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                  <span className="text-sm text-gray-400 dark:text-gray-500 font-medium shrink-0">
                    {grouped[cat]!.length}{" "}
                    {grouped[cat]!.length === 1 ? "item" : "items"}
                  </span>
                </div>

                {/* Pizza gets a special table layout for size pricing */}
                {cat === "pizza" || cat === "add_on" ? (
                  <PizzaTable items={grouped[cat]!} />
                ) : (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
                  >
                    {grouped[cat]!.map((item) => (
                      <MenuItemCard key={item._id} item={item} />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// Special table layout for pizza/add-on size pricing
function PizzaTable({ items }: { items: MenuItem[] }) {
  // Determine which sizes are actually present across all items
  const hasSizes = items.some((i) => i.variants && i.variants.length > 0);

  if (!hasSizes) {
    // Fallback to card grid if no variants
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
      >
        {items.map((item) => (
          <MenuItemCard key={item._id} item={item} />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm"
    >
      {/* Table header */}
      <div className="grid grid-cols-[1fr_auto_auto_auto] bg-orange-500 text-white text-sm font-bold px-5 py-3 gap-4">
        <span>Item</span>
        <span className="w-20 text-center">Large</span>
        <span className="w-20 text-center">Medium</span>
        <span className="w-20 text-center">Small</span>
      </div>

      {/* Table rows */}
      {items.map((item, idx) => {
        const getPrice = (size: "large" | "medium" | "small") => {
          if (item.variants) {
            const v = item.variants.find((v) => v.size === size);
            return v ? `Rs. ${v.price.toLocaleString()}` : "—";
          }
          return "—";
        };

        return (
          <motion.div
            key={item._id}
            variants={itemVariants}
            className={`grid grid-cols-[1fr_auto_auto_auto] items-center px-5 py-4 gap-4 text-sm transition-colors duration-150 hover:bg-orange-50/50 dark:hover:bg-orange-900/5 ${
              idx !== items.length - 1
                ? "border-b border-gray-100 dark:border-gray-800"
                : ""
            } bg-white dark:bg-gray-800/40`}
          >
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {item.name}
              </p>
              {item.description && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {item.description}
                </p>
              )}
            </div>
            <span className="w-20 text-center font-bold text-orange-600 dark:text-orange-400">
              {getPrice("large")}
            </span>
            <span className="w-20 text-center font-bold text-orange-600 dark:text-orange-400">
              {getPrice("medium")}
            </span>
            <span className="w-20 text-center font-bold text-orange-600 dark:text-orange-400">
              {getPrice("small")}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
