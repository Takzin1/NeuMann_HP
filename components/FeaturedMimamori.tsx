import { Container, Eyebrow } from "./ui";
import { Reveal } from "./Reveal";
import { mimamori } from "@/lib/content";

export function FeaturedMimamori() {
  return (
    <section
      id="mimamori"
      className="scroll-mt-20 bg-ai-deep py-24 text-white sm:py-32"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* 左：見出し・理念 */}
          <Reveal>
            <Eyebrow tone="light">{mimamori.eyebrow}</Eyebrow>
            <h2 className="mt-6 whitespace-pre-line font-display text-[27px] font-medium leading-[1.5] text-white sm:text-[34px]">
              {mimamori.heading}
            </h2>
            <p className="mt-6 max-w-md text-[14.5px] leading-[2] text-white/70">
              {mimamori.lead}
            </p>

            <ul className="mt-9 space-y-3.5">
              {mimamori.principles.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 text-[14px] leading-[1.85] text-white/80"
                >
                  <span
                    className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/45"
                    aria-hidden="true"
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* 右：3ステップ */}
          <Reveal delay={120}>
            <ol className="space-y-4">
              {mimamori.steps.map((step) => (
                <li
                  key={step.no}
                  className="rounded-lg border border-white/12 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-white/25"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-[22px] font-medium leading-none text-white/45">
                      {step.no}
                    </span>
                    <div>
                      <h3 className="text-[16px] font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[13.5px] leading-[1.9] text-white/65">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-6 text-[12.5px] leading-[1.8] text-white/45">
              {mimamori.note}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
