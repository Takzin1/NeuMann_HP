import { Container, Eyebrow } from "./ui";
import { Reveal } from "./Reveal";
import { milestones, milestonesIntro } from "@/lib/content";

export function Milestones() {
  return (
    <section
      id="milestones"
      className="scroll-mt-20 border-t border-line bg-mist py-24 sm:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <Eyebrow tone="ai">{milestonesIntro.eyebrow}</Eyebrow>
            <h2 className="mt-6 text-[26px] font-bold leading-[1.4] text-ink sm:text-[32px]">
              {milestonesIntro.heading}
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-[1.95] text-muted">
              {milestonesIntro.lead}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ol className="relative border-l border-line pl-7 sm:pl-9">
              {milestones.map((m, i) => (
                <li
                  key={i}
                  className={`relative ${
                    i === milestones.length - 1 ? "" : "pb-8 sm:pb-9"
                  }`}
                >
                  <span
                    className="absolute -left-[35px] top-1 flex h-3.5 w-3.5 items-center justify-center sm:-left-[43px]"
                    aria-hidden="true"
                  >
                    <span className="h-2.5 w-2.5 rounded-full border-2 border-ai bg-paper" />
                  </span>
                  <span className="inline-flex rounded-full bg-ai/8 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-ai">
                    {m.tag}
                  </span>
                  {m.href ? (
                    <a
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring mt-2.5 block text-[15px] leading-[1.7] text-ai underline decoration-line underline-offset-4 transition-colors hover:decoration-ai"
                    >
                      {m.title}
                    </a>
                  ) : (
                    <p className="mt-2.5 text-[15px] leading-[1.7] text-ink">
                      {m.title}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
