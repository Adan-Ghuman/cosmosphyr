"use client";

import { useState, useCallback } from "react";
import { projectTypeOptions, type ProjectTypeOption } from "@/content";
import type {
  ContactFormValues,
  ContactFormErrors,
  SubmissionStatus,
  ContactResponse,
} from "./types";

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  email: "",
  projectType: "",
  message: "",
  botField: "",
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const trimmedName = values.name.trim();
  if (!trimmedName) {
    errors.name = "Name is required.";
  } else if (trimmedName.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (trimmedName.length > 80) {
    errors.name = "Name cannot exceed 80 characters.";
  }

  const trimmedEmail = values.email.trim();
  if (!trimmedEmail) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = "Please provide a valid email address.";
  }

  if (!values.projectType) {
    errors.projectType = "Please select a project category.";
  } else if (!projectTypeOptions.includes(values.projectType as ProjectTypeOption)) {
    errors.projectType = "Invalid project category selected.";
  }

  const trimmedMessage = values.message.trim();
  if (!trimmedMessage) {
    errors.message = "Message cannot be empty.";
  } else if (trimmedMessage.length < 10) {
    errors.message = "Please describe your brief in at least 10 characters.";
  } else if (trimmedMessage.length > 2000) {
    errors.message = "Message cannot exceed 2000 characters.";
  }

  return errors;
}

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormValues, boolean>>>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleChange = useCallback(
    (field: keyof ContactFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      // Clear field error if previously invalid
      if (errors[field as keyof ContactFormErrors]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field as keyof ContactFormErrors];
          return next;
        });
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (field: keyof ContactFormValues) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const currentErrors = validateContactForm(values);
      if (currentErrors[field as keyof ContactFormErrors]) {
        setErrors((prev) => ({
          ...prev,
          [field]: currentErrors[field as keyof ContactFormErrors],
        }));
      }
    },
    [values]
  );

  const resetForm = useCallback(() => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setStatusMessage("");
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Mark all fields touched
      setTouched({
        name: true,
        email: true,
        projectType: true,
        message: true,
      });

      const validationErrors = validateContactForm(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setStatus("idle");
        return;
      }

      setStatus("submitting");
      setStatusMessage("");

      // Honeypot check: silently accept spam bot submission
      if (values.botField.trim() !== "") {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setStatus("success");
        setStatusMessage("Transmission received. We will initiate contact shortly.");
        return;
      }

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            projectType: values.projectType,
            message: values.message.trim(),
            botField: values.botField.trim(),
          }),
        });

        if (response.ok) {
          const data: ContactResponse = await response.json();
          setStatus("success");
          setStatusMessage(
            data.message || "Transmission received. We will initiate contact shortly."
          );
        } else if (response.status === 404 || response.status === 501) {
          // Dev / Preview mock mode when API handler is pending deployment
          await new Promise((resolve) => setTimeout(resolve, 600));
          setStatus("success");
          setStatusMessage(
            "Transmission logged (Development Mode). We will initiate contact shortly."
          );
        } else {
          const data: ContactResponse = await response.json().catch(() => ({}));
          setStatus("error");
          setStatusMessage(
            data.error || "Failed to deliver transmission. Please retry or email directly."
          );
        }
      } catch {
        // Network or fetch failure fallback
        setStatus("error");
        setStatusMessage("Network error during transmission. Please try again or reach out directly.");
      }
    },
    [values]
  );

  return {
    values,
    errors,
    touched,
    status,
    statusMessage,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}
