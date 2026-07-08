import type { ServiceItem } from "@/lib/site";

export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article className="flex h-full flex-col rounded-md border border-line bg-paper p-6 transition-colors hover:border-ai/40">
      <h3 className="text-[14.5px] font-bold leading-snug tracking-tight text-ink">
        {service.title}
      </h3>
      <p className="mt-2.5 text-[13px] leading-[1.85] text-muted">
        {service.body}
      </p>
    </article>
  );
}
