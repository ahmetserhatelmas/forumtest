import type { LanguageCode } from "@/constants/languages";
import {
  checklistBg,
  checklistDe,
  checklistEs,
  checklistFr,
  checklistIt,
  checklistPt,
  checklistRo,
} from "@/i18n/checklist-locales";

export type PatientFormMessages = {
  dir: "ltr" | "rtl";
  meta: {
    title: string;
    subtitle: string;
    selectLang: string;
  };
  common: {
    yes: string;
    no: string;
    required: string;
    detailIfAny: string;
    adminLogin: string;
    submit: string;
    submitting: string;
    addRow: string;
    removeRow: string;
  };
  status: {
    thanksTitle: string;
    thanksBody: string;
    failTitle: string;
  };
  errors: {
    invalid: string;
    incomplete: string;
    insertFailed: string;
    uploadFailed: string;
    unknown: string;
  };
  section: {
    patient: string;
    emergency: string;
    bmi: string;
    priorSurgery: string;
    seriousInjury: string;
    medicalHistory: string;
    medications: string;
    allergies: string;
    diseases: string;
    lifestyle: string;
    alcohol: string;
    drugs: string;
    risk: string;
    family: string;
    currentProblems: string;
    notes: string;
    file: string;
  };
  label: {
    fullName: string;
    age: string;
    surgeryInterest: string;
    operation: string;
    emFullName: string;
    relation: string;
    mobile: string;
    address: string;
    heightCm: string;
    feetInch: string;
    ft: string;
    inch: string;
    weightKg: string;
    pound: string;
    bmi: string;
    type: string;
    reason: string;
    date: string;
    medIntro: string;
    medName: string;
    dose: string;
    frequency: string;
    substance: string;
    reaction: string;
    diseasesIntro: string;
    disease: string;
    smoking: string;
    alcoholQuestion: string;
    alcoholNow: string;
    alcoholPast: string;
    alcoholAmount: string;
    drugsQuestion: string;
    drugsDetail: string;
    drugsInjected: string;
    bloodTransfusion: string;
    chemicalExposure: string;
    hospitalization: string;
    infectionRisk: string;
    dvt: string;
    psychiatric: string;
    familyIntro: string;
    other: string;
    currentIntro: string;
    extraNotes: string;
    fileUpload: string;
  };
  diseases: Record<string, string>;
  family: Record<string, string>;
  problems: Record<string, string>;
};

function diseases(m: Record<string, string>): Record<string, string> {
  return m;
}

function family(m: Record<string, string>): Record<string, string> {
  return m;
}

function problems(m: Record<string, string>): Record<string, string> {
  return m;
}

/* ——— Turkish (source) ——— */
const tr: PatientFormMessages = {
  dir: "ltr",
  meta: {
    title: "Hasta Bilgileri",
    subtitle:
      "Lütfen formu eksiksiz doldurunuz. BMI alanı boy ve kilo girdikçe otomatik hesaplanır.",
    selectLang: "Dil seçiniz",
  },
  common: {
    yes: "Evet",
    no: "Hayır",
    required: "Zorunlu alan",
    detailIfAny: "Varsa lütfen detay ekleyiniz",
    adminLogin: "Yönetici girişi",
    submit: "Formu gönder",
    submitting: "Gönderiliyor…",
    addRow: "Satır ekle",
    removeRow: "Satırı sil",
  },
  status: {
    thanksTitle: "Teşekkürler.",
    thanksBody:
      "Bilgileriniz güvenle kaydedildi. Kliniğimiz en kısa sürede sizinle iletişime geçecektir.",
    failTitle: "Gönderim başarısız",
  },
  errors: {
    invalid: "Geçersiz istek.",
    incomplete: "Eksik bilgi.",
    insertFailed: "Kayıt oluşturulamadı. Yapılandırmayı kontrol edin.",
    uploadFailed: "Dosya yüklenemedi.",
    unknown: "Beklenmeyen hata.",
  },
  section: {
    patient: "Hasta Bilgileri",
    emergency: "Acil Durumda Aranacak Kişi",
    bmi: "Vücut Kitle İndeksi Bilgileri",
    priorSurgery: "Herhangi Bir Operasyon Geçirdiniz mi?",
    seriousInjury:
      "Ciddi Yaralanmalar, Araba Kazaları veya Kırık Kemikleriniz Oldu mu?",
    medicalHistory: "Tıbbi Öykü",
    medications: "Kullandığınız İlaçlar ve Dozları",
    allergies: "İlaçlara Karşı Alerji veya Reaksiyonlar",
    diseases: "Geçmiş veya Mevcut Hastalıklar",
    lifestyle: "Yaşam Tarzı",
    alcohol: "Alkol kullanımı",
    drugs: "Uyuşturucu veya Benzeri İlaç Kullanımı",
    risk: "Risk Öyküsü",
    family: "Aile Hastalık Geçmişi",
    currentProblems: "Şu Anda Yaşadığınız Sorunlar",
    notes: "Ek Notlar",
    file: "Dosya",
  },
  label: {
    fullName: "Ad Soyad",
    age: "Yaş",
    surgeryInterest: "Hangi ameliyatla ilgileniyorsunuz?",
    operation: "Operasyon",
    emFullName: "Ad Soyad",
    relation: "İlişkiniz",
    mobile: "Cep Telefonu",
    address: "Adres",
    heightCm: "Boy (Santimetre)",
    feetInch: "Feet / İnç",
    ft: "ft",
    inch: "in",
    weightKg: "Ağırlık (Kilogram)",
    pound: "Pound",
    bmi: "Sonuç / BMI",
    type: "Tip",
    reason: "Nedeni",
    date: "Tarih",
    medIntro:
      "Lütfen kullandığınız ilaçları ve dozlarını ekleyiniz. Reçetesiz ilaçlar ve takviyeler dahil edilmelidir.",
    medName: "İlaç / Takviye",
    dose: "Doz",
    frequency: "Kullanım Sıklığı",
    substance: "İlaç / Madde",
    reaction: "Reaksiyon",
    diseasesIntro:
      "Aşağıdaki hastalıklardan herhangi biri sizde mevcutsa veya geçmişte olduysa lütfen belirtiniz.",
    disease: "Hastalık",
    smoking: "Sigara İçiyor musunuz?",
    alcoholQuestion: "Alkol Kullanıyor musunuz?",
    alcoholNow: "Şu anda:",
    alcoholPast: "Geçmişte:",
    alcoholAmount: "Sıklığı ve miktarı",
    drugsQuestion:
      "Hiç esrar, kokain, uyarıcı, yatıştırıcı, narkotik, diyet hapı gibi ilaçlar kullandınız mı?",
    drugsDetail:
      "Varsa lütfen kullanım türünü, miktarını ve süresini belirtiniz",
    drugsInjected: "Hiç bu tür ilaçları enjekte ettiniz mi?",
    bloodTransfusion: "Kan Nakli Oldunuz mu?",
    chemicalExposure: "Tehlikeli Kimyasallara Maruz Kaldınız mı?",
    hospitalization: "Ameliyat Dışı Nedenlerle Hastaneye Yattınız mı?",
    infectionRisk:
      "HIV, AIDS virüsü, Hepatit veya diğer bulaşıcı virüsler ya da bakteriler ile enfeksiyon açısından risk faktörünüz var mı?",
    dvt: "Derin Ven Trombozu Geçirdiniz mi?",
    psychiatric: "Psikiyatrik Tedavi Gördünüz mü?",
    familyIntro:
      "Ailenizin herhangi bir üyesinde aşağıdaki durumlardan biri var mı?",
    other: "Diğer",
    currentIntro:
      "Lütfen şu anda aşağıdaki sorunlardan herhangi birine sahipseniz belirtiniz.",
    extraNotes:
      "Varsa bizimle paylaşmak istediğiniz ek notlarınızı yazınız",
    fileUpload: "Varsa dosya yükleyiniz",
  },
  diseases: diseases({
    anemi: "Anemi",
    astim: "Astım / Amfizem",
    kan_pıhtılasma: "Kan pıhtılaşması / Kanama bozuklukları",
    divertikulit: "Divertikülit",
    epilepsi: "Epilepsi veya nöbetler",
    gut: "Gut",
    kolesterol: "Yüksek kolesterol",
    karaciger: "Karaciğer hastalığı / Hepatit",
    pankreatit: "Pankreatit",
    romatizmal_ates: "Romatizmal ateş",
    uyku_apnesi: "Uyku apnesi",
    bel_soguklugu: "Bel soğukluğu / Klamidya",
    tuberkuloz: "Tüberküloz",
    ulser: "Ülserler, mide veya bağırsak",
    artrit: "Artrit",
    mesane: "Mesane veya böbrek enfeksiyonları",
    kronik_ishal: "Kronik ishal",
    seker: "Şeker hastalığı",
    safra: "Safra taşları / Safra kesesi hastalığı",
    kalp: "Kalp hastalığı / Anjina",
    tansiyon: "Yüksek tansiyon",
    akciger: "Akciğer hastalığı / Pnömoni",
    polip: "Polipler",
    cilt: "Cilt hastalığı",
    inme: "İnme",
    tiroid: "Tiroid hastalığı / Guatr",
    tumor: "Tümörler / Kanser",
    reflu: "Asit reflü / Mide yanması",
  }),
  family: family({
    alkolizm: "Alkolizm",
    anemi: "Anemi",
    kolon_kanseri: "Bağırsak / Kolon Kanseri",
    seker: "Şeker hastalığı",
    kalp: "Kalp hastalığı / Anjina",
    hepatit: "Hepatit",
    tansiyon: "Yüksek tansiyon",
    kolesterol: "Yüksek kolesterol",
    bobrek: "Böbrek hastalığı",
    inme: "İnme",
  }),
  problems: problems({
    bas_agrisi: "Şiddetli veya olağandışı baş ağrısı",
    isitme: "İşitme sorunları",
    gorme: "Görme ile ilgili sorunlar",
    sinus: "Sinüs sorunları veya saman nezlesi",
    ses: "Ses kısıklığı",
    dis: "Dişler veya diş etleri ile ilgili sorunlar",
    cilt: "Şiddetli cilt problemleri",
    kilo: "Kilo kaybı veya kazancı",
    gogus: "Göğüs ağrıları veya rahatsızlık",
    nefes: "Nefes darlığı",
    oksuruk: "Öksürük veya balgam",
    mide: "Mide sorunları, ağrı veya bulantı",
    ishal: "İshal veya kabızlık",
    kan_bagirsak: "Bağırsak hareketlerinde kan",
    idrar: "İdrar yaparken zorluk veya ağrı",
    eklem: "Eklem ağrıları",
  }),
};

