import { siteCopy } from "@/content";
import { Section } from "@/shared/ui/Section";
import { ContactForm } from "./ContactForm";

export function Footer() {
  const { heading, intro } = siteCopy.contact;

  return (
    <Section
      id="contact"
      ariaLabel="Contact"
      className="border-t border-glow/30"
    >
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-2xl tracking-tight md:text-3xl">
          {heading}
        </h2>
        <p className="mt-3 max-w-xl text-text-primary/80">{intro}</p>
        <ContactForm />
        <p className="mt-12 text-sm text-text-primary/50">Cosmosphyr</p>
      </div>
    </Section>
  );
}
