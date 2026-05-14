"use client";

import { useState } from "react";

export function CopyShareLink({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}/s/${id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded-full border border-violet-300 bg-white px-4 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors"
    >
      {copied ? "✓ Kopyalandı" : "Linki Kopyala"}
    </button>
  );
}
