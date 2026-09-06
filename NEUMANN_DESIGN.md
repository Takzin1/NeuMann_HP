# NeuMann LLC — Design System

> 福島から、研究と実証を社会で使われるプロダクトへ翻訳する会社。
> 画面は主張しない。主張するのは、そこに置かれた研究成果・プロダクト・現場の証拠である。

**Theme:** dark
**Status:** **v1.0 — FROZEN**（PR1–PR6 で全面実装済み）
**Supersedes:** なし（`DESIGN.md` = Factory 参照資料は移行思想の出典であり、本書の上位仕様ではない）

---

## Change control

本書は凍結されている。**実装は本書に従い、本書は実装に従わない。**

以下に該当しない変更は、デザインシステムの変更ではなくコンテンツ・デプロイ作業として扱う。

再オープンが必要なのは次の場合に限る。

1. ブランド戦略そのものの変更（赤の予算、ロゴの扱い、Hero の主役、dark canvas の前提）
2. トークンの追加・変更（color / font / spacing / radius / motion / breakpoint）
3. 既存ルール同士の明確な衝突が発見された場合
4. アクセシビリティ上の不備が実測で確認された場合（例：本書 §1.4 の実測でテキスト色 2 件を不採用にしたケース）

新しいセクションやコンポーネントを作る場合も、§4 の既存アーキタイプ（hairline row / definition list / evidence media frame）の組み合わせで構成し、新しい原型を増やさない。

---

## 0. 設計思想

NeuMann は AI-native R&D company であり、SaaS プロダクト企業ではない。したがって画面の役割は「製品を売り込むこと」ではなく **「研究・実装・現場・学習のサイクルが実際に回っている証拠を、余計な演出なしに提示すること」** にある。

この目的から 4 つの原則が導かれる。

**1. 面ではなく線で構造をつくる。**
情報の区切りは 1px の hairline が担う。カードで囲って浮かせる操作は、本来並列でないものを並列に見せてしまうため、原則として使わない。Projects も Services も「行」として並べる。

**2. 階層はサイズと余白でつくる。**
太字で殴らない。weight 700 は禁止、600 は例外。Display 72px と Body 16px の 4.5 倍差、および 120px の section 余白が階層を担う。

**3. 色は信号であり、装飾ではない。**
画面の 90% 以上は black / gray / white。赤は「NeuMann である」「いま動いている」ことを示す 1 点のみに使う。1 ビューポートに赤が 3 箇所以上現れたら、それは設計の失敗である。

**4. 静止していて強い。**
スクロールに反応して要素が湧き出す必要はない。アニメーションは「状態が変わったこと」を伝えるときだけ動く。Hero はロード直後の静止画として完成していなければならない。

### Factory から借りたもの / 借りなかったもの

| 借りたもの | 借りなかったもの |
|---|---|
| dark canvas | orange / green accent |
| hairline borders | terminal 的な見立て・演出 |
| low visual noise | Factory の具体トークン値 |
| size / spacing による階層 | Factory 固有コンポーネント（Dashboard Frame 等） |
| Geist / Geist Mono | 英語のみを前提とした組版規則 |
| 影・グラス・装飾グラデーションの排除 | line-height 1.5 上限（日本語に適用しない） |
| color as signal | pill button（9999px） |

---

## 1. Tokens — Color

### 1.1 正典パレット

指定された 9 色。**この 9 色の外に色を足さない。**

| Name | Value | Token | Role |
|------|-------|-------|------|
| Void Black | `#080808` | `--color-void` | ページ基底。全セクションの既定背景 |
| Carbon | `#111111` | `--color-carbon` | 副次バンド。1 ページ内で最大 2 セクションまで |
| Elevated | `#171717` | `--color-elevated` | 入力欄、secondary button、行の hover 背景 |
| Border | `#2C2929` | `--color-border` | 全 hairline、区切り線、枠線。1px 専用 |
| Primary Text | `#F3F1EE` | `--color-text` | 見出し・本文・主要ラベル |
| Muted Text | `#928B88` | `--color-text-muted` | 補足文、mono ラベル、非活性、メタ情報 |
| NeuMann Red | `#781522` | `--color-red` | brand signal。primary button の塗り、ロゴマーク |
| Deep Red | `#4D0B13` | `--color-red-deep` | 極低彩度の面。強調行の左罫、選択状態の下地 |
| Signal Red | `#A51F32` | `--color-red-signal` | 稼働中・進行中を示す点。hover 時の red 昇格 |

### 1.2 派生トークン（要判断）

正典 9 色では埋まらないスロットが 2 つある。以下は本書での提案であり、**承認されるまで実装しない。**

| Name | 提案値 | 用途 | 提案理由 |
|------|-------|------|---------|
| Border Strong | `#3A3634` | hairline の hover 状態 | Border `#2C2929` のままだと hover が視認できない。彩度を持たせず輝度のみ上げる |
| Text Faint | `#5C5654` | **装飾的マーカーのみ**（リストの点、区切りのスラッシュ等） | Void 上で **2.78:1** しかなく、テキストに使うと AA を満たさない。実装時に copyright・注記・TBD ラベルへ適用したところ可読性が不足したため、用途を非テキスト要素に限定した |

代替案として、派生色を作らず `Muted Text` に `opacity` を掛ける方法もある。ただしこれは監査で Factory 版に対して指摘した「未定義の alpha 体系が肥大する」問題を再発させるため、**固定 hex を追加する方を推奨する。**

### 1.3 赤の使用規約

赤は 3 段で役割が完全に分かれている。混用しない。

