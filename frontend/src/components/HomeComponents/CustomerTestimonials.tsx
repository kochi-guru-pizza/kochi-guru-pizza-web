"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

type Testimonial = {
  id: number;
  name: string;
  rating: number;
  review: string;
  date: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    rating: 5,
    review:
      "The best pizza in Kochi! The wood-fired crust is absolutely perfect, and the toppings are always fresh. My family and I order from here every weekend!",
    date: "2 weeks ago",
    image: "/assets/images/testimonials/customer1.jpg"
  },
  {
    id: 2,
    name: "Priya Menon",
    rating: 5,
    review:
      "Amazing taste and great service! The margherita pizza reminds me of authentic Italian pizzas. Highly recommend to everyone!",
    date: "1 month ago",
    image: "/assets/images/testimonials/customer2.jpg"
  },
  {
    id: 3,
    name: "Arjun Nair",
    rating: 5,
    review:
      "The quality is consistently excellent. Love their special pizza with unique toppings. The ambiance is also very cozy and welcoming.",
    date: "3 weeks ago",
    image: "/assets/images/testimonials/customer3.jpg"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    rating: 4,
    review:
      "Great pizza at reasonable prices. The crust is thin and crispy, just the way I like it. Will definitely come back for more!",
    date: "1 week ago",
    image: "/assets/images/testimonials/customer4.jpg"
  },
  {
    id: 5,
    name: "Mohammed Ali",
    rating: 5,
    review:
      "Fantastic experience! The staff is friendly, the pizza is delicious, and the atmosphere is perfect for family gatherings.",
    date: "2 months ago",
    image: "/assets/images/testimonials/customer5.jpg"
  }
];

export default function CustomerTestimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const totalReviews = 523;
  const averageRating = 4.8;

  return (
    <section className="py-20 md:py-24 bg-orange-50/30 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Don&apos;t just take our word for it - hear from our happy
            customers!
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(averageRating)
                        ? "fill-orange-500 text-orange-500"
                        : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {averageRating} / 5.0
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Average Rating
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-500">
                {totalReviews}+
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Happy Customers
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="embla__slide flex-[0_0_100%] min-w-0 px-4"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 relative border border-gray-100 dark:border-gray-700"
                  >
                    {/* Quote Icon */}
                    <Quote className="absolute top-6 right-6 w-12 h-12 text-orange-200 dark:text-orange-900/30" />

                    {/* Customer Info */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.date}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "fill-orange-500 text-orange-500"
                              : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                      &quot;{testimonial.review}&quot;
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:bg-orange-50 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-600"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:bg-orange-50 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-600"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "bg-orange-600 w-8"
                    : "bg-gray-300 dark:bg-gray-600 w-2 hover:bg-orange-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
