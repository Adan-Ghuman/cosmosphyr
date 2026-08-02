import { BrandStory } from "@/features/brand-story";
import { Capabilities } from "@/features/capabilities";
import { FinalCta } from "@/features/final-cta";
import { Footer } from "@/features/footer";
import { Horizon } from "@/features/horizon";
import { Ignition } from "@/features/ignition";
import { Process } from "@/features/process";
import { Proof } from "@/features/proof";
import { SelectedWork } from "@/features/selected-work";

export default function Home() {
  return (
    <main>
      <Ignition />
      <Horizon />
      <BrandStory />
      <Capabilities />
      <SelectedWork />
      <Proof />
      <Process />
      <FinalCta />
      <Footer />
    </main>
  );
}
