import S1Hero from "@/sections/S1Hero";
import PortfolioSection from "@/sections/PortfolioSection";
import S3NewIn from "@/sections/S3NewIn";
import S4Artists from "@/sections/S4Artists";
import ImpactSection from "@/sections/ImpactSection";
import S5Exhibition from "@/sections/S5Exhibition";
import S6Visit from "@/sections/S6Visit";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full">
      {/* Fixed Hero - fills entire screen, nav overlays on top */}
      <div className="fixed top-0 left-0 w-full h-[100svh] z-0 flex">
        <S1Hero />
      </div>

      {/* Sections slide up and overlay the hero on scroll */}
      <div className="relative z-20 w-full mt-[100svh] bg-[#042D29] shadow-2xl isolate">
        <PortfolioSection />
        <S3NewIn />
        <S4Artists />
        <ImpactSection />
        <S5Exhibition />
        <S6Visit />
        <Footer />
      </div>
    </main>
  );
}
