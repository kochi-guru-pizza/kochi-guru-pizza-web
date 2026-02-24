"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type PromotionSlide = {
  imageUrl: string;
  tag: string;
  title: string;
  subtitle: string;
  discount: string;
  expires: string;
  badge: string;
};

const promotionSlides: PromotionSlide[] = [
  {
    imageUrl: "/assets/images/offers/independence-day-offer.jpg",
    tag: "Independence Day",
    title: "Celebrate Big",
    subtitle: "2 Large Pizzas + 2 Drinks — one unbeatable price for the nation's big day!",
    discount: "40% OFF",
    expires: "Today Only",
    badge: "LIMITED",
  },
  {
    imageUrl: "/assets/images/offers/offer-1.jpg",
    tag: "Tonight Only",
    title: "Late Night Feast",
    subtitle: "Free cheese roll with any large pizza ordered after 9PM. Hot & tasty, quick delivery!",
    discount: "FREE SIDES",
    expires: "11:59 PM",
    badge: "HOT",
  },
  {
    imageUrl: "/assets/images/offers/offer-2.jpg",
    tag: "Exclusive Deal",
    title: "Members Special",
    subtitle: "Only available at Kochi Guru Pizza. Flash savings on your favourite combos.",
    discount: "SAVE BIG",
    expires: "This Week",
    badge: "EXCLUSIVE",
  },
];

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <span className="text-5xl">🍕</span>
      <p className="font-heading text-gray-700 dark:text-gray-300 text-base text-center">
        No active offers right now
      </p>
      <p className="font-mono text-gray-400 dark:text-gray-500 text-xs text-center tracking-wider">
        Check back soon — deals drop every week
      </p>
    </div>
  );
}

function OfferCard({ slide }: { slide: PromotionSlide }) {
  return (
    <div className="relative w-full h-full">
      <div className="pointer-events-none absolute inset-0">
        {/* Light */}
        <div
          className="absolute inset-0 opacity-100 dark:opacity-0"
          style={{
            background:
              "radial-gradient(900px 420px at 20% 50%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.00) 60%)",
          }}
        />
        {/* Dark */}
        <div
          className="absolute inset-0 opacity-0 dark:opacity-100"
          style={{
            background:
              "radial-gradient(900px 420px at 20% 50%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.00) 62%)",
          }}
        />
      </div>
      <div className="relative grid grid-cols-12 h-full">
        {/* LEFT CONTENT */}
        <div className="col-span-12 md:col-span-5 flex items-center">
          <div className="w-full px-20 py-10">
            {/* Top chips row */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[0.6rem] font-black tracking-[0.18em] px-3 py-1 rounded bg-orange-600 text-white">
                {slide.badge}
              </span>
              <span className="font-mono text-[0.65rem] font-semibold tracking-wider uppercase text-orange-600">
                {slide.tag}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-heading text-gray-900 dark:text-white text-4xl font-bold leading-tight mb-3">
              {slide.title}
            </h3>

            {/* Subtitle */}
            <p className="text-gray-600 dark:text-gray-400 text-[0.95rem] leading-relaxed mb-7 max-w-[30rem]">
              {slide.subtitle}
            </p>

            {/* Discount */}
            <div className="font-heading text-5xl font-extrabold leading-none text-orange-600 mb-4">
              {slide.discount}
            </div>

            {/* Expiry */}
            <div className="flex items-center gap-2 mb-8">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.9)]" />
              <span className="font-mono text-[0.75rem] text-gray-500 dark:text-gray-400 tracking-wider">
                Expires: {slide.expires}
              </span>
            </div>

            {/* Button */}
            <a
              href="tel:0770776848"
              className="inline-flex items-center gap-2 w-fit px-7 py-3 rounded-lg font-bold text-[0.9rem] tracking-wider transition-colors duration-200 bg-orange-600 hover:bg-orange-700 text-white"
            >
              ORDER NOW →
            </a>
          </div>
        </div>

        {/* RIGHT FLYER */}
        <div className="col-span-12 md:col-span-7 flex items-center justify-end p-6">
          <img
            src={slide.imageUrl}
            alt={slide.title}
            draggable={false}
            className="h-full w-full object-contain object-right select-none rounded-lg"
            style={{ maxHeight: "410px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function PromotionsSection() {
  const slides = promotionSlides;
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (slides.length === 0) return;

    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, 4500);
  }, [slides.length]);

  useEffect(() => {
    startAuto();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAuto]);

  const handleClick = (i: number) => {
    setActive(i);
    startAuto();
  };

  const activeSlide = slides[active];

  return (
    <section className="py-20 md:py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Special Offers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Don&apos;t miss out on our exclusive deals and limited-time promotions
          </p>

        </div>

        {/* MAIN CARD */}
        <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="w-full" style={{ height: "450px" }}>
            {slides.length === 0 || !activeSlide ? (
              <EmptyState />
            ) : (
              <div className="w-full h-full kgp-offer-enter">
                <OfferCard key={active} slide={activeSlide} />
              </div>
            )}
          </div>
          {slides.length > 1 && (
            <div className="flex items-center justify-center gap-2 pb-5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleClick(i)}
                  aria-label={`Go to offer ${i + 1}`}
                  className={[
                    "rounded-full transition-all duration-300",
                    active === i ? "bg-orange-600" : "bg-gray-300 dark:bg-gray-600",
                  ].join(" ")}
                  style={{
                    width: "8px",
                    height: "8px",
                    boxShadow: active === i ? "0 0 10px rgba(234,88,12,0.5)" : "none",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes kgp-offer-enter {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .kgp-offer-enter { animation: kgp-offer-enter 320ms ease-out; }
      `}</style>
    </section>
  );
}