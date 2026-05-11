"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: signErr } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (signErr) {
      setError(signErr.message);
      return;
    }
    router.replace(next);
    router.refresh();
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-violet-100 bg-white/90 p-8 shadow-xl shadow-violet-200/50 backdrop-blur">
      <div className="mb-6 flex justify-center">
        <BrandLogo variant="light" className="max-w-full justify-center" />
      </div>
      <h1 className="text-center font-serif text-2xl font-semibold text-violet-950">
        Yönetici girişi
      </h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-zinc-800">
            E-posta
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-violet-100 px-3 py-2.5 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
          />
        </div>
        <div>
          <label htmlFor="pw" className="text-sm font-medium text-zinc-800">
            Şifre
          </label>
          <input
            id="pw"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-violet-100 px-3 py-2.5 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
          />
        </div>
        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-300/50 hover:bg-violet-700 disabled:opacity-60"
        >
          {loading ? "Giriş…" : "Giriş yap"}
        </button>
      </form>
      <Link
        href="/"
        className="mt-6 block text-center text-sm font-medium text-violet-700 hover:underline"
      >
        ← Hasta formuna dön
      </Link>
    </div>
  );
}
