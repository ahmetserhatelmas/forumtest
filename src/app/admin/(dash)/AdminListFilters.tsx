"use client";

import Link from "next/link";
import { LANGUAGES } from "@/constants/languages";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

function readFilters(sp: URLSearchParams) {
  return {
    date_from: sp.get("date_from") ?? "",
    date_to: sp.get("date_to") ?? "",
    name: sp.get("name") ?? "",
    lang: sp.get("lang") ?? "",
  };
}

export function AdminListFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const cur = readFilters(sp);
  const [nameDraft, setNameDraft] = useState(cur.name);

  useEffect(() => {
    setNameDraft(cur.name);
  }, [cur.name]);

  const pushMerged = useCallback(
    (updates: Partial<Record<"date_from" | "date_to" | "name" | "lang", string>>) => {
      const u = new URLSearchParams(sp.toString());
      for (const key of ["date_from", "date_to", "name", "lang"] as const) {
        const v = updates[key];
        if (v === undefined) continue;
        const t = v.trim();
        if (!t) u.delete(key);
        else u.set(key, t);
      }
      const qs = u.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname);
      });
    },
    [router, pathname, sp],
  );

  useEffect(() => {
    const t = setTimeout(() => {
      const trimmed = nameDraft.trim();
      if (trimmed === (sp.get("name") ?? "").trim()) return;
      pushMerged({ name: nameDraft });
    }, 400);
    return () => clearTimeout(t);
  }, [nameDraft, sp, pushMerged]);

  const hasFilters = Boolean(
    cur.lang || cur.date_from || cur.date_to || cur.name,
  );

  return (
    <div
      className={`rounded-2xl border border-violet-100 bg-white p-4 shadow-sm sm:p-5 ${isPending ? "opacity-70" : ""}`}
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
            type="date"
            value={cur.date_from}
            onChange={(e) => pushMerged({ date_from: e.target.value })}
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
            type="date"
            value={cur.date_to}
            onChange={(e) => pushMerged({ date_to: e.target.value })}
            className="mt-1 w-full rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-800">
            Hasta adı
          </label>
          <input
            id="name"
            type="search"
            placeholder="İsimde ara…"
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            className="mt-1 w-full rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
          />
        </div>
        <div>
          <label htmlFor="lang" className="block text-sm font-medium text-zinc-800">
            Form dili
          </label>
          <select
            id="lang"
            value={cur.lang}
            onChange={(e) => pushMerged({ lang: e.target.value })}
            className="mt-1 w-full rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
          >
            <option value="">Tüm diller</option>
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flagCountry.toUpperCase()} · {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {hasFilters ? (
        <div className="mt-4">
          <Link
            href="/admin"
            className="inline-flex rounded-full border border-violet-200 px-4 py-2 text-sm font-semibold text-violet-800 hover:bg-violet-50"
          >
            Tümünü göster
          </Link>
        </div>
      ) : null}
    </div>
  );
}
