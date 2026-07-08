import { Container, Eyebrow } from "./ui";
import { Reveal } from "./Reveal";
import { founder } from "@/lib/content";

export function Founder() {
  return (
    <section
      id="founder"
      className="scroll-mt-20 border-t border-line bg-paper py-24 sm:py-32"
    >
      <Container>
        <Reveal>
          <Eyebrow tone="ai">{founder.eyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:grid-cols-[auto_1fr] sm:gap-12 lg:gap-16">
          <Reveal>
            <img
              src="/founder.png"
              alt={founder.name}
              className="h-24 w-24 rounded-xl border border-line object-cover sm:h-28 sm:w-28"
            />
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-[24px] font-bold tracking-[0.02em] text-ink sm:text-[28px]">
              {founder.name}
            </h2>
            <p className="mt-3 font-display text-[16px] leading-[1.7] text-ai sm:text-[18px]">
              {founder.role}
            </p>
            <p className="mt-4 text-[13.5px] leading-[1.8] text-muted">
              {founder.affiliation}
            </p>

            <div className="mt-7 max-w-xl space-y-3 border-l-2 border-line pl-5">
              {founder.bio.map((line) => (
                <p
                  key={line}
                  className="text-[15px] leading-[1.95] text-ink/80"
                >
                  {line}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
