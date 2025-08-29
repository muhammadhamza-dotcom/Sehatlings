import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: true });
const GendlrSpotlight = dynamic(() => import("@/components/home/GendlrSpotlight"), { ssr: true });
const HealthcareSolutions = dynamic(() => import("@/components/home/HealthcareSolutions"), { ssr: true });
const StatsSection = dynamic(() => import("@/components/home/StatsSection"), { ssr: true });
const CallToAction = dynamic(() => import("@/components/home/CallToAction"), { ssr: true });

export default function Home() {
  return (
    <main key="home">
      <Hero />
      <GendlrSpotlight />
      <HealthcareSolutions />
      <StatsSection />
      <CallToAction />
    </main>
  );
}
