"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PromotionSlide = {
  imageUrl: string;
  heading: string;
  subtitle: string;
};

const promotionSlides: PromotionSlide[] = [
  {
    imageUrl: "/assets/images/offers/independence-day-offer.jpg",
    heading: "Independence Day Special",
    subtitle: "Celebrate with amazing deals!"
  },
  {
    imageUrl: "/assets/images/offers/offer-1.jpg",
    heading: "Limited Time Offer",
    subtitle: "Don't miss out on these incredible savings"
  },
  {
    imageUrl: "/assets/images/offers/offer-2.jpg",
    heading: "Exclusive Deals",
    subtitle: "Only available at Kochi Guru Pizza"
  }
];

export default function PromotionsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false })
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

  return (
    <section className="relative w-full py-16 bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      {/* Section Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Special Offers
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Don&apos;t miss out on our exclusive deals and limited-time promotions
        </p>
      </div>

      {/* Carousel */}
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {promotionSlides.map((slide, index) => (
              <div
                key={index}
                className="embla__slide relative flex-[0_0_100%] min-w-0"
              >
                {/* Blurred background layer */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={slide.imageUrl}
                    alt=""
                    fill
                    className="object-cover scale-110 blur-xl"
                  />
                  <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
                </div>

                {/* Foreground image (full visibility with object-fit: contain) */}
                <div className="relative w-full h-[50vh] md:h-[70vh] flex items-center justify-center">
                  <div className="relative w-full max-w-5xl h-full px-4">
                    <Image
                      src={slide.imageUrl}
                      alt={slide.heading}
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* Text overlay (optional) */}
                <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center text-center px-4">
                  <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                    {slide.heading}
                  </h2>
                  <p className="text-base md:text-xl text-white/90 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm transition-all"
          aria-label="Previous promotion"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm transition-all"
          aria-label="Next promotion"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {promotionSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to promotion ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