/* English */
const en: PatientFormMessages = {
  dir: "ltr",
  meta: {
    title: "Patient Information",
    subtitle:
      "Please complete all fields. BMI is calculated automatically from height and weight.",
    selectLang: "Select language",
  },
  common: {
    yes: "Yes",
    no: "No",
    required: "Required field",
    detailIfAny: "If yes, please provide details",
    adminLogin: "Admin login",
    submit: "Submit form",
    submitting: "Sending…",
    addRow: "Add row",
    removeRow: "Remove row",
  },
  status: {
    thanksTitle: "Thank you.",
    thanksBody:
      "Your information has been saved securely. Our clinic will contact you shortly.",
    failTitle: "Submission failed",
  },
  errors: {
    invalid: "Invalid request.",
    incomplete: "Missing information.",
    insertFailed: "Could not save the record. Check configuration.",
    uploadFailed: "File upload failed.",
    unknown: "Unexpected error.",
  },
  section: {
    patient: "Patient Information",
    emergency: "Emergency Contact",
    bmi: "Body Mass Index (BMI)",
    priorSurgery: "Have you had any surgery?",
    seriousInjury:
      "Serious injuries, car accidents, or broken bones?",
    medicalHistory: "Medical history",
    medications: "Medications and doses",
    allergies: "Drug allergies or reactions",
    diseases: "Past or current conditions",
    lifestyle: "Lifestyle",
    alcohol: "Alcohol use",
    drugs: "Recreational or similar drug use",
    risk: "Risk history",
    family: "Family medical history",
    currentProblems: "Current symptoms",
    notes: "Additional notes",
    file: "File",
  },
  label: {
    fullName: "Full name",
    age: "Age",
    surgeryInterest: "Which procedure are you interested in?",
    operation: "Operation / procedure",
    emFullName: "Full name",
    relation: "Relationship",
    mobile: "Mobile phone",
    address: "Address",
    heightCm: "Height (cm)",
    feetInch: "Feet / inches",
    ft: "ft",
    inch: "in",
    weightKg: "Weight (kg)",
    pound: "Pounds",
    bmi: "Result / BMI",
    type: "Type",
    reason: "Reason",
    date: "Date",
    medIntro:
      "List all medications and doses, including OTC drugs and supplements.",
    medName: "Medication / supplement",
    dose: "Dose",
    frequency: "Frequency",
    substance: "Drug / substance",
    reaction: "Reaction",
    diseasesIntro:
      "Please indicate if you currently have or have ever had any of the following.",
    disease: "Condition",
    smoking: "Do you smoke?",
    alcoholQuestion: "Do you drink alcohol?",
    alcoholNow: "Currently",
    alcoholPast: "In the past",
    alcoholAmount: "Frequency and amount",
    drugsQuestion:
      "Have you ever used marijuana, cocaine, stimulants, sedatives, narcotics, diet pills, or similar drugs?",
    drugsDetail: "If yes, describe type, amount, and duration",
    drugsInjected: "Have you ever injected such substances?",
    bloodTransfusion: "Have you received a blood transfusion?",
    chemicalExposure: "Have you been exposed to hazardous chemicals?",
    hospitalization: "Have you been hospitalized for non-surgical reasons?",
    infectionRisk:
      "Do you have risk factors for HIV, hepatitis, or other infectious agents?",
    dvt: "Have you had deep vein thrombosis (DVT)?",
    psychiatric: "Have you received psychiatric treatment?",
    familyIntro:
      "Has any family member had the following conditions?",
    other: "Other",
    currentIntro:
      "Please check any symptoms you currently experience.",
    extraNotes: "Any additional notes you would like to share",
    fileUpload: "Upload a file if needed",
  },
  diseases: diseases({
    anemi: "Anemia",
    astim: "Asthma / emphysema",
    kan_pıhtılasma: "Clotting / bleeding disorders",
    divertikulit: "Diverticulitis",
    epilepsi: "Epilepsy or seizures",
    gut: "Gout",
    kolesterol: "High cholesterol",
    karaciger: "Liver disease / hepatitis",
    pankreatit: "Pancreatitis",
    romatizmal_ates: "Rheumatic fever",
    uyku_apnesi: "Sleep apnea",
    bel_soguklugu: "STI (e.g. chlamydia) / genital infection history",
    tuberkuloz: "Tuberculosis",
    ulser: "Ulcers (stomach or intestine)",
    artrit: "Arthritis",
    mesane: "Bladder or kidney infections",
    kronik_ishal: "Chronic diarrhea",
    seker: "Diabetes",
    safra: "Gallstones / gallbladder disease",
    kalp: "Heart disease / angina",
    tansiyon: "High blood pressure",
    akciger: "Lung disease / pneumonia",
    polip: "Polyps",
    cilt: "Skin disease",
    inme: "Stroke",
    tiroid: "Thyroid disease / goiter",
    tumor: "Tumors / cancer",
    reflu: "Acid reflux / heartburn",
  }),
  family: family({
    alkolizm: "Alcoholism",
    anemi: "Anemia",
    kolon_kanseri: "Colon / bowel cancer",
    seker: "Diabetes",
    kalp: "Heart disease / angina",
    hepatit: "Hepatitis",
    tansiyon: "High blood pressure",
    kolesterol: "High cholesterol",
    bobrek: "Kidney disease",
    inme: "Stroke",
  }),
  problems: problems({
    bas_agrisi: "Severe or unusual headaches",
    isitme: "Hearing problems",
    gorme: "Vision problems",
    sinus: "Sinus issues or hay fever",
    ses: "Hoarseness",
    dis: "Teeth or gum problems",
    cilt: "Severe skin problems",
    kilo: "Unexplained weight loss or gain",
    gogus: "Chest pain or discomfort",
    nefes: "Shortness of breath",
    oksuruk: "Cough or phlegm",
    mide: "Stomach issues, pain, or nausea",
    ishal: "Diarrhea or constipation",
    kan_bagirsak: "Blood in stool",
    idrar: "Pain or difficulty urinating",
    eklem: "Joint pain",
  }),
};

