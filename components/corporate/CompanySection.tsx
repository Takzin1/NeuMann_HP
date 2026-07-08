import { Reveal } from "@/components/Reveal";
import { CompanyInfo } from "@/components/corporate/CompanyInfo";
import { SectionTitle } from "@/components/corporate/SectionTitle";
import { companySection } from "@/lib/site";

export function CompanySection() {
  return (
    <section
      id="company"
      className="scroll-mt-20 border-y border-line bg-mist py-24 lg:py-32"
      aria-label="Company"
    >
      <div className="mx-auto w-full max-w-4xl px-6 sm:px-8 lg:px-10">
        <Reveal>
          <SectionTitle
            eyebrow={companySection.eyebrow}
            heading={companySection.heading}
          />
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-12">
            <CompanyInfo />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