| 色 | 許可される用途 | 禁止 |
|---|---|---|
| NeuMann Red `#781522` | **ロゴマークの角** / **Header CTA の塗り** | テキスト色、大面積の背景、border、その他のボタン |
| Deep Red `#4D0B13` | 強調行の左 2px 罫（例外的に 2px を許可）/ 選択行の背景 | テキスト色、button の塗り |
| Signal Red `#A51F32` | 6px の状態マーク / 進行中 chip の border / hover 時の brand 要素 | **テキスト色（コントラスト不足、下記参照）** |

**予算ルール:** 赤が現れてよいのは **ロゴマークの角** と **Header CTA** の 2 箇所のみ。ヘッダーは固定表示なので、どの位置までスクロールしても赤は常にこの 2 箇所で、それ以上には増えない。

この結果、以下は赤を使わない。
- Hero の primary button → neutral light fill（§4.6）
- Hero の「FROM FUKUSHIMA, JAPAN」マーク → Primary Text の 6px 正方形
- Contact の送信ボタン → neutral light fill
- Footer のロゴ → monochrome

### 1.4 コントラスト検証

WCAG 2.1 相対輝度で実測した値。

| 前景 | 背景 | 比 | 判定 |
|---|---|---|---|
| Primary Text `#F3F1EE` | Void `#080808` | **17.8 : 1** | AAA |
| Primary Text | Elevated `#171717` | **15.9 : 1** | AAA |
| Muted Text `#928B88` | Void `#080808` | **6.0 : 1** | AA（本文可） |
| Muted Text | Elevated `#171717` | **5.4 : 1** | AA（本文可） |
| Primary Text | NeuMann Red `#781522` | **9.8 : 1** | AAA（赤ボタン上の白文字は安全） |
| Primary Text | Signal Red `#A51F32` | **6.5 : 1** | AA |
| Primary Text | Deep Red `#4D0B13` | **13.6 : 1** | AAA |
| Signal Red `#A51F32` | Void `#080808` | **2.7 : 1** | **不合格** |
| Text Faint `#5C5654` | Void `#080808` | **2.78 : 1** | **不合格**（テキスト不可） |
| Border `#2C2929` | Void `#080808` | **1.4 : 1** | 非テキスト境界としても不足 |

この検証から確定する 2 つの規則：

- **Signal Red をテキスト色にしてはならない。** 2.7:1 は本文（4.5:1）にも大文字（3:1）にも届かない。塗り・点・stroke としてのみ使う。
- **Text Faint をテキスト色にしてはならない。** 装飾的なマーカー（点・スラッシュ）専用とし、注記・copyright・状態ラベルには Muted Text を使う。
- **Border だけを操作可能性の唯一の手がかりにしてはならない。** 1.4:1 は WCAG の非テキスト UI 基準 3:1 を満たさない。hairline で囲った行をクリック可能にする場合、必ずテキスト側（Primary Text）でも可視化する。

### 1.5 Focus

**Focus ring = `#F3F1EE` 2px / offset 2px / radius は対象要素に一致。**

Signal Red を focus ring にしたくなるが、上記の通り Void 上で 2.7:1 しかなく、キーボード利用者にとって不可視に近い。brand 色よりアクセシビリティを優先する。

---

## 2. Tokens — Typography

### 2.1 フォントスタック

```
--font-sans: 'Geist', 'Noto Sans JP', 'Hiragino Kaku Gothic ProN',
             'Hiragino Sans', system-ui, sans-serif;
--font-mono: 'Geist Mono', 'Noto Sans Mono', ui-monospace,
             SFMono-Regular, Menlo, monospace;
```

**Geist を Noto Sans JP より先に置くことが必須。** ブラウザは字ごとにスタックを解決するため、この順序でラテン字・数字は Geist、日本語は Noto Sans JP でレンダリングされる。逆順にすると全文が Noto Sans JP になり、数字と英字の骨格が失われる。

**明朝 / serif は全面禁止。** 現行実装の `font-display`（ヒラギノ明朝 / Noto Serif JP）は廃止する。italic も使わない。

日本語には `font-feature-settings: "palt" 1` を適用する。約物のアキが詰まり、指定の tracking が意図通りに効く。

### 2.2 Weight

| Weight | 用途 |
|---|---|
| 400 | 既定。見出し・本文・ボタン・ナビの大半 |
| 500 | 強調。mono ラベル、表の見出し列、アクティブなナビ項目 |
| 600 | 例外のみ。1 ページに 3 箇所まで |
| 700 | **禁止** |

### 2.3 Type Scale

日本語とラテン字で line-height を分ける。日本語は仮想ボディに余白が含まれないため、同じ数値ではラテン字より詰まって見える。

| Role | Size | LH (Latin) | LH (日本語) | Tracking | Font / Weight |
|------|------|-----------|------------|----------|---------------|
| Display | 72 | 1.02 | 1.15 | -0.03em | Geist 400 |
| H2 | 44 | 1.08 | 1.35 | -0.025em | Geist 400 |
| H3 | 32 | 1.20 | 1.45 | -0.02em | Geist 400 |
| Lead | 20 | 1.50 | 1.75 | -0.01em | Geist 400 ／ *要判断* |
| Body | 16 | 1.50 | **1.75** | 0 | Geist / Noto Sans JP 400 |
| Secondary | 14 | 1.45 | **1.65** | 0 | 同上 400 |
| Mono Label | 12 | 1.00 | 1.40 | **+0.06em** | Geist Mono 500 / uppercase |

**Lead 20px は本書での追加提案（要判断）。** 指定スケールは H3 32 と Body 16 の間が空いており、日本語のリード文（section 冒頭の 2–3 行）を 16px で組むと本文と区別がつかない。20px を 1 段挟むことを推奨する。不要なら削除して H3 32 → Body 16 で運用可。

