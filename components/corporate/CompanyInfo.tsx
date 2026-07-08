import { companyFields, companySection } from "@/lib/site";

export function CompanyInfo() {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-paper">
      <dl>
        {companyFields.map((field, i) => (
          <div
            key={field.label}
            className={`grid gap-1 px-6 py-5 sm:grid-cols-[160px_1fr] sm:gap-6 sm:px-8 ${
              i !== 0 ? "border-t border-line" : ""
            }`}
          >
            <dt className="text-[13px] font-semibold tracking-wide text-muted">
              {field.label}
            </dt>
            <dd className="text-[14.5px] leading-relaxed text-ink">
              {field.value}
              {field.provisional && <span className="sr-only">（未確定）</span>}
            </dd>
          </div>
        ))}
      </dl>
      <p className="border-t border-line bg-mist px-6 py-4 text-[12px] leading-relaxed text-muted sm:px-8">
        {companySection.note}
      </p>
    </div>
  );
}
