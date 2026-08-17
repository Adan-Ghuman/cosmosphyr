import { HeroContent } from "./HeroContent";
import { HeroContentReveal } from "./HeroContentReveal";
import { HeroSideRays } from "./HeroSideRays";
import { HorizonScene } from "./HorizonScene";
import { MobileHorizonScene } from "./MobileHorizonScene";

export function Hero() {
  return (
    <section
      id="horizon"
      aria-label="The Horizon"
      className="relative flex min-h-(--size-hero-min-block) flex-col"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroSideRays />
        <MobileHorizonScene className="h-full">
          <HorizonScene className="h-full" />
        </MobileHorizonScene>
      </div>


      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-(--space-hero-content-top-mobile) pb-16 md:pt-(--space-hero-content-top-desktop) md:pb-(--space-hero-content-bottom-desktop)">
        <HeroContentReveal className="mx-auto w-full max-w-5xl">
          <HeroContent />
        </HeroContentReveal>
      </div>
    </section>
  );
}