**行の折り返しについて。** `.type-h2` / `.type-h3` には `text-wrap: balance`、`.type-lead` には `text-wrap: pretty` を指定する。和文は分割点が多く、320px で見出しの最終行に 1〜2 字だけ残る現象が実測で発生したため。`pretty` は CJK では効果がなく、`balance` が必要だった。

**tracking の符号について。** ラテン字は指定通り負方向。日本語見出しに -0.03em を掛けると濁点・半濁点が潰れるため、**日本語には最大 -0.01em まで**とする。Mono Label のみ正方向 +0.06em — これは Factory の -0.02em からの意図的な逸脱で、12px の大文字モノスペースは字間を開けたほうが判読できるため。Factory 準拠に戻したい場合はここを 0 にする。

### 2.4 日本語 line-height の扱い

Factory の「1.5 を超えるな」は**適用しない。** 本文の日本語は **1.6–1.75** を許容範囲とし、既定を 1.75 とする。

ただし上限は 1.75 で止める。現行実装の 1.9 / 1.95 は行間が字面を上回り、段落が「文章の塊」ではなく「浮いた行の列」に見えるため、restrained design の意図と衝突する。

### 2.5 Mono Label の使用規約

Geist Mono の 12px 大文字は **実データを持つラベルにのみ使う。**

- 使ってよい：ステータス（`IN FIELD`）、年（`2024–`）、分類（`RESEARCH`）、指標の単位（`SITES` / `MODELS`）、所在（`FROM FUKUSHIMA, JAPAN`）
- 使ってはいけない：見出しの上に置くだけの装飾 eyebrow（`ABOUT` `SERVICES` `CONTACT` のような、見出しを英訳しただけのラベル）

現行実装の `SectionTitle` は全 section に英語 eyebrow ＋ 細線ダッシュを付けているが、これは情報を持たない定型装飾であり廃止する。section 見出しは **H2 単体**で立たせる。ラベルが必要なのは、そこに実際のデータがあるときだけ。

---

## 3. Tokens — Spacing & Layout

### 3.1 8px グリッド

```
4   (制限付き — アイコンと文字の間隔のみ)
8  16  24  32  40  48  64  80  96  120  160
```

4px は「アイコンとラベルの間」など、8px では離れすぎる箇所に限って許可する。それ以外で 8 の倍数以外の値（10 / 12 / 14 / 20 / 28 / 48※48は可 / 128）を使わない。

現行実装で頻出する `py-3.5`（14px）`gap-5`（20px）`gap-7`（28px）`mt-7`（28px）はすべて解消対象。

### 3.2 Layout

| 項目 | 値 |
|---|---|
| Container max-width | **1200px** |
| Grid | 12 column / gutter 24px |
| Outer gutter | 24px (base) / 40px (md) / 64px (xl) |
| Prose measure | **720px**（16px 日本語で約 45 字。80 字を超えさせない） |
| Section padding (縦) | 64px (base) / 96px (md) / **120px (xl)** |
| Section 区切り | 背景色の切替ではなく **1px hairline**（`#2C2929`） |
| Header 高 | **64px**（固定。`scroll-padding-top` と `scroll-mt` を同値に揃える） |

**背景バンドの交互配置を廃止する。** 現行の `paper` / `mist` 交互は Void 一色に統一し、区切りは hairline が担う。`Carbon #111111` は Contact など「性質が変わる」1–2 セクションにのみ使う。

**anchor オフセットのバグを持ち込まないこと。** 現行は header 64px に対し `scroll-padding-top: 5rem`(80px) / `scroll-mt-20`(80px) で 16px ずれている。header 高は単一の CSS 変数 `--header-h: 64px` として定義し、3 箇所すべてがそれを参照する。

### 3.3 Border Radius

| 対象 | 値 |
|---|---|
| links / rows / hairline separator | **0** |
| buttons / inputs | **4px** |
| cards（使う場合） | **8px 上限** |
| large panels / media frame | **12px 上限** |
| status chip | pill（`9999px`）— **chip のみ許可**。横 padding は 8px |

**9999px の pill button は禁止。** ボタンは 4px 角。

### 3.4 Border

- 幅は **1px のみ**。色は `Border #2C2929`。
- 例外：強調行の左罫として `Deep Red #4D0B13` の **2px** を許可（1 ページ 1 箇所まで）。
- SVG stroke は **1px（罫・チャート）** と **1.5px（24px 以上のアイコン）** の 2 値のみ。現行の 1.1 / 1.2 / 1.6 / 1.7 / 1.8 は統合する。

### 3.5 Elevation

**影は存在しない。** `box-shadow` / `filter: blur` / `backdrop-filter` は全面禁止。奥行きは `#080808` → `#111111` → `#171717` の 3 段の面と、hairline だけで表現する。

---

## 4. Components

### 4.1 Top Navigation

役割：全ページ共通ヘッダー。

- 高さ 64px、`position: fixed`、**背景は Void `#080808` の不透明塗り**。`backdrop-blur` は使わない（禁止事項）。
- 下端に 1px hairline。スクロール量に応じた変化はさせない。
- 左：**NM symbol + NEUMANN wordmark の horizontal lockup**（§4.12）。symbol は 24px、wordmark は Geist Mono 12px / 500 / uppercase / +0.06em / Primary Text。**会社名・肩書・所在地をヘッダー内で重ねて表示しない。**
- 右：ナビ項目を **Geist 14px / 400 / Primary Text**。日本語ラベルのため uppercase は適用しない。項目間 32px。
- hover：`Primary Text` → 変化なし、下線 1px が現れる（0px radius、色 `Border Strong`）。色は動かさない。
- アクティブ項目：weight 500。
- CTA：ナビ内 CTA が **サイト唯一の Brand ボタン**（赤）。ページ内の他の CTA に赤を複製しない。
- モバイル（< 768px）：**全画面オーバーレイ**（header 直下から画面下端まで）。開時に `body` のスクロールをロックし、`Esc` で閉じる。項目は hairline で区切る。

