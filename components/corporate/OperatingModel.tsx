import { SectionTitle } from "@/components/corporate/SectionTitle";
import { operatingModel, operatingModelSection } from "@/lib/site";

/**
 * NeuMann の Operating Model（Research → Build → Field → Learn）。
 *
 * 抽象図・ベン図・円環ダイアグラム・矢印は使わない。循環は情報構造で読ませる。
 *  - <ol> で順序を意味づける（視覚的な連番は付けない）。
 *  - 01/02/03/04 を表示しないのは、終端のある funnel に見えてしまうため。
 *    順序は縦の並びが既に伝えており、番号は「循環」という主旨と衝突する。
 *  - 最終段階 Learn の末尾に「次の Research へ戻る」一文だけを置いて閉じる。
 *
 * mono ラベルは右列の output / evidence にのみ使う。これは実在する成果物名。
 */
export function OperatingModel() {
  return (
    <section
      id="operating-model"
      className="section border-t border-line bg-void"
      aria-label="Operating Model"
    >
      <div className="container-page">
        <SectionTitle
          heading={operatingModelSection.heading}
          lead={operatingModelSection.lead}
        />

        <ol className="mt-12 border-t border-line">
          {operatingModel.map((stage) => (
            <li key={stage.id} className="border-b border-line">
              <div className="grid gap-x-6 gap-y-4 py-8 md:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[200px_minmax(0,1fr)_260px]">
                {/* 段階名。Hero の Display と同じ語・同じ書体で対応づける。 */}
                <h3 className="type-h3 text-fg">{stage.stage}</h3>

                <div>
                  <p className="type-body max-w-measure text-fg-muted">
                    {stage.body}
                  </p>
                  {stage.closing && (
                    <p className="type-body mt-6 max-w-measure text-fg">
                      {stage.closing}
                    </p>
                  )}
                </div>

                {/* その段階で実際に残るもの */}
                {/* md では説明の直下（第2カラム）に、lg では第3カラムに置く。
                    md で第1カラムへ回り込むと、段階名の付属物に見えてしまうため。 */}
                <ul className="flex flex-col gap-2 md:col-start-2 lg:col-start-3 lg:pt-2">
                  {stage.outputs.map((o) => (
                    <li key={o} className="type-mono text-fg-muted">
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
