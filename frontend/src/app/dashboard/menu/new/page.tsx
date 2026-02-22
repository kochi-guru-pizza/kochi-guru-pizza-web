// src/app/dashboard/menu/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { menuService } from "@services/menuService";
import { CreateMenuItemPayload } from "@typings/menu";
import MenuItemFormPage from "../../components/MenuItemFormPage";

export default function NewMenuItemPage() {
  const router = useRouter();

  const handleSave = async (payload: CreateMenuItemPayload) => {
    try {
      await menuService.createMenuItem(payload);
      toast.success("Menu item added!");
      router.push("/dashboard/menu");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create menu item";
      toast.error(message);
      throw err;
    }
  };

  return <MenuItemFormPage onSave={handleSave} />;
}
