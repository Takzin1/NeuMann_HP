import type { ServiceItem } from "@/lib/site";

/**
 * Services も hairline-separated row。
 * 見出しは type-h3 に統一した（PR1 の type-lead 暫定運用を解消）。
 * row では 1 件あたりの横幅が広く取れるため、H3 32px でも過密にならない。
 */
export function ServiceRow({ service }: { service: ServiceItem }) {
  return (
    <li className="border-b border-line">
      <div className="grid gap-x-6 gap-y-2 py-8 md:grid-cols-[minmax(0,7fr)_minmax(0,9fr)]">
        <h3 className="type-h3 text-fg">{service.title}</h3>
        {/* 14px の本文を 32px 見出しの視覚的な行に合わせるための 8px */}
        <p className="type-secondary text-fg-muted md:pt-2">{service.body}</p>
      </div>
    </li>
  );
}
