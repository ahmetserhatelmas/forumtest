import type { LanguageCode } from "@/constants/languages";
import { LANGUAGES } from "@/constants/languages";
import {
  type AllergyRow,
  type DiseaseAnswers,
  type FamilyAnswers,
  type MedicationRow,
  type PatientFormData,
  type SurgeryRow,
  type CurrentProblemAnswers,
  defaultPatientForm,
  emptyAllergyRow,
  emptyMedicationRow,
  emptySurgeryRow,
  DISEASES,
  FAMILY_ITEMS,
  CURRENT_PROBLEMS,
} from "@/types/patient-form";

function isLang(x: unknown): x is LanguageCode {
  return typeof x === "string" && LANGUAGES.some((l) => l.code === x);
}

function mergeRows<T>(
  fallback: T[],
  incoming: unknown,
  empty: () => T,
): T[] {
  if (!Array.isArray(incoming) || incoming.length === 0) return fallback;
  return incoming.map((row) => ({ ...empty(), ...(row as object) } as T));
}

export function normalizePatientFormData(
  raw: unknown,
  fallbackLanguage: LanguageCode,
): PatientFormData {
  const lang =
    raw &&
    typeof raw === "object" &&
    "language" in raw &&
    isLang((raw as { language: unknown }).language)
      ? (raw as { language: LanguageCode }).language
      : fallbackLanguage;

  const def = defaultPatientForm(lang);
  if (!raw || typeof raw !== "object") return def;

  const s = raw as Record<string, unknown>;

  const prior = (s.priorSurgery && typeof s.priorSurgery === "object"
    ? s.priorSurgery
    : {}) as Partial<PatientFormData["priorSurgery"]>;

  const meds = (s.medications && typeof s.medications === "object"
    ? s.medications
    : {}) as Partial<PatientFormData["medications"]>;

  const allergies = (s.allergies && typeof s.allergies === "object"
    ? s.allergies
    : {}) as Partial<PatientFormData["allergies"]>;

  const family = (s.family && typeof s.family === "object"
    ? s.family
    : {}) as Partial<PatientFormData["family"]>;

  const diseasesIn = (s.diseases && typeof s.diseases === "object"
    ? s.diseases
    : {}) as Record<string, unknown>;

  const diseases: DiseaseAnswers = { ...def.diseases };
  for (const d of DISEASES) {
    const v = diseasesIn[d.id];
    if (v === "evet" || v === "hayir" || v === "") {
      diseases[d.id] = v;
    }
  }

  const itemsIn = (family.items && typeof family.items === "object"
    ? family.items
    : {}) as Record<string, unknown>;
  const familyItems: FamilyAnswers = { ...def.family.items };
  for (const f of FAMILY_ITEMS) {
    const b = itemsIn[f.id];
    if (typeof b === "boolean") {
      familyItems[f.id] = b;
    }
  }

  const probIn = (s.currentProblems && typeof s.currentProblems === "object"
    ? s.currentProblems
    : {}) as Record<string, unknown>;
  const currentProblems: CurrentProblemAnswers = { ...def.currentProblems };
  for (const p of CURRENT_PROBLEMS) {
    const b = probIn[p.id];
    if (typeof b === "boolean") {
      currentProblems[p.id] = b;
    }
  }

  return {
    language: lang,
    patient: { ...def.patient, ...(s.patient as object) },
    emergency: { ...def.emergency, ...(s.emergency as object) },
    bmi: { ...def.bmi, ...(s.bmi as object) },
    priorSurgery: {
      ...def.priorSurgery,
      ...prior,
      rows: mergeRows<SurgeryRow>(
        def.priorSurgery.rows,
        prior.rows,
        emptySurgeryRow,
      ),
    },
    seriousInjury: { ...def.seriousInjury, ...(s.seriousInjury as object) },
    bloodTransfusion:
      s.bloodTransfusion === "evet" || s.bloodTransfusion === "hayir" || s.bloodTransfusion === ""
        ? (s.bloodTransfusion as PatientFormData["bloodTransfusion"])
        : def.bloodTransfusion,
    chemicalExposure:
      s.chemicalExposure === "evet" || s.chemicalExposure === "hayir" || s.chemicalExposure === ""
        ? (s.chemicalExposure as PatientFormData["chemicalExposure"])
        : def.chemicalExposure,
    hospitalNonSurgery: {
      ...def.hospitalNonSurgery,
      ...(s.hospitalNonSurgery as object),
    },
    medications: {
      ...def.medications,
      ...meds,
      rows: mergeRows<MedicationRow>(
        def.medications.rows,
        meds.rows,
        emptyMedicationRow,
      ),
    },
    allergies: {
      rows: mergeRows<AllergyRow>(
        def.allergies.rows,
        allergies.rows,
        emptyAllergyRow,
      ),
    },
    diseases,
    smoking:
      s.smoking === "evet" || s.smoking === "hayir" || s.smoking === ""
        ? (s.smoking as PatientFormData["smoking"])
        : def.smoking,
    smokingDetail:
      typeof s.smokingDetail === "string" ? s.smokingDetail : def.smokingDetail,
    alcohol: { ...def.alcohol, ...(s.alcohol as object) },
    drugs: { ...def.drugs, ...(s.drugs as object) },
    infectionRisk:
      s.infectionRisk === "evet" || s.infectionRisk === "hayir" || s.infectionRisk === ""
        ? (s.infectionRisk as PatientFormData["infectionRisk"])
        : def.infectionRisk,
    dvt:
      s.dvt === "evet" || s.dvt === "hayir" || s.dvt === ""
        ? (s.dvt as PatientFormData["dvt"])
        : def.dvt,
    psychiatric:
      s.psychiatric === "evet" || s.psychiatric === "hayir" || s.psychiatric === ""
        ? (s.psychiatric as PatientFormData["psychiatric"])
        : def.psychiatric,
    family: {
      items: familyItems,
      other: typeof family.other === "string" ? family.other : def.family.other,
    },
    currentProblems,
    extraNotes: typeof s.extraNotes === "string" ? s.extraNotes : def.extraNotes,
  };
}