### 4.2 Hero

**静止して完成していること。** entrance animation を付けない。

構成（左揃え・単一カラム）：

```
┌─ container 1200 ────────────────────────────────────┐
│                                                     │
│  NEUMANN LLC / AI-NATIVE R&D COMPANY   ← mono 12   │
│                                                     │
│  Research.                             ← Display 72 │
│  Build.                                              │
│  Field.                                              │
│  Learn.                                              │
│                                                     │
│  研究・実証の知見を、                  ← Lead 20 JA │
│  社会で使われるプロダクトへ。                        │
│                                                     │
│  ■ FROM FUKUSHIMA, JAPAN               ← mono 12 + │
│                                          6px マーク  │
│                                                     │
│  [ Projects を見る ]  [ 会社概要 ]     ← btn 群     │
│                                                     │
├─ 1px hairline ──────────────────────────────────────┤
│  RESEARCH   BUILD   FIELD   LEARN      ← capability │
└─────────────────────────────────────────────────────┘
```

- `Research. Build. Field. Learn.` は **4 行に分ける**。1 行に流すと標語に見え、4 つの独立した活動であるという主旨が消える。
- 日本語リードは Muted ではなく **Primary Text** で置く。これは補足ではなく主張であるため。
- `FROM FUKUSHIMA, JAPAN` の直前に **6px 四方の Primary Text 正方形**。円ではなく正方形にするのは、汎用的な「ステータスドット」ではなく地点を指すマークだから。赤の予算はロゴの角と Header CTA で使い切っているため、ここでは赤を使わない。
- 背景は Void 一色。**`BackdropContours`（等高線グラフィック）は削除済み。** 抽象グラフィックによる情緒付けは本システムの禁止範囲。
- **ロゴを Hero に置かない。** 主役は `Research. Build. Field. Learn.` であり、ロゴを巨大な装飾要素として使うことも、アニメーションさせることも禁止する。
- capability rail：`RESEARCH / BUILD / FIELD / LEARN` を mono 12 / Muted で横並び。現行のキーワードレールを置き換える。
- レスポンシブ：Display 40 (base) → 56 (md) → 72 (xl)。

**2 カラム変種（許可）：** 右 5 カラムに実プロダクト UI のスクリーンショットを 12px radius の media frame で置く。ただし「静止して強い」を満たすため、テキストのみの単一カラムを既定とする。

### 4.3 Section Header

- **H2 単体。** 装飾 eyebrow は置かない（§2.5）。`SectionTitle` は `heading` と任意の `lead` しか受け取らない — eyebrow を渡す口自体を持たせないことで、装飾ラベルが再流入する経路を塞いでいる。
- 必要ならリード文を Lead 20 / Muted で H2 の下に 24px 空けて置く。prose measure 720px。
- section 上端に 1px hairline、その下 120px から H2 が始まる。

### 4.4 Hairline Row（本システムの主役コンポーネント）

**Projects / Services / Company は原則これで組む。カードを使わない。**

```
├──────────────────────────────────────────────────────┤
│ 2024–        見守りくん                    ● IN FIELD │
│ RESEARCH     Mimamori                                 │
│              高齢者見守りの実証を…（Secondary 14）      │
├──────────────────────────────────────────────────────┤
│ 2025–        次のプロジェクト               ● BUILDING │
```

- 上下 1px hairline のみ。**背景塗り・角丸・影なし。** radius 0。
- 縦 padding 32px、列 gutter 24px。
- 左列（固定 160px、md 以上）：分類を mono 12 / Muted。**年（`2024–` 等）は現在データが存在しないため未表示。** 仕様上の想定要素なので、コンテンツ側で確定したら追加する。
- 中央列：名称 H3 32、英字名称を mono 12 / Muted で同行右に、説明を Secondary 14 / Muted（measure 720）。
- 右列：status chip。
- hover：行全体の背景が `Elevated #171717` に 180ms で変化。border 色は動かさない。**行がリンクの場合のみ**。現状 Projects / Services はリンクを持たないため hover を実装していない。
- **番号（01 / 02 / 03）を振らない。** Projects は順序を持つ系列ではないため、番号は偽の意味を作る。年と状態は実データなので使ってよい。

### 4.5 Status Chip

システム内で **pill radius が許される唯一の要素。**

- 高さ 24px、**横 padding 8px**（8px グリッド準拠）、radius 9999px、1px border、mono 12 / 500 / uppercase / Muted Text。
- 稼働中（`IN FIELD` / `BUILDING`）：border を `Signal Red`、直前に 6px の Signal Red 円。テキストは Muted のまま（Signal Red は文字に使えない — §1.4）。
- 完了 / 停止：border `Border`、円なし。
- 点滅・脈動アニメーションは付けない。

### 4.6 Buttons

赤の予算（§1.3）に合わせて 3 階層に分ける。**Brand が使えるのは Header CTA だけ**で、ページ内のどこにも複製しない。

