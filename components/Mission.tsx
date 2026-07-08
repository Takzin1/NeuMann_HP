import { Container, Eyebrow } from "./ui";
import { Reveal } from "./Reveal";
import { mission } from "@/lib/content";

export function Mission() {
  return (
    <section
      id="mission"
      className="scroll-mt-20 border-t border-line bg-paper py-28 sm:py-36"
    >
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="ai" className="justify-center">
            {mission.eyebrow}
          </Eyebrow>

          <h2 className="mt-8 whitespace-pre-line font-display text-[28px] font-medium leading-[1.55] text-ink sm:text-[40px] sm:leading-[1.5]">
            {mission.headline}
          </h2>

          <div className="mt-10 space-y-2">
            {mission.lines.map((line) => (
              <p
                key={line}
                className="text-[15px] leading-[1.9] text-muted sm:text-base"
              >
                {line}
              </p>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-[16px] font-medium leading-[2] text-ink sm:text-[17px]">
            {mission.body}
          </p>

          <p className="mx-auto mt-8 max-w-xl text-[14px] leading-[1.95] text-muted">
            {mission.closing}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
