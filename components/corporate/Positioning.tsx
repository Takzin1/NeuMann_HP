import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/corporate/SectionTitle";
import { positioning } from "@/lib/site";

// Research / Product / Public Implementation の3領域が重なる図。
// 重なりが自然に濃くなるよう、各円をごく薄い藍で塗り、交点にNeuMannを置く。
function DomainOverlap() {
  return (
    <svg
      viewBox="0 0 480 440"
      role="img"
      aria-label="Research、Product、Public Implementationの3領域が重なり、その交点にNeuMannが位置する図"
      className="w-full max-w-md"
    >
      <g stroke="#1B3A5C" strokeWidth="1.2">
        {/* Research（上） */}
        <circle cx="240" cy="160" r="118" fill="#1B3A5C" fillOpacity="0.045" />
        {/* Product（左下） */}
        <circle cx="172" cy="272" r="118" fill="#1B3A5C" fillOpacity="0.045" />
        {/* Public Implementation（右下） */}
        <circle cx="308" cy="272" r="118" fill="#1B3A5C" fillOpacity="0.045" />
      </g>

      {/* 領域ラベル */}
      <g
        fill="#1B3A5C"
        fontSize="12"
        fontWeight="600"
        letterSpacing="0.14em"
        fontFamily="system-ui, sans-serif"
      >
        <text x="240" y="86" textAnchor="middle">
          RESEARCH
        </text>
        <text x="112" y="352" textAnchor="middle">
          PRODUCT
        </text>
        <text x="368" y="352" textAnchor="middle">
          PUBLIC
        </text>
        <text x="368" y="368" textAnchor="middle">
          IMPLEMENTATION
        </text>
      </g>

      {/* 交点 = NeuMann */}
      <circle cx="240" cy="228" r="3" fill="#1B3A5C" />
      <text
        x="240"
        y="252"
        textAnchor="middle"
        fill="#14191D"
        fontSize="13.5"
        fontWeight="700"
        letterSpacing="0.02em"
        fontFamily="system-ui, sans-serif"
      >
        NeuMann
      </text>
    </svg>
  );
}

export function Positioning() {
  return (
    <section className="bg-paper py-24 lg:py-32" aria-label="Positioning">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionTitle
                eyebrow={positioning.eyebrow}
                heading={positioning.heading}
                lead={positioning.body}
              />
            </Reveal>

            <Reveal delay={100}>
              <dl className="mt-10 space-y-5 border-l-2 border-ai/25 pl-6">
                {positioning.lines.map((line) => (
                  <div key={line.to}>
                    <dt className="text-[13.5px] text-muted">{line.from}</dt>
                    <dd className="mt-1 font-display text-[17px] font-medium text-ink">
                      {line.to}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 text-[15px] font-medium leading-relaxed text-ink">
                {positioning.closing}
              </p>
            </Reveal>
          </div>

          <Reveal delay={150} className="flex justify-center lg:justify-end">
            <DomainOverlap />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
