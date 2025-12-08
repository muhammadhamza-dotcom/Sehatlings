"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";

import Link from "next/link";
import CircuitHero from "./CircuitHero";
import OrganicBlob from "./ui/OrganicBlob";

export default function Hero() {
  useEffect(() => {
    // Dispatch event for navbar to show after component mounts
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('unicornstudio-ready'));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <section id="home" className="relative min-h-screen overflow-visible sm:overflow-hidden bg-warm-gradient pt-24 pb-12 sm:pt-28 sm:pb-16 md:py-8 lg:py-12 xl:py-0 flex items-center">
      {/* Organic Floating Blobs - Soft & Wellness-inspired */}
      <div className="absolute inset-0 hidden 2xl:block overflow-hidden">
        {/* Top Left Blob */}
        <div className="absolute top-32 left-16">
          <motion.div
            className="w-24 h-24 bg-primary/8 animate-blob-morph"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              opacity: { duration: 1.2, delay: 0.3 },
              scale: { duration: 1.2, delay: 0.3, ease: "easeOut" },
              y: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              x: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            }}
          />
        </div>

        {/* Top Right Blob */}
        <div className="absolute top-40 right-32">
          <motion.div
            className="w-20 h-20 bg-primary-pale/60 animate-blob-morph"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 0.8,
              scale: [1, 1.1, 1],
              y: [0, 25, 0],
            }}
            transition={{
              opacity: { duration: 1.2, delay: 0.5 },
              scale: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
              y: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
            }}
          />
        </div>

        {/* Right Side Blob */}
        <div className="absolute top-[60%] right-16">
          <motion.div
            className="w-28 h-28 bg-primary/6 animate-blob-morph"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -15, 0],
              x: [0, -8, 0],
            }}
            transition={{
              opacity: { duration: 1.2, delay: 0.4 },
              scale: { duration: 1.2, delay: 0.4, ease: "easeOut" },
              y: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
              x: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
            }}
          />
        </div>

        {/* Bottom Left Blob */}
        <div className="absolute bottom-32 left-24">
          <motion.div
            className="w-22 h-22 bg-primary-pale/50 animate-blob-morph"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 0.9,
              scale: 1,
              x: [0, 18, 0],
              y: [0, -15, 0],
            }}
            transition={{
              opacity: { duration: 1.2, delay: 0.6 },
              scale: { duration: 1.2, delay: 0.6, ease: "easeOut" },
              x: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
              y: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
            }}
          />
        </div>

        {/* Bottom Right Blob */}
        <div className="absolute bottom-20 right-20">
          <motion.div
            className="w-16 h-16 bg-primary/7 animate-blob-morph"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: [1, 1.12, 1],
              y: [0, -22, 0],
            }}
            transition={{
              opacity: { duration: 1.2, delay: 0.7 },
              scale: { duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
              y: { duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
            }}
          />
        </div>
      </div>

      <div className="relative w-full mx-auto max-w-7xl grid lg:grid-cols-2 items-center gap-8 lg:gap-12 px-4 sm:px-6 lg:px-12 z-10">
        {/* Left Column - Hero Text and Buttons */}
        <div className="z-10 text-center lg:text-left">
          <div className="max-w-2xl mx-auto lg:mx-0">
            {/* Healthcare Innovation Leader Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
              className="inline-block"
              style={{ willChange: 'transform, opacity' }}
            >
              <span className="px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base bg-pale-gradient text-primary font-semibold rounded-full shadow-soft border border-primary/10">
                Healthcare Innovation Leader
              </span>
            </motion.div>

            {/* Main Headline with Line Breaks */}
            <motion.h1
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
              className="mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              style={{ willChange: 'transform, opacity' }}
            >
              <span className="text-gray-900">Shaping Tomorrow&apos;s </span>
              <span className="text-primary">Healthcare Today</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
              className="mt-6 text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed font-body"
              style={{ willChange: 'transform, opacity' }}
            >
              Empowering healthcare&apos;s future through integrated education and innovative technological products
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 items-center sm:items-start"
              style={{ willChange: 'transform, opacity' }}
            >
              <Link href="/tech-house">
                <motion.button
                  className="px-8 py-4 bg-maroon-gradient text-white text-base sm:text-lg font-semibold rounded-full shadow-soft-hover flex items-center justify-center gap-2 min-w-[200px]"
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(91, 2, 3, 0.25)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                >
                  <span>Explore Solutions</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                </motion.button>
              </Link>

              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 bg-white text-gray-700 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-full hover:border-primary/30 hover:text-primary shadow-soft-hover transition-all duration-400 min-w-[200px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
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


