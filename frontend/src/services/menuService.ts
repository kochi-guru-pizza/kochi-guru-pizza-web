// src/services/menuService.ts
import { httpClient } from "@lib/httpClient";
import {
  MenuItem,
  MenuListResponse,
  MenuCategory,
  CreateMenuItemPayload,
  UpdateMenuItemPayload
} from "@typings/menu";

/**
 * Fetch all menu items — public
 */
export const getMenuItems = async (params?: {
  category?: MenuCategory;
  isAvailable?: boolean;
}): Promise<MenuItem[]> => {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.isAvailable !== undefined)
    query.set("isAvailable", String(params.isAvailable));

  const qs = query.toString() ? `?${query.toString()}` : "";
  const response = await httpClient<MenuListResponse>(`/menu${qs}`);
  return response.items;
};

/**
 * Get a single menu item — public
 */
export const getMenuItem = async (id: string): Promise<MenuItem> => {
  return httpClient<MenuItem>(`/menu/${id}`);
};

/**
 * Create a menu item — admin/staff only
 */
export const createMenuItem = async (
  payload: CreateMenuItemPayload
): Promise<MenuItem> => {
  return httpClient<MenuItem>("/menu", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

/**
 * Update a menu item — admin/staff only
 */
export const updateMenuItem = async (
  id: string,
  payload: UpdateMenuItemPayload
): Promise<MenuItem> => {
  return httpClient<MenuItem>(`/menu/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
};

/**
 * Delete a menu item — admin only
 */
export const deleteMenuItem = async (id: string): Promise<void> => {
  await httpClient<{ message: string }>(`/menu/${id}`, {
    method: "DELETE"
  });
};

export const menuService = {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};
