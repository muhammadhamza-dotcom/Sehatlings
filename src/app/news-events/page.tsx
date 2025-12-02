"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface NewsCard {
  id: string;
  title: string;
  date: string;
  image: string;
  category?: string;
}

const newsItems: NewsCard[] = [
  {
    id: "48-hour-leadership-sprint",
    title: "The 48-Hour Leadership Sprint: Transforming Healthcare Leadership",
    date: "November 27, 2025",
    image: "/48-hour-leadership-sprint.jpeg",
    category: "Featured Event"
  },
  // Add more news items here as they come
];

export default function NewsEventsPage() {
  useScrollAnimation();

  return (
    <main key="news-events">
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden pt-20 md:pt-24 bg-primary">
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div data-animate className="scroll-fade-up max-w-4xl text-center text-white">
            <span data-animate className="scroll-fade-up inline-block px-4 py-2 rounded-full text-sm font-bold tracking-wide mb-4 bg-white/90 text-primary border border-white/60 shadow-sm backdrop-blur-sm" style={{transitionDelay: '0.2s'}}>
              Latest Updates
            </span>
            <h1 data-animate className="scroll-fade-up text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{transitionDelay: '0.4s'}}>
              News & Updates
            </h1>
            <p data-animate className="scroll-fade-up mt-5 text-base md:text-lg text-white/90 leading-relaxed" style={{transitionDelay: '0.6s'}}>
              Stay informed about our latest events, programs, and healthcare innovation initiatives
            </p>
          </div>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Recent News & Updates Header */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              Recent News & Updates
            </h2>
            <div className="w-20 h-1 bg-primary"></div>
          </div>

          {/* News Grid */}
          <div data-animate className="scroll-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <motion.div
                key={item.id}
                className="group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={`/news-events/${item.id}`} target="_blank" rel="noopener noreferrer" className="block">
                  {/* Image */}
                  <div className="relative h-56 rounded-lg overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.category && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>

                    <div className="inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
