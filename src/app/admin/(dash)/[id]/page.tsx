import Link from "next/link";
import { notFound } from "next/navigation";
import { PatientFormReadOnly } from "@/components/patient-form/PatientFormReadOnly";
import type { LanguageCode } from "@/constants/languages";
import { languageLabel } from "@/constants/languages";
import { createClient } from "@/lib/supabase/server";
import { normalizePatientFormData } from "@/lib/normalize-patient-form-data";

export const dynamic = "force-dynamic";

export default async function AdminSubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const submissionLang = (data.language as LanguageCode) || "tr";
  const formData = normalizePatientFormData(data.form_data, submissionLang);

  let fileUrl: string | null = null;
  if (data.attachment_path) {
    const { data: signed } = await supabase.storage
      .from("form-attachments")
      .createSignedUrl(data.attachment_path, 3600);
    fileUrl = signed?.signedUrl ?? null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin"
          className="text-sm font-semibold text-violet-700 hover:underline"
        >
          ← Listeye dön
        </Link>
        <a
          href={`/admin/${id}/export`}
          className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
        >
          Formu indir
        </a>
      </div>

      <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
        <h1 className="font-serif text-2xl font-semibold text-violet-950">
          Başvuru detayı
        </h1>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-zinc-500">Kayıt no</dt>
            <dd className="font-mono text-zinc-900">{data.id}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Tarih</dt>
            <dd className="text-zinc-900">
              {new Date(data.created_at).toLocaleString("tr-TR")}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">Dil</dt>
            <dd className="text-zinc-900">{languageLabel(data.language)}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Ad soyad</dt>
            <dd className="text-zinc-900">{data.full_name?.trim() || "—"}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-violet-100 bg-[radial-gradient(ellipse_at_top,_#f3e8ff_0%,_#f7f2ff_45%,_#faf8ff_100%)] p-4 shadow-sm sm:p-6">
        <PatientFormReadOnly
          data={formData}
          attachmentUrl={fileUrl}
          attachmentPath={data.attachment_path}
        />
      </div>
    </div>
  );
}