function cloneFromEn(patch: {
  dir?: "ltr" | "rtl";
  meta?: Partial<PatientFormMessages["meta"]>;
  common?: Partial<PatientFormMessages["common"]>;
  status?: Partial<PatientFormMessages["status"]>;
  errors?: Partial<PatientFormMessages["errors"]>;
  section?: Partial<PatientFormMessages["section"]>;
  label?: Partial<PatientFormMessages["label"]>;
  diseases?: Partial<Record<string, string>>;
  family?: Partial<Record<string, string>>;
  problems?: Partial<Record<string, string>>;
}): PatientFormMessages {
  return {
    ...en,
    ...patch,
    meta: { ...en.meta, ...patch.meta },
    common: { ...en.common, ...patch.common },
    status: { ...en.status, ...patch.status },
    errors: { ...en.errors, ...patch.errors },
    section: { ...en.section, ...patch.section },
    label: { ...en.label, ...patch.label },
    diseases: { ...en.diseases, ...patch.diseases } as Record<string, string>,
    family: { ...en.family, ...patch.family } as Record<string, string>,
    problems: { ...en.problems, ...patch.problems } as Record<string, string>,
  };
}

/* Bulgarian */
const bg = cloneFromEn({
  meta: {
    title: "Информация за пациента",
    subtitle:
      "Моля, попълнете всички полета. ИТМ се изчислява автоматично от ръст и тегло.",
    selectLang: "Изберете език",
  },
  common: {
    yes: "Да",
    no: "Не",
    required: "Задължително поле",
    detailIfAny: "Ако да, добавете подробности",
    adminLogin: "Админ вход",
    submit: "Изпрати формуляра",
    submitting: "Изпращане…",
  },
  status: {
    thanksTitle: "Благодарим ви.",
    thanksBody:
      "Информацията ви е запазена сигурно. Клиниката ще се свърже с вас скоро.",
    failTitle: "Изпращането не бе успешно",
  },
  errors: {
    invalid: "Невалидна заявка.",
    incomplete: "Липсваща информация.",
    insertFailed: "Записът не можа да бъде създаден.",
    uploadFailed: "Качването на файл не бе успешно.",
    unknown: "Неочаквана грешка.",
  },
  section: {
    patient: "Данни за пациента",
    emergency: "Лице за спешен контакт",
    bmi: "Индекс на телесна маса (ИТМ)",
    priorSurgery: "Били ли сте оперирани?",
    seriousInjury: "Тежки травми, ПТП или счупени кости?",
    medicalHistory: "Медицинска анамнеза",
    medications: "Лекарства и дози",
    allergies: "Алергии или реакции към лекарства",
    diseases: "Минали или настоящи заболявания",
    lifestyle: "Начин на живот",
    drugs: "Употреба на наркотици или подобни вещества",
    risk: "Рискова анамнеза",
    family: "Семейна анамнеза",
    currentProblems: "Настоящи оплаквания",
    notes: "Допълнителни бележки",
    file: "Файл",
  },
  label: {
    fullName: "Име и фамилия",
    age: "Възраст",
    surgeryInterest: "Каква интервенция ви интересува?",
    operation: "Операция / процедура",
    emFullName: "Име и фамилия",
    relation: "Родство",
    mobile: "Мобилен телефон",
    address: "Адрес",
    heightCm: "Ръст (см)",
    feetInch: "Футове / инчове",
    weightKg: "Тегло (кг)",
    pound: "Фунтове",
    bmi: "Резултат / ИТМ",
    type: "Тип",
    reason: "Причина",
    date: "Дата",
    medIntro:
      "Посочете всички лекарства и дози, включително БезР и хранителни добавки.",
    medName: "Лекарство / добавка",
    dose: "Доза",
    frequency: "Честота",
    substance: "Вещество",
    reaction: "Реакция",
    diseasesIntro:
      "Посочете дали имате или сте имали някое от следните състояния.",
    disease: "Заболяване",
    smoking: "Пушите ли?",
    alcoholQuestion: "Консумирате ли алкохол?",
    alcoholNow: "В момента",
    alcoholPast: "В миналото",
    alcoholAmount: "Честота и количество",
    drugsQuestion:
      "Употребявали ли сте марихуана, кокаин, стимуланти, седативи, наркотици, хапчета за отслабване или подобни?",
    drugsDetail: "Ако да, опишете вид, количество и продължителност",
    drugsInjected: "Инжектирали ли сте такива вещества?",
    bloodTransfusion: "Правена ли ви е кръвопреливане?",
    chemicalExposure: "Излагани ли сте на опасни химикали?",
    hospitalization: "Хоспитализирани ли сте по нехирургични причини?",
    infectionRisk:
      "Имате ли рискови фактори за ХИВ, хепатит или други инфекции?",
    dvt: "Имали ли сте дълбока венозна тромбоза?",
    psychiatric: "Лекували ли сте се психиатрично?",
    familyIntro: "Член на семейството с някое от следните състояния?",
    other: "Друго",
    currentIntro: "Отбележете настоящите симптоми, ако имате.",
    extraNotes: "Допълнителни бележки",
    fileUpload: "Качете файл при необходимост",
  },
  diseases: diseases(checklistBg.diseases),
  family: family(checklistBg.family),
  problems: problems(checklistBg.problems),
});

