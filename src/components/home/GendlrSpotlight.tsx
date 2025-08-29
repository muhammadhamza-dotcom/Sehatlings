"use client";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  Check,
  ArrowRight,
  Zap,
  Clock,
  FileText,
  Target,
  Sparkles,
  ChevronDown,
  Scan,
  MessageCircle,
  UserCheck,
  Phone,
  Brain
} from "lucide-react";

export default function GendlrSpotlight() {
  useScrollAnimation();
  // Removed unused hover state for now
  
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
    <section id="gendlr" className="bg-primary py-20 lg:py-32 relative overflow-hidden">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div data-animate className="scroll-fade-left">
            {/* Badge */}
            <span data-animate className="scroll-fade-up inline-flex items-center px-4 py-2 rounded-full bg-white text-primary text-sm font-medium uppercase tracking-wider mb-6" style={{transitionDelay: '0.2s'}}>
              Flagship Product
            </span>

            {/* Main Heading */}
            <div data-animate className="scroll-fade-up" style={{transitionDelay: '0.3s'}}>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
                Introducing GENDLR
              </h1>
            </div>

            {/* Subtitle */}
            <p data-animate className="scroll-fade-up text-lg lg:text-xl text-white/80 mb-6 font-medium" style={{transitionDelay: '0.4s'}}>
              AI Powered Pathologist Assistant to Patient Journey Optimizer
            </p>

            {/* Description */}
            <p data-animate className="scroll-fade-up text-base text-white/70 mb-6 leading-relaxed" style={{transitionDelay: '0.5s'}}>
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
                className="bg-white text-primary hover:bg-white/90 px-6 py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <a href="/gendlr" className="inline-flex items-center gap-3">
                  Learn More About GENDLR
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Interactive Visual */}
          <div data-animate className="scroll-fade-right relative">
            {/* Glassmorphism Container */}
            <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl border border-white/20 p-6 sm:p-8 lg:p-12 overflow-hidden ml-0 lg:ml-12">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 rounded-2xl overflow-hidden">
                  {/* Traditional Healthcare */}
                  <div className="bg-white/5 p-6">
                    <div className="text-center mb-6">
                      <h4 className="text-white font-medium text-sm mb-1">Traditional</h4>
                      <h5 className="text-white font-semibold text-base">Healthcare</h5>
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
                  <div className="bg-white p-6 relative">
                    <div className="text-center mb-6">
                      <h4 className="text-primary font-medium text-sm mb-1">With</h4>
                      <h5 className="text-primary font-semibold text-base">GENDLR</h5>
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

        {/* Scroll Down Arrow */}
        <div data-animate className="scroll-fade-up hidden sm:flex justify-center mt-8">
          <button
            className="p-3 rounded-full hover:bg-white/10 transition-colors duration-300 group animate-bounce hover:scale-110"
            onClick={() => {
              const nextSection = document.getElementById('healthcare-solutions');
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            <ChevronDown 
              className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300" 
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </section>
  );
}









