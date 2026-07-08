import { Container, Eyebrow } from "./ui";
import { Reveal } from "./Reveal";
import { ProductIcon } from "./ProductIcon";
import { products, type AccentKey } from "@/lib/content";

// 動的クラスは purge されるため、リテラルのマップで指定する。
const accentMap: Record<
  AccentKey,
  { icon: string; bar: string; tag: string }
> = {
  ai: {
    icon: "text-ai",
    bar: "bg-ai",
    tag: "bg-ai/8 text-ai",
  },
  mori: {
    icon: "text-mori",
    bar: "bg-mori",
    tag: "bg-mori/8 text-mori",
  },
  neutral: {
    icon: "text-ink",
    bar: "bg-ink",
    tag: "bg-ink/6 text-ink/70",
  },
};

export function Products() {
  return (
    <section id="products" className="scroll-mt-20 bg-paper py-24 sm:py-32">
      <Container>
        <Reveal>
          <Eyebrow tone="ai">Products</Eyebrow>
          <h2 className="mt-6 text-[26px] font-bold leading-[1.4] text-ink sm:text-[32px]">
            地域の課題に向き合う、3つのプロダクト。
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.9] text-muted">
            見守り・リスク査定・脱炭素支援。それぞれの領域で、見えない不安を「見える」状態にし、次に動ける仕組みへと変えていきます。
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {products.map((product, i) => {
            const a = accentMap[product.accent];
            return (
              <Reveal key={product.id} delay={i * 100}>
                <a
                  href={product.href}
                  className="focus-ring group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-paper p-7 transition-all duration-300 hover:border-ink/20 hover:shadow-[0_6px_28px_-12px_rgba(20,25,29,0.18)]"
                >
                  <span
                    className={`absolute inset-x-0 top-0 h-0.5 ${a.bar} opacity-70`}
                    aria-hidden="true"
                  />
                  <ProductIcon
                    id={product.id}
                    className={`h-9 w-9 ${a.icon}`}
                  />
                  <div className="mt-5 flex items-center gap-2.5">
                    <h3 className="text-[19px] font-bold text-ink">
                      {product.name}
                    </h3>
                  </div>
                  <span
                    className={`mt-2 inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${a.tag}`}
                  >
                    {product.category}
                  </span>
                  <p className="mt-4 text-[14px] font-medium leading-[1.7] text-ink/80">
                    {product.tagline}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-[1.9] text-muted">
                    {product.description}
                  </p>
                </a>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
