"use client";

import React from "react";
import DecryptedText from "@/components/DecryptedText";
import { Section } from "@/shared/ui/Section";
import { StarBorder } from "@/shared/ui/StarBorder";
import { ContactForm } from "./ContactForm";
import { ContactTelemetry } from "./ContactTelemetry";

export function Footer() {
  return (
    <Section
      id="contact"
      ariaLabel="Contact & Transmissions"
      className="relative px-6 !py-6 sm:!py-8 md:!py-10"
    >
      <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
        <StarBorder
          color="#8ebfd4"
          speed="8s"
          thickness={1.5}
          className="w-full rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          innerClassName="relative overflow-hidden rounded-3xl border border-(--color-nav-border) bg-(--color-nav-surface) p-5 sm:p-7 md:p-8 backdrop-blur-xl"
        >
          {/* Section Header: Compact Header with DecryptedText Cipher */}
          <div className="flex flex-col justify-between gap-2.5 sm:flex-row sm:items-center pb-5 border-b border-white/[0.06]">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-accent-ice/30 bg-background/70 px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-accent-ice uppercase shadow-[0_0_8px_rgba(142,191,212,0.15)] backdrop-blur-md">
                <span className="size-1 rounded-full bg-accent-ice shadow-[0_0_6px_#8ebfd4] animate-pulse" />
                <DecryptedText
                  text="09 // Contact"
                  animateOn="view"
                  speed={35}
                  maxIterations={10}
                  characters="0123456789ABCDEF!@#$%"
                  className="font-mono text-[10px] tracking-widest text-accent-ice uppercase"
                />
              </div>
              <h2 className="font-display text-xl font-medium tracking-tight text-text-primary sm:text-2xl md:text-3xl">
                Start a Conversation
              </h2>
            </div>
          </div>

          {/* 2-Column Balanced Grid */}
          <div className="mt-5 sm:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Column: Direct Studio Channels (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col justify-between py-1">
              <ContactTelemetry />
            </div>

            {/* Right Column: Compact Transceiver Form (7 cols on lg) */}
            <div className="lg:col-span-7 min-h-[310px] sm:min-h-[325px] flex flex-col justify-center rounded-xl border border-white/[0.06] bg-black/25 p-4 sm:p-5 backdrop-blur-sm">
              <ContactForm />
            </div>
          </div>

          {/* Clean Footer Bottom Bar */}
          <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-text-primary/40">
            <div className="flex items-center gap-2">
              <span className="text-text-primary/70 font-display font-medium text-xs">Cosmosphyr</span>
            </div>

            <div>
              &copy; {new Date().getFullYear()} Cosmosphyr. All rights reserved.
            </div>
          </div>
        </StarBorder>
      </div>
    </Section>
  );
}
