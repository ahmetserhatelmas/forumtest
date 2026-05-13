import { getPatientFormMessages } from "@/i18n/patient-form-messages";
import {
  CURRENT_PROBLEMS,
  DISEASES,
  FAMILY_ITEMS,
  type PatientFormData,
  type YesNo,
} from "@/types/patient-form";
import { FieldGrid, Label, Section } from "./Section";

/** Native controls only — avoids sharing `Section` inputs with `PatientForm` client bundle (RSC prop errors). */
const roInputClass =
  "mt-1 w-full rounded-xl border border-violet-100 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-inner shadow-violet-50 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200";

function RoInput({
  id,
  value,
  placeholder,
  className = "",
}: {
  id?: string;
  value: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      id={id}
      readOnly
      tabIndex={-1}
      defaultValue={value}
      placeholder={placeholder}
      className={`${roInputClass} cursor-default bg-violet-50/50 ${className}`}
    />
  );
}

function RoTextArea({
  id,
  value,
  rows,
}: {
  id?: string;
  value: string;
  rows: number;
}) {
  return (
    <textarea
      id={id}
      readOnly
      tabIndex={-1}
      rows={rows}
      defaultValue={value}
      className={`${roInputClass} cursor-default bg-violet-50/50`}
    />
  );
}

function attachmentKind(path: string | null | undefined): "image" | "pdf" | "other" {
  const ext = path?.split(".").pop()?.toLowerCase() ?? "";
  if (
    ["jpg", "jpeg", "png", "gif", "webp", "avif", "bmp", "svg"].includes(ext)
  ) {
    return "image";
  }
  if (ext === "pdf") return "pdf";
  return "other";
}

