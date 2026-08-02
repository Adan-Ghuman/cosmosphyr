import { siteCopy } from "@/content";
import { Section } from "@/shared/ui/Section";
import { BrandConvergence } from "./BrandConvergence";
import { CosmosPanel } from "./CosmosPanel";
import { MobileBrandConvergence } from "./MobileBrandConvergence";
import { SphyrPanel } from "./SphyrPanel";

export function BrandStory() {
  const { wordmark, subtext } = siteCopy.brandStory;

  return (
    <Section id="cosmosphyr" ariaLabel="Cosmosphyr">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-(--space-brand-gap) px-6 md:grid-cols-[1fr_minmax(0,1.4fr)_1fr] md:gap-(--space-brand-gap-desktop)">
        <div className="order-1 flex justify-center md:order-1 md:justify-end">
          <CosmosPanel />
        </div>

        <div className="order-3 md:order-2">
          <MobileBrandConvergence>
            <BrandConvergence>
              <div
                aria-hidden="true"
                className="pointer-events-none h-(--size-brand-crescent-reserve) w-full"
              />
              <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-5xl">
                {wordmark}
              </h2>
              <p className="mt-3 max-w-md text-base text-text-primary/80 md:mt-4 md:text-lg">
                {subtext}
              </p>
            </BrandConvergence>
          </MobileBrandConvergence>
        </div>

        <div className="order-2 flex justify-center md:order-3 md:justify-start">
          <SphyrPanel />
        </div>
      </div>
    </Section>
  );
}
