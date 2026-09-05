import { SectionTitle } from "@/components/corporate/SectionTitle";
import { ServiceRow } from "@/components/corporate/ServiceRow";
import { services, servicesSection } from "@/lib/site";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="section border-t border-line bg-void"
      aria-label="Services"
    >
      <div className="container-page">
        <SectionTitle heading={servicesSection.heading} />
        <ul className="mt-12 border-t border-line">
          {services.map((service) => (
            <ServiceRow key={service.id} service={service} />
          ))}
        </ul>
      </div>
    </section>
  );
}
