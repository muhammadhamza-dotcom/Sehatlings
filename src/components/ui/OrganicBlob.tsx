"use client";
import { motion } from "framer-motion";

interface OrganicBlobProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "pale" | "white";
  opacity?: number;
  className?: string;
  animationDuration?: number;
}

const sizeMap = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
};

const colorMap = {
  primary: "bg-primary/10",
  pale: "bg-primary-pale",
  white: "bg-white/20",
};

export default function OrganicBlob({
  size = "md",
  color = "primary",
  opacity = 1,
  className = "",
  animationDuration = 10,
}: OrganicBlobProps) {
  return (
    <motion.div
      className={`${sizeMap[size]} ${colorMap[color]} blob-shape ${className}`}
      style={{ opacity }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: opacity,
        scale: 1,
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        opacity: { duration: 1, ease: "easeOut" },
        scale: { duration: 1, ease: "easeOut" },
        rotate: {
          duration: animationDuration,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <style jsx>{`
        @keyframes morph {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
        }
      `}</style>
    </motion.div>
  );
}
