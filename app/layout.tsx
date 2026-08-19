import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { GalaxyBackground } from "@/shared/backgrounds/GalaxyBackground";
import { GlobalClickSpark } from "@/shared/ui/GlobalClickSpark";
import "./globals.css";

const bodyFace = Geist({
  variable: "--font-body-face",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cosmosphyr",
  description:
    "Cosmosphyr builds serious technology across AI, software engineering, web and mobile, and cloud automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodyFace.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-background font-body text-text-primary"
      >
        <GalaxyBackground />
        <GlobalClickSpark
          sparkColor="#8ebfd4"
          sparkSize={12}
          sparkRadius={24}
          sparkCount={10}
          duration={420}
        />
        <div className="relative z-0">{children}</div>
      </body>
    </html>
  );
}