/* Spanish */
const es = cloneFromEn({
  meta: {
    title: "Información del paciente",
    subtitle:
      "Complete todos los campos. El IMC se calcula automáticamente con talla y peso.",
    selectLang: "Seleccionar idioma",
  },
  common: {
    yes: "Sí",
    no: "No",
    required: "Campo obligatorio",
    detailIfAny: "Si corresponde, añada detalles",
    adminLogin: "Acceso admin",
    submit: "Enviar formulario",
    submitting: "Enviando…",
  },
  status: {
    thanksTitle: "Gracias.",
    thanksBody:
      "Su información se ha guardado de forma segura. La clínica se pondrá en contacto pronto.",
    failTitle: "No se pudo enviar",
  },
  errors: {
    invalid: "Solicitud no válida.",
    incomplete: "Falta información.",
    insertFailed: "No se pudo crear el registro.",
    uploadFailed: "Error al subir el archivo.",
    unknown: "Error inesperado.",
  },
  section: {
    patient: "Datos del paciente",
    emergency: "Contacto de emergencia",
    bmi: "Índice de masa corporal (IMC)",
    priorSurgery: "¿Se ha operado alguna vez?",
    seriousInjury: "¿Lesiones graves, accidentes o fracturas?",
    medicalHistory: "Antecedentes médicos",
    medications: "Medicación y dosis",
    allergies: "Alergias o reacciones a fármacos",
    diseases: "Enfermedades pasadas o actuales",
    lifestyle: "Estilo de vida",
    drugs: "Uso de drogas o sustancias similares",
    risk: "Antecedentes de riesgo",
    family: "Antecedentes familiares",
    currentProblems: "Síntomas actuales",
    notes: "Notas adicionales",
    file: "Archivo",
  },
  label: {
    fullName: "Nombre y apellidos",
    age: "Edad",
    surgeryInterest: "¿Qué intervención le interesa?",
    operation: "Cirugía / procedimiento",
    emFullName: "Nombre y apellidos",
    relation: "Parentesco",
    mobile: "Teléfono móvil",
    address: "Dirección",
    heightCm: "Talla (cm)",
    feetInch: "Pies / pulgadas",
    weightKg: "Peso (kg)",
    pound: "Libras",
    bmi: "Resultado / IMC",
    type: "Tipo",
    reason: "Motivo",
    date: "Fecha",
    medIntro:
      "Indique todos los medicamentos y dosis, incluidos OTC y suplementos.",
    medName: "Medicamento / suplemento",
    dose: "Dosis",
    frequency: "Frecuencia",
    substance: "Sustancia",
    reaction: "Reacción",
    diseasesIntro:
      "Indique si padece o ha padecido alguna de las siguientes condiciones.",
    disease: "Condición",
    smoking: "¿Fuma?",
    alcoholQuestion: "¿Consume alcohol?",
    alcoholNow: "Actualmente",
    alcoholPast: "En el pasado",
    alcoholAmount: "Frecuencia y cantidad",
    drugsQuestion:
      "¿Ha usado marihuana, cocaína, estimulantes, sedantes, narcóticos, pastillas dietéticas o similares?",
    drugsDetail: "Si sí, describa tipo, cantidad y duración",
    drugsInjected: "¿Se ha inyectado alguna de estas sustancias?",
    bloodTransfusion: "¿Le han transfundido sangre?",
    chemicalExposure: "¿Ha estado expuesto a químicos peligrosos?",
    hospitalization: "¿Ha sido hospitalizado por motivos no quirúrgicos?",
    infectionRisk:
      "¿Tiene factores de riesgo para VIH, hepatitis u otras infecciones?",
    dvt: "¿Ha tenido trombosis venosa profunda?",
    psychiatric: "¿Ha recibido tratamiento psiquiátrico?",
    familyIntro: "¿Algún familiar ha tenido estas condiciones?",
    other: "Otro",
    currentIntro: "Marque los síntomas que tenga actualmente.",
    extraNotes: "Notas adicionales que desee compartir",
    fileUpload: "Suba un archivo si lo necesita",
  },
  diseases: diseases(checklistEs.diseases),
  family: family(checklistEs.family),
  problems: problems(checklistEs.problems),
});

/* Portuguese */
const pt = cloneFromEn({
  meta: {
    title: "Informações do paciente",
    subtitle:
      "Preencha todos os campos. O IMC é calculado automaticamente com altura e peso.",
    selectLang: "Selecionar idioma",
  },
  common: {
    yes: "Sim",
    no: "Não",
    required: "Campo obrigatório",
    detailIfAny: "Se sim, adicione detalhes",
    adminLogin: "Login admin",
    submit: "Enviar formulário",
    submitting: "A enviar…",
  },
  status: {
    thanksTitle: "Obrigado.",
    thanksBody:
      "As suas informações foram guardadas com segurança. A clínica contactá-lo-á em breve.",
    failTitle: "Falha no envio",
  },
  errors: {
    invalid: "Pedido inválido.",
    incomplete: "Informação em falta.",
    insertFailed: "Não foi possível criar o registo.",
    uploadFailed: "Falha ao carregar o ficheiro.",
    unknown: "Erro inesperado.",
  },
  section: {
    patient: "Dados do paciente",
    emergency: "Contacto de emergência",
    bmi: "Índice de massa corporal (IMC)",
    priorSurgery: "Já foi operado?",
    seriousInjury: "Lesões graves, acidentes ou fraturas?",
    medicalHistory: "História clínica",
    medications: "Medicamentos e doses",
    allergies: "Alergias ou reações a medicamentos",
    diseases: "Doenças passadas ou atuais",
    lifestyle: "Estilo de vida",
    drugs: "Uso de drogas ou substâncias similares",
    risk: "História de risco",
    family: "História familiar",
    currentProblems: "Sintomas atuais",
    notes: "Notas adicionais",
    file: "Ficheiro",
  },
  label: {
    fullName: "Nome completo",
    age: "Idade",
    surgeryInterest: "Que procedimento lhe interessa?",
    operation: "Cirurgia / procedimento",
    emFullName: "Nome completo",
    relation: "Grau de parentesco",
    mobile: "Telemóvel",
    address: "Morada",
    heightCm: "Altura (cm)",
    feetInch: "Pés / polegadas",
    weightKg: "Peso (kg)",
    pound: "Libras",
    bmi: "Resultado / IMC",
    type: "Tipo",
    reason: "Motivo",
    date: "Data",
    medIntro:
      "Liste todos os medicamentos e doses, incluindo OTC e suplementos.",
    medName: "Medicamento / suplemento",
    dose: "Dose",
    frequency: "Frequência",
    substance: "Substância",
    reaction: "Reação",
    diseasesIntro:
      "Indique se tem ou teve alguma das seguintes condições.",
    disease: "Condição",
    smoking: "Fuma?",
    alcoholQuestion: "Consome álcool?",
    alcoholNow: "Atualmente",
    alcoholPast: "No passado",
    alcoholAmount: "Frequência e quantidade",
    drugsQuestion:
      "Usou marijuana, cocaína, estimulantes, sedativos, narcóticos, pílulas dietéticas ou similares?",
    drugsDetail: "Se sim, descreva tipo, quantidade e duração",
    drugsInjected: "Já injetou essas substâncias?",
    bloodTransfusion: "Recebeu transfusão de sangue?",
    chemicalExposure: "Esteve exposto a químicos perigosos?",
    hospitalization: "Foi hospitalizado por motivos não cirúrgicos?",
    infectionRisk:
      "Tem fatores de risco para VIH, hepatite ou outras infeções?",
    dvt: "Teve trombose venosa profunda?",
    psychiatric: "Teve tratamento psiquiátrico?",
    familyIntro: "Algum familiar teve estas condições?",
    other: "Outro",
    currentIntro: "Assinale sintomas que tenha atualmente.",
    extraNotes: "Notas adicionais que queira partilhar",
    fileUpload: "Carregue um ficheiro se necessário",
  },
  diseases: diseases(checklistPt.diseases),
  family: family(checklistPt.family),
  problems: problems(checklistPt.problems),
});

