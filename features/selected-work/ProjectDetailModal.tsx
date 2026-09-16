"use client";

import React, { useEffect, useState } from "react";
import type { Project, ProjectTypeOption } from "@/content";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);


  // Preload all gallery images when modal is open to ensure instant switching with zero lag
  useEffect(() => {
    if (!isOpen || !project?.gallery || project.gallery.length === 0) return;
    project.gallery.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [isOpen, project?.gallery]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && project?.gallery && activeGalleryIndex !== null) {
        setActiveGalleryIndex((prev) =>
          prev === null || prev === 0 ? project.gallery!.length - 1 : prev - 1
        );
      }
      if (e.key === "ArrowRight" && project?.gallery && activeGalleryIndex !== null) {
        setActiveGalleryIndex((prev) =>
          prev === null || prev === project.gallery!.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, project?.gallery, activeGalleryIndex]);

  if (!isOpen || !project) return null;

  const hasGallery = Boolean(project.gallery && project.gallery.length > 0);
  const currentImage =
    activeGalleryIndex !== null && project.gallery && project.gallery[activeGalleryIndex]
      ? project.gallery[activeGalleryIndex]
      : project.image || `/projects/${project.id}.jpg`;

  const getStatusBadge = () => {
    if (project.warningNotice) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-[11px] font-mono tracking-wider shadow-[0_0_10px_rgba(245,158,11,0.15)]">
          <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
          Temporarily Unavailable
        </span>
      );
    }

    switch (project.status) {
      case "live":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 text-[11px] font-mono tracking-wider">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Production
          </span>
        );
      case "archived":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-slate-500/30 bg-slate-900/40 text-slate-300 text-[11px] font-mono tracking-wider">
            <span className="size-1.5 rounded-full bg-slate-400" />
            Delivered // Archived
          </span>
        );
      case "nda":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-accent-ice/30 bg-accent-ice/10 text-accent-ice text-[11px] font-mono tracking-wider">
            <svg className="size-3 text-accent-ice" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Strict NDA
          </span>
        );
    }
  };

  const getCategoryForProject = (p: Project): ProjectTypeOption => {
    if (p.domain === "Data & Analytics") return "Data & Analytics";
    if (p.domain === "AI & Intelligent Systems") return "AI & Intelligent Systems";
    if (p.domain === "Web & Mobile") return "Web & Mobile";
    if (p.domain === "Enterprise Systems" || p.domain === "Software Engineering") return "Software Engineering";
    return "Other";
  };

  const handleDiscussClick = () => {
    onClose();
    const category = getCategoryForProject(project);

    // Dispatch event to pre-select category and pre-fill message in contact form
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("cosmosphyr:select-category", {
          detail: {
            category,
            projectTitle: project.title,
          },
        })
      );
    }

    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrevSheet = () => {
    if (!project.gallery || project.gallery.length === 0) return;
    setActiveGalleryIndex((prev) =>
      prev === null || prev === 0 ? project.gallery!.length - 1 : prev - 1
    );
  };

  const handleNextSheet = () => {
    if (!project.gallery || project.gallery.length === 0) return;
    setActiveGalleryIndex((prev) =>
      prev === null || prev === project.gallery!.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-2xl border border-white/[0.12] bg-[#070b14] p-4 sm:p-6 md:p-7 shadow-[0_16px_48px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-text-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Badges & Close Button */}
        <div className="flex items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md border border-accent-ice/20 bg-accent-ice/5 text-accent-ice font-mono text-[10px] uppercase tracking-wider">
              {project.domain}
            </span>
            {getStatusBadge()}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project modal"
            className="p-1.5 rounded-lg border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 text-text-primary/70 hover:text-text-primary transition-all cursor-pointer"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Project Header */}
        <div className="mt-4 space-y-1">
          <h3 id="project-modal-title" className="font-display text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-white">
            {project.title}
          </h3>
          {project.client && (
            <p className="text-xs font-mono text-accent-ice/80">
              {project.client}
            </p>
          )}
        </div>

        {/* Project Visual Preview & Gallery Display (Fixed aspect-ratio viewport: zero jitter, zero layout collapse) */}
        <div className="mt-4 relative w-full aspect-[16/9] max-h-[360px] sm:max-h-[400px] rounded-xl overflow-hidden border border-white/10 bg-[#03060c] shadow-[0_8px_30px_rgba(0,0,0,0.6)] group flex items-center justify-center p-2 sm:p-2.5 bg-black/40">
          <img
            src={currentImage}
            alt={`${project.title} ${activeGalleryIndex !== null ? `Sheet ${activeGalleryIndex + 1}` : "Preview"}`}
            className="w-full h-full object-contain rounded-lg select-none"
            loading="eager"
            draggable={false}
          />

          {/* Quick prev/next overlay controls when gallery is available */}
          {hasGallery && (
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevSheet();
                }}
                className="pointer-events-auto size-8 sm:size-9 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-black hover:border-accent-ice/70 transition-all shadow-lg backdrop-blur-sm cursor-pointer"
                aria-label="Previous sheet"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextSheet();
                }}
                className="pointer-events-auto size-8 sm:size-9 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-black hover:border-accent-ice/70 transition-all shadow-lg backdrop-blur-sm cursor-pointer"
                aria-label="Next sheet"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Badge indicating active view */}
          {hasGallery && (
            <div className="absolute bottom-2.5 right-2.5 pointer-events-none">
              <span className="px-2 py-0.5 rounded-md bg-black/85 border border-white/20 text-[10px] font-mono text-white/90 backdrop-blur-md shadow-md">
                {activeGalleryIndex !== null
                  ? `Sheet ${activeGalleryIndex + 1} of ${project.gallery!.length}`
                  : `Cover Preview // ${project.gallery!.length} Dashboard Sheets`}
              </span>
            </div>
          )}
        </div>


        {/* Complete Dashboard Sheets Button & Switcher for Data Analytics */}
        {hasGallery && (
          <div className="mt-3 p-3 rounded-xl border border-accent-ice/25 bg-accent-ice/[0.04] space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center size-5 rounded-md bg-accent-ice/15 text-accent-ice text-xs">
                  📊
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent-ice font-medium">
                  Complete Dashboard ({project.gallery!.length} Sheets)
                </span>
              </div>

              <div className="flex items-center gap-2">
                {activeGalleryIndex === null ? (
                  <button
                    type="button"
                    onClick={() => setActiveGalleryIndex(0)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-accent-ice hover:underline cursor-pointer"
                  >
                    <span>Inspect Sheets (1–{project.gallery!.length}) →</span>
                  </button>
                ) : (
                  <a
                    href={project.gallery![activeGalleryIndex]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-text-primary/70 hover:text-accent-ice transition-colors inline-flex items-center gap-1"
                  >
                    <span>Open Sheet {activeGalleryIndex + 1} High-Res</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Sheet Selector Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              <button
                type="button"
                onClick={() => setActiveGalleryIndex(null)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                  activeGalleryIndex === null
                    ? "border border-accent-ice/50 bg-accent-ice/20 text-accent-ice font-medium shadow-[0_0_8px_rgba(142,191,212,0.2)]"
                    : "border border-white/10 bg-white/[0.03] text-text-primary/60 hover:text-text-primary hover:border-white/25"
                }`}
              >
                Cover
              </button>
              {project.gallery!.map((_, idx) => {
                const isCurrent = activeGalleryIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCurrent
                        ? "border border-accent-ice/50 bg-accent-ice/20 text-accent-ice font-medium shadow-[0_0_8px_rgba(142,191,212,0.2)]"
                        : "border border-white/10 bg-white/[0.03] text-text-primary/60 hover:text-text-primary hover:border-white/25"
                    }`}
                  >
                    <span>Sheet {idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Metrics Row (if present) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-4 sm:mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl border border-accent-ice/15 bg-accent-ice/[0.03]">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-text-primary/60">
                  {m.label}
                </div>
                <div className="text-sm sm:text-base font-mono font-semibold text-accent-ice">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Problem & Solution */}
        <div className="mt-5 space-y-4 text-xs sm:text-sm leading-relaxed text-text-primary/85">
          <div className="space-y-1.5">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent-ice">
              The Engineering &amp; Analytics Challenge
            </h4>
            <p className="text-text-primary/75">{project.problem}</p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent-ice">
              Architectural &amp; Data Solution
            </h4>
            <p className="text-text-primary/75">{project.solution}</p>
          </div>

          {/* Architecture Highlights */}
          {project.architectureHighlights && project.architectureHighlights.length > 0 && (
            <div className="space-y-2 pt-1">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent-ice">
                Key Technical &amp; Analytical Highlights
              </h4>
              <ul className="space-y-1.5">
                {project.architectureHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-text-primary/80">
                    <span className="size-1.5 rounded-full bg-accent-ice mt-1.5 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Technology Stack */}
        <div className="mt-5 pt-4 border-t border-white/[0.08] space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-text-primary/50">
            Tools, Technologies &amp; Protocols
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.technology.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] text-[11px] font-mono text-text-primary/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Special Status Notices */}
        {project.warningNotice && (
          <div className="mt-4 p-3 rounded-lg border border-amber-500/35 bg-amber-950/30 text-xs text-amber-200/90 flex items-start gap-2.5 shadow-[0_0_16px_rgba(245,158,11,0.08)]">
            <svg className="size-4 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="leading-relaxed space-y-0.5">
              <div className="font-mono uppercase tracking-wider text-[10px] text-amber-400 font-semibold">
                Technical Notice // Service Unavailable
              </div>
              <p className="text-amber-200/80">{project.warningNotice}</p>
            </div>
          </div>
        )}

        {project.status === "archived" && project.archiveNotice && (
          <div className="mt-4 p-3 rounded-lg border border-slate-500/25 bg-slate-900/30 text-xs text-slate-300 flex items-start gap-2.5">
            <svg className="size-4 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="leading-relaxed">
              <strong className="font-medium text-white">Delivery Note: </strong>
              {project.archiveNotice}
            </div>
          </div>
        )}

        {project.status === "nda" && project.confidentialityNotice && (
          <div className="mt-4 p-3 rounded-lg border border-accent-ice/25 bg-accent-ice/[0.04] text-xs text-accent-ice/90 flex items-start gap-2.5">
            <svg className="size-4 text-accent-ice shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="leading-relaxed">
              <strong className="font-medium text-white">Enterprise Compliance: </strong>
              {project.confidentialityNotice}
            </div>
          </div>
        )}

        {/* Modal Action Bar */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleDiscussClick}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-accent-ice/30 bg-accent-ice/10 text-accent-ice text-xs font-mono font-medium hover:bg-accent-ice/20 hover:border-accent-ice/60 transition-all cursor-pointer"
          >
            <span>Discuss Similar Architecture</span>
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {project.status === "live" && project.demoUrl && (
            project.warningNotice ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-mono font-medium hover:bg-amber-500/20 transition-all"
              >
                <span>Check Host Status ↗</span>
                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 text-emerald-300 text-xs font-mono font-medium hover:bg-emerald-500/25 transition-all"
              >
                <span>Visit Live System</span>
                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}

