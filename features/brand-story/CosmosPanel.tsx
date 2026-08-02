import { siteCopy } from "@/content";

export function CosmosPanel() {
  return (
    <p className="font-display text-2xl tracking-[0.2em] text-accent-ice md:text-3xl">
      {siteCopy.brandStory.cosmos}
    </p>
  );
}
