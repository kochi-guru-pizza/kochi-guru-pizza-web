// src/components/HomeComponents/CustomerTestimonials.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
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
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Hafran Lafeer",
    rating: 5,
    review:
      "Hands down one of the best pizza Ive had in sooo long. Would highly recommend this spot !!!",
    date: "4 months ago"
  },
  {
    id: 2,
    name: "Himashi Perera",
    rating: 5,
    review:
      "Food was really tasty and fresh and the service was friendly, nice place to relax and enjoy a good meal",
    date: "4 month ago"
  },
  {
    id: 3,
    name: "Achini Jayashani",
    rating: 5,
    review:
      "The pizza here is top quality. great balance of sauce, cheese, and toppings. You can really taste the freshness. Highly recommended the place kochi guru. ❤️❤️❤️ Definetly i'll try again.",
    date: "7 months ago"
  },
  {
    id: 4,
    name: "O.A. Sandaruwan",
    rating: 5,
    review:
      "I had one of the best pizzas in Sri Lanka 🇱🇰 at Kochi Guru. It was absolutely delicious and reminded me of the authentic pizza I enjoyed in Turkey 🇹🇷. My wife loved it too! The flavors, quality, and freshness were outstanding. We highly recommend it to anyone looking for a great pizza experience.",
    date: "2 weeks ago"
  },
  {
    id: 5,
    name: "Pramodya Jayarathna",
    rating: 5,
    review:
      "The pizza was fresh & hot. The crust was perfectly baked, and the service was quite fast. The owner was friendly and the atmosphere was clean and welcoming. Highly recommended",
    date: "3 months ago"
  },
  {
    id: 6,
    name: "Avishka Hasaranga",
    rating: 5,
    review:
      "Kochi Guru Pizza is the best place to eat delicious pizza with confidence.❤️ Highy recommended😌❤️",
    date: "a month ago"
  },
  {
    id: 7,
    name: "Raveesha Jayasekara",
    rating: 5,
    review:
      "I was not able to visit them but only to ask them to deliver if they can. They had not started delivery services but made it happen anyways. They delivered hot pizzas at my doorstep with such diligence and care. Taste is excellent and I would order again.",
    date: "7 months ago"
  }
];

export default function CustomerTestimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
    const onInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("init", onInit);
    onInit();
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("init", onInit);
    };
  }, [emblaApi]);

  const totalReviews = 523;
  const averageRating = 5;

  return (
    <section className="py-16 bg-orange-50/30 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 gpu-fix"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            What Our Customers Say
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6">
            Don&apos;t just take our word for it — hear from our happy
            customers!
          </p>

          {/* Stats Row */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white dark:bg-gray-800 rounded-2xl px-6 py-4 sm:py-3 shadow-sm border border-gray-100 dark:border-gray-700 max-w-full">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(averageRating)
                        ? "fill-orange-500 text-orange-500"
                        : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-gray-900 dark:text-white text-sm">
                {averageRating.toFixed(1)}/5.0
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Average
              </span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-gray-200 dark:bg-gray-600" />
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-orange-600 dark:text-orange-500 text-sm">
                {totalReviews}+
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Happy Customers
              </span>
            </div>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative px-8 md:px-10">
          <div className="overflow-hidden -my-3 py-3" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={testimonial.id}
                  className="w-full shrink-0 pl-4 sm:w-1/2 lg:w-1/3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-smooth duration-300 p-6 border border-gray-100 dark:border-gray-700 h-full flex flex-col relative gpu-fix"
                  >
                    {/* Quote Icon */}
                    <Quote className="absolute top-4 right-4 w-8 h-8 text-orange-100 dark:text-orange-900/40" />

                    {/* Customer Info */}
                    <div className="flex items-center mb-4">
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white leading-tight">
                          {testimonial.name}
                        </h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {testimonial.date}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-0.5 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "fill-orange-500 text-orange-500"
                              : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
                      &ldquo;{testimonial.review}&rdquo;
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-0 md:-translate-x-5 z-10 p-2 rounded-full! bg-white dark:bg-gray-800 shadow-md hover:shadow-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-600 hidden md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-0 md:translate-x-5 z-10 p-2 rounded-full! bg-white dark:bg-gray-800 shadow-md hover:shadow-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-600 hidden md:block"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-1.5 mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === selectedIndex
                  ? "bg-orange-600 w-6"
                  : "bg-gray-300 dark:bg-gray-600 w-1.5 hover:bg-orange-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
