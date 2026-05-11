import { NextResponse } from "next/server";
import type { LanguageCode } from "@/constants/languages";
import { buildPatientFormExportHtml } from "@/lib/build-patient-form-export-html";
import { normalizePatientFormData } from "@/lib/normalize-patient-form-data";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return new NextResponse("Not found", { status: 404 });
  }

  const submissionLang = (data.language as LanguageCode) || "tr";
  const formData = normalizePatientFormData(data.form_data, submissionLang);

  const inner = buildPatientFormExportHtml(formData, {
    id: data.id,
    createdAt: data.created_at,
    fullName: data.full_name,
    language: data.language,
  });

  const html = `<!DOCTYPE html><html lang="${submissionLang}"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Başvuru ${data.id}</title></head><body>${inner}</body></html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="basvuru-${id}.html"`,
    },
  });
}
