import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { isAdminEmail } from "@/lib/admin-emails";
import { createClient } from "@/lib/supabase/server";

export default async function AdminForbiddenPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }
  if (isAdminEmail(user.email)) {
    redirect("/admin");
  }
  await supabase.auth.signOut();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-zinc-100">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-xl backdrop-blur">
        <BrandLogo variant="dark" className="mx-auto justify-center" />
        <h1 className="mt-6 font-serif text-2xl font-semibold text-white">
          Yetkisiz hesap
        </h1>
        <p className="mt-3 text-sm text-zinc-300">
          Bu e-posta adresi yönetici listesinde değil. Oturumunuz kapatıldı.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-400"
        >
          Ana sayfaya dön
        </Link>
      </div>
    </div>
  );
}
