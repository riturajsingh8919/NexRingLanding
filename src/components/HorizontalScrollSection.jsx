"use client";

import React, { useEffect, useRef } from "react";
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
  const slide1PathRef = useRef(null);

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
          end: "+=120%", 
          pin: true,
          scrub: 1,
        },
      });

      tl.to(sectionRef.current, {
        x: "-100vw", 
        ease: "none",
      });

      // --- Slide 1: Premium "Assemble" Animation ---
      const assembleTl = gsap.timeline({
        scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 60%",
            toggleActions: "play reverse play reverse"
        }
      });

      // 1. Inputs Fly In (Premium Assemble)
      if (slide1InputsRef.current) {
         const items = slide1InputsRef.current.children;
         assembleTl.from(items, {
            y: 40,      
            opacity: 0,
            scale: 0.8,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out", // Smooth, premium feel
         }, 0);
      }

      // 2. Brain Spin-Up & Scale (Assemble Core)
      if (brainContainerRef.current) {
         assembleTl.from(brainContainerRef.current, {
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
         }, 0.2);
      }

      // 3. Connections Line Growth
      if (slide1PathRef.current) {
          assembleTl.from(slide1PathRef.current, {
              strokeDasharray: 300,
              strokeDashoffset: 300,
              duration: 1.5,
              ease: "power2.out"
          }, 0.5);
      }
      
      // Continuous Animations (Brain Pulse & Float)
      if (brainRef.current) {
        gsap.to(brainRef.current, {
          scale: 1.05,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (brainContainerRef.current) {
        gsap.to(brainContainerRef.current, {
           y: -20,
           duration: 4,
           repeat: -1,
           yoyo: true,
           ease: "sine.inOut",
           delay: 1.5 
        });
      }
      if (brainRingRef.current) {
        gsap.to(brainRingRef.current, {
           rotation: 360,
           duration: 30,
           repeat: -1,
           ease: "none"
        });
      }

      // --- Slide 2: Data Lines Animation ---
      if (flowLinesRef.current) {
         gsap.fromTo(flowLinesRef.current.querySelectorAll('path'), 
          { strokeDasharray: 5000, strokeDashoffset: 5000, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1, 
            duration: 1.5,
            ease: "power2.out",
            stagger: 0.03,
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top top", 
              end: "+=130%", 
              scrub: 1,
            }
          }
        );
      }

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const slide1Icons = [
    { icon: FaFileMedicalAlt, text: "Blood tests" },
    { icon: FaDna, text: "DNA report" },
    { icon: FaRunning, text: "Fitness tracker" },
    { icon: FaHistory, text: "Health history" },
  ];

  const lifestyleMarkers = ["Sleep", "HRV", "RHR", "Steps", "Active", "Glucose", "Oxygen", "VO2"];
  const bloodMarkers = ["Cortisol", "HbA1c", "Iron", "Magnesium", "Hs-CRP", "Vit D", "Haemo", "Insulin", "RBC", "TSH"];

  // Deterministic Alignment Constants
  // Using relative units for SVG to ensure perfect scaling
  const TOTAL_ROWS = Math.max(lifestyleMarkers.length, bloodMarkers.length); 
  const ROW_PCT = 100 / TOTAL_ROWS;

  return (
    <div ref={triggerRef} className="relative h-screen overflow-hidden bg-white">
      <div
        ref={sectionRef}
        className="flex h-full w-[200vw]"
      >
        {/* ================= SLIDE 1: AI Interpretation (Assembly) ================= */}
        <div className="w-screen h-full flex flex-col relative bg-[#020B1C]">
          
          {/* Header Area */}
          <div className="w-full pt-12 md:pt-24 flex flex-col justify-end items-center md:items-start md:pl-[15vw] px-6 z-20 shrink-0 pb-8">
             <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-2 md:mb-4 tracking-tight">
                AI Health Intelligence
                </h2>
                <p className="text-base md:text-xl text-emerald-400/80 font-light tracking-wide">
                assembling your biological profile
                </p>
             </div>
          </div>

          {/* Visualization Container */}
          <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-center md:justify-start md:pl-[20vw] gap-8 md:gap-32 relative z-10 pb-12">
            
            {/* 1. Input Sources Grid */}
            <div ref={slide1InputsRef} className="grid grid-cols-2 gap-4 md:gap-8 relative">
               {slide1Icons.map((item, i) => (
                 <div key={i} className="flex flex-col items-center justify-center w-28 h-28 md:w-40 md:h-40 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-3xl shadow-lg hover:bg-white/10 transition-colors duration-300 group cursor-default">
                   <div className="mb-2 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                     <item.icon className="text-2xl md:text-4xl" />
                   </div>
                   <span className="text-white text-[10px] md:text-sm font-medium tracking-wide text-center px-2 opacity-80">{item.text}</span>
                 </div>
               ))}
               
               {/* Mobile Connection Line */}
               <div className="absolute left-1/2 top-full h-8 w-0.5 bg-linear-to-b from-emerald-500/50 to-transparent md:hidden" />
            </div>

            {/* 2. Connection Arrow (Desktop Only) */}
            <div className="hidden md:flex items-center w-40 relative opacity-60">
                <svg className="w-full h-24 overflow-visible">
                    <path 
                        ref={slide1PathRef}
                        d="M 0,40 L 150,40" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                        strokeDasharray="150" 
                    />
                    <polygon points="150,35 160,40 150,45" fill="#10b981" />
                </svg>
            </div>

            {/* 3. The Brain (Assembly Core) */}
            <div ref={brainContainerRef} className="relative z-10 origin-center">
               <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full scale-150 animate-pulse"></div>
               <div ref={brainRef} className="w-40 h-40 md:w-72 md:h-72 rounded-full bg-linear-to-br from-emerald-900 via-black to-emerald-950 border border-emerald-500/30 flex flex-col items-center justify-center relative shadow-[0_0_80px_rgba(16,185,129,0.3)] backdrop-blur-xl">
                  <div className="text-5xl md:text-8xl mb-4 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-pulse">
                    🧠
                  </div>
                  <div className="text-white font-bold text-lg md:text-3xl tracking-tighter">AI ENGINE</div>
                  <div ref={brainRingRef} className="absolute inset-[-12px] md:inset-[-24px] rounded-full border border-emerald-500/20 border-dashed pointer-events-none"></div>
                  <div className="absolute inset-[-4px] md:inset-[-8px] rounded-full border border-white/5 pointer-events-none"></div>
               </div>
            </div>

          </div>
        </div>


        {/* ================= SLIDE 2: Data Connections (Tree) ================= */}
        <div className="w-screen h-full flex flex-col relative bg-[#020B1C]">
            
            {/* Main Content Area: Centered, Max Width */}
            <div className="w-full max-w-6xl mx-auto h-full px-6 flex flex-col justify-center">

                {/* 1. Header Row (Normal UI, Not Sticky) */}
                <div className="flex w-full items-end mb-4 md:mb-6">
                    {/* Left Header */}
                    <div className="w-32 md:w-48 text-right pr-4">
                       <h3 className="text-white text-[10px] md:text-sm tracking-[0.2em] font-light uppercase opacity-50">Inputs</h3>
                    </div>
                    {/* Middle Spacer */}
                    <div className="flex-1"></div>
                    {/* Right Header */}
                     <div className="w-32 md:w-48 text-left pl-4">
                       <h3 className="text-white text-[10px] md:text-sm tracking-[0.2em] font-light uppercase opacity-50">Biomarkers</h3>
                    </div>
                </div>

                {/* 2. Connection Diagram */}
                <div className="flex w-full h-[75vh]"> 
                    {/* Left Column (Inputs) */}
                    <div className="flex flex-col h-full z-10 w-24 md:w-48 shrink-0">
                    {lifestyleMarkers.map((text, i) => (
                        <div key={i} className="flex items-center justify-end pr-4 text-slate-300 text-[11px] md:text-sm font-light whitespace-nowrap" style={{ height: `${ROW_PCT}%` }}>
                        {text}
                        </div>
                    ))}
                    </div>

                    {/* Center SVG Lines */}
                    <div ref={flowLinesRef} className="flex-1 relative h-full pointer-events-none z-0 mx-8 md:mx-16">
                        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {/* Render Connections */}
                            {connections.map((conn, i) => (
                            <g key={i}>
                                {conn.ends.map((endIdx, j) => {
                                const startY = (conn.start * ROW_PCT) + (ROW_PCT / 2);
                                const endY = (endIdx * ROW_PCT) + (ROW_PCT / 2);
                                
                                return (
                                    <path
                                    key={`${i}-${j}`}
                                    d={`M 0,${startY} C 50,${startY}, 50,${endY}, 100,${endY}`}
                                    fill="none"
                                    stroke="#3b82f6" 
                                    strokeWidth="1.5" 
                                    vectorEffect="non-scaling-stroke"
                                    className="opacity-80"
                                    />
                                );
                                })}
                                {/* Start Dots */}
                                <circle 
                                cx="0" 
                                cy={(conn.start * ROW_PCT) + (ROW_PCT / 2)} 
                                r="2" 
                                fill="#3b82f6"
                                />
                            </g>
                            ))}
                            
                            {/* End Dots */}
                            {bloodMarkers.map((_, idx) => {
                            const y = (idx * ROW_PCT) + (ROW_PCT / 2);
                            return (
                                <circle 
                                key={idx}
                                cx="100" 
                                cy={y} 
                                r="2" 
                                fill="#10b981"
                                />
                            )
                            })}
                        </svg>
                    </div>

                    {/* Right Column (Outputs) */}
                    <div className="flex flex-col h-full z-10 w-24 md:w-48 shrink-0">
                    {bloodMarkers.map((text, i) => (
                        <div key={i} className="flex items-center pl-4 text-emerald-300 text-[11px] md:text-sm font-light whitespace-nowrap" style={{ height: `${ROW_PCT}%` }}>
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
