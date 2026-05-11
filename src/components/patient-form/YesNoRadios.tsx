"use client";

import type { UseFormRegister, Path, FieldValues } from "react-hook-form";

export function YesNoRadios<T extends FieldValues>({
  register,
  name,
  legend,
  yesLabel,
  noLabel,
  groupLabel,
}: {
  register: UseFormRegister<T>;
  name: Path<T>;
  legend: string;
  yesLabel: string;
  noLabel: string;
  /** Visible section title is often outside; use for a11y when legend is empty */
  groupLabel?: string;
}) {
  return (
    <fieldset aria-label={groupLabel || legend || undefined}>
      {legend ? (
        <legend className="text-sm font-medium text-zinc-800">{legend}</legend>
      ) : (
        <legend className="sr-only">
          {groupLabel ? `${groupLabel} — ${yesLabel} / ${noLabel}` : `${yesLabel} / ${noLabel}`}
        </legend>
      )}
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
        <label className="inline-flex min-w-0 cursor-pointer items-center gap-2 text-sm">
          <input
            type="radio"
            value="evet"
            className="h-4 w-4 accent-violet-600"
            {...register(name)}
          />
          {yesLabel}
        </label>
        <label className="inline-flex min-w-0 cursor-pointer items-center gap-2 text-sm">
          <input
            type="radio"
            value="hayir"
            className="h-4 w-4 accent-violet-600"
            {...register(name)}
          />
          {noLabel}
        </label>
      </div>
    </fieldset>
  );
}
