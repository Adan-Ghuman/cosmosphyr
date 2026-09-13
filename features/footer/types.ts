import type { ProjectTypeOption } from "@/content";

export interface ContactFormValues {
  name: string;
  email: string;
  projectType: ProjectTypeOption | "";
  message: string;
  botField: string; // Honeypot spam trap
}

export type ContactFormErrors = Partial<Record<keyof Omit<ContactFormValues, "botField">, string>>;

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}
