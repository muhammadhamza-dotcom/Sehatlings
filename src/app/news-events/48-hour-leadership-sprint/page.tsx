"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Users, Award, Download, MapPin, ArrowLeft } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function LeadershipSprintArticle() {
  useScrollAnimation();

  return (
    <main key="leadership-sprint-article">
      {/* Back Navigation */}
      <section className="bg-white pt-28 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/news-events"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News & Updates
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="bg-white pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-gray-500 mb-4">November 27, 2025</p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The 48-Hour Leadership Sprint
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed italic">
              Transforming healthcare leadership through collaboration and innovation at NIC Karachi
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden"
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
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">
            <div data-animate className="scroll-fade-up">
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Sehatlings, in collaboration with GVON, successfully hosted "The 48-Hour Leadership Sprint" at the National Incubation Center (NIC) Karachi. This intensive bootcamp brought together 22 passionate individuals from leading healthcare institutions including Aga Khan University Hospital (AKUH), Sindh Institute of Urology and Transplantation (SIUT), Karachi Medical & Dental College (KMDC), and various NIC-incubated startups.
              </p>
            </div>

            {/* Event Timeline */}
            <div data-animate className="scroll-fade-up my-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Event Highlights</h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                <strong>Day 1: Strategic Thinking</strong>
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                Led by <strong>Dr. Azeem Qureshi</strong> from <em>Institute of Business Management (IoBM)</em>, participants engaged in intensive strategic thinking sessions. The day culminated in an engaging LEGO Activity that demonstrated collaborative problem-solving and innovative thinking in action.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                <strong>Day 2: Healthcare Excellence Panel</strong>
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                Featured an expert panel from <em>Aga Khan University Hospital</em> including <strong>Prof. Dr. Ahmed Nadeem Abbasi</strong> and <strong>Dr. Maria Tariq</strong>, who shared invaluable insights on healthcare leadership, clinical excellence, and building collaborative healthcare environments.
              </p>
            </div>

            {/* BAD Framework Section */}
            <div data-animate className="scroll-fade-up my-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Combating the BAD Framework
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The bootcamp specifically addressed the <strong>"BAD Framework"</strong> - <em>Blame, Accuse, and Demand</em> - prevalent in traditional healthcare settings. Participants learned collaborative leadership approaches that foster trust, open communication, and shared problem-solving to create more effective and supportive healthcare environments.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Blame</strong> was replaced with accountability and support, <strong>Accuse</strong> gave way to trust and understanding, while <strong>Demand</strong> was transformed into collaboration and dialogue.
              </p>
            </div>

            {/* Partnership Section */}
            <div data-animate className="scroll-fade-up my-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Partnership & Vision
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                This successful collaboration between <strong>Sehatlings</strong> and <strong>GVON</strong>, hosted at <em>NIC Karachi</em>, demonstrates the power of bringing together healthcare professionals and innovators to develop the next generation of healthcare leaders. The bootcamp created a unique space for cross-institutional learning and networking, fostering relationships that will drive healthcare innovation forward.
              </p>
              <p className="text-gray-700 leading-relaxed italic text-lg border-l-4 border-primary pl-6 py-2">
                "Together, we're building a future where healthcare leadership is defined by collaboration, innovation, and compassion."
              </p>
            </div>
          </article>

          {/* LinkedIn Embed Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-center w-full">
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:share:7401547473225510914?collapsed=1"
                height="670"
                width="504"
                frameBorder="0"
                allowFullScreen={true}
                title="Embedded post"
                style={{ display: 'block', margin: '0 auto' }}
              />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
