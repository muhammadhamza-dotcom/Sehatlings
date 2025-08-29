"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, MapPin, ArrowUpRight, Loader2, CheckCircle, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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
        setShowSuccessPopup(true);
        // Auto-dismiss popup after 5 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
          setSubscribeStatus('idle');
        }, 5000);
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

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    setSubscribeStatus('idle');
  };

  return (
    <>
      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeSuccessPopup}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-modalPop transform-gpu">
            {/* Close button */}
            <button
              onClick={closeSuccessPopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Success content */}
            <div className="text-center">
              <div className="mb-4 mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                🎉 Welcome to our community!
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                You&apos;re now subscribed to our newsletter and will receive the latest healthcare 
                innovations and insights directly to your inbox.
              </p>
              
              <Button 
                onClick={closeSuccessPopup}
                className="mt-6 bg-primary hover:bg-primary/90 text-white px-6 py-2"
              >
                Got it!
              </Button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-neutral-900 border-t border-white/10 overflow-hidden">

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start lg:items-start lg:content-start">
          {/* Left: Brand, description, CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <div className="inline-flex items-center justify-center bg-white rounded-2xl px-3 py-2 shadow-lg">
                <Image
                  src="/logo-jpeg.webp"
                  alt="Sehatlings"
                  width={56}
                  height={56}
                  className="w-14 h-14 object-contain"
                />
              </div>
            </div>

            <p className="text-white/70 leading-relaxed max-w-xl mb-6">
              Pioneering a new era of health through innovation, compassion, and data-driven
              solutions. Transforming healthcare delivery with cutting-edge technology.
            </p>


            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-xl">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-gray-900 placeholder:text-gray-500 border-0 rounded-xl h-10 w-full sm:w-56"
                required
              />
              <Button 
                type="submit"
                disabled={subscribeStatus === 'loading' || !email}
                className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 flex-shrink-0 disabled:opacity-50 w-full sm:w-auto"
              >
                {subscribeStatus === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <div className="inline-flex items-center gap-2">
                    <span>Subscribe</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Right: Contact */}
          <motion.div
            className="self-start lg:justify-self-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="w-4 h-4" />
                <span>+92 3362844276</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="w-4 h-4" />
                <span>connect@sehatlings.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-4 h-4" />
                <span>Karachi</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-white/10 mt-10 pt-6 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-white/60 text-sm">© 2025 Sehatlings. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-white/60 hover:text-white transition-colors cursor-pointer">Privacy</span>
              <span className="text-white/60 hover:text-white transition-colors cursor-pointer">Terms</span>
              <span className="text-white/60 hover:text-white transition-colors cursor-pointer">Accessibility</span>
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
    </>
  );
}