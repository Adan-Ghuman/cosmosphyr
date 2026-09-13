"use client";

import React, { useId } from "react";
import { projectTypeOptions } from "@/content";
import { useContactForm } from "./useContactForm";

export function ContactForm() {
  const formId = useId();
  const {
    values,
    errors,
    touched,
    status,
    statusMessage,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useContactForm();

  const isSubmitting = status === "submitting";

  // Success state render with height-stable container
  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="min-h-[285px] sm:min-h-[295px] flex flex-col items-center justify-center py-4 px-3 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300"
      >
        <div className="relative flex items-center justify-center size-12 sm:size-14 rounded-full border border-accent-ice/40 bg-accent-ice/10 shadow-[0_0_24px_rgba(142,191,212,0.3)]">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-ice/30 opacity-75" />
          <svg
            className="size-6 sm:size-7 text-accent-ice"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div className="space-y-1 max-w-sm">
          <h3 className="font-display text-lg sm:text-xl font-medium text-text-primary">
            Message Sent!
          </h3>
          <p className="text-xs sm:text-sm text-text-primary/75 leading-relaxed">
            {statusMessage ||
              `Thanks, ${values.name || "there"}. We've received your note and will get back to you shortly.`}
          </p>
        </div>

        <div className="pt-1">
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono tracking-wider text-accent-ice bg-accent-ice/10 border border-accent-ice/30 hover:bg-accent-ice/20 hover:border-accent-ice/60 transition-all cursor-pointer shadow-[0_0_12px_rgba(142,191,212,0.15)]"
          >
            <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Send Another Message</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id={formId}
      noValidate
      onSubmit={handleSubmit}
      className="min-h-[285px] sm:min-h-[295px] flex flex-col justify-between gap-3.5 sm:gap-4"
    >
      {/* Honeypot Anti-Spam Field */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${formId}-botfield`}>Leave this field empty</label>
        <input
          id={`${formId}-botfield`}
          type="text"
          name="botField"
          tabIndex={-1}
          autoComplete="off"
          value={values.botField}
          onChange={(e) => handleChange("botField", e.target.value)}
        />
      </div>

      {/* Error Alert */}
      {status === "error" && (
        <div
          role="alert"
          className="p-3 rounded-lg border border-red-500/40 bg-red-950/20 text-red-200 text-xs font-mono flex items-center gap-2.5 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
        >
          <svg className="size-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="truncate">{statusMessage || "Transmission failed. Please check your connection and retry."}</div>
        </div>
      )}

      {/* Inputs Stack */}
      <div className="space-y-3.5 sm:space-y-4">
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Name */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor={`${formId}-name`}
                className="text-[11px] font-mono uppercase tracking-wider text-text-primary/85"
              >
                Name <span className="text-accent-ice">*</span>
              </label>
              {touched.name && errors.name && (
                <span id={`${formId}-name-error`} className="text-[10px] font-mono text-red-400">
                  {errors.name}
                </span>
              )}
            </div>
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              required
              aria-required="true"
              aria-invalid={Boolean(touched.name && errors.name)}
              aria-describedby={touched.name && errors.name ? `${formId}-name-error` : undefined}
              disabled={isSubmitting}
              autoComplete="name"
              placeholder="Ada Lovelace"
              suppressHydrationWarning
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              className={`w-full min-h-10 sm:min-h-11 rounded-lg border bg-black/40 px-3.5 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-primary/30 outline-none transition-all duration-200 ${
                touched.name && errors.name
                  ? "border-red-500/60 focus:border-red-400"
                  : "border-white/10 hover:border-white/20 focus:border-accent-ice/80 focus:shadow-[0_0_12px_rgba(142,191,212,0.2)] focus:bg-white/[0.03]"
              }`}
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor={`${formId}-email`}
                className="text-[11px] font-mono uppercase tracking-wider text-text-primary/85"
              >
                Email <span className="text-accent-ice">*</span>
              </label>
              {touched.email && errors.email && (
                <span id={`${formId}-email-error`} className="text-[10px] font-mono text-red-400">
                  {errors.email}
                </span>
              )}
            </div>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              required
              aria-required="true"
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby={touched.email && errors.email ? `${formId}-email-error` : undefined}
              disabled={isSubmitting}
              autoComplete="email"
              placeholder="ada@domain.com"
              suppressHydrationWarning
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`w-full min-h-10 sm:min-h-11 rounded-lg border bg-black/40 px-3.5 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-primary/30 outline-none transition-all duration-200 ${
                touched.email && errors.email
                  ? "border-red-500/60 focus:border-red-400"
                  : "border-white/10 hover:border-white/20 focus:border-accent-ice/80 focus:shadow-[0_0_12px_rgba(142,191,212,0.2)] focus:bg-white/[0.03]"
              }`}
            />
          </div>
        </div>

        {/* Row 2: Project Category Chips */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-mono uppercase tracking-wider text-text-primary/85">
              Category <span className="text-accent-ice">*</span>
            </label>
            {touched.projectType && errors.projectType && (
              <span id={`${formId}-projectType-error`} className="text-[10px] font-mono text-red-400">
                {errors.projectType}
              </span>
            )}
          </div>

          <div
            role="radiogroup"
            aria-label="Project Scope Category"
            aria-required="true"
            className="flex flex-wrap gap-1.5"
          >
            {projectTypeOptions.map((option) => {
              const isSelected = values.projectType === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={isSubmitting}
                  onClick={() => {
                    handleChange("projectType", option);
                    handleBlur("projectType");
                  }}
                  className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border border-accent-ice bg-accent-ice/15 text-text-primary shadow-[0_0_12px_rgba(142,191,212,0.3)]"
                      : "border border-white/10 bg-black/40 text-text-primary/70 hover:text-text-primary hover:border-white/20 hover:bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`size-1 rounded-full transition-all ${
                      isSelected
                        ? "bg-accent-ice shadow-[0_0_5px_#8ebfd4]"
                        : "bg-white/30 group-hover:bg-white/60"
                    }`}
                  />
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Brief Textarea */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label
              htmlFor={`${formId}-message`}
              className="text-[11px] font-mono uppercase tracking-wider text-text-primary/85"
            >
              Project Brief <span className="text-accent-ice">*</span>
            </label>
            <div className="flex items-center gap-2">
              {touched.message && errors.message ? (
                <span id={`${formId}-message-error`} className="text-[10px] font-mono text-red-400">
                  {errors.message}
                </span>
              ) : (
                <span className="text-[10px] font-mono text-text-primary/40">
                  {values.message.length}/2000
                </span>
              )}
            </div>
          </div>

          <textarea
            id={`${formId}-message`}
            name="message"
            rows={3}
            required
            aria-required="true"
            aria-invalid={Boolean(touched.message && errors.message)}
            aria-describedby={touched.message && errors.message ? `${formId}-message-error` : undefined}
            disabled={isSubmitting}
            placeholder="Describe what you are looking to build..."
            suppressHydrationWarning
            value={values.message}
            onChange={(e) => handleChange("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            className={`w-full min-h-20 sm:min-h-22 rounded-lg border bg-black/40 px-3.5 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-primary/30 outline-none transition-all duration-200 resize-y ${
              touched.message && errors.message
                ? "border-red-500/60 focus:border-red-400"
                : "border-white/10 hover:border-white/20 focus:border-accent-ice/80 focus:shadow-[0_0_12px_rgba(142,191,212,0.2)] focus:bg-white/[0.03]"
            }`}
          />
        </div>
      </div>

      {/* Row 4: Submit Button */}
      <div className="pt-1 flex items-center justify-start">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-text-primary bg-accent-ice/15 border border-accent-ice/40 hover:bg-accent-ice/25 hover:border-accent-ice/80 transition-all duration-200 shadow-[0_0_16px_rgba(142,191,212,0.2)] hover:shadow-[0_0_24px_rgba(142,191,212,0.35)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin size-3.5 text-accent-ice" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <span className="flex items-center justify-center size-4 rounded-full bg-accent-ice/20 group-hover:bg-accent-ice/40 transition-colors">
                <svg className="size-2.5 text-accent-ice transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
