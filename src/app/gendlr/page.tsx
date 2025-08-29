"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, Brain, Route, TrendingUp, Zap, CheckCircle, Stethoscope, X, Mail, Phone, MapPin, Building, User } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import validator from "validator";



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
  industry: z.string()
    .min(1, 'Please select an industry'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine((val) => validator.isMobilePhone(val.replace(/\s/g, ''), 'any', { strictMode: false }), 
      'Please enter a valid phone number'),
});

type EarlyAccessData = z.infer<typeof earlyAccessSchema>;

export default function GendlrPage() {
  useScrollAnimation();
  const [doctorSrc, setDoctorSrc] = useState("/doctorai.webp");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const [earlyAccessSubmitStatus, setEarlyAccessSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<LabRegistrationData>({
    resolver: zodResolver(labRegistrationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
  });

  // Watch values for real-time visual feedback
  const labNameValue = watch("labName");
  const contactNameValue = watch("contactName");
  const emailValue = watch("email");
  const phoneValue = watch("phone");
  const addressValue = watch("address");

  // Early Access Form with Zod validation
  const {
    register: registerEA,
    handleSubmit: handleSubmitEA,
    watch: watchEA,
    formState: { errors: errorsEA, isValid: isValidEA },
    reset: resetEA,
    setValue: setValueEA,
  } = useForm<EarlyAccessData>({
    resolver: zodResolver(earlyAccessSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
  });

  // Watch values for early access form
  const nameValue = watchEA("name");
  const emailEAValue = watchEA("email");
  const industryValue = watchEA("industry");
  const phoneEAValue = watchEA("phone");

  // Prevent background scroll when modal is open (helps mobile UX)
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
      const subject = encodeURIComponent('Lab Registration - ' + data.labName);
      const body = encodeURIComponent(
        `Lab Registration Details:\n\n` +
        `Lab Name: ${data.labName}\n` +
        `Lab Director/Primary Contact: ${data.contactName}\n` +
        `Email Address: ${data.email}\n` +
        `Phone Number: ${data.phone}\n` +
        `Lab Address: ${data.address}\n\n` +
        `This registration was submitted through the GENDLR platform.`
      );
      
      window.location.href = `mailto:sehatlings@gmail.com?subject=${subject}&body=${body}`;
      setSubmitStatus('success');
      reset();
      
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const onEarlyAccessSubmit = async (data: EarlyAccessData) => {
    setEarlyAccessSubmitStatus('loading');
    
    try {
      const subject = encodeURIComponent('Early Access Registration - ' + data.name);
      const body = encodeURIComponent(
        `Early Access Registration Details:\n\n` +
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Industry: ${data.industry}\n` +
        `Phone: ${data.phone}\n\n` +
        `This registration was submitted through the GENDLR Early Access form.`
      );
      
      window.location.href = `mailto:sehatlings@gmail.com?subject=${subject}&body=${body}`;
      setEarlyAccessSubmitStatus('success');
      resetEA();
      
      setTimeout(() => {
        setIsEarlyAccessModalOpen(false);
        setEarlyAccessSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Early access form submission error:', error);
      setEarlyAccessSubmitStatus('error');
      setTimeout(() => setEarlyAccessSubmitStatus('idle'), 5000);
    }
  };

  return (
    <main key="gendlr">
      {/* Hero Section */}
      <section className="bg-primary pt-28 md:pt-32 lg:pt-36 pb-20 lg:pb-32 relative overflow-hidden">

        <div data-animate className="scroll-fade-up mx-auto max-w-4xl px-6 text-center relative z-10">
          
          {/* End-User Solution Badge */}
          <span data-animate className="scroll-fade-up inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium uppercase tracking-wider mb-8" style={{transitionDelay: '0.2s'}}>
            <Zap className="w-4 h-4 mr-2" />
            End-User Solution
          </span>

          {/* Main Heading */}
          <h1 data-animate className="scroll-fade-up text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase" style={{transitionDelay: '0.4s'}}>
            GENDLR
          </h1>

          {/* Divider Line */}
          <div data-animate className="scroll-fade-up w-20 h-1 bg-white/60 mx-auto mb-8" style={{transitionDelay: '0.6s'}}></div>

          {/* Subheading */}
          <h2 data-animate className="scroll-fade-up text-xl md:text-2xl text-white/90 font-medium mb-8" style={{transitionDelay: '0.8s'}}>
            AI Powered Pathologist Assistant to Patient Journey Optimizer
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed" >
            Get ready for a new era of patient care. GENDLR is an AI-powered platform designed to 
            optimize every step of the patient journey, from initial diagnosis to post-treatment follow-up. 
            It's not just a tool; it's the future of intelligent healthcare management.
          </p>

          {/* Action Button */}
          <div className="flex justify-center" >
            <Button 
              onClick={() => setIsEarlyAccessModalOpen(true)}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-8 py-4 text-base font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
              size="lg"
            >
              Register for Early Access
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div data-animate className="scroll-fade-up text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Revolutionizing Patient Care Through AI
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Advanced AI technology transforming healthcare delivery and patient experiences
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div data-animate className="scroll-fade-left">
            
            {/* Features List */}
            <div data-animate className="scroll-stagger space-y-4">
              {[
                "Reduce patient wait times by up to 40%",
                "Improve treatment outcomes through predictive analytics",
                "Streamline healthcare provider workflows",
                "Enhance patient satisfaction and engagement",
                "Optimize resource allocation and reduce costs",
                "Enable data-driven clinical decision making"
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-4" >
                  {/* Checkmark */}
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  {/* Feature Content */}
                  <div className="flex-1">
                    <p className="text-black/70 leading-relaxed">
                      {feature}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div data-animate className="scroll-fade-right">
            <div className="h-80 w-full rounded-xl overflow-hidden relative bg-muted/30">
              <Image
                src={doctorSrc}
                alt="Doctor AI"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
                onError={() => setDoctorSrc("/doctorai.webp")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Powerful Features Section */}
      <section data-animate className="scroll-fade-up bg-primary py-20 lg:py-32 relative overflow-hidden">

        <div className="mx-auto max-w-7xl px-6 relative z-10"   >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" >
              Powerful Features
            </h2>
            <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed" >
              GENDLR is built with cutting-edge AI technology and designed specifically for the complex needs 
              of modern healthcare organizations.
            </p>
          </div>

          {/* Features Grid */}
          <div data-animate className="scroll-stagger grid grid-cols-1 md:grid-cols-2 gap-8" >
            {/* Feature 1 - AI-Powered Insights */}
            <div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 group hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">AI-Powered Insights</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                Advanced machine learning algorithms analyze patient data to provide real-time, 
                actionable insights for healthcare providers.
              </p>
            </div>

            {/* Feature 2 - Patient Journey Mapping */}
            <div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 group hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Route className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Patient Journey Mapping</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                Comprehensive tracking and optimization of every touchpoint in the patient experience, 
                from initial contact to post-treatment follow-up.
              </p>
            </div>

            {/* Feature 3 - Predictive Analytics */}
            <div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 group hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Predictive Analytics</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                Leverage historical data and current trends to predict patient outcomes 
                and optimize treatment protocols.
              </p>
            </div>

            {/* Feature 4 - Real-Time Optimization */}
            <div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 group hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Real-Time Optimization</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                Continuous monitoring and adjustment of care pathways to ensure optimal 
                patient outcomes and resource utilization.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Join the Healthcare Revolution CTA */}
      <section data-animate className="scroll-fade-up bg-white py-20 lg:py-32 relative overflow-hidden">

        <div className="mx-auto max-w-4xl px-6 text-center relative z-10"   >
          {/* Stethoscope Icon */}
          <div className="flex justify-center mb-8" >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-sm">
              <Stethoscope className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6" >
            Join the Healthcare Revolution
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed" >
            Be among the first to experience the future of patient care. Early adopters will 
            receive exclusive benefits and priority support.
          </p>

          {/* Action Button */}
          <div className="flex justify-center" >
            <Button 
              asChild
              className="bg-primary text-white hover:bg-primary/90 px-8 py-4 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              size="lg"
            >
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2"
              >
                Register for B2B Solution
                <ArrowRight className="w-4 h-4" />
              </button>
            </Button>
          </div>
        </div>
      </section>

      {/* Lab Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4 animate-fadeIn">
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-modalPop"
          >
            {/* Modal Header */}
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

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Registration successful!</span>
                </div>
                <p className="text-sm text-green-700 mt-1">We'll contact you within 24 hours to get started.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-800">
                  <X className="w-5 h-5" />
                  <span className="font-medium">Registration failed</span>
                </div>
                <p className="text-sm text-red-700 mt-1">Please try again or contact us directly.</p>
              </div>
            )}

            {/* Modal Body */}
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 space-y-4">
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
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-modalPop"
          >
            {/* Modal Header */}
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

            {/* Status Messages */}
            {earlyAccessSubmitStatus === 'success' && (
              <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Registration successful!</span>
                </div>
                <p className="text-sm text-green-700 mt-1">Thank you for your interest. We'll be in touch soon!</p>
              </div>
            )}
            
            {earlyAccessSubmitStatus === 'error' && (
              <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-800">
                  <X className="w-5 h-5" />
                  <span className="font-medium">Registration failed</span>
                </div>
                <p className="text-sm text-red-700 mt-1">Please try again or contact us directly.</p>
              </div>
            )}

            {/* Modal Body */}
            <form onSubmit={handleSubmitEA(onEarlyAccessSubmit)} className="px-6 py-8 space-y-4">
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


