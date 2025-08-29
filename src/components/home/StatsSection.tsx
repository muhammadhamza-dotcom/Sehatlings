"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useEffect, useState } from "react";
import { 
  Users,
  Building2,
  Stethoscope,
  TrendingUp
} from "lucide-react";

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function Counter({ target, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: '-100px' }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(target * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isInView, target, duration]);

  return (
    <div ref={counterRef} className="text-2xl lg:text-3xl font-bold text-gray-900">
      {count}{suffix}
    </div>
  );
}

export default function StatsSection() {
  useScrollAnimation();
  
  const stats = [
    {
      icon: Users,
      number: 50,
      suffix: "+",
      label: "Healthcare Professionals"
    },
    {
      icon: Building2,
      number: 10,
      suffix: "+", 
      label: "Healthcare Facilities"
    },
    {
      icon: Stethoscope,
      number: 20,
      suffix: "+",
      label: "Doctors"
    },
    {
      icon: TrendingUp,
      number: 75,
      suffix: "%",
      label: "Market Response"
    }
  ];

  return (
    <section className="bg-primary/10 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div data-animate className="scroll-stagger grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary" strokeWidth={2} />
                </div>
              </div>

              {/* Number with Counter Animation */}
              <div className="mb-2">
                <Counter 
                  target={stat.number} 
                  suffix={stat.suffix}
                  duration={2 + index * 0.2}
                />
              </div>

              {/* Label */}
              <p className="text-gray-600 text-sm sm:text-base font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}