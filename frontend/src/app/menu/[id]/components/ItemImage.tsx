// src/app/menu/[id]/components/ItemImage.tsx
import Image from "next/image";
import { MenuCategory } from "@typings/menu";

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

interface ItemImageProps {
  src?: string;
  alt: string;
  category: MenuCategory;
}

export default function ItemImage({ src, alt, category }: ItemImageProps) {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800/60">
      {src ? (
        // Use a normal <img> so it respects the image's natural aspect ratio —
        // no cropping, no fixed height container.
        <img
          src={src}
          alt={alt}
          className="w-full h-auto block object-contain"
          loading="eager"
        />
      ) : (
        <div className="w-full aspect-square flex flex-col items-center justify-center gap-3">
          <span className="text-8xl opacity-20">
            {CATEGORY_ICONS[category]}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-widest uppercase">
            No image available
          </span>
        </div>
      )}
    </div>
  );
}
