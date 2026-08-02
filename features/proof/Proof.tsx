import { proofItems } from "@/content";
import { Section } from "@/shared/ui/Section";
import { ProofItem } from "./ProofItem";
import { ProofStagger } from "./ProofStagger";

export function Proof() {
  return (
    <Section id="proof" ariaLabel="Proof">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          Proof
        </h2>
        <ProofStagger>
          {proofItems.map((item) => (
            <li key={item.id}>
              <ProofItem item={item} />
            </li>
          ))}
        </ProofStagger>
      </div>
    </Section>
  );
}
