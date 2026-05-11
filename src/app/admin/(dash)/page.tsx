import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LANGUAGES, languageLabel } from "@/constants/languages";

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

  const supabase = await createClient();
  let query = supabase
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

  const hasFilters = Boolean(
    filterLang || dateFrom || dateTo || nameQ.length > 0,
  );

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

      <form
        method="get"
        className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm sm:p-5"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-violet-800">
          Filtreler
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
          <div>
            <label
              htmlFor="date_from"
              className="block text-sm font-medium text-zinc-800"
            >
              Başlangıç tarihi
            </label>
            <input
              id="date_from"
              name="date_from"
              type="date"
              defaultValue={dateFrom}
              className="mt-1 w-full rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            />
          </div>
          <div>
            <label
              htmlFor="date_to"
              className="block text-sm font-medium text-zinc-800"
            >
              Bitiş tarihi
            </label>
            <input
              id="date_to"
              name="date_to"
              type="date"
              defaultValue={dateTo}
              className="mt-1 w-full rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-800">
              Hasta adı
            </label>
            <input
              id="name"
              name="name"
              type="search"
              placeholder="İsimde ara…"
              defaultValue={nameQ}
              className="mt-1 w-full rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            />
          </div>
          <div>
            <label htmlFor="lang" className="block text-sm font-medium text-zinc-800">
              Form dili
            </label>
            <select
              id="lang"
              name="lang"
              defaultValue={filterLang}
              className="mt-1 w-full rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            >
              <option value="">Tüm diller</option>
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="submit"
            className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700"
          >
            Filtrele
          </button>
          {hasFilters ? (
            <Link
              href="/admin"
              className="rounded-full border border-violet-200 px-4 py-2 text-sm font-semibold text-violet-800 hover:bg-violet-50"
            >
              Tümünü göster
            </Link>
          ) : null}
        </div>
      </form>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Veri alınamadı.{" "}
          <span className="font-mono text-xs">{error.message}</span>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-violet-100 text-sm">
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
            </tr>
          </thead>
          <tbody className="divide-y divide-violet-50">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">
                  Kayıt bulunamadı.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
