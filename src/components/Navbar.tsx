"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";

type NavItem = { label: string; href: string; className?: string };

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isHome = pathname === "/";

  // Toggle nav container styling based on scroll position (home only)
  useEffect(() => {
    if (!isHome) {
      // On non-home pages, keep solid navbar with shadow
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const items: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Team", href: "/team" },
    { label: "GENDLR", href: "/gendlr", className: "uppercase" },
    { label: "Tech House", href: "/tech-house" },
    { label: "Inspection Consultancy", href: "/inspection-consultancy" },
    { label: "Programs", href: "/programs" },
    { label: "News & Events", href: "/news-events" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-auto"
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className={`${isScrolled ? "bg-white border-b border-gray-200 shadow-md" : "bg-transparent border-transparent shadow-none"} transition-colors transition-shadow duration-300`}>
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 h-20 overflow-visible flex items-center gap-4 sm:gap-8 pointer-events-auto transition-all duration-300 ease-out relative">
        {/* Logo - Left */}
        {/* Mobile Hamburger (left) */}
        <button
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen((v) => !v)}
          className="xl:hidden -ml-2 inline-flex items-center justify-center w-10 h-10 rounded-lg text-primary hover:bg-primary/10 transition-colors"
        >
          <div className="relative w-6 h-6">
            <AnimatePresence initial={false} mode="wait">
              {isMobileOpen ? (
                <motion.span
                  key="icon-x"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ rotate: -90, opacity: 0, scale: 0.85 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <X className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="icon-menu"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ rotate: 90, opacity: 0, scale: 0.85 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <Menu className="w-6 h-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </button>

        <Link href="/" className="flex-shrink-0 h-20 w-36 sm:w-48 absolute left-1/2 -translate-x-1/2 xl:static xl:translate-x-0">
          <Image
            src="/logo1.webp"
            alt="Sehatlings"
            width={320}
            height={100}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[43%] h-28 w-auto object-contain drop-shadow-lg"
          />
        </Link>

        {/* Centered Navigation */}
        <nav className="hidden xl:flex flex-1 items-center justify-center gap-5">
          {items.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-all duration-300 drop-shadow-lg whitespace-nowrap px-3 py-2 rounded-lg ${
                  isActive
                    ? "text-primary bg-primary/15"
                    : "text-primary/80 hover:text-primary hover:bg-primary/10"
                } ${item.className ?? ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Button - Right */}
        <div className="hidden xl:block ml-6">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 flex-shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2">
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Spacer to balance layout on mobile */}
        <div className="xl:hidden w-10 h-10 ml-auto" />

        {/* Mobile Menu Panel */}
        <motion.div
          initial={false}
          animate={{ height: isMobileOpen ? "auto" : 0, opacity: isMobileOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="xl:hidden absolute left-0 right-0 top-full mt-0 overflow-hidden"
        >
          <div className="bg-white border-0 rounded-b-2xl p-2 flex flex-col w-full">
            {items.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors rounded-lg px-3 py-2 ${
                    isActive ? "text-primary bg-primary/10" : "text-primary/80 hover:bg-primary/5 hover:text-primary"
                  } ${item.className ?? ""}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="p-2">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2">
                  <span>Get Started</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </motion.header>
  );
}


