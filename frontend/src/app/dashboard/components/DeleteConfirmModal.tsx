// src/app/dashboard/components/DeleteConfirmModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";
import { MenuItem } from "@typings/menu";
import { useState } from "react";

interface DeleteConfirmModalProps {
  item: MenuItem;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function DeleteConfirmModal({
  item,
  onConfirm,
  onClose
}: DeleteConfirmModalProps) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await onConfirm();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
              <AlertTriangle size={22} className="text-red-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                Delete Menu Item
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                This action cannot be undone.
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {item.name}
            </span>
            ? It will be permanently removed from the menu.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={deleting}
              className="flex-1 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={deleting}
              className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-red-500/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {deleting && <Loader2 size={14} className="animate-spin" />}
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
