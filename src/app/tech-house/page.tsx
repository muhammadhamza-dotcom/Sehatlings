"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Eye, Building2, Users, Code, Brain, Smartphone, BarChart3, Plus, Star, Quote, Layers, Triangle, FileCode, Zap, Palette, Server, Code2, Coffee, Network, Zap as ApiIcon, Boxes, Cpu, MessageSquare, Globe, X, Mail, Phone, User, Check } from "lucide-react";
import Link from "next/link";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import validator from "validator";

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function Counter({ target, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(target * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isInView, target, duration]);

  return (
    <div ref={counterRef} className="font-serif text-4xl md:text-5xl text-charcoal">
      {count}{suffix}
    </div>
  );
}

// Zod validation schema for project inquiry form
const projectInquirySchema = z.object({
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

      // Only reject obviously fake domains
      const fakeDomains = ['test.com', 'fake.com', 'example.com', 'sadff.com', 'asdf.com', 'temp.com'];
      if (fakeDomains.includes(domain)) return false;

      // Allow all major email providers
      const trustedDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com'];
      if (trustedDomains.includes(domain)) return true;

      // For other domains, just check basic structure
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
  projectDetails: z.string()
    .min(10, 'Project details must be at least 10 characters')
    .max(500, 'Project details must be less than 500 characters')
    .transform(val => val.trim()),
});

type ProjectInquiryData = z.infer<typeof projectInquirySchema>;

// Animation variants (unused after refactoring)
// const container = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.4 } }
// };

// const item = {
//   hidden: { opacity: 0, y: 24 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
// };

