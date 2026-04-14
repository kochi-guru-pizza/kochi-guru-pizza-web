"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { X, Upload, ArrowUpCircle } from "lucide-react";
import toast from "react-hot-toast";
import { httpClient } from "@/lib/httpClient";

interface ImageGalleryManagerProps {
  initialImages: string[];
  onChange: (images: string[]) => void;
}

export default function ImageGalleryManager({
  initialImages,
  onChange
}: ImageGalleryManagerProps) {
  const [uploading, setUploading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<{
    url: string;
    index: number;
  } | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      try {
        const uploadedUrls: string[] = [];

        for (const file of acceptedFiles) {
          const formData = new FormData();
          formData.append("file", file);

          const response = await httpClient<{ url: string }>("/images", {
            method: "POST",
            body: formData
          });

          if (response && response.url) {
            uploadedUrls.push(response.url);
          }
        }

        onChange([...initialImages, ...uploadedUrls]);
        toast.success(`Uploaded ${uploadedUrls.length} image(s)`);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to upload images";
        toast.error(message);
      } finally {
        setUploading(false);
      }
    },
    [initialImages, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": ["image/jpeg", "image/png", "image/webp"] },
    disabled: uploading
  });

  const confirmDelete = async () => {
    if (!imageToDelete) return;
    try {
      await httpClient<{ message: string }>("/images", {
        method: "DELETE",
        body: JSON.stringify({ url: imageToDelete.url })
      });
      const newImages = [...initialImages];
      newImages.splice(imageToDelete.index, 1);
      onChange(newImages);
      toast.success("Image removed");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to remove image";
      toast.error(message);
    } finally {
      setIsDeleteDialogOpen(false);
      setImageToDelete(null);
    }
  };

  const setPrimary = (index: number) => {
    if (index === 0) return;
    const newImages = [...initialImages];
    const [selected] = newImages.splice(index, 1);
    newImages.unshift(selected);
    onChange(newImages);
  };

  return (
    <>
      <div className="space-y-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragActive
              ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
              : "border-gray-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-600"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <Upload
              className="text-gray-400 group-hover:text-orange-500 transition-colors"
              size={32}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {uploading
                ? "Uploading..."
                : "Drag & drop images here, or click to select"}
            </p>
            <p className="text-xs text-gray-400">JPEG, PNG, WebP (Max 5MB)</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {initialImages.map((url, index) => (
            <div
              key={url}
              className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
            >
              <Image
                src={url}
                alt="Upload preview"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover"
              />

              {index === 0 && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  PRIMARY
                </div>
              )}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => setPrimary(index)}
                    className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-lg backdrop-blur-sm transition-all"
                    title="Set as primary"
                  >
                    <ArrowUpCircle size={18} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setImageToDelete({ url, index });
                    setIsDeleteDialogOpen(true);
                  }}
                  className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg backdrop-blur-sm transition-all"
                  title="Remove image"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
          {initialImages.length === 0 && !uploading && (
            <div className="col-span-full py-12 text-center text-gray-400 text-sm italic">
              No images uploaded yet
            </div>
          )}
        </div>
      </div>

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Delete Image?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to remove this image? This action is
              permanent and cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteDialogOpen(false);
                  setImageToDelete(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
