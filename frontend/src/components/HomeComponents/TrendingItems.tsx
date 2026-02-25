// src/components/HomeComponents/TrendingItems.tsx
"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

type TrendingItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const trendingItems: TrendingItem[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 15.99,
    //image: "/assets/images/trending/pizza.jpg"
    image: "/assets/image-fallback.jpg"
  },
  {
    id: 2,
    name: "Loaded Burger",
    price: 12.99,
    //image: "/assets/images/trending/burger.jpg"
    image: "/assets/image-fallback.jpg"
  },
  {
    id: 3,
    name: "Fresh Mango Juice",
    price: 4.99,
    //image: "/assets/images/trending/juice.jpg"
    image: "/assets/image-fallback.jpg"
  },
  {
    id: 4,
    name: "Creamy Pasta",
    price: 13.99,
    //image: "/assets/images/trending/pasta.jpg"
    image: "/assets/image-fallback.jpg"
  }
];

export default function TrendingItems() {
  return (
    <section className="py-20 md:py-24 bg-orange-50/30 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 gpu-fix"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trending Now
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our most popular items that customers can&apos;t get enough
            of
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-colors duration-300 overflow-hidden dark:border dark:border-gray-700 gpu-fix"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/image-fallback.jpg";
                    e.currentTarget.srcset = "";
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-600 dark:text-orange-500">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="text-sm font-medium hidden sm:inline">
                      Add
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
