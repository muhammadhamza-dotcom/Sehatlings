"use client";
import { motion } from "framer-motion";
import { Linkedin, Mail, Lightbulb, Heart, Users, ArrowRight, TrendingUp, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";
import Link from "next/link";

// Team members data
const founders = [
  {
    name: "Agha Hassaan Khan",
    role: "Chief Executive Officer",
    image: "/agha.webp",
    bio: "Vision-driven founder focused on building AI-first products and scalable operations. Leads company strategy, partnerships, and product direction to deliver impactful healthcare solutions.",
    linkedin: "https://www.linkedin.com/in/amhk/",
    email: "ceo@sehatlings.com"
  },
  {
    name: "Shariq Khan",
    role: "Chief Technology Officer",
    image: "/shariq1.webp",
    bio: "Technology leader overseeing platform architecture, data infrastructure, and engineering excellence. Passionate about robust systems, security, and shipping fast with quality.",
    linkedin: "https://www.linkedin.com/in/shariq-khan-947bb9127/",
    email: "cto@sehatlings.com"
  },
  {
    name: "Rao Muhammad Hamza",
    role: "Chief Product Officer",
    image: "/hamza2.webp",
    bio: "Product visionary driving user-centric innovation and strategic product development. Leads product roadmap, feature prioritization, and cross-functional collaboration to deliver exceptional healthcare solutions.",
    linkedin: "https://www.linkedin.com/in/rao-muhammad-hamza/",
    email: "connect@sehatlings.com"
  }
];

const values = [
  {
    icon: Lightbulb,
    title: "People and Innovation",
    description: "We foster a culture of continuous innovation, encouraging creative solutions to complex healthcare challenges."
  },
  {
    icon: Heart,
    title: "Patient-Centric Approach",
    description: "Every decision we make is guided by how it will improve patient outcomes and healthcare accessibility."
  },
  {
    icon: Users,
    title: "Collaborative Excellence",
    description: "We believe in the power of collaboration across teams, disciplines, and organizations to create meaningful impact."
  }
];

const jobPositions = [
  {
    id: "sales",
    title: "Sales Internship",
    type: "Internship • Remote",
    description: "Drive sales growth and build relationships with healthcare organizations through strategic outreach and client engagement.",
    icon: TrendingUp,
    location: "Remote",
    compensation: "Performance Based Stipend",
    emailSubject: "Sales Internship Application"
  },
  {
    id: "rd",
    title: "R&D Internship",
    type: "Internship • Remote",
    description: "Contribute to cutting-edge healthcare research and development projects, working on innovative solutions and technologies.",
    icon: Lightbulb,
    location: "Remote",
    compensation: "Performance Based Stipend",
    emailSubject: "R&D Internship Application"
  }
];

export default function TeamPage() {
  useScrollAnimation();

  return (
    <main key="team">
      {/* Hero Section */}
      <section className="bg-cream relative pt-32 md:pt-40 pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div data-animate className="scroll-fade-up">
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-charcoal mb-6 leading-tight tracking-tight">
              Meet the Team
            </h1>
            <p className="font-sans text-xl md:text-2xl text-gray-700 leading-relaxed">
              Building the future of healthcare with AI-powered innovation and human-centered design
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div data-animate className="scroll-fade-up text-center mb-16">
            <h2 className="font-sans text-xs uppercase tracking-wide text-maroon font-bold mb-4">
              Leadership
            </h2>
          </div>

          {/* Founders Grid */}
          <div data-animate className="scroll-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden group transition-all duration-300"
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderColor: "#7d0305"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Photo with gradient overlay */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    width={640}
                    height={640}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-100 group-hover:opacity-60 transition-opacity duration-300" />

                  {/* Social Links - Top Right */}
                  <div className="absolute top-4 right-4 flex items-center gap-3">
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal hover:bg-maroon hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${founder.email}`}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal hover:bg-maroon hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-sans font-bold text-xl text-charcoal mb-1">
                    {founder.name}
                  </h3>
                  <p className="font-sans text-sm text-maroon uppercase tracking-wide mb-4">
                    {founder.role}
                  </p>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="bg-cream py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Mission Statement */}
          <div data-animate className="scroll-fade-up text-center mb-20">
            <h2 className="font-sans text-xs uppercase tracking-wide text-maroon font-bold mb-8">
              Our Mission
            </h2>
            <p className="font-serif text-2xl md:text-3xl text-charcoal max-w-3xl mx-auto leading-relaxed">
              Sehatlings serves as a transformative gateway connecting healthcare stakeholders through standardized practices and smart medical intelligence, empowering the broader population with equitable, efficient, and informed healthcare access.
            </p>
          </div>

          {/* Values */}
          <div data-animate className="scroll-fade-up text-center mb-12">
            <h2 className="font-sans text-xs uppercase tracking-wide text-maroon font-bold mb-4">
              Our Values
            </h2>
          </div>

          <div data-animate className="scroll-stagger grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 p-8 transition-all duration-300"
                whileHover={{
                  borderColor: "#7d0305"
                }}
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-maroon/10 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-maroon" />
                </div>

                {/* Content */}
                <h3 className="font-sans font-bold text-xl text-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Opportunities Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div data-animate className="scroll-fade-up text-center mb-16">
            <h2 className="font-sans text-xs uppercase tracking-wide text-maroon font-bold mb-4">
              Open Positions
            </h2>
            <h3 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
              Open Opportunities
            </h3>
            <p className="font-sans text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our team and help us transform healthcare for millions of people
            </p>
          </div>

          {/* Job Cards Grid */}
          <div data-animate className="scroll-stagger grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {jobPositions.map((position) => (
              <motion.div
                key={position.id}
                className="bg-white rounded-2xl border border-gray-200 p-8 transition-all duration-300"
                whileHover={{
                  y: -4,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderColor: "#7d0305"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Header with icon and badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-maroon/10 rounded-2xl flex items-center justify-center">
                    <position.icon className="w-7 h-7 text-maroon" />
                  </div>
                  <span className="text-xs bg-maroon/10 text-maroon border border-maroon/20 px-3 py-1.5 rounded-full font-semibold uppercase tracking-wide">
                    Open
                  </span>
                </div>

                {/* Job title and type */}
                <div className="mb-4">
                  <h4 className="font-sans font-bold text-2xl text-charcoal mb-2">
                    {position.title}
                  </h4>
                  <p className="font-sans text-sm text-maroon uppercase tracking-wide">
                    {position.type}
                  </p>
                </div>

                {/* Description */}
                <p className="font-sans text-base text-gray-600 leading-relaxed mb-6">
                  {position.description}
                </p>

                {/* Position Details */}
                <div className="bg-cream rounded-xl p-4 mb-6">
                  <h5 className="font-sans text-sm font-semibold text-charcoal mb-3">
                    Position Details
                  </h5>
                  <div className="space-y-3">
                    {/* Location */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-maroon" />
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-charcoal">Location: </span>
                        <span className="text-gray-600">{position.location}</span>
                      </div>
                    </div>

                    {/* Compensation */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-4 h-4 text-maroon" />
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-charcoal">Compensation: </span>
                        <span className="text-gray-600">{position.compensation}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Apply Button */}
                <Link href={`mailto:sehatlings@gmail.com?subject=${position.emailSubject}`}>
                  <Button className="w-full bg-maroon hover:bg-maroon-dark text-cream font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group">
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team Section */}
      <section className="bg-gradient-to-br from-maroon-dark to-maroon py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div data-animate className="scroll-fade-left">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium uppercase tracking-wider mb-6">
                Join Our Mission
              </span>

              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
                Work with Us
              </h2>

              <p className="font-sans text-lg text-white/90 mb-8 leading-relaxed">
                We're always looking for passionate individuals who share our vision for transforming healthcare through technology and innovation. Join our team and help us make a difference.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="bg-cream text-maroon hover:bg-cream/90 font-semibold px-6 py-3 text-base rounded-full transition-all duration-300 hover:shadow-lg flex items-center gap-2">
                    Get in Touch
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="mailto:sehatlings@gmail.com?subject=Career Inquiry">
                  <Button className="bg-white/10 text-white hover:bg-white/20 border border-white/20 font-semibold px-6 py-3 text-base rounded-full transition-all duration-300">
                    Send Your CV
                  </Button>
                </Link>
              </div>
            </div>

            {/* Team Image */}
            <div data-animate className="scroll-fade-right">
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/team.webp"
                    alt="Join Our Team"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover rounded-3xl"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl flex items-end justify-center pb-8">
                  <h3 className="font-sans text-2xl font-bold text-white">Join Our Growing Team</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
