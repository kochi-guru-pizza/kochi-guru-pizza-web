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
        // Pizza and add_on categories support variants; others need a flat price
        const variantCategories = ["pizza", "add_on"];
        if (variantCategories.includes(data.category)) {
          // Must have either variants or price
          return (
            (data.variants && data.variants.length > 0) ||
            data.price !== undefined
          );
        }
        // Non-pizza categories must have a flat price
        return data.price !== undefined;
      },
      {
        message:
          "Either price or variants must be provided for the selected category"
      }
    )
});

export const updateMenuItemSchema = z.object({
  params: z.object({
    id: z.string().min(1, "ID is required")
  }),
  body: z.object({
    name: z.string().min(1, "Name is required").trim().optional(),
    description: z.string().trim().optional(),
    category: categoryEnum.optional(),
    variants: z.array(priceVariantSchema).optional(),
    price: z.number().min(0, "Price must be non-negative").optional(),
    isAvailable: z.boolean().optional(),
    image: z.string().url("Invalid image URL").optional().nullable(),
    sortOrder: z.number().int().optional()
  })
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
      .string()
      .transform((v) => v === "true")
      .optional()
  })
});
