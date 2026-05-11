"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { LANGUAGES, type LanguageCode } from "@/constants/languages";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function LanguageSelect({
  value,
  onChange,
}: {
  value: LanguageCode;
  onChange: (code: LanguageCode) => void;
}) {
  const [open, setOpen] = useState(false);
  const isClient = useIsClient();
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    if (!open || !btnRef.current) return;

    function place() {
      const el = btnRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const w = 260;
      const left = Math.min(
        Math.max(8, r.right - w),
        typeof window !== "undefined" ? window.innerWidth - w - 8 : r.left,
      );
      setMenuStyle({
        position: "fixed",
        top: r.bottom + 8,
        left,
        width: w,
        zIndex: 99999,
      });
    }

    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !isClient) return;
    function onDoc(e: MouseEvent) {
      const t = e.target as Node;
      if (btnRef.current?.contains(t)) return;
      if (menuRef.current?.contains(t)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, isClient]);

  const current = LANGUAGES.find((l) => l.code === value) ?? LANGUAGES[1];

  const menu =
    open && isClient ? (
      <div
        ref={menuRef}
        style={menuStyle}
        className="max-h-[min(70vh,420px)] overflow-y-auto rounded-2xl border border-violet-100 bg-white py-2 shadow-2xl shadow-violet-300/50"
        role="listbox"
      >
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            type="button"
            role="option"
            aria-selected={l.code === value}
            onClick={() => {
              onChange(l.code);
              setOpen(false);
            }}
            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-violet-50 ${
              l.code === value
                ? "bg-violet-50 font-semibold text-violet-900"
                : "text-zinc-800"
            }`}
          >
            <span className="text-lg leading-none">{l.flag}</span>
            {l.label}
          </button>
        ))}
      </div>
    ) : null;

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm transition hover:border-violet-300"
      >
        <span className="text-lg leading-none">{current.flag}</span>
        <span>{current.label}</span>
        <span className="text-violet-500" aria-hidden>
          ▾
        </span>
      </button>
      {isClient && menu ? createPortal(menu, document.body) : null}
    </div>
  );
}
