"use client";
import { motion } from "framer-motion";
import { Zap, Clock, Brain } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function DiagonalFeature() {
  useScrollAnimation();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Diagonal split backgrounds */}
      <div className="absolute inset-0">
        {/* Maroon side with diagonal */}
        <div
          className="absolute inset-0 bg-hero-gradient diagonal-split"
          style={{ clipPath: 'polygon(0 0, 65% 0, 50% 100%, 0 100%)' }}
        />
        {/* Cream side */}
        <div className="absolute inset-0 bg-cream" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT - Maroon side content */}
          <motion.div
            data-animate
            className="scroll-fade-right text-white"
          >
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-accent font-semibold rounded-full mb-6">
              Why Muaina
            </span>

            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-8 editorial-spacing">
              Transform<br />Healthcare<br />Delivery
            </h2>

            {/* Key benefits with large numbers */}
            <div className="space-y-8">
              <motion.div
                data-animate
                className="scroll-fade-up"
                style={{ transitionDelay: '0.2s' }}
              >
                <div className="flex items-start gap-6">
                  <Zap className="w-12 h-12 text-terracotta flex-shrink-0 mt-2" strokeWidth={1.5} />
                  <div>
                    <p className="font-serif text-4xl md:text-5xl text-white mb-2">90%</p>
                    <p className="text-white/80 text-lg">Faster diagnosis with AI-powered analysis</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                data-animate
                className="scroll-fade-up"
                style={{ transitionDelay: '0.4s' }}
              >
                <div className="flex items-start gap-6">
                  <Clock className="w-12 h-12 text-terracotta flex-shrink-0 mt-2" strokeWidth={1.5} />
                  <div>
                    <p className="font-serif text-4xl md:text-5xl text-white mb-2">24/7</p>
                    <p className="text-white/80 text-lg">Round-the-clock AI support for patients</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                data-animate
                className="scroll-fade-up"
                style={{ transitionDelay: '0.6s' }}
              >
                <div className="flex items-start gap-6">
                  <Brain className="w-12 h-12 text-terracotta flex-shrink-0 mt-2" strokeWidth={1.5} />
                  <div>
                    <p className="font-serif text-4xl md:text-5xl text-white mb-2">10k+</p>
                    <p className="text-white/80 text-lg">Patients served with precision care</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT - Cream side with mockup */}
          <motion.div
            data-animate
            className="scroll-fade-left relative"
          >
            {/* Placeholder for product screenshot/mockup */}
            <div className="relative bg-white rounded-3xl shadow-dramatic-lg p-0 aspect-[4/3] overflow-hidden group">
              <img
                src="/transform_healthcare.png"
                alt="Healthcare Transformation Dashboard"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Floating UI elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-maroon-dark text-white px-4 py-3 rounded-2xl shadow-dramatic"
            >
              <p className="text-xs font-accent font-semibold">Live Updates</p>
              <p className="text-2xl font-serif">98%</p>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section >
  );
}