| 種別 | 塗り | 文字 | Border | Radius | 高さ / Padding | 用途 |
|---|---|---|---|---|---|---|
| Brand | `#781522` | `#F3F1EE` | なし | 4px | 44px / 0 24px | **Header CTA 専用**（1 サイト 1 箇所） |
| Primary | `#F3F1EE` | `#080808` | なし | 4px | 44px / 0 24px | ページ内の主導線（Hero、フォーム送信） |
| Secondary | 透明 | `#F3F1EE` | 1px `#2C2929` | 4px | 44px / 0 24px | 併置される副次操作 |
| Text link | なし | `#F3F1EE` | 下線 1px | 0 | なし | 本文中・行内 |

- weight は全種 **400**。
- **縦 padding は 0、高さ 44px を line-height で作る。** これによりボタン高が全画面で 1 値に固定される。
- hover：Brand は `#781522` → `#A51F32`。Primary は `#F3F1EE` → `#928B88`。Secondary は border が `#2C2929` → `#3A3634`。いずれも 180ms。
- **矢印（→）は「ページ / セクションを離れる」導線にのみ付ける。** すべての CTA に付けない。

### 4.7### 4.7 Evidence Media Frame

Factory の Dashboard Frame の置き換え。**macOS 風のウィンドウ装飾やトラフィックライトは付けない**（terminal imitation 禁止）。

- 12px radius、1px hairline、背景 `Carbon #111111`。影なし。
- 中身は **実物**：プロダクト UI のスクリーンショット、研究アウトプットの図表、コード、現地写真。
- 下に mono 12 / Muted のキャプション（撮影地・時期・出典）。キャプションは必須 — 「何の証拠か」が書かれていない画像は置かない。
- 抽象グラフィック、3D、グラデーションオーブは使わない。

### 4.8 Metric / Number

研究・実証の数値を出す箇所。

- 数値：Geist **44** / 400 / Primary Text / tracking -0.025em。
- 単位・ラベル：mono 12 / Muted / uppercase、数値の下に 8px。
- 区切りは 1px hairline のみ。カードで囲わない。
- 数値が更新される場合のみ、150ms の opacity 遷移を許可（§6）。

### 4.9 Company Data

定義リストを hairline row で組む。

- `dt`（項目名）160px 固定 / Secondary 14 / Muted / weight 500。
- `dd`（値）Body 16 / Primary Text。
- 行間の区切り 1px hairline、**外枠なし・radius 0**（PR4 で解体済み）。注記は面の塗りを持たせず、リストの外に `type-secondary` / Muted で置く。
- 未確定項目は `Text Faint` ＋ mono 12 の `TBD` ラベル。

### 4.10 Contact

- section 背景のみ `Carbon #111111` を許可（性質が変わる面のため）。
- 入力欄：背景 `Elevated #171717`、border 1px `Border`、radius 4px、高さ 44px、Body 16（16px 未満にすると iOS でズームが起きる）。
- ラベル：Secondary 14 / 500 / Primary Text。必須マークは `*` を Muted で。**赤を必須マークに使わない**（赤の予算を消費するため）。
- focus：ring `#F3F1EE` 2px / offset 2px。
- 送信ボタン：Primary（neutral light fill）。**フォーム全体を囲う枠・card radius は置かない**（PR6 で撤去済み）。入力欄自体は Elevated + 1px Border + 4px radius を維持する。
- 送信未接続の間の代替導線（mailto）は、フォームの下に hairline で区切って **常時表示**する。押してから初めて未接続と分かる状態にしない。送信を試みた場合のみ `role="status"` の一文を追加する。

### 4.11 Footer

- 背景 Void、上端 1px hairline、縦 padding 120px。
- 列見出し：mono 12 / 500 / uppercase / **Primary Text**（列の識別子なので Muted より 1 段上げる）。`Work` / `Company` / `Legal` の 3 列。
- リンク：Secondary 14 / 400 / Primary Text。hover で下線。
- 列間 40px、行間 8px。グリッドは `2 → sm:3`。
- 最下部に 1px hairline を挟んで copyright を mono 12 / Muted（`Text Faint` は 2.78:1 で不可）。
- ロゴマークは footer では NeuMann Red を使わず単色 Muted。赤の予算を footer で消費しない。

### 4.12 Brand Logo System

**ロゴは decorative asset ではなく identity marker である。** サイト内で反復表示しない。

#### 構成要素

| 要素 | 内容 |
|---|---|
| Symbol | NM を組んだユニコーンのマーク。ボディ off-white `#F3F1EE`、角 deep crimson `#781522` |
| Wordmark | `NEUMANN`（Geist Mono 12px / 500 / uppercase / +0.06em） |
| Horizontal lockup | symbol + wordmark、間隔 8px。Header / Footer で使う唯一の形 |

#### 出現箇所（これ以外に置かない）

| 箇所 | variant | symbol サイズ | 赤 |
|---|---|---|---|
| Header lockup | `brand` | 24px | 角のみ ✓ |
| Footer lockup | `mono` | 24px | 使わない |
| favicon / apple-icon | `brand` | — | 角のみ ✓ |
| OGP / Twitter card | `brand` | — | 角のみ ✓ |

- **Hero にロゴを置かない。** 巨大化して装飾要素にすること、アニメーションさせることを禁止する。
- **Footer は monochrome。** `currentColor` で描き、赤を使わない。
- symbol の off-white ボディ + deep crimson の角は、§1.3 の赤の予算に対する **ブランド例外**として許可される唯一の色使い。
- viewBox は `0 0 264 277`（マークの実寸バウンディングボックス）。余白は使用側で与える。

#### Favicon / metadata

Next.js App Router のファイル規約で配信する。

