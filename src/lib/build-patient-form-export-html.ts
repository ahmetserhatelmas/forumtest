import {
  languageLabel,
  type LanguageCode,
} from "@/constants/languages";
import { getPatientFormMessages } from "@/i18n/patient-form-messages";
import {
  CURRENT_PROBLEMS,
  DISEASES,
  FAMILY_ITEMS,
  type PatientFormData,
  type YesNo,
} from "@/types/patient-form";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const PAGE =
  'font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;max-width:880px;margin:0 auto;padding:28px 20px 48px;color:#18181b;line-height:1.45';

const H1 =
  "font-size:26px;font-weight:700;color:#5b21b6;margin:0 0 8px";

const META_DL =
  "display:grid;grid-template-columns:140px 1fr;gap:6px 16px;font-size:13px;margin-bottom:28px;padding:16px;background:#faf5ff;border-radius:12px;border:1px solid #ede9fe";

const H2 =
  "font-size:17px;font-weight:700;color:#5b21b6;margin:28px 0 14px;padding-bottom:8px;border-bottom:2px solid #ede9fe";

const GRID2 =
  "display:grid;grid-template-columns:1fr 1fr;gap:14px 20px";

const LABEL =
  "font-size:11px;text-transform:uppercase;letter-spacing:0.04em;color:#71717a;font-weight:600;margin-bottom:4px";

const VALUE_BOX =
  "font-size:14px;white-space:pre-wrap;background:#fafafa;border:1px solid #f4f4f5;border-radius:8px;padding:10px 12px;min-height:22px";

const HINT = "font-size:13px;color:#52525b;margin-bottom:12px";

const TABLE =
  "width:100%;border-collapse:collapse;font-size:13px;margin-top:8px";

const TH =
  "text-align:left;padding:8px 10px;background:#f4f4f5;border-bottom:1px solid #e4e4e7;font-weight:600;color:#3f3f46";

const TD =
  "padding:10px;border-bottom:1px solid #f4f4f5;vertical-align:top";

function yn(v: YesNo, yes: string, no: string): string {
  if (v === "evet") return esc(yes);
  if (v === "hayir") return esc(no);
  return "—";
}

function field(l: string, v: string): string {
  const t = v.trim() ? esc(v) : "—";
  return `<div style="margin-bottom:4px"><div style="${LABEL}">${esc(l)}</div><div style="${VALUE_BOX}">${t}</div></div>`;
}

function box(title: string, inner: string): string {
  return `<section><h2 style="${H2}">${esc(title)}</h2>${inner}</section>`;
}

