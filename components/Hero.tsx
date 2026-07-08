import { BackdropContours } from "./BackdropContours";
import { Container, Eyebrow } from "./ui";
import { company } from "@/lib/content";

// タグラインの各行を描画。アクセント語が含まれる行はその部分だけ藍で強調。
function TaglineLine({ line, accent }: { line: string; accent: string }) {
  if (accent && line.includes(accent)) {
    const [before, after] = line.split(accent);
    return (
      <>
        {before}
        <span className="text-ai">{accent}</span>
        {after}
      </>
    );
  }
  return <>{line}</>;
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper">
      <BackdropContours className="pointer-events-none absolute inset-0" />

      <Container className="relative">
        <div className="max-w-3xl pb-20 pt-32 sm:pb-28 sm:pt-40 lg:pt-44">
          <Eyebrow tone="ai">{company.eyebrow}</Eyebrow>

          <h1 className="mt-7 font-display text-[34px] font-medium leading-[1.32] tracking-[0.01em] text-ink sm:text-[46px] sm:leading-[1.3] lg:text-[54px]">
            {company.tagline.map((line, i) => (
              <span key={i} className="block">
                <TaglineLine line={line} accent={company.taglineAccent} />
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-xl text-[15px] leading-[1.95] text-muted sm:text-base">
            {company.summary}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#products"
              className="focus-ring inline-flex items-center justify-center rounded-md bg-ai px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-ai-hover"
            >
              プロダクトを見る
            </a>
            <a
              href="#contact"
              className="focus-ring inline-flex items-center justify-center rounded-md border border-line bg-paper px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-mist"
            >
              お問い合わせ
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-muted">
            {company.focusAreas.map((area, i) => (
              <li key={area} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="text-line" aria-hidden="true">
                    ·
                  </span>
                )}
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
