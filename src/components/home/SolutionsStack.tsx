"use client";

import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import { Stethoscope, Truck, FlaskConical, GraduationCap, Brain, Users } from "lucide-react";

const solutions = [
  {
    title: "Muaina Platform",
    description: "AI-powered patient management transforming healthcare delivery",
    icon: Stethoscope,
    bg: "bg-maroon-dark",
    textColor: "text-cream"
  },
  {
    title: "Lab Inspection",
    description: "Ensuring compliance and operational excellence",
    icon: FlaskConical,
    bg: "bg-terracotta",
    textColor: "text-white"
  },
  {
    title: "Supply Chain",
    description: "Back office optimization for healthcare operations",
    icon: Truck,
    bg: "bg-sage",
    textColor: "text-charcoal"
  },
  {
    title: "Leadership Training",
    description: "Cultivating next-generation healthcare leaders",
    icon: GraduationCap,
    bg: "bg-cream-dark",
    textColor: "text-charcoal"
  },
  {
    title: "Health AI Solutions",
    description: "Intelligent systems enhancing diagnostics and workflows",
    icon: Brain,
    bg: "bg-cream",
    textColor: "text-charcoal"
  },
  {
    title: "Business CRM",
    description: "Bespoke CRM for healthcare organizations",
    icon: Users,
    bg: "bg-maroon-light",
    textColor: "text-white"
  }
];

export default function SolutionsStack() {
  return (
    <section className="py-20 md:py-32 bg-cream relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-0">
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 editorial-spacing">
            Comprehensive<br />Healthcare Solutions
          </h2>
          <p className="font-sans text-xl text-charcoal/70 max-w-3xl mx-auto">
            End-to-end solutions designed to address specific industry challenges with innovation and expertise
          </p>
        </div>
      </div>

      <div className="w-full px-6 sm:px-8 lg:px-12">

        {/* ScrollStack */}
        <ScrollStack
          useWindowScroll={true}
          itemDistance={100}
          itemScale={0.03}
          itemStackDistance={30}
          stackPosition="20%"
          baseScale={0.85}
          rotationAmount={0}
          blurAmount={0}
        >
          {solutions.map((solution, i) => (
            <ScrollStackItem key={i}>
              <div className={`${solution.bg} h-full w-full rounded-3xl p-8 flex flex-col justify-between`}>
                <div className="flex items-center gap-4 mb-6">
                  <solution.icon className={`${solution.textColor} w-12 h-12`} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className={`${solution.textColor} font-sans font-bold text-2xl md:text-3xl mb-4`}>
                    {solution.title}
                  </h3>
                  <p className={`${solution.textColor} opacity-80 font-sans text-base leading-relaxed`}>
                    {solution.description}
                  </p>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
