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
          // When category is explicitly set to a variant category, require the client
          // to explicitly clear price (set to undefined) to avoid leaving stale pricing.
          if (touchedPrice && data.price !== undefined) {
            return false;
          }

          // When variants or price are part of this update, ensure at least one is effectively provided.
          if (touchedVariants || touchedPrice) {
            return (
              (Array.isArray(data.variants) && data.variants.length > 0) ||
              data.price === undefined
            );
          }
          // Category changed to a variant category, but this update does not touch price/variants.
          // Allow it; existing values are assumed to remain valid.
          return true;
        }

        // If category is a non-variant category
        if (data.category && !variantCategories.includes(data.category)) {
          // When category is explicitly set to a non-variant category, require the client
          // to explicitly clear variants to avoid leaving stale variants in the database.
          if (!touchedVariants) {
            return false;
          }

          // Variants must be provided as an empty array for non-variant categories.
          if (Array.isArray(data.variants) && data.variants.length === 0) {
            return true;
          }

          // Any other variants payload (including non-empty arrays) is invalid.
          return false;
        }

        // If category is not provided but variants/price are, reject the update:
        // Without category, we cannot safely enforce the pricing model invariant,
        // and might otherwise end up with both price and variants (e.g. updating price on a pizza).
        if (!touchedCategory && (touchedVariants || touchedPrice)) {
          return false;
        }

        return true;
      },
      {
        message:
          "Category is required when updating price or variants, and they must be consistent."
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
    isAvailable: z.enum(["true", "false"]).optional()
  })
});
