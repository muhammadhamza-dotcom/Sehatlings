"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DNAHelix() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    // Configuration
    const numPairs = 20;
    const duration = 10; // Slower, more majestic rotation
    const ySpacing = 22;
    const xAmplitude = 90;

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-[300px] h-[600px] flex items-center justify-center perspective-1000">

                {/* Central Axis / Glow - Enhanced */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-maroon/10 to-transparent blur-2xl w-32 mx-auto rounded-full"
                />

                {/* Central Medical Cross (Tech Style) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute z-0 flex items-center justify-center"
                >
                    <div className="relative w-24 h-24">
                        {/* Vertical Bar */}
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-full bg-gradient-to-b from-maroon/20 via-maroon/60 to-maroon/20 rounded-full blur-[1px]" />
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-2 h-full bg-white/40 rounded-full" />

                        {/* Horizontal Bar */}
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-6 bg-gradient-to-r from-maroon/20 via-maroon/60 to-maroon/20 rounded-full blur-[1px]" />
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-2 bg-white/40 rounded-full" />

                        {/* Pulse Effect */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-maroon/20 blur-xl rounded-full"
                        />
                    </div>
                </motion.div>

                {/* DNA Strands */}
                {Array.from({ length: numPairs }).map((_, i) => (
                    <BasePair
                        key={i}
                        index={i}
                        total={numPairs}
                        ySpacing={ySpacing}
                        xAmplitude={xAmplitude}
                        duration={duration}
                    />
                ))}
            </div>
        </div>
    );
}

function BasePair({ index, total, ySpacing, xAmplitude, duration }: {
    index: number;
    total: number;
    ySpacing: number;
    xAmplitude: number;
    duration: number;
}) {
    const yPos = (index - total / 2) * ySpacing;
    const delay = -1 * (index / total) * duration; // Offset animation based on position to create spiral

    return (
        <div
            className="absolute w-full flex items-center justify-center"
            style={{ top: "50%", marginTop: yPos }}
        >
            {/* Connecting Line (Rung) */}
            <motion.div
                animate={{
                    width: ["100%", "0%", "100%"],
                    opacity: [0.4, 0.1, 0.4],
                    scaleY: [1, 0.5, 1]
                }}
                transition={{
                    duration: duration / 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay
                }}
                className="absolute h-[2px] bg-gradient-to-r from-maroon/30 via-terracotta/30 to-maroon/30"
                style={{ width: xAmplitude * 2 }}
            />

            {/* Node A - Maroon Gradient */}
            <motion.div
                animate={{
                    x: [xAmplitude, -xAmplitude, xAmplitude],
                    scale: [1.2, 0.6, 1.2],
                    opacity: [1, 0.4, 1],
                    zIndex: [20, 0, 20]
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: delay
                }}
                className="absolute w-5 h-5 rounded-full shadow-lg bg-gradient-to-br from-maroon to-maroon-dark border border-white/20"
            />

            {/* Node B - Terracotta Gradient */}
            <motion.div
                animate={{
                    x: [-xAmplitude, xAmplitude, -xAmplitude],
                    scale: [0.6, 1.2, 0.6],
                    opacity: [0.4, 1, 0.4],
                    zIndex: [0, 20, 0]
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: delay
                }}
                className="absolute w-5 h-5 rounded-full shadow-lg bg-gradient-to-br from-terracotta to-sage border border-white/20"
            />
        </div>
    );
}