/* French */
const fr = cloneFromEn({
  meta: {
    title: "Informations patient",
    subtitle:
      "Veuillez remplir tous les champs. L’IMC est calculé automatiquement.",
    selectLang: "Choisir la langue",
  },
  common: {
    yes: "Oui",
    no: "Non",
    required: "Champ obligatoire",
    detailIfAny: "Si oui, précisez",
    adminLogin: "Connexion admin",
    submit: "Envoyer le formulaire",
    submitting: "Envoi…",
  },
  status: {
    thanksTitle: "Merci.",
    thanksBody:
      "Vos informations ont été enregistrées en toute sécurité. La clinique vous contactera bientôt.",
    failTitle: "Échec de l’envoi",
  },
  errors: {
    invalid: "Requête invalide.",
    incomplete: "Informations manquantes.",
    insertFailed: "Impossible d’enregistrer.",
    uploadFailed: "Échec du téléchargement du fichier.",
    unknown: "Erreur inattendue.",
  },
  section: {
    patient: "Informations patient",
    emergency: "Contact d’urgence",
    bmi: "Indice de masse corporelle (IMC)",
    priorSurgery: "Avez-vous déjà été opéré(e) ?",
    seriousInjury: "Blessures graves, accidents ou fractures ?",
    medicalHistory: "Antécédents médicaux",
    medications: "Médicaments et doses",
    allergies: "Allergies ou réactions médicamenteuses",
    diseases: "Antécédents ou affections actuelles",
    lifestyle: "Mode de vie",
    drugs: "Usage de drogues ou substances similaires",
    risk: "Antécédents à risque",
    family: "Antécédents familiaux",
    currentProblems: "Symptômes actuels",
    notes: "Notes complémentaires",
    file: "Fichier",
  },
  label: {
    fullName: "Nom et prénom",
    age: "Âge",
    surgeryInterest: "Quelle intervention vous intéresse ?",
    operation: "Opération / acte",
    emFullName: "Nom et prénom",
    relation: "Lien de parenté",
    mobile: "Téléphone portable",
    address: "Adresse",
    heightCm: "Taille (cm)",
    feetInch: "Pieds / pouces",
    weightKg: "Poids (kg)",
    pound: "Livres",
    bmi: "Résultat / IMC",
    type: "Type",
    reason: "Motif",
    date: "Date",
    medIntro:
      "Listez tous les médicaments et doses, y compris OTC et compléments.",
    medName: "Médicament / complément",
    dose: "Dose",
    frequency: "Fréquence",
    substance: "Substance",
    reaction: "Réaction",
    diseasesIntro:
      "Indiquez si vous avez ou avez eu l’une des affections suivantes.",
    disease: "Affection",
    smoking: "Fumez-vous ?",
    alcoholQuestion: "Consommez-vous de l’alcool ?",
    alcoholNow: "Actuellement",
    alcoholPast: "Par le passé",
    alcoholAmount: "Fréquence et quantité",
    drugsQuestion:
      "Avez-vous consommé cannabis, cocaïne, stimulants, sédatifs, narcotiques, anorexigènes ou similaires ?",
    drugsDetail: "Si oui, précisez type, quantité et durée",
    drugsInjected: "Vous êtes-vous déjà injecté ces substances ?",
    bloodTransfusion: "Avez-vous reçu une transfusion sanguine ?",
    chemicalExposure: "Exposition à des produits chimiques dangereux ?",
    hospitalization: "Hospitalisation pour motif non chirurgical ?",
    infectionRisk:
      "Facteurs de risque pour VIH, hépatite ou autres infections ?",
    dvt: "Thrombose veineuse profonde ?",
    psychiatric: "Suivi psychiatrique ?",
    familyIntro: "Un membre de votre famille a-t-il eu ces affections ?",
    other: "Autre",
    currentIntro: "Cochez les symptômes actuels.",
    extraNotes: "Notes supplémentaires",
    fileUpload: "Téléversez un fichier si besoin",
  },
  diseases: diseases(checklistFr.diseases),
  family: family(checklistFr.family),
  problems: problems(checklistFr.problems),
});

/* German */
const de = cloneFromEn({
  meta: {
    title: "Patienteninformationen",
    subtitle:
      "Bitte alle Felder ausfüllen. Der BMI wird automatisch berechnet.",
    selectLang: "Sprache wählen",
  },
  common: {
    yes: "Ja",
    no: "Nein",
    required: "Pflichtfeld",
    detailIfAny: "Bitte Details angeben",
    adminLogin: "Admin-Login",
    submit: "Formular senden",
    submitting: "Wird gesendet…",
  },
  status: {
    thanksTitle: "Vielen Dank.",
    thanksBody:
      "Ihre Angaben wurden sicher gespeichert. Die Klinik meldet sich bald.",
    failTitle: "Senden fehlgeschlagen",
  },
  errors: {
    invalid: "Ungültige Anfrage.",
    incomplete: "Unvollständige Angaben.",
    insertFailed: "Eintrag konnte nicht erstellt werden.",
    uploadFailed: "Datei-Upload fehlgeschlagen.",
    unknown: "Unerwarteter Fehler.",
  },
  section: {
    patient: "Patientendaten",
    emergency: "Notfallkontakt",
    bmi: "Body-Mass-Index (BMI)",
    priorSurgery: "Wurden Sie schon einmal operiert?",
    seriousInjury: "Schwere Verletzungen, Unfälle oder Knochenbrüche?",
    medicalHistory: "Medizinische Vorgeschichte",
    medications: "Medikamente und Dosierung",
    allergies: "Medikamentenallergien oder Reaktionen",
    diseases: "Frühere oder aktuelle Erkrankungen",
    lifestyle: "Lebensstil",
    drugs: "Drogen oder ähnliche Substanzen",
    risk: "Risikovorgeschichte",
    family: "Familiäre Vorgeschichte",
    currentProblems: "Aktuelle Beschwerden",
    notes: "Zusätzliche Hinweise",
    file: "Datei",
  },
  label: {
    fullName: "Vollständiger Name",
    age: "Alter",
    surgeryInterest: "Welcher Eingriff ist für Sie relevant?",
    operation: "Operation / Eingriff",
    emFullName: "Vollständiger Name",
    relation: "Beziehung",
    mobile: "Mobiltelefon",
    address: "Adresse",
    heightCm: "Größe (cm)",
    feetInch: "Fuß / Zoll",
    weightKg: "Gewicht (kg)",
    pound: "Pfund",
    bmi: "Ergebnis / BMI",
    type: "Art",
    reason: "Grund",
    date: "Datum",
    medIntro:
      "Alle Medikamente und Dosen angeben, inkl. rezeptfrei und Nahrungsergänzung.",
    medName: "Medikament / Supplement",
    dose: "Dosis",
    frequency: "Häufigkeit",
    substance: "Substanz",
    reaction: "Reaktion",
    diseasesIntro:
      "Bitte angeben, ob eine der folgenden Erkrankungen vorliegt oder vorlag.",
    disease: "Erkrankung",
    smoking: "Rauchen Sie?",
    alcoholQuestion: "Trinken Sie Alkohol?",
    alcoholNow: "Derzeit",
    alcoholPast: "Früher",
    alcoholAmount: "Häufigkeit und Menge",
    drugsQuestion:
      "Haben Sie Cannabis, Kokain, Stimulanzien, Sedativa, Narkotika, Diätpillen o. Ä. konsumiert?",
    drugsDetail: "Wenn ja: Art, Menge und Dauer",
    drugsInjected: "Haben Sie solche Substanzen injiziert?",
    bloodTransfusion: "Bluttransfusion erhalten?",
    chemicalExposure: "Gefahrstoffen ausgesetzt?",
    hospitalization: "Krankenhausaufenthalt ohne OP?",
    infectionRisk:
      "Risikofaktoren für HIV, Hepatitis oder andere Infektionen?",
    dvt: "Tiefe Venenthrombose gehabt?",
    psychiatric: "Psychiatrische Behandlung?",
    familyIntro: "Hat ein Familienangehörige diese Erkrankungen?",
    other: "Sonstiges",
    currentIntro: "Aktuelle Symptome ankreuzen.",
    extraNotes: "Weitere Anmerkungen",
    fileUpload: "Datei hochladen (optional)",
  },
  diseases: diseases(checklistDe.diseases),
  family: family(checklistDe.family),
  problems: problems(checklistDe.problems),
});

