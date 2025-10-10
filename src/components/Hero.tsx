"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
 
import Link from "next/link";
import CircuitHero from "./CircuitHero";

export default function Hero() {
  useEffect(() => {
    // Dispatch event for navbar to show after component mounts
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('unicornstudio-ready'));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <section id="home" className="relative min-h-screen overflow-visible sm:overflow-hidden bg-white pt-24 pb-12 sm:pt-28 sm:pb-16 md:py-8 lg:py-12 xl:py-0 flex items-center">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 hidden 2xl:block">
        {/* Top Left Area (pushed down) */}
        <motion.div
          className="absolute top-32 left-16 w-20 h-20 bg-primary/10 rounded-2xl rotate-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            y: [0, -15, 0],
            rotate: [12, 24, 12]
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.5 },
            scale: { duration: 0.8, delay: 0.5 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.3 },
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.3 }
          }}
        />
        
        {/* Top Right Area (pushed down) */}
        <motion.div
          className="absolute top-40 right-32 w-12 h-12 bg-primary/10 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1,
            scale: [1, 1.1, 1],
            y: [0, 20, 0]
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.5 },
            scale: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.3, times: [0, 0.5, 1] },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.3 }
          }}
        />
        
        {/* Right Side (slightly lower) */}
        <motion.div
          className="absolute top-[60%] right-16 w-16 h-16 bg-primary/10 rounded-3xl rotate-45"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
            rotate: [45, 60, 45],
            x: [0, 5, 0]
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.5 },
            scale: { duration: 0.8, delay: 0.5 },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.3 },
            rotate: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.3 },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.3 }
          }}
        />
        
        {/* Bottom Left */}
        <motion.div
          className="absolute bottom-32 left-24 w-14 h-14 bg-primary/10 rounded-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            x: [0, 15, 0],
            y: [0, -12, 0]
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.5 },
            scale: { duration: 0.8, delay: 0.5 },
            x: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.3 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.3 }
          }}
        />
        
        {/* Bottom Right */}
        <motion.div
          className="absolute bottom-20 right-20 w-10 h-10 bg-primary/10 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1,
            scale: [1, 1.15, 1],
            y: [0, -18, 0]
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.5 },
            scale: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.3, times: [0, 0.5, 1] },
            y: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.3 }
          }}
        />
        
      </div>

      <div className="relative w-full mx-auto max-w-7xl grid lg:grid-cols-2 items-center gap-8 lg:gap-12 px-4 sm:px-6 lg:px-12 z-10">
        {/* Left Column - Hero Text and Buttons */}
        <div className="z-10 text-center lg:text-left">
          <div className="max-w-2xl mx-auto lg:mx-0">
            {/* Healthcare Innovation Leader Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="inline-block"
              style={{ willChange: 'transform, opacity' }}
            >
              <span className="px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base bg-primary/10 text-primary font-medium rounded-full border border-primary/20">
                Healthcare Innovation Leader
              </span>
            </motion.div>

            {/* Main Headline with Line Breaks */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              style={{ willChange: 'transform, opacity' }}
            >
              <span className="text-black">Shaping Tomorrow&apos;s </span>
              <span className="text-primary">Healthcare Today</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed"
              style={{ willChange: 'transform, opacity' }}
            >
              Empowering healthcare&apos;s future through integrated education and innovative technological products
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start"
              style={{ willChange: 'transform, opacity' }}
            >
              <Link href="/tech-house">
                <motion.button
                  className="px-6 py-3 bg-primary text-white text-base sm:text-lg font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Explore Solutions</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                </motion.button>
              </Link>
              
              <Link href="/contact">
                <motion.button
                  className="px-6 py-3 bg-transparent text-gray-700 text-base sm:text-lg font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connect With Us
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Circuit Animation */}
        <div className="relative h-full flex items-center justify-center">
          <CircuitHero />
        </div>
      </div>

 
    </section>
  );
}


