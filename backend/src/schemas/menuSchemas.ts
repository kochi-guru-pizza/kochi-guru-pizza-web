// src/schemas/menuSchemas.ts
import { z } from "zod";

const priceVariantSchema = z.object({
  size: z.enum(["small", "medium", "large"]),
  price: z.number().min(0, "Price must be non-negative")
});

const categoryEnum = z.enum([
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
]);

export const createMenuItemSchema = z.object({
  body: z
    .object({
      name: z.string().min(1, "Name is required").trim(),
      description: z.string().trim().optional(),
      category: categoryEnum,
      variants: z.array(priceVariantSchema).optional(),
      price: z.number().min(0, "Price must be non-negative").optional(),
      isAvailable: z.boolean().optional(),
      image: z.string().url("Invalid image URL").optional(),
      sortOrder: z.number().int().optional()
    })
    .refine(
      (data) => {
        // Pizza and add_on categories use variants; others use a flat price
        const variantCategories = ["pizza", "add_on"];

        const hasVariants =
          Array.isArray(data.variants) && data.variants.length > 0;
        const hasPrice = data.price !== undefined;

        if (variantCategories.includes(data.category)) {
          // For variant categories: require variants (non-empty) and disallow price
          return hasVariants && !hasPrice;
        }

        // For non-variant categories: require price and disallow non empty variants
        return hasPrice && !hasVariants;
      },
      {
        message:
          "For pizza and add_on, provide variants (no price). For other categories, provide price (no variants)."
      }
    )
});

export const updateMenuItemSchema = z.object({
  params: z.object({
    id: z.string().min(1, "ID is required")
  }),
  body: z
    .object({
      name: z.string().min(1, "Name is required").trim().optional(),
      description: z.string().trim().optional(),
      category: categoryEnum.optional(),
      variants: z.array(priceVariantSchema).optional(),
      price: z.number().min(0, "Price must be non-negative").optional(),
      isAvailable: z.boolean().optional(),
      image: z.string().url("Invalid image URL").optional().nullable(),
      sortOrder: z.number().int().optional()
    })
    .refine(
      (data) => {
        const variantCategories = ["pizza", "add_on"];

        const touchedCategory = "category" in data;
        const touchedVariants = "variants" in data;
        const touchedPrice = "price" in data;

        // If none of the related fields are being updated, accept.
        if (!touchedCategory && !touchedVariants && !touchedPrice) {
          return true;
        }

        // If category is a variant category
        if (data.category && variantCategories.includes(data.category)) {
          // Whenever category is provided, we MUST ensure we have variants and NO price.
          // This prevents partial updates from leaving the item in a mixed state.
          if (!touchedVariants || !touchedPrice || data.price !== undefined) {
            return false;
          }

          return Array.isArray(data.variants) && data.variants.length > 0;
        }

        // If category is a non-variant category
        if (data.category && !variantCategories.includes(data.category)) {
          // Whenever category is provided, we MUST ensure we have price and NO variants.
          if (
            !touchedPrice ||
            !touchedVariants ||
            (Array.isArray(data.variants) && data.variants.length > 0)
          ) {
            return false;
          }

          return data.price !== undefined;
        }

        // If category is NOT provided, we allow updating name/description etc.
        // However, we still reject "blind" updates to price/variants without category
        // (This was already handled by the return false below, but let's be explicit)
        if (!touchedCategory && (touchedVariants || touchedPrice)) {
          return false;
        }

        return true;
      },
      {
        message:
          "When updating category, you must provide the full pricing model (variants for pizza/add_on, flat price for others). Category is required when changing prices."
      }
    )
});

export const getMenuItemSchema = z.object({
  params: z.object({
    id: z.string().min(1, "ID is required")
  })
});

export const deleteMenuItemSchema = z.object({
  params: z.object({
    id: z.string().min(1, "ID is required")
  })
});

export const listMenuItemsSchema = z.object({
  query: z.object({
    category: categoryEnum.optional(),
    isAvailable: z
      .enum(["true", "false"])
      .transform((v) => v === "true")
      .optional()
  })
});
