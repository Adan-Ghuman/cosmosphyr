import Image from "next/image";

type HorizonHeroImageProps = {
  className?: string;
};

export function HorizonHeroImage({ className = "" }: HorizonHeroImageProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-background ${className}`.trim()}
      aria-hidden="true"
    >
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-plate object-cover"
      />
    </div>
  );
}
