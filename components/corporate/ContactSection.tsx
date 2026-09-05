import { ContactForm } from "@/components/corporate/ContactForm";
import { SectionTitle } from "@/components/corporate/SectionTitle";
import { contactSection } from "@/lib/site";

export function ContactSection() {
  return (
    // 性質が変わる面のため Carbon を使う（1 ページ最大 2 セクションの 1 枠目）。
    <section
      id="contact"
      className="section border-t border-line bg-carbon"
      aria-label="Contact"
    >
      <div className="container-page">
        <div className="max-w-measure">
          <SectionTitle
            heading={contactSection.heading}
            lead={contactSection.lead}
          />
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