/* Italian */
const it = cloneFromEn({
  meta: {
    title: "Informazioni paziente",
    subtitle:
      "Compila tutti i campi. Il BMI viene calcolato automaticamente.",
    selectLang: "Seleziona lingua",
  },
  common: {
    yes: "Sì",
    no: "No",
    required: "Campo obbligatorio",
    detailIfAny: "Se sì, aggiungi dettagli",
    adminLogin: "Accesso admin",
    submit: "Invia modulo",
    submitting: "Invio…",
  },
  status: {
    thanksTitle: "Grazie.",
    thanksBody:
      "Le informazioni sono state salvate in modo sicuro. La clinica la contatterà a breve.",
    failTitle: "Invio non riuscito",
  },
  errors: {
    invalid: "Richiesta non valida.",
    incomplete: "Informazioni mancanti.",
    insertFailed: "Impossibile creare il record.",
    uploadFailed: "Caricamento file non riuscito.",
    unknown: "Errore imprevisto.",
  },
  section: {
    patient: "Dati paziente",
    emergency: "Contatto di emergenza",
    bmi: "Indice di massa corporea (BMI)",
    priorSurgery: "Sei stato operato?",
    seriousInjury: "Gravi traumi, incidenti o fratture?",
    medicalHistory: "Storia clinica",
    medications: "Farmaci e dosi",
    allergies: "Allergie o reazioni ai farmaci",
    diseases: "Patologie passate o attuali",
    lifestyle: "Stile di vita",
    drugs: "Uso di droghe o sostanze simili",
    risk: "Storia di rischio",
    family: "Storia familiare",
    currentProblems: "Sintomi attuali",
    notes: "Note aggiuntive",
    file: "File",
  },
  label: {
    fullName: "Nome e cognome",
    age: "Età",
    surgeryInterest: "Quale intervento ti interessa?",
    operation: "Intervento / procedura",
    emFullName: "Nome e cognome",
    relation: "Parentela",
    mobile: "Cellulare",
    address: "Indirizzo",
    heightCm: "Altezza (cm)",
    feetInch: "Piedi / pollici",
    weightKg: "Peso (kg)",
    pound: "Libbre",
    bmi: "Risultato / BMI",
    type: "Tipo",
    reason: "Motivo",
    date: "Data",
    medIntro:
      "Elenca tutti i farmaci e le dosi, inclusi OTC e integratori.",
    medName: "Farmaco / integratore",
    dose: "Dose",
    frequency: "Frequenza",
    substance: "Sostanza",
    reaction: "Reazione",
    diseasesIntro:
      "Indica se hai o hai avuto una delle seguenti condizioni.",
    disease: "Condizione",
    smoking: "Fumi?",
    alcoholQuestion: "Consumi alcol?",
    alcoholNow: "Attualmente",
    alcoholPast: "In passato",
    alcoholAmount: "Frequenza e quantità",
    drugsQuestion:
      "Hai usato marijuana, cocaina, stimolanti, sedativi, narcotici, pillole dimagranti o simili?",
    drugsDetail: "Se sì, descrivi tipo, quantità e durata",
    drugsInjected: "Ti sei mai iniettato queste sostanze?",
    bloodTransfusion: "Hai ricevuto trasfusioni di sangue?",
    chemicalExposure: "Esposizione a sostanze chimiche pericolose?",
    hospitalization: "Ricovero per motivi non chirurgici?",
    infectionRisk:
      "Fattori di rischio per HIV, epatite o altre infezioni?",
    dvt: "Trombosi venosa profonda?",
    psychiatric: "Trattamento psichiatrico?",
    familyIntro: "Qualche familiare ha avuto queste condizioni?",
    other: "Altro",
    currentIntro: "Segna i sintomi attuali.",
    extraNotes: "Note aggiuntive",
    fileUpload: "Carica un file se necessario",
  },
  diseases: diseases(checklistIt.diseases),
  family: family(checklistIt.family),
  problems: problems(checklistIt.problems),
});

/* Romanian */
const ro = cloneFromEn({
  meta: {
    title: "Informații pacient",
    subtitle:
      "Completați toate câmpurile. IMC se calculează automat.",
    selectLang: "Selectați limba",
  },
  common: {
    yes: "Da",
    no: "Nu",
    required: "Câmp obligatoriu",
    detailIfAny: "Dacă da, adăugați detalii",
    adminLogin: "Autentificare admin",
    submit: "Trimiteți formularul",
    submitting: "Se trimite…",
  },
  status: {
    thanksTitle: "Mulțumim.",
    thanksBody:
      "Informațiile au fost salvate în siguranță. Clinica vă va contacta în curând.",
    failTitle: "Trimiterea a eșuat",
  },
  errors: {
    invalid: "Cerere invalidă.",
    incomplete: "Informații lipsă.",
    insertFailed: "Nu s-a putut crea înregistrarea.",
    uploadFailed: "Încărcarea fișierului a eșuat.",
    unknown: "Eroare neașteptată.",
  },
  section: {
    patient: "Date pacient",
    emergency: "Persoană de contact în urgență",
    bmi: "Indice masă corporală (IMC)",
    priorSurgery: "Ați fost operat(ă)?",
    seriousInjury: "Leziuni grave, accidente sau fracturi?",
    medicalHistory: "Istoric medical",
    medications: "Medicație și doze",
    allergies: "Alergii sau reacții la medicamente",
    diseases: "Boli trecute sau actuale",
    lifestyle: "Stil de viață",
    drugs: "Consum de droguri sau substanțe similare",
    risk: "Istoric de risc",
    family: "Istoric familial",
    currentProblems: "Simptome actuale",
    notes: "Note suplimentare",
    file: "Fișier",
  },
  label: {
    fullName: "Nume complet",
    age: "Vârstă",
    surgeryInterest: "Ce intervenție vă interesează?",
    operation: "Operație / procedură",
    emFullName: "Nume complet",
    relation: "Grad de rudenie",
    mobile: "Telefon mobil",
    address: "Adresă",
    heightCm: "Înălțime (cm)",
    feetInch: "Picioare / țoli",
    weightKg: "Greutate (kg)",
    pound: "Livre",
    bmi: "Rezultat / IMC",
    type: "Tip",
    reason: "Motiv",
    date: "Dată",
    medIntro:
      "Listați toate medicamentele și dozele, inclusiv OTC și suplimente.",
    medName: "Medicament / supliment",
    dose: "Doză",
    frequency: "Frecvență",
    substance: "Substanță",
    reaction: "Reacție",
    diseasesIntro:
      "Indicați dacă aveți sau ați avut vreuna dintre următoarele.",
    disease: "Afecțiune",
    smoking: "Fumați?",
    alcoholQuestion: "Consumați alcool?",
    alcoholNow: "În prezent",
    alcoholPast: "În trecut",
    alcoholAmount: "Frecvență și cantitate",
    drugsQuestion:
      "Ați folosit marijuana, cocaină, stimulante, sedative, narcotice, pastile de slăbit sau similare?",
    drugsDetail: "Dacă da, descrieți tipul, cantitatea și durata",
    drugsInjected: "V-ați injectat astfel de substanțe?",
    bloodTransfusion: "Ați primit transfuzie de sânge?",
    chemicalExposure: "Expunere la substanțe chimice periculoase?",
    hospitalization: "Spitalizare din motive non-chirurgicale?",
    infectionRisk:
      "Factori de risc pentru HIV, hepatită sau alte infecții?",
    dvt: "Tromboză venoasă profundă?",
    psychiatric: "Tratament psihiatric?",
    familyIntro: "Are cineva din familie aceste afecțiuni?",
    other: "Altele",
    currentIntro: "Bifați simptomele actuale.",
    extraNotes: "Note suplimentare",
    fileUpload: "Încărcați un fișier dacă e nevoie",
  },
  diseases: diseases(checklistRo.diseases),
  family: family(checklistRo.family),
  problems: problems(checklistRo.problems),
});

