"use client";

import React, { useState, useMemo } from "react";
import { projects, siteCopy, type Project } from "@/content";
import { Section } from "@/shared/ui/Section";
import AccordionGallery from "@/components/AccordionGallery";
import { SelectedWorkReveal } from "./SelectedWorkReveal";
import { ProjectDetailModal } from "./ProjectDetailModal";

type FilterTab = "all" | "live" | "analytics" | "archived" | "nda";

const FILTER_TABS: { id: FilterTab; label: string; count?: number }[] = [
  { id: "all", label: "All Work" },
  { id: "live", label: "Live Systems" },
  { id: "analytics", label: "Data & Analytics" },
  { id: "archived", label: "Archived" },
  // { id: "nda", label: "Enterprise NDA" }, // Temporarily commented out pending case study assets
];

export function SelectedWork() {
  const { headline } = siteCopy.selectedWork;
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    switch (activeTab) {
      case "live":
        return projects.filter((p) => p.status === "live" && p.domain !== "Data & Analytics");
      case "analytics":
        return projects.filter((p) => p.domain === "Data & Analytics");
      case "archived":
        return projects.filter((p) => p.status === "archived" || Boolean(p.warningNotice) || Boolean(p.archiveNotice));
      case "nda":
        return projects.filter((p) => p.status === "nda");
      case "all":
      default:
        return projects;
    }
  }, [activeTab]);

  const items = useMemo(() => {
    return filteredProjects.map((project) => ({
      image: project.image || `/projects/${project.id}.jpg`,
      label: project.title,
      link: project.status === "live" && !project.warningNotice ? project.demoUrl : undefined,
      alt: `${project.title} — ${project.solution}`,
      status: project.status,
      domain: project.domain,
      warningNotice: project.warningNotice,
      onOpenDetails: () => setSelectedProject(project),
    }));
  }, [filteredProjects]);

  return (
    <Section
      id="selected-work"
      ariaLabel="Selected Work"
      className="relative px-6 !py-6 sm:!py-8 md:!py-10"
    >
      <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
        <SelectedWorkReveal>
          {/* Section Header */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end pb-2">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-accent-ice/30 bg-background/70 px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-accent-ice uppercase shadow-[0_0_8px_rgba(142,191,212,0.15)] backdrop-blur-md">
                <span className="size-1 rounded-full bg-accent-ice shadow-[0_0_6px_#8ebfd4] animate-pulse" />
                <span>05 // Selected Work</span>
              </div>
              <h2 className="font-display text-xl font-medium tracking-tight text-text-primary sm:text-2xl md:text-3xl">
                {headline}
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar sm:flex-wrap">
              {FILTER_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "border border-accent-ice/40 bg-accent-ice/15 text-accent-ice shadow-[0_0_12px_rgba(142,191,212,0.2)] font-medium"
                        : "border border-white/10 bg-white/[0.02] text-text-primary/70 hover:border-white/20 hover:text-text-primary"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </SelectedWorkReveal>

        {/* Interactive React Bits Accordion Gallery */}
        <div className="mt-5 sm:mt-6">
          <AccordionGallery
            key={activeTab}
            items={items}
            defaultIndex={0}
            expandRatio={0.48}
            trigger="hover"
            accentColor="#8ebfd4"
            overlayColor="#030014"
            textColor="#ffffff"
            grayscale={false}
            showLabels
            duration={0.48}
            ease="power2.out"
            parallax={0.06}
            tilt={0}
            stagger={0.02}
            height={460}
            gap={12}
            radius={20}
            orientation="horizontal"
          />
        </div>
      </div>

      {/* Deep-Dive Case Study Modal */}
      {selectedProject && (
        <ProjectDetailModal
          key={selectedProject.id}
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </Section>

  );
}
