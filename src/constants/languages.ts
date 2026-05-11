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

export const LANGUAGES: {
  code: LanguageCode;
  label: string;
  flag: string;
}[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "bg", label: "Bulgarian", flag: "🇧🇬" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "pt", label: "Portuguese", flag: "🇵🇹" },
  { code: "ar", label: "عربي", flag: "🇸🇦" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "ro", label: "Română", flag: "🇷🇴" },
];

export function languageLabel(code: string): string {
  return LANGUAGES.find((l) => l.code === code)?.label ?? code;
}
