// src/app/about/components/MeetTheTeam.tsx
"use client";

import React from "react";
import { ChefHat, Flame, Heart } from "lucide-react";
import { motion } from "framer-motion";

const team = [
  {
    initials: "KG",
    name: "The Founder",
    role: "Head Chef & Owner",
    quote:
      "I wanted Walasmulla to have a place where every bite felt like a little celebration. That dream became Kochi Guru Pizza.",
    icon: <Flame className="w-5 h-5" />,
    gradient: "from-orange-400 to-red-500"
  },
  {
    initials: "PK",
    name: "Pizzaiolo",
    role: "Wood-Fired Oven Specialist",
    quote:
      "The oven is alive. Each pizza needs its own attention, its own timing. I love that no two days are ever the same.",
    icon: <ChefHat className="w-5 h-5" />,
    gradient: "from-amber-400 to-orange-500"
  },
  {
    initials: "SR",
    name: "The Kitchen Heart",
    role: "Prep & Ingredients Lead",
    quote:
      "Fresh is not a marketing word for us — it is a rule. I make sure every sauce, every topping meets the standard before it reaches the oven.",
    icon: <Heart className="w-5 h-5" />,
    gradient: "from-rose-400 to-orange-400"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const }
  }
};

export default function MeetTheTeam() {
  return (
    <section className="py-20 md:py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-orange-600 dark:text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
            The People Behind the Pizza
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Every great pizza starts with great people. These are the hands,
            hearts, and stories behind every slice.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-7"
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 p-8 flex flex-col items-center text-center overflow-hidden"
            >
              {/* Subtle background glow */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${member.gradient} opacity-80`}
              />

              {/* Avatar */}
              <div
                className={`flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br ${member.gradient} text-white text-2xl font-bold font-heading mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300`}
              >
                {member.initials}
              </div>

              {/* Name & Role */}
              <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <div className="inline-flex items-center gap-1.5 text-orange-600 dark:text-orange-500 text-sm font-semibold mb-5">
                {member.icon}
                {member.role}
              </div>

              {/* Quote */}
              <div className="relative">
                <span className="absolute -top-2 -left-1 text-4xl text-orange-200 dark:text-orange-900/50 font-serif leading-none select-none">
                  &ldquo;
                </span>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic pl-4">
                  {member.quote}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm text-gray-400 dark:text-gray-500 mt-10"
        >
          Plus our wonderful front-of-house crew who make every visit memorable.
        </motion.p>
      </div>
    </section>
  );
}
