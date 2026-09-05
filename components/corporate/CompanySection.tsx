import { CompanyInfo } from "@/components/corporate/CompanyInfo";
import { SectionTitle } from "@/components/corporate/SectionTitle";
import { companySection } from "@/lib/site";

export function CompanySection() {
  return (
    <section
      id="company"
      className="section border-t border-line bg-void"
      aria-label="Company"
    >
      {/* container は 1 系統。幅の絞り込みは measure で行う。 */}
      <div className="container-page">
        <div className="max-w-measure">
          {/* 装飾 eyebrow は置かない。H2 単体で立たせる。 */}
          <SectionTitle heading={companySection.heading} />
          <div className="mt-12">
            <CompanyInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
