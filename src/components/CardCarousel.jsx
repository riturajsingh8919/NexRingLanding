"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const cards = [
  {
    id: 1,
    title: "Prescriptions",
    desc: "Personalized medications and peptides, prescribed by clinicians and delivered at discounted prices.",
    image: "/cards/1.png",
    color: "bg-emerald-50",
  },
  {
    id: 2,
    title: "Supplements",
    desc: "Expert-curated supplements tailored to your needs, quality-checked and priced better than marketplaces.",
    image: "/cards/2.png",
    color: "bg-orange-50",
  },
  {
    id: 3,
    title: "Add-on Testing",
    desc: "Advanced diagnostics to uncover deeper insights into gut health, toxin exposure, and long-term risk.",
    image: "/cards/3.png",
    color: "bg-blue-50",
  },
  {
    id: 4,
    title: "Answers 24/7",
    desc: "Get instant answers and ongoing support from your dedicated healthcare team, anytime you need it.",
    image: "/cards/4.png",
    color: "bg-purple-50",
  },
  {
    id: 5,
    title: "Nutrition",
    desc: "Personalized meal guidance and nutrition plans built around your labs, goals, and lifestyle.",
    image: "/cards/5.png",
    color: "bg-rose-50",
  },
];

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [breakpoint, setBreakpoint] = useState("desktop"); // desktop, tablet, mobile

  // Robust Breakpoint Detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setBreakpoint("desktop");
      } else if (width >= 768) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("mobile");
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Configuration based on breakpoint to ensure "3.5 cards" etc.
  const config = {
      desktop: { width: "26vw", gap: "2rem", items: 3.5 }, // 26vw * 3.5 + gaps ≈ 100vw roughly
      tablet: { width: "42vw", gap: "1.5rem", items: 2 },
      mobile: { width: "85vw", gap: "1rem", items: 1 },
  };

  const { width: cardWidth, gap: gapSize, items: itemsPerView } = config[breakpoint];

  const handleNext = () => {
    if (currentIndex < cards.length - Math.floor(itemsPerView)) {
       setCurrentIndex((prev) => prev + 1);
    } else {
       setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
       // Loop end
       setCurrentIndex(cards.length - Math.floor(itemsPerView));
    }
  };

  return (
    <section className="w-full py-24 bg-white flex flex-col relative overflow-hidden">
      
      {/* Header Container - Standard Alignment */}
      <div className="container mx-auto px-4 md:px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
         <div className="max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-medium text-slate-900 mb-4 tracking-tight whitespace-nowrap">
            Your Personalized Healthcare Plan
            </h2>
            <p className="text-lg text-slate-500 font-light">
            A care pathway, designed for you.
            </p>
         </div>
         
         {/* Navigation Arrows (Desktop) */}
         <div className="hidden md:flex gap-4">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
            >
             <FaChevronLeft className="text-sm" />
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20 cursor-pointer"
            >
             <FaChevronRight className="text-sm" />
            </button>
         </div>
      </div>

      {/* Carousel Container */}
      {/* We use 'pl-[...]' to align the start of the track with the container's content */}
      {/* Container horizontal padding is 1rem (px-4) or 1.5rem (px-6 md). */}
      {/* To align perfectly, we can just put it inside a container derived div or use calc padding. */}
      {/* Simpler: Use a wrapper with standard padding, then negative margin right. */}
      
      <div className="w-full relative px-4 md:px-6 mx-auto container overflow-visible">
          <div className="-mr-[200vw]"> {/* Allow overflow right */}
             <div 
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform"
                style={{ 
                   gap: gapSize,
                   // Translate using calc to handle mixed units (vw + rem)
                   transform: `translateX(calc(-${currentIndex} * (${cardWidth} + ${gapSize})))` 
                }}
             >
                {cards.map((card) => (
                    <div 
                        key={card.id} 
                        className="shrink-0 relative group"
                        style={{ width: cardWidth }} // Force explicit width based on viewport
                    >
                        {/* Card Inner */}
                        <div className="h-full bg-white rounded-4xl border-[3px] border-slate-100/80 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] group-hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] group-hover:-translate-y-2 transition-all duration-500 p-2 relative overflow-hidden cursor-pointer flex flex-col">
                            
                            {/* Image Part */}
                            <div className={`relative h-[280px] w-full ${card.color} rounded-3xl overflow-hidden shrink-0`}>
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                    sizes="30vw"
                                />
                                {/* Inner Gloss */}
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Text Part */}
                            <div className="p-6 md:p-8 grow flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-medium text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {card.title}
                                    </h3>
                                    <p className="text-slate-500 font-light leading-relaxed text-sm md:text-base">
                                    {card.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
          </div>
      </div>

     {/* Mobile Navigation (Bottom) */}
     <div className="container mx-auto px-4 md:px-6 flex md:hidden gap-4 mt-8">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 active:scale-95 cursor-pointer transition-all"
            >
             <FaChevronLeft />
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center active:scale-95 shadow-lg cursor-pointer transition-all"
            >
             <FaChevronRight />
            </button>
     </div>

    </section>
  );
};

export default CardCarousel;