export default function TechHousePage() {
  useScrollAnimation();
  const [marqueeDuration, setMarqueeDuration] = useState(8);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectSubmitStatus, setProjectSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Slow down marquee on smaller screens for better readability
  useEffect(() => {
    const updateDuration = () => {
      if (typeof window === 'undefined') return;

      const width = window.innerWidth;
      let newDuration;

      if (width < 480) {
        newDuration = 48; // slowest on small phones
      } else if (width < 768) {
        newDuration = 40; // tablets/large phones
      } else {
        newDuration = 32; // desktop
      }

      console.log('Updating marquee duration:', newDuration, 'for width:', width);
      setMarqueeDuration(newDuration);
    };

    updateDuration();
    window.addEventListener('resize', updateDuration);
    return () => window.removeEventListener('resize', updateDuration);
  }, []);

  // Project Inquiry Form with Zod validation
  const {
    register: registerPI,
    handleSubmit: handleSubmitPI,
    watch: watchPI,
    formState: { errors: errorsPI, isValid: isValidPI },
    reset: resetPI,
  } = useForm<ProjectInquiryData>({
    resolver: zodResolver(projectInquirySchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
  });

  // Watch values for project inquiry form
  const nameValue = watchPI("name");
  const emailPIValue = watchPI("email");
  const phonePIValue = watchPI("phone");
  const projectDetailsValue = watchPI("projectDetails");

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isProjectModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isProjectModalOpen]);

  const onProjectSubmit = async (data: ProjectInquiryData) => {
    setProjectSubmitStatus('loading');

    try {
      const response = await fetch('/api/project-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setProjectSubmitStatus('success');
        resetPI();

        setTimeout(() => {
          setIsProjectModalOpen(false);
          setProjectSubmitStatus('idle');
        }, 2000);
      } else {
        console.error('Project inquiry error:', result);
        setProjectSubmitStatus('error');
        setTimeout(() => setProjectSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Project inquiry submission error:', error);
      setProjectSubmitStatus('error');
      setTimeout(() => setProjectSubmitStatus('idle'), 5000);
    }
  };

  return (
    <main key="tech-house">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with subtle opacity - Matching Inspection Consultancy */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.15]"
          style={{ backgroundImage: "url('/healthcare-tech1.webp')" }}
          aria-hidden
        />
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat'
          }}
          aria-hidden
        />
        <div data-animate className="scroll-fade-up relative z-10 mx-auto max-w-4xl px-6 text-center">

          {/* Section Label */}
          <div className="inline-block mb-6">
            <span
              className="px-3 py-1.5 bg-maroon/10 text-maroon text-sm font-medium uppercase tracking-wider rounded-full border border-maroon/20"
            >
              Technology Solutions
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-charcoal mb-8 leading-tight"
          >
            Digital Health Forward: Innovate, Connect, and Lead.
          </h1>

          {/* Description */}
          <p
            className="font-sans font-light text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Your ideas deserve a platform. We partner with you to build more than just a website; we create a complete digital ecosystem.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              onClick={() => setIsProjectModalOpen(true)}
              className="bg-maroon text-cream hover:bg-maroon-dark px-8 py-4 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              size="lg"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Link href="/Sehatlings-Leaping-Healthcare-Advancement.pdf" target="_blank" rel="noopener noreferrer">
              <Button
                className="border-2 border-maroon text-maroon hover:bg-maroon hover:text-cream px-8 py-4 text-base font-semibold rounded-full transition-all duration-300 flex items-center gap-2"
                variant="outline"
                size="lg"
              >
                <Eye className="w-4 h-4" />
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-t border-b border-gray-200 py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: Building2,
                number: 11,
                suffix: "+",
                label: "Healthcare Projects"
              },
              {
                icon: Users,
                number: 4,
                suffix: "+",
                label: "Healthcare Organizations Served"
              }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center"
                data-animate
              >
                {/* Icon */}
                <div
                  className="flex justify-center mb-3"
                >
                  <stat.icon className="w-10 h-10 text-maroon" strokeWidth={2} />
                </div>

                {/* Number with Counter Animation */}
                <div
                  className="mb-1"
                >
                  <Counter target={stat.number} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p
                  className="font-sans text-xs text-gray-600 uppercase tracking-wide"
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Technology Services */}
      <section className="bg-cream py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div data-animate className="scroll-fade-up text-center mb-16">
            <p className="font-sans font-bold text-xs uppercase tracking-widest text-maroon mb-4">
              OUR SERVICES
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
              Our Technology Services
            </h2>
            <p className="font-sans font-light text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive technology solutions designed specifically for healthcare organizations,
              ensuring compliance, security, and optimal performance.
            </p>
          </div>

          {/* Services Grid */}
          <div data-animate className="scroll-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Custom Software Development */}
            <div
              className="bg-white rounded-2xl border border-gray-200 p-8 shadow-soft hover:shadow-dramatic hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-maroon/10 rounded-xl flex items-center justify-center mb-6">
                <Code className="w-7 h-7 text-maroon" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-3">
                Custom Software Development
              </h3>
              <p className="font-sans font-light text-gray-600 mb-4 leading-relaxed">
                Building bespoke applications tailored to your unique healthcare challenges.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Healthcare-specific web and mobile applications</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Electronic Health Record (EHR) systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Patient management platforms</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Telemedicine solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">API development and integration</span>
                </li>
              </ul>
            </div>

            {/* Health AI & ML Integration */}
            <div
              className="bg-white rounded-2xl border border-gray-200 p-8 shadow-soft hover:shadow-dramatic hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-maroon/10 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-maroon" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-3">
                Health AI & ML Integration
              </h3>
              <p className="font-sans font-light text-gray-600 mb-4 leading-relaxed">
                Implementing intelligent systems for predictive analytics, personalized medicine, and operational optimization.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Diagnostic AI and medical imaging analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Predictive health analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Natural language processing for medical records</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Drug discovery and research assistance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Clinical decision support systems</span>
                </li>
              </ul>
            </div>

            {/* Social Marketing & Design */}
            <div
              className="bg-white rounded-2xl border border-gray-200 p-8 shadow-soft hover:shadow-dramatic hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-maroon/10 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-7 h-7 text-maroon" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-3">
                Social Marketing & Design
              </h3>
              <p className="font-sans font-light text-gray-600 mb-4 leading-relaxed">
                Project Description, 4 posts a week, Managing of Socials Posting and Scheduling, and Creative Designs.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Social media strategy and planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">4 posts per week content creation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Social media management and scheduling</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Creative design and branding</span>
                </li>
              </ul>
            </div>

            {/* Website Designing */}
            <div
              className="bg-white rounded-2xl border border-gray-200 p-8 shadow-soft hover:shadow-dramatic hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-maroon/10 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-maroon" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-3">
                Website Designing
              </h3>
              <p className="font-sans font-light text-gray-600 mb-4 leading-relaxed">
                Health Stakeholder Focused Website, upto 20+ Pages Dynamic Website, Basic SEO, Wireframe to High Fidelity Process.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Healthcare stakeholder-focused design</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Up to 20+ dynamic pages</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Basic SEO optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Wireframe to high fidelity design process</span>
                </li>
              </ul>
            </div>

            {/* Mobile Health Solutions */}
            <div
              className="bg-white rounded-2xl border border-gray-200 p-8 shadow-soft hover:shadow-dramatic hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-maroon/10 rounded-xl flex items-center justify-center mb-6">
                <Smartphone className="w-7 h-7 text-maroon" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-3">
                Mobile Health Solutions
              </h3>
              <p className="font-sans font-light text-gray-600 mb-4 leading-relaxed">
                Patient-centric mobile applications that improve engagement and health outcomes.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Patient portal mobile apps</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Telemedicine mobile platforms</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Health monitoring and wearables integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Provider mobile solutions</span>
                </li>
              </ul>
            </div>

            {/* Data Analytics & BI */}
            <div
              className="bg-white rounded-2xl border border-gray-200 p-8 shadow-soft hover:shadow-dramatic hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-maroon/10 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-maroon" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-3">
                Data Analytics & BI
              </h3>
              <p className="font-sans font-light text-gray-600 mb-4 leading-relaxed">
                Transform healthcare data into actionable insights for better decision-making.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Clinical analytics dashboards</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Population health analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Operational efficiency metrics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                  <span className="font-sans text-sm text-gray-700">Predictive modeling and forecasting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Healthcare Leaders */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Trusted by Healthcare Leaders
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We&apos;ve partnered with innovative healthcare organizations to deliver transformative
              technology solutions that improve patient outcomes and operational efficiency.
            </p>
          </div>
        </div>

        {/* Moving Testimonials */}
        <div data-animate
          className="scroll-fade-up relative overflow-hidden group py-12"
        >
          {(() => {
            const testimonials = [
              {
                company: "GVON",
                industry: "Medical Body – International Community",
                project: "",
                avatar: "GV",
                quote: "We deeply appreciate the team's dedication and professionalism throughout this project. Their ability to engage our stakeholders in a timely and consistent manner ensured smooth progress and a successful outcome. It was reassuring to see such commitment at every stage.",
                result: ""
              },
              {
                company: "MESTRO",
                industry: "Medical Journal Website",
                project: "",
                avatar: "ME",
                quote: "The team delivered exactly as promised, completing the website on schedule without compromising on quality. Their reliability and focus on meeting deadlines gave us the confidence that we were in capable hands.",
                result: ""
              },
              {
                company: "NexTek Healthcare",
                industry: "Medical Equipment Distribution",
                project: "",
                avatar: "NH",
                quote: "Working with the team has been an excellent experience. Their professionalism, attention to detail, and unwavering commitment to our goals made the collaboration seamless. We truly value their dedication and the results they helped us achieve.",
                result: ""
              }
            ];

            return (
              <div
                className="flex gap-6 will-change-transform marquee-track"
                style={{
                  animationName: 'marquee-x',
                  animationDuration: `${marqueeDuration}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                }}
              >
                {[0, 1].map((dupIndex) => (
                  <div key={dupIndex} className="flex gap-6">
                    {Array.from({ length: 3 }).map((_, repeatIndex) => (
                      <div key={`set-${dupIndex}-${repeatIndex}`} className="flex gap-6">
                        {testimonials.map((testimonial, index) => (
                          <div
                            key={`${dupIndex}-${repeatIndex}-${index}`}
                            className="flex-shrink-0 w-96 bg-white rounded-2xl shadow-xl border-2 border-primary/20 p-8 mx-3 hover:shadow-2xl hover:border-primary/40 hover:z-10 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 relative"
                          >
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                {testimonial.avatar}
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{testimonial.company}</h3>
                                <p className="text-sm text-gray-600">{testimonial.industry}</p>
                              </div>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                              {testimonial.project}
                            </div>
                            <div className="mb-6">
                              <Quote className="w-8 h-8 text-primary/20 mb-3" />
                              <p className="text-gray-700 leading-relaxed italic">&quot;{testimonial.quote}&quot;</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Our Technology Stack */}
      <section className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div data-animate className="scroll-fade-up text-center mb-16">
            <p className="font-sans font-bold text-xs uppercase tracking-widest text-maroon mb-4">
              TECHNOLOGY STACK
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
              Our Technology Stack
            </h2>
            <p className="font-sans font-light text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Cutting-edge tools for modern healthcare solutions
            </p>
          </div>

          {/* Technology Categories Grid */}
          <div data-animate className="scroll-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Frontend Technologies */}
            <div className="bg-cream rounded-2xl border border-gray-200 p-8 shadow-soft">
              <Code className="w-10 h-10 text-maroon mb-4" />
              <h3 className="font-serif text-2xl text-charcoal mb-6">Frontend</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  "Vue.js",
                  "Angular",
                  "TypeScript",
                  "Next.js",
                  "Tailwind CSS"
                ].map((tech) => (
                  <div
                    key={tech}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 font-sans text-sm text-charcoal hover:scale-105 hover:shadow-md hover:border-maroon transition-all duration-300"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Backend & APIs */}
            <div className="bg-cream rounded-2xl border border-gray-200 p-8 shadow-soft">
              <Server className="w-10 h-10 text-maroon mb-4" />
              <h3 className="font-serif text-2xl text-charcoal mb-6">Backend & APIs</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Node.js",
                  "Python",
                  "Java",
                  "GraphQL",
                  "REST APIs",
                  "Microservices"
                ].map((tech) => (
                  <div
                    key={tech}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 font-sans text-sm text-charcoal hover:scale-105 hover:shadow-md hover:border-maroon transition-all duration-300"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* AI & Machine Learning */}
            <div className="bg-cream rounded-2xl border border-gray-200 p-8 shadow-soft">
              <Brain className="w-10 h-10 text-maroon mb-4" />
              <h3 className="font-serif text-2xl text-charcoal mb-6">AI & Machine Learning</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "TensorFlow",
                  "PyTorch",
                  "scikit-learn",
                  "OpenCV",
                  "NLP"
                ].map((tech) => (
                  <div
                    key={tech}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 font-sans text-sm text-charcoal hover:scale-105 hover:shadow-md hover:border-maroon transition-all duration-300"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-maroon-dark to-maroon py-32 md:py-40">
        <div className="mx-auto max-w-4xl px-6 text-center">

          {/* Main Heading */}
          <h2
            className="font-serif text-4xl md:text-5xl text-cream mb-6 leading-tight"
            data-animate
          >
            Ready to Transform Your Healthcare Technology?
          </h2>

          {/* Subtext */}
          <p
            className="font-sans font-light text-xl text-cream/80 max-w-3xl mx-auto mb-10 leading-relaxed"
            data-animate
          >
            Let&apos;s discuss how our technology solutions can help your organization achieve
            better patient outcomes and operational excellence.
          </p>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            data-animate
          >
            {/* Schedule Consultation Button */}
            <Link href="/contact">
              <Button
                className="bg-cream text-maroon hover:bg-cream/90 px-6 py-3 text-base font-semibold rounded-full shadow-dramatic transition-all duration-300 flex items-center gap-2"
              >
                Schedule Consultation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* Project Inquiry Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4 animate-fadeIn">
          <div
            className="bg-cream rounded-2xl shadow-dramatic max-w-md w-full max-h-[90vh] overflow-y-auto animate-modalPop"
          >
            {/* Modal Header */}
            <div className="px-6 py-8 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-3xl text-charcoal">Start Your Project</h2>
                  <p className="font-sans text-gray-600 mt-1">Tell us about your project and we&apos;ll get back to you within 24 hours.</p>
                </div>
                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitPI(onProjectSubmit)} className="px-6 py-8 space-y-6">
              <div>
                <Label htmlFor="pi-name" className="mb-2 block text-maroon">Full Name *</Label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    id="pi-name"
                    {...registerPI("name")}
                    placeholder="Enter your full name"
                    className={`${errorsPI.name ? "border-red-500" : nameValue ? "border-maroon focus-visible:ring-maroon/30" : ""} pl-10`}
                  />
                </div>
                {errorsPI.name && (
                  <p className="text-sm text-red-600 mt-1">{errorsPI.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="pi-email" className="mb-2 block text-maroon">Email Address *</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    id="pi-email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errorsPI.email}
                    {...registerPI("email")}
                    placeholder="Enter your email address"
                    className={`${errorsPI.email ? "border-red-500" : emailPIValue ? "border-maroon focus-visible:ring-maroon/30" : ""} pl-10`}
                  />
                </div>
                {errorsPI.email && (
                  <p className="text-sm text-red-600 mt-1">{errorsPI.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="pi-phone" className="mb-2 block text-maroon">Phone Number *</Label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    id="pi-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    aria-invalid={!!errorsPI.phone}
                    {...registerPI("phone")}
                    placeholder="Enter your phone number"
                    className={`${errorsPI.phone ? "border-red-500" : phonePIValue ? "border-maroon focus-visible:ring-maroon/30" : ""} pl-10`}
                  />
                </div>
                {errorsPI.phone && (
                  <p className="text-sm text-red-600 mt-1">{errorsPI.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="pi-project-details" className="mb-2 block text-maroon">Project Details *</Label>
                <div className="relative">
                  <FileCode className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <Textarea
                    id="pi-project-details"
                    {...registerPI("projectDetails")}
                    placeholder="Tell us about your project, requirements, timeline, and any specific needs..."
                    rows={4}
                    className={`${errorsPI.projectDetails ? "border-red-500" : projectDetailsValue ? "border-maroon focus-visible:ring-maroon/30" : ""} pl-10 resize-none`}
                  />
                </div>
                {errorsPI.projectDetails && (
                  <p className="text-sm text-red-600 mt-1">{errorsPI.projectDetails.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={projectSubmitStatus === 'loading' || !isValidPI}
                className="w-full bg-maroon hover:bg-maroon-dark disabled:opacity-50 text-cream font-semibold rounded-full"
              >
                {projectSubmitStatus === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin mr-2"></div>
                    Sending Inquiry...
                  </>
                ) : (
                  'Send Project Inquiry'
                )}
              </Button>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}


