"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Stethoscope, UserPlus, ArrowRight, Check } from "lucide-react";
import DoctorRegistrationForm from "@/components/DoctorRegistrationForm";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function DoctorOnboardingSection() {
  useScrollAnimation();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const benefits = [
    "Close the Healthcare Gap",
    "Expand Your Reach",
    "Doctor. Ambassador. Leader.",
    "Simple 3-Step Process",
    "High-Tech Rural Care",
    "Make Real Impact"
  ];

  return (
    <>
      <section id="register-doctor" className="relative min-h-screen overflow-visible sm:overflow-hidden bg-gray-50 py-12 md:py-12 lg:py-16 xl:py-0 flex items-center">
        {/* Background decorative elements */}
        <div className="absolute inset-0 hidden xl:block">
          <motion.div
            className="absolute top-16 left-16 w-16 h-16 bg-primary/10 rounded-2xl rotate-12"
            animate={{
              y: [0, -10, 0],
              rotate: [12, 24, 12]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-32 right-24 w-12 h-12 bg-primary/10 rounded-full"
            animate={{
              y: [0, 15, 0],
              x: [0, -5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute bottom-20 left-32 w-14 h-14 bg-primary/10 rounded-xl"
            animate={{
              y: [0, -12, 0],
              rotate: [0, 15, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            {/* Content Side */}
            <div data-animate className="scroll-fade-up">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  For Healthcare Professionals
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Start Your Telehealth Practice
              </h2>

              <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
                Join our mission to close Pakistan&apos;s rural healthcare gap. Nominate high-need areas and become a Healthcare Ambassador. Your triple role as Doctor, Ambassador, and Operational Leader delivers high-tech consultations to underserved communities nationwide. Simple registration, verification, and next-step support included.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 md:mb-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-base font-medium inline-flex items-center gap-2 group"
                >
                  <UserPlus className="w-5 h-5" />
                  Register as Doctor
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 text-base font-medium"
                  asChild
                >
                  <a href="/contact">Learn More</a>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 md:gap-8 pt-6 md:pt-8 mt-6 md:mt-8 border-t border-gray-200">
                <div>
                  <div className="text-2xl font-bold text-primary">30</div>
                  <div className="text-sm text-gray-600">Doctors Onboarded</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">1000</div>
                  <div className="text-sm text-gray-600">Consultation Target</div>
                </div>
              </div>
            </div>

            {/* Visual Side */}
            <div data-animate className="scroll-fade-left relative">
              <div className="relative">
                {/* Doctors Image */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative z-10 ml-0 md:ml-8 lg:ml-12"
                >
                  <Image
                    src="/telehealth.webp"
                    alt="Healthcare professionals providing telehealth consultations"
                    width={640}
                    height={400}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px"
                    className="w-full h-auto object-cover rounded-2xl shadow-lg"
                  />
                </motion.div>

              </div>
            </div>
          </div>
        </div>
      </section>

 

      {/* Doctor Registration Form Modal */}
      <DoctorRegistrationForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
    </>
  );
}