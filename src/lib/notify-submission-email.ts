import { buildSubmissionEmailBody } from "@/lib/build-submission-email-body";
import type { PatientFormData } from "@/types/patient-form";

/**
 * Yeni başvuru bildirimi (Resend REST API).
 * .env: RESEND_API_KEY, SUBMISSION_NOTIFY_EMAIL, RESEND_FROM, NEXT_PUBLIC_SITE_URL
 */
function parseNotifyRecipients(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return [...new Set(raw.split(",").map((s) => s.trim()).filter(Boolean))];
}

function safeAttachmentFilename(name: string, fallbackExt: string): string {
  const trimmed = name.replace(/[/\\]/g, "_").trim();
  const base = trimmed || `upload.${fallbackExt}`;
  return base.slice(0, 120);
}

export async function notifyNewSubmission(params: {
  id: string;
  fullName: string | null;
  language: string;
  form: PatientFormData;
  attachment?: {
    filename: string;
    contentBase64: string;
    contentType: string;
  } | null;
}): Promise<void> {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const recipients = parseNotifyRecipients(process.env.SUBMISSION_NOTIFY_EMAIL);
    if (!apiKey || recipients.length === 0) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[notify] E-posta atlandı: RESEND_API_KEY veya SUBMISSION_NOTIFY_EMAIL tanımlı değil.",
        );
      }
      return;
    }

    const from =
      process.env.RESEND_FROM?.trim() ||
      "Hasta formu <onboarding@resend.dev>";

    const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
    const adminPath = `/admin/${params.id}`;
    const adminUrl = site ? `${site}${adminPath}` : "";

    const name = params.fullName?.trim() || "—";
    const subject = `Yeni başvuru: ${name} (${params.language})`;

    const { html, text } = buildSubmissionEmailBody(params.form, {
      id: params.id,
      fullName: params.fullName,
      language: params.language,
      adminUrl,
      adminPath,
      hasAttachment: Boolean(params.attachment),
      attachmentFileName: params.attachment?.filename ?? null,
    });

    const payload: Record<string, unknown> = {
      from,
      to: recipients,
      subject,
      html,
      text,
    };

    if (params.attachment) {
      payload.attachments = [
        {
          filename: safeAttachmentFilename(
            params.attachment.filename,
            "dat",
          ),
          content: params.attachment.contentBase64,
        },
      ];
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[notify] Resend hatası:", res.status, body);
    }
  } catch (e) {
    console.error("[notify] İstek hatası:", e);
  }
}
