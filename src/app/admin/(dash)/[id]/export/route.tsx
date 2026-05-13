import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { PatientFormPdfDocument } from "@/components/patient-form/PatientFormPdfDocument";
import type { LanguageCode } from "@/constants/languages";
import { normalizePatientFormData } from "@/lib/normalize-patient-form-data";
import { requireAdminService } from "@/lib/require-admin";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { db } = await requireAdminService();

  const { data, error } = await db
    .from("submissions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return new NextResponse("Not found", { status: 404 });
  }

  const submissionLang = (data.language as LanguageCode) || "tr";
  const formData = normalizePatientFormData(data.form_data, submissionLang);

  const buffer = await renderToBuffer(
    <PatientFormPdfDocument
      data={formData}
      meta={{
        id: data.id,
        createdAt: data.created_at,
        fullName: data.full_name,
        language: data.language,
      }}
    />,
  );

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="basvuru-${id}.pdf"`,
    },
  });
}
