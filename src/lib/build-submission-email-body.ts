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

function yn(m: ReturnType<typeof getPatientFormMessages>, v: YesNo): string {
  if (v === "evet") return m.common.yes;
  if (v === "hayir") return m.common.no;
  return "—";
}

function sectionHtml(title: string, inner: string): string {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;border:1px solid #e4e4e7;border-radius:8px;overflow:hidden;">
    <tr><td style="background:#7c3aed;color:#fff;padding:10px 14px;font-size:15px;font-weight:600;">${esc(title)}</td></tr>
    <tr><td style="padding:14px;background:#fafafa;">${inner}</td></tr>
  </table>`;
}

function rowHtml(label: string, value: string): string {
  const v = value?.trim() || "—";
  return `<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;vertical-align:top;width:38%;color:#52525b;font-size:13px;">${esc(label)}</td><td style="padding:6px 8px;border-bottom:1px solid #eee;font-size:13px;color:#18181b;">${esc(v)}</td></tr>`;
}

function tableRows(rows: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>`;
}

/** HTML + düz metin: admin panelindeki alanların çoğu; PDF e-posta içinde gömülmez, ek olarak gider. */
export function buildSubmissionEmailBody(
  form: PatientFormData,
  meta: {
    id: string;
    fullName: string | null;
    language: string;
    adminUrl: string;
    adminPath: string;
    attachmentFileNames: string[];
  },
): { html: string; text: string } {
  const m = getPatientFormMessages(form.language);
  const name = meta.fullName?.trim() || "—";

  const lines: string[] = [
    "Yeni hasta formu",
    `Kayıt no: ${meta.id}`,
    `Ad soyad: ${name}`,
    `Form dili: ${meta.language}`,
    "",
  ];

  const pushSec = (title: string, bodyLines: string[]) => {
    lines.push(`--- ${title} ---`);
    bodyLines.forEach((l) => lines.push(l));
    lines.push("");
  };

  const htmlParts: string[] = [];

  const metaInner = tableRows(
    rowHtml("Kayıt no", meta.id) +
      rowHtml(m.label.fullName, name) +
      rowHtml("Form dili", meta.language) +
      rowHtml(
        "Panel",
        meta.adminUrl || `(tanımlayın: ${meta.adminPath})`,
      ),
  );
  htmlParts.push(sectionHtml("Özet", metaInner));

  pushSec(m.section.patient, [
    `${m.label.fullName}: ${form.patient.fullName || "—"}`,
    `${m.label.age}: ${form.patient.age || "—"}`,
    `${m.label.surgeryInterest}: ${form.patient.surgeryInterest || "—"}`,
    `${m.label.operation}: ${form.patient.operation || "—"}`,
  ]);
  htmlParts.push(
    sectionHtml(
      m.section.patient,
      tableRows(
        rowHtml(m.label.fullName, form.patient.fullName) +
          rowHtml(m.label.age, form.patient.age) +
          rowHtml(m.label.surgeryInterest, form.patient.surgeryInterest) +
          rowHtml(m.label.operation, form.patient.operation),
      ),
    ),
  );

  pushSec(m.section.emergency, [
    `${m.label.emFullName}: ${form.emergency.fullName || "—"}`,
    `${m.label.relation}: ${form.emergency.relation || "—"}`,
    `${m.label.mobile}: ${form.emergency.phone || "—"}`,
    `${m.label.address}: ${form.emergency.address || "—"}`,
  ]);
  htmlParts.push(
    sectionHtml(
      m.section.emergency,
      tableRows(
        rowHtml(m.label.emFullName, form.emergency.fullName) +
          rowHtml(m.label.relation, form.emergency.relation) +
          rowHtml(m.label.mobile, form.emergency.phone) +
          rowHtml(m.label.address, form.emergency.address),
      ),
    ),
  );

  pushSec(m.section.bmi, [
    `${m.label.heightCm}: ${form.bmi.heightCm || "—"}`,
    `${m.label.feetInch}: ${form.bmi.heightFt || "—"} ft ${form.bmi.heightIn || "—"} in`,
    `${m.label.weightKg}: ${form.bmi.weightKg || "—"}`,
    `${m.label.pound}: ${form.bmi.weightLb || "—"}`,
    `${m.label.bmi}: ${form.bmi.bmi || "—"}`,
  ]);
  htmlParts.push(
    sectionHtml(
      m.section.bmi,
      tableRows(
        rowHtml(m.label.heightCm, form.bmi.heightCm) +
          rowHtml(`${m.label.feetInch} (ft/in)`, `${form.bmi.heightFt} / ${form.bmi.heightIn}`) +
          rowHtml(m.label.weightKg, form.bmi.weightKg) +
          rowHtml(m.label.pound, form.bmi.weightLb) +
          rowHtml(m.label.bmi, form.bmi.bmi),
      ),
    ),
  );

  const priorRows =
    rowHtml(m.common.detailIfAny, form.priorSurgery.detail) +
    form.priorSurgery.rows
      .map(
        (r, i) =>
          rowHtml(`${m.label.type} (${i + 1})`, r.type) +
          rowHtml(`${m.label.reason} (${i + 1})`, r.reason) +
          rowHtml(`${m.label.date} (${i + 1})`, r.date),
      )
      .join("");
  pushSec(m.section.priorSurgery, [
    `${m.common.yes}/${m.common.no}: ${yn(m, form.priorSurgery.had)}`,
    ...form.priorSurgery.rows.flatMap((r, i) => [
      `Satır ${i + 1}: ${r.type} | ${r.reason} | ${r.date}`,
    ]),
  ]);
  htmlParts.push(
    sectionHtml(
      m.section.priorSurgery,
      `<p style="margin:0 0 8px;font-size:13px;"><strong>${esc(m.common.yes)}/${esc(m.common.no)}:</strong> ${esc(yn(m, form.priorSurgery.had))}</p>${tableRows(priorRows)}`,
    ),
  );

  pushSec(m.section.seriousInjury, [
    yn(m, form.seriousInjury.had),
    form.seriousInjury.detail || "—",
  ]);
  htmlParts.push(
    sectionHtml(
      m.section.seriousInjury,
      `<p style="margin:0 0 8px;font-size:13px;">${esc(yn(m, form.seriousInjury.had))}</p>${tableRows(rowHtml(m.common.detailIfAny, form.seriousInjury.detail))}`,
    ),
  );

  pushSec(m.label.bloodTransfusion, [yn(m, form.bloodTransfusion)]);
  htmlParts.push(
    sectionHtml(
      m.label.bloodTransfusion,
      `<p style="margin:0;font-size:13px;">${esc(yn(m, form.bloodTransfusion))}</p>`,
    ),
  );

  pushSec(m.label.chemicalExposure, [yn(m, form.chemicalExposure)]);
  htmlParts.push(
    sectionHtml(
      m.label.chemicalExposure,
      `<p style="margin:0;font-size:13px;">${esc(yn(m, form.chemicalExposure))}</p>`,
    ),
  );

  pushSec(m.label.hospitalization, [
    yn(m, form.hospitalNonSurgery.had),
    form.hospitalNonSurgery.detail || "—",
  ]);
  htmlParts.push(
    sectionHtml(
      m.label.hospitalization,
      `<p style="margin:0 0 8px;font-size:13px;">${esc(yn(m, form.hospitalNonSurgery.had))}</p>${tableRows(rowHtml(m.common.detailIfAny, form.hospitalNonSurgery.detail))}`,
    ),
  );

  const medRows =
    rowHtml(m.label.medIntro, form.medications.note) +
    form.medications.rows
      .map(
        (r, i) =>
          rowHtml(`${m.label.medName} (${i + 1})`, r.name) +
          rowHtml(`${m.label.dose} (${i + 1})`, r.dose) +
          rowHtml(`${m.label.frequency} (${i + 1})`, r.frequency),
      )
      .join("");
  pushSec(m.section.medications, [form.medications.note || "—"]);
  htmlParts.push(sectionHtml(m.section.medications, tableRows(medRows)));

  const allergyRows = form.allergies.rows
    .map(
      (r, i) =>
        rowHtml(`${m.label.substance} (${i + 1})`, r.substance) +
        rowHtml(`${m.label.reaction} (${i + 1})`, r.reaction),
    )
    .join("");
  pushSec(
    m.section.allergies,
    form.allergies.rows.map(
      (r, i) => `${i + 1}. ${m.label.substance}: ${r.substance || "—"} | ${m.label.reaction}: ${r.reaction || "—"}`,
    ),
  );
  htmlParts.push(sectionHtml(m.section.allergies, tableRows(allergyRows)));

  const diseaseLines = DISEASES.map((d) => {
    const v = form.diseases[d.id] ?? "";
    return `${m.diseases[d.id] ?? d.label}: ${yn(m, v as YesNo)}`;
  });
  pushSec(m.section.diseases, diseaseLines);
  const diseaseRows = DISEASES.map((d) => {
    const v = form.diseases[d.id] ?? "";
    return rowHtml(m.diseases[d.id] ?? d.label, yn(m, v as YesNo));
  }).join("");
  htmlParts.push(
    sectionHtml(m.section.diseases, `<p style="margin:0 0 8px;font-size:12px;color:#52525b;">${esc(m.label.diseasesIntro)}</p>${tableRows(diseaseRows)}`),
  );

  pushSec(m.label.smoking, [yn(m, form.smoking), form.smokingDetail || "—"]);
  htmlParts.push(
    sectionHtml(
      m.label.smoking,
      `<p style="margin:0 0 8px;">${esc(yn(m, form.smoking))}</p>${tableRows(rowHtml(m.label.alcoholAmount, form.smokingDetail))}`,
    ),
  );

  pushSec(m.section.alcohol, [
    `${m.label.alcoholNow}: ${yn(m, form.alcohol.current)}`,
    `${m.label.alcoholPast}: ${yn(m, form.alcohol.past)}`,
    `${m.label.alcoholAmount}: ${form.alcohol.frequency || "—"}`,
  ]);
  htmlParts.push(
    sectionHtml(
      m.section.alcohol,
      `<p style="margin:0 0 8px;font-size:13px;">${esc(m.label.alcoholQuestion)}</p>${tableRows(
        rowHtml(m.label.alcoholNow, yn(m, form.alcohol.current)) +
          rowHtml(m.label.alcoholPast, yn(m, form.alcohol.past)) +
          rowHtml(m.label.alcoholAmount, form.alcohol.frequency),
      )}`,
    ),
  );

  pushSec(m.section.drugs, [
    yn(m, form.drugs.used),
    form.drugs.detail || "—",
    `${m.label.drugsInjected}: ${yn(m, form.drugs.injected)}`,
  ]);
  htmlParts.push(
    sectionHtml(
      m.section.drugs,
      `<p style="margin:0 0 8px;font-size:13px;">${esc(m.label.drugsQuestion)} — ${esc(yn(m, form.drugs.used))}</p>${tableRows(
        rowHtml(m.label.drugsDetail, form.drugs.detail) + rowHtml(m.label.drugsInjected, yn(m, form.drugs.injected)),
      )}`,
    ),
  );

  pushSec(m.label.infectionRisk, [yn(m, form.infectionRisk)]);
  pushSec(m.label.dvt, [yn(m, form.dvt)]);
  pushSec(m.label.psychiatric, [yn(m, form.psychiatric)]);
  htmlParts.push(
    sectionHtml(
      m.section.risk,
      tableRows(
        rowHtml(m.label.infectionRisk, yn(m, form.infectionRisk)) +
          rowHtml(m.label.dvt, yn(m, form.dvt)) +
          rowHtml(m.label.psychiatric, yn(m, form.psychiatric)),
      ),
    ),
  );

  const famChecked = FAMILY_ITEMS.filter((f) => form.family.items[f.id]).map(
    (f) => m.family[f.id] ?? f.label,
  );
  pushSec(m.section.family, [
    ...famChecked.map((x) => `• ${x}`),
    `${m.label.other}: ${form.family.other || "—"}`,
  ]);
  const famList =
    famChecked.length > 0
      ? `<ul style="margin:8px 0;padding-left:20px;font-size:13px;">${famChecked.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`
      : `<p style="margin:0;font-size:13px;color:#71717a;">—</p>`;
  htmlParts.push(
    sectionHtml(
      m.section.family,
      `<p style="margin:0 0 8px;font-size:12px;color:#52525b;">${esc(m.label.familyIntro)}</p>${famList}${tableRows(rowHtml(m.label.other, form.family.other))}`,
    ),
  );

  const probChecked = CURRENT_PROBLEMS.filter((p) => form.currentProblems[p.id]).map(
    (p) => m.problems[p.id] ?? p.label,
  );
  pushSec(m.section.currentProblems, probChecked.map((x) => `• ${x}`));
  const probList =
    probChecked.length > 0
      ? `<ul style="margin:8px 0;padding-left:20px;font-size:13px;">${probChecked.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`
      : `<p style="margin:0;font-size:13px;color:#71717a;">—</p>`;
  htmlParts.push(
    sectionHtml(
      m.section.currentProblems,
      `<p style="margin:0 0 8px;font-size:12px;color:#52525b;">${esc(m.label.currentIntro)}</p>${probList}`,
    ),
  );

  pushSec(m.section.notes, [form.extraNotes || "—"]);
  htmlParts.push(
    sectionHtml(m.section.notes, tableRows(rowHtml(m.label.extraNotes, form.extraNotes))),
  );

  const attNames = meta.attachmentFileNames.filter(Boolean);
  const hasAtt = attNames.length > 0;
  pushSec(m.section.file, [
    hasAtt ? `Ek: ${attNames.join(", ")}` : "Ek dosya yüklenmemiş.",
  ]);
  const fileInner = hasAtt
    ? (() => {
        const list = attNames.map((fn) => `<code style="font-size:12px;">${esc(fn)}</code>`).join(", ");
        const tail = meta.adminUrl
          ? ` veya <a href="${esc(meta.adminUrl)}">panelde açın</a>.`
          : "";
        const noun =
          attNames.length > 1
            ? "Dosyalar bu e-postanın <strong>eklerinde</strong>"
            : "Dosya bu e-postanın <strong>ekinde</strong>";
        return `<p style="margin:0;font-size:13px;line-height:1.6;">${noun} (${list}). E-posta istemcilerinde PDF paneldeki gibi gömülü önizlenmez; eki indirip açın.${tail}</p>`;
      })()
    : `<p style="margin:0;font-size:13px;color:#71717a;">${esc("Ek dosya yüklenmemiş.")}</p>`;
  htmlParts.push(sectionHtml(m.section.file, fileInner));

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/></head><body style="margin:0;padding:16px;font-family:system-ui,sans-serif;background:#f4f4f5;">
  <div style="max-width:640px;margin:0 auto;">
  <p style="font-size:14px;color:#3f3f46;">Yeni bir hasta formu gönderildi.</p>
  ${htmlParts.join("")}
  </div></body></html>`;

  return { html, text: lines.join("\n") };
}
