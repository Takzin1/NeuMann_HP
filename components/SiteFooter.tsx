import { Logomark } from "./Logomark";
import { Container } from "./ui";
import { company, nav, footer } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper py-14">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Logomark className="h-7 w-7" />
              <span className="text-[16px] font-bold tracking-[0.04em] text-ink">
                {company.name}
              </span>
            </div>
            <p className="mt-4 text-[13px] leading-[1.9] text-muted">
              {company.summary}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="focus-ring rounded-sm text-[13.5px] text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 space-y-1.5 border-t border-line pt-8">
          {footer.disclaimers.map((d, i) => (
            <p key={i} className="text-[11.5px] leading-[1.8] text-muted/80">
              {d}
            </p>
          ))}
        </div>

        <p className="mt-8 text-[12px] text-muted">
          © {year} {company.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
