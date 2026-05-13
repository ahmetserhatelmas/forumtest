import type { ReactNode } from "react";
import type { PatientFormSectionKey } from "./section-icon-config";
import { PATIENT_FORM_SECTION_ICONS } from "./section-icon-config";

export function Section({
  title,
  sectionKey,
  children,
  className = "",
}: {
  title: string;
  sectionKey?: PatientFormSectionKey;
  children: ReactNode;
  className?: string;
}) {
  const Icon = sectionKey ? PATIENT_FORM_SECTION_ICONS[sectionKey] : undefined;

  return (
    <section
      className={`min-w-0 max-w-full overflow-x-visible rounded-2xl border border-violet-100 bg-white/90 p-4 shadow-sm shadow-violet-100/80 backdrop-blur-sm sm:p-6 ${className}`}
    >
      <h2 className="flex items-center gap-3 font-serif text-xl font-semibold tracking-tight text-violet-950 md:text-2xl">
        {Icon ? (
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100/90 text-violet-700 ring-1 ring-violet-200/60"
            aria-hidden
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
        ) : null}
        <span className="min-w-0 flex-1 leading-snug">{title}</span>
      </h2>
      <div className="mt-5 min-w-0 space-y-4">{children}</div>
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
