import Link from "next/link";
import { Suspense } from "react";
import { AdminDeleteButton } from "@/app/admin/(dash)/AdminDeleteButton";
import { AdminListFilters } from "@/app/admin/(dash)/AdminListFilters";
import { languageLabel } from "@/constants/languages";
import { requireAdminService } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  created_at: string;
  language: string;
  full_name: string | null;
};

/** YYYY-MM-DD → o günün başı/sonu (Europe/Istanbul +03). */
function istanbulDayBounds(dateStr: string): { startIso: string; endIso: string } {
  const start = new Date(`${dateStr}T00:00:00+03:00`);
  const end = new Date(`${dateStr}T23:59:59.999+03:00`);
  return { startIso: start.toISOString(), endIso: end.toISOString() };
}

/** ILIKE joker karakterlerini kullanıcıdan uzak tut (%, _). */
function sanitizeIlikeQuery(s: string): string {
  return s.replace(/[%_\\]/g, "").trim();
}

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    lang?: string;
    date_from?: string;
    date_to?: string;
    name?: string;
  }>;
}) {
  const sp = await searchParams;
  const filterLang = sp.lang?.trim() || "";
  const dateFrom = sp.date_from?.trim() || "";
  const dateTo = sp.date_to?.trim() || "";
  const nameQ = sp.name?.trim() || "";

  const { db } = await requireAdminService();
  let query = db
    .from("submissions")
    .select("id, created_at, language, full_name")
    .order("created_at", { ascending: false });

  if (filterLang) {
    query = query.eq("language", filterLang);
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateFrom)) {
    const { startIso } = istanbulDayBounds(dateFrom);
    query = query.gte("created_at", startIso);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateTo)) {
    const { endIso } = istanbulDayBounds(dateTo);
    query = query.lte("created_at", endIso);
  }

  const nameSafe = sanitizeIlikeQuery(nameQ);
  if (nameSafe.length > 0) {
    query = query.ilike("full_name", `%${nameSafe}%`);
  }

  const { data, error } = await query;

  const rows = (data ?? []) as Row[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-violet-950">
          Başvurular
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          Tarih aralığı, hasta adı veya form diline göre süzebilir; satırdan detayı
          açabilirsiniz.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="h-48 animate-pulse rounded-2xl border border-violet-100 bg-violet-50/40" />
        }
      >
        <AdminListFilters />
      </Suspense>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Veri alınamadı.{" "}
          <span className="font-mono text-xs">{error.message}</span>
        </div>
      ) : null}

      {!error &&
        (rows.length === 0 ? (
          <div className="rounded-2xl border border-violet-100 bg-white px-4 py-10 text-center text-sm text-zinc-500 shadow-sm">
            Kayıt bulunamadı.
          </div>
        ) : (
          <>
            <ul className="space-y-3 md:hidden">
            {rows.map((r) => (
              <li
                key={r.id}
                className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1 space-y-2 text-sm">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-violet-800">
                        Tarih
                      </p>
                      <p className="text-zinc-800">
                        {new Date(r.created_at).toLocaleString("tr-TR")}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-violet-800">
                          Dil
                        </p>
                        <p className="text-zinc-800">{languageLabel(r.language)}</p>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wide text-violet-800">
                          Hasta
                        </p>
                        <p className="truncate text-zinc-900">
                          {r.full_name?.trim() || "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
                  <Link
                    href={`/admin/${r.id}`}
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
                  >
                    Detayı aç
                  </Link>
                  <AdminDeleteButton id={r.id} />
                </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-x-auto rounded-2xl border border-violet-100 bg-white shadow-sm md:block">
            <table className="min-w-[640px] w-full divide-y divide-violet-100 text-sm">
              <thead className="bg-violet-50/80">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-violet-950">
                    Tarih
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-violet-950">
                    Dil
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-violet-950">
                    Hasta
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-violet-950">
                    Detay
                  </th>
                  <th className="w-20 px-4 py-3 text-right font-semibold text-violet-950">
                    Sil
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-50">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-violet-50/40">
                    <td className="whitespace-nowrap px-4 py-3 text-zinc-700">
                      {new Date(r.created_at).toLocaleString("tr-TR")}
                    </td>
                    <td className="px-4 py-3 text-zinc-800">
                      {languageLabel(r.language)}
                    </td>
                    <td className="px-4 py-3 text-zinc-900">
                      {r.full_name?.trim() || "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/${r.id}`}
                        className="font-semibold text-violet-700 hover:underline"
                      >
                        Aç
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <AdminDeleteButton id={r.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </>
        )
      )}

    </div>
  );
}
