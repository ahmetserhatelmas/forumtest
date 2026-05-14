import { notFound } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { PatientFormReadOnly } from "@/components/patient-form/PatientFormReadOnly";
import type { LanguageCode } from "@/constants/languages";
import { languageLabel } from "@/constants/languages";
import { normalizePatientFormData } from "@/lib/normalize-patient-form-data";
import { createServiceClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

export default async function PublicSubmissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = createServiceClient();

  const { data, error } = await db
    .from("submissions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const submissionLang = (data.language as LanguageCode) || "tr";
  const formData = normalizePatientFormData(data.form_data, submissionLang);

  const pathsFromRow: string[] = (() => {
    const multi = data.attachment_paths;
    if (Array.isArray(multi) && multi.length > 0) {
      return multi.filter((p): p is string => typeof p === "string" && p.trim() !== "");
    }
    if (typeof data.attachment_path === "string" && data.attachment_path.trim() !== "") {
      return [data.attachment_path.trim()];
    }
    return [];
  })();

  const signedResults = await Promise.all(
    pathsFromRow.map(async (path) => {
      const { data: signed } = await db.storage
        .from("form-attachments")
        .createSignedUrl(path, 3600);
      return { path, url: signed?.signedUrl ?? null };
    }),
  );

  const fileAttachments = signedResults
    .filter((x): x is { path: string; url: string } => Boolean(x.url))
    .map((x) => ({ path: x.path, url: x.url! }));

  const brokenAttachmentPaths = signedResults
    .filter((x) => !x.url)
    .map((x) => x.path);

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-violet-100 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <BrandLogo variant="light" />
          <div className="ml-auto text-right">
            <p className="text-xs text-zinc-400">Kayıt tarihi</p>
            <p className="text-sm font-medium text-zinc-700">
              {new Date(data.created_at).toLocaleString("tr-TR")}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 p-4 md:p-8">
        <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
          <h1 className="font-serif text-2xl font-semibold text-violet-950">
            Başvuru detayı
          </h1>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-zinc-500">Kayıt no</dt>
              <dd className="font-mono text-xs text-zinc-900">{data.id}</dd>
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
            attachments={fileAttachments}
            brokenAttachmentPaths={brokenAttachmentPaths}
          />
        </div>

        <p className="text-center text-xs text-zinc-400">
          Bu sayfa yalnızca görüntüleme amaçlıdır.
        </p>
      </main>
    </div>
  );
}
