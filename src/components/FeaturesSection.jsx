"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const item1Ref = useRef(null);
  const item2Ref = useRef(null);
  const item3Ref = useRef(null);

  const features = [
    { icon: "/capture.svg", text: "Capture", color: "text-white", ref: item1Ref },
    { icon: "/contextualize.svg", text: "Contextualize", color: "text-white", ref: item2Ref },
    { icon: "/interpret.svg", text: "Interpret", color: "bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent", ref: item3Ref },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([item1Ref.current, item2Ref.current, item3Ref.current], {
        y: 100,
        opacity: 0,
        scale: 0.8,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center center",
          scrub: 1,
        },
      });

      tl.to(item1Ref.current, { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(2)" })
        .to(item2Ref.current, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(2.5)" }, "-=0.3")
        .to(item3Ref.current, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(2.5)" }, "-=0.3");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 md:py-40 overflow-hidden"
      style={{ backgroundColor: "#000D24" }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-16 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-12 md:gap-16">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={feature.ref}
              className="flex items-center gap-2 group cursor-default"
              style={{ transformOrigin: "center bottom" }}
            >
              {/* Icon with hover glow */}
              <div className="relative w-14 h-14 md:w-20 md:h-20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src={feature.icon}
                  alt={feature.text}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
              
              {/* Text with hover effect */}
              <span 
                className={`text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight ${feature.color} transition-all duration-500 group-hover:tracking-wide`}
                style={{ textShadow: index === 2 ? "none" : "0 0 40px rgba(255,255,255,0.1)" }}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
