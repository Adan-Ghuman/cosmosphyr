// "use client";

import React from "react";

export function ContactTelemetry() {
  /*
   * NOTE: Direct email option is temporarily commented out until domain inbox/MX
   * records for contact@cosmosphyr.tech are configured to receive inbound emails.
   * Tracked in context/progress-tracker.md to re-enable when ready.
   *
   * const [copied, setCopied] = useState(false);
   * const directEmail = "contact@cosmosphyr.tech";
   *
   * const handleCopy = () => {
   *   if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
   *     navigator.clipboard
   *       .writeText(directEmail)
   *       .then(() => {
   *         setCopied(true);
   *         setTimeout(() => setCopied(false), 2000);
   *       })
   *       .catch(() => {});
   *   }
   * };
   */

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      {/* Human, Friendly Intro */}
      <div className="space-y-2.5">
        <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-text-primary">
          Let&apos;s Build Together
        </h3>
        <p className="text-xs sm:text-sm text-text-primary/75 leading-relaxed max-w-sm">
          Have an idea, engineering challenge, or project in mind? Tell us what you&apos;re looking to build—our core team will get back to you with a clear, practical path forward.
        </p>
      </div>

      {/*
        Direct Email Channel Card — Temporarily commented out until domain inbox/MX is live.
        See context/progress-tracker.md to restore when inbox is ready.

        <div className="p-3.5 sm:p-4 rounded-xl border border-(--color-nav-border) bg-white/[0.02] backdrop-blur-sm space-y-2">
          <div className="text-[11px] font-mono text-accent-ice uppercase tracking-wider">
            Direct Email
          </div>

          <div className="flex items-center justify-between gap-2">
            <a
              href={`mailto:${directEmail}`}
              className="font-mono text-xs sm:text-sm text-text-primary hover:text-accent-ice transition-colors truncate"
            >
              {directEmail}
            </a>

            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy direct email address"
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-accent-ice/30 bg-accent-ice/10 text-accent-ice text-[11px] font-mono hover:bg-accent-ice/20 hover:border-accent-ice/60 transition-all cursor-pointer shrink-0"
            >
              {copied ? (
                <>
                  <svg className="size-3 text-accent-ice" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <svg className="size-3 text-accent-ice" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      */}
    </div>
  );
}
