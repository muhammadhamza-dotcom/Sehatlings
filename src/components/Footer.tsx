"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Navigation data
const productLinks = [
  { label: 'Muaina', href: '/muaina' },
  { label: 'Tech House', href: '/tech-house' },
  { label: 'Inspection Consultancy', href: '/inspection-consultancy' },
  { label: 'Programs', href: '/programs' },
  { label: 'News & Events', href: '/news-events' },
];

const companyLinks = [
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/sehatlings' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/sehatlings' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/sehatlings' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/sehatlings' },
];

const legalLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setSubscribeStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailAddress: email,
        }),
      });

      if (response.ok) {
        setSubscribeStatus('success');
        setEmail('');
        setTimeout(() => {
          setSubscribeStatus('idle');
        }, 3000);
      } else {
        setSubscribeStatus('error');
        setTimeout(() => setSubscribeStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 overflow-hidden">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">

          {/* About Column */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="mb-4">
              <Image
                src="/logo-jpeg.webp"
                alt="Sehatlings"
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Tagline */}
            <p className="text-gray-700 text-base leading-relaxed mb-6 max-w-xs">
              Transforming healthcare through AI-powered innovation
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-maroon transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Product Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-maroon font-sans font-bold text-xs uppercase tracking-wide mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-charcoal text-sm hover:text-maroon transition-all duration-300 hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-maroon font-sans font-bold text-xs uppercase tracking-wide mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-charcoal text-sm hover:text-maroon transition-all duration-300 hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-maroon font-sans font-bold text-xs uppercase tracking-wide mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Get the latest in healthcare innovation delivered to your inbox
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-gray-300 text-charcoal placeholder:text-gray-400 focus:border-maroon focus:ring-maroon rounded-lg h-10"
                required
              />
              <Button
                type="submit"
                disabled={subscribeStatus === 'loading' || !email}
                className="bg-maroon hover:bg-maroon-dark text-cream font-medium w-full disabled:opacity-50 transition-all duration-300 hover:shadow-lg"
              >
                {subscribeStatus === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : subscribeStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </Button>

              {subscribeStatus === 'error' && (
                <p className="text-red-600 text-xs">Please try again</p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-200 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left: Copyright */}
            <p className="text-gray-600 text-sm">© 2025 Sehatlings. All rights reserved.</p>

            {/* Right: Legal Links */}
            <div className="flex items-center gap-2 text-sm">
              {legalLinks.map((link, index) => (
                <span key={link.href} className="flex items-center gap-2">
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-maroon transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-gray-400">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
