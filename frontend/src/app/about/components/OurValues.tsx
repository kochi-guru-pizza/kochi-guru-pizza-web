// src/app/about/components/OurValues.tsx
"use client";

import React from "react";
import { Heart, Sprout, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: <Heart className="w-7 h-7" />,
    title: "Made with Love",
    description:
      "Every dish that leaves our kitchen carries the same passion that inspired us to open our doors. We never cut corners — because you deserve better.",
    accent: "from-rose-400 to-rose-600"
  },
  {
    icon: <Sprout className="w-7 h-7" />,
    title: "Fresh Ingredients",
    description:
      "We source locally and season-consciously. No frozen shortcuts — just hand-picked produce, house-made sauces, and slow-fermented dough every single day.",
    accent: "from-green-400 to-green-600"
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Community First",
    description:
      "Kochi Guru Pizza was built for Walasmulla. We are proud to be a gathering place for families, friends, and first dates — a little corner of warmth in our town.",
    accent: "from-orange-400 to-orange-600"
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: "Uncompromising Quality",
    description:
      "From our wood-fired oven to your table, every step is held to the same standard. If it does not taste perfect to us, it will not reach you.",
    accent: "from-amber-400 to-amber-600"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const }
  }
};

export default function OurValues() {
  return (
    <section className="py-20 md:py-24 bg-orange-50/30 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 gpu-fix"
        >
          <span className="inline-block text-orange-600 dark:text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
            What We Stand For
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Values
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            These are not just words on a wall — they are the principles baked
            into everything we do.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group flex gap-5 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-smooth duration-300 border border-gray-100 dark:border-gray-700 p-7 gpu-fix"
            >
              <div
                className={`flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${value.accent} text-white shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md`}
              >
                {value.icon}
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
