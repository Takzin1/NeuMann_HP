import type { Project } from "@/lib/site";

// status は実データなので mono ラベルとして扱う。
// pill radius が許されるのはこの chip のみ。横 padding は 8px。
function StatusChips({ status }: { status: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="ステータス">
      {status.map((s) => (
        <li
          key={s}
          className="type-mono inline-flex h-6 items-center rounded-pill border border-line px-2 text-fg-muted"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

/**
 * Projects は hairline-separated row として組む。カードにしない。
 * 面の塗り・角丸・影を持たず、区切りは 1px の hairline だけが担う。
 *
 * 各 project は同格に扱う。featured による装飾的な強調は行わず、
 * 情報密度の差は category / status / features / note の実データ量が自然に生む。
 */
export function ProjectRow({ project }: { project: Project }) {
  return (
    <li className="border-b border-line">
      <article className="grid gap-x-6 gap-y-4 py-8 md:grid-cols-[160px_minmax(0,1fr)]">
        <p className="type-mono text-fg-muted md:pt-2">{project.category}</p>

        <div>
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
            <h3 className="type-h3 text-fg">
              {project.name}
              {project.nameEn && (
                <span className="type-mono ml-4 align-middle text-fg-muted">
                  {project.nameEn}
                </span>
              )}
            </h3>
            <div className="md:pt-2">
              <StatusChips status={project.status} />
            </div>
          </div>

          <p className="type-secondary mt-4 max-w-measure text-fg-muted">
            {project.description}
          </p>

          {project.features && (
            <ul className="mt-6 grid max-w-measure gap-x-8 gap-y-2 sm:grid-cols-2">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="type-secondary flex items-start gap-2 text-fg"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="mt-1 h-4 w-4 shrink-0 text-fg-muted"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
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
            <p className="type-secondary mt-6 max-w-measure border-l border-line pl-4 text-fg-muted">
              {project.note}
            </p>
          )}
        </div>
      </article>
    </li>
  );
}
