import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bandage,
  Brain,
  Building2,
  Bug,
  Cigarette,
  ClipboardList,
  Droplets,
  FileText,
  FlaskConical,
  HeartPulse,
  Paperclip,
  PhoneCall,
  Pill,
  Scale,
  Scissors,
  ShieldAlert,
  Syringe,
  User,
  Users,
  Wine,
} from "lucide-react";

/** Stable keys for patient form cards — icons stay consistent across all languages. */
export type PatientFormSectionKey =
  | "patient"
  | "emergency"
  | "bmi"
  | "priorSurgery"
  | "seriousInjury"
  | "bloodTransfusion"
  | "chemicalExposure"
  | "hospitalization"
  | "medications"
  | "allergies"
  | "diseases"
  | "smoking"
  | "alcohol"
  | "drugs"
  | "infectionRisk"
  | "dvt"
  | "psychiatric"
  | "family"
  | "currentProblems"
  | "notes"
  | "file";

export const PATIENT_FORM_SECTION_ICONS: Record<
  PatientFormSectionKey,
  LucideIcon
> = {
  patient: User,
  emergency: PhoneCall,
  bmi: Scale,
  priorSurgery: Scissors,
  seriousInjury: Bandage,
  bloodTransfusion: Droplets,
  chemicalExposure: FlaskConical,
  hospitalization: Building2,
  medications: Pill,
  allergies: ShieldAlert,
  diseases: Activity,
  smoking: Cigarette,
  alcohol: Wine,
  drugs: Syringe,
  infectionRisk: Bug,
  dvt: HeartPulse,
  psychiatric: Brain,
  family: Users,
  currentProblems: ClipboardList,
  notes: FileText,
  file: Paperclip,
};
