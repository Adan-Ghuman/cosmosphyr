import type { ProofItem as ProofItemData } from "@/content";
import { MetaLabel } from "@/shared/ui/MetaLabel";

type ProofItemProps = {
  item: ProofItemData;
};

export function ProofItem({ item }: ProofItemProps) {
  return (
    <article data-proof-item>
      <MetaLabel>{item.label}</MetaLabel>
      <p className="mt-1 text-lg text-text-primary/80">{item.value}</p>
    </article>
  );
}
