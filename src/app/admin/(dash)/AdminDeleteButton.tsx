"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteSubmission } from "./actions";

export function AdminDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    if (
      !confirm(
        "Bu başvuruyu ve varsa ek dosyayı kalıcı olarak silmek istediğinize emin misiniz?",
      )
    ) {
      return;
    }
    setBusy(true);
    const res = await deleteSubmission(id);
    setBusy(false);
    if (!res.ok) {
      alert("Silinemedi. Konsolu kontrol edin veya tekrar deneyin.");
      return;
    }
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={busy}
      className="font-semibold text-red-600 hover:text-red-700 disabled:opacity-50"
    >
      {busy ? "…" : "Sil"}
    </button>
  );
}