| ファイル | 用途 |
|---|---|
| `app/icon.svg` | favicon（320×320、Void 背景 + symbol） |
| `app/apple-icon.png` | iOS ホーム画面（180×180） |
| `app/opengraph-image.png` | OGP / Twitter card（1200×630） |
| `app/opengraph-image.alt.txt` | OGP 画像の代替テキスト |

NM symbol を primary brand identifier として扱う。ワードマーク単独のファビコンは作らない。


### 4.13 Operating Model rows

Research → Build → Field → Learn を、NeuMann の working cycle として提示する。**円環図・ベン図・矢印のインフォグラフィック・抽象 diagram は作らない。循環は情報構造で読ませる。**

```
├──────────────────────────────────────────────────────────────┤
│ Research      課題・現場・制度・技術を調べ、      RESEARCH QUESTION  │
│               検証すべき仮説を定義する。          HYPOTHESIS         │
│                                                 RESEARCH NOTE      │
├──────────────────────────────────────────────────────────────┤
│ Learn         現場から得られた証拠をもとに…       DECISION           │
│               学習は、次の Research へ戻る。      NEXT RESEARCH Q.   │
├──────────────────────────────────────────────────────────────┤
```

- 3 列（lg）：段階名 200px / 説明 / output 260px。md では output を説明の直下（第 2 カラム）に置く。第 1 カラムへ回り込ませると、段階名の付属物に見えてしまう。
- 段階名は `type-h3` の Geist、**sentence case**（`Research`）。Hero の Display `Research. Build. Field. Learn.` と同じ語・同じ書体で対応させ、ページ全体で 1 つのモデルを指していることを示す。
- 説明は `type-body` / Muted。output は `type-mono` / Muted。**mono を使ってよいのは output 列だけ**（実在する成果物名という実データのため）。
- **連番 01/02/03/04 は付けない。** 順序は縦の並びが既に伝えており、番号は終端のある funnel を連想させて「循環」という主旨と衝突する。順序の意味づけは `<ol>` で行い、視覚的な番号は出さない。
- 循環は **Learn 行の末尾の一文**（`学習は、次の Research へ戻る。`）だけで閉じる。矢印もループ図も置かない。
- 面の塗り・カード・影・グラデーション・radius・赤・motion は一切持たない。


---

## 5. Do's and Don'ts

### Do

- 全セクションの背景を `#080808` に統一し、区切りは 1px hairline に任せる。
- 見出しは weight 400 のまま、サイズと 120px の余白で立たせる。
- Projects / Services は行で組む。カードは「どうしても並列の面が必要な場合」の最終手段。
- mono ラベルは実データ（年・状態・分類・単位）にのみ付ける。
- 日本語本文は line-height 1.75、measure 720px。
- 赤はロゴの角と Header CTA の 2 箇所のみ。それ以外のボタンは neutral fill か hairline。
- 画像は実物（プロダクト UI / 研究出力 / 現場）。キャプションで出所を書く。

### Don't

- weight 700 を使わない。600 も 1 ページ 3 箇所まで。
- 明朝 / serif / italic を混ぜない。
- 影・`backdrop-filter`・グラス表現・装飾グラデーションを使わない。
- 見出しの上に意味のない英語 eyebrow を置かない。
- Signal Red を文字色にしない（2.7:1）。Text Faint も文字色にしない（2.78:1）。
- ロゴを Hero に大きく置かない。アニメーションさせない。サイト内で繰り返さない。
- Border だけを操作可能性の唯一の手がかりにしない（1.4:1）。
- 9999px の pill button を作らない（chip のみ）。
- Projects に 01 / 02 / 03 の連番を振らない。
- 抽象グラフィック・等高線・3D・オーブを背景に敷かない。
- 8 の倍数でない余白を足さない（アイコン間 4px を除く）。

---

## 6. Motion

**原則：アニメーションは system state が変わったことを伝えるときだけ動く。**

| Token | 値 |
|---|---|
| `--duration-micro` | 120ms |
| `--duration-state` | 180ms |
| `--ease` | `cubic-bezier(0.2, 0, 0, 1)` |

### 許可

- `opacity` の短い遷移（状態切替時）
- `color` / `background-color` / `border-color` の遷移
- status indicator の状態変化
- 数値・状態表示の更新遷移
- 抑制された hover（色・下線・背景の 1 段変化まで）

### 禁止

parallax / cursor follower / floating card / glassmorphism / background blur / スクロール連動の fade-in 連打 / gradient orb / 3D sphere / 汎用的な "AI っぽい" アニメーション

### 現行実装への含意

`components/Reveal.tsx`（IntersectionObserver ベースの `translateY(16px)` ＋ 700ms fade-in ＋ `delay={i * 90}` のスタッガー）は **撤去済み**。スクロールで要素が湧き出す挙動は「decorative fade-in spam」に該当し、「Studio 製 LP のようなヌルヌル感」そのものだった。

現在ページに残る遷移は **hover の色・border 変化（180ms）のみ**。ページロード時・スクロール時のアニメーションは 0 件。

`prefers-reduced-motion` の尊重（現行 `globals.css` に実装済み）は維持する。

---

## 7. Responsive

Factory 参照資料にはブレークポイント定義が存在しなかった。本書で確定させる。

| Name | Min width | 用途 |
|---|---|---|
| base | 0 | 単一カラム |
| `sm` | 640px | 2 カラムグリッド開始 |
| `md` | 768px | デスクトップナビ表示、gutter 40px |
| `lg` | 1024px | 3 カラムグリッド |
| `xl` | 1280px | container 1200px 到達、gutter 64px、Display 72px |

### 規則

