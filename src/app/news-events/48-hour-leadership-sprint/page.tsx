"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Share2, Linkedin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

export default function LeadershipSprintArticle() {
  useScrollAnimation();

  return (
    <main key="leadership-sprint-article" className="bg-cream min-h-screen relative">
      {/* Background Elements - Continuous across page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-maroon/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-maroon/5 blur-[100px] rounded-full" />
      </div>

      {/* Article Header & Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden z-10">
        {/* Background elements removed from here */}

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back Nav */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/news-events"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-maroon transition-colors font-medium text-sm uppercase tracking-wide group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to News & Updates
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-maroon font-medium mb-6 uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                November 27, 2025
              </span>
              <span className="hidden md:inline text-gray-300">•</span>
              <span className="bg-maroon/10 px-3 py-1 rounded-full">Featured Event</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-8 leading-tight">
              The 48-Hour Leadership Sprint
            </h1>

            <p className="font-sans text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl">
              Transforming healthcare leadership through collaboration and innovation at NIC Karachi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-dramatic"
          >
            <Image
              src="/48-hour-ls-2.jpeg"
              alt="The 48-Hour Leadership Sprint"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-lg prose-headings:font-serif prose-headings:text-charcoal prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-maroon prose-li:text-gray-600 max-w-none">
            <div data-animate className="scroll-fade-up">
              <p className="text-xl md:text-2xl leading-relaxed text-charcoal font-light mb-10 drop-cap">
                Sehatlings, in collaboration with GVON, successfully hosted &quot;The 48-Hour Leadership Sprint&quot; at the National Incubation Center (NIC) Karachi. This intensive bootcamp brought together 22 passionate individuals from leading healthcare institutions including Aga Khan University Hospital (AKUH), Sindh Institute of Urology and Transplantation (SIUT), Karachi Medical & Dental College (KMDC), and various NIC-incubated startups.
              </p>
            </div>

            {/* Event Timeline */}
            <div data-animate className="scroll-fade-up my-16 p-8 bg-white rounded-2xl border border-gray-100 shadow-soft">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-maroon rounded-full block"></span>
                Event Highlights
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-charcoal mb-3">Day 1: The Applied Leadership Lab</h3>
                  <p className="text-gray-600">
                    Led by <strong>Dr. Azeem Qureshi</strong> from <em>Institute of Business Management (IoBM)</em>, participants engaged in intensive strategic thinking sessions. The day culminated in an engaging LEGO Activity that demonstrated collaborative problem-solving and innovative thinking in action.
                  </p>
                </div>

                <div className="w-full h-px bg-gray-100" />

                <div>
                  <h3 className="text-xl font-bold text-charcoal mb-3">Day 2: The Systematic Change Lab</h3>
                  <p className="text-gray-600">
                    Featured an expert panel from <em>Aga Khan University Hospital</em> including <strong>Prof. Dr. Ahmed Nadeem Abbasi</strong> and <strong>Dr. Maria Tariq</strong>, who shared invaluable insights on healthcare leadership, clinical excellence, and building collaborative healthcare environments.
                  </p>
                </div>
              </div>
            </div>

            {/* BAD Framework Section */}
            <div data-animate className="scroll-fade-up my-16">
              <h2 className="text-3xl font-bold mb-6">
                Combating the BAD Framework
              </h2>
              <p className="mb-6">
                The bootcamp specifically addressed the <strong>&quot;BAD Framework&quot;</strong> - <em>Blame, Accuse, and Demand</em> - prevalent in traditional healthcare settings. Participants learned collaborative leadership approaches that foster trust, open communication, and shared problem-solving to create more effective and supportive healthcare environments.
              </p>
              <div className="bg-maroon/5 p-6 rounded-xl border-l-4 border-maroon italic text-charcoal text-lg">
                &quot;<strong>Blame</strong> was replaced with accountability and support, <strong>Accuse</strong> gave way to trust and understanding, while <strong>Demand</strong> was transformed into collaboration and dialogue.&quot;
              </div>
            </div>

            {/* Partnership Section */}
            <div data-animate className="scroll-fade-up my-16">
              <h2 className="text-3xl font-bold mb-6">
                Partnership & Vision
              </h2>
              <p className="mb-8">
                This successful collaboration between <strong>Sehatlings</strong> and <strong>GVON</strong>, hosted at <em>NIC Karachi</em>, demonstrates the power of bringing together healthcare professionals and innovators to develop the next generation of healthcare leaders. The bootcamp created a unique space for cross-institutional learning and networking, fostering relationships that will drive healthcare innovation forward.
              </p>

              <div className="flex items-center justify-center p-8 bg-gradient-to-br from-maroon to-maroon-dark rounded-2xl text-white text-center shadow-dramatic">
                <p className="text-xl md:text-2xl font-serif italic leading-relaxed">
                  &quot;Together, we&apos;re building a future where healthcare leadership is defined by collaboration, innovation, and compassion.&quot;
                </p>
              </div>
            </div>
          </article>

          {/* LinkedIn Embed Section */}
          <div className="mt-16 pt-10 border-t border-gray-200 text-center">
            <h3 className="font-serif text-2xl text-charcoal mb-8">Join the conversation</h3>
            <div className="flex justify-center w-full mb-8">
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:share:7401547473225510914"
                height="670"
                width="504"
                frameBorder="0"
                allowFullScreen={true}
                title="Embedded post"
                className="border border-gray-200 rounded-xl shadow-lg bg-white"
              />
            </div>
            <div>
              <Button
                asChild
                className="bg-[#0077b5] hover:bg-[#006396] text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a
                  href="https://www.linkedin.com/feed/update/urn:li:share:7401547473225510914"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Linkedin className="w-5 h-5" />
                  View Post on LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