/* Russian */
const ru = cloneFromEn({
  meta: {
    title: "Информация о пациенте",
    subtitle:
      "Заполните все поля. ИМТ рассчитывается автоматически по росту и весу.",
    selectLang: "Выберите язык",
  },
  common: {
    yes: "Да",
    no: "Нет",
    required: "Обязательное поле",
    detailIfAny: "Если да, укажите подробности",
    adminLogin: "Вход для администратора",
    submit: "Отправить форму",
    submitting: "Отправка…",
  },
  status: {
    thanksTitle: "Спасибо.",
    thanksBody:
      "Данные сохранены безопасно. Клиника свяжется с вами в ближайшее время.",
    failTitle: "Не удалось отправить",
  },
  errors: {
    invalid: "Неверный запрос.",
    incomplete: "Недостаточно данных.",
    insertFailed: "Не удалось создать запись.",
    uploadFailed: "Не удалось загрузить файл.",
    unknown: "Неожиданная ошибка.",
  },
  section: {
    patient: "Данные пациента",
    emergency: "Контакт для экстренной связи",
    bmi: "Индекс массы тела (ИМТ)",
    priorSurgery: "Были ли у вас операции?",
    seriousInjury: "Тяжёлые травмы, ДТП или переломы?",
    medicalHistory: "Медицинский анамнез",
    medications: "Лекарства и дозы",
    allergies: "Аллергии или реакции на лекарства",
    diseases: "Прошлые или текущие заболевания",
    lifestyle: "Образ жизни",
    alcohol: "Употребление алкоголя",
    drugs: "Наркотики или сходные вещества",
    risk: "Факторы риска",
    family: "Семейный анамнез",
    currentProblems: "Текущие симптомы",
    notes: "Дополнительные заметки",
    file: "Файл",
  },
  label: {
    fullName: "ФИО",
    age: "Возраст",
    surgeryInterest: "Какая операция вас интересует?",
    operation: "Операция / вмешательство",
    emFullName: "ФИО",
    relation: "Степень родства",
    mobile: "Мобильный телефон",
    address: "Адрес",
    heightCm: "Рост (см)",
    feetInch: "Футы / дюймы",
    weightKg: "Вес (кг)",
    pound: "Фунты",
    bmi: "Результат / ИМТ",
    type: "Тип",
    reason: "Причина",
    date: "Дата",
    medIntro:
      "Укажите все лекарства и дозы, включая БАД и безрецептурные средства.",
    medName: "Препарат / добавка",
    dose: "Доза",
    frequency: "Частота",
    substance: "Вещество",
    reaction: "Реакция",
    diseasesIntro:
      "Отметьте, есть ли у вас или было ли когда-либо следующее.",
    disease: "Заболевание",
    smoking: "Курите?",
    alcoholQuestion: "Употребляете алкоголь?",
    alcoholNow: "Сейчас",
    alcoholPast: "Ранее",
    alcoholAmount: "Частота и количество",
    drugsQuestion:
      "Употребляли ли марихуану, кокаин, стимуляторы, седативы, наркотики, таблетки для похудения и т.п.?",
    drugsDetail: "Если да, укажите тип, количество и длительность",
    drugsInjected: "Вводили ли внутривенно/инъекционно?",
    bloodTransfusion: "Были переливания крови?",
    chemicalExposure: "Контакт с опасными химикатами?",
    hospitalization: "Госпитализации не по поводу операции?",
    infectionRisk:
      "Факторы риска ВИЧ, гепатита или других инфекций?",
    dvt: "Тромбоз глубоких вен?",
    psychiatric: "Психиатрическое лечение?",
    familyIntro: "Были ли у родственников указанные состояния?",
    other: "Другое",
    currentIntro: "Отметьте текущие симптомы.",
    extraNotes: "Дополнительные комментарии",
    fileUpload: "Загрузите файл при необходимости",
  },
  diseases: diseases({
    anemi: "Анемия",
    astim: "Астма / эмфизема",
    kan_pıhtılasma: "Нарушения свёртываемости / кровотечения",
    divertikulit: "Дивертикулит",
    epilepsi: "Эпилепсия или судороги",
    gut: "Подагра",
    kolesterol: "Повышенный холестерин",
    karaciger: "Заболевание печени / гепатит",
    pankreatit: "Панкреатит",
    romatizmal_ates: "Ревматическая лихорадка",
    uyku_apnesi: "Апноэ сна",
    bel_soguklugu: "ИППП / хламидия (в анамнезе)",
    tuberkuloz: "Туберкулёз",
    ulser: "Язвы желудка или кишечника",
    artrit: "Артрит",
    mesane: "Инфекции мочевого пузыря или почек",
    kronik_ishal: "Хроническая диарея",
    seker: "Диабет",
    safra: "Желчнокаменная болезнь",
    kalp: "Болезни сердца / стенокардия",
    tansiyon: "Повышенное давление",
    akciger: "Заболевания лёгких / пневмония",
    polip: "Полипы",
    cilt: "Заболевания кожи",
    inme: "Инсульт",
    tiroid: "Заболевания щитовидной железы / зоб",
    tumor: "Опухоли / рак",
    reflu: "Рефлюкс / изжога",
  }),
  family: family({
    alkolizm: "Алкоголизм",
    anemi: "Анемия",
    kolon_kanseri: "Рак кишечника / колоректальный",
    seker: "Диабет",
    kalp: "Болезни сердца / стенокардия",
    hepatit: "Гепатит",
    tansiyon: "Повышенное давление",
    kolesterol: "Повышенный холестерин",
    bobrek: "Заболевание почек",
    inme: "Инсульт",
  }),
  problems: problems({
    bas_agrisi: "Сильные или необычные головные боли",
    isitme: "Проблемы со слухом",
    gorme: "Проблемы со зрением",
    sinus: "Синуситы или поллиноз",
    ses: "Осиплость голоса",
    dis: "Проблемы с зубами или дёснами",
    cilt: "Тяжёлые кожные проблемы",
    kilo: "Потеря или набор веса",
    gogus: "Боль или дискомфорт в груди",
    nefes: "Одышка",
    oksuruk: "Кашель или мокрота",
    mide: "Желудочные боли, тошнота",
    ishal: "Диарея или запор",
    kan_bagirsak: "Кровь в стуле",
    idrar: "Боль или затруднение мочеиспускания",
    eklem: "Суставные боли",
  }),
});

