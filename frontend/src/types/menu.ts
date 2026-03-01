// src/types/menu.ts

export type MenuCategory =
  | "pizza"
  | "pasta"
  | "bun"
  | "sandwich"
  | "snack"
  | "fresh_juice"
  | "milkshake"
  | "mojito"
  | "soft_drinks"
  | "add_on";

export type PizzaSize = "small" | "medium" | "large";

export interface IPriceVariant {
  size: PizzaSize;
  price: number;
}

export interface MenuItem {
  _id: string;
  name: string;
  description?: string;
  longDescription?: string;
  category: MenuCategory;
  variants?: IPriceVariant[];
  price?: number;
  isAvailable: boolean;
  image?: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface MenuListResponse {
  items: MenuItem[];
}

export interface CreateMenuItemPayload {
  name: string;
  description?: string;
  longDescription?: string;
  category: MenuCategory;
  variants?: IPriceVariant[];
  price?: number;
  isAvailable?: boolean;
  image?: string;
  sortOrder?: number;
}

export type UpdateMenuItemPayload = Partial<CreateMenuItemPayload>;

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  pizza: "Pizza",
  pasta: "Pasta",
  bun: "Bun",
  sandwich: "Sandwich",
  snack: "Snack",
  fresh_juice: "Fresh Juice",
  milkshake: "Milkshake",
  mojito: "Mojito",
  soft_drinks: "Soft Drinks",
  add_on: "Add-On Option"
};

export const CATEGORIES: MenuCategory[] = [
  "pizza",
  "pasta",
  "bun",
  "sandwich",
  "snack",
  "fresh_juice",
  "milkshake",
  "mojito",
  "soft_drinks",
  "add_on"
];

/** Categories that support size-based pricing */
export const VARIANT_CATEGORIES: MenuCategory[] = ["pizza", "add_on"];
