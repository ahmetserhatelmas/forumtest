"use server";

import { notifyNewSubmission } from "@/lib/notify-submission-email";
import { createServiceClient } from "@/lib/supabase/service";
import type { PatientFormData } from "@/types/patient-form";
import type { LanguageCode } from "@/constants/languages";

export type SubmitErrorCode =
  | "invalid"
  | "incomplete"
  | "insertFailed"
  | "uploadFailed"
  | "unknown";

type SubmitResult =
  | { ok: true; id: string }
  | { ok: false; code: SubmitErrorCode };

export async function submitPatientForm(formData: FormData): Promise<SubmitResult> {
  try {
    const payloadRaw = formData.get("payload");
    if (typeof payloadRaw !== "string") {
      return { ok: false, code: "invalid" };
    }
    const parsed = JSON.parse(payloadRaw) as {
      language: LanguageCode;
      form: PatientFormData;
    };
    const { language, form } = parsed;
    if (!language || !form?.patient) {
      return { ok: false, code: "incomplete" };
    }

    const supabase = createServiceClient();
    const fullName = form.patient.fullName?.trim() || null;

    const { data: row, error: insertError } = await supabase
      .from("submissions")
      .insert({
        language,
        full_name: fullName,
        form_data: form as unknown as Record<string, unknown>,
        attachment_path: null,
        attachment_paths: null,
      })
      .select("id")
      .single();

    if (insertError || !row) {
      console.error(insertError);
      return { ok: false, code: "insertFailed" };
    }

    const MAX_FILES = 20;
    const rawFiles = formData.getAll("files");
    const files = rawFiles
      .filter((x): x is File => x instanceof File && x.size > 0)
      .slice(0, MAX_FILES);

    const uploadedPaths: string[] = [];
    const mailAttachments: {
      filename: string;
      contentBase64: string;
      contentType: string;
    }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split(".").pop()?.slice(0, 8) || "dat";
      const base =
        file.name
          .replace(/[/\\]/g, "_")
          .replace(/\.[^/.]+$/i, "")
          .trim()
          .slice(0, 80) || `file${i}`;
      const path = `${row.id}/${i}_${base.replace(/[^\w.-]+/g, "_")}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      const { error: upErr } = await supabase.storage
        .from("form-attachments")
        .upload(path, buffer, {
          contentType: file.type || "application/octet-stream",
          upsert: true,
        });
      if (upErr) {
        console.error(upErr);
        return { ok: false, code: "uploadFailed" };
      }
      uploadedPaths.push(path);
      const safeName =
        file.name.replace(/[/\\]/g, "_").trim().slice(0, 120) ||
        `upload.${ext}`;
      mailAttachments.push({
        filename: safeName,
        contentBase64: buffer.toString("base64"),
        contentType: file.type || "application/octet-stream",
      });
    }

    if (uploadedPaths.length > 0) {
      await supabase
        .from("submissions")
        .update({
          attachment_paths: uploadedPaths,
          attachment_path: uploadedPaths[0] ?? null,
        })
        .eq("id", row.id);
    }

    await notifyNewSubmission({
      id: row.id,
      fullName: fullName,
      language,
      form,
      attachments: mailAttachments.length > 0 ? mailAttachments : undefined,
    });

    return { ok: true, id: row.id };
  } catch (e) {
    console.error(e);
    return { ok: false, code: "unknown" };
  }
}
