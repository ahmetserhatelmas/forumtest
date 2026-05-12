import { LANGUAGES, type LanguageCode } from "@/constants/languages";

/** Renders a country flag via flag-icons (SVG background). Works on Android where emoji flags often fail. */
export function LanguageFlagIcon({
  code,
  className = "",
}: {
  code: LanguageCode;
  className?: string;
}) {
  const cc = LANGUAGES.find((l) => l.code === code)?.flagCountry ?? "xx";
  return (
    <span
      className={`fi fi-${cc} fis inline-block shrink-0 overflow-hidden rounded-sm ring-1 ring-black/10 ${className}`}
      style={{ width: "1.25rem", height: "1.25rem", verticalAlign: "-0.15em" }}
      aria-hidden
    />
  );
}
