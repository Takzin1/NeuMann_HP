import { Container, Eyebrow } from "./ui";
import { Reveal } from "./Reveal";
import { concept } from "@/lib/content";

export function Concept() {
  return (
    <section className="border-t border-line bg-mist py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal>
            <Eyebrow tone="ai">{concept.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[26px] font-medium leading-[1.55] text-ink sm:text-[32px]">
              {concept.heading}
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-[1.95] text-muted">
              {concept.lead}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <dl className="divide-y divide-line border-y border-line">
              {concept.problems.map((p) => (
                <div
                  key={p.term}
                  className="grid grid-cols-1 gap-1.5 py-5 sm:grid-cols-[140px_1fr] sm:gap-6 sm:py-6"
                >
                  <dt className="text-[15px] font-semibold text-ink">
                    {p.term}
                  </dt>
                  <dd className="text-[14px] leading-[1.9] text-muted">
                    {p.body}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-[15px] leading-[1.9] text-ink/80">
              {concept.closing}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
