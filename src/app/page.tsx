import dynamic from "next/dynamic";

// NEW REDESIGNED COMPONENTS
const HeroSplit = dynamic(() => import("@/components/home/HeroSplit"), { ssr: true });
const StatsCounter = dynamic(() => import("@/components/home/StatsCounter"), { ssr: true });
const SolutionsStack = dynamic(() => import("@/components/home/SolutionsStack"), { ssr: true });
const TelehealthFeature = dynamic(() => import("@/components/home/TelehealthFeature"), { ssr: true });
const MuainaVital = dynamic(() => import("@/components/home/MuainaVital"), { ssr: true });
const ImmersiveCTA = dynamic(() => import("@/components/home/ImmersiveCTA"), { ssr: true });

export default function Home() {
  return (
    <main key="home" className="bg-cream">
      {/* COMPLETE REDESIGN - All New Components */}
      <HeroSplit />
      <StatsCounter />
      <SolutionsStack />
      <TelehealthFeature />
      <MuainaVital />
      <ImmersiveCTA />
    </main>
  );
}