/* Arabic (RTL) */
const ar: PatientFormMessages = {
  ...en,
  dir: "rtl",
  meta: {
    title: "معلومات المريض",
    subtitle:
      "يرجى تعبئة جميع الحقول. يتم حساب مؤشر كتلة الجسم تلقائيًا من الطول والوزن.",
    selectLang: "اختر اللغة",
  },
  common: {
    yes: "نعم",
    no: "لا",
    required: "حقل مطلوب",
    detailIfAny: "إن وُجد، أضف التفاصيل",
    adminLogin: "دخول المشرف",
    submit: "إرسال النموذج",
    submitting: "جارٍ الإرسال…",
    addRow: "إضافة صف",
    removeRow: "حذف الصف",
  },
  status: {
    thanksTitle: "شكرًا لك.",
    thanksBody:
      "تم حفظ معلوماتك بأمان. سيتواصل معك المركز قريبًا.",
    failTitle: "فشل الإرسال",
  },
  errors: {
    invalid: "طلب غير صالح.",
    incomplete: "معلومات ناقصة.",
    insertFailed: "تعذر إنشاء السجل.",
    uploadFailed: "فشل رفع الملف.",
    unknown: "خطأ غير متوقع.",
  },
  section: {
    patient: "بيانات المريض",
    emergency: "جهة اتصال للطوارئ",
    bmi: "مؤشر كتلة الجسم",
    priorSurgery: "هل أجريتَ لك أي عملية جراحية؟",
    seriousInjury: "إصابات خطيرة أو حوادث أو كسور؟",
    medicalHistory: "التاريخ الطبي",
    medications: "الأدوية والجرعات",
    allergies: "حساسية أو ردود فعل دوائية",
    diseases: "أمراض سابقة أو حالية",
    lifestyle: "نمط الحياة",
    alcohol: "استخدام الكحول",
    drugs: "استخدام مخدرات أو مواد مشابهة",
    risk: "عوامل الخطر",
    family: "التاريخ العائلي",
    currentProblems: "الأعراض الحالية",
    notes: "ملاحظات إضافية",
    file: "ملف",
  },
  label: {
    fullName: "الاسم الكامل",
    age: "العمر",
    surgeryInterest: "ما الإجراء الذي تهتم به؟",
    operation: "العملية / الإجراء",
    emFullName: "الاسم الكامل",
    relation: "صلة القرابة",
    mobile: "الهاتف المحمول",
    address: "العنوان",
    heightCm: "الطول (سم)",
    feetInch: "قدم / بوصة",
    ft: "قدم",
    inch: "بوصة",
    weightKg: "الوزن (كغ)",
    pound: "رطل",
    bmi: "النتيجة / مؤشر كتلة الجسم",
    type: "النوع",
    reason: "السبب",
    date: "التاريخ",
    medIntro:
      "اذكر جميع الأدوية والجرعات، بما في ذلك دون وصفة والمكملات.",
    medName: "دواء / مكمل",
    dose: "الجرعة",
    frequency: "التكرار",
    substance: "المادة",
    reaction: "التفاعل",
    diseasesIntro:
      "يُرجى الإشارة إن كنت تعاني أو عانيت سابقًا من أي مما يلي.",
    disease: "الحالة",
    smoking: "هل تدخن؟",
    alcoholQuestion: "هل تشرب الكحول؟",
    alcoholNow: "حاليًا",
    alcoholPast: "سابقًا",
    alcoholAmount: "التكرار والكمية",
    drugsQuestion:
      "هل استخدمت الحشيش أو الكوكايين أو المنشطات أو المهدئات أو المخدرات أو حبوب الرجيم أو ما شابه؟",
    drugsDetail: "إن نعم، صف النوع والكمية والمدة",
    drugsInjected: "هل حقنت هذه المواد؟",
    bloodTransfusion: "هل تلقيت نقل دم؟",
    chemicalExposure: "هل تعرضت لمواد كيميائية خطرة؟",
    hospitalization: "هل نُقلتَ للمستشفى لأسباب غير جراحية؟",
    infectionRisk:
      "هل لديك عوامل خطر للإيدز أو التهاب الكبد أو عدوى أخرى؟",
    dvt: "هل أصبت بجلطة وريدية عميقة؟",
    psychiatric: "هل تلقيت علاجًا نفسيًا؟",
    familyIntro: "هل لدى أحد أفراد العائلة أي من الحالات التالية؟",
    other: "أخرى",
    currentIntro: "حدد الأعراض الحالية إن وُجدت.",
    extraNotes: "ملاحظات إضافية ترغب بمشاركتها",
    fileUpload: "ارفع ملفًا إذا لزم",
  },
  diseases: diseases({
    anemi: "فقر الدم",
    astim: "ربو / انتفاخ رئوي",
    kan_pıhtılasma: "اضطرابات التخثر / النزف",
    divertikulit: "التهاب الأمعاء الجيبية",
    epilepsi: "صرع أو نوبات",
    gut: "النقرس",
    kolesterol: "ارتفاع الكوليسترول",
    karaciger: "مرض الكبد / التهاب الكبد",
    pankreatit: "التهاب البنكرياس",
    romatizmal_ates: "الحمى الروماتيزمية",
    uyku_apnesi: "انقطاع النفس النومي",
    bel_soguklugu: "عدوى منقولة جنسيًا (مثل الكلاميديا)",
    tuberkuloz: "السل",
    ulser: "قرح المعدة أو الأمعاء",
    artrit: "التهاب المفاصل",
    mesane: "عدوى المثانة أو الكلى",
    kronik_ishal: "إسهال مزمن",
    seker: "داء السكري",
    safra: "حصى المرارة / مرض المرارة",
    kalp: "مرض القلب / الذبحة",
    tansiyon: "ضغط الدم المرتفع",
    akciger: "مرض الرئة / الالتهاب الرئوي",
    polip: "سلائل",
    cilt: "مرض جلدي",
    inme: "سكتة دماغية",
    tiroid: "مرض الغدة الدرقية / تضخمها",
    tumor: "أورام / سرطان",
    reflu: "ارتجاع حمضي / حرقة المعدة",
  }),
  family: family({
    alkolizm: "إدمان الكحول",
    anemi: "فقر الدم",
    kolon_kanseri: "سرطان القولون / الأمعاء",
    seker: "داء السكري",
    kalp: "مرض القلب / الذبحة",
    hepatit: "التهاب الكبد",
    tansiyon: "ضغط الدم المرتفع",
    kolesterol: "ارتفاع الكوليسترول",
    bobrek: "مرض الكلى",
    inme: "سكتة دماغية",
  }),
  problems: problems({
    bas_agrisi: "صداع شديد أو غير معتاد",
    isitme: "مشاكل في السمع",
    gorme: "مشاكل في الرؤية",
    sinus: "جيوب أو حساسية موسمية",
    ses: "بحة الصوت",
    dis: "مشاكل في الأسنان أو اللثة",
    cilt: "مشاكل جلدية شديدة",
    kilo: "فقدان أو زيادة في الوزن",
    gogus: "ألم أو ضيق في الصدر",
    nefes: "ضيق في التنفس",
    oksuruk: "سعال أو بلغم",
    mide: "مشاكل معدية أو غثيان",
    ishal: "إسهال أو إمساك",
    kan_bagirsak: "دم في البراز",
    idrar: "ألم أو صعوبة في التبول",
    eklem: "آلام المفاصل",
  }),
};

const MAP: Record<LanguageCode, PatientFormMessages> = {
  tr,
  en,
  bg,
  es,
  pt,
  ar,
  ru,
  fr,
  de,
  it,
  ro,
};

export function getPatientFormMessages(lang: LanguageCode): PatientFormMessages {
  return MAP[lang] ?? en;
}
