"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Brain, Crown, Rocket, Clock, X, User, Mail, Phone, Building, Lightbulb, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";



export default function ProgramsPage() {
  useScrollAnimation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Create email content
    const emailContent = `
Professional Development Program Application

Personal Information:
- Full Name: ${formData.get('fullName')}
- Email: ${formData.get('email')}
- Contact Number: ${formData.get('contactNumber')}

Professional Information:
- Current Role/Title: ${formData.get('currentRole')}
- Current Organization: ${formData.get('currentOrganization')}
- Program Interest: ${formData.get('programInterest')}
- Planned KPIs: ${formData.get('plannedKPIs')}
    `;

    // Create mailto link
    const subject = encodeURIComponent('Professional Development Program Application');
    const body = encodeURIComponent(emailContent);
    const mailtoLink = `mailto:sehatlings@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Close modal
    setIsModalOpen(false);
  };

  return (
    <main key="programs">
      {/* Hero section with background image + white overlay */}
      <section className="relative h-[70vh] min-h-[560px] w-full overflow-hidden pt-16 md:pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bootcamp2.webp')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-white/70" aria-hidden />
        <div className="relative z-10 h-full flex items-start justify-center px-6 pt-20 md:pt-32">
          <div data-animate className="scroll-fade-up max-w-4xl text-center">
            <span data-animate className="scroll-fade-up inline-block px-4 py-2 rounded-full text-sm font-bold tracking-wide mb-4 bg-primary/10 text-primary border border-primary/20 shadow-sm" style={{transitionDelay: '0.2s'}}>
              Professional Development
            </span>
            <h1 data-animate className="scroll-fade-up text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900" style={{transitionDelay: '0.4s'}}>
              <span className="text-primary">Transformational </span>
              <span>Programs</span>
            </h1>
            <p data-animate className="scroll-fade-up mt-5 text-base md:text-lg text-black/70 leading-relaxed" style={{transitionDelay: '0.6s'}}>
              Accelerate your career with intensive, hands-on training programs designed for healthcare
              professionals. From leadership excellence to AI mastery and startup success.
            </p>
            <div data-animate className="scroll-fade-up mt-8 flex flex-col sm:flex-row gap-4 justify-center" style={{transitionDelay: '0.8s'}}>
              <Link
                href="#programs"
                className="inline-flex items-center justify-center bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
              >
                Explore Programs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center bg-white text-primary border border-primary/20 font-semibold px-6 py-3 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-colors"
              >
                Let&apos;s Design a Program
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section key="programs-section" id="programs" data-animate className="scroll-stagger mx-auto max-w-7xl px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 data-animate className="scroll-fade-up text-3xl md:text-4xl font-bold">Three Transformative Programs</h2>
          <p data-animate className="scroll-fade-up mt-3 text-black/60" style={{transitionDelay: '0.2s'}}>
            Choose the program that aligns with your career goals and transform your healthcare
            expertise.
          </p>
        </div>

        <div data-animate className="scroll-stagger mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Leadership Program */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:border-primary/40 transition-colors text-center" >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Crown className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-semibold">Healthcare Leadership Program</h3>
            </div>
            <p className="text-primary font-medium">Transform into a Healthcare Leader</p>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-black/60">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>4 Weeks</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <span className="inline-flex items-center justify-center bg-gray-100 text-gray-600 font-semibold px-5 py-2 rounded-lg cursor-not-allowed">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Healthcare AI Leadership Fellowship */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:border-primary/40 transition-colors text-center" >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-semibold">Healthcare AI Leadership Fellowship</h3>
            </div>
            <p className="text-primary font-medium">Lead AI Innovation in Healthcare</p>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-black/60">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>8 Weeks</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <span className="inline-flex items-center justify-center bg-gray-100 text-gray-600 font-semibold px-5 py-2 rounded-lg cursor-not-allowed">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Idea to MVP Program */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:border-primary/40 transition-colors text-center" >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Rocket className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-semibold">Idea to MVP Program</h3>
            </div>
            <p className="text-primary font-medium">Build Your Startup</p>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-black/60">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>5 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Hybrid</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <span className="inline-flex items-center justify-center bg-gray-100 text-gray-600 font-semibold px-5 py-2 rounded-lg cursor-not-allowed">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="bg-gray-50 py-16">
        <div key="success-story" data-animate className="scroll-fade-up mx-auto max-w-7xl px-6">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 data-animate className="scroll-fade-up text-3xl md:text-4xl font-bold text-gray-900">Success Story</h2>
            <p data-animate className="scroll-fade-up mt-3 text-black/60" style={{transitionDelay: '0.2s'}}>
              Real impact from our transformational programs
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_-10px_25px_-5px_rgba(0,0,0,0.1)] p-8 md:p-12" >
            {/* Stars and Logo and Collaboration */}
            <div className="text-center mb-8">
              {/* 5 Stars */}
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="flex items-center justify-center mb-4">
                <Image 
                  src="/akuh.webp" 
                  alt="AKuH Hospital" 
                  className="h-16 w-auto"
                  width={120}
                  height={64}
                />
              </div>
              <p className="text-sm text-gray-600 font-medium">
                In collaboration with Global Village Oncology Network
              </p>
            </div>

            {/* Description */}
            <div className="text-center">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                Sehatlings successfully facilitated <span className="font-semibold text-primary">7 workshops</span> on the essential skills that a doctor possesses to develop leadership skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-16">
        <div key="call-to-action" data-animate className="scroll-fade-up mx-auto max-w-4xl px-6 text-center">
          <h2 data-animate className="scroll-fade-up text-3xl md:text-4xl font-bold text-white">
            Ready to Transform Your Career?
          </h2>
          <p data-animate className="scroll-fade-up mt-4 text-lg text-white/80 leading-relaxed" style={{transitionDelay: '0.2s'}}>
            Join hundreds of healthcare professionals who have accelerated their careers through our intensive programs.
          </p>

          <div className="mt-8 flex justify-center" >
            <a
              href="tel:+923362844276"
              className="inline-flex items-center justify-center bg-white/10 text-white border border-white/30 font-semibold px-6 py-3 rounded-xl hover:bg-white/15 transition-colors"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </section>

      {/* Professional Development Program Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="px-6 pt-10 pb-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Professional Development Program</h2>
                  <p className="text-gray-600 mt-1">Register to enhance your skills and advance your career accordingly today&apos;s demand.</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                        placeholder="Enter your contact number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentRole" className="block text-sm font-medium text-gray-700 mb-2">
                      Current Role/Title
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        id="currentRole"
                        name="currentRole"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                        placeholder="e.g., Healthcare Manager, Doctor, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="currentOrganization" className="block text-sm font-medium text-gray-700 mb-2">
                      Current Organization/Institution
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        id="currentOrganization"
                        name="currentOrganization"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                        placeholder="Enter your organization name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="programInterest" className="block text-sm font-medium text-gray-700 mb-2">
                      Which program are you interested in?
                    </label>
                    <div className="relative">
                      <Lightbulb className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        id="programInterest"
                        name="programInterest"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                        placeholder="e.g., Startup Ideation, Student Development, Programs"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="plannedKPIs" className="block text-sm font-medium text-gray-700 mb-2">
                      What are the planned KPIs for making this program? (Please be specific)
                    </label>
                    <textarea
                      id="plannedKPIs"
                      name="plannedKPIs"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors resize-none"
                      placeholder="Please describe your specific KPIs and goals for this program..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 pb-2">
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-primary/20 focus:outline-none"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </main>
  );
}









