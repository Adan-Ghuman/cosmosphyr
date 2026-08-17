"use client";

import type { ProofItem as ProofItemData } from "@/content";
import DecryptedText from "@/components/DecryptedText";
import { MetaLabel } from "@/shared/ui/MetaLabel";

type ProofItemProps = {
  item: ProofItemData;
};

export function ProofItem({ item }: ProofItemProps) {
  return (
    <article data-proof-item className="group">
      <MetaLabel>
        <DecryptedText
          text={item.label}
          animateOn="hover"
          speed={40}
          maxIterations={8}
          className="text-accent-ice font-mono"
          encryptedClassName="text-accent-ice/40 font-mono"
        />
      </MetaLabel>
      <p className="mt-1 text-lg text-text-primary/90">{item.value}</p>
    </article>
  );
}

