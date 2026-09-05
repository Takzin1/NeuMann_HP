import { SectionTitle } from "@/components/corporate/SectionTitle";
import { mission } from "@/lib/site";

export function MissionSection() {
  return (
    <section id="about" className="section bg-void" aria-label="Mission">
      <div className="container-page">
        {/* 装飾 eyebrow は置かない。H2 単体で立たせる。 */}
        <SectionTitle
          heading={
            <>
              {mission.headline.split("\n").map((line, i) => (
                <span key={line}>
                  {/* 改行は md 以上でのみ効かせる。320px で強制すると
                      行末に「を、」だけが残り、和文の禁則として不適切になる。 */}
                  {i > 0 && <br className="hidden md:inline" />}
                  {line}
                </span>
              ))}
            </>
          }
        />
        <div className="mt-8 max-w-measure space-y-6 border-l border-line pl-6">
          {mission.body.map((para) => (
            <p key={para} className="type-body text-fg-muted">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
