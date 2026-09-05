// =============================================================================
// NeuMann合同会社 — コーポレートサイト トップページ
// =============================================================================
import { Header } from "@/components/corporate/Header";
import { Hero } from "@/components/corporate/Hero";
import { MissionSection } from "@/components/corporate/MissionSection";
import { WhatWeDo } from "@/components/corporate/WhatWeDo";
import { ProjectsSection } from "@/components/corporate/ProjectsSection";
import { ServicesSection } from "@/components/corporate/ServicesSection";
import { OperatingModel } from "@/components/corporate/OperatingModel";
import { CompanySection } from "@/components/corporate/CompanySection";
import { ContactSection } from "@/components/corporate/ContactSection";
import { Footer } from "@/components/corporate/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <MissionSection />
        <WhatWeDo />
        <ProjectsSection />
        <ServicesSection />
        <OperatingModel />
        <CompanySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
