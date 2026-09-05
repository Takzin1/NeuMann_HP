import { SectionTitle } from "@/components/corporate/SectionTitle";
import { whatWeDo } from "@/lib/site";

/**
 * 3つの役割を hairline row として並べる。
 *
 * カード・面の塗り・radius・アイコンは持たない。役割名と説明だけで成立させる。
 * （RoleIcon は row 化により情報構造上の役割を失ったため削除した。
 *   空いた領域を別のアイコン・番号・図形で埋めない。）
 *
 * 列構成は Services と揃える。同じ「名称 + 説明」の 2 列構造なので、
 * 別の比率を持ち込むとページ内に無用な差異が生まれる。
 */
export function WhatWeDo() {
  return (
    <section
      className="section border-t border-line bg-void"
      aria-label="What We Do"
    >
      <div className="container-page">
        <SectionTitle heading={whatWeDo.heading} />
        <ul className="mt-12 border-t border-line">
          {whatWeDo.items.map((item) => (
            <li key={item.id} className="border-b border-line">
              <div className="grid gap-x-6 gap-y-2 py-8 md:grid-cols-[minmax(0,7fr)_minmax(0,9fr)]">
                <h3 className="type-h3 text-fg">{item.title}</h3>
                <p className="type-secondary text-fg-muted md:pt-2">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
