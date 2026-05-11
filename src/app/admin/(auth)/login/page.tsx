import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_#f3e8ff_0%,_#f7f2ff_50%,_#faf8ff_100%)] px-4 py-12">
      <Suspense
        fallback={
          <div className="rounded-3xl border border-violet-100 bg-white/90 px-10 py-16 text-sm text-zinc-600 shadow-lg">
            Yükleniyor…
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
