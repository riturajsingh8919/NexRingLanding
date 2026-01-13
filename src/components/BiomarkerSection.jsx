"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BiomarkerSection = () => {
  const biomarkers = [
    { title: "Heart Health", count: 15, details: ["Cholesterol", "HDL", "LDL", "Triglycerides", "Hs-CRP", "Homocysteine", "ApoB", "Lp(a)", "HbA1c", "Fasting Insulation", "Glucose", "Cortisol", "More..."] },
    { title: "Stress & Ageing Markers", count: 3, details: ["Cortisol", "DHEA-S", "Telomere Length"] },
    { title: "Thyroid Profile", count: 5, details: ["TSH", "Free T3", "Free T4", "TPO Antibodies", "Reverse T3"] },
    { title: "Liver Function", count: 8, details: ["ALT", "AST", "GGT", "Bilirubin", "Albumin", "Globulin", "Total Protein", "ALP"] },
    { title: "Autoimmune Panel", count: 5, details: ["ANA", "Rheumatoid Factor", "Anti-CCP", "ESR", "CRP"] },
    { title: "Kidney Function", count: 9, details: ["Creatinine", "eGFR", "BUN", "Uric Acid", "Sodium", "Potassium", "Chloride", "Calcium", "Phosphorus"] },
    { title: "Immune Regulation", count: 7, details: ["White Blood Cells", "Neutrophils", "Lymphocytes", "Monocytes", "Eosinophils", "Basophils", "Platelets"] },
    { title: "Pancreas Function", count: 2, details: ["Amylase", "Lipase"] },
    { title: "Male Health", count: 6, details: ["Testosterone Total", "Testosterone Free", "SHBG", "Prolactin", "Estradiol", "PSA"] },
    { title: "Heavy Metal Markers", count: 2, details: ["Lead", "Mercury"] },
    { title: "Female Health", count: 9, details: ["FSH", "LH", "Estradiol", "Progesterone", "Testosterone", "DHEA-S", "Prolactin", "Ferritin", "Iron"] },
    { title: "Complete Blood Count", count: 10, details: ["RBC", "Hemoglobin", "Hematocrit", "MCV", "MCH", "MCHC", "RDW", "WBC", "Platelets", "Differential Count"] },
    { title: "Diabetes Panel", count: 4, details: ["HbA1c", "Fasting Glucose", "Fasting Insulin", "HOMA-IR"] },
    { title: "Electrolyte Panel", count: 6, details: ["Sodium", "Potassium", "Chloride", "Calcium", "Magnesium", "Phosphorus"] },
    { title: "Nutrient Panel", count: 16, details: ["Vitamin D", "Vitamin B12", "Folate", "Iron", "Ferritin", "Magnesium", "Zinc", "Selenium", "Copper", "Omega-3", "More..."] },
    { title: "Urine Panel", count: 15, details: ["Color", "Clarity", "pH", "Specific Gravity", "Protein", "Glucose", "Ketones", "Bilirubin", "Urobilinogen", "Nitrite", "Leukocytes", "Blood"] },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Accordion expansion animation is handled via CSS Grid in the render method.
    // Removed ScrollTrigger entry animation to ensure cards are always visible.
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={containerRef} className="relative py-24 bg-gray-100">
      <div className="container mx-auto px-4 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-black mb-4 tracking-tight">
            Every biomarker, in context
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-light">
            Included in your $49 Annual Membership*
          </p>
        </div>

        {/* Grid - items-start prevents neighbors from stretching height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-6xl mx-auto items-start">
          {biomarkers.map((item, index) => (
            <div 
              key={index} 
              ref={el => cardsRef.current[index] = el}
              className="group border border-gray-100 rounded-xl bg-white hover:bg-gray-50 hover:shadow-sm transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center cursor-pointer justify-between p-6 text-left"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors">
                    {item.title}
                  </span>
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {item.count} Biomarkers
                  </span>
                </div>
                <div className="text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
                  {openIndex === index ? (
                    <FiMinus size={20} />
                  ) : (
                    <FiPlus size={20} />
                  )}
                </div>
              </button>

              <div
                className={`grid transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
                  openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {item.details.map((detail, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 font-medium shadow-sm"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BiomarkerSection;