function AttachmentPreview({
  url,
  path,
  fileSectionTitle,
}: {
  url: string;
  path: string | null | undefined;
  fileSectionTitle: string;
}) {
  const kind = attachmentKind(path);
  const name = path?.split("/").pop() ?? fileSectionTitle;

  if (kind === "image") {
    return (
      <div className="space-y-3">
        <img
          src={url}
          alt=""
          className="max-h-[min(520px,70vh)] w-auto max-w-full rounded-xl border border-violet-100 bg-white object-contain shadow-sm"
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-sm font-semibold text-violet-700 underline hover:text-violet-900"
        >
          {name} — tam boyutta aç
        </a>
      </div>
    );
  }

  if (kind === "pdf") {
    return (
      <div className="space-y-3">
        <iframe
          title={name}
          src={url}
          className="h-[min(560px,75vh)] w-full rounded-xl border border-violet-100 bg-zinc-50 shadow-inner"
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-sm font-semibold text-violet-700 underline hover:text-violet-900"
        >
          PDF’yi yeni sekmede aç
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-zinc-600">
        Bu dosya türü burada önizlenemiyor. İndirmek veya açmak için bağlantıyı
        kullanın.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
      >
        {name} — aç / indir
      </a>
    </div>
  );
}

function RoYesNo({
  radioName,
  legend,
  groupLabel,
  value,
  yesLabel,
  noLabel,
}: {
  radioName: string;
  legend: string;
  groupLabel: string;
  value: YesNo;
  yesLabel: string;
  noLabel: string;
}) {
  return (
    <fieldset aria-label={groupLabel}>
      {legend ? (
        <legend className="text-sm font-medium text-zinc-800">{legend}</legend>
      ) : (
        <legend className="sr-only">{`${groupLabel} — ${yesLabel} / ${noLabel}`}</legend>
      )}
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
        <label className="inline-flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="radio"
            name={radioName}
            checked={value === "evet"}
            readOnly
            disabled
            className="h-4 w-4 shrink-0 accent-violet-600"
          />
          {yesLabel}
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="radio"
            name={radioName}
            checked={value === "hayir"}
            readOnly
            disabled
            className="h-4 w-4 shrink-0 accent-violet-600"
          />
          {noLabel}
        </label>
      </div>
    </fieldset>
  );
}

export function PatientFormReadOnly({
  data,
  attachments,
  attachmentUrl,
  attachmentPath,
  brokenAttachmentPaths,
}: {
  data: PatientFormData;
  /** İmzalı URL + storage yolu çiftleri; verilirse önceliklidir */
  attachments?: { url: string; path: string }[] | null;
  attachmentUrl?: string | null;
  attachmentPath?: string | null;
  /** İmzalı URL üretilemeyen depo yolları (admin önizlemesi) */
  brokenAttachmentPaths?: string[] | null;
}) {
  const fileAttachments =
    attachments != null
      ? attachments.filter((a) => Boolean(a.url?.trim() && a.path?.trim()))
      : attachmentUrl?.trim() && attachmentPath?.trim()
        ? [{ url: attachmentUrl, path: attachmentPath }]
        : [];
  const m = getPatientFormMessages(data.language);

  return (
    <div className="min-w-0 max-w-full space-y-6 overflow-x-clip" dir={m.dir}>
      <Section sectionKey="patient" title={m.section.patient}>
        <FieldGrid>
          <div>
            <Label htmlFor="ro-fullName">{m.label.fullName}</Label>
            <RoInput id="ro-fullName" value={data.patient.fullName} />
          </div>
          <div>
            <Label htmlFor="ro-age">{m.label.age}</Label>
            <RoInput id="ro-age" value={data.patient.age} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="ro-surg">{m.label.surgeryInterest}</Label>
            <RoInput id="ro-surg" value={data.patient.surgeryInterest} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="ro-op">{m.label.operation}</Label>
            <RoInput id="ro-op" value={data.patient.operation} />
          </div>
        </FieldGrid>
      </Section>

      <Section sectionKey="emergency" title={m.section.emergency}>
        <FieldGrid>
          <div>
            <Label htmlFor="ro-emn">{m.label.emFullName}</Label>
            <RoInput id="ro-emn" value={data.emergency.fullName} />
          </div>
          <div>
            <Label htmlFor="ro-emr">{m.label.relation}</Label>
            <RoInput id="ro-emr" value={data.emergency.relation} />
          </div>
          <div>
            <Label htmlFor="ro-emp">{m.label.mobile}</Label>
            <RoInput id="ro-emp" value={data.emergency.phone} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="ro-ema">{m.label.address}</Label>
            <RoTextArea id="ro-ema" rows={3} value={data.emergency.address} />
          </div>
        </FieldGrid>
      </Section>

      <Section sectionKey="bmi" title={m.section.bmi}>
        <FieldGrid>
          <div>
            <Label htmlFor="ro-hcm">{m.label.heightCm}</Label>
            <RoInput id="ro-hcm" value={data.bmi.heightCm} />
          </div>
          <div className="min-w-0">
            <Label>{m.label.feetInch}</Label>
            <div className="mt-1 flex min-w-0 flex-col gap-2 sm:flex-row sm:gap-2">
              <RoInput
                className="min-w-0 flex-1"
                placeholder={m.label.ft}
                value={data.bmi.heightFt}
              />
              <RoInput
                className="min-w-0 flex-1"
                placeholder={m.label.inch}
                value={data.bmi.heightIn}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="ro-wkg">{m.label.weightKg}</Label>
            <RoInput id="ro-wkg" value={data.bmi.weightKg} />
          </div>
          <div>
            <Label htmlFor="ro-wlb">{m.label.pound}</Label>
            <RoInput id="ro-wlb" value={data.bmi.weightLb} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="ro-bmi">{m.label.bmi}</Label>
            <RoInput
              id="ro-bmi"
              value={data.bmi.bmi}
              className="bg-violet-50/80 font-semibold text-violet-900"
            />
          </div>
        </FieldGrid>
      </Section>

      <Section sectionKey="priorSurgery" title={m.section.priorSurgery}>
        <RoYesNo
          radioName="ro-prior-had"
          legend=""
          groupLabel={m.section.priorSurgery}
          value={data.priorSurgery.had}
          yesLabel={m.common.yes}
          noLabel={m.common.no}
        />
        <div>
          <Label htmlFor="ro-psd">{m.common.detailIfAny}</Label>
          <RoTextArea id="ro-psd" rows={3} value={data.priorSurgery.detail} />
        </div>
        <div className="space-y-4">
          {data.priorSurgery.rows.map((row, index) => (
            <div
              key={`ps-${index}`}
              className="space-y-3 rounded-xl border border-violet-100 bg-violet-50/40 p-4"
            >
              <div>
                <Label>{m.label.type}</Label>
                <RoInput value={row.type} />
              </div>
              <div>
                <Label>{m.label.reason}</Label>
                <RoInput value={row.reason} />
              </div>
              <div>
                <Label>{m.label.date}</Label>
                <RoInput value={row.date} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section sectionKey="seriousInjury" title={m.section.seriousInjury}>
        <RoYesNo
          radioName="ro-serious-had"
          legend=""
          groupLabel={m.section.seriousInjury}
          value={data.seriousInjury.had}
          yesLabel={m.common.yes}
          noLabel={m.common.no}
        />
        <div>
          <Label>{m.common.detailIfAny}</Label>
          <RoTextArea rows={3} value={data.seriousInjury.detail} />
        </div>
      </Section>

      <Section sectionKey="bloodTransfusion" title={m.label.bloodTransfusion}>
        <RoYesNo
          radioName="ro-blood"
          legend=""
          groupLabel={m.label.bloodTransfusion}
          value={data.bloodTransfusion}
          yesLabel={m.common.yes}
          noLabel={m.common.no}
        />
      </Section>

      <Section sectionKey="chemicalExposure" title={m.label.chemicalExposure}>
        <RoYesNo
          radioName="ro-chemical"
          legend=""
          groupLabel={m.label.chemicalExposure}
          value={data.chemicalExposure}
          yesLabel={m.common.yes}
          noLabel={m.common.no}
        />
      </Section>

      <Section sectionKey="hospitalization" title={m.label.hospitalization}>
        <RoYesNo
          radioName="ro-hospital-had"
          legend=""
          groupLabel={m.label.hospitalization}
          value={data.hospitalNonSurgery.had}
          yesLabel={m.common.yes}
          noLabel={m.common.no}
        />
        <div className="border-t border-violet-100 pt-4">
          <Label htmlFor="ro-hosp">{m.common.detailIfAny}</Label>
          <RoTextArea id="ro-hosp" rows={3} value={data.hospitalNonSurgery.detail} />
        </div>
      </Section>

      <Section sectionKey="medications" title={m.section.medications}>
        <p className="text-sm text-zinc-600">{m.label.medIntro}</p>
        <RoTextArea rows={2} value={data.medications.note} />
        <div className="space-y-4">
          {data.medications.rows.map((row, index) => (
            <div
              key={`med-${index}`}
              className="space-y-3 rounded-xl border border-violet-100 bg-violet-50/40 p-4"
            >
              <div>
                <Label>{m.label.medName}</Label>
                <RoInput value={row.name} />
              </div>
              <div>
                <Label>{m.label.dose}</Label>
                <RoInput value={row.dose} />
              </div>
              <div>
                <Label>{m.label.frequency}</Label>
                <RoInput value={row.frequency} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section sectionKey="allergies" title={m.section.allergies}>
        <div className="space-y-4">
          {data.allergies.rows.map((row, index) => (
            <div
              key={`all-${index}`}
              className="space-y-3 rounded-xl border border-violet-100 bg-violet-50/40 p-4"
            >
              <div>
                <Label>{m.label.substance}</Label>
                <RoInput value={row.substance} />
              </div>
              <div>
                <Label>{m.label.reaction}</Label>
                <RoInput value={row.reaction} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section sectionKey="diseases" title={m.section.diseases}>
        <p className="text-sm text-zinc-600">{m.label.diseasesIntro}</p>
        <div className="space-y-3">
          {DISEASES.map((d) => {
            const v = data.diseases[d.id] ?? "";
            return (
              <div
                key={d.id}
                className="rounded-xl border border-violet-100 bg-white px-3 py-3"
              >
                <p className="text-sm font-medium text-zinc-800">
                  {m.diseases[d.id] ?? d.label}
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm text-zinc-700">
                    <input
                      type="radio"
                      name={`ro-dis-${d.id}`}
                      checked={v === "evet"}
                      readOnly
                      disabled
                      className="h-4 w-4 shrink-0 accent-violet-600"
                      aria-label={`${m.diseases[d.id] ?? d.label} — ${m.common.yes}`}
                    />
                    {m.common.yes}
                  </label>
                  <label className="flex items-center gap-2 text-sm text-zinc-700">
                    <input
                      type="radio"
                      name={`ro-dis-${d.id}`}
                      checked={v === "hayir"}
                      readOnly
                      disabled
                      className="h-4 w-4 shrink-0 accent-violet-600"
                      aria-label={`${m.diseases[d.id] ?? d.label} — ${m.common.no}`}
                    />
                    {m.common.no}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section sectionKey="smoking" title={m.label.smoking}>
        <RoYesNo
          radioName="ro-smoking"
          legend=""
          groupLabel={m.label.smoking}
          value={data.smoking}
          yesLabel={m.common.yes}
          noLabel={m.common.no}
        />
        <div className="border-t border-violet-100 pt-4">
          <Label htmlFor="ro-smoking-det">{m.label.alcoholAmount}</Label>
          <RoTextArea
            id="ro-smoking-det"
            rows={2}
            value={data.smokingDetail}
          />
        </div>
      </Section>

      <Section sectionKey="alcohol" title={m.section.alcohol}>
        <p className="text-sm font-medium text-zinc-900">
          {m.label.alcoholQuestion}
        </p>
        <div className="mt-4 space-y-4">
          <RoYesNo
            radioName="ro-alcohol-current"
            legend={m.label.alcoholNow}
            groupLabel={`${m.label.alcoholQuestion} — ${m.label.alcoholNow}`}
            value={data.alcohol.current}
            yesLabel={m.common.yes}
            noLabel={m.common.no}
          />
          <RoYesNo
            radioName="ro-alcohol-past"
            legend={m.label.alcoholPast}
            groupLabel={`${m.label.alcoholQuestion} — ${m.label.alcoholPast}`}
            value={data.alcohol.past}
            yesLabel={m.common.yes}
            noLabel={m.common.no}
          />
        </div>
        <div className="border-t border-violet-100 pt-4">
          <Label htmlFor="ro-alcohol-freq">{m.label.alcoholAmount}</Label>
          <RoTextArea
            id="ro-alcohol-freq"
            rows={3}
            value={data.alcohol.frequency}
          />
        </div>
      </Section>

      <Section sectionKey="drugs" title={m.section.drugs}>
        <p className="text-sm text-zinc-600">{m.label.drugsQuestion}</p>
        <RoYesNo
          radioName="ro-drugs-used"
          legend=""
          groupLabel={m.section.drugs}
          value={data.drugs.used}
          yesLabel={m.common.yes}
          noLabel={m.common.no}
        />
        <div>
          <Label>{m.label.drugsDetail}</Label>
          <RoTextArea rows={3} value={data.drugs.detail} />
        </div>
        <RoYesNo
          radioName="ro-drugs-injected"
          legend={m.label.drugsInjected}
          groupLabel={m.label.drugsInjected}
          value={data.drugs.injected}
          yesLabel={m.common.yes}
          noLabel={m.common.no}
        />
      </Section>

      <Section sectionKey="infectionRisk" title={m.label.infectionRisk}>
        <RoYesNo
          radioName="ro-infection"
          legend=""
          groupLabel={m.label.infectionRisk}
          value={data.infectionRisk}
          yesLabel={m.common.yes}
          noLabel={m.common.no}
        />
      </Section>

      <Section sectionKey="dvt" title={m.label.dvt}>
        <RoYesNo
          radioName="ro-dvt"
          legend=""
          groupLabel={m.label.dvt}
          value={data.dvt}
          yesLabel={m.common.yes}
          noLabel={m.common.no}
        />
      </Section>

      <Section sectionKey="psychiatric" title={m.label.psychiatric}>
        <RoYesNo
          radioName="ro-psych"
          legend=""
          groupLabel={m.label.psychiatric}
          value={data.psychiatric}
          yesLabel={m.common.yes}
          noLabel={m.common.no}
        />
      </Section>

      <Section sectionKey="family" title={m.section.family}>
        <p className="text-sm text-zinc-600">{m.label.familyIntro}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {FAMILY_ITEMS.map((f) => (
            <label
              key={f.id}
              className="flex cursor-default items-center gap-2 rounded-xl border border-violet-100 bg-violet-50/40 px-3 py-2 text-sm text-zinc-700"
            >
              <input
                type="checkbox"
                readOnly
                disabled
                checked={Boolean(data.family.items[f.id])}
                className="h-4 w-4 rounded border-violet-300 accent-violet-600"
              />
              {m.family[f.id] ?? f.label}
            </label>
          ))}
        </div>
        <div>
          <Label>{m.label.other}</Label>
          <RoTextArea rows={2} value={data.family.other} />
        </div>
      </Section>

      <Section sectionKey="currentProblems" title={m.section.currentProblems}>
        <p className="text-sm text-zinc-600">{m.label.currentIntro}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {CURRENT_PROBLEMS.map((p) => (
            <label
              key={p.id}
              className="flex cursor-default items-center gap-2 rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700"
            >
              <input
                type="checkbox"
                readOnly
                disabled
                checked={Boolean(data.currentProblems[p.id])}
                className="h-4 w-4 rounded border-violet-300 accent-violet-600"
              />
              {m.problems[p.id] ?? p.label}
            </label>
          ))}
        </div>
      </Section>

      <Section sectionKey="notes" title={m.section.notes}>
        <div>
          <Label>{m.label.extraNotes}</Label>
          <RoTextArea rows={4} value={data.extraNotes} />
        </div>
      </Section>

      <Section sectionKey="file" title={m.section.file}>
        {brokenAttachmentPaths && brokenAttachmentPaths.length > 0 ? (
          <p className="mb-3 text-sm text-amber-800">
            {brokenAttachmentPaths.length} ek için önizleme bağlantısı oluşturulamadı.
            Sayfayı yenileyin; devam ederse depolama izinlerini kontrol edin.
          </p>
        ) : null}
        {fileAttachments.length > 0 ? (
          <div className="space-y-6">
            {fileAttachments.map((a, idx) => (
              <div
                key={`${a.path}-${idx}`}
                className="rounded-xl border border-violet-100 bg-white/80 p-3 shadow-sm"
              >
                <AttachmentPreview
                  url={a.url}
                  path={a.path}
                  fileSectionTitle={m.section.file}
                />
              </div>
            ))}
          </div>
        ) : !brokenAttachmentPaths?.length ? (
          <p className="text-sm text-zinc-600">Ek dosya yüklenmemiş.</p>
        ) : null}
      </Section>
    </div>
  );
}
