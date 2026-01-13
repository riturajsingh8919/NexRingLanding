"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);
    const waveBackRef = useRef(null);
    const waveMidRef = useRef(null);
    const waveFrontRef = useRef(null);
    const logoRef = useRef(null);
    const bottomContentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // --- Liquid Animation (Continuous) ---
            // Wave 1 (Back) - Slow, deepest color
            gsap.to(waveBackRef.current, {
                x: "-50%",
                duration: 20,
                repeat: -1,
                ease: "linear",
            });
            gsap.to(waveBackRef.current, {
                y: 15,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // Wave 2 (Mid) - Medium speed, vibrant
            gsap.to(waveMidRef.current, {
                x: "-50%",
                duration: 15,
                repeat: -1,
                ease: "linear",
            });
            gsap.to(waveMidRef.current, {
                y: 10,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // Wave 3 (Front) - Fast, brightest
            gsap.to(waveFrontRef.current, {
                x: "-50%",
                duration: 10,
                repeat: -1,
                ease: "linear",
            });
            gsap.to(waveFrontRef.current, {
                y: 5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });


            // --- Entry Animations (ScrollTrigger) ---
            // Logo Scale & Fade
            gsap.fromTo(logoRef.current, 
                { scale: 0.85, opacity: 0, y: 50 },
                {
                    scale: 1, 
                    opacity: 1, 
                    y: 0,
                    duration: 1.4, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 70%",
                    }
                }
            );

            // Bottom Content Stagger
            gsap.fromTo(bottomContentRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 75%",
                    }
                }
            );

        }, footerRef);

        return () => ctx.revert();
    }, []);

    // Wave Path Data (Seamless Loop Segment)
    // A simplified sine-like wave repeated.
    // The path width is managed via transform scale in SVG or ensuring path data is long enough.
    // Here we use a long path generated: 0-100-200...
    const wavePath = "M0 50 Q 150 0 300 50 T 600 50 T 900 50 T 1200 50 T 1500 50 T 1800 50 T 2100 50 T 2400 50 V 150 H 0 Z";

    return (
        <footer ref={footerRef} className="w-full bg-slate-50 text-slate-900 pt-24 pb-8 overflow-hidden relative border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col justify-between min-h-[60vh]">
                
                {/* 1. Huge Liquid Text Brand Logo */}
                <div ref={logoRef} className="grow flex items-center justify-center w-full overflow-hidden mb-12 md:mb-0 opacity-0 relative z-10">
                    <svg viewBox="0 0 1320 320" className="w-full h-auto max-w-[95vw] md:max-w-[90vw]">
                        <defs>
                            {/* Rich Magma Gradient */}
                            <linearGradient id="magmaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#450a0a" />   {/* Deep Red */}
                                <stop offset="30%" stopColor="#c2410c" />   {/* Dark Orange */}
                                <stop offset="50%" stopColor="#fbbf24" />   {/* Amber/Yellow Core */}
                                <stop offset="70%" stopColor="#c2410c" />   {/* Dark Orange */}
                                <stop offset="100%" stopColor="#450a0a" />  {/* Deep Red */}
                            </linearGradient>

                            {/* Text Mask */}
                            <clipPath id="textClip">
                                <text 
                                    x="50%" 
                                    y="50%" 
                                    dominantBaseline="middle" 
                                    textAnchor="middle" 
                                    className="font-black tracking-tighter"
                                    style={{ fontSize: '250px', fontFamily: 'var(--font-geist-sans)' }}
                                >
                                    NEXCURA
                                </text>
                            </clipPath>
                        </defs>

                        {/* Compostion Layer */}
                        <g clipPath="url(#textClip)">
                            {/* 1. Base Dark Background (The "cool" lava rock) */}
                            <rect width="100%" height="100%" fill="#2a0a0a" />

                            {/* 2. Ambient Glow (Static background gradient) */}
                            <rect width="100%" height="100%" fill="url(#magmaGradient)" opacity="0.3" />

                            {/* 3. Liquid Waves (The "flow") */}
                            
                            {/* Back Wave: Darker, slower */}
                            <g transform="translate(0, 100)">
                                <path 
                                    ref={waveBackRef}
                                    d={wavePath} 
                                    fill="#7f1d1d" 
                                    opacity="0.8"
                                    transform="scale(2, 1.8)" // Stretch horizontally
                                />
                            </g>

                            {/* Mid Wave: Main Orange Body */}
                            <g transform="translate(0, 130)">
                                <path 
                                    ref={waveMidRef}
                                    d={wavePath} 
                                    fill="#ea580c" 
                                    opacity="0.9"
                                    transform="scale(2, 1.8)" 
                                />
                            </g>

                            {/* Front Wave: Bright Yellow/Amber highlights */}
                            <g transform="translate(-100, 160)">
                                <path 
                                    ref={waveFrontRef}
                                    d={wavePath} 
                                    fill="#fbbf24" 
                                    opacity="1"
                                    transform="scale(2, 1.8)" 
                                />
                            </g>
                        </g>

                        {/* Optional: Subtle Inner Shadow/Highlight on text edges could be added via filter, 
                            but native SVG support is tricky. Masking usually sufficient. */}
                    </svg>
                </div>

                {/* 2. Bottom Content (Columns) */}
                <div ref={bottomContentRef} className="flex flex-col md:flex-row justify-between items-end gap-12 md:gap-0 mt-8 border-t border-slate-200/50 pt-8 opacity-0">
                    
                    {/* Left: Copyright & Tagline */}
                    <div className="flex flex-col gap-3 w-full md:w-auto">
                         <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-orange-600 shadow-[0_0_12px_rgba(234,88,12,0.6)] animate-pulse"></span>
                            <span className="text-sm font-bold tracking-widest uppercase text-slate-900">GenAI Healthcare</span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium">
                            &copy; {new Date().getFullYear()} NexCura. All rights reserved.
                        </p>
                    </div>

                    {/* Right: Links Columns */}
                    <div className="flex flex-wrap gap-12 md:gap-24 w-full md:w-auto">
                        {/* Legal Column */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Legal</h4>
                            <div className="flex flex-col gap-2">
                                {["Privacy Policy", "Terms of Use", "Terms of Sale", "Security", "Patent"].map((item) => (
                                    <Link 
                                        key={item} 
                                        href="#" 
                                        className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors duration-200"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Company Column */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Company</h4>
                            <div className="flex flex-col gap-2">
                                 {["Our Mission", "Our Team", "Careers", "Contact"].map((item) => (
                                    <Link 
                                        key={item} 
                                        href="#" 
                                        className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors duration-200"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
