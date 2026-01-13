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
      // Ring Section
      gsap.set([ringTitleRef.current, ringSubtitleRef.current, ringButtonRef.current], {
        opacity: 0,
        y: 40,
      });
      gsap.set(ringRef.current, { 
        opacity: 0, 
        scale: 0.8 
      });
      
      // NxLabs Section (Hidden behind)
      gsap.set(nxLabsSectionRef.current, { 
        opacity: 0,
        zIndex: 0
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


      // 3. ZOOM & TRANSITION ANIMATION (Pinned sequence)
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=250%", // Longer distance for premium feel
          pin: true,
          scrub: 1, // Smooth interaction
        },
      });

      // Step 1: Fade out text, Zoom into ring
      mainTl
        .to(ringContentRef.current, { opacity: 0, y: -50, duration: 2 }, "start")
        .to(ringRef.current, { 
          scale: 30, // Big zoom
          duration: 5, 
          ease: "power2.inOut" 
        }, "start");

      // Step 2: Fade out Ring Section background (reveal NxLabs behind)
      // Starts halfway through the zoom for a portal effect
      mainTl.to(ringSectionRef.current, { 
        opacity: 0, 
        duration: 2,
        ease: "power1.inOut"
      }, "-=2.5"); // Overlap with end of zoom

      // Step 3: NxLabs appears and its content animates in
      // We ensure it becomes visible and on top as the ring fades
      mainTl.to(nxLabsSectionRef.current, {
        opacity: 1,
        zIndex: 20, // Bring to front
        duration: 0.1, // Instant switch of z-index essentially
      }, "-=2.5");

      // Step 4: NxLabs Content Entry (Parallax/Slide up)
      mainTl
        .to(nxLabsTitleRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 2,
          ease: "power2.out"
        }, "-=1")
        .to(nxLabsSubtitleRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 2,
          ease: "power2.out"
        }, "-=1.5");

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-screen overflow-hidden">
      
      {/* --- NxLabs Section (Behind initially) --- */}
      <section
        ref={nxLabsSectionRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
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


      {/* --- Ring Section (On Top initially) --- */}
      <section
        ref={ringSectionRef}
        className="absolute inset-0 z-10"
        style={{ backgroundColor: "#5646a3" }}
      >
        {/* Header Text */}
        <div ref={ringContentRef} className="absolute top-20 left-8 lg:left-16 z-20">
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
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div
            ref={ringRef}
            className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]"
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
