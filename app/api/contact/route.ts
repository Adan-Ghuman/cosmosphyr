import path from "path";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { projectTypeOptions, type ProjectTypeOption } from "@/content";

// Best-effort in-memory rate limiter for serverless environments (5 submissions / 10 minutes per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeInput(str: string): string {
  // Strip HTML/markup tags (e.g. <script>, <b>, <Bio>)
  const tagStripped = str.replace(/<[a-zA-Z/][^>]*>/g, "");
  // Escape remaining special characters for safe email rendering
  return escapeHtml(tagStripped);
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Prune expired entries if the cache grows
  if (rateLimitMap.size > 500) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }

  const entry = rateLimitMap.get(ip);

  // Clean expired entry
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: Request) {
  try {
    // 1. IP extraction & rate limiting
    const forwardedHeader = req.headers.get("x-forwarded-for");
    const ip = forwardedHeader ? forwardedHeader.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Transmission rate limit reached. Please wait several minutes before retrying.",
        },
        { status: 429 }
      );
    }

    // 2. Parse payload safely
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Malformed payload received." },
        { status: 400 }
      );
    }

    const { name, email, projectType, message, botField } = body;

    // 3. Silent Honeypot Acceptance (trap bots without alerting them)
    if (typeof botField === "string" && botField.trim() !== "") {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return NextResponse.json({
        success: true,
        message: "Transmission received. We will initiate contact shortly.",
      });
    }

    // 4. Server-side Field Validation & Sanitization
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";
    const selectedCategory = typeof projectType === "string" ? (projectType.trim() as ProjectTypeOption) : "";

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 80) {
      return NextResponse.json(
        { success: false, error: "A valid name (2 to 80 characters) is required." },
        { status: 400 }
      );
    }

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!selectedCategory || !projectTypeOptions.includes(selectedCategory)) {
      return NextResponse.json(
        { success: false, error: "Please select a valid project scope category." },
        { status: 400 }
      );
    }

    if (!trimmedMessage || trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
      return NextResponse.json(
        { success: false, error: "Project brief must be between 10 and 2,000 characters." },
        { status: 400 }
      );
    }

    // 5. Environment & Credentials Verification
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "adanghuman23@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "contact@cosmosphyr.tech";

    // Graceful fallback during local development or pending configuration
    if (!apiKey || !toEmail) {
      console.warn(
        "[Cosmosphyr Contact API] Missing RESEND_API_KEY or CONTACT_TO_EMAIL in environment. Logging submission in development mode:",
        { name: trimmedName, email: trimmedEmail, projectType: selectedCategory, messageLength: trimmedMessage.length }
      );

      return NextResponse.json({
        success: true,
        message: "Transmission logged (Development Mode). We will initiate contact shortly.",
      });
    }

    // 6. Dispatch Email via Resend SDK
    const resend = new Resend(apiKey);
    const dateFormatted = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
      timeZoneName: "short",
    }).format(new Date());

    const fromAddress = fromEmail.includes("<")
      ? fromEmail
      : `Cosmosphyr <${fromEmail}>`;

    // Load inline brand mark if available
    let logoAttachment: { filename: string; content: Buffer; contentId: string } | undefined;
    try {
      let logoBuffer: Buffer;
      try {
        logoBuffer = await fs.readFile(path.join(process.cwd(), "public", "logo-email.png"));
      } catch {
        logoBuffer = await fs.readFile(path.join(process.cwd(), "public", "cosmosphyr-mark.png"));
      }

      logoAttachment = {
        filename: "cosmosphyr-mark.png",
        content: logoBuffer,
        contentId: "cosmosphyr-logo",
      };
    } catch (e) {
      console.warn("[Cosmosphyr Contact API] Could not load mark for inline attachment:", e);
    }

    // Sanitize user inputs: strip HTML tags and escape entities for email rendering
    const cleanName = trimmedName.replace(/<[a-zA-Z/][^>]*>/g, "").trim() || trimmedName;
    const cleanMessage = trimmedMessage.replace(/<[a-zA-Z/][^>]*>/g, "");
    const safeName = sanitizeInput(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeCategory = escapeHtml(selectedCategory);
    const safeMessage = sanitizeInput(trimmedMessage);

    const { error: resendError } = await resend.emails.send({
      from: fromAddress,
      to: [toEmail],
      replyTo: trimmedEmail,
      subject: `[Cosmosphyr Inquiry] ${selectedCategory} — ${cleanName}`,
      attachments: logoAttachment ? [logoAttachment] : undefined,
      text: [
        `Sender:   ${cleanName}`,
        `Email:    ${trimmedEmail}`,
        `Category: ${selectedCategory}`,
        `Time:     ${dateFormatted}`,
        ``,
        `Project Brief:`,
        cleanMessage,
        ``,
        `---`,
        `Direct replies route directly to ${trimmedEmail}.`,
      ].join("\n"),
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="color-scheme" content="light dark">
          <meta name="supported-color-schemes" content="light dark">
          <title>Inquiry — ${safeName}</title>
          <style>
            :root {
              color-scheme: light dark;
              supported-color-schemes: light dark;
            }
            @media (prefers-color-scheme: dark) {
              .body-bg { background-color: #030712 !important; }
              .card-bg { background-color: #0b1120 !important; border-color: rgba(255, 255, 255, 0.12) !important; }
              .text-title { color: #f8fafc !important; }
              .text-body { color: #e2e8f0 !important; }
              .text-muted { color: #94a3b8 !important; }
              .border-line { border-color: rgba(255, 255, 255, 0.08) !important; }
              .brief-box { background-color: #030712 !important; border-color: rgba(255, 255, 255, 0.1) !important; color: #f1f5f9 !important; }
              .badge { background-color: rgba(142, 191, 212, 0.15) !important; border-color: rgba(142, 191, 212, 0.35) !important; color: #8ebfd4 !important; }
              .action-note { background-color: rgba(142, 191, 212, 0.08) !important; border-color: rgba(142, 191, 212, 0.2) !important; color: #94a3b8 !important; }
              .brand-link { color: #8ebfd4 !important; border-color: rgba(142, 191, 212, 0.4) !important; }
            }
          </style>
        </head>
        <body class="body-bg" style="margin: 0; padding: 28px 16px; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          <div class="card-bg" style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);">
            <!-- Clean Header with Logo -->
            <div class="border-line" style="padding: 18px 24px; border-bottom: 1px solid #f1f5f9;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: middle;">
                    <table style="border-collapse: collapse;">
                      <tr>
                        <td style="padding-right: 10px; vertical-align: middle;">
                          <img src="cid:cosmosphyr-logo" width="28" height="28" alt="Cosmosphyr" style="display: block; width: 28px; height: 28px; border-radius: 6px;" />
                        </td>
                        <td class="text-title" style="font-size: 15px; font-weight: 700; letter-spacing: -0.01em; color: #0f172a; vertical-align: middle;">
                          Cosmosphyr
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="text-align: right; vertical-align: middle;">
                    <span class="badge" style="display: inline-block; padding: 3px 9px; border-radius: 6px; background-color: #f0f9ff; border: 1px solid #bae6fd; font-size: 11px; font-weight: 500; color: #0284c7;">
                      ${safeCategory}
                    </span>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Details Section -->
            <div style="padding: 22px 24px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td class="text-muted" style="padding: 6px 0; width: 85px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; font-family: ui-monospace, monospace;">Sender</td>
                  <td class="text-body" style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${safeName}</td>
                </tr>
                <tr>
                  <td class="text-muted" style="padding: 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; font-family: ui-monospace, monospace;">Email</td>
                  <td style="padding: 6px 0; font-size: 14px;">
                    <a href="mailto:${safeEmail}" class="brand-link" style="color: #0284c7; text-decoration: none; border-bottom: 1px dashed rgba(2, 132, 199, 0.4);">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td class="text-muted" style="padding: 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; font-family: ui-monospace, monospace;">Time</td>
                  <td class="text-muted" style="padding: 6px 0; font-size: 12px; color: #64748b; font-family: ui-monospace, monospace;">${dateFormatted}</td>
                </tr>
              </table>

              <!-- Project Brief Box -->
              <div class="brief-box" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px;">
                <div class="text-muted" style="font-family: ui-monospace, monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 8px;">
                  Project Brief
                </div>
                <div class="text-body" style="font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${safeMessage}</div>
              </div>

              <!-- Quick Action Note -->
              <div class="action-note" style="margin-top: 18px; padding: 10px 14px; border-radius: 8px; background-color: #f1f5f9; border: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
                Direct reply will route to <strong class="text-body" style="color: #0f172a;">${safeEmail}</strong>.
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (resendError) {
      console.error("[Cosmosphyr Contact API] Resend dispatch error:", resendError);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to deliver transmission through email relay. Please email contact@cosmosphyr.tech directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Transmission received. We will initiate contact shortly.",
    });
  } catch (error) {
    console.error("[Cosmosphyr Contact API] Unexpected error handling request:", error);
    return NextResponse.json(
      { success: false, error: "Internal transmission error. Please retry or contact us directly." },
      { status: 500 }
    );
  }
}
