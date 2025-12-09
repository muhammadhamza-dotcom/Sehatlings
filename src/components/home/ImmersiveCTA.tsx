"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";


export default function ImmersiveCTA() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain-texture">
      {/* Full maroon gradient background */}
      <div className="absolute inset-0 bg-hero-gradient" />



      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-8 editorial-spacing">
            Ready to Transform<br />Your Healthcare?
          </h2>

          <p className="font-sans text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of healthcare providers leveraging AI to deliver better patient outcomes
          </p>

          {/* Large CTA button with breathing glow */}
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-cream text-maroon-dark font-sans font-bold text-xl rounded-full shadow-dramatic-lg hover:shadow-dramatic transition-all duration-400 btn-squish"
            >
              Get Started Today
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-400" />

              {/* Simple glow effect */}
              <div className="absolute inset-0 rounded-full bg-white/20 blur-xl -z-10" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
