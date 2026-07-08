import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/corporate/SectionTitle";
import { ServiceCard } from "@/components/corporate/ServiceCard";
import { services, servicesSection } from "@/lib/site";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-20 border-y border-line bg-mist py-24 lg:py-32"
      aria-label="Services"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <Reveal>
          <SectionTitle
            eyebrow={servicesSection.eyebrow}
            heading={servicesSection.heading}
          />
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="li" key={service.id} delay={(i % 3) * 70}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
