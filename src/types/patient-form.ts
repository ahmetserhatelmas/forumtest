import type { LanguageCode } from "@/constants/languages";

export type YesNo = "evet" | "hayir" | "";

export interface SurgeryRow {
  type: string;
  reason: string;
  date: string;
}

export interface MedicationRow {
  name: string;
  dose: string;
  frequency: string;
}

export interface AllergyRow {
  substance: string;
  reaction: string;
}

export const DISEASES: { id: string; label: string }[] = [
  { id: "anemi", label: "Anemi" },
  { id: "astim", label: "Astım / Amfizem" },
  { id: "kan_pıhtılasma", label: "Kan pıhtılaşması / Kanama bozuklukları" },
  { id: "divertikulit", label: "Divertikülit" },
  { id: "epilepsi", label: "Epilepsi veya nöbetler" },
  { id: "gut", label: "Gut" },
  { id: "kolesterol", label: "Yüksek kolesterol" },
  { id: "karaciger", label: "Karaciğer hastalığı / Hepatit" },
  { id: "pankreatit", label: "Pankreatit" },
  { id: "romatizmal_ates", label: "Romatizmal ateş" },
  { id: "uyku_apnesi", label: "Uyku apnesi" },
  { id: "bel_soguklugu", label: "Bel soğukluğu / Klamidya" },
  { id: "tuberkuloz", label: "Tüberküloz" },
  { id: "ulser", label: "Ülserler, mide veya bağırsak" },
  { id: "artrit", label: "Artrit" },
  { id: "mesane", label: "Mesane veya böbrek enfeksiyonları" },
  { id: "kronik_ishal", label: "Kronik ishal" },
  { id: "seker", label: "Şeker hastalığı" },
  { id: "safra", label: "Safra taşları / Safra kesesi hastalığı" },
  { id: "kalp", label: "Kalp hastalığı / Anjina" },
  { id: "tansiyon", label: "Yüksek tansiyon" },
  { id: "akciger", label: "Akciğer hastalığı / Pnömoni" },
  { id: "polip", label: "Polipler" },
  { id: "cilt", label: "Cilt hastalığı" },
  { id: "inme", label: "İnme" },
  { id: "tiroid", label: "Tiroid hastalığı / Guatr" },
  { id: "tumor", label: "Tümörler / Kanser" },
  { id: "reflu", label: "Asit reflü / Mide yanması" },
];

export const FAMILY_ITEMS: { id: string; label: string }[] = [
  { id: "alkolizm", label: "Alkolizm" },
  { id: "anemi", label: "Anemi" },
  { id: "kolon_kanseri", label: "Bağırsak / Kolon Kanseri" },
  { id: "seker", label: "Şeker hastalığı" },
  { id: "kalp", label: "Kalp hastalığı / Anjina" },
  { id: "hepatit", label: "Hepatit" },
  { id: "tansiyon", label: "Yüksek tansiyon" },
  { id: "kolesterol", label: "Yüksek kolesterol" },
  { id: "bobrek", label: "Böbrek hastalığı" },
  { id: "inme", label: "İnme" },
];

export const CURRENT_PROBLEMS: { id: string; label: string }[] = [
  { id: "bas_agrisi", label: "Şiddetli veya olağandışı baş ağrısı" },
  { id: "isitme", label: "İşitme sorunları" },
  { id: "gorme", label: "Görme ile ilgili sorunlar" },
  { id: "sinus", label: "Sinüs sorunları veya saman nezlesi" },
  { id: "ses", label: "Ses kısıklığı" },
  { id: "dis", label: "Dişler veya diş etleri ile ilgili sorunlar" },
  { id: "cilt", label: "Şiddetli cilt problemleri" },
  { id: "kilo", label: "Kilo kaybı veya kazancı" },
  { id: "gogus", label: "Göğüs ağrıları veya rahatsızlık" },
  { id: "nefes", label: "Nefes darlığı" },
  { id: "oksuruk", label: "Öksürük veya balgam" },
  { id: "mide", label: "Mide sorunları, ağrı veya bulantı" },
  { id: "ishal", label: "İshal veya kabızlık" },
  { id: "kan_bagirsak", label: "Bağırsak hareketlerinde kan" },
  { id: "idrar", label: "İdrar yaparken zorluk veya ağrı" },
  { id: "eklem", label: "Eklem ağrıları" },
];

