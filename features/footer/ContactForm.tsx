"use client";

import {
  projectTypeOptions,
  siteCopy,
  type ProjectTypeOption,
} from "@/content";
import { useId, useState } from "react";

const fieldClassName =
  "mt-2 w-full min-h-11 rounded-none border border-(--color-form-border) bg-(--color-form-surface) px-3 py-2 text-text-primary outline-none";

const labelClassName = "text-sm text-text-primary";

export function ContactForm() {
  const formId = useId();
  const helperId = `${formId}-delivery-helper`;
  const { submitLabel, deliveryPendingHelper } = siteCopy.contact;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState<ProjectTypeOption | "">("");
  const [message, setMessage] = useState("");

  return (
    <form
      className="mt-8 flex max-w-xl flex-col gap-(--space-form-gap)"
      noValidate
      suppressHydrationWarning
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div>
        <label className={labelClassName} htmlFor={`${formId}-name`}>
          Name
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          suppressHydrationWarning
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={fieldClassName}
        />
      </div>

      <div>
        <label className={labelClassName} htmlFor={`${formId}-email`}>
          Email
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          suppressHydrationWarning
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={fieldClassName}
        />
      </div>

      <div>
        <label className={labelClassName} htmlFor={`${formId}-project-type`}>
          Project type
        </label>
        <select
          id={`${formId}-project-type`}
          name="projectType"
          required
          aria-required="true"
          suppressHydrationWarning
          value={projectType}
          onChange={(event) =>
            setProjectType(event.target.value as ProjectTypeOption | "")
          }
          className={fieldClassName}
        >
          <option value="" disabled>
            Select a project type
          </option>
          {projectTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClassName} htmlFor={`${formId}-message`}>
          Message
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          required
          aria-required="true"
          suppressHydrationWarning
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${fieldClassName} min-h-32 resize-y`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="submit"
          disabled
          aria-disabled="true"
          aria-describedby={helperId}
          className="inline-flex min-h-11 w-fit cursor-not-allowed items-center px-4 text-accent-ice/50"
        >
          {submitLabel}
        </button>
        <p id={helperId} className="max-w-md text-sm text-text-primary/70">
          {deliveryPendingHelper}
        </p>
      </div>
    </form>
  );
}
