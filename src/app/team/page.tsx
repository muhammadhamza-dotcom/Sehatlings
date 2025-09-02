"use client";
import { motion } from "framer-motion";
import { Linkedin, Mail, Check, Lightbulb, Heart, Users, Briefcase, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";
import Link from "next/link";

export default function TeamPage() {
  useScrollAnimation();
  
  return (
    <main key="team">
      {/* Section intro: Meet our founders */}
      <section className="bg-primary/15 relative pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div data-animate className="scroll-fade-up text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Founders
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The visionary leaders driving healthcare innovation forward
            </p>
          </div>
        </div>
      </section>

      {/* Founders grid */}
      <section className="bg-primary/15 relative">
        <div className="mx-auto max-w-7xl px-6 pb-16">
          <div data-animate className="scroll-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Founder 1 */}
            <motion.div 
              className="rounded-3xl border border-gray-200 bg-white p-6 group"
              whileHover={{ 
                y: -4,
                borderColor: "#5b0203"
              }}
              transition={{ duration: 0.05, ease: "easeOut" }}
            >
              <div className="h-80 w-full rounded-2xl overflow-hidden bg-muted/40 group-hover:shadow-lg transition-all duration-300">
                <Image src="/agha.webp" alt="Agha Muhammad Hassaan Khan" width={640} height={240} className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Agha Muhammad Hassaan Khan</h3>
                  <p className="text-sm text-gray-600">Chief Executive Officer</p>
                </div>
                <div className="flex gap-2">
                  <a href="https://www.linkedin.com/in/amhk/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-200">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:ceo@sehatlings.com" className="text-gray-400 hover:text-primary transition-colors duration-200">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <p className="mt-3 text-sm text-black/70 leading-relaxed">
                Vision-driven founder focused on building AI-first products and scalable operations. Leads company strategy,
                partnerships, and product direction to deliver impactful healthcare solutions.
              </p>
            </motion.div>

            {/* Founder 2 */}
            <motion.div 
              className="rounded-3xl border border-gray-200 bg-white p-6 group"
              whileHover={{ 
                y: -4,
                borderColor: "#5b0203"
              }}
              transition={{ duration: 0.05, ease: "easeOut" }}
            >
              <div className="h-80 w-full rounded-2xl overflow-hidden bg-muted/40">
                <Image src="/shariq1.webp" alt="Shariq Khan" width={640} height={240} className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Shariq Khan</h3>
                  <p className="text-sm text-gray-600">Chief Technology Officer</p>
                </div>
                <div className="flex gap-2">
                  <a href="https://www.linkedin.com/in/shariq-khan-947bb9127/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-200">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:cto@sehatlings.com" className="text-gray-400 hover:text-primary transition-colors duration-200">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <p className="mt-3 text-sm text-black/70 leading-relaxed">
                Technology leader overseeing platform architecture, data infrastructure, and engineering excellence. Passionate
                about robust systems, security, and shipping fast with quality.
              </p>
            </motion.div>

            {/* Founder 3 */}
            <motion.div 
              className="rounded-3xl border border-gray-200 bg-white p-6 group"
              whileHover={{ 
                y: -4,
                borderColor: "#5b0203"
              }}
              transition={{ duration: 0.05, ease: "easeOut" }}
            >
              <div className="h-80 w-full rounded-2xl overflow-hidden bg-muted/40">
                <Image src="/hamza1.webp" alt="Rao Muhammad Hamza" width={640} height={240} className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Rao Muhammad Hamza</h3>
                  <p className="text-sm text-gray-600">Chief Product Officer</p>
                </div>
                <div className="flex gap-2">
                  <a href="https://www.linkedin.com/in/rao-muhammad-hamza/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-200">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:connect@sehatlings.com" className="text-gray-400 hover:text-primary transition-colors duration-200">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <p className="mt-3 text-sm text-black/70 leading-relaxed">
                Product visionary driving user-centric innovation and strategic product development. Leads product roadmap, 
                feature prioritization, and cross-functional collaboration to deliver exceptional healthcare solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Mission */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div data-animate className="scroll-fade-up text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Driving healthcare transformation through innovation and connection
          </p>
        </div>
        
        <div data-animate className="scroll-fade-up bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl p-8 border-l-4 border-r-4 border-primary" style={{transitionDelay: '0.2s'}}>
          <div className="flex flex-col items-center text-center gap-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-gray-700 text-base leading-relaxed">
                Sehatlings serves as a transformative gateway connecting healthcare stakeholders, through standardized practices and smart medical intelligence, empowering the broader population with equitable, efficient, and informed healthcare access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Culture & Values */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-20 lg:py-32 relative overflow-hidden">

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div data-animate className="scroll-fade-up text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Culture & Values
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do
            </p>
          </div>
          
          <div data-animate className="scroll-stagger space-y-6 max-w-4xl mx-auto">
            <motion.div 
              className="bg-white rounded-3xl px-8 py-6 border border-gray-100"
              whileHover={{ 
                borderColor: "#5b0203"
              }}
              transition={{ duration: 0.05, ease: "easeOut" }}
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">People and Innovation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We foster a culture of continuous innovation, encouraging creative solutions to complex 
                    healthcare challenges.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-3xl px-8 py-6 border border-gray-100"
              whileHover={{ 
                borderColor: "#5b0203"
              }}
              transition={{ duration: 0.05, ease: "easeOut" }}
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Patient-Centric Approach</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Every decision we make is guided by how it will improve patient outcomes and healthcare accessibility.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-3xl px-8 py-6 border border-gray-100"
              whileHover={{ 
                borderColor: "#5b0203"
              }}
              transition={{ duration: 0.05, ease: "easeOut" }}
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Collaborative Excellence</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We believe in the power of collaboration across teams, disciplines, and organizations to 
                    create meaningful impact.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Opportunities */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-32">
        <div data-animate className="scroll-fade-up text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Open Opportunities
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our team and help us transform healthcare for millions of people
          </p>
        </div>

        <div data-animate className="scroll-stagger grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div 
            className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
            whileHover={{ 
              borderColor: "#5b0203"
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center shadow-sm">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full font-semibold shadow-sm border border-emerald-200">
                Open Position
              </span>
            </div>
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sales Internship</h3>
              <p className="text-primary font-medium text-sm uppercase tracking-wide">Internship • Remote</p>
            </div>
            <p className="text-gray-700 text-base mb-6 leading-relaxed">
              Drive sales growth and build relationships with healthcare organizations through strategic outreach and client engagement.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Position Details</h4>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Location</span>
                    <p className="text-gray-600">Remote</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Compensation</span>
                    <p className="text-gray-600">Performance Based Stipend</p>
                  </div>
                </div>
              </div>
            </div>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group">
              <Link href="mailto:sehatlings@gmail.com?subject=Sales Internship Application" className="flex items-center justify-center gap-2">
                Apply Now
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
            whileHover={{ 
              borderColor: "#5b0203"
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center shadow-sm">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full font-semibold shadow-sm border border-emerald-200">
                Open Position
              </span>
            </div>
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">R&D Internship</h3>
              <p className="text-primary font-medium text-sm uppercase tracking-wide">Internship • Remote</p>
            </div>
            <p className="text-gray-700 text-base mb-6 leading-relaxed">
              Contribute to cutting-edge healthcare research and development projects, working on innovative solutions and technologies.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Position Details</h4>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Location</span>
                    <p className="text-gray-600">Remote</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Compensation</span>
                    <p className="text-gray-600">Performance Based Stipend</p>
                  </div>
                </div>
              </div>
            </div>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group">
              <Link href="mailto:sehatlings@gmail.com?subject=R&D Internship Application" className="flex items-center justify-center gap-2">
                Apply Now
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Ready to Make a Difference in Healthcare */}
      <section className="bg-primary py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div data-animate className="scroll-fade-left">
              {/* Mission Badge */}
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium uppercase tracking-wider mb-6">
                JOIN OUR MISSION
              </span>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Make a Difference in Healthcare?
              </h2>

              {/* Description */}
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Ask us. We&apos;re expert team & you can ask about innovative finance, leadership, or 
                even in tech stack. We&apos;re always looking for passionate individuals who share our 
                vision for transforming healthcare through technology and innovation.
              </p>

              {/* Bullet Points */}
              <div className="space-y-4 mb-8">
                {[
                  "Healthcare professionals and clinicians",
                  "Technology experts and AI specialists",
                  "Leadership and business development professionals",
                  "Quality assurance and compliance experts"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-white/90 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-white text-primary hover:bg-gray-200 hover:scale-[1.02] transition-all duration-150 px-6 py-3 font-semibold rounded-xl">
                  <Link href="tel:+923362844276">Schedule 30 Min Call</Link>
                </Button>
                <Button asChild className="bg-white text-primary hover:bg-gray-200 hover:scale-[1.02] transition-all duration-150 px-6 py-3 font-semibold rounded-xl">
                  <Link href="mailto:sehatlings@gmail.com?subject=CV Submission">Send Your CV</Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Team Image */}
            <div data-animate className="scroll-fade-right">
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/team.webp"
                    alt="Join Our Growing Team"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover rounded-3xl"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl flex items-end justify-center pb-8">
                  <h3 className="text-xl font-semibold text-white">Join Our Growing Team</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}