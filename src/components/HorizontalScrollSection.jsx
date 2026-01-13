"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaDna, FaFileMedicalAlt, FaRunning, FaHistory } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HorizontalScrollSection = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  // Slide 1 Refs
  const brainRef = useRef(null);
  const slide1InputsRef = useRef(null);
  const brainRingRef = useRef(null);
  const brainContainerRef = useRef(null);

  // Slide 2 Refs
  const flowLinesRef = useRef(null);
  // Connections Mapping for Slide 2
  const connections = [
    { start: 0, ends: [0, 1, 3] }, // Sleep -> Cortisol, HbA1c, Magnesium
    { start: 1, ends: [1, 4, 6] }, // HRV -> HbA1c, Hs-CRP, Haemoglobin
    { start: 2, ends: [2, 3, 5] }, // RHR -> Iron, Magnesium, Vitamin D
    { start: 3, ends: [4, 7] },    // Steps -> Hs-CRP, Insulin
    { start: 4, ends: [6, 8] },    // Active -> Haemoglobin, RBC
    { start: 5, ends: [1, 7, 8] }, // Glucose -> HbA1c, Insulin, RBC
    { start: 6, ends: [5, 9] },    // Oxygen -> Vitamin D, TSH
    { start: 7, ends: [0, 9] },    // VO2 -> Cortisol, TSH
  ];

  useEffect(() => {
    if (!triggerRef.current) return;

    const ctx = gsap.context(() => {
      // Horizontal Scroll Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=150%", // Reduced from 200% to minimize scroll gap feeling
          pin: true,
          scrub: 1,
        },
      });

      tl.to(sectionRef.current, {
        x: "-50vw", // Move left by 50vw (since we showing 2 slides in 150vw container effectively? No, let's keep logic simple)
        // If we want Slide 2 to be closer, we can keep width 200vw but just scroll faster.
        // User asked to reduce gap *between* them. 
        // Let's bring Slide 2 closer physically by making container narrower or adjusting layout.
        // Actually, reducing 'end' makes scroll faster. 
        // To reduce visual gap, we can reduce width to 180vw and have them closer.
        x: "-100vw", // Standard scroll to next slide
        ease: "none",
      });

      // --- Slide 1 Animations ---
      
      // 1. Inputs Stagger Entry
      // 1. Inputs Stagger Entry
      if (slide1InputsRef.current) {
         gsap.fromTo(slide1InputsRef.current.children, 
           { y: 50, opacity: 0, scale: 0.8 },
           {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              stagger: 0.1,
              ease: "back.out(1.7)", // Premium pop effect
              scrollTrigger: {
                 trigger: triggerRef.current,
                 start: "top center", // Start animating when section is near center
                 toggleActions: "play reverse play reverse",
              }
           }
         );
      }

      // 2. Pulse effect for the brain (Inner)
      if (brainRef.current) {
        gsap.to(brainRef.current, {
          scale: 1.05,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      
      // 3. Floating Brain Container
      if (brainContainerRef.current) {
        gsap.to(brainContainerRef.current, {
           y: -15,
           duration: 3,
           repeat: -1,
           yoyo: true,
           ease: "sine.inOut",
           delay: 0.5 
        });
      }

      // 4. Ring Spin
      if (brainRingRef.current) {
        gsap.to(brainRingRef.current, {
           rotation: 360,
           duration: 20,
           repeat: -1,
           ease: "none"
        });
      }

      // --- Slide 2 Animations ---
      // Animate lines drawing in
      if (flowLinesRef.current) {
         gsap.fromTo(flowLinesRef.current.querySelectorAll('path'), 
          { strokeDasharray: 2000, strokeDashoffset: 2000 },
          {
            strokeDashoffset: 0,
            duration: 2.5,
            ease: "power2.inOut",
            stagger: 0.05,
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top top", 
              end: "+=150%", 
              scrub: 1,
            }
          }
        );
      }

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const slide1Icons = [
    { icon: FaFileMedicalAlt, text: "Blood tests", color: "text-emerald-500", top: "10%", left: "10%" },
    { icon: FaDna, text: "DNA report", color: "text-emerald-500", top: "10%", right: "10%" },
    { icon: FaRunning, text: "Fitness tracker", color: "text-emerald-500", bottom: "10%", left: "10%" },
    { icon: FaHistory, text: "Health history", color: "text-emerald-500", bottom: "10%", right: "10%" },
  ];

  const lifestyleMarkers = ["Sleep Hours/ Sleep Efficiency", "HRV", "RHR", "Steps Density", "Active Hours", "Fasting Glucose Spike", "Nocturnal Oxygen Saturation", "VO2"];
  const bloodMarkers = ["Serum Cortisol", "HbA1c", "Iron", "Magnesium", "Hs-CRP", "Vitamin D", "Haemoglobin", "Fasting Insulin", "RBC count", "TSH"];

  return (
    <div ref={triggerRef} className="relative h-screen overflow-hidden bg-white">
      <div
        ref={sectionRef}
        className="flex h-full w-[200vw]"
      >
        {/* SLIDE 1: AI Interpretation */}
        <div className="w-screen h-full flex flex-col items-center justify-center relative" style={{ backgroundColor: "#020B1C" }}>
          
          {/* Header */}
          <div className="absolute top-16 md:top-24 left-0 right-0 text-center px-4 z-20">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium text-white mb-4">
              Interpreting Health Data with AI
            </h2>
            <p className="text-lg md:text-xl text-gray-400">
              Proprietary model giving you clarity intelligently
            </p>
          </div>

          {/* Diagram Container - Centered Vertically */}
          <div className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-20 px-8">
            
            {/* Left Box: Input Sources (2x2 Grid) */}
            <div ref={slide1InputsRef} className="grid grid-cols-2 gap-6 z-10">
               {slide1Icons.map((item, i) => (
                 <div key={i} className="flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-white/5 backdrop-blur-md border border-white/10 rounded-full md:rounded-3xl shadow-lg hover:bg-white/10 transition-all duration-500 group cursor-pointer hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:-translate-y-2">
                   <div className="mb-3 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                     <item.icon className="text-3xl md:text-4xl" />
                   </div>
                   <span className="text-white text-xs md:text-sm font-medium tracking-wide text-center px-2">{item.text}</span>
                 </div>
               ))}
            </div>

            {/* Middle: Connecting Arrow/Flow */}
            <div className="hidden md:flex flex-1 items-center justify-center relative h-20 px-4">
               {/* Animated Path */}
               <svg className="w-full h-full overflow-visible">
                 <path 
                   d="M 0,20 L 300,20" 
                   fill="none" 
                   stroke="url(#flowGradient)" 
                   strokeWidth="2" 
                   className="opacity-50"
                 />
                 <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                        <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
                    </linearGradient>
                 </defs>
                 {/* Moving Particles simulated via CSS or SVG animate */}
                 <circle r="4" fill="#34d399">
                    <animateMotion 
                        dur="2s" 
                        repeatCount="indefinite" 
                        path="M 0,20 L 300,20" 
                        keyPoints="0;1"
                        keyTimes="0;1"
                        calcMode="linear"
                    />
                 </circle>
                  {/* Arrow Head */}
                  <polygon points="300,10 320,20 300,30" fill="#10b981" />
               </svg>
            </div>

            {/* Right Box: AI Brain */}
            <div ref={brainContainerRef} className="relative z-10 shrink-0">
               {/* Glow Effects */}
               <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full"></div>
               
               <div ref={brainRef} className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-linear-to-br from-emerald-900/90 to-black border border-emerald-500/50 flex flex-col items-center justify-center relative shadow-[0_0_50px_rgba(16,185,129,0.4)] backdrop-blur-xl group">
                  {/* Brain Icon */}
                  <div className="text-6xl md:text-8xl mb-2 filter drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]">
                    🧠
                  </div>
                  <div className="text-white font-bold text-2xl md:text-3xl tracking-tighter">AI</div>
                  <div className="text-emerald-400 text-xs md:text-sm tracking-[0.3em] font-medium">ENGINE</div>
                  
                  {/* Orbiting Ring */}
                  <div ref={brainRingRef} className="absolute inset-0 rounded-full border border-emerald-500/30 border-dashed pointer-events-none"></div>
               </div>
            </div>

          </div>
        </div>


        {/* SLIDE 2: Data Connections */}
        <div className="w-screen h-full flex items-center justify-center relative" style={{ backgroundColor: "#020B1C" }}>
          <div className="container mx-auto px-4 h-full flex flex-col justify-center max-w-4xl">
            
            {/* Spacer/Header Area */}
            <div className="h-16 md:h-24"></div>
            
            {/* Headers - Fixed to top corners of the content area */}
            <div className="flex justify-between w-full mb-8 md:mb-12 px-8 border-b border-white/5 pb-4">
              <h3 className="text-white text-sm md:text-base tracking-[0.3em] font-light uppercase">Lifestyle Markers</h3>
              <h3 className="text-white text-sm md:text-base tracking-[0.3em] font-light uppercase text-right">Blood Markers</h3>
            </div>

            {/* Diagram Container */}
            <div className="relative flex w-full h-[60vh] md:h-[70vh]">
              
              {/* Left Column (Lifestyle) - 8 Items */}
              <div className="flex flex-col h-full z-10 w-auto shrink-0 pr-8 justify-between py-4">
                {lifestyleMarkers.map((text, i) => (
                  <div key={i} className="text-white text-xs md:text-sm font-light text-left whitespace-nowrap flex items-center relative h-6">
                    {text}
                  </div>
                ))}
              </div>

               {/* Center Lines SVG - Fills remaining space */}
               <div ref={flowLinesRef} className="flex-1 relative h-full pointer-events-none z-0">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="treeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                      </linearGradient>
                      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                     {/* Render Connections */}
                     {connections.map((conn, i) => (
                       <g key={i}>
                         {conn.ends.map((endIdx, j) => {
                           // Logic: justify-between with py-4 (16px approx 2.6% of 600)
                           // We map the centers of the text items.
                           // Total height = 600.
                           // Left 8 items: Spaced from top to bottom.
                           // startY = padding + (i / (total-1)) * (availableHeight) + halfTextHeight
                           
                           // Using simpler percentile mapping since justify-between spreads them evenly 0% to 100% of the content box.
                           // The container has py-4. SVG is full height.
                           // Let's assume text centers are at:
                           // Top item: y = 24 (approx padding + half text)
                           // Bottom item: y = 600 - 24
                           
                           const safeTop = 24;
                           const safeBottom = 600 - 24;
                           const availableH = safeBottom - safeTop;
                           
                           const startY = safeTop + (conn.start / 7) * availableH;
                           const endY = safeTop + (endIdx / 9) * availableH;

                           const startX = 0; 
                           const endX = 400;

                           const cp1X = startX + 150; 
                           const cp2X = endX - 150;

                           return (
                             <path
                               key={`${i}-${j}`}
                               d={`M ${startX} ${startY} C ${cp1X} ${startY}, ${cp2X} ${endY}, ${endX} ${endY}`}
                               fill="none"
                               stroke="url(#treeGradient)"
                               strokeWidth="1.5"
                               className="opacity-60"
                             />
                           );
                         })}
                         {/* Start Dot */}
                         <circle 
                            cx="0" 
                            cy={24 + (conn.start / 7) * (600 - 48)} 
                            r="4" 
                            fill="#3b82f6"
                            filter="url(#glow)"
                         />
                       </g>
                     ))}
                     
                     {/* End Dots */}
                     {Array.from({ length: 10 }).map((_, idx) => {
                        const y = 24 + (idx / 9) * (600 - 48);
                        return (
                          <circle 
                            key={idx}
                            cx="400" 
                            cy={y} 
                            r="4" 
                            fill="#60a5fa"
                            filter="url(#glow)"
                            className="opacity-80"
                          />
                        )
                     })}
                  </svg>
               </div>


              {/* Right Column (Blood) - 10 Items */}
              <div className="flex flex-col h-full z-10 w-auto shrink-0 items-end pl-8 justify-between py-4">
                {bloodMarkers.map((text, i) => (
                  <div key={i} className="text-white text-xs md:text-sm font-light text-right whitespace-nowrap flex items-center justify-end h-6">
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HorizontalScrollSection;
