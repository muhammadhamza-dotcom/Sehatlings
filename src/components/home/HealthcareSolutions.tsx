"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  Stethoscope,
  Truck,
  FlaskConical,
  GraduationCap,
  Brain,
  Users
} from "lucide-react";

export default function HealthcareSolutions() {
  useScrollAnimation();
  
  const solutions = [
    {
      icon: Stethoscope,
      title: "Muaina Platform",
      description: "Be on board with us by joining the community and give back to the society"
    },
    {
      icon: Truck,
      title: "Supply Chain",
      description: "Run your back office with us and let us figure out the best tools for your business operations"
    },
    {
      icon: FlaskConical,
      title: "Lab Inspection",
      description: "Ensuring compliance and operational excellence through meticulous inspections."
    },
    {
      icon: GraduationCap,
      title: "Leadership Training",
      description: "Cultivating the next generation of healthcare leaders with essential skills."
    },
    {
      icon: Brain,
      title: "Health AI Solutions",
      description: "Developing intelligent systems to enhance diagnostics and workflows."
    },
    {
      icon: Users,
      title: "Business CRM",
      description: "Bespoke CRM designed specifically for healthcare organizations."
    }
  ];

  return (
    <section id="healthcare-solutions" className="bg-warm-gradient py-16 md:py-24 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Header */}
        <div data-animate className="scroll-fade-up text-center mb-10 md:mb-14 lg:mb-20">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            Comprehensive Healthcare Solutions
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-body">
            End-to-end healthcare solutions designed to address specific industry challenges with innovation and expertise.
          </p>
        </div>

        {/* Solutions Grid */}
        <div data-animate className="scroll-stagger grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-6 md:p-8 shadow-soft shadow-soft-hover transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Icon Container with gradient background */}
              <div className="w-20 h-20 bg-pale-gradient rounded-[2rem] flex items-center justify-center mb-6 group-hover:shadow-soft transition-all duration-500 group-hover:rotate-3">
                <solution.icon className="w-9 h-9 text-primary" strokeWidth={2.5} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-400">
                {solution.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-body">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}