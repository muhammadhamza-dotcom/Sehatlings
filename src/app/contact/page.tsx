"use client";
import { Phone, Mail, MapPin, Loader2, User } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import validator from "validator";



const contactFormSchema = z.object({
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(val => val.trim()),
  phoneNumber: z.string()
    .min(1, 'Phone number is required')
    .refine((val) => validator.isMobilePhone(val.replace(/\s/g, ''), 'any', { strictMode: false }), 
      'Please enter a valid phone number'),
  emailAddress: z.string()
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
  reason: z.string().min(1, 'Please select a reason'),
  message: z.string()
    .max(1000, 'Message must be less than 1000 characters')
    .transform(val => val.trim())
    .optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  useScrollAnimation();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
  });

  // Watch values for realtime valid-state styling
  const fullNameValue = watch("fullName");
  const phoneValue = watch("phoneNumber");
  const emailValue = watch("emailAddress");

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };
  return (
    <main key="contact" className="bg-white min-h-screen pt-24 md:pt-28 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 hidden 2xl:block">
        {/* Top Left Area */}
        <motion.div
          className="absolute top-32 left-16 w-20 h-20 bg-primary/10 rounded-2xl rotate-12"
          animate={{
            y: [0, -15, 0],
            rotate: [12, 24, 12]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        
        {/* Right Side */}
        <motion.div
          className="absolute top-1/2 right-16 w-16 h-16 bg-primary/10 rounded-3xl rotate-45"
          animate={{ 
            y: [0, -10, 0],
            rotate: [45, 60, 45],
            x: [0, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Bottom Left */}
        <motion.div
          className="absolute bottom-32 left-24 w-14 h-14 bg-primary/10 rounded-xl"
          animate={{ 
            x: [0, 15, 0],
            y: [0, -12, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        
        {/* Bottom Right */}
        <motion.div
          className="absolute bottom-20 right-20 w-10 h-10 bg-primary/10 rounded-full"
          animate={{ 
            y: [0, -18, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        
      </div>

      <section data-animate className="scroll-fade-up mx-auto max-w-7xl px-6 py-16 w-full relative z-10">
        {/* Header */}
        <div className="max-w-5xl mx-auto">
          <h1 data-animate className="scroll-fade-up text-3xl md:text-4xl font-bold text-gray-900">
            Let&apos;s Get In Touch
          </h1>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6" >
            <div className="flex items-start gap-3" >
              <span className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </span>
              <div>
                <p className="text-sm text-gray-900">+92 3362844276</p>
                <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM PST</p>
              </div>
            </div>
            <div className="flex items-start gap-3" >
              <span className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </span>
              <div>
                <p className="text-sm text-gray-900">contact@sehatlings.com</p>
                <p className="text-sm text-gray-500">We respond within 6 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-3" >
              <span className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </span>
              <div>
                <p className="text-sm text-gray-900">Karachi</p>
                <p className="text-sm text-gray-500">Pakistan</p>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-200" />
        </div>

        {/* Form Card */}
        <div className="mx-auto mt-8 max-w-5xl" >
          <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Or fill out the form below</h2>
            <p className="mt-1 text-sm text-black/60">We typically respond within 6 hours.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Reason (Select) */}
                <div>
                  <Label htmlFor="reason" className="mb-2 block">Reason to Connect *</Label>
                  <select 
                    id="reason" 
                    {...register("reason")}
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.reason ? "border-red-500" : ""}`}
                  >
                    <option value="">Select a service or reason</option>
                    <option value="GENDLR">GENDLR</option>
                    <option value="Tech House">Tech House</option>
                    <option value="Lab Inspection">Lab Inspection</option>
                    <option value="Bootcamps">Bootcamps</option>
                    <option value="Team">Team</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.reason && (
                    <p className="text-sm text-red-600 mt-1">{errors.reason.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="emailAddress" className="mb-2 block">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      id="emailAddress" 
                      type="email"
                      autoComplete="email"
                      aria-invalid={!!errors.emailAddress}
                      {...register("emailAddress")}
                      placeholder="Enter your email address" 
                      className={`${errors.emailAddress ? "border-red-500" : emailValue ? "border-green-500 focus-visible:ring-green-500/30" : ""} pl-9`}
                    />
                  </div>
                  {errors.emailAddress && (
                    <p className="text-sm text-red-600 mt-1">{errors.emailAddress.message}</p>
                  )}
                </div>

                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName" className="mb-2 block">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      id="fullName" 
                      autoComplete="name"
                      aria-invalid={!!errors.fullName}
                      {...register("fullName")}
                      placeholder="Enter your full name" 
                      className={`${errors.fullName ? "border-red-500" : fullNameValue ? "border-green-500 focus-visible:ring-green-500/30" : ""} pl-9`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phoneNumber" className="mb-2 block">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      id="phoneNumber" 
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      aria-invalid={!!errors.phoneNumber}
                      {...register("phoneNumber")}
                      placeholder="Enter your phone number" 
                      className={`${errors.phoneNumber ? "border-red-500" : phoneValue ? "border-green-500 focus-visible:ring-green-500/30" : ""} pl-9`}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-sm text-red-600 mt-1">{errors.phoneNumber.message}</p>
                  )}
                </div>

                {/* Message - full width */}
                <div className="md:col-span-2">
                  <Label htmlFor="message" className="mb-2 block">Message</Label>
                  <Textarea 
                    id="message" 
                    {...register("message")}
                    placeholder="Enter your message here..." 
                    rows={5}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={submitStatus === 'loading' || !isValid}
                className="w-full bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
              >
                {submitStatus === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
              <p className="text-xs text-black/50 text-right">We will contact you within 6 business hours.</p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}









