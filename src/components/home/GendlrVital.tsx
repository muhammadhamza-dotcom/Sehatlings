"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import {
  FileSearch,
  MessageSquare,
  UserCheck,
  Mic,
  ArrowRight
} from "lucide-react";

// Feature cards data
const features = [
  {
    id: "scanup",
    title: "ScanUp",
    description: "Instantly scan medical reports to get clear, concise summaries.",
    icon: FileSearch,
    bg: "bg-gradient-to-br from-maroon-dark to-maroon",
    textColor: "text-cream"
  },
  {
    id: "daktari",
    title: "Daktari",
    description: "An intelligent chatbot that provides on-demand support and information.",
    icon: MessageSquare,
    bg: "bg-gradient-to-br from-maroon-dark to-maroon",
    textColor: "text-cream"
  },
  {
    id: "onetapgo",
    title: "One-Tap-Go",
    description: "Receive personalized doctor recommendations based on your health reports.",
    icon: UserCheck,
    bg: "bg-gradient-to-br from-maroon-dark to-maroon",
    textColor: "text-cream"
  },
  {
    id: "asaanhealth",
    title: "Asaan Health",
    description: "Our voice-assisted feature helps users in rural areas get connected to our call center for expert support.",
    icon: Mic,
    bg: "bg-gradient-to-br from-maroon-dark to-maroon",
    textColor: "text-cream"
  }
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
};

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  return (
    <motion.div
      variants={itemVariants}
      className={`${feature.bg} rounded-3xl p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden"
      }}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
          <feature.icon className={`${feature.textColor} w-6 h-6 md:w-7 md:h-7`} strokeWidth={1.5} />
        </div>

        {/* Text content */}
        <div className="flex-1">
          <h3 className={`${feature.textColor} font-sans font-bold text-xl md:text-2xl mb-2`}>
            {feature.title}
          </h3>
          <p className={`${feature.textColor} opacity-90 font-sans text-base md:text-lg leading-relaxed`}>
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function GendlrVital() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 bg-cream overflow-hidden"
    >
      {/* Background grain texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header - Centered */}
          <div className="text-center mb-12 md:mb-16">
            <motion.h2
              variants={itemVariants}
              className="font-serif text-5xl md:text-6xl lg:text-7xl text-charcoal mb-4 md:mb-6 leading-tight tracking-tight"
            >
              GENDLR
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="font-sans text-xl md:text-2xl text-charcoal/70 leading-relaxed"
            >
              AI-Powered Healthcare Transformation
            </motion.p>
          </div>

          {/* Feature Cards - Vertical Stack */}
          <motion.div
            variants={containerVariants}
            className="space-y-4 md:space-y-6 mb-8 md:mb-12"
          >
            {features.map((feature, i) => (
              <FeatureCard key={feature.id} feature={feature} index={i} />
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <Link href="/gendlr">
              <motion.button
                className="group px-8 py-4 bg-maroon hover:bg-maroon-dark text-cream font-sans font-semibold text-lg rounded-full transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn more about GENDLR
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
