import { Container, Eyebrow } from "./ui";
import { Reveal } from "./Reveal";

export function Activity() {
  return (
    <section className="border-t border-line bg-paper py-24 sm:py-32">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="ai" className="justify-center">Activity</Eyebrow>
          <h2 className="mt-6 text-[26px] font-bold leading-[1.4] text-ink sm:text-[32px]">
            地域の現場で、確かめながら。
          </h2>
          <p className="mt-5 text-[15px] leading-[1.95] text-muted">
            福島大学 絆会ポスターセッションでの展示・体験会の様子です。実際に手にとっていただきながら、地域での見守りのかたちを確かめています。
          </p>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-10 max-w-sm">
          <figure>
            <img
              src="/kizuna-poster.png"
              alt="福島大学 絆会ポスターセッションでの展示の様子"
              className="w-full rounded-xl border border-line"
            />
            <figcaption className="mt-3 text-center text-[12.5px] text-muted">
              福島大学 絆会ポスターセッション 展示・体験会
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
