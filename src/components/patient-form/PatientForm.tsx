"use client";

import { useEffect, useMemo, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { useFieldArray, useForm } from "react-hook-form";
import {
  cmToFtIn,
  computeBmi,
  ftInToCm,
  kgToLb,
  lbToKg,
} from "@/lib/bmi";
import { submitPatientForm } from "@/app/actions/submit-patient-form";
import type { LanguageCode } from "@/constants/languages";
import { getPatientFormMessages } from "@/i18n/patient-form-messages";
import {
  CURRENT_PROBLEMS,
  DISEASES,
  FAMILY_ITEMS,
  defaultPatientForm,
  emptyAllergyRow,
  emptyMedicationRow,
  emptySurgeryRow,
  type PatientFormData,
} from "@/types/patient-form";
import { LanguageSelect } from "./LanguageSelect";
import {
  FieldGrid,
  Label,
  Section,
  TextArea,
  TextInput,
} from "./Section";
import { YesNoRadios } from "./YesNoRadios";

function parseNum(s: string): number | null {
  const n = parseFloat(String(s).replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function sameFile(a: File, b: File): boolean {
  return (
    a.name === b.name && a.size === b.size && a.lastModified === b.lastModified
  );
}

const MAX_FORM_FILES = 20;

function RowRemoveButton({
  label,
  disabled,
  onRemove,
}: {
  label: string;
  disabled: boolean;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onRemove}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-200 bg-white text-violet-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-violet-200 disabled:hover:bg-white disabled:hover:text-violet-700"
      aria-label={label}
      title={label}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden
      >
        <path d="M3 6h18" />
        <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" />
      </svg>
    </button>
  );
}

export function PatientForm() {
  const [lang, setLang] = useState<LanguageCode>("tr");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const m = useMemo(() => getPatientFormMessages(lang), [lang]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<PatientFormData>({
    defaultValues: defaultPatientForm("tr"),
  });

  const surgeryRows = useFieldArray({
    control,
    name: "priorSurgery.rows",
  });

  const medicationRows = useFieldArray({
    control,
    name: "medications.rows",
  });

  const allergyRows = useFieldArray({
    control,
    name: "allergies.rows",
  });

  useEffect(() => {
    setValue("language", lang);
  }, [lang, setValue]);

  const heightCm = watch("bmi.heightCm");
  const heightFt = watch("bmi.heightFt");
  const heightIn = watch("bmi.heightIn");
  const weightKg = watch("bmi.weightKg");
  const weightLb = watch("bmi.weightLb");
  useEffect(() => {
    const bmi = computeBmi({
      heightCm: parseNum(heightCm),
      heightFt: parseNum(heightFt),
      heightIn: parseNum(heightIn),
      weightKg: parseNum(weightKg),
      weightLb: parseNum(weightLb),
    });
    setValue("bmi.bmi", bmi != null ? String(bmi) : "", { shouldDirty: false });
  }, [heightCm, heightFt, heightIn, weightKg, weightLb, setValue]);

  const regHeightCm = register("bmi.heightCm");
  const regHeightFt = register("bmi.heightFt");
  const regHeightIn = register("bmi.heightIn");
  const regWeightKg = register("bmi.weightKg");
  const regWeightLb = register("bmi.weightLb");

  const onSubmit = handleSubmit(async (values) => {
    setStatus("sending");
    setErrorMsg("");
    const fd = new FormData();
    fd.append("payload", JSON.stringify({ language: values.language, form: values }));
    files.forEach((f) => fd.append("files", f));
    const res = await submitPatientForm(fd);
    if (res.ok) {
      setStatus("done");
      reset(defaultPatientForm(lang));
      setFiles([]);
    } else {
      setStatus("error");
      setErrorMsg(m.errors[res.code]);
    }
  });

  return (
    <div
      className="min-h-screen w-full min-w-0 max-w-full overflow-x-clip bg-[radial-gradient(ellipse_at_top,_#f3e8ff_0%,_#f7f2ff_45%,_#faf8ff_100%)] pb-16 text-zinc-900"
      dir={m.dir}
    >
      <header className="relative z-[100] overflow-visible border-b border-violet-200/40 bg-[#f7f2ff]/85 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-5">
          <div className="flex flex-col items-center gap-4 md:hidden">
            <BrandLogo variant="light" />
            <div className="flex w-full min-w-0 flex-wrap items-center justify-center gap-3">
              <span className="text-sm font-medium text-violet-900/80">
                {m.meta.selectLang}
              </span>
              <LanguageSelect value={lang} onChange={setLang} />
            </div>
          </div>
          <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-4 md:grid">
            <div aria-hidden className="min-w-0" />
            <div className="flex justify-center">
              <BrandLogo variant="light" />
            </div>
            <div className="flex min-w-0 flex-wrap items-center justify-end gap-3">
              <span className="text-sm font-medium text-violet-900/80">
                {m.meta.selectLang}
              </span>
              <LanguageSelect value={lang} onChange={setLang} />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-0 mx-auto min-w-0 max-w-5xl px-4 pt-10">
        <div className="mb-8 text-center md:text-left">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-violet-950 md:text-4xl">
            {m.meta.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 md:text-base">
            {m.meta.subtitle}
          </p>
        </div>

        {status === "error" ? (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-900">
            <p className="font-medium">{m.status.failTitle}</p>
            <p className="mt-1 text-sm">{errorMsg}</p>
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="space-y-6">
          <input type="hidden" {...register("language")} />

          <Section sectionKey="patient" title={m.section.patient}>
            <FieldGrid>
              <div>
                <Label htmlFor="fullName">{m.label.fullName}</Label>
                <TextInput
                  id="fullName"
                  {...register("patient.fullName", { required: true })}
                />
                {errors.patient?.fullName ? (
                  <p className="mt-1 text-xs text-red-600">{m.common.required}</p>
                ) : null}
              </div>
              <div>
                <Label htmlFor="age">{m.label.age}</Label>
                <TextInput id="age" type="number" min={0} {...register("patient.age")} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="surgeryInterest">{m.label.surgeryInterest}</Label>
                <TextInput id="surgeryInterest" {...register("patient.surgeryInterest")} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="operation">{m.label.operation}</Label>
                <TextInput id="operation" {...register("patient.operation")} />
              </div>
            </FieldGrid>
          </Section>

          <Section sectionKey="emergency" title={m.section.emergency}>
            <FieldGrid>
              <div>
                <Label htmlFor="emName">{m.label.emFullName}</Label>
                <TextInput id="emName" {...register("emergency.fullName")} />
              </div>
              <div>
                <Label htmlFor="emRel">{m.label.relation}</Label>
                <TextInput id="emRel" {...register("emergency.relation")} />
              </div>
              <div>
                <Label htmlFor="emPhone">{m.label.mobile}</Label>
                <TextInput id="emPhone" {...register("emergency.phone")} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="emAddr">{m.label.address}</Label>
                <TextArea id="emAddr" rows={3} {...register("emergency.address")} />
              </div>
            </FieldGrid>
          </Section>

          <Section sectionKey="bmi" title={m.section.bmi}>
            <FieldGrid>
              <div>
                <Label htmlFor="hcm">{m.label.heightCm}</Label>
                <TextInput
                  id="hcm"
                  inputMode="decimal"
                  {...regHeightCm}
                  onChange={(e) => {
                    regHeightCm.onChange(e);
                    const raw = e.target.value;
                    const cm = parseNum(raw);
                    if (!raw.trim() || cm == null || cm <= 0) {
                      setValue("bmi.heightFt", "");
                      setValue("bmi.heightIn", "");
                      return;
                    }
                    const { ft, inch } = cmToFtIn(cm);
                    setValue("bmi.heightFt", ft > 0 ? String(ft) : "");
                    setValue(
                      "bmi.heightIn",
                      inch > 0 || ft > 0 ? String(inch) : "",
                    );
                  }}
                />
              </div>
              <div className="min-w-0">
                <Label>{m.label.feetInch}</Label>
                <div className="mt-1 flex min-w-0 flex-col gap-2 sm:flex-row sm:gap-2">
                  <TextInput
                    placeholder={m.label.ft}
                    inputMode="decimal"
                    {...regHeightFt}
                    className="min-w-0 flex-1"
                    onChange={(e) => {
                      regHeightFt.onChange(e);
                      const rawFt = e.target.value;
                      const rawIn = getValues("bmi.heightIn") ?? "";
                      const ft = parseNum(rawFt) ?? 0;
                      const inch = parseNum(rawIn) ?? 0;
                      if (!rawFt.trim() && !String(rawIn).trim()) {
                        setValue("bmi.heightCm", "");
                        return;
                      }
                      const cm = ftInToCm(ft, inch);
                      if (cm > 0) setValue("bmi.heightCm", String(cm));
                      else setValue("bmi.heightCm", "");
                    }}
                  />
                  <TextInput
                    className="min-w-0 flex-1"
                    placeholder={m.label.inch}
                    inputMode="decimal"
                    {...regHeightIn}
                    onChange={(e) => {
                      regHeightIn.onChange(e);
                      const rawIn = e.target.value;
                      const rawFt = getValues("bmi.heightFt") ?? "";
                      const ft = parseNum(rawFt) ?? 0;
                      const inch = parseNum(rawIn) ?? 0;
                      if (!String(rawFt).trim() && !rawIn.trim()) {
                        setValue("bmi.heightCm", "");
                        return;
                      }
                      const cm = ftInToCm(ft, inch);
                      if (cm > 0) setValue("bmi.heightCm", String(cm));
                      else setValue("bmi.heightCm", "");
                    }}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="wkg">{m.label.weightKg}</Label>
                <TextInput
                  id="wkg"
                  inputMode="decimal"
                  {...regWeightKg}
                  onChange={(e) => {
                    regWeightKg.onChange(e);
                    const raw = e.target.value;
                    const kg = parseNum(raw);
                    if (!raw.trim() || kg == null || kg <= 0) {
                      setValue("bmi.weightLb", "");
                      return;
                    }
                    setValue("bmi.weightLb", String(kgToLb(kg)));
                  }}
                />
              </div>
              <div>
                <Label htmlFor="wlb">{m.label.pound}</Label>
                <TextInput
                  id="wlb"
                  inputMode="decimal"
                  {...regWeightLb}
                  onChange={(e) => {
                    regWeightLb.onChange(e);
                    const raw = e.target.value;
                    const lb = parseNum(raw);
                    if (!raw.trim() || lb == null || lb <= 0) {
                      setValue("bmi.weightKg", "");
                      return;
                    }
                    setValue("bmi.weightKg", String(lbToKg(lb)));
                  }}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="bmiro">{m.label.bmi}</Label>
                <TextInput
                  id="bmiro"
                  readOnly
                  tabIndex={-1}
                  className="bg-violet-50/80 font-semibold text-violet-900"
                  {...register("bmi.bmi")}
                />
              </div>
            </FieldGrid>
          </Section>

          <Section sectionKey="priorSurgery" title={m.section.priorSurgery}>
            <YesNoRadios
              register={register}
              name="priorSurgery.had"
              legend=""
              groupLabel={m.section.priorSurgery}
              yesLabel={m.common.yes}
              noLabel={m.common.no}
            />
            <div>
              <Label htmlFor="psDet">{m.common.detailIfAny}</Label>
              <TextArea id="psDet" rows={3} {...register("priorSurgery.detail")} />
            </div>
            <div className="space-y-4">
              {surgeryRows.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-3 rounded-xl border border-violet-100 bg-violet-50/40 p-4"
                >
                  <div>
                    <Label>{m.label.type}</Label>
                    <TextInput
                      {...register(`priorSurgery.rows.${index}.type` as const)}
                    />
                  </div>
                  <div>
                    <Label>{m.label.reason}</Label>
                    <TextInput
                      {...register(`priorSurgery.rows.${index}.reason` as const)}
                    />
                  </div>
                  <div>
                    <Label>{m.label.date}</Label>
                    <TextInput
                      {...register(`priorSurgery.rows.${index}.date` as const)}
                    />
                  </div>
                  <div className="flex justify-end pt-1">
                    <RowRemoveButton
                      label={m.common.removeRow}
                      disabled={surgeryRows.fields.length <= 1}
                      onRemove={() => surgeryRows.remove(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => surgeryRows.append(emptySurgeryRow())}
              className="mt-3 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-lg font-semibold leading-none text-white shadow-md shadow-violet-300/50 transition hover:bg-violet-700"
              aria-label={m.common.addRow}
              title={m.common.addRow}
            >
              +
            </button>
          </Section>

          <Section sectionKey="seriousInjury" title={m.section.seriousInjury}>
            <YesNoRadios
              register={register}
              name="seriousInjury.had"
              legend=""
              groupLabel={m.section.seriousInjury}
              yesLabel={m.common.yes}
              noLabel={m.common.no}
            />
            <div>
              <Label>{m.common.detailIfAny}</Label>
              <TextArea rows={3} {...register("seriousInjury.detail")} />
            </div>
          </Section>

          <Section sectionKey="bloodTransfusion" title={m.label.bloodTransfusion}>
            <YesNoRadios
              register={register}
              name="bloodTransfusion"
              legend=""
              groupLabel={m.label.bloodTransfusion}
              yesLabel={m.common.yes}
              noLabel={m.common.no}
            />
          </Section>

          <Section sectionKey="chemicalExposure" title={m.label.chemicalExposure}>
            <YesNoRadios
              register={register}
              name="chemicalExposure"
              legend=""
              groupLabel={m.label.chemicalExposure}
              yesLabel={m.common.yes}
              noLabel={m.common.no}
            />
          </Section>

          <Section sectionKey="hospitalization" title={m.label.hospitalization}>
            <YesNoRadios
              register={register}
              name="hospitalNonSurgery.had"
              legend=""
              groupLabel={m.label.hospitalization}
              yesLabel={m.common.yes}
              noLabel={m.common.no}
            />
            <div className="border-t border-violet-100 pt-4">
              <Label htmlFor="hospitalNonSurgeryDetail">
                {m.common.detailIfAny}
              </Label>
              <TextArea
                id="hospitalNonSurgeryDetail"
                rows={3}
                {...register("hospitalNonSurgery.detail")}
              />
            </div>
          </Section>

          <Section sectionKey="medications" title={m.section.medications}>
            <p className="text-sm text-zinc-600">{m.label.medIntro}</p>
            <TextArea rows={2} {...register("medications.note")} />
            <div className="space-y-4">
              {medicationRows.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-3 rounded-xl border border-violet-100 bg-violet-50/40 p-4"
                >
                  <div>
                    <Label>{m.label.medName}</Label>
                    <TextInput
                      {...register(`medications.rows.${index}.name` as const)}
                    />
                  </div>
                  <div>
                    <Label>{m.label.dose}</Label>
                    <TextInput
                      {...register(`medications.rows.${index}.dose` as const)}
                    />
                  </div>
                  <div>
                    <Label>{m.label.frequency}</Label>
                    <TextInput
                      {...register(`medications.rows.${index}.frequency` as const)}
                    />
                  </div>
                  <div className="flex justify-end pt-1">
                    <RowRemoveButton
                      label={m.common.removeRow}
                      disabled={medicationRows.fields.length <= 1}
                      onRemove={() => medicationRows.remove(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => medicationRows.append(emptyMedicationRow())}
              className="mt-3 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-lg font-semibold leading-none text-white shadow-md shadow-violet-300/50 transition hover:bg-violet-700"
              aria-label={m.common.addRow}
              title={m.common.addRow}
            >
              +
            </button>
          </Section>

          <Section sectionKey="allergies" title={m.section.allergies}>
            <div className="space-y-4">
              {allergyRows.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-3 rounded-xl border border-violet-100 bg-violet-50/40 p-4"
                >
                  <div>
                    <Label>{m.label.substance}</Label>
                    <TextInput
                      {...register(`allergies.rows.${index}.substance` as const)}
                    />
                  </div>
                  <div>
                    <Label>{m.label.reaction}</Label>
                    <TextInput
                      {...register(`allergies.rows.${index}.reaction` as const)}
                    />
                  </div>
                  <div className="flex justify-end pt-1">
                    <RowRemoveButton
                      label={m.common.removeRow}
                      disabled={allergyRows.fields.length <= 1}
                      onRemove={() => allergyRows.remove(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => allergyRows.append(emptyAllergyRow())}
              className="mt-3 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-lg font-semibold leading-none text-white shadow-md shadow-violet-300/50 transition hover:bg-violet-700"
              aria-label={m.common.addRow}
              title={m.common.addRow}
            >
              +
            </button>
          </Section>

          <Section sectionKey="diseases" title={m.section.diseases}>
            <p className="text-sm text-zinc-600">{m.label.diseasesIntro}</p>
            <div className="space-y-3">
              {DISEASES.map((d) => (
                <div
                  key={d.id}
                  className="rounded-xl border border-violet-100 bg-white px-3 py-3"
                >
                  <p className="text-sm font-medium text-zinc-800">
                    {m.diseases[d.id] ?? d.label}
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
                      <input
                        type="radio"
                        value="evet"
                        className="h-4 w-4 shrink-0 accent-violet-600"
                        {...register(`diseases.${d.id}` as const)}
                      />
                      {m.common.yes}
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
                      <input
                        type="radio"
                        value="hayir"
                        className="h-4 w-4 shrink-0 accent-violet-600"
                        {...register(`diseases.${d.id}` as const)}
                      />
                      {m.common.no}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section sectionKey="smoking" title={m.label.smoking}>
            <YesNoRadios
              register={register}
              name="smoking"
              legend=""
              groupLabel={m.label.smoking}
              yesLabel={m.common.yes}
              noLabel={m.common.no}
            />
            <div className="border-t border-violet-100 pt-4">
              <Label htmlFor="smokingDetail">{m.label.alcoholAmount}</Label>
              <TextArea
                id="smokingDetail"
                rows={2}
                {...register("smokingDetail")}
              />
            </div>
          </Section>

          <Section sectionKey="alcohol" title={m.section.alcohol}>
            <p className="text-sm font-medium text-zinc-900">
              {m.label.alcoholQuestion}
            </p>
            <div className="mt-4 space-y-4">
              <YesNoRadios
                register={register}
                name="alcohol.current"
                legend={m.label.alcoholNow}
                groupLabel={`${m.label.alcoholQuestion} — ${m.label.alcoholNow}`}
                yesLabel={m.common.yes}
                noLabel={m.common.no}
              />
              <YesNoRadios
                register={register}
                name="alcohol.past"
                legend={m.label.alcoholPast}
                groupLabel={`${m.label.alcoholQuestion} — ${m.label.alcoholPast}`}
                yesLabel={m.common.yes}
                noLabel={m.common.no}
              />
            </div>
            <div className="border-t border-violet-100 pt-4">
              <Label htmlFor="alcoholFreq">{m.label.alcoholAmount}</Label>
              <TextArea
                id="alcoholFreq"
                rows={3}
                {...register("alcohol.frequency")}
              />
            </div>
          </Section>

          <Section sectionKey="drugs" title={m.section.drugs}>
            <p className="text-sm text-zinc-600">{m.label.drugsQuestion}</p>
            <YesNoRadios
              register={register}
              name="drugs.used"
              legend=""
              groupLabel={m.section.drugs}
              yesLabel={m.common.yes}
              noLabel={m.common.no}
            />
            <div>
              <Label>{m.label.drugsDetail}</Label>
              <TextArea rows={3} {...register("drugs.detail")} />
            </div>
            <YesNoRadios
              register={register}
              name="drugs.injected"
              legend={m.label.drugsInjected}
              yesLabel={m.common.yes}
              noLabel={m.common.no}
            />
          </Section>

          <Section sectionKey="infectionRisk" title={m.label.infectionRisk}>
            <YesNoRadios
              register={register}
              name="infectionRisk"
              legend=""
              groupLabel={m.label.infectionRisk}
              yesLabel={m.common.yes}
              noLabel={m.common.no}
            />
          </Section>

          <Section sectionKey="dvt" title={m.label.dvt}>
            <YesNoRadios
              register={register}
              name="dvt"
              legend=""
              groupLabel={m.label.dvt}
              yesLabel={m.common.yes}
              noLabel={m.common.no}
            />
          </Section>

          <Section sectionKey="psychiatric" title={m.label.psychiatric}>
            <YesNoRadios
              register={register}
              name="psychiatric"
              legend=""
              groupLabel={m.label.psychiatric}
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
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-violet-100 bg-violet-50/40 px-3 py-2 text-sm"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-violet-300 accent-violet-600"
                    {...register(`family.items.${f.id}` as const)}
                  />
                  {m.family[f.id] ?? f.label}
                </label>
              ))}
            </div>
            <div>
              <Label>{m.label.other}</Label>
              <TextArea rows={2} {...register("family.other")} />
            </div>
          </Section>

          <Section sectionKey="currentProblems" title={m.section.currentProblems}>
            <p className="text-sm text-zinc-600">{m.label.currentIntro}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {CURRENT_PROBLEMS.map((p) => (
                <label
                  key={p.id}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-violet-300 accent-violet-600"
                    {...register(`currentProblems.${p.id}` as const)}
                  />
                  {m.problems[p.id] ?? p.label}
                </label>
              ))}
            </div>
          </Section>

          <Section sectionKey="notes" title={m.section.notes}>
            <div>
              <Label>{m.label.extraNotes}</Label>
              <TextArea rows={4} {...register("extraNotes")} />
            </div>
          </Section>

          <Section sectionKey="file" title={m.section.file}>
            <Label htmlFor="fileup">{m.label.fileUpload}</Label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
              <input
                id="fileup"
                type="file"
                multiple
                className="sr-only"
                onChange={(e) => {
                  const picked = Array.from(e.target.files ?? []);
                  e.target.value = "";
                  if (picked.length === 0) return;
                  setFiles((prev) => {
                    const next = [...prev];
                    for (const f of picked) {
                      if (next.some((x) => sameFile(x, f))) continue;
                      next.push(f);
                      if (next.length >= MAX_FORM_FILES) break;
                    }
                    return next;
                  });
                }}
              />
              <label
                htmlFor="fileup"
                className="inline-flex w-fit cursor-pointer shrink-0 items-center justify-center rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
              >
                {m.label.pickFiles}
              </label>
              {files.length > 0 ? (
                <ul className="min-w-0 flex-1 space-y-2 text-sm text-zinc-700">
                  {files.map((f, i) => (
                    <li
                      key={`${f.name}-${f.size}-${f.lastModified}-${i}`}
                      className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50/50 px-3 py-2"
                    >
                      <span className="min-w-0 flex-1 truncate" title={f.name}>
                        {f.name}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFiles((prev) => prev.filter((_, j) => j !== i))
                        }
                        className="shrink-0 rounded-lg border border-violet-200 bg-white px-2.5 py-1 text-xs font-semibold text-violet-800 transition hover:border-red-200 hover:bg-red-50 hover:text-red-800"
                        aria-label={`${m.common.removeFile}: ${f.name}`}
                      >
                        {m.common.removeFile}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Section>

          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-300/60 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? m.common.submitting : m.common.submit}
              </button>
            </div>
            {status === "done" ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-center text-emerald-900 sm:text-left">
                <p className="font-medium">{m.status.thanksTitle}</p>
                <p className="mt-1 text-sm">{m.status.thanksBody}</p>
              </div>
            ) : null}
          </div>
        </form>
      </main>
    </div>
  );
}
