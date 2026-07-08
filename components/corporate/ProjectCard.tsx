import type { Project } from "@/lib/site";

function StatusChips({ status }: { status: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="ステータス">
      {status.map((s) => (
        <li
          key={s}
          className="rounded-sm border border-ai/25 bg-ai/5 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ai"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const featured = Boolean(project.featured);

  return (
    <article
      className={`flex h-full flex-col rounded-md border border-line bg-paper transition-colors hover:border-ai/40 ${
        featured ? "p-8 sm:p-10 md:col-span-2" : "p-8"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-muted">
            {project.category}
          </p>
          <h3 className="mt-2 font-display text-[22px] font-medium tracking-tight text-ink sm:text-[24px]">
            {project.name}
            {project.nameEn && (
              <span className="ml-3 align-middle text-[12px] font-sans font-medium uppercase tracking-[0.14em] text-muted">
                {project.nameEn}
              </span>
            )}
          </h3>
        </div>
        <StatusChips status={project.status} />
      </div>

      <p
        className={`mt-4 text-[14.5px] leading-[1.9] text-muted ${
          featured ? "max-w-2xl" : ""
        }`}
      >
        {project.description}
      </p>

      {project.features && (
        <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {project.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-ink">
              <svg
                viewBox="0 0 16 16"
                className="mt-1 h-3.5 w-3.5 shrink-0 text-ai"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 8.5l3.2 3L13 4.5" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
      )}

      {project.note && (
        <p className="mt-6 border-t border-line pt-4 text-[12px] leading-relaxed text-muted">
          {project.note}
        </p>
      )}
    </article>
  );
}
