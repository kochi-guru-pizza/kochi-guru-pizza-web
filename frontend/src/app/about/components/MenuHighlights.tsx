// src/app/about/components/MenuHighlights.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Flame, Leaf, Zap, ChefHat } from "lucide-react";
import { motion } from "framer-motion";

const menuHighlights = [
  {
    icon: <Flame className="w-8 h-8" />,
    category: "Pizza",
    description:
      "Italian, Chicken, BBQ Chicken, Kochchi, Seafood, Supreme — available in 3 sizes."
  },
  {
    icon: <ChefHat className="w-8 h-8" />,
    category: "Buns & Snacks",
    description:
      "Burgers, Hotdogs, Cheese Sandwiches, Cheese Roll, and crispy French Fries."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    category: "Pasta",
    description:
      "Spaghetti with Chicken & Sausage or Seafood — rich, hearty, and satisfying."
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    category: "Drinks",
    description:
      "Fresh Juices, Milkshakes, Mojitos, Soft Drinks — the perfect companion to your meal."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function MenuHighlights() {
  return (
    <section className="py-20 md:py-24 bg-orange-50/30 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            A Menu for Every Craving
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From wood-fired pizzas to refreshing drinks, we have something for
            everyone
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {menuHighlights.map((item) => (
            <motion.div
              key={item.category}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-orange-400 to-orange-600 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {item.category}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-orange-600 to-orange-500 text-white font-bold rounded-xl hover:from-orange-700 hover:to-orange-600 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-200"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
