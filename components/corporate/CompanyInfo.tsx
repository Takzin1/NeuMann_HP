import { companyFields, companySection } from "@/lib/site";

/**
 * 会社概要。外枠・角丸・面の塗りを持たない純粋な hairline definition list。
 * カードで囲わない（NEUMANN_DESIGN.md §4.9）。
 */
export function CompanyInfo() {
  return (
    <>
      <dl className="border-t border-line">
        {companyFields.map((field) => (
          <div
            key={field.label}
            className="grid gap-x-6 gap-y-1 border-b border-line py-6 sm:grid-cols-[160px_minmax(0,1fr)]"
          >
            <dt className="type-secondary font-medium text-fg-muted">
              {field.label}
            </dt>
            <dd className="type-body text-fg">
              {field.value}
              {field.provisional && (
                <span className="type-mono ml-2 align-middle text-fg-muted">
                  TBD
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p className="type-secondary mt-6 text-fg-muted">{companySection.note}</p>
    </>
  );
}
