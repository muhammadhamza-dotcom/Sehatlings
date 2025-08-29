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
      title: "GENDLR Platform",
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
    <section id="healthcare-solutions" className="bg-white py-20 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Header */}
        <div data-animate className="scroll-fade-up text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Comprehensive Healthcare Solutions
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            End-to-end healthcare solutions designed to address specific industry challenges with innovation and expertise.
          </p>
        </div>

        {/* Solutions Grid */}
        <div data-animate className="scroll-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/20"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300 hover:scale-105">
                <solution.icon className="w-8 h-8 text-primary" strokeWidth={2} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                {solution.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}