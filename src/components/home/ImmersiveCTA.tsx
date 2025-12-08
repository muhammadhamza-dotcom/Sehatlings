"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";

export default function ImmersiveCTA() {
  // Generate stable particle positions using useMemo to avoid hydration mismatch
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: (i * 13.7 + 23.5) % 100, // Pseudo-random but deterministic
      bottom: (i * 17.3 + 11.2) % 50,
      duration: 3 + ((i * 7.1) % 2),
      delay: (i * 11.3) % 5,
    }));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain-texture">
      {/* Full maroon gradient background */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Floating organic shapes */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -15, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-terracotta/10 rounded-full blur-3xl"
      />

      {/* Floating particles with stable positions */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            left: `${particle.left}%`,
            bottom: `${particle.bottom}%`,
          }}
        />
      ))}

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
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-cream text-maroon-dark font-sans font-bold text-xl rounded-full shadow-dramatic-lg hover:shadow-dramatic transition-all duration-400 btn-squish animate-glow-breathe"
            >
              Get Started Today
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-400" />

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-white/20 blur-xl -z-10" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