export function buildPatientFormExportHtml(
  data: PatientFormData,
  meta: {
    id: string;
    createdAt: string;
    fullName: string | null;
    language: string | null;
  },
): string {
  const m = getPatientFormMessages(data.language);
  const langLabel = languageLabel((meta.language as LanguageCode) || "tr");
  const created = new Date(meta.createdAt).toLocaleString(
    data.language === "tr" ? "tr-TR" : undefined,
  );

  const dir = m.dir;

  let html = `<div style="${PAGE}" dir="${esc(dir)}">`;
  html += `<h1 style="${H1}">${esc(m.meta.title)}</h1>`;
  html += `<dl style="${META_DL}">`;
  html += `<dt style="color:#71717a">Kayıt no</dt><dd style="margin:0;font-family:ui-monospace,monospace">${esc(meta.id)}</dd>`;
  html += `<dt style="color:#71717a">Tarih</dt><dd style="margin:0">${esc(created)}</dd>`;
  html += `<dt style="color:#71717a">Dil</dt><dd style="margin:0">${esc(langLabel)}</dd>`;
  html += `<dt style="color:#71717a">Ad soyad</dt><dd style="margin:0">${esc(meta.fullName?.trim() || "—")}</dd>`;
  html += `</dl>`;

  html += box(
    m.section.patient,
    `<div style="${GRID2}">${field(m.label.fullName, data.patient.fullName)}${field(m.label.age, data.patient.age)}<div style="grid-column:1/-1">${field(m.label.surgeryInterest, data.patient.surgeryInterest)}</div><div style="grid-column:1/-1">${field(m.label.operation, data.patient.operation)}</div></div>`,
  );

  html += box(
    m.section.emergency,
    `<div style="${GRID2}">${field(m.label.emFullName, data.emergency.fullName)}${field(m.label.relation, data.emergency.relation)}${field(m.label.mobile, data.emergency.phone)}<div style="grid-column:1/-1">${field(m.label.address, data.emergency.address)}</div></div>`,
  );

  const ftIn =
    data.bmi.heightFt || data.bmi.heightIn
      ? `${data.bmi.heightFt || "—"} ft / ${data.bmi.heightIn || "—"} in`
      : "—";
  html += box(
    m.section.bmi,
    `<div style="${GRID2}">${field(m.label.heightCm, data.bmi.heightCm)}<div><div style="${LABEL}">${esc(m.label.feetInch)}</div><div style="${VALUE_BOX}">${esc(ftIn)}</div></div>${field(m.label.weightKg, data.bmi.weightKg)}${field(m.label.pound, data.bmi.weightLb)}<div style="grid-column:1/-1">${field(m.label.bmi, data.bmi.bmi)}</div></div>`,
  );

  let priorRows = "";
  for (const row of data.priorSurgery.rows) {
    priorRows += `<tr><td style="${TD}">${esc(row.type || "—")}</td><td style="${TD}">${esc(row.reason || "—")}</td><td style="${TD}">${esc(row.date || "—")}</td></tr>`;
  }
  html += box(
    m.section.priorSurgery,
    `<p style="margin:0 0 8px">${yn(data.priorSurgery.had, m.common.yes, m.common.no)}</p>${field(m.common.detailIfAny, data.priorSurgery.detail)}<table style="${TABLE}"><thead><tr><th style="${TH}">${esc(m.label.type)}</th><th style="${TH}">${esc(m.label.reason)}</th><th style="${TH}">${esc(m.label.date)}</th></tr></thead><tbody>${priorRows}</tbody></table>`,
  );

  html += box(
    m.section.seriousInjury,
    `<p style="margin:0 0 8px">${yn(data.seriousInjury.had, m.common.yes, m.common.no)}</p>${field(m.common.detailIfAny, data.seriousInjury.detail)}`,
  );

  html += box(
    m.label.bloodTransfusion,
    `<p style="margin:0">${yn(data.bloodTransfusion, m.common.yes, m.common.no)}</p>`,
  );

  html += box(
    m.label.chemicalExposure,
    `<p style="margin:0">${yn(data.chemicalExposure, m.common.yes, m.common.no)}</p>`,
  );

  html += box(
    m.label.hospitalization,
    `<p style="margin:0 0 8px">${yn(data.hospitalNonSurgery.had, m.common.yes, m.common.no)}</p>${field(m.common.detailIfAny, data.hospitalNonSurgery.detail)}`,
  );

  let medRows = "";
  for (const row of data.medications.rows) {
    medRows += `<tr><td style="${TD}">${esc(row.name || "—")}</td><td style="${TD}">${esc(row.dose || "—")}</td><td style="${TD}">${esc(row.frequency || "—")}</td></tr>`;
  }
  html += box(
    m.section.medications,
    `<p style="${HINT}">${esc(m.label.medIntro)}</p><div style="margin-bottom:14px"><div style="${VALUE_BOX}">${data.medications.note.trim() ? esc(data.medications.note) : "—"}</div></div><table style="${TABLE}"><thead><tr><th style="${TH}">${esc(m.label.medName)}</th><th style="${TH}">${esc(m.label.dose)}</th><th style="${TH}">${esc(m.label.frequency)}</th></tr></thead><tbody>${medRows}</tbody></table>`,
  );

  let alRows = "";
  for (const row of data.allergies.rows) {
    alRows += `<tr><td style="${TD}">${esc(row.substance || "—")}</td><td style="${TD}">${esc(row.reaction || "—")}</td></tr>`;
  }
  html += box(
    m.section.allergies,
    `<table style="${TABLE}"><thead><tr><th style="${TH}">${esc(m.label.substance)}</th><th style="${TH}">${esc(m.label.reaction)}</th></tr></thead><tbody>${alRows}</tbody></table>`,
  );

  let disRows = "";
  for (const d of DISEASES) {
    const v = data.diseases[d.id] ?? "";
    disRows += `<tr><td style="${TD}">${esc(m.diseases[d.id] ?? d.label)}</td><td style="${TD}">${v === "evet" ? "✓" : ""}</td><td style="${TD}">${v === "hayir" ? "✓" : ""}</td></tr>`;
  }
  html += box(
    m.section.diseases,
    `<p style="${HINT}">${esc(m.label.diseasesIntro)}</p><table style="${TABLE}"><thead><tr><th style="${TH}">${esc(m.label.disease)}</th><th style="${TH};width:80px">${esc(m.common.yes)}</th><th style="${TH};width:80px">${esc(m.common.no)}</th></tr></thead><tbody>${disRows}</tbody></table>`,
  );

  html += box(
    m.label.smoking,
    `<p style="margin:0 0 8px">${yn(data.smoking, m.common.yes, m.common.no)}</p>${field(m.label.alcoholAmount, data.smokingDetail)}`,
  );

  html += box(
    m.section.alcohol,
    `<p style="font-weight:600;margin:0 0 12px">${esc(m.label.alcoholQuestion)}</p><p style="margin:0 0 4px;font-size:13px;color:#52525b">${esc(m.label.alcoholNow)}: <strong>${yn(data.alcohol.current, m.common.yes, m.common.no)}</strong></p><p style="margin:0 0 12px;font-size:13px;color:#52525b">${esc(m.label.alcoholPast)}: <strong>${yn(data.alcohol.past, m.common.yes, m.common.no)}</strong></p>${field(m.label.alcoholAmount, data.alcohol.frequency)}`,
  );

  html += box(
    m.section.drugs,
    `<p style="${HINT}">${esc(m.label.drugsQuestion)}</p><p style="margin:0 0 8px">${yn(data.drugs.used, m.common.yes, m.common.no)}</p>${field(m.label.drugsDetail, data.drugs.detail)}<p style="margin:12px 0 0;font-size:13px">${esc(m.label.drugsInjected)}: <strong>${yn(data.drugs.injected, m.common.yes, m.common.no)}</strong></p>`,
  );

  html += box(
    m.label.infectionRisk,
    `<p style="margin:0">${yn(data.infectionRisk, m.common.yes, m.common.no)}</p>`,
  );

  html += box(
    m.label.dvt,
    `<p style="margin:0">${yn(data.dvt, m.common.yes, m.common.no)}</p>`,
  );

  html += box(
    m.label.psychiatric,
    `<p style="margin:0">${yn(data.psychiatric, m.common.yes, m.common.no)}</p>`,
  );

  let famLi = "";
  for (const f of FAMILY_ITEMS) {
    const mark = data.family.items[f.id] ? "☑ " : "☐ ";
    famLi += `<li style="margin-bottom:6px;break-inside:avoid">${esc(mark + (m.family[f.id] ?? f.label))}</li>`;
  }
  html += box(
    m.section.family,
    `<p style="${HINT}">${esc(m.label.familyIntro)}</p><ul style="margin:8px 0 16px;padding-left:20px;columns:2;column-gap:24px">${famLi}</ul>${field(m.label.other, data.family.other)}`,
  );

  let probLi = "";
  for (const p of CURRENT_PROBLEMS) {
    const mark = data.currentProblems[p.id] ? "☑ " : "☐ ";
    probLi += `<li style="margin-bottom:6px;break-inside:avoid">${esc(mark + (m.problems[p.id] ?? p.label))}</li>`;
  }
  html += box(
    m.section.currentProblems,
    `<p style="${HINT}">${esc(m.label.currentIntro)}</p><ul style="margin:8px 0 0;padding-left:20px;columns:2">${probLi}</ul>`,
  );

  html += box(m.section.notes, field(m.label.extraNotes, data.extraNotes));

  html += `</div>`;
  return html;
}
