import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/corporate/ContactForm";
import { SectionTitle } from "@/components/corporate/SectionTitle";
import { contactSection } from "@/lib/site";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-paper py-24 lg:py-32"
      aria-label="Contact"
    >
      <div className="mx-auto w-full max-w-4xl px-6 sm:px-8 lg:px-10">
        <Reveal>
          <SectionTitle
            eyebrow={contactSection.eyebrow}
            heading={contactSection.heading}
            lead={contactSection.lead}
          />
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-12">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
