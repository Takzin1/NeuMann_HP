import { Container, Eyebrow } from "./ui";
import { Reveal } from "./Reveal";
import { MailIcon, LinkTreeIcon, ExternalIcon } from "./icons";
import { contact } from "@/lib/content";

export function Contact() {
 const channels = [
    {
      label: "メール",
      value: contact.email,
      href: `mailto:${contact.email}`,
      Icon: MailIcon,
      external: false,
    },
    {
      label: "LinkTree",
      value: contact.linktree.replace(/^https?:\/\//, ""),
      href: contact.linktree,
      Icon: LinkTreeIcon,
      external: true,
    },
  ];
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-line bg-mist py-24 sm:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal>
            <Eyebrow tone="ai">{contact.eyebrow}</Eyebrow>
            <h2 className="mt-6 text-[26px] font-bold leading-[1.4] text-ink sm:text-[32px]">
              {contact.heading}
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.95] text-muted">
              {contact.lead}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {contact.topics.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[12.5px] text-ink/70"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-3">
              {channels.map(({ label, value, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="focus-ring group flex items-center gap-4 rounded-lg border border-line bg-paper px-5 py-4 transition-all duration-300 hover:border-ink/20 hover:shadow-[0_6px_24px_-14px_rgba(20,25,29,0.2)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ai/8 text-ai">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
                      {label}
                    </span>
                    <span className="block truncate text-[14.5px] font-medium text-ink">
                      {value}
                    </span>
                  </span>
                  <ExternalIcon className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-ai" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
