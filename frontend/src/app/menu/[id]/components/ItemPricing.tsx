// src/app/menu/[id]/components/ItemPricing.tsx
import { MenuItem, IPriceVariant, PizzaSize } from "@typings/menu";

interface ItemPricingProps {
  item: MenuItem;
}

const SIZE_LABEL: Record<PizzaSize, string> = {
  large: "Large",
  medium: "Medium",
  small: "Small"
};

const SIZE_HINT: Record<PizzaSize, string> = {
  large: '14"',
  medium: '10"',
  small: '7"'
};

export default function ItemPricing({ item }: ItemPricingProps) {
  const hasVariants = item.variants && item.variants.length > 0;

  if (hasVariants) {
    const sorted = [...item.variants!].sort(
      (a: IPriceVariant, b: IPriceVariant) => {
        const order: Record<PizzaSize, number> = {
          large: 0,
          medium: 1,
          small: 2
        };
        return order[a.size] - order[b.size];
      }
    );

    return (
      <div className="space-y-3">
        <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400">
          Choose your size
        </p>
        <div className="flex flex-col gap-2">
          {sorted.map((v) => (
            <div
              key={v.size}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                  <span className="text-xs font-extrabold text-orange-600 dark:text-orange-400 uppercase">
                    {v.size[0]}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-none">
                    {SIZE_LABEL[v.size]}
                  </p>
                  {SIZE_HINT[v.size] && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {SIZE_HINT[v.size]}
                    </p>
                  )}
                </div>
              </div>
              <span className="text-sm font-extrabold text-orange-600 dark:text-orange-400">
                Rs. {v.price.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (item.price != null) {
    return (
      <div className="space-y-1.5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400">
          Price
        </p>
        <p className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Rs.{" "}
          <span className="text-orange-600 dark:text-orange-400">
            {item.price.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }

  return null;
}
