// src/components/HomeComponents/WhyChooseUs.tsx
"use client";

import React from "react";
import { Flame, Leaf, Zap, ChefHat } from "lucide-react";
import { motion } from "framer-motion";

type USP = {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
};

const usps: USP[] = [
  {
    id: 1,
    icon: <Flame className="w-8 h-8" />,
    title: "Wood-Fired Oven",
    description:
      "Authentic Italian-style pizzas baked to perfection in our traditional wood-fired oven for that unique smoky flavor."
  },
  {
    id: 2,
    icon: <Leaf className="w-8 h-8" />,
    title: "Fresh Local Ingredients",
    description:
      "We source the freshest ingredients from local suppliers to ensure quality and support our community."
  },
  {
    id: 3,
    icon: <Zap className="w-8 h-8" />,
    title: "Fast Service",
    description:
      "Quick preparation without compromising quality. Your delicious pizza is ready when you are."
  },
  {
    id: 4,
    icon: <ChefHat className="w-8 h-8" />,
    title: "Expert Chefs",
    description:
      "Our experienced chefs bring passion and expertise to every pizza, ensuring perfection in every bite."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
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

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover what makes us the best pizza destination in Kochi
          </p>
        </motion.div>

        {/* USP Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {usps.map((usp) => (
            <motion.div
              key={usp.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              style={{
                backfaceVisibility: "hidden",
                transform: "translateZ(0)"
              }}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 p-6"
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-orange-400 to-orange-600 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                {usp.icon}
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {usp.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {usp.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
