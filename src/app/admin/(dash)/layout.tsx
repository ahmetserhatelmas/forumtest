import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { signOut } from "./actions";

export default function AdminDashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside className="hidden w-64 flex-col border-r border-violet-900/20 bg-violet-700 text-white md:flex">
        <div className="border-b border-white/10 px-5 py-6">
          <BrandLogo variant="dark" />
          <p className="mt-2 text-xs font-medium text-violet-100">Hasta formları</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          <Link
            href="/admin"
            className="rounded-xl px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Tüm başvurular
          </Link>
          <Link
            href="/"
            className="rounded-xl px-3 py-2 text-sm text-violet-100 hover:bg-white/10"
          >
            Hasta formu
          </Link>
        </nav>
        <form action={signOut} className="border-t border-white/10 p-3">
          <button
            type="submit"
            className="w-full rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/20"
          >
            Çıkış
          </button>
        </form>
      </aside>
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-violet-100 bg-white px-4 py-3 md:hidden">
          <span className="font-serif text-lg font-semibold text-violet-950">Admin</span>
          <form action={signOut}>
            <button type="submit" className="text-sm font-semibold text-violet-700">
              Çıkış
            </button>
          </form>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
