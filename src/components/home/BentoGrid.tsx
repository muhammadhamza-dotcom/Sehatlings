"use client";
import { motion } from "framer-motion";
import { Stethoscope, Truck, FlaskConical, GraduationCap, Brain, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function BentoGrid() {
  useScrollAnimation();

  const solutions = [
    {
      id: 1,
      title: "GENDLR Platform",
      description: "AI-powered patient management transforming healthcare delivery",
      icon: Stethoscope,
      bg: "bg-maroon-dark",
      textColor: "text-cream",
      size: "large", // spans 2 rows
    },
    {
      id: 2,
      title: "Lab Inspection",
      description: "Ensuring compliance and operational excellence",
      icon: FlaskConical,
      bg: "bg-terracotta",
      textColor: "text-white",
      size: "small",
    },
    {
      id: 3,
      title: "Supply Chain",
      description: "Back office optimization for healthcare operations",
      icon: Truck,
      bg: "bg-sage",
      textColor: "text-charcoal",
      size: "small",
    },
    {
      id: 4,
      title: "Leadership Training",
      description: "Cultivating next-generation healthcare leaders",
      icon: GraduationCap,
      bg: "bg-cream-dark",
      textColor: "text-charcoal",
      size: "medium",
    },
    {
      id: 5,
      title: "Health AI Solutions",
      description: "Intelligent systems enhancing diagnostics and workflows",
      icon: Brain,
      bg: "bg-cream",
      textColor: "text-charcoal",
      size: "tall",
    },
    {
      id: 6,
      title: "Business CRM",
      description: "Bespoke CRM for healthcare organizations",
      icon: Users,
      bg: "bg-maroon-light",
      textColor: "text-white",
      size: "medium",
    },
  ];

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2"; // Box 1
      case "tall":
        return "md:col-span-1 md:row-span-2"; // Box 5
      case "medium":
        return "md:col-span-2"; // Boxes 4, 6
      case "small":
      default:
        return "md:col-span-1"; // Boxes 2, 3
    }
  };

  return (
    <section className="py-20 md:py-32 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          data-animate
          className="scroll-fade-up text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-charcoal mb-6 editorial-spacing">
            Comprehensive<br />Healthcare Solutions
          </h2>
          <p className="font-sans text-xl text-charcoal/70 max-w-3xl mx-auto">
            End-to-end solutions designed to address specific industry challenges with innovation and expertise
          </p>
        </motion.div>

        {/* Bento Grid - Asymmetric Layout */}
        <div
          data-animate
          className="scroll-stagger grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-4 md:gap-6"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              className={`group ${getSizeClasses(solution.size)} ${solution.bg} rounded-3xl p-8 card-lift relative overflow-hidden transition-all duration-500`}
              whileHover={{ scale: solution.size === "large" ? 1.01 : 1.02 }}
            >
              {/* Background pattern/texture */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />
              </div>

              <div className="relative z-10 h-full flex flex-col">
                {/* Icon */}
                <div className={`w-16 h-16 ${solution.size === "large" ? "mb-8" : "mb-6"} flex items-center justify-center`}>
                  <solution.icon
                    className={`${solution.textColor} w-12 h-12 ${solution.size === "large" ? "w-16 h-16" : ""}`}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-end">
                  <h3 className={`${solution.textColor} font-sans font-bold ${solution.size === "large" ? "text-3xl md:text-4xl mb-4" : "text-2xl mb-3"}`}>
                    {solution.title}
                  </h3>
                  <p className={`${solution.textColor} opacity-80 font-sans ${solution.size === "large" ? "text-lg" : "text-base"} leading-relaxed`}>
                    {solution.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className={`absolute bottom-8 right-8 w-10 h-10 ${solution.textColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