1. **container は `xl` で 1200px に到達させる。** 現行の `max-w-6xl`(1152px) 止まりを解消する。
2. **container 幅は 1 系統。** 現行の `max-w-6xl` / `max-w-4xl` 併用を廃し、幅の絞り込みは container ではなく prose measure 720px で行う。
3. **型階層の最小比を守る。** 全ブレークポイントで `H3 ≥ Body × 1.3` を維持する。現行はモバイルで見出しが 37% 縮む一方 body が固定のため階層が退行している。
4. **段階数を全コンポーネントで揃える。** 見出しは base / md / xl の 3 段。Body 16・Secondary 14・Mono 12 は全幅で固定。
5. **グリッド進行を統一する。** `1 → sm:2 → lg:3`。現行の WhatWeDo `1 → md:3`（2 カラム段の飛ばし）は解消する。
6. **section padding は 64 / 96 / 120 の 3 段。** Hero も同じリズムに乗せる（現行は Hero だけ独自の 4 段）。
7. **header 高 64px は全幅で固定**し、`--header-h` を anchor offset と共用する。

### 型のレスポンシブ段

| Role | base | md | xl |
|---|---|---|---|
| Display | 40 | 56 | 72 |
| H2 | 30 | 36 | 44 |
| H3 | 22 | 26 | 32 |
| Lead | 17 | 18 | 20 |
| Body / Secondary / Mono | 16 / 14 / 12（固定） | | |

---

## 8. Quick Start

### CSS Custom Properties

```css
:root {
  /* Color — canonical */
  --color-void:        #080808;
  --color-carbon:      #111111;
  --color-elevated:    #171717;
  --color-border:      #2C2929;
  --color-text:        #F3F1EE;
  --color-text-muted:  #928B88;
  --color-red:         #781522;
  --color-red-deep:    #4D0B13;
  --color-red-signal:  #A51F32;

  /* Color — derived (要承認) */
  --color-border-strong: #3A3634;
  --color-text-faint:    #5C5654;

  /* Type */
  --font-sans: 'Geist', 'Noto Sans JP', 'Hiragino Kaku Gothic ProN',
               'Hiragino Sans', system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'Noto Sans Mono', ui-monospace,
               SFMono-Regular, Menlo, monospace;

  --text-display:   72px;  --leading-display:   1.02;  --tracking-display:  -0.03em;
  --text-h2:        44px;  --leading-h2:        1.08;  --tracking-h2:      -0.025em;
  --text-h3:        32px;  --leading-h3:        1.20;  --tracking-h3:      -0.02em;
  --text-lead:      20px;  --leading-lead:      1.75;  --tracking-lead:    -0.01em;
  --text-body:      16px;  --leading-body:      1.75;
  --text-secondary: 14px;  --leading-secondary: 1.65;
  --text-mono:      12px;  --leading-mono:      1.00;  --tracking-mono:     0.06em;

  --weight-regular:  400;
  --weight-medium:   500;
  --weight-strong:   600;

  /* Spacing (8px grid) */
  --space-4: 4px;    --space-8: 8px;    --space-16: 16px;  --space-24: 24px;
  --space-32: 32px;  --space-40: 40px;  --space-48: 48px;  --space-64: 64px;
  --space-80: 80px;  --space-96: 96px;  --space-120: 120px; --space-160: 160px;

  /* Layout */
  --container:   1200px;
  --measure:     720px;
  --header-h:    64px;

  /* Radius */
  --radius-none:   0;
  --radius-button: 4px;
  --radius-card:   8px;
  --radius-panel:  12px;
  --radius-pill:   9999px;   /* status chip 専用 */

  /* Motion */
  --duration-micro: 120ms;
  --duration-state: 180ms;
  --ease: cubic-bezier(0.2, 0, 0, 1);
}
```

### Tailwind v3 — `theme.extend`

現行リポジトリは Tailwind v3.4 のため v3 形式で記載する。

```ts
extend: {
  colors: {
    void:     "#080808",
    carbon:   "#111111",
    elevated: "#171717",
    line:     "#2C2929",
    "line-strong": "#3A3634",
    text: {
      DEFAULT: "#F3F1EE",
      muted:   "#928B88",
      faint:   "#5C5654",
    },
    red: {
      DEFAULT: "#781522",
      deep:    "#4D0B13",
      signal:  "#A51F32",
    },
  },
  fontFamily: {
    sans: ["Geist", "Noto Sans JP", "Hiragino Kaku Gothic ProN", "system-ui", "sans-serif"],
    mono: ["Geist Mono", "Noto Sans Mono", "ui-monospace", "monospace"],
  },
  fontSize: {
    mono:      ["12px", { lineHeight: "1",    letterSpacing: "0.06em"  }],
    secondary: ["14px", { lineHeight: "1.65"                           }],
    body:      ["16px", { lineHeight: "1.75"                           }],
    lead:      ["20px", { lineHeight: "1.75", letterSpacing: "-0.01em" }],
    h3:        ["32px", { lineHeight: "1.2",  letterSpacing: "-0.02em" }],
    h2:        ["44px", { lineHeight: "1.08", letterSpacing: "-0.025em"}],
    display:   ["72px", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
  },
  borderRadius: {
    none: "0", button: "4px", card: "8px", panel: "12px",
  },
  maxWidth: { container: "1200px", measure: "720px" },
  transitionTimingFunction: { std: "cubic-bezier(0.2, 0, 0, 1)" },
}
```

`theme.extend` ではなく **`theme` 直下で `borderRadius` を上書きする**こと。extend のままだと Tailwind 既定の `rounded-sm`(2px) `rounded-md`(6px) `rounded-lg`(8px) `rounded-full` が残り、監査で指摘した「トークンが配線されていない」状態が再発する。同じ理由で `colors` `fontSize` `fontWeight` `spacing` `boxShadow` `backdropBlur` `transitionDuration` も `theme` 直下で上書きしている。

