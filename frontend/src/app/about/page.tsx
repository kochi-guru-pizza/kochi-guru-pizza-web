"use client";

import React from "react";
import Link from "next/link";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { MapPin, Phone, Clock, Flame, Leaf, Zap, ChefHat } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { value: "8+", label: "Pizza Varieties" },
  { value: "100%", label: "Fresh Ingredients" },
  { value: "4+", label: "Drink Categories" },
  { value: "523+", label: "Happy Customers" }
];

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

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero Banner */}
      <section className="relative w-full py-28 md:py-36 overflow-hidden bg-linear-to-br from-orange-600 via-orange-500 to-red-500">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
              <MapPin className="w-4 h-4" />
              Walasmulla, Sri Lanka
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              About Kochi Guru Pizza
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Bringing authentic Italian flavors to the heart of Walasmulla —
              wood-fired pizzas, fresh pastas, crispy burgers, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-orange-600 dark:text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
                Our Story
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Crafted with Passion,{" "}
                <span className="text-orange-600 dark:text-orange-500">
                  Served with Love
                </span>
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                <p>
                  Kochi Guru Pizza was born from a simple dream — to bring
                  authentic Italian-style pizza to the people of Walasmulla.
                  Nestled in the basement of the Cargills Food City Building on
                  Beliatta Road, we have become the go-to spot for families,
                  friends, and pizza lovers of all ages.
                </p>
                <p>
                  Every pizza we craft starts with hand-selected ingredients, a
                  slow-fermented dough, and house-made sauces. From our
                  signature Kochchi Pizza loaded with local flavors to the
                  indulgent Supreme, there is something on our menu for
                  everyone.
                </p>
                <p>
                  Beyond pizza, we serve fresh pasta, burgers, hotdogs,
                  sandwiches, and a vibrant selection of fresh fruit juices and
                  milkshakes — perfect for a complete dining experience.
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={cardVariants}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 text-center"
                >
                  <div className="font-heading text-4xl font-bold text-orange-600 dark:text-orange-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-20 md:py-24 bg-orange-50/30 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            viewport={{ once: true }}
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

      {/* Visit Us / Map Section */}
      <section className="py-20 md:py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Visit Us Today
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find us at the Cargills Food City Building in Walasmulla
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-4"
            >
              <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-5 flex gap-4 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-br from-orange-400 to-orange-600 text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-gray-900 dark:text-white mb-1">
                    Address
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Basement Floor, Cargills Food City Building,
                    <br />
                    Beliatta Road, Walasmulla 82220
                  </p>
                </div>
              </div>

              <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-5 flex gap-4 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-br from-orange-400 to-orange-600 text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-gray-900 dark:text-white mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:0770776848"
                    className="text-orange-600 dark:text-orange-500 font-semibold hover:text-orange-700 dark:hover:text-orange-400 transition text-lg"
                  >
                    077 077 6848
                  </a>
                </div>
              </div>

              <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-5 flex gap-4 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-br from-orange-400 to-orange-600 text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    Opening Hours
                  </p>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between gap-6">
                      <span>Monday – Friday</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        10:00 AM – 10:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between gap-6">
                      <span>Saturday – Sunday</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        10:00 AM – 10:00 PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/czRAX7EGLcJKBBxD7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-linear-to-r from-orange-600 to-orange-500 text-white font-bold rounded-xl hover:from-orange-700 hover:to-orange-600 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-200"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
            </motion.div>

            {/* Map Embed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-[420px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.8!2d80.6973356!3d6.150403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae14bf48d6f7b07%3A0xfe7cb83da3e3b9da!2sKochi%20Guru%20Pizza!5e0!3m2!1sen!2slk!4v1740000000000!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kochi Guru Pizza Location"
                />
              </div>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                Basement Floor, Cargills Food City Building, Walasmulla
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-orange-50/30 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-linear-to-br from-orange-600 via-orange-500 to-red-500 rounded-2xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[80%] bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[80%] bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Taste the Difference?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-xl mx-auto">
                Order online or visit us at the Cargills Food City Building,
                Walasmulla.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/menu"
                  className="px-8 py-3.5 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition shadow-lg"
                >
                  Browse Menu
                </Link>
                <a
                  href="tel:0770776848"
                  className="px-8 py-3.5 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/30 transition border border-white/30"
                >
                  Call Us Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
