import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionsOverviewSection from "@/components/sections/SolutionsOverviewSection";
import MethodologyDiagramSection from "@/components/sections/MethodologyDiagramSection";
import CaseStudyPreviewSection from "@/components/sections/CaseStudyPreviewSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export const metadata: Metadata = genMeta({
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionsOverviewSection />
      <MethodologyDiagramSection />
      <CaseStudyPreviewSection />
      <CtaBannerSection />
    </>
  );
}
