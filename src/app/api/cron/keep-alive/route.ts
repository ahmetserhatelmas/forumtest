import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

/**
 * Vercel Cron (günde 1): Supabase’e hafif DB trafiği + isteğe bağlı site ping.
 * Vercel’de `CRON_SECRET` tanımlayın; Cron isteği `Authorization: Bearer <CRON_SECRET>` gönderir.
 * @see https://vercel.com/docs/cron-jobs
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const out: Record<string, unknown> = {};

  try {
    const db = createServiceClient();
    const { error } = await db.from("submissions").select("id").limit(1);
    out.supabase = error ? { ok: false, message: error.message } : { ok: true };
  } catch (e) {
    out.supabase = { ok: false, message: String(e) };
  }

  const warmUrl =
    process.env.KEEP_WARM_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (warmUrl) {
    try {
      const res = await fetch(warmUrl, {
        method: "GET",
        headers: { "user-agent": "forumsite-cron-keep-alive/1" },
        cache: "no-store",
      });
      out.site = { ok: res.ok, status: res.status };
    } catch (e) {
      out.site = { ok: false, message: String(e) };
    }
  } else {
    out.site = { skipped: true, hint: "KEEP_WARM_URL or NEXT_PUBLIC_SITE_URL" };
  }

  return NextResponse.json({ ok: true, at: new Date().toISOString(), ...out });
}
