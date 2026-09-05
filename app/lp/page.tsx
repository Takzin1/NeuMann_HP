// =============================================================================
// 旧プロダクトLP（アーカイブ）。
// コーポレートサイト移行前の1ページLPを /lp で参照できるよう温存しています。
// 不要になったらこのディレクトリごと削除して構いません。
// =============================================================================
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Concept } from "@/components/Concept";
import { Products } from "@/components/Products";
import { FeaturedMimamori } from "@/components/FeaturedMimamori";
import { Activity } from "@/components/Activity";
import { Mission } from "@/components/Mission";
import { Milestones } from "@/components/Milestones";
import { Founder } from "@/components/Founder";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "NeuMann.LLC｜旧LP（アーカイブ）",
  alternates: { canonical: "/lp" },
  openGraph: {
    title: "NeuMann.LLC｜旧LP（アーカイブ）",
    description: site.description,
    url: new URL("/lp", site.url).href,
    type: "website",
    locale: "ja_JP",
    siteName: site.nameEn,
  },
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Concept />
        <Products />
       <FeaturedMimamori />
        <Activity />
        <Mission />
        <Milestones />
        <Founder />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
