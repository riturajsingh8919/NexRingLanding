"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const RingSection = () => {
  const wrapperRef = useRef(null);
  const ringSectionRef = useRef(null);
  const ringRef = useRef(null);
  const ringContentRef = useRef(null);
  const ringTitleRef = useRef(null);
  const ringSubtitleRef = useRef(null);
  // Separate refs for pricing elements to animate them out together
  const pricingRef = useRef(null);

  const nxLabsSectionRef = useRef(null);
  const nxLabsContentRef = useRef(null);
  const nxLabsTitleRef = useRef(null);
  const nxLabsSubtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial States
      // Ring Section (Top Layer)
      gsap.set([ringTitleRef.current, ringSubtitleRef.current, pricingRef.current], {
        opacity: 0,
        y: 40,
      });
      // Set initial scale for video container
      gsap.set(ringRef.current, { 
        opacity: 0, 
        scale: 0.8 
      });
      
      // NxLabs Section (Bottom Layer - Always there, just covered)
      gsap.set(nxLabsSectionRef.current, { 
        zIndex: 0,
        opacity: 1 
      });
      gsap.set([nxLabsTitleRef.current, nxLabsSubtitleRef.current], {
        opacity: 0,
        y: 50
      });

      // 2. RING ENTRY ANIMATION (When scrolling into view)
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });

      entryTl
        .to(ringRef.current, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" })
        .to(ringTitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.8")
        .to(ringSubtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(pricingRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");


      // 3. SEAMLESS ZOOM & REVEAL (Pinned sequence)
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=200%", // Optimized distance for premium feel
          pin: true,
          scrub: 1, 
        },
      });

      // Sequence:
      // 1. Zoom Video + Fade out Overlay Content (Title, Pricing)
      // 2. Fade out Ring Section Background (Revealing NxLabs)
      // 3. Animate NxLabs Content
      
      mainTl
        // Start: Fade out text & Pricing (faster)
        .to([ringContentRef.current, pricingRef.current], { 
            opacity: 0, 
            y: -50, 
            duration: 1.5, 
            ease: "power2.in" 
        }, "start")
        
        // Massive Zoom to "go through" the video/ring
        .to(ringRef.current, { 
          scale: 60, 
          opacity: 0, // Fade out at very end
          duration: 4, 
          ease: "power2.inOut" 
        }, "start")

        // Fade out the BLACK background wrapper to reveal NxLabs
        .to(ringSectionRef.current, { 
          opacity: 0, 
          duration: 2.5,
          ease: "power1.inOut"
        }, "-=2.5") // Overlap significantly with zoom

        // NxLabs Text Entry (Parallax effect)
        .to([nxLabsTitleRef.current, nxLabsSubtitleRef.current], { 
          opacity: 1, 
          y: 0, 
          duration: 2,
          stagger: 0.2,
          ease: "power2.out"
        }, "-=2"); // Start coming in as ring fades out

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-screen overflow-hidden bg-black">
      
      {/* --- NxLabs Section (Bottom Layer - Fixed z-0) --- */}
      <section
        ref={nxLabsSectionRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-0"
        style={{ backgroundColor: "#000D24" }}
      >
        {/* Abstract SVG Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
           <div className="relative w-full h-full max-w-6xl">
            <Image
              src="/abstract.svg"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div ref={nxLabsContentRef} className="absolute bottom-20 md:bottom-32 left-0 right-0 text-center px-4 z-10">
          <h2 
            ref={nxLabsTitleRef}
            className="text-5xl md:text-6xl lg:text-8xl font-medium text-white mb-6 tracking-tight"
          >
            NxLabs
          </h2>
          <p 
            ref={nxLabsSubtitleRef}
            className="text-lg md:text-xl lg:text-5xl font-extralight text-white/80"
          >
            Contextualize with 150+ biomarkers. Predict 1000+ conditions
          </p>
        </div>
      </section>


      {/* --- Ring Section (Top Layer - z-10) --- */}
      <section
        ref={ringSectionRef}
        className="absolute inset-0 z-10 pointer-events-none bg-black"
      >
         {/* Top Left Content */}
        <div ref={ringContentRef} className="absolute top-8 left-6 md:top-12 md:left-12 lg:top-16 lg:left-16 z-20 pointer-events-auto max-w-[50%] md:max-w-none">
          <h2 ref={ringTitleRef} className="text-3xl md:text-5xl lg:text-7xl text-white mb-2 font-light tracking-tight leading-tight">
            <span className="font-serif italic mr-2 md:mr-3 font-normal">Capture</span>
             with NxRing
          </h2>
          <p ref={ringSubtitleRef} className="text-xs md:text-base text-white/60 font-light tracking-wide pl-1">
            Your daily vitals monitored 24/7
          </p>
        </div>

        {/* Top Right Pricing */}
        <div ref={pricingRef} className="absolute top-8 right-6 md:top-12 md:right-12 lg:top-16 lg:right-16 z-20 pointer-events-auto text-right">
           <div className="flex flex-col items-end">
             <span className="text-white/50 text-xl md:text-3xl lg:text-4xl font-light line-through decoration-white/50 decoration-1">
                $299
             </span>
             <span className="text-white text-4xl md:text-6xl lg:text-8xl font-serif italic my-0 md:my-1 font-thin">
                $199
             </span>
             <button className="text-white text-xs md:text-sm lg:text-xl font-serif font-medium italic mt-1 md:mt-2 hover:opacity-80 transition-opacity tracking-widest opacity-90">
                Order Now
             </button>
           </div>
        </div>

        {/* Ring Video */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div
            ref={ringRef}
            className="relative w-[80vw] h-[50vh] md:w-[60vw] md:h-[60vh] lg:w-[45vw] lg:h-[70vh] will-change-transform" // Responsive sizing using vw/vh
            style={{ transformOrigin: "center center" }}
          >
             <video
              className="w-full h-full object-contain"
              autoPlay
              loop
              muted
              playsInline
              src="/ring.mp4" 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RingSection;
