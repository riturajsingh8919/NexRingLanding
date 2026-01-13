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
  const ringButtonRef = useRef(null);

  const nxLabsSectionRef = useRef(null);
  const nxLabsContentRef = useRef(null);
  const nxLabsTitleRef = useRef(null);
  const nxLabsSubtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial States
      // Ring Section (Top Layer)
      gsap.set([ringTitleRef.current, ringSubtitleRef.current, ringButtonRef.current], {
        opacity: 0,
        y: 40,
      });
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
        .to(ringButtonRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");


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
      // 1. Zoom Ring + Fade out Ring Content
      // 2. Fade out Ring Section Background (Revealing NxLabs)
      // 3. Animate NxLabs Content
      
      mainTl
        // Start: Fade out text (faster) & Zoom Ring
        .to([ringContentRef.current, ringTitleRef.current, ringSubtitleRef.current, ringButtonRef.current], { 
            opacity: 0, 
            y: -50, 
            duration: 1.5, 
            ease: "power2.in" 
        }, "start")
        
        // Massive Zoom to "go through" the ring
        .to(ringRef.current, { 
          scale: 60, 
          opacity: 0, // Fade ring out at the very end of zoom to avoid pixelation
          duration: 4, 
          ease: "power2.inOut" 
        }, "start")

        // Fade out the PURPLE background wrapper to reveal NxLabs
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
            className="text-5xl md:text-6xl lg:text-8xl font-medium text-white mb-6  tracking-tight"
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
        className="absolute inset-0 z-10 pointer-events-none" // pointer-events-none to let scroll pass through if needed, but we have content
        style={{ backgroundColor: "#5646a3" }}
      >
         {/* Allow interactions on content */}
        <div ref={ringContentRef} className="absolute top-20 left-8 lg:left-16 z-20 pointer-events-auto">
          <h2 ref={ringTitleRef} className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3">
            Introducing NxRing
          </h2>
          <p ref={ringSubtitleRef} className="text-base md:text-lg text-white/70 mb-6">
            Passive Health Tracking Captured 24/7
          </p>
          <button ref={ringButtonRef} className="px-6 py-2.5 rounded-full border border-white/40 text-white text-sm hover:bg-white/10 transition-colors cursor-pointer">
            Learn More
          </button>
        </div>

        {/* Ring Image */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div
            ref={ringRef}
            className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[950px] lg:h-[950px]"
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src="/ring.svg"
              alt="NxRing"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RingSection;
