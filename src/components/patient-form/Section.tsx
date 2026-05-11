import type { ReactNode } from "react";

export function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-violet-100 bg-white/90 p-6 shadow-sm shadow-violet-100/80 backdrop-blur-sm ${className}`}
    >
      <h2 className="font-serif text-xl font-semibold tracking-tight text-violet-950 md:text-2xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

export function FieldGrid({
  children,
  cols = 2,
}: {
  children: ReactNode;
  cols?: 1 | 2;
}) {
  return (
    <div
      className={
        cols === 2
          ? "grid gap-4 md:grid-cols-2"
          : "grid gap-4 grid-cols-1"
      }
    >
      {children}
    </div>
  );
}

export function Label({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-zinc-800"
    >
      {children}
    </label>
  );
}

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      className={`mt-1 w-full rounded-xl border border-violet-100 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-inner shadow-violet-50 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200 ${props.className ?? ""}`}
    />
  );
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={`mt-1 w-full rounded-xl border border-violet-100 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-inner shadow-violet-50 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200 ${props.className ?? ""}`}
    />
  );
}
