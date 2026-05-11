import path from "path";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
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

Font.register({
  family: "NotoSans",
  src: path.join(process.cwd(), "public/fonts/NotoSans-Regular.ttf"),
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 48,
    paddingHorizontal: 40,
    fontFamily: "NotoSans",
    fontSize: 9,
    color: "#18181b",
    lineHeight: 1.35,
  },
  title: { fontSize: 16, color: "#5b21b6", marginBottom: 10 },
  metaBox: {
    backgroundColor: "#faf5ff",
    borderWidth: 1,
    borderColor: "#ede9fe",
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
  },
  metaRow: { flexDirection: "row", marginBottom: 4 },
  metaLabel: { width: 72, fontSize: 8, color: "#71717a" },
  metaValue: { flex: 1, fontSize: 9 },
  sectionTitle: {
    fontSize: 11,
    color: "#5b21b6",
    marginTop: 10,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ede9fe",
    paddingBottom: 3,
  },
  label: {
    fontSize: 7,
    color: "#71717a",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  valueBox: {
    borderWidth: 1,
    borderColor: "#f4f4f5",
    backgroundColor: "#fafafa",
    padding: 6,
    marginBottom: 6,
    fontSize: 9,
  },
  row2: { flexDirection: "row", marginBottom: 0 },
  col: { flex: 1, paddingRight: 8 },
  hint: { fontSize: 8, color: "#52525b", marginBottom: 6 },
  tableHead: {
    flexDirection: "row",
    backgroundColor: "#f4f4f5",
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f5",
  },
  th: { fontSize: 8, color: "#3f3f46", flex: 1 },
  td: { fontSize: 8, flex: 1, color: "#18181b" },
  listItem: { fontSize: 8, marginBottom: 3, paddingLeft: 8 },
});

function yn(v: YesNo, yes: string, no: string): string {
  if (v === "evet") return yes;
  if (v === "hayir") return no;
  return "—";
}

function PdfField({ label, value }: { label: string; value: string }) {
  const t = value.trim() ? value : "—";
  return (
    <View wrap={false}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.valueBox}>{t}</Text>
    </View>
  );
}

