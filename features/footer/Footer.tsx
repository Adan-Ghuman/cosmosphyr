import { siteCopy } from "@/content";
import { Section } from "@/shared/ui/Section";
import { ContactForm } from "./ContactForm";

export function Footer() {
  const { heading } = siteCopy.contact;

  return (
    <Section
      id="contact"
      ariaLabel="Contact"
    >
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-2xl tracking-tight md:text-3xl">
          {heading}
        </h2>
        <ContactForm />
        <p className="mt-12 text-sm text-text-primary/50">Cosmosphyr</p>
      </div>
    </Section>
  );
}
