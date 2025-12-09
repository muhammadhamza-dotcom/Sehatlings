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
    <main key="news-events" className="bg-cream min-h-screen">
      {/* Hero Banner - Consistent with other pages */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center bg-maroon">
        {/* Background Gradient & Grain */}
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-dark via-maroon to-maroon-light opacity-90" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat'
          }}
          aria-hidden
        />

        {/* Abstract Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-maroon-light rounded-full blur-[100px] opacity-30" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-maroon-dark rounded-full blur-[100px] opacity-30" />
        </div>

        <div className="relative z-10 w-full max-w-7xl px-6 py-16 sm:py-12 md:py-8 text-center">
          <div data-animate className="scroll-fade-up">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium uppercase tracking-widest mb-6 bg-white/10 text-white border border-white/20 backdrop-blur-sm">
              Press & Media
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-cream mb-6 leading-tight">
              News & Updates
            </h1>
            <p className="font-sans font-light text-lg md:text-xl text-cream/80 max-w-2xl mx-auto leading-relaxed">
              Stay informed about our latest healthcare innovation initiatives, transformative programs, and upcoming events.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-end justify-between mb-12 border-b border-gray-200 pb-6">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">
                Latest Stories
              </h2>
              <p className="text-gray-600 font-light">Insight into our journey and community impact</p>
            </div>
          </div>

          {/* News Grid */}
          <div data-animate className="scroll-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <motion.div
                key={item.id}
                className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-dramatic transition-all duration-300 hover:-translate-y-1"
              >
                <Link href={`/news-events/${item.id}`} className="flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

                    {item.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-maroon text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow p-8">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 font-medium uppercase tracking-wide">
                      <Calendar className="w-4 h-4 text-maroon" />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="font-serif text-xl font-medium text-charcoal mb-4 group-hover:text-maroon transition-colors line-clamp-3 leading-snug">
                      {item.title}
                    </h3>

                    <div className="mt-auto pt-6 flex items-center text-maroon font-semibold text-sm tracking-wide group/link">
                      <span className="border-b border-transparent group-hover/link:border-maroon transition-all">Read Full Story</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
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