export type DiseaseAnswers = Record<string, YesNo>;

export type FamilyAnswers = Record<string, boolean>;

export type CurrentProblemAnswers = Record<string, boolean>;

export interface PatientFormData {
  language: LanguageCode;
  patient: {
    fullName: string;
    age: string;
    surgeryInterest: string;
    operation: string;
  };
  emergency: {
    fullName: string;
    relation: string;
    phone: string;
    address: string;
  };
  bmi: {
    heightCm: string;
    heightFt: string;
    heightIn: string;
    weightKg: string;
    weightLb: string;
    bmi: string;
  };
  priorSurgery: {
    had: YesNo;
    detail: string;
    rows: SurgeryRow[];
  };
  seriousInjury: {
    had: YesNo;
    detail: string;
  };
  bloodTransfusion: YesNo;
  chemicalExposure: YesNo;
  hospitalNonSurgery: {
    had: YesNo;
    detail: string;
  };
  medications: {
    note: string;
    rows: MedicationRow[];
  };
  allergies: {
    rows: AllergyRow[];
  };
  diseases: DiseaseAnswers;
  smoking: YesNo;
  /** Sigara için sıklık / miktar (opsiyonel açıklama). */
  smokingDetail: string;
  alcohol: {
    current: YesNo;
    past: YesNo;
    frequency: string;
  };
  drugs: {
    used: YesNo;
    detail: string;
    injected: YesNo;
  };
  infectionRisk: YesNo;
  dvt: YesNo;
  psychiatric: YesNo;
  family: {
    items: FamilyAnswers;
    other: string;
  };
  currentProblems: CurrentProblemAnswers;
  extraNotes: string;
}

export const emptySurgeryRow = (): SurgeryRow => ({
  type: "",
  reason: "",
  date: "",
});

export const emptyMedicationRow = (): MedicationRow => ({
  name: "",
  dose: "",
  frequency: "",
});

export const emptyAllergyRow = (): AllergyRow => ({
  substance: "",
  reaction: "",
});

function emptyDiseases(): DiseaseAnswers {
  return Object.fromEntries(DISEASES.map((d) => [d.id, "" as YesNo])) as DiseaseAnswers;
}

function emptyFamily(): FamilyAnswers {
  return Object.fromEntries(FAMILY_ITEMS.map((f) => [f.id, false])) as FamilyAnswers;
}

function emptyProblems(): CurrentProblemAnswers {
  return Object.fromEntries(
    CURRENT_PROBLEMS.map((p) => [p.id, false]),
  ) as CurrentProblemAnswers;
}

export function defaultPatientForm(language: LanguageCode): PatientFormData {
  return {
    language,
    patient: { fullName: "", age: "", surgeryInterest: "", operation: "" },
    emergency: { fullName: "", relation: "", phone: "", address: "" },
    bmi: {
      heightCm: "",
      heightFt: "",
      heightIn: "",
      weightKg: "",
      weightLb: "",
      bmi: "",
    },
    priorSurgery: {
      had: "",
      detail: "",
      rows: [emptySurgeryRow()],
    },
    seriousInjury: { had: "", detail: "" },
    bloodTransfusion: "",
    chemicalExposure: "",
    hospitalNonSurgery: { had: "", detail: "" },
    medications: {
      note: "",
      rows: [emptyMedicationRow()],
    },
    allergies: {
      rows: [emptyAllergyRow(), emptyAllergyRow()],
    },
    diseases: emptyDiseases(),
    smoking: "",
    smokingDetail: "",
    alcohol: { current: "", past: "", frequency: "" },
    drugs: { used: "", detail: "", injected: "" },
    infectionRisk: "",
    dvt: "",
    psychiatric: "",
    family: { items: emptyFamily(), other: "" },
    currentProblems: emptyProblems(),
    extraNotes: "",
  };
}
