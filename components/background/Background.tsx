"use client";

import dynamic from "next/dynamic";

const BackgroundPattern = dynamic(() => import("./BackgroundPattern"), {
  ssr: false,
});

export default function Background() {
  return <BackgroundPattern />;
}
