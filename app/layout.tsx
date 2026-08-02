import type { Metadata } from "next";
import { Geist } from "next/font/google";
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
    <html lang="en" className={`${bodyFace.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-body text-text-primary">
        {children}
      </body>
    </html>
  );
}
