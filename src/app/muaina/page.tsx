"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight, Check, Brain, TrendingUp, X, Mail, Phone, MapPin, Building, User,
  Activity, FileCheck, RefreshCw, MessageSquare, UserCheck, Mic, FileSearch, Users, Zap
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import validator from "validator";
import { motion } from "framer-motion";

// Pre-generated random values for SSR consistency (avoid hydration mismatch)
const DOCUMENT_LINE_WIDTHS = [89.27, 80.76, 86.15, 63.62, 83.66, 68.58, 78.05, 82.04];
const WAVEFORM_ANIMATIONS = Array(30).fill(0).map(() => ({
  heights: [
    20 + Math.random() * 30,
    40 + Math.random() * 60,
    20 + Math.random() * 30
  ],
  duration: 1 + Math.random()
}));

// Pre-calculated doctor node positions for SSR consistency
const DOCTOR_NODE_POSITIONS = Array(5).fill(0).map((_, i) => {
  const angle = (i * 72) * (Math.PI / 180);
  const radius = 75;
  return {
    left: Math.round(Math.cos(angle) * radius * 100) / 100,
    top: Math.round(Math.sin(angle) * radius * 100) / 100
  };
});

// Zod validation schema for B2B registration form
const labRegistrationSchema = z.object({
  labName: z.string()
    .min(2, 'Lab name must be at least 2 characters')
    .max(100, 'Lab name must be less than 100 characters')
    .transform(val => val.trim()),
  contactName: z.string()
    .min(2, 'Contact name must be at least 2 characters')
    .max(50, 'Contact name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Contact name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(val => val.trim()),
  email: z.string()
    .min(1, 'Email is required')
    .refine((val) => validator.isEmail(val), 'Please enter a valid email address')
    .refine((val) => {
      const hasAt = typeof val === 'string' && val.includes('@');
      const domain = hasAt ? val.split('@')[1] : '';
      if (!domain) return false;

      const fakeDomains = ['test.com', 'fake.com', 'example.com', 'sadff.com', 'asdf.com', 'temp.com'];
      if (fakeDomains.includes(domain)) return false;

      const trustedDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com'];
      if (trustedDomains.includes(domain)) return true;

      const domainParts = domain.split('.');
      if (domainParts.length < 2) return false;

      const tld = domainParts[domainParts.length - 1];
      if (tld.length < 2 || tld.length > 6) return false;

      return domain.length >= 4;
    }, 'Please enter a valid email address'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine((val) => validator.isMobilePhone(val.replace(/\s/g, ''), 'any', { strictMode: false }),
      'Please enter a valid phone number'),
  address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters')
    .transform(val => val.trim()),
});

type LabRegistrationData = z.infer<typeof labRegistrationSchema>;

// Zod validation schema for early access form
const earlyAccessSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(val => val.trim()),
  email: z.string()
    .min(1, 'Email is required')
    .refine((val) => validator.isEmail(val), 'Please enter a valid email address')
    .refine((val) => {
      const hasAt = typeof val === 'string' && val.includes('@');
      const domain = hasAt ? val.split('@')[1] : '';
      if (!domain) return false;

      const fakeDomains = ['test.com', 'fake.com', 'example.com', 'sadff.com', 'asdf.com', 'temp.com'];
      if (fakeDomains.includes(domain)) return false;

      const trustedDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com'];
      if (trustedDomains.includes(domain)) return true;

      const domainParts = domain.split('.');
      if (domainParts.length < 2) return false;

      const tld = domainParts[domainParts.length - 1];
      if (tld.length < 2 || tld.length > 6) return false;

      return domain.length >= 4;
    }, 'Please enter a valid email address'),
  industry: z.string()
    .min(1, 'Please select an industry'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine((val) => validator.isMobilePhone(val.replace(/\s/g, ''), 'any', { strictMode: false }),
      'Please enter a valid phone number'),
});

type EarlyAccessData = z.infer<typeof earlyAccessSchema>;

export default function MuainaPage() {
  useScrollAnimation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const [earlyAccessSubmitStatus, setEarlyAccessSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // React Hook Form with Zod validation - Lab Registration
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<LabRegistrationData>({
    resolver: zodResolver(labRegistrationSchema),
    mode: 'onChange',
  });

  // React Hook Form with Zod validation - Early Access
  const {
    register: registerEA,
    handleSubmit: handleSubmitEA,
    watch: watchEA,
    formState: { errors: errorsEA, isValid: isValidEA },
    reset: resetEA,
  } = useForm<EarlyAccessData>({
    resolver: zodResolver(earlyAccessSchema),
    mode: 'onChange',
  });

  // Watch all fields for real-time validation feedback
  const labNameValue = watch("labName");
  const contactNameValue = watch("contactName");
  const emailValue = watch("email");
  const phoneValue = watch("phone");
  const addressValue = watch("address");

  const nameValue = watchEA("name");
  const emailEAValue = watchEA("email");
  const industryValue = watchEA("industry");
  const phoneEAValue = watchEA("phone");

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen || isEarlyAccessModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen, isEarlyAccessModalOpen]);

  const onSubmit = async (data: LabRegistrationData) => {
    setSubmitStatus('loading');
    try {
      const response = await fetch('/api/lab-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const onEarlyAccessSubmit = async (data: EarlyAccessData) => {
    setEarlyAccessSubmitStatus('loading');
    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setEarlyAccessSubmitStatus('success');
        resetEA();
        setTimeout(() => {
          setIsEarlyAccessModalOpen(false);
          setEarlyAccessSubmitStatus('idle');
        }, 2000);
      } else {
        setEarlyAccessSubmitStatus('error');
        setTimeout(() => setEarlyAccessSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      setEarlyAccessSubmitStatus('error');
      setTimeout(() => setEarlyAccessSubmitStatus('idle'), 5000);
    }
  };

  return (
    <main key="muaina" className="relative">
      {/* Hero Section */}
      <section className="bg-cream min-h-screen flex items-center relative overflow-hidden">
        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-24 sm:py-20 md:py-24 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              data-animate
              className="scroll-fade-up inline-flex items-center px-4 py-2 rounded-full bg-maroon/10 text-maroon text-sm font-medium uppercase tracking-wider mb-6"
              style={{ animationDelay: '0ms' }}
            >
              <Zap className="w-4 h-4 mr-2" />
              END-USER SOLUTION
            </motion.div>

            {/* Title */}
            <motion.h1
              data-animate
              className="scroll-fade-up font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal mb-4"
              style={{ letterSpacing: '-0.02em', animationDelay: '200ms' }}
            >
              Muaina
            </motion.h1>

            {/* Divider */}
            <motion.div
              data-animate
              className="scroll-fade-up w-32 h-1 bg-maroon mx-auto my-4 relative"
              style={{ animationDelay: '400ms' }}
            >
              <div className="absolute inset-0 blur-md bg-maroon/20" />
            </motion.div>

            {/* Subtitle */}
            <motion.h2
              data-animate
              className="scroll-fade-up font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal mb-4 leading-tight max-w-4xl mx-auto"
              style={{ animationDelay: '600ms' }}
            >
              AI Powered Pathologist Assistant to Patient Journey Optimizer
            </motion.h2>

            {/* Description */}
            <motion.p
              data-animate
              className="scroll-fade-up font-sans font-light text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-6"
              style={{ animationDelay: '800ms' }}
            >
              Get ready for a new era of patient care. Muaina is an AI-powered platform designed to optimize every step of the patient journey, from initial diagnosis to post-treatment follow-up. It&apos;s not just a tool; it&apos;s the future of intelligent healthcare management.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              data-animate
              className="scroll-fade-up flex flex-col sm:flex-row gap-4 justify-center"
              style={{ animationDelay: '1000ms' }}
            >
              <Button
                onClick={() => setIsEarlyAccessModalOpen(true)}
                className="bg-maroon hover:bg-maroon-dark text-cream px-6 py-3 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Early Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                className="border-2 border-maroon text-maroon hover:bg-maroon hover:text-cream px-6 py-3 text-base font-semibold rounded-full transition-all duration-300"
              >
                Register Your Lab
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Stats Bar */}
      <section className="bg-white border-t border-b border-gray-200 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div data-animate className="scroll-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, number: "40%", label: "Faster Diagnosis" },
              { icon: Users, number: "100k+", label: "Target to Serve" },
              { icon: Brain, number: "24/7", label: "AI Support" },
              { icon: Activity, number: "99.9%", label: "Uptime" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <stat.icon className="w-10 h-10 text-maroon mx-auto mb-4" />
                <div className="font-serif text-5xl md:text-6xl text-charcoal mb-2">
                  {stat.number}
                </div>
                <div className="font-sans text-sm text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature 1: ScanUp */}
      <section className="bg-cream py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div data-animate className="scroll-fade-left">
              <div className="w-16 h-16 bg-maroon/10 rounded-2xl flex items-center justify-center mb-6">
                <FileSearch className="w-8 h-8 text-maroon" />
              </div>
              <p className="font-sans font-bold text-xs uppercase tracking-widest text-maroon mb-4">
                SCANUP
              </p>
              <h3 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
                Instant Report Analysis
              </h3>
              <p className="font-sans font-light text-lg text-gray-600 mb-8">
                Instantly scan medical reports to get clear, concise summaries powered by advanced AI.
              </p>
              <ul className="space-y-4">
                {[
                  "Automated report parsing",
                  "Key insights extraction",
                  "Multi-format support"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-maroon flex-shrink-0 mt-1" />
                    <span className="font-sans text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Visual - Animated Document Scan */}
            <div data-animate className="scroll-fade-right">
              <div className="relative aspect-square bg-gradient-to-br from-cream to-white rounded-3xl p-12 overflow-hidden">
                {/* Floating document layers */}
                <motion.div
                  className="absolute inset-8 bg-white rounded-2xl shadow-xl z-10"
                  animate={{ y: [0, -10, 0], rotate: [0, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Document content lines */}
                  <div className="p-8 space-y-3">
                    {DOCUMENT_LINE_WIDTHS.map((width, i) => (
                      <motion.div
                        key={i}
                        className="h-2 bg-gradient-to-r from-maroon/20 to-transparent rounded-full"
                        style={{ width: `${width}%` }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Scanning gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-maroon/20 to-transparent z-20"
                  style={{ height: '100%' }}
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Corner accent blobs */}
                <div className="absolute top-4 right-4 w-24 h-24 bg-maroon/10 rounded-full blur-2xl" />
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-terracotta/10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Daktari */}
      <section className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Visual - Floating Chat Bubbles */}
            <div data-animate className="scroll-fade-left order-2 lg:order-1">
              <div className="relative aspect-square bg-gradient-to-br from-white to-cream rounded-3xl p-12 overflow-hidden">
                {/* Background gradient mesh */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-maroon/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-terracotta/5 rounded-full blur-3xl" />
                </div>

                {/* Chat bubbles */}
                <div className="relative z-10 space-y-6">
                  <motion.div
                    className="bg-gradient-to-br from-maroon to-maroon-dark rounded-3xl rounded-tr-sm p-6 max-w-[70%] ml-auto shadow-dramatic"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <p className="text-sm text-cream">What are my test results?</p>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-white to-cream border border-gray-200 rounded-3xl rounded-tl-sm p-6 max-w-[80%] shadow-soft"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <p className="text-sm text-gray-600">Based on your recent lab work, your results show...</p>
                  </motion.div>

                  {/* Typing indicator */}
                  <motion.div
                    className="flex gap-2 max-w-[60%]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-maroon rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                      />
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div data-animate className="scroll-fade-right order-1 lg:order-2">
              <div className="w-16 h-16 bg-maroon/10 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-maroon" />
              </div>
              <p className="font-sans font-bold text-xs uppercase tracking-widest text-maroon mb-4">
                DAKTARI
              </p>
              <h3 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
                AI Medical Assistant
              </h3>
              <p className="font-sans font-light text-lg text-gray-600 mb-8">
                An intelligent chatbot that provides on-demand support and information 24/7.
              </p>
              <ul className="space-y-4">
                {[
                  "Natural language processing",
                  "Evidence-based responses",
                  "Multi-language support"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-maroon flex-shrink-0 mt-1" />
                    <span className="font-sans text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: One-Tap-Go */}
      <section className="bg-cream py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div data-animate className="scroll-fade-left">
              <div className="w-16 h-16 bg-maroon/10 rounded-2xl flex items-center justify-center mb-6">
                <UserCheck className="w-8 h-8 text-maroon" />
              </div>
              <p className="font-sans font-bold text-xs uppercase tracking-widest text-maroon mb-4">
                ONE-TAP-GO
              </p>
              <h3 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
                Smart Doctor Matching
              </h3>
              <p className="font-sans font-light text-lg text-gray-600 mb-8">
                Receive personalized doctor recommendations based on your health reports.
              </p>
              <ul className="space-y-4">
                {[
                  "AI-powered matching",
                  "Specialist recommendations",
                  "Appointment scheduling"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-maroon flex-shrink-0 mt-1" />
                    <span className="font-sans text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Visual - Connected Network */}
            <div data-animate className="scroll-fade-right">
              <div className="relative aspect-square bg-gradient-to-br from-cream via-white to-cream rounded-3xl p-6 sm:p-8 md:p-12 overflow-hidden">
                {/* Central patient node */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-maroon to-maroon-dark rounded-full flex items-center justify-center z-10 shadow-dramatic"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-cream" />
                </motion.div>

                {/* Pulsing connection rings */}
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-maroon/20"
                    style={{
                      width: `${ring * 60}px`,
                      height: `${ring * 60}px`
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      delay: ring * 0.3,
                      repeat: Infinity
                    }}
                  />
                ))}

                {/* Doctor nodes orbiting */}
                {DOCTOR_NODE_POSITIONS.map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-white to-cream rounded-full shadow-soft border border-gray-200 flex items-center justify-center"
                    style={{
                      left: `calc(50% + ${pos.left}px)`,
                      top: `calc(50% + ${pos.top}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    animate={{
                      y: [0, -8, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity
                    }}
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-maroon/10 rounded-full" />
                  </motion.div>
                ))}

                {/* Background gradient blob */}
                <div className="absolute inset-0 bg-gradient-radial from-maroon/5 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4: Asaan Health */}
      <section className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Visual - Waveform Animation */}
            <div data-animate className="scroll-fade-left order-2 lg:order-1">
              <div className="relative aspect-square bg-gradient-to-br from-white to-cream rounded-3xl p-6 sm:p-12 flex items-center justify-center overflow-hidden">
                {/* Background gradient orb */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-96 h-96 bg-gradient-radial from-maroon/20 via-maroon/5 to-transparent rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>

                {/* Central microphone icon with pulse */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-maroon to-maroon-dark rounded-full flex items-center justify-center z-10 shadow-dramatic"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mic className="w-10 h-10 text-cream" />
                </motion.div>

                {/* Waveform visualization */}
                <div className="relative z-0 flex items-end justify-center gap-1 sm:gap-2 h-32 max-w-full mx-auto">
                  {WAVEFORM_ANIMATIONS.map((anim, i) => (
                    <motion.div
                      key={i}
                      className={`w-2 bg-gradient-to-t from-maroon to-terracotta rounded-full ${i >= 20 ? 'hidden sm:block' : ''
                        }`}
                      animate={{
                        height: anim.heights.map(h => `${h}%`)
                      }}
                      transition={{
                        duration: anim.duration,
                        repeat: Infinity,
                        delay: i * 0.05
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div data-animate className="scroll-fade-right order-1 lg:order-2">
              <div className="w-16 h-16 bg-maroon/10 rounded-2xl flex items-center justify-center mb-6">
                <Mic className="w-8 h-8 text-maroon" />
              </div>
              <p className="font-sans font-bold text-xs uppercase tracking-widest text-maroon mb-4">
                ASAAN HEALTH
              </p>
              <h3 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
                Voice-Enabled Care
              </h3>
              <p className="font-sans font-light text-lg text-gray-600 mb-8">
                Voice-assisted feature helps users in rural areas connect to our call center for expert support.
              </p>
              <ul className="space-y-4">
                {[
                  "Voice recognition",
                  "Multi-dialect support",
                  "24/7 call center access"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-maroon flex-shrink-0 mt-1" />
                    <span className="font-sans text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="bg-gradient-to-br from-maroon-dark to-maroon py-32 md:py-40">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-sans font-bold text-xs uppercase tracking-widest text-cream/70 mb-6">
              POWERED BY AI
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-cream mb-6 leading-tight">
              Real-Time Analysis, Instant Clarity
            </h2>
            <p className="font-sans font-light text-lg text-cream/80 max-w-2xl mx-auto">
              Our AI engine continuously learns and adapts, delivering insights that empower better healthcare decisions.
            </p>
          </div>

          <div data-animate className="scroll-stagger grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Brain, title: "Pattern Recognition", description: "Analyze millions of data points instantly" },
              { icon: TrendingUp, title: "Predictive Analytics", description: "Forecast patient outcomes with precision" },
              { icon: FileCheck, title: "Evidence-Based Recommendations", description: "Treatment suggestions backed by research" },
              { icon: RefreshCw, title: "Continuous Learning", description: "Improves with every case processed" }
            ].map((capability, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 transition-all duration-300"
                whileHover={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  y: -2
                }}
              >
                <capability.icon className="w-10 h-10 text-cream mb-4" />
                <h4 className="font-sans font-bold text-lg text-cream mb-2">
                  {capability.title}
                </h4>
                <p className="font-sans text-sm text-cream/70">
                  {capability.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual CTA Section */}
      <section className="bg-cream py-32 md:py-40">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Lab Registration Card */}
            <motion.div
              data-animate
              className="scroll-fade-left bg-white rounded-3xl p-10 md:p-12 shadow-dramatic transition-all duration-300"
              whileHover={{
                y: -4,
                boxShadow: "0 30px 70px rgba(91, 2, 3, 0.2), 0 12px 28px rgba(91, 2, 3, 0.12)"
              }}
            >
              <Building className="w-12 h-12 text-maroon mb-6" />
              <h3 className="font-serif text-3xl text-charcoal mb-4">
                Register Your Laboratory
              </h3>
              <p className="font-sans text-gray-600 mb-8">
                Enterprise AI integration for modern healthcare facilities
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Full platform access",
                  "Dedicated support team",
                  "Custom integration options"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-maroon flex-shrink-0" />
                    <span className="font-sans text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-maroon hover:bg-maroon-dark text-cream py-4 text-lg font-semibold rounded-full"
              >
                Register Lab
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            {/* Early Access Card */}
            <motion.div
              data-animate
              className="scroll-fade-right bg-white rounded-3xl p-10 md:p-12 shadow-dramatic transition-all duration-300"
              whileHover={{
                y: -4,
                boxShadow: "0 30px 70px rgba(91, 2, 3, 0.2), 0 12px 28px rgba(91, 2, 3, 0.12)"
              }}
            >
              <Users className="w-12 h-12 text-maroon mb-6" />
              <h3 className="font-serif text-3xl text-charcoal mb-4">
                Get Early Access
              </h3>
              <p className="font-sans text-gray-600 mb-8">
                Join thousands of early adopters transforming healthcare
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Beta feature access",
                  "Priority support",
                  "Community access"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-maroon flex-shrink-0" />
                    <span className="font-sans text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => setIsEarlyAccessModalOpen(true)}
                className="w-full bg-maroon hover:bg-maroon-dark text-cream py-4 text-lg font-semibold rounded-full"
              >
                Join Waitlist
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lab Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-modalPop">
            <div className="px-6 py-8 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Lab Registration</h2>
                  <p className="text-gray-600 mt-1">Register your lab to access the AI Pathology Solution and start innovating today.</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 space-y-6">
              <div>
                <Label htmlFor="labName" className="mb-2 block">Lab Name *</Label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    id="labName"
                    {...register("labName")}
                    placeholder="Enter your lab name"
                    className={`${errors.labName ? "border-red-500" : labNameValue ? "border-green-500 focus-visible:ring-green-500/30" : ""} pl-10`}
                  />
                </div>
                {errors.labName && (
                  <p className="text-sm text-red-600 mt-1">{errors.labName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactName" className="mb-2 block">Lab Director / Primary Contact Name *</Label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    id="contactName"
                    {...register("contactName")}
                    placeholder="Enter contact name"
                    className={`${errors.contactName ? "border-red-500" : contactNameValue ? "border-green-500 focus-visible:ring-green-500/30" : ""} pl-10`}
                  />
                </div>
                {errors.contactName && (
                  <p className="text-sm text-red-600 mt-1">{errors.contactName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="mb-2 block">Email Address *</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                    placeholder="Enter email address"
                    className={`${errors.email ? "border-red-500" : emailValue ? "border-green-500 focus-visible:ring-green-500/30" : ""} pl-10`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="mb-2 block">Phone Number *</Label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    {...register("phone")}
                    placeholder="Enter phone number"
                    className={`${errors.phone ? "border-red-500" : phoneValue ? "border-green-500 focus-visible:ring-green-500/30" : ""} pl-10`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="address" className="mb-2 block">Lab Address *</Label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <Textarea
                    id="address"
                    {...register("address")}
                    placeholder="Enter lab address"
                    rows={3}
                    className={`${errors.address ? "border-red-500" : addressValue ? "border-green-500 focus-visible:ring-green-500/30" : ""} pl-10 resize-none`}
                  />
                </div>
                {errors.address && (
                  <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={submitStatus === 'loading' || !isValid}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-semibold"
              >
                {submitStatus === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Registering...
                  </>
                ) : (
                  'Register My Lab'
                )}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Early Access Registration Modal */}
      {isEarlyAccessModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-modalPop">
            <div className="px-6 py-8 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Early Access Registration</h2>
                  <p className="text-gray-600 mt-1">Join our early access program and be the first to experience our AI-powered healthcare solutions.</p>
                </div>
                <button
                  onClick={() => setIsEarlyAccessModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitEA(onEarlyAccessSubmit)} className="px-6 py-8 space-y-6">
              <div>
                <Label htmlFor="ea-name" className="mb-2 block">Full Name *</Label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    id="ea-name"
                    {...registerEA("name")}
                    placeholder="Enter your full name"
                    className={`${errorsEA.name ? "border-red-500" : nameValue ? "border-green-500 focus-visible:ring-green-500/30" : ""} pl-10`}
                  />
                </div>
                {errorsEA.name && (
                  <p className="text-sm text-red-600 mt-1">{errorsEA.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="ea-email" className="mb-2 block">Email Address *</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    id="ea-email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errorsEA.email}
                    {...registerEA("email")}
                    placeholder="Enter your email address"
                    className={`${errorsEA.email ? "border-red-500" : emailEAValue ? "border-green-500 focus-visible:ring-green-500/30" : ""} pl-10`}
                  />
                </div>
                {errorsEA.email && (
                  <p className="text-sm text-red-600 mt-1">{errorsEA.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="ea-industry" className="mb-2 block">Industry *</Label>
                <select
                  id="ea-industry"
                  {...registerEA("industry")}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${errorsEA.industry ? "border-red-500" : industryValue ? "border-green-500" : "border-gray-300"}`}
                >
                  <option value="">Select your industry</option>
                  <option value="healthcare-provider">Healthcare Provider</option>
                  <option value="hospital-health-system">Hospital/Health System</option>
                  <option value="medical-device">Medical Device Company</option>
                  <option value="pharmaceutical">Pharmaceutical</option>
                  <option value="health-tech-startup">Health Tech Startup</option>
                  <option value="research-institution">Research Institution</option>
                  <option value="other">Other</option>
                </select>
                {errorsEA.industry && (
                  <p className="text-sm text-red-600 mt-1">{errorsEA.industry.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="ea-phone" className="mb-2 block">Phone Number *</Label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    id="ea-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    aria-invalid={!!errorsEA.phone}
                    {...registerEA("phone")}
                    placeholder="Enter your phone number"
                    className={`${errorsEA.phone ? "border-red-500" : phoneEAValue ? "border-green-500 focus-visible:ring-green-500/30" : ""} pl-10`}
                  />
                </div>
                {errorsEA.phone && (
                  <p className="text-sm text-red-600 mt-1">{errorsEA.phone.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={earlyAccessSubmitStatus === 'loading' || !isValidEA}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-semibold"
              >
                {earlyAccessSubmitStatus === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Registering...
                  </>
                ) : (
                  'Register for Early Access'
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
