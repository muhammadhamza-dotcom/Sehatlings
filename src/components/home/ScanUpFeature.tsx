"use client";

import { motion } from "framer-motion";
import { FileSearch, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ScanUpFeature() {
    return (
        <section className="py-20 md:py-32 bg-cream relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* LEFT SIDE - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center">
                                <FileSearch className="w-4 h-4 text-terracotta" />
                            </div>
                            <span className="text-terracotta font-sans font-bold text-sm tracking-wider uppercase">
                                ScanUp
                            </span>
                        </div>

                        {/* Headline */}
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 editorial-spacing leading-[1.1]">
                            Instant Report Analysis
                        </h2>

                        {/* Description */}
                        <p className="font-sans text-lg text-charcoal/70 mb-10 leading-relaxed">
                            Instantly scan medical reports to get clear, concise summaries powered by advanced AI. Our technology breaks down complex medical jargon into understandable insights, empowering both patients and professionals.
                        </p>

                        {/* Checkmarks Grid */}
                        <div className="space-y-4 mb-10">
                            {[
                                "Automated report parsing",
                                "Key insights extraction",
                                "Multi-format support (PDF, JPG, PNG)"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-maroon flex-shrink-0" />
                                    <span className="text-charcoal/80 font-sans text-lg">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/scanup">
                                <button className="px-8 py-4 bg-terracotta text-white font-sans font-semibold rounded-full shadow-dramatic hover:bg-terracotta/90 transition-colors flex items-center gap-2 group">
                                    Try ScanUp Now
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE - Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square bg-white group">
                            {/* Image Overlay Gradient */}

                            {/* Actual Image */}
                            <Image
                                src="/scanup_feature.png"
                                alt="AI analyzing medical report"
                                fill
                                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* Decorative Background Element */}
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-maroon/5 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-terracotta/10 rounded-full blur-3xl -z-10" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