### フォントの配信方式（確定）

| 書体 | 方式 |
|---|---|
| Geist / Geist Mono | `geist` npm パッケージ（`next/font/local` 同梱）で **自己ホスト** |
| Noto Sans JP | Google Fonts `css2` API を `<link>` で読み込み。**unicode-range によるサブセット分割**が効くため実配信量は数十 KB |

自己ホスト（`@fontsource`）および自前サブセット化は今回のスコープ外。Vercel 本番環境での正常配信を前提とする。

---

## 9. 現行実装からの廃止項目（PR1 / PR2 で完了）

| 廃止対象 | 理由 |
|---|---|
| `#1B3A5C`（藍）/ `#27517A` / `#13293F` / `#1F4E3D`（mori） | パレット外 |
| `paper` `#FFFFFF` / `mist` `#F5F7F8` / `ink` `#14191D` / `line` `#E4E8EB` / `muted` `#5A6670` | light テーマ、cool gray |
| `font-display`（ヒラギノ明朝 / Noto Serif JP） | serif 禁止 |
| `font-bold`(700) 全箇所 | weight 700 禁止 |
| `components/BackdropContours.tsx` | 装飾的抽象グラフィック（削除済み） |
| `components/Reveal.tsx` のスクロール fade-in ＋ stagger | decorative fade-in spam（削除済み） |
| `components/Logomark.tsx`（同心円マーク） | 新ロゴシステム（§4.12）へ置換 |
| `app/lp/` と旧 LP コンポーネント 14 件 | legacy palette 依存。方針 A により削除 |
| `SectionTitle` の英語 eyebrow ＋ 細線ダッシュ | 情報を持たない定型装飾 |
| Header の `backdrop-blur` | blur 禁止 |
| `bg-paper`/`bg-mist` の交互バンド | 背景は Void 一色、区切りは hairline |
| カード主体の Projects / Services | hairline row へ移行済み（PR3）|
| Projects / Services の装飾 eyebrow | H2 単体へ置換済み（PR3）|
| `Project.featured` フィールド | 装飾的強調を行わない決定により未使用。型・データから削除 |
| Positioning のベン図（`DomainOverlap`）| 抽象図形。Operating Model rows（§4.13）へ置換済み（PR4）|
| CompanyInfo の外枠・`rounded-card`・`bg-carbon` 注記 | 純粋な hairline definition list へ解体済み（PR4）|
| Company / Positioning の装飾 eyebrow | H2 単体へ置換済み（PR4）|
| カード主体の WhatWeDo | hairline row へ移行済み（PR5）|
| `RoleIcon`（3種の細線アイコン）| row 化により情報構造上の役割を失ったため削除（PR5）。空いた領域は何でも埋めない |
| 全セクションの装飾 eyebrow | 全廃（PR3–PR5）。`SectionTitle` から prop ごと撤去 |
| `border-l-2`（`#1B3A5C`）2 箇所 | 2px は Deep Red の強調罫のみ |
| `max-w-4xl` の第 2 container | container は 1 系統 |

---

## 10. 決定事項と残課題

### 決定済み

| 項目 | 決定 |
|---|---|
| 派生トークン | `Border Strong` / `Text Faint` の 2 色のみ承認。以後トークンを増やさない |
| `Text Faint` の用途 | 実測 2.78:1 のため **装飾的マーカー専用**に限定（テキスト不可） |
| Lead 20px 段 | 採用 |
| Mono Label の tracking | `+0.06em`（Factory の -0.02em からの意図的な逸脱） |
| Hero レイアウト | 単一カラム。ロゴは置かない |
| Featured Project | 装飾的強調を行わない。差は実データ（年 / status / features）で出す |
| Positioning のベン図 | 削除済み。Operating Model rows（§4.13）へ置換（PR4） |
| `/lp` | 削除（方針 A）。legacy palette は残さない |
| Noto Sans JP | Google Fonts `css2` + unicode-range 分割 |
| Motion | `Reveal` 撤去済み。残るのは hover の色 / border 遷移のみ |
| Services の見出しロール | row 化に伴い **`type-h3` へ統合済み**（PR3） |
| ロゴ | NM symbol + NEUMANN wordmark の horizontal lockup（§4.12） |

### 残課題（デザイン作業ではなく、デプロイ・コンテンツ依存）

1. **`metadataBase` が未設定。** `lib/site.ts` の `site.url` が空のため、OGP 画像の絶対 URL が解決できずビルド時に警告が出る。公開ドメイン確定後に設定する。
2. **OGP 画像の書体が Geist ではない。** 生成環境で Geist の woff2 を扱えないため DejaVu で描画している。本番では `next/og` による生成へ差し替える余地がある。
3. **card radius はサイト内から消えた。** PR6 で `ContactForm` の外枠を撤去した結果、実在する radius は `4px`（button / input）と `9999px`（status chip）の 2 値のみ。`--radius-card`(8px) と `--radius-panel`(12px) は現在どこにも使われていないが、Evidence Media Frame（§4.7）用に定義を残している。
4. **Projects の左列に年が無い。** 仕様（§4.4）は分類と並べて年を置く想定だが、`lib/site.ts` に該当データが無いため未表示。実在しない情報を補わない方針で保留している。
5. **section 境界のコントラストが 1.4:1。** 装飾的セパレータとしては WCAG の適用外だが、暗所以外では弱く感じる可能性がある。Contact の Carbon バンドのように、面の切り替えを併用する箇所を増やすか検討の余地がある。
