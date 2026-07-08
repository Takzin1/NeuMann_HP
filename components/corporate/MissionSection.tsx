import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/corporate/SectionTitle";
import { mission } from "@/lib/site";

export function MissionSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-paper py-24 lg:py-32"
      aria-label="Mission"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <Reveal>
          <SectionTitle
            eyebrow={mission.eyebrow}
            heading={
              <>
                {mission.headline.split("\n").map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </>
            }
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 max-w-2xl space-y-5 border-l-2 border-ai/25 pl-6">
            {mission.body.map((para) => (
              <p key={para} className="text-[15px] leading-[1.95] text-muted">
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
