"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Stethoscope, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DoctorRegistrationForm from "@/components/DoctorRegistrationForm";

export default function TelehealthFeature() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <section className="py-20 md:py-32 bg-white relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative">
                {/* Background Decor */}
                <div className="absolute top-12 left-12 w-64 h-64 bg-maroon/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-12 right-1/3 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl -z-10" />

                <div className="relative grid lg:grid-cols-12 items-center gap-12 lg:gap-0 lg:py-12">

                    {/* Content Card (Overlaps from left) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-6 lg:col-start-1 lg:row-start-1 relative z-10"
                    >
                        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2rem] p-8 md:p-12">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maroon/5 border border-maroon/10 mb-8">
                                <Stethoscope className="w-4 h-4 text-maroon" />
                                <span className="text-maroon font-sans font-bold text-xs tracking-wider uppercase">
                                    For Healthcare Professionals
                                </span>
                            </div>

                            {/* Headline */}
                            <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-[1.1]">
                                Start Your <span className="text-maroon">Telehealth</span> Practice
                            </h2>

                            {/* Description */}
                            <p className="font-sans text-lg text-charcoal/70 mb-8 leading-relaxed">
                                Join our mission to close Pakistan's rural healthcare gap. Nominate high-need areas and become a Healthcare Ambassador. Your triple role delivers high-tech consultations to underserved communities nationwide.
                            </p>

                            {/* Modem Grid Features */}
                            <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                {[
                                    "Close the Healthcare Gap",
                                    "Expand Your Reach",
                                    "Doctor. Ambassador. Leader.",
                                    "Simple 3-Step Process",
                                    "High-Tech Rural Care",
                                    "Make Real Impact"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-white/50 p-3 rounded-xl border border-gray-100">
                                        <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                                        </div>
                                        <span className="text-charcoal/90 font-sans text-sm font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Mobile Stats (Visible only on small screens) */}
                            <div className="flex gap-8 mb-8 lg:hidden">
                                <div>
                                    <p className="font-serif text-2xl font-bold text-maroon">30</p>
                                    <p className="text-xs text-charcoal/60 uppercase tracking-wide">Doctors</p>
                                </div>
                                <div>
                                    <p className="font-serif text-2xl font-bold text-maroon">1000</p>
                                    <p className="text-xs text-charcoal/60 uppercase tracking-wide">Target</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setIsFormOpen(true)}
                                    className="px-8 py-4 bg-maroon text-cream font-sans font-semibold rounded-xl shadow-lg hover:bg-maroon-dark hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                                >
                                    Register as Doctor
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <Link href="/learn-more" className="w-full sm:w-auto">
                                    <button className="w-full px-8 py-4 bg-white border border-gray-200 text-charcoal font-sans font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center">
                                        Learn More
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image Background (Spans right side) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 lg:col-start-6 lg:row-start-1 relative h-[400px] lg:h-[700px] rounded-[2.5rem] overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="/telehealth.webp"
                            alt="Telehealth Clinic"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20 lg:to-transparent" />

                        {/* Floating Stats on Image */}
                        <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-[200px] hidden lg:block">
                            <p className="font-serif text-3xl font-bold text-maroon mb-1">30+</p>
                            <p className="text-charcoal/80 text-sm font-sans leading-tight">Doctors already onboarded and serving</p>
                        </div>

                        <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-[200px] hidden lg:block">
                            <p className="font-serif text-3xl font-bold text-maroon mb-1">1000+</p>
                            <p className="text-charcoal/80 text-sm font-sans leading-tight">Consultation Target</p>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Doctor Registration Form Modal */}
            <DoctorRegistrationForm
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
            />
        </section>
    );
}