export function PatientFormPdfDocument({
  data,
  meta,
}: {
  data: PatientFormData;
  meta: {
    id: string;
    createdAt: string;
    fullName: string | null;
    language: string | null;
  };
}) {
  const m = getPatientFormMessages(data.language);
  const langLabel = languageLabel((meta.language as LanguageCode) || "tr");
  const created = new Date(meta.createdAt).toLocaleString(
    data.language === "tr" ? "tr-TR" : undefined,
  );

  const ftIn =
    data.bmi.heightFt || data.bmi.heightIn
      ? `${data.bmi.heightFt || "—"} ft / ${data.bmi.heightIn || "—"} in`
      : "—";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{m.meta.title}</Text>

        <View style={styles.metaBox}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Kayıt no</Text>
            <Text style={styles.metaValue}>{meta.id}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Tarih</Text>
            <Text style={styles.metaValue}>{created}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Dil</Text>
            <Text style={styles.metaValue}>{langLabel}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Ad soyad</Text>
            <Text style={styles.metaValue}>
              {meta.fullName?.trim() || "—"}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{m.section.patient}</Text>
        <View style={styles.row2}>
          <View style={styles.col}>
            <PdfField label={m.label.fullName} value={data.patient.fullName} />
          </View>
          <View style={styles.col}>
            <PdfField label={m.label.age} value={data.patient.age} />
          </View>
        </View>
        <PdfField
          label={m.label.surgeryInterest}
          value={data.patient.surgeryInterest}
        />
        <PdfField label={m.label.operation} value={data.patient.operation} />

        <Text style={styles.sectionTitle}>{m.section.emergency}</Text>
        <View style={styles.row2}>
          <View style={styles.col}>
            <PdfField label={m.label.emFullName} value={data.emergency.fullName} />
          </View>
          <View style={styles.col}>
            <PdfField label={m.label.relation} value={data.emergency.relation} />
          </View>
        </View>
        <PdfField label={m.label.mobile} value={data.emergency.phone} />
        <PdfField label={m.label.address} value={data.emergency.address} />

        <Text style={styles.sectionTitle}>{m.section.bmi}</Text>
        <View style={styles.row2}>
          <View style={styles.col}>
            <PdfField label={m.label.heightCm} value={data.bmi.heightCm} />
          </View>
          <View style={styles.col}>
            <PdfField label={m.label.feetInch} value={ftIn} />
          </View>
        </View>
        <View style={styles.row2}>
          <View style={styles.col}>
            <PdfField label={m.label.weightKg} value={data.bmi.weightKg} />
          </View>
          <View style={styles.col}>
            <PdfField label={m.label.pound} value={data.bmi.weightLb} />
          </View>
        </View>
        <PdfField label={m.label.bmi} value={data.bmi.bmi} />

        <Text style={styles.sectionTitle}>{m.section.priorSurgery}</Text>
        <Text style={{ marginBottom: 4 }}>
          {yn(data.priorSurgery.had, m.common.yes, m.common.no)}
        </Text>
        <PdfField label={m.common.detailIfAny} value={data.priorSurgery.detail} />
        <View style={styles.tableHead}>
          <Text style={[styles.th, { flex: 1.2 }]}>{m.label.type}</Text>
          <Text style={[styles.th, { flex: 1.2 }]}>{m.label.reason}</Text>
          <Text style={[styles.th, { flex: 0.8 }]}>{m.label.date}</Text>
        </View>
        {data.priorSurgery.rows.map((row, i) => (
          <View key={`ps-${i}`} style={styles.tableRow}>
            <Text style={[styles.td, { flex: 1.2 }]}>{row.type || "—"}</Text>
            <Text style={[styles.td, { flex: 1.2 }]}>{row.reason || "—"}</Text>
            <Text style={[styles.td, { flex: 0.8 }]}>{row.date || "—"}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>{m.section.seriousInjury}</Text>
        <Text style={{ marginBottom: 4 }}>
          {yn(data.seriousInjury.had, m.common.yes, m.common.no)}
        </Text>
        <PdfField label={m.common.detailIfAny} value={data.seriousInjury.detail} />

        <Text style={styles.sectionTitle}>{m.label.bloodTransfusion}</Text>
        <Text>{yn(data.bloodTransfusion, m.common.yes, m.common.no)}</Text>

        <Text style={styles.sectionTitle}>{m.label.chemicalExposure}</Text>
        <Text>{yn(data.chemicalExposure, m.common.yes, m.common.no)}</Text>

        <Text style={styles.sectionTitle}>{m.label.hospitalization}</Text>
        <Text style={{ marginBottom: 4 }}>
          {yn(data.hospitalNonSurgery.had, m.common.yes, m.common.no)}
        </Text>
        <PdfField
          label={m.common.detailIfAny}
          value={data.hospitalNonSurgery.detail}
        />

        <Text style={styles.sectionTitle}>{m.section.medications}</Text>
        <Text style={styles.hint}>{m.label.medIntro}</Text>
        <Text style={styles.valueBox}>
          {data.medications.note.trim() || "—"}
        </Text>
        <View style={styles.tableHead}>
          <Text style={styles.th}>{m.label.medName}</Text>
          <Text style={styles.th}>{m.label.dose}</Text>
          <Text style={styles.th}>{m.label.frequency}</Text>
        </View>
        {data.medications.rows.map((row, i) => (
          <View key={`med-${i}`} style={styles.tableRow}>
            <Text style={styles.td}>{row.name || "—"}</Text>
            <Text style={styles.td}>{row.dose || "—"}</Text>
            <Text style={styles.td}>{row.frequency || "—"}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>{m.section.allergies}</Text>
        <View style={styles.tableHead}>
          <Text style={styles.th}>{m.label.substance}</Text>
          <Text style={styles.th}>{m.label.reaction}</Text>
        </View>
        {data.allergies.rows.map((row, i) => (
          <View key={`al-${i}`} style={styles.tableRow}>
            <Text style={styles.td}>{row.substance || "—"}</Text>
            <Text style={styles.td}>{row.reaction || "—"}</Text>
          </View>
        ))}
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>{m.section.diseases}</Text>
        <Text style={styles.hint}>{m.label.diseasesIntro}</Text>
        <View style={styles.tableHead}>
          <Text style={[styles.th, { flex: 2 }]}>{m.label.disease}</Text>
          <Text style={[styles.th, { width: 44 }]}>{m.common.yes}</Text>
          <Text style={[styles.th, { width: 44 }]}>{m.common.no}</Text>
        </View>
        {DISEASES.map((d) => {
          const v = data.diseases[d.id] ?? "";
          return (
            <View key={d.id} style={styles.tableRow}>
              <Text style={[styles.td, { flex: 2 }]}>
                {m.diseases[d.id] ?? d.label}
              </Text>
              <Text style={[styles.td, { width: 44 }]}>
                {v === "evet" ? "✓" : ""}
              </Text>
              <Text style={[styles.td, { width: 44 }]}>
                {v === "hayir" ? "✓" : ""}
              </Text>
            </View>
          );
        })}

        <Text style={styles.sectionTitle}>{m.label.smoking}</Text>
        <Text style={{ marginBottom: 4 }}>
          {yn(data.smoking, m.common.yes, m.common.no)}
        </Text>
        <PdfField label={m.label.alcoholAmount} value={data.smokingDetail} />

        <Text style={styles.sectionTitle}>{m.section.alcohol}</Text>
        <Text style={{ marginBottom: 4 }}>{m.label.alcoholQuestion}</Text>
        <Text style={{ fontSize: 8, marginBottom: 2 }}>
          {m.label.alcoholNow}:{" "}
          {yn(data.alcohol.current, m.common.yes, m.common.no)}
        </Text>
        <Text style={{ fontSize: 8, marginBottom: 6 }}>
          {m.label.alcoholPast}:{" "}
          {yn(data.alcohol.past, m.common.yes, m.common.no)}
        </Text>
        <PdfField label={m.label.alcoholAmount} value={data.alcohol.frequency} />

        <Text style={styles.sectionTitle}>{m.section.drugs}</Text>
        <Text style={styles.hint}>{m.label.drugsQuestion}</Text>
        <Text style={{ marginBottom: 4 }}>
          {yn(data.drugs.used, m.common.yes, m.common.no)}
        </Text>
        <PdfField label={m.label.drugsDetail} value={data.drugs.detail} />
        <Text style={{ marginTop: 4 }}>
          {m.label.drugsInjected}:{" "}
          {yn(data.drugs.injected, m.common.yes, m.common.no)}
        </Text>

        <Text style={styles.sectionTitle}>{m.label.infectionRisk}</Text>
        <Text>{yn(data.infectionRisk, m.common.yes, m.common.no)}</Text>

        <Text style={styles.sectionTitle}>{m.label.dvt}</Text>
        <Text>{yn(data.dvt, m.common.yes, m.common.no)}</Text>

        <Text style={styles.sectionTitle}>{m.label.psychiatric}</Text>
        <Text>{yn(data.psychiatric, m.common.yes, m.common.no)}</Text>

        <Text style={styles.sectionTitle}>{m.section.family}</Text>
        <Text style={styles.hint}>{m.label.familyIntro}</Text>
        {FAMILY_ITEMS.map((f) => (
          <Text key={f.id} style={styles.listItem}>
            {data.family.items[f.id] ? "☑ " : "☐ "}
            {m.family[f.id] ?? f.label}
          </Text>
        ))}
        <PdfField label={m.label.other} value={data.family.other} />

        <Text style={styles.sectionTitle}>{m.section.currentProblems}</Text>
        <Text style={styles.hint}>{m.label.currentIntro}</Text>
        {CURRENT_PROBLEMS.map((p) => (
          <Text key={p.id} style={styles.listItem}>
            {data.currentProblems[p.id] ? "☑ " : "☐ "}
            {m.problems[p.id] ?? p.label}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>{m.section.notes}</Text>
        <PdfField label={m.label.extraNotes} value={data.extraNotes} />
      </Page>
    </Document>
  );
}
