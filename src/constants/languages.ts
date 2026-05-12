export type LanguageCode =
  | "en"
  | "tr"
  | "bg"
  | "es"
  | "pt"
  | "ar"
  | "ru"
  | "fr"
  | "de"
  | "it"
  | "ro";

/** ISO 3166-1 alpha-2 for flag-icons (SVG); avoids emoji flags missing on many Android devices. */
export const LANGUAGES: {
  code: LanguageCode;
  label: string;
  flagCountry: string;
}[] = [
  { code: "en", label: "English", flagCountry: "gb" },
  { code: "tr", label: "Türkçe", flagCountry: "tr" },
  { code: "bg", label: "Bulgarian", flagCountry: "bg" },
  { code: "es", label: "Spanish", flagCountry: "es" },
  { code: "pt", label: "Portuguese", flagCountry: "pt" },
  { code: "ar", label: "عربي", flagCountry: "sa" },
  { code: "ru", label: "Русский", flagCountry: "ru" },
  { code: "fr", label: "Français", flagCountry: "fr" },
  { code: "de", label: "Deutsch", flagCountry: "de" },
  { code: "it", label: "Italiano", flagCountry: "it" },
  { code: "ro", label: "Română", flagCountry: "ro" },
];

export function languageLabel(code: string): string {
  return LANGUAGES.find((l) => l.code === code)?.label ?? code;
}
