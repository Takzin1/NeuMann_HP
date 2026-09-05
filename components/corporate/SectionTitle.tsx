import type { ReactNode } from "react";

/**
 * セクション共通の見出し。
 *
 * NEUMANN_DESIGN.md §4.3 のとおり **H2 単体**で立たせる。
 * 見出しの上に置く装飾 eyebrow は持たない（§2.5：mono ラベルは実データにのみ使う）。
 * 実データのラベルが必要な場合は、行や要素の内側に mono で置くこと。
 */
export function SectionTitle({
  heading,
  lead,
}: {
  heading: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <div>
      <h2 className="type-h2 text-fg">{heading}</h2>
      {lead && (
        <p className="type-lead mt-6 max-w-measure text-fg-muted">{lead}</p>
      )}
    </div>
  );
}
