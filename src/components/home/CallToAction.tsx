"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  useScrollAnimation();
  
  return (
    <section className="bg-primary py-20 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 text-center">
        
        {/* Main Heading */}
        <h1 data-animate className="scroll-fade-up text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
          Ready to Transform Your Healthcare Operations?
        </h1>

        {/* Subtext */}
        <p data-animate className="scroll-fade-up text-base md:text-lg text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed" style={{transitionDelay: '0.2s'}}>
          Join us and trust the process with Sehatlings to deliver innovative 
          solutions that improve patient outcomes and operational efficiency.
        </p>

        {/* Action Buttons */}
        <div data-animate className="scroll-fade-up flex flex-col sm:flex-row items-center justify-center gap-6" style={{transitionDelay: '0.4s'}}>
          {/* Start Your Journey Button */}
          <Button 
            asChild
            variant="outline"
            className="bg-white text-primary border-white hover:bg-gray-50 hover:shadow-md font-semibold px-8 py-4 text-base rounded-xl group transition-all duration-300"
          >
            <Link href="/tech-house" className="flex items-center gap-2">
              Start Your Journey
              <ArrowUpRight className="w-5 h-5 text-primary transition-opacity duration-300 group-hover:opacity-80" />
            </Link>
          </Button>

          {/* Schedule Consultation Button */}
          <Button 
            asChild
            variant="outline"
            className="bg-white text-primary border-white hover:bg-gray-50 font-semibold px-8 py-4 text-base rounded-xl transition-all duration-300"
          >
            <Link href="/contact">
              Schedule Consultation
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}