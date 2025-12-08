"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function TechCross() {
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Passive rotation for the cross itself
    const rotateX = 0;
    const rotateY = 0;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center"
        >
            <div className="relative w-[400px] h-[400px] flex items-center justify-center">

                {/* Ambient Glow */}
                <motion.div
                    animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-radial from-maroon/30 to-transparent blur-3xl"
                />

                {/* Orbiting Rings - Enhanced Visibility */}
                <Ring size={320} color="border-terracotta/60" duration={25} delay={0} rotateX={70} rotateY={20} />
                <Ring size={380} color="border-sage/60" duration={30} delay={0} rotateX={-50} rotateY={40} />
                <Ring size={260} color="border-white/30" duration={20} delay={0} rotateX={30} rotateY={-60} />
                <Ring size={440} color="border-white/20" duration={40} delay={0} rotateX={10} rotateY={10} dashed />

                {/* The Interactive Solid Cross */}
                <motion.div
                    className="relative z-10"
                >
                    {/* Vertical Bar */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-56 bg-[#F2F0E9] rounded-2xl shadow-dramatic flex items-center justify-center overflow-hidden group">
                    </div>

                    {/* Horizontal Bar */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-20 bg-[#F2F0E9] rounded-2xl shadow-dramatic flex items-center justify-center overflow-hidden">
                    </div>

                </motion.div>

                {/* Floating Particles */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <Particle key={i} index={i} />
                ))}

            </div>
        </div>
    );
}

function Ring({ size, color, duration, delay, rotateX, rotateY, dashed = false }: {
    size: number;
    color: string;
    duration: number;
    delay: number;
    rotateX: number;
    rotateY: number;
    dashed?: boolean;
}) {
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration, repeat: Infinity, ease: "linear", delay }}
            className={`absolute rounded-full border-[1px] ${color} ${dashed ? 'border-dashed opacity-30' : ''}`}
            style={{
                width: size,
                height: size,
                rotateX: rotateX,
                rotateY: rotateY
            }}
        >
            {/* Node on ring */}
            {!dashed && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/80 rounded-full shadow-glow" />
            )}
        </motion.div>
    );
}

function Particle({ index }: { index: number }) {
    const randomX = (Math.random() - 0.5) * 500;
    const randomY = (Math.random() - 0.5) * 500;
    const duration = 4 + Math.random() * 5;

    return (
        <motion.div
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={{
                opacity: [0, 0.8, 0],
                x: [0, randomX],
                y: [0, randomY],
                scale: [0, 1, 0]
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeOut",
                delay: index * 0.3
            }}
            className="absolute w-1 h-1 bg-maroon/60 rounded-full blur-[0.5px]"
        />
    );
}
