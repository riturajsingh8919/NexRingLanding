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
  const slide1InputsRef = useRef(null);
  const slide1ConnectorsRef = useRef(null);
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
          end: "+=120%", 
          pin: true,
          scrub: 1,
        },
      });

      tl.to(sectionRef.current, {
        x: "-100vw", 
        ease: "none",
      });

      // --- Slide 1: Reveal Animation ---
      const assembleTl = gsap.timeline({
        scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 60%",
            toggleActions: "play reverse play reverse"
        }
      });

      // 1. Inputs Fly In
      if (slide1InputsRef.current) {
         const items = slide1InputsRef.current.children;
         assembleTl.from(items, {
            y: 30,      
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
         }, 0);
      }
      
      // 2. Connectors Draw
      if (slide1ConnectorsRef.current) {
          assembleTl.from(slide1ConnectorsRef.current, {
              opacity: 0,
              scaleY: 0,
              transformOrigin: "top",
              duration: 0.8,
              ease: "power2.out"
          }, 0.5);
      }

      // 3. Bottom Card Entry
      if (brainContainerRef.current) {
         assembleTl.from(brainContainerRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
         }, 0.8);
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
        {/* ================= SLIDE 1: Interpret (Tree Visualization) ================= */}
        <div className="w-screen h-full flex flex-col relative bg-[#020B1C] pl-0 lg:pl-20">
          
          {/* Header - Flow layout to strictly prevent overlap */}
          <div className="w-full pt-20 md:pt-4 px-6 md:px-20 z-0">
             <h2 className="text-5xl lg:text-8xl text-white font-serif italic tracking-tight text-center md:text-left">
               Interpret
             </h2>
          </div>

          {/* Main Tree Container - Centered */}
          <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full px-4 pt-8 md:pt-0">
            
            {/* 1. TOP NODES ROW */}
            {/* 1. TOP NODES ROW - Using Grid for perfect alignment with connectors */}
            {/* 1. TOP NODES ROW - Using Grid for perfect alignment with connectors */}
            <div ref={slide1InputsRef} className="grid grid-cols-5 w-full max-w-5xl mx-auto gap-0 relative z-10 px-1 md:px-0">
               {[
                 { label: "Family History", icon: FaHistory, color: "bg-blue-400" },
                 { label: "Nutrition", icon: FaFileMedicalAlt, color: "bg-yellow-400" },
                 { label: "Exercise", icon: FaRunning, color: "bg-[#8B8B7A]" }, 
                 { label: "Sleep", icon: FaDna, color: "bg-orange-400" },
                 { label: "Past Labs", icon: FaFileMedicalAlt, color: "bg-pink-300" }
               ].map((item, i) => (
                 <div key={i} className="flex justify-center w-full px-1 md:px-2">
                   <div className="flex flex-col items-center w-full max-w-[140px] transition-transform hover:scale-105 duration-300 group">
                      <div className="bg-white p-2 md:p-3 lg:p-4 rounded-lg shadow-xl shadow-blue-900/10 border border-slate-100 w-full flex flex-col items-center gap-1 md:gap-3 h-16 md:h-24 lg:h-28 justify-center z-20 relative">
                          <div className={`w-5 h-5 md:w-8 md:h-8 rounded ${item.color} flex items-center justify-center text-white text-[10px] md:text-xs shadow-sm`}>
                            <item.icon />
                          </div>
                          <span className="text-[7px] md:text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-wider text-center leading-tight">{item.label}</span>
                      </div>
                   </div>
                 </div>
               ))}
            </div>

            {/* 2. CONNECTOR LINES (SVG Tree) */}
            {/* 2. CONNECTOR LINES (SVG Tree) */}
            {/* 2. CONNECTOR LINES (SVG Tree) */}
             <div ref={slide1ConnectorsRef} className="w-full max-w-5xl h-16 md:h-20 relative z-0 -mt-2">
               <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                 {/* Vertical Lines Down from centers of 5 cols: 10%, 30%, 50%, 70%, 90% */}
                 {[10, 30, 50, 70, 90].map((x, i) => (
                    <line key={i} x1={`${x}%`} y1="0" x2={`${x}%`} y2="50%" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                 ))}

                 {/* Horizontal Connector Line (from first vertical to last vertical) */}
                 <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />

                 {/* Vertical Line to Bottom Card (From Center) */}
                 <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                 
                 {/* Arrow Head */}
                 <path d="M 50%,100% l -5,-8 h 10 z" fill="rgba(255,255,255,0.6)" />
               </svg>
             </div>

            {/* 3. BOTTOM NODE (Metabolic Risk) */}
            <div ref={brainContainerRef} className="bg-white rounded-xl shadow-2xl p-4 md:p-6 w-[85vw] max-w-sm md:w-96 relative z-10 mx-auto">
               <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-red-50 rounded-lg flex items-center justify-center text-xl md:text-2xl">
                     liver
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-base md:text-lg leading-tight">Metabolic risk</h3>
                    <div className="text-[10px] font-bold text-orange-500 flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                      NEEDS ATTENTION
                    </div>
                  </div>
               </div>

               <p className="text-slate-600 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
                 Address early insulin resistance to prevent developing diabetes.
               </p>

               <div className="border-t border-slate-100 pt-3 md:pt-4">
                  <div className="flex justify-between items-center mb-2 md:mb-3">
                    <span className="text-[10px] md:text-xs font-semibold text-slate-500">What we assessed</span>
                    <span className="text-[10px] md:text-xs text-slate-400">^</span> 
                  </div>
                  
                  {/* Clinician Insights Box */}
                  <div className="bg-[#EEF2FF] rounded-lg p-3 border border-indigo-100 mb-4">
                     <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 rounded-full bg-slate-800 overflow-hidden relative">
                           {/* Add avatar placeholder or icon */}
                           <div className="absolute inset-0 bg-indigo-500/20"></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wide">Clinician Insights</span>
                     </div>
                     <p className="text-[10px] md:text-[11px] text-slate-600 leading-relaxed font-medium">
                       Your elevated <span className="font-bold border-b border-slate-300">HOMA-IR</span> levels, combined with being <span className="font-bold border-b border-slate-300">overweight</span> and having a <span className="font-bold border-b border-slate-300">family history</span> contributes to your risk.
                     </p>
                  </div>

                  {/* HOMA-IR Meter */}
                  <div className="bg-slate-50 rounded p-3 border border-slate-100/50">
                     <div className="flex justify-between items-baseline mb-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">HOMA-IR</span>
                         <span className="text-[10px] font-bold text-orange-500">HIGH</span>
                     </div>
                     <div className="text-2xl font-bold text-slate-800 tracking-tight">2.7</div>
                     <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/4 h-full bg-orange-400 rounded-r-full"></div>
                     </div>
                  </div>
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
