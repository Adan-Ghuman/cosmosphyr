import type { Project } from "@/content";

type WorkCardArtProps = {
  project: Project;
};

export function WorkCardArt({ project }: WorkCardArtProps) {
  const motif = project.technology[0] ?? project.id;

  return (
    <svg
      viewBox="0 0 240 120"
      className="mt-auto h-28 w-full text-accent-ice"
      focusable="false"
      aria-hidden="true"
    >
      {motif === "AI" || motif === "RAG" ? (
        <>
          <circle cx="120" cy="60" r="34" fill="none" stroke="currentColor" opacity="0.45" />
          <circle cx="120" cy="60" r="18" fill="none" stroke="currentColor" opacity="0.8" />
          <path
            d="M86 60h68M120 26v68M96 36l48 48M144 36 96 84"
            fill="none"
            stroke="currentColor"
            opacity="0.35"
          />
        </>
      ) : motif === "AR" || motif === "Mobile" ? (
        <>
          <rect
            x="88"
            y="12"
            width="64"
            height="96"
            rx="8"
            fill="none"
            stroke="currentColor"
            opacity="0.8"
          />
          <path d="M104 96h32" stroke="currentColor" opacity="0.5" />
        </>
      ) : motif === "Realtime" || motif === "Web" ? (
        <path
          d="M20 80 C 60 20, 100 20, 120 60 S 180 100, 220 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.75"
        />
      ) : (
        <>
          <path
            d="M70 78h100a28 28 0 0 0 4-55 36 36 0 0 0-70 8 24 24 0 0 0-34 47Z"
            fill="none"
            stroke="currentColor"
            opacity="0.8"
          />
          <rect
            x="108"
            y="58"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            opacity="0.55"
          />
        </>
      )}
    </svg>
  );
}
