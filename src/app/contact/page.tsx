"use client";
import { Phone, Mail, MapPin, Loader2, User, ArrowRight, Check } from "lucide-react";
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
    <main key="contact" className="bg-cream min-h-screen pt-24 md:pt-32 pb-20 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-maroon/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-maroon/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 scroll-fade-up" data-animate>
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium uppercase tracking-widest mb-6 bg-maroon/10 text-maroon border border-maroon/20">
            Get In Touch
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-6 leading-tight">
            Let&apos;s Start a Conversation
          </h1>
          <p className="font-sans font-light text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re looking for innovative health solutions or just want to explore possibilities, we&apos;re here to listen and help.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info Side */}
          <div className="lg:col-span-2 space-y-6 scroll-stagger" data-animate>
            {/* Phone Card */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-soft hover:shadow-dramatic transition-all duration-300 group">
              <div className="w-12 h-12 bg-maroon/10 rounded-xl flex items-center justify-center text-maroon mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-2">Call Us</h3>
              <p className="text-gray-600 font-light mb-1">+92 336 2844276</p>
              <p className="text-sm text-gray-400">Mon-Fri 9AM-6PM PST</p>
            </div>

            {/* Email Card */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-soft hover:shadow-dramatic transition-all duration-300 group">
              <div className="w-12 h-12 bg-maroon/10 rounded-xl flex items-center justify-center text-maroon mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-2">Email Us</h3>
              <p className="text-gray-600 font-light mb-1">contact@sehatlings.com</p>
              <p className="text-sm text-gray-400">Response within 6 hours</p>
            </div>

            {/* Location Card */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-soft hover:shadow-dramatic transition-all duration-300 group">
              <div className="w-12 h-12 bg-maroon/10 rounded-xl flex items-center justify-center text-maroon mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-2">Visit Us</h3>
              <p className="text-gray-600 font-light mb-1">Karachi, Pakistan</p>
              <p className="text-sm text-gray-400">Main Headquarters</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3 scroll-fade-up h-full" data-animate>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-dramatic border border-gray-100 h-full flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">Send us a message</h2>
                <p className="font-sans text-gray-600 font-light">
                  Fill out the form below and our team will get back to you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-charcoal font-medium pl-1">Full Name <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="fullName"
                        {...register("fullName")}
                        placeholder="John Doe"
                        className={`pl-10 h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-maroon focus:ring-maroon/20 ${errors.fullName ? "border-red-500 bg-red-50" : fullNameValue ? "border-green-500 bg-green-50/50" : ""}`}
                      />
                    </div>
                    {errors.fullName && <p className="text-sm text-red-500 pl-1">{errors.fullName.message}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-charcoal font-medium pl-1">Phone Number <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="phoneNumber"
                        type="tel"
                        {...register("phoneNumber")}
                        placeholder="+92 300 0000000"
                        className={`pl-10 h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-maroon focus:ring-maroon/20 ${errors.phoneNumber ? "border-red-500 bg-red-50" : phoneValue ? "border-green-500 bg-green-50/50" : ""}`}
                      />
                    </div>
                    {errors.phoneNumber && <p className="text-sm text-red-500 pl-1">{errors.phoneNumber.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="emailAddress" className="text-charcoal font-medium pl-1">Email Address <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="emailAddress"
                        type="email"
                        {...register("emailAddress")}
                        placeholder="john@example.com"
                        className={`pl-10 h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-maroon focus:ring-maroon/20 ${errors.emailAddress ? "border-red-500 bg-red-50" : emailValue ? "border-green-500 bg-green-50/50" : ""}`}
                      />
                    </div>
                    {errors.emailAddress && <p className="text-sm text-red-500 pl-1">{errors.emailAddress.message}</p>}
                  </div>

                  {/* Reason */}
                  <div className="space-y-2">
                    <Label htmlFor="reason" className="text-charcoal font-medium pl-1">Reason to Connect <span className="text-red-500">*</span></Label>
                    <select
                      id="reason"
                      {...register("reason")}
                      className={`flex h-12 w-full items-center justify-between rounded-xl border border-transparent bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:bg-white focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 disabled:cursor-not-allowed disabled:opacity-50 ${errors.reason ? "border-red-500 bg-red-50" : ""}`}
                    >
                      <option value="">Select a topic...</option>
                      <option value="Muaina">Muaina</option>
                      <option value="Tech House">Tech House</option>
                      <option value="Lab Inspection">Lab Inspection</option>
                      <option value="Bootcamps">Bootcamps</option>
                      <option value="Team">Team</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.reason && <p className="text-sm text-red-500 pl-1">{errors.reason.message}</p>}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-charcoal font-medium pl-1">Your Message</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Tell us about your requirements..."
                    rows={5}
                    className="rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-maroon focus:ring-maroon/20 resize-none p-4"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitStatus === 'loading' || !isValid}
                  className="w-full bg-maroon hover:bg-maroon-dark text-cream h-14 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Message Sent Successfully
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 text-green-700 rounded-xl text-center text-sm font-medium"
                  >
                    Thank you! We have received your message and will get back to you shortly.
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
