// src/app/menu/[id]/components/ItemMeta.tsx
import { MenuItem, CATEGORY_LABELS } from "@typings/menu";

const CATEGORY_ICONS: Record<string, string> = {
  pizza: "🍕",
  pasta: "🍝",
  bun: "🍔",
  sandwich: "🥪",
  snack: "🍟",
  fresh_juice: "🥤",
  milkshake: "🥛",
  mojito: "🍹",
  soft_drinks: "🧃",
  add_on: "✨"
};

interface ItemMetaProps {
  item: MenuItem;
}

export default function ItemMeta({ item }: ItemMetaProps) {
  return (
    <div className="space-y-5">
      {/* Category + availability row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
          <span>{CATEGORY_ICONS[item.category]}</span>
          {CATEGORY_LABELS[item.category]}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            item.isAvailable
              ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
              : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              item.isAvailable ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {item.isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Name */}
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
        {item.name}
      </h1>

      {/* Short description */}
      {item.description && (
        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
          {item.description}
        </p>
      )}

      {/* Long description — shown immediately after short description */}
      {item.longDescription && (
        <div className="pt-1 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400">
            About this item
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-loose whitespace-pre-line">
            {item.longDescription}
          </p>
        </div>
      )}
    </div>
  );
}
