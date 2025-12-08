"use client";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import WaveDivider from "@/components/ui/WaveDivider";
import {
  Check,
  ArrowRight,
  Zap,
  Clock,
  FileText,
  Target,
  Sparkles,
  Scan,
  MessageCircle,
  UserCheck,
  Phone,
  Brain
} from "lucide-react";

export default function GendlrSpotlight() {
  useScrollAnimation();
  
  const features = [
    {
      title: "ScanUp",
      description: "Instantly scan medical reports to get clear, concise summaries.",
      icon: Scan
    },
    {
      title: "Daktari", 
      description: "An intelligent chatbot that provides on-demand support and information.",
      icon: MessageCircle
    },
    {
      title: "One-Tap-Go",
      description: "Receive personalized doctor recommendations based on your health reports.",
      icon: UserCheck
    },
    {
      title: "Asaan Health",
      description: "Our voice-assisted feature helps users in rural areas get connected to our call center for expert support.",
      icon: Phone
    }
  ];

  return (
    <section id="gendlr" className="bg-maroon-gradient py-20 md:py-28 lg:py-36 relative overflow-hidden">
      {/* Wave dividers for organic transitions */}
      <div className="absolute top-0 left-0 w-full h-24 -mt-1">
        <WaveDivider position="top" color="cream" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div data-animate className="scroll-fade-left">
            {/* Badge */}
            <span data-animate className="scroll-fade-up inline-flex items-center px-5 py-2.5 rounded-full bg-white/95 text-primary text-sm font-bold uppercase tracking-wider mb-6 shadow-soft" style={{transitionDelay: '0.2s'}}>
              Flagship Product
            </span>

            {/* Main Heading */}
            <div data-animate className="scroll-fade-up" style={{transitionDelay: '0.3s'}}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Introducing GENDLR
              </h1>
            </div>

            {/* Subtitle */}
            <p data-animate className="scroll-fade-up text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 font-semibold" style={{transitionDelay: '0.4s'}}>
              AI Powered Pathologist Assistant to Patient Journey Optimizer
            </p>

            {/* Description */}
            <p data-animate className="scroll-fade-up text-base md:text-lg text-white/75 mb-6 md:mb-8 leading-relaxed font-body" style={{transitionDelay: '0.5s'}}>
              GENDLR is a solution specializing in patient management and engagement. We have developed MVP of a robust AI-powered platform tailored for B2B clients like labs and hospitals, and we&apos;re excited to soon release a user-facing application for everyone.
            </p>
            
            {/* Features Header */}
            <p data-animate className="scroll-fade-up text-base text-white/80 mb-6 font-medium leading-relaxed" style={{transitionDelay: '0.55s'}}>
              Here are the key features of our platform:
            </p>

            {/* Features List */}
            <div data-animate className="scroll-stagger space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  {/* Checkmark */}
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                  </div>

                  {/* Feature Content */}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div data-animate className="scroll-fade-up flex justify-center sm:justify-start" style={{transitionDelay: '1s'}}>
              <Button
                asChild
                className="bg-white text-primary hover:shadow-soft-lg px-8 py-4 text-base font-bold rounded-full transition-all duration-400 group min-w-[240px]"
              >
                <a href="/gendlr" className="inline-flex items-center justify-center gap-3">
                  Learn More About GENDLR
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-400" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Interactive Visual */}
          <div data-animate className="scroll-fade-right relative">
            {/* Soft Glassmorphism Container */}
            <div className="relative bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/30 p-8 md:p-10 lg:p-12 overflow-hidden shadow-soft-lg">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"></div>
              
              {/* Traditional vs GENDLR Comparison */}
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-lg font-semibold text-white mb-2">Healthcare Transformation</h3>
                  <p className="text-white/60 text-sm">See the difference GENDLR makes</p>
                </div>

                {/* Split Comparison */}
                <div className="grid grid-cols-2 rounded-3xl overflow-hidden shadow-soft">
                  {/* Traditional Healthcare */}
                  <div className="bg-white/5 p-4 md:p-6">
                    <div className="text-center mb-4 md:mb-6">
                      <h4 className="text-white font-medium text-xs md:text-sm mb-1">Traditional</h4>
                      <h5 className="text-white font-semibold text-sm md:text-base">Healthcare</h5>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { icon: Clock, label: "Diagnosis", value: "2-3 days", color: "text-white" },
                        { icon: FileText, label: "Analysis", value: "Manual", color: "text-white" },
                        { icon: Target, label: "Care", value: "Reactive", color: "text-white" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <item.icon className={`w-4 h-4 ${item.color}`} />
                          <div className="flex-1">
                            <div className="text-white text-xs">{item.label}</div>
                            <div className="text-white text-sm font-medium">{item.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* With GENDLR */}
                  <div className="bg-white p-4 md:p-6 relative">
                    <div className="text-center mb-4 md:mb-6">
                      <h4 className="text-primary font-medium text-xs md:text-sm mb-1">With</h4>
                      <h5 className="text-primary font-semibold text-sm md:text-base">GENDLR</h5>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { icon: Zap, label: "Diagnosis", value: "30 mins", color: "text-primary" },
                        { icon: Brain, label: "Analysis", value: "AI-Powered", color: "text-primary" },
                        { icon: Sparkles, label: "Care", value: "Predictive", color: "text-primary" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="animate-pulse">
                            <item.icon className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-primary/70 text-xs">{item.label}</div>
                            <div className="text-primary font-medium text-sm">{item.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Enhancement Badge */}
                    <div className="absolute top-1 right-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                      90% Faster
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

 
      </div>
    </section>
  );
}









