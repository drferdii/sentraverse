// Architected and built by Classy.
// [APPROVED]
"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";

type HeaderTone = "muted" | "accent";
type HistoryPhase = "idle" | "loading" | "ready";
type AnomalyTone = "critical" | "warning" | "default";
type ReasoningTone = "primary" | "warning" | "muted";
type PlanTone = "urgent" | "primary" | "supportive";
type SeverityKey = "ringan" | "sedang" | "berat";

type VitalSign = {
  label: string;
  value: string;
  unit: string;
  critical?: boolean;
};

type EntityTag = {
  text: string;
  type: string;
};

type LabRecommendation = {
  name: string;
  status: string;
};

type LabResult = {
  name: string;
  value: string;
  interpretation: string;
  alert?: boolean;
};

type TrajectoryPoint = {
  label: string;
  value: string;
};

type TrajectoryMedication = {
  name: string;
  dosage: string;
};

type PhysicalExamRow = {
  organ: string;
  result: string;
  alert?: boolean;
};

type AnomalyTag = EntityTag & {
  tone: AnomalyTone;
};

type ClinicalReasoning = {
  title: string;
  type: string;
  summary: string;
  tone: ReasoningTone;
};

type ManagementStep = {
  title: string;
  detail: string;
  tone: PlanTone;
};

type AllergyRow = {
  label: string;
  value: string;
  alert?: boolean;
};

type MedicationOrder = {
  name: string;
  regimen: string;
  note: string;
  tone: PlanTone;
};

type SimulationBranch = {
  label: string;
  severityLabel: string;
  headline: string;
  finalAnamnesaText: string;
  caseMetadata: readonly string[];
  directedHistory: readonly string[];
  historyNow: string;
  pastHistory: string;
  positiveFlags: string;
  negativeFlags: string;
  allergies: readonly AllergyRow[];
  anamnesaTags: readonly EntityTag[];
  vitals: readonly VitalSign[];
  labRecommendations: readonly LabRecommendation[];
  labResults: readonly LabResult[];
  trajectoryPoints: readonly TrajectoryPoint[];
  trajectoryOxygenPolyline: string;
  trajectoryTemperaturePolyline: string;
  trajectoryFinalPoint: { x: number; y: number };
  trajectoryMedications: readonly TrajectoryMedication[];
  physicalExamRows: readonly PhysicalExamRow[];
  anomalyTags: readonly AnomalyTag[];
  clinicalReasoning: readonly ClinicalReasoning[];
  medications: readonly MedicationOrder[];
  therapies: readonly ManagementStep[];
  routeTitle: string;
  routeDetail: string;
  routeReason: string;
  trajectoryInsight: string;
};

const STATUS_TEXT = {
  idle: "SENTRA / RSIA MELINDA // RM-88492-A // LIVE CASE: IDLE",
  synthesizing: "SENTRA // RM-88492-A // STRUCTURING CHIEF COMPLAINT...",
  emr: "SENTRA // RM-88492-A // RETRIEVING HISTORY, ALLERGY, AND COMORBID",
  synced: "SENTRA // RM-88492-A // TRIAGE CONTEXT VERIFIED",
  lab: "SENTRA // RM-88492-A // REQUESTING DIAGNOSTIC WORKUP...",
  evidence: "SENTRA // RM-88492-A // FUSING LAB AND RADIOLOGY EVIDENCE...",
  trajectory: "SENTRA // RM-88492-A // MONITORING CLINICAL RESPONSE...",
  diagnosis: "SENTRA // RM-88492-A // RANKING DIFFERENTIAL DIAGNOSES...",
  management: "SENTRA // RM-88492-A // BUILDING INITIAL MANAGEMENT PLAN...",
  complete: "SENTRA // RM-88492-A // CASE SIMULATION COMPLETE",
} as const;

type SimulationStatus = (typeof STATUS_TEXT)[keyof typeof STATUS_TEXT];

interface SimulationState {
  isRunning: boolean;
  isComplete: boolean;
  status: SimulationStatus;
  headerTone: HeaderTone;
  anamnesaText: string;
  anamnesaTagCount: number;
  historyPhase: HistoryPhase;
  showVitalsAnomaly: boolean;
  vitalsTagCount: number;
  labOpen: boolean;
  selectedLabCount: number;
  showLabResults: boolean;
  labResultCount: number;
  trajectoryOpen: boolean;
  showTrajectoryInsight: boolean;
  showDiagnosis: boolean;
  diagnosisCount: number;
  showManagement: boolean;
  managementCount: number;
}

const DESKTOP_LAYOUT_QUERY = "(min-width: 1024px)";

const subscribeDesktopLayout = (callback: () => void): (() => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia(DESKTOP_LAYOUT_QUERY);
  mediaQuery.addEventListener("change", callback);

  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
};

const getDesktopLayoutSnapshot = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(DESKTOP_LAYOUT_QUERY).matches;
};

const FINAL_ANAMNESA_TEXT =
  "demam tinggi, batuk produktif kehijauan, sesak saat aktivitas ringan, dan nyeri dada kanan saat batuk";

const TIMELINE_MARKER_CLASS_NAME =
  "absolute -left-[68.5px] top-2 h-[7px] w-[7px] rounded-full border border-muted bg-[var(--sentra-canvas)]";

const CASE_METADATA = [
  "Perempuan, 46 tahun",
  "Keluhan sejak 3 hari",
  "Triage prioritas kuning",
] as const;

const DIRECTED_HISTORY = [
  "Demam mencapai 38.8 C, menggigil, dan dahak berubah menjadi mukopurulen.",
  "Sesak muncul saat berjalan ke kamar mandi, tanpa riwayat asma aktif.",
  "Tidak ada hemoptisis, tidak ada penurunan kesadaran, dan tidak ada nyeri dada tipe iskemik.",
] as const;

const ANAMNESA_TAGS: readonly EntityTag[] = [
  { text: "Demam Tinggi", type: "SYMPTOM" },
  { text: "Batuk Produktif Hijau", type: "SYMPTOM" },
  { text: "Sesak Aktivitas Ringan", type: "RED FLAG" },
  { text: "Nyeri Pleuritik Kanan", type: "OBSERVATION" },
];

const VITALS: readonly VitalSign[] = [
  { label: "GCS", value: "15", unit: "E4V5M6" },
  { label: "Tekanan Darah", value: "132/84", unit: "mmHg" },
  { label: "Nadi", value: "108", unit: "bpm", critical: true },
  { label: "Napas", value: "24", unit: "x/m", critical: true },
  { label: "Suhu", value: "38.8", unit: "C", critical: true },
  { label: "SpO2", value: "92", unit: "%", critical: true },
  { label: "CRT", value: "< 2", unit: "detik" },
];

const LAB_RECOMMENDATIONS: readonly LabRecommendation[] = [
  { name: "Hematologi Lengkap", status: "DIPILIH UNTUK KONFIRMASI INFEKSI" },
  { name: "C-Reactive Protein (CRP)", status: "DIPILIH UNTUK MENILAI INFLAMASI" },
  { name: "Foto Toraks AP/PA", status: "DIPILIH UNTUK EVALUASI INFILTRAT" },
];

const LAB_RESULTS: readonly LabResult[] = [
  { name: "Leukosit", value: "15.200/uL", interpretation: "Leukositosis neutrofilik", alert: true },
  { name: "CRP", value: "86 mg/L", interpretation: "Inflamasi akut bermakna", alert: true },
  { name: "Foto Toraks", value: "Infiltrat lobus bawah kanan", interpretation: "Konsolidasi sesuai CAP", alert: true },
];

const TRAJECTORY_POINTS: readonly TrajectoryPoint[] = [
  { label: "Masuk", value: "SpO2 92% / T 38.8 C" },
  { label: "30 Menit O2", value: "SpO2 94% / T 38.4 C" },
  { label: "2 Jam", value: "SpO2 96% / T 37.8 C" },
];

const TRAJECTORY_MEDICATIONS: readonly TrajectoryMedication[] = [
  { name: "Oksigen nasal kanul", dosage: "2-3 L/menit" },
  { name: "Antipiretik", dosage: "sesuai protokol" },
  { name: "Antibiotik empirik", dosage: "setelah verifikasi alergi" },
];

const PHYSICAL_EXAM_ROWS: readonly PhysicalExamRow[] = [
  { organ: "Kepala & Leher", result: "Mukosa mulut agak kering, faring hiperemis ringan, tidak ada deviasi trakea" },
  {
    organ: "Dada (Cor & Pulmo)",
    result: "Gerak dinding dada simetris, rhonki basah kasar basal kanan, suara napas menurun ringan di basis kanan",
    alert: true,
  },
  { organ: "Perut (Abdomen)", result: "Supel, bising usus normal, tidak ada nyeri tekan, hepar lien tidak teraba" },
  { organ: "Ekstremitas", result: "Akral hangat, edema tidak ada, perfusi perifer baik" },
];

const ANOMALY_TAGS: readonly AnomalyTag[] = [
  { text: "SpO2 92%", type: "HYPOXEMIA", tone: "critical" },
  { text: "RR 24 x/menit", type: "TACHYPNEA", tone: "warning" },
  { text: "T 38.8 C", type: "FEBRILE", tone: "warning" },
  { text: "Alergi Amoksisilin", type: "ALLERGY", tone: "critical" },
  { text: "Hipertensi Terkontrol", type: "COMORBID", tone: "default" },
];

const CLINICAL_REASONING: readonly ClinicalReasoning[] = [
  {
    title: "Pneumonia komunitas lobus bawah kanan",
    type: "DIAGNOSIS KERJA",
    summary: "Paling sesuai karena ada demam, batuk produktif, ronki lokal, desaturasi, leukositosis, dan infiltrat fokal.",
    tone: "primary",
  },
  {
    title: "Bronkopneumonia bakterial",
    type: "DIAGNOSIS BANDING",
    summary: "Masih mungkin bila distribusi infiltrat lebih menyebar, namun temuan saat ini lebih fokal di basal kanan.",
    tone: "warning",
  },
  {
    title: "ISPA virus dengan superinfeksi sekunder",
    type: "DIAGNOSIS BANDING",
    summary: "Dipertimbangkan karena awalnya diawali gejala saluran napas atas, tetapi bukti bakteri lebih dominan.",
    tone: "muted",
  },
];

const MANAGEMENT_STEPS: readonly ManagementStep[] = [
  {
    title: "Stabilisasi awal dan monitoring",
    detail: "Berikan oksigen nasal kanul untuk target SpO2 94-96 persen, monitor nadi, RR, suhu, dan respons klinis serial.",
    tone: "urgent",
  },
  {
    title: "Antibiotik empirik berbasis protokol",
    detail:
      "Hindari amoksisilin. Pilih regimen non-amoksisilin sesuai protokol fasilitas dan verifikasi ulang riwayat alergi beta-laktam sebelum pemberian.",
    tone: "primary",
  },
  {
    title: "Terapi suportif dan disposition",
    detail:
      "Berikan antipiretik, cairan adekuat, edukasi tanda bahaya, dan pertimbangkan observasi atau rawat inap karena hipoksemia dan takipnea.",
    tone: "supportive",
  },
];

const MEDICATION_ORDERS: readonly MedicationOrder[] = [
  {
    name: "Levofloxacin",
    regimen: "750 mg IV atau PO sesuai protokol fasilitas",
    note: "Pilihan non-amoksisilin dipertimbangkan setelah verifikasi alergi, fungsi ginjal, dan risiko QT.",
    tone: "primary",
  },
  {
    name: "Parasetamol",
    regimen: "500-1000 mg sesuai protokol antipiretik",
    note: "Untuk kontrol demam dan kenyamanan pasien selama observasi.",
    tone: "supportive",
  },
];

const MILD_BRANCH: SimulationBranch = {
  label: "Ringan",
  severityLabel: "CAP Ringan",
  headline: "Rawat jalan dengan monitoring ketat",
  finalAnamnesaText: "demam, batuk berdahak, dan nyeri dada ringan saat batuk",
  caseMetadata: ["Laki-laki, 29 tahun", "Keluhan 2 hari", "Severity ringan"],
  directedHistory: [
    "Demam 38.1 C dengan batuk produktif putih kekuningan, tanpa sesak saat istirahat.",
    "Masih mampu makan minum, tidak ada mual berat, dan tidak ada riwayat rawat inap paru sebelumnya.",
    "Tidak ada penurunan kesadaran, hemoptisis, atau nyeri dada berat.",
  ],
  historyNow: "Keluhan dominan batuk berdahak dan demam, aktivitas harian masih cukup baik.",
  pastHistory: "Tanpa komorbid mayor, tanpa riwayat alergi obat bermakna, non-perokok aktif.",
  positiveFlags: "Ronki lokal ringan dan infiltrat minimal, tetapi hemodinamik stabil dan oksigenasi baik.",
  negativeFlags: "Tidak ada hipoksemia, hipotensi, takipnea berat, atau tanda sepsis.",
  allergies: [
    { label: "Alergi obat", value: "Tidak ada riwayat bermakna" },
    { label: "Alergi makanan", value: "Tidak ada" },
    { label: "Obat rutin", value: "Tidak ada" },
  ],
  anamnesaTags: [
    { text: "Demam", type: "SYMPTOM" },
    { text: "Batuk Berdahak", type: "SYMPTOM" },
    { text: "Nyeri Dada Ringan", type: "OBSERVATION" },
  ],
  vitals: [
    { label: "GCS", value: "15", unit: "E4V5M6" },
    { label: "Tekanan Darah", value: "118/76", unit: "mmHg" },
    { label: "Nadi", value: "94", unit: "bpm" },
    { label: "Napas", value: "20", unit: "x/m" },
    { label: "Suhu", value: "38.1", unit: "C", critical: true },
    { label: "SpO2", value: "96", unit: "%" },
    { label: "CRT", value: "< 2", unit: "detik" },
  ],
  labRecommendations: LAB_RECOMMENDATIONS,
  labResults: [
    { name: "Leukosit", value: "11.800/uL", interpretation: "Peningkatan ringan sesuai infeksi awal" },
    { name: "CRP", value: "24 mg/L", interpretation: "Inflamasi ringan-sedang" },
    { name: "Foto Toraks", value: "Infiltrat minimal lobus bawah kanan", interpretation: "Sesuai CAP ringan" },
  ],
  trajectoryPoints: [
    { label: "Masuk", value: "SpO2 96% / T 38.1 C" },
    { label: "1 Jam", value: "SpO2 97% / T 37.8 C" },
    { label: "Pulang", value: "SpO2 97% / T 37.5 C" },
  ],
  trajectoryOxygenPolyline: "50,92 180,82 320,74 450,68",
  trajectoryTemperaturePolyline: "50,44 180,58 320,70 450,82",
  trajectoryFinalPoint: { x: 450, y: 68 },
  trajectoryMedications: [
    { name: "Antibiotik oral", dosage: "sesuai protokol rawat jalan" },
    { name: "Antipiretik", dosage: "sesuai kebutuhan" },
    { name: "Hidrasi oral", dosage: "adekuat" },
  ],
  physicalExamRows: [
    { organ: "Kepala & Leher", result: "Faring hiperemis ringan, mukosa lembap, tidak ada deviasi trakea" },
    { organ: "Dada (Cor & Pulmo)", result: "Ronki halus basal kanan, tanpa retraksi, ekspansi baik" },
    { organ: "Perut (Abdomen)", result: "Supel, tanpa nyeri tekan" },
    { organ: "Ekstremitas", result: "Akral hangat, perfusi baik, tanpa edema" },
  ],
  anomalyTags: [
    { text: "Suhu 38.1 C", type: "FEBRILE", tone: "warning" },
    { text: "Infiltrat minimal", type: "IMAGING", tone: "default" },
    { text: "SpO2 96%", type: "STABLE OXYGENATION", tone: "default" },
  ],
  clinicalReasoning: [
    {
      title: "Pneumonia komunitas ringan",
      type: "DIAGNOSIS KERJA",
      summary: "Gejala respiratorik akut dengan infiltrat minimal dan tanpa red flag berat mendukung cabang ringan.",
      tone: "primary",
    },
    {
      title: "Bronkitis akut bakterial",
      type: "DIAGNOSIS BANDING",
      summary: "Masih mungkin, tetapi bukti radiologi membuat CAP lebih kuat.",
      tone: "muted",
    },
  ],
  medications: [
    {
      name: "Azitromisin oral",
      regimen: "sesuai protokol fasilitas untuk CAP ringan",
      note: "Cocok bila pasien stabil, toleransi oral baik, dan tidak ada kontraindikasi.",
      tone: "primary",
    },
    {
      name: "Parasetamol",
      regimen: "sesuai kebutuhan demam/nyeri",
      note: "Untuk kontrol simptomatik di rumah.",
      tone: "supportive",
    },
  ],
  therapies: [
    {
      title: "Edukasi rawat jalan",
      detail: "Instruksikan kontrol 24-48 jam atau lebih cepat bila sesak, demam persisten, atau intake menurun.",
      tone: "supportive",
    },
    {
      title: "Hidrasi dan istirahat",
      detail: "Fokus pada asupan cairan, istirahat, dan kepatuhan antibiotik oral.",
      tone: "supportive",
    },
  ],
  routeTitle: "Cabang ringan terpilih",
  routeDetail: "Pasien memenuhi jalur rawat jalan terstruktur karena oksigenasi stabil dan bukti penyakit masih terbatas.",
  routeReason: "Severity rendah + hasil penunjang ringan + tanpa red flag mayor.",
  trajectoryInsight: "Respons cepat terhadap terapi suportif dan tidak ada kebutuhan oksigen membuat observasi singkat di IGD cukup sebelum pulang terencana.",
};

const SEVERE_BRANCH: SimulationBranch = {
  label: "Berat",
  severityLabel: "CAP Berat",
  headline: "Rawat inap intensif dengan bundle sepsis/respirasi",
  finalAnamnesaText: "demam tinggi, batuk produktif pekat, sesak berat saat istirahat, dan lemah umum progresif",
  caseMetadata: ["Perempuan, 68 tahun", "Keluhan 4 hari", "Severity berat"],
  directedHistory: [
    "Demam tinggi menetap, napas cepat, dan keluarga melihat pasien tampak mengantuk sejak pagi.",
    "Sesak muncul saat istirahat, intake sangat menurun, dan ada riwayat hipertensi serta diabetes.",
    "Batuk berdahak pekat tanpa hemoptisis, tetapi terdapat nyeri pleuritik dan kelemahan menyeluruh.",
  ],
  historyNow: "Distres napas meningkat cepat, aktivitas sangat terbatas, dan intake oral buruk.",
  pastHistory: "Hipertensi dan diabetes melitus tipe 2, dengan riwayat ruam setelah amoksisilin.",
  positiveFlags: "Hipoksemia berat, takipnea, takikardia, hipotensi relatif, dan infiltrat multilobar.",
  negativeFlags: "Belum ada henti napas atau penurunan GCS berat, tetapi risiko dekompensasi tinggi.",
  allergies: [
    { label: "Alergi obat", value: "Amoksisilin (ruam menyeluruh)", alert: true },
    { label: "Komorbid", value: "Hipertensi + DM tipe 2" },
    { label: "Obat rutin", value: "Amlodipin, metformin" },
  ],
  anamnesaTags: [
    { text: "Sesak Saat Istirahat", type: "RED FLAG" },
    { text: "Demam Tinggi Persisten", type: "SYMPTOM" },
    { text: "Lemah Umum", type: "SYSTEMIC" },
    { text: "Produktif Pekat", type: "SYMPTOM" },
  ],
  vitals: [
    { label: "GCS", value: "14", unit: "E4V4M6", critical: true },
    { label: "Tekanan Darah", value: "98/64", unit: "mmHg", critical: true },
    { label: "Nadi", value: "124", unit: "bpm", critical: true },
    { label: "Napas", value: "32", unit: "x/m", critical: true },
    { label: "Suhu", value: "39.2", unit: "C", critical: true },
    { label: "SpO2", value: "86", unit: "%", critical: true },
    { label: "CRT", value: "> 2", unit: "detik", critical: true },
  ],
  labRecommendations: LAB_RECOMMENDATIONS,
  labResults: [
    { name: "Leukosit", value: "19.400/uL", interpretation: "Leukositosis berat", alert: true },
    { name: "CRP", value: "168 mg/L", interpretation: "Inflamasi berat", alert: true },
    { name: "Foto Toraks", value: "Infiltrat multilobar bilateral", interpretation: "Sesuai CAP berat", alert: true },
  ],
  trajectoryPoints: [
    { label: "Masuk", value: "SpO2 86% / T 39.2 C" },
    { label: "30 Menit O2", value: "SpO2 91% / T 38.9 C" },
    { label: "2 Jam", value: "SpO2 93% / T 38.4 C" },
  ],
  trajectoryOxygenPolyline: "50,136 180,116 320,96 450,84",
  trajectoryTemperaturePolyline: "50,28 180,40 320,54 450,68",
  trajectoryFinalPoint: { x: 450, y: 84 },
  trajectoryMedications: [
    { name: "Oksigen high flow/NRM", dosage: "sesuai target saturasi" },
    { name: "Antibiotik IV", dosage: "segera setelah kultur/protokol" },
    { name: "Cairan resusitasi", dosage: "sesuai evaluasi hemodinamik" },
  ],
  physicalExamRows: [
    { organ: "Kepala & Leher", result: "Mukosa kering, pasien tampak toksik, bicara terputus-putus", alert: true },
    {
      organ: "Dada (Cor & Pulmo)",
      result: "Ronki kasar bilateral, retraksi ringan, suara napas menurun difus",
      alert: true,
    },
    { organ: "Perut (Abdomen)", result: "Supel, bising usus menurun ringan" },
    { organ: "Ekstremitas", result: "Akral lebih dingin, CRT memanjang, perfusi menurun", alert: true },
  ],
  anomalyTags: [
    { text: "SpO2 86%", type: "SEVERE HYPOXEMIA", tone: "critical" },
    { text: "RR 32 x/menit", type: "RESPIRATORY DISTRESS", tone: "critical" },
    { text: "BP 98/64", type: "HEMODYNAMIC RISK", tone: "critical" },
    { text: "Multilobar infiltrate", type: "IMAGING", tone: "warning" },
  ],
  clinicalReasoning: [
    {
      title: "Pneumonia komunitas berat",
      type: "DIAGNOSIS KERJA",
      summary: "Kombinasi hipoksemia berat, takipnea, toksik sistemik, dan infiltrat multilobar mendorong cabang berat.",
      tone: "primary",
    },
    {
      title: "Sepsis akibat fokus paru",
      type: "KOMPLIKASI",
      summary: "Perlu disingkirkan aktif dan ditatalaksana paralel karena perfusi mulai turun dan inflamasi sangat tinggi.",
      tone: "warning",
    },
  ],
  medications: [
    {
      name: "Antibiotik IV spektrum luas non-amoksisilin",
      regimen: "sesuai protokol CAP berat dan status alergi",
      note: "Mulai cepat setelah verifikasi alergi dan pertimbangan kultur bila feasible tanpa menunda terapi.",
      tone: "urgent",
    },
    {
      name: "Antipiretik IV/PO",
      regimen: "sesuai protokol",
      note: "Untuk kontrol demam sambil stabilisasi respirasi dan hemodinamik.",
      tone: "supportive",
    },
  ],
  therapies: [
    {
      title: "Stabilisasi ABC dan oksigenasi",
      detail: "Targetkan saturasi dengan high flow atau non-rebreathing mask, dan siapkan eskalasi ventilasi bila gagal.",
      tone: "urgent",
    },
    {
      title: "Bundle sepsis/monitoring intensif",
      detail: "Pertimbangkan kultur, laktat, gas darah, cairan terukur, dan monitoring ketat di area rawat intensif.",
      tone: "urgent",
    },
  ],
  routeTitle: "Cabang berat terpilih",
  routeDetail: "Pasien masuk jalur rawat inap intensif karena distress napas, hipoksemia, dan bukti penyakit luas.",
  routeReason: "Severity tinggi + hasil penunjang berat + red flag multipel.",
  trajectoryInsight: "Perbaikan awal setelah oksigen ada, tetapi pasien tetap berisiko tinggi gagal napas dan membutuhkan evaluasi intensif berkelanjutan.",
};

const SIMULATION_BRANCHES: Record<SeverityKey, SimulationBranch> = {
  ringan: MILD_BRANCH,
  sedang: {
    label: "Sedang",
    severityLabel: "CAP Sedang",
    headline: "Observasi/rawat inap dengan antibiotik dan oksigen",
    finalAnamnesaText: FINAL_ANAMNESA_TEXT,
    caseMetadata: CASE_METADATA,
    directedHistory: DIRECTED_HISTORY,
    historyNow: "Dahak makin kental, sesak memburuk pada malam hari, dan belum ada perbaikan dengan obat flu bebas.",
    pastHistory: "Hipertensi terkontrol dengan amlodipin, tanpa riwayat PPOK, gagal jantung, atau diabetes.",
    positiveFlags: "Hipoksemia ringan, takipnea, dan nyeri pleuritik kanan yang konsisten dengan keterlibatan paru.",
    negativeFlags: "Tidak ada penurunan kesadaran, hipotensi, hemoptisis, sianosis berat, atau nyeri dada tipe ACS.",
    allergies: [
      { label: "Alergi obat", value: "Amoksisilin (ruam)", alert: true },
      { label: "Alergi makanan", value: "Tidak bermakna" },
      { label: "Obat rutin", value: "Amlodipin 10 mg" },
    ],
    anamnesaTags: ANAMNESA_TAGS,
    vitals: VITALS,
    labRecommendations: LAB_RECOMMENDATIONS,
    labResults: LAB_RESULTS,
    trajectoryPoints: TRAJECTORY_POINTS,
    trajectoryOxygenPolyline: "50,120 180,95 320,70 450,55",
    trajectoryTemperaturePolyline: "50,35 180,55 320,75 450,90",
    trajectoryFinalPoint: { x: 450, y: 55 },
    trajectoryMedications: TRAJECTORY_MEDICATIONS,
    physicalExamRows: PHYSICAL_EXAM_ROWS,
    anomalyTags: ANOMALY_TAGS,
    clinicalReasoning: CLINICAL_REASONING,
    medications: MEDICATION_ORDERS,
    therapies: MANAGEMENT_STEPS,
    routeTitle: "Cabang sedang terpilih",
    routeDetail: "Pasien memerlukan observasi/rawat inap karena desaturasi ringan, takipnea, dan infiltrat fokal yang jelas.",
    routeReason: "Severity sedang + kebutuhan oksigen awal + bukti CAP terkonfirmasi.",
    trajectoryInsight:
      "Respons awal terhadap oksigen dan terapi suportif terlihat membaik, tetapi kombinasi hipoksemia ringan, takipnea, dan infiltrat fokal tetap membuat kasus ini lebih aman diposisikan sebagai pneumonia yang perlu observasi ketat dan evaluasi lanjut.",
  },
  berat: SEVERE_BRANCH,
};

function createInitialSimulationState(branch: SimulationBranch): SimulationState {
  return {
    isRunning: false,
    isComplete: false,
    status: STATUS_TEXT.idle,
    headerTone: "muted",
    anamnesaText: branch.finalAnamnesaText.split(",")[0] ?? branch.finalAnamnesaText,
    anamnesaTagCount: 0,
    historyPhase: "idle",
    showVitalsAnomaly: false,
    vitalsTagCount: 0,
    labOpen: false,
    selectedLabCount: 0,
    showLabResults: false,
    labResultCount: 0,
    trajectoryOpen: false,
    showTrajectoryInsight: false,
    showDiagnosis: false,
    diagnosisCount: 0,
    showManagement: false,
    managementCount: 0,
  };
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function getHeaderColor(tone: HeaderTone): string {
  return tone === "accent" ? "var(--sdx-c-asesmen)" : "var(--sdx-text-muted)";
}

function getAnomalyStyles(tone: AnomalyTone): { className: string; dotClassName: string; dotStyle?: React.CSSProperties } {
  if (tone === "critical") {
    return {
      className: "text-red-500",
      dotClassName: "bg-red-500",
      dotStyle: { boxShadow: "0 0 8px rgba(239, 68, 68, 0.6)" },
    };
  }

  if (tone === "warning") {
    return {
      className: "text-[var(--sentra-warning)]",
      dotClassName: "",
      dotStyle: { background: "var(--sentra-warning)", boxShadow: "0 0 8px var(--sdx-c-asesmen)" },
    };
  }

  return {
    className: "text-foreground",
    dotClassName: "bg-foreground",
  };
}

function getReasoningToneStyles(tone: ReasoningTone): string {
  if (tone === "primary") {
    return "border-accent/30 bg-transparent";
  }

  if (tone === "warning") {
    return "border-[var(--sentra-warning-soft)] bg-transparent";
  }

  return "border-muted/20 bg-transparent";
}

function getManagementToneStyles(tone: PlanTone): string {
  if (tone === "urgent") {
    return "border-red-500/25 bg-transparent";
  }

  if (tone === "primary") {
    return "border-accent/30 bg-transparent";
  }

  return "border-muted/20 bg-transparent";
}

export default function SentraSim() {
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityKey>("sedang");
  const activeBranch = SIMULATION_BRANCHES[selectedSeverity];
  const [simulation, setSimulation] = useState<SimulationState>(() =>
    createInitialSimulationState(SIMULATION_BRANCHES.sedang),
  );
  const isDesktopLayout = useSyncExternalStore(
    subscribeDesktopLayout,
    getDesktopLayoutSnapshot,
    () => false,
  );
  const isMountedRef = useRef(true);
  const isRunningRef = useRef(false);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const patchSimulation = (patch: Partial<SimulationState>): void => {
    if (!isMountedRef.current) {
      return;
    }

    setSimulation((previous) => ({ ...previous, ...patch }));
  };

  const handleSelectSeverity = (nextSeverity: SeverityKey): void => {
    if (isRunningRef.current || nextSeverity === selectedSeverity) {
      return;
    }

    setSelectedSeverity(nextSeverity);
    setSimulation(createInitialSimulationState(SIMULATION_BRANCHES[nextSeverity]));
  };

  const runSimulation = async (): Promise<void> => {
    if (isRunningRef.current || simulation.isComplete) {
      return;
    }

    isRunningRef.current = true;
    patchSimulation({ isRunning: true });

    try {
      patchSimulation({
        status: STATUS_TEXT.synthesizing,
        headerTone: "accent",
        anamnesaText: "",
      });

      let currentText = "";
      for (const word of activeBranch.finalAnamnesaText.split(" ")) {
        currentText = currentText ? `${currentText} ${word}` : word;
        patchSimulation({ anamnesaText: currentText });
        await delay(150);
      }

      await delay(500);

      for (let count = 1; count <= activeBranch.anamnesaTags.length; count += 1) {
        patchSimulation({ anamnesaTagCount: count });
        await delay(300);
      }

      patchSimulation({
        status: STATUS_TEXT.emr,
        historyPhase: "loading",
      });
      await delay(1500);

      patchSimulation({
        historyPhase: "ready",
        status: STATUS_TEXT.synced,
      });
      await delay(800);

      patchSimulation({ showVitalsAnomaly: true });
      await delay(200);

      for (let count = 1; count <= activeBranch.anomalyTags.length; count += 1) {
        patchSimulation({ vitalsTagCount: count });
        await delay(200);
      }

      await delay(500);

      patchSimulation({
        status: STATUS_TEXT.lab,
        labOpen: true,
      });
      await delay(700);

      for (let count = 1; count <= activeBranch.labRecommendations.length; count += 1) {
        patchSimulation({ selectedLabCount: count });
        await delay(360);
      }

      await delay(420);

      patchSimulation({
        status: STATUS_TEXT.evidence,
        showLabResults: true,
      });
      await delay(420);

      for (let count = 1; count <= activeBranch.labResults.length; count += 1) {
        patchSimulation({ labResultCount: count });
        await delay(320);
      }

      await delay(420);

      patchSimulation({
        status: STATUS_TEXT.trajectory,
        trajectoryOpen: true,
      });
      await delay(800);

      patchSimulation({ showTrajectoryInsight: true });
      await delay(700);

      patchSimulation({
        status: STATUS_TEXT.diagnosis,
        showDiagnosis: true,
      });
      await delay(420);

      for (let count = 1; count <= activeBranch.clinicalReasoning.length; count += 1) {
        patchSimulation({ diagnosisCount: count });
        await delay(320);
      }

      await delay(500);

      patchSimulation({
        status: STATUS_TEXT.management,
        showManagement: true,
      });
      await delay(420);

      for (let count = 1; count <= activeBranch.medications.length + activeBranch.therapies.length; count += 1) {
        patchSimulation({ managementCount: count });
        await delay(320);
      }

      await delay(800);

      patchSimulation({
        status: STATUS_TEXT.complete,
        isComplete: true,
      });
    } finally {
      isRunningRef.current = false;
      patchSimulation({ isRunning: false });
    }
  };

  const visibleMedicationCount = Math.min(simulation.managementCount, activeBranch.medications.length);
  const visibleTherapyCount = Math.max(simulation.managementCount - activeBranch.medications.length, 0);

  const renderAssessmentSection = (isMobile: boolean): React.JSX.Element | null => {
    if (!simulation.showDiagnosis && !simulation.showManagement) {
      return null;
    }

    return (
      <div className={`flex flex-col gap-6 ${isMobile ? "relative mt-14" : ""}`}>
        {isMobile ? <div className={TIMELINE_MARKER_CLASS_NAME} /> : null}
        {simulation.showDiagnosis ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col">
            <TextScramble
              key={`${isMobile ? "mobile" : "desktop"}-section-five-${selectedSeverity}`}
              as="div"
              duration={0.65}
              speed={0.022}
              className="text-accent text-sm uppercase tracking-widest mb-6"
            >
              05. Asesmen Klinis & Tatalaksana Awal
            </TextScramble>
            <div className="border border-muted/20 p-5 mb-5">
              <TextScramble
                key={`${isMobile ? "mobile" : "desktop"}-route-title-${selectedSeverity}`}
                as="p"
                duration={0.7}
                speed={0.024}
                className="mb-2 text-[10px] font-bold uppercase tracking-widest text-accent"
              >
                {activeBranch.routeTitle}
              </TextScramble>
              <TextScramble
                key={`${isMobile ? "mobile" : "desktop"}-route-detail-${selectedSeverity}`}
                as="p"
                duration={0.8}
                speed={0.022}
                className="text-foreground text-base leading-relaxed mb-2"
              >
                {activeBranch.routeDetail}
              </TextScramble>
              <p className="text-sm text-muted">{activeBranch.routeReason}</p>
            </div>
            <div className="text-accent text-[10px] font-bold tracking-widest uppercase border-b border-muted/20 pb-3 mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              CLINICAL REASONING OUTPUT
            </div>
            <div className="flex flex-col gap-3">
              {activeBranch.clinicalReasoning.map((item, index) => (
                <motion.div
                  key={`${isMobile ? "mobile" : "desktop"}-${item.title}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={index < simulation.diagnosisCount ? { opacity: 1, x: 0 } : { opacity: 0 }}
                  className={`border p-4 ${getReasoningToneStyles(item.tone)}`}
                >
                  <p className="mb-1 text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted">{item.type}</p>
                  <p className="text-sm leading-relaxed text-muted">{item.summary}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}

        {simulation.showManagement ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col">
            <div
              className="text-[10px] font-bold tracking-widest uppercase border-b border-muted/20 pb-3 mb-4 flex items-center gap-2"
              style={{ color: "var(--sentra-warning)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--sentra-warning)" }} />
              OBAT & TERAPI
            </div>
            <div className="flex flex-col gap-3 mb-5">
              {activeBranch.medications.map((item, index) => (
                <motion.div
                  key={`${isMobile ? "mobile" : "desktop"}-${item.name}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={index < visibleMedicationCount ? { opacity: 1, x: 0 } : { opacity: 0 }}
                  className={`border p-4 ${getManagementToneStyles(item.tone)}`}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Obat</span>
                  </div>
                  <p className="text-sm text-foreground mb-1">{item.regimen}</p>
                  <p className="text-sm leading-relaxed text-muted">{item.note}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-[10px] font-bold tracking-widest uppercase border-b border-muted/20 pb-3 mb-4 text-muted">
              TERAPI SUPPORTIF & DISPOSITION
            </div>
            <div className="flex flex-col gap-3">
              {activeBranch.therapies.map((step, index) => (
                <motion.div
                  key={`${isMobile ? "mobile" : "desktop"}-${step.title}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={index < visibleTherapyCount ? { opacity: 1, x: 0 } : { opacity: 0 }}
                  className={`border p-4 ${getManagementToneStyles(step.tone)}`}
                >
                  <p className="mb-2 text-sm font-semibold text-foreground">{step.title}</p>
                  <p className="text-sm leading-relaxed text-muted">{step.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    );
  };

  return (
    <section data-sentra-sim data-theme="dark" className="bg-background py-24 px-6 md:px-12 border-t border-muted/50 overflow-hidden">
      <div className="max-w-[1440px] mx-auto text-center mb-16">
        <p className="text-accent text-sm uppercase tracking-widest mb-4">Simulasi Langsung</p>
        <TextScramble
          key={`hero-title-${selectedSeverity}`}
          as="h2"
          duration={0.9}
          speed={0.03}
          className="text-foreground text-[32px] md:text-[45px] font-bold mb-6"
        >
          Lihat Bagaimana Sentra Memproses Cabang Severity Nyata
        </TextScramble>
        <TextScramble
          key={`hero-copy-${selectedSeverity}`}
          as="p"
          duration={0.9}
          speed={0.025}
          className="text-muted text-lg max-w-[720px] mx-auto mb-4"
        >
          Pilih cabang severity untuk melihat bagaimana hasil vital, pemeriksaan penunjang, keputusan diagnosis,
          disposition, obat, dan terapi berubah secara real-time berdasarkan tingkat keparahan kasus.
        </TextScramble>
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          {(Object.entries(SIMULATION_BRANCHES) as [SeverityKey, SimulationBranch][]).map(([key, branch]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleSelectSeverity(key)}
              disabled={simulation.isRunning}
              className={`rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                key === selectedSeverity
                  ? "border-accent bg-accent text-background"
                  : "border-muted/20 text-muted hover:border-accent hover:text-accent"
              } ${simulation.isRunning ? "cursor-not-allowed opacity-60" : ""}`}
            >
              {branch.label}
            </button>
          ))}
        </div>
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {activeBranch.caseMetadata.map((item) => (
            <span
              key={item}
              className="rounded-full border border-muted/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted"
            >
              {item}
            </span>
          ))}
        </div>
        <TextScramble
          key={`headline-${selectedSeverity}`}
          as="p"
          duration={0.75}
          speed={0.024}
          className="mb-8 text-sm uppercase tracking-[0.28em] text-muted"
        >
          {activeBranch.headline}
        </TextScramble>
        <button
          type="button"
          onClick={runSimulation}
          disabled={simulation.isRunning || simulation.isComplete}
          className={`group relative inline-flex items-center gap-3 rounded-full border px-10 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-500 ${
            simulation.isComplete
              ? "bg-green-600/20 text-green-400 border-green-500/30 cursor-default"
              : simulation.isRunning
                ? "bg-accent/20 text-accent border-accent/30 cursor-wait"
                : "bg-accent text-background border-accent hover:shadow-[var(--sentra-shadow-accent-strong)] hover:-translate-y-0.5 hover:scale-[1.02]"
          }`}
        >
          {!simulation.isRunning && !simulation.isComplete ? (
            <span
              className="absolute inset-0 rounded-full animate-ping bg-accent/20"
              style={{ animationDuration: "2s" }}
            />
          ) : null}

          {simulation.isRunning ? (
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : null}

          {simulation.isComplete ? (
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : null}

          {!simulation.isRunning && !simulation.isComplete ? (
            <svg className="relative w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          ) : null}

          <span className="relative">
            {simulation.isComplete
              ? "Simulasi Selesai"
              : simulation.isRunning
                ? "Memproses Kasus..."
                : `Mulai Cabang ${activeBranch.label}`}
          </span>
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[800px_1fr] gap-20 relative">
        <div
          className="absolute -top-10 left-0 text-xs font-medium uppercase tracking-widest transition-colors duration-500"
          style={{ color: getHeaderColor(simulation.headerTone) }}
        >
          {simulation.status}
        </div>

        <div className="relative pl-16 flex flex-col gap-14 border-l border-muted/20">
          <div className="relative">
            <div className={TIMELINE_MARKER_CLASS_NAME} />
            <h3 className="text-accent text-sm uppercase tracking-widest mb-6">01. Keluhan Utama & Anamnesis Terarah</h3>
            <div className="bg-muted/5 border border-muted/10 p-8 relative overflow-hidden">
              <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--sdx-line-base) 1px, transparent 1px), linear-gradient(to bottom, var(--sdx-line-base) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative z-10">
                <span className="text-accent text-xs uppercase tracking-widest mb-2 block">Keluhan Utama</span>
                <p className="text-muted text-lg mb-6 leading-relaxed">
                  Pasien datang dengan keluhan{" "}
                  <span className="text-foreground border-b border-dashed border-muted inline-block">
                    {simulation.anamnesaText}
                  </span>{" "}
                  dengan pola yang mengarahkan ke {activeBranch.severityLabel.toLowerCase()}.
                </p>
                <span className="text-accent text-xs uppercase tracking-widest mb-3 block">Anamnesis Terarah</span>
                <div className="grid gap-3 md:grid-cols-3">
                  {activeBranch.directedHistory.map((item) => (
                    <div key={item} className="border border-muted/10 bg-background/50 p-4 text-sm leading-relaxed text-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className={TIMELINE_MARKER_CLASS_NAME} />
            <h3 className="text-accent text-sm uppercase tracking-widest mb-6">02. Riwayat Penyakit, Alergi, dan Red Flag</h3>
            {simulation.historyPhase === "loading" ? (
              <p className="text-accent text-sm animate-pulse mb-4 uppercase tracking-widest">
                [SYSTEM: RETRIEVING EMR, ALLERGY, AND PREVIOUS VISITS...]
              </p>
            ) : null}

            {simulation.historyPhase === "ready" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-[1.6fr_1fr] gap-8"
              >
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-muted text-xs uppercase font-medium mb-1">Riwayat Penyakit Sekarang</p>
                    <p className="text-foreground text-lg">{activeBranch.historyNow}</p>
                  </div>
                  <div>
                    <p className="text-muted text-xs uppercase font-medium mb-1">Riwayat Penyakit Dahulu</p>
                    <p className="text-foreground text-lg">{activeBranch.pastHistory}</p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="border border-muted/20 p-4">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-red-400">Red Flag Positif</p>
                      <p className="text-sm leading-relaxed text-foreground">{activeBranch.positiveFlags}</p>
                    </div>
                    <div className="border border-muted/20 p-4">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted">Red Flag Negatif</p>
                      <p className="text-sm leading-relaxed text-foreground">{activeBranch.negativeFlags}</p>
                    </div>
                  </div>
                </div>
                <div className="border-l border-muted/20 pl-6 flex flex-col gap-3">
                  <p className="text-muted text-xs uppercase font-medium mb-2">Alergi & Obat Rutin</p>
                  {activeBranch.allergies.map((row) => (
                    <div key={row.label} className="flex justify-between text-sm border-b border-dashed border-muted/20 pb-1">
                      <span>{row.label}</span>
                      <span className={row.alert ? "text-red-500 font-medium" : "text-foreground"}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </div>

          <div className="relative">
            <div className={TIMELINE_MARKER_CLASS_NAME} />
            <h3 className="text-accent text-sm uppercase tracking-widest mb-6">03. Tanda Vital, Lab, dan Bukti Objektif</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {activeBranch.vitals.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="text-muted text-xs uppercase tracking-widest">{item.label}</span>
                  <span
                    className={`text-2xl font-bold ${item.critical ? "text-red-500" : "text-foreground"}`}
                    style={item.critical ? { textShadow: "0 0 8px rgba(239, 68, 68, 0.4)" } : undefined}
                  >
                    {item.value}
                    <span className="text-sm font-normal text-muted ml-1">{item.unit}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-muted/20">
              <button
                type="button"
                aria-controls="sentra-sim-lab-panel"
                aria-expanded={simulation.labOpen}
                onClick={() => patchSimulation({ labOpen: !simulation.labOpen })}
                disabled={simulation.isRunning}
                className={`flex items-center gap-2 italic font-medium transition-colors ${
                  simulation.labOpen ? "text-accent" : "text-muted hover:text-accent"
                } ${simulation.isRunning ? "cursor-not-allowed opacity-60" : ""}`}
              >
                * {simulation.labOpen ? "Pemeriksaan terpilih karena dicurigai pneumonia" : "Buka pemeriksaan penunjang"}
              </button>
              <motion.div
                id="sentra-sim-lab-panel"
                initial={false}
                animate={simulation.labOpen ? { height: "auto", opacity: 1, marginTop: 16 } : { height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-3">
                  {activeBranch.labRecommendations.map((item, index) => {
                    const isSelected = index < simulation.selectedLabCount;

                    return (
                      <div
                        key={item.name}
                        className={`flex justify-between items-center pb-2 border-b border-muted/5 transition-colors ${
                          isSelected ? "text-foreground" : "text-muted"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={isSelected ? "text-accent" : ""}>[{isSelected ? "x" : " "}]</span>
                          <span className="text-lg">{item.name}</span>
                        </div>
                        {isSelected ? (
                          <motion.span
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[10px] font-bold tracking-widest uppercase"
                            style={{ color: "var(--sentra-warning)" }}
                          >
                            {item.status}
                          </motion.span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                {simulation.showLabResults ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 grid gap-4 md:grid-cols-3"
                  >
                    {activeBranch.labResults.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={index < simulation.labResultCount ? { opacity: 1, y: 0 } : { opacity: 0 }}
                        className={`border p-4 ${item.alert ? "border-red-500/20" : "border-muted/20"}`}
                      >
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted">{item.name}</p>
                        <p className="mb-2 text-lg font-semibold text-foreground">{item.value}</p>
                        <p className="text-sm leading-relaxed text-muted">{item.interpretation}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : null}
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={false}
            animate={simulation.trajectoryOpen ? { height: "auto", opacity: 1, marginBottom: 24 } : { height: 0, opacity: 0 }}
            className="overflow-hidden border-l-2 pl-6"
            style={{
              borderColor: "var(--sentra-warning)",
              background: "transparent",
            }}
          >
            <div
              className="mb-6 flex items-start justify-between gap-4 text-[10px] font-bold tracking-widest uppercase"
              style={{ color: "var(--sentra-warning)" }}
            >
              <span>Trajektori Respons Awal // Oksigenasi dan Demam dalam 2 Jam Pertama</span>
              <button
                type="button"
                onClick={() => patchSimulation({ trajectoryOpen: false })}
                disabled={simulation.isRunning}
                className={`hover:text-foreground ${simulation.isRunning ? "cursor-not-allowed opacity-60" : ""}`}
                aria-label="Tutup panel trajektori pasien"
              >
                [X] CLOSE
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1 h-[180px] relative">
                <svg width="100%" height="100%" viewBox="0 0 500 160" preserveAspectRatio="none">
                  <line x1="0" y1="30" x2="500" y2="30" stroke="var(--sdx-line-base)" strokeDasharray="4" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="var(--sdx-line-base)" strokeDasharray="4" />
                  <line x1="0" y1="130" x2="500" y2="130" stroke="var(--sdx-line-base)" strokeDasharray="4" />
                  <polyline
                    points={activeBranch.trajectoryOxygenPolyline}
                    fill="none"
                    stroke="var(--sentra-warning)"
                    strokeWidth="2"
                    strokeDasharray="1000"
                    strokeDashoffset={simulation.trajectoryOpen ? 0 : 1000}
                    className="transition-all duration-[1500ms]"
                  />
                  <polyline
                    points={activeBranch.trajectoryTemperaturePolyline}
                    fill="none"
                    stroke="var(--sentra-warning-soft)"
                    strokeWidth="2"
                    strokeDasharray="1000"
                    strokeDashoffset={simulation.trajectoryOpen ? 0 : 1000}
                    className="transition-all duration-[1500ms] delay-200"
                  />
                  <circle
                    cx={activeBranch.trajectoryFinalPoint.x}
                    cy={activeBranch.trajectoryFinalPoint.y}
                    r="4"
                    fill="var(--sentra-warning)"
                    stroke="var(--sentra-bg)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="w-full md:w-72 border-l border-dashed border-muted/20 pl-6 flex flex-col gap-4">
                <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--sentra-warning)" }}>
                  Intervensi & Respons
                </p>
                <div className="flex flex-col gap-3 mb-2">
                  {activeBranch.trajectoryPoints.map((point) => (
                    <div key={point.label} className="flex items-start justify-between gap-3 text-sm text-foreground">
                      <span className="text-muted">{point.label}</span>
                      <span className="text-right">{point.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {activeBranch.trajectoryMedications.map((medication) => (
                    <div key={medication.name} className="flex items-center justify-between text-sm text-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full" style={{ background: "var(--sentra-warning)" }} />
                        {medication.name}
                      </div>
                      <span
                        className="rounded border border-muted/20 px-1 text-[10px]"
                        style={{ color: "var(--sentra-warning)" }}
                      >
                        {medication.dosage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className={TIMELINE_MARKER_CLASS_NAME} />
            <h3 className="text-accent text-sm uppercase tracking-widest mb-6">04. Pemeriksaan Fisik Head-to-Toe</h3>
            <div className="flex flex-col gap-5">
              {activeBranch.physicalExamRows.map((row) => (
                <div
                  key={row.organ}
                  className="grid md:grid-cols-[160px_1fr] gap-6 border-b border-dashed border-muted/10 pb-3 items-baseline"
                >
                  <span className="text-muted text-xs uppercase font-medium">{row.organ}</span>
                  <span className={`text-lg ${row.alert ? "text-red-500 font-medium" : "text-foreground"}`}>
                    {row.result}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {!isDesktopLayout ? renderAssessmentSection(true) : null}

          <input
            type="text"
            readOnly
            aria-label="Composer asesmen pratinjau"
            placeholder="Ketik asesmen tambahan atau ketik '/' untuk perintah..."
            className="w-full bg-transparent border-b border-muted/20 pb-4 text-foreground outline-none focus:border-accent transition-colors placeholder:italic placeholder:text-muted/30 mt-8"
          />
        </div>

        <div className="lg:sticky lg:top-32 h-fit flex flex-col gap-12">
          <div className="flex flex-col">
            <div className="text-muted text-[10px] font-bold tracking-widest uppercase border-b border-muted/20 pb-3 mb-4">
              ARTIFICIAL INTELLIGENCE ENTITY: ANAMNESA
            </div>
            <div className="flex flex-col gap-3">
              {activeBranch.anamnesaTags.map((tag, index) => (
                <motion.div
                  key={tag.text}
                  initial={{ opacity: 0, x: 10 }}
                  animate={index < simulation.anamnesaTagCount ? { opacity: 1, x: 0 } : { opacity: 0 }}
                  className="flex items-center justify-between text-foreground"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-accent shadow-[0_0_8px_var(--sdx-c-asesmen)]" />
                    <span className="text-lg">{tag.text}</span>
                  </div>
                  <span className="text-[10px] font-bold border border-muted/20 px-1 rounded text-muted">{tag.type}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {simulation.showVitalsAnomaly ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col">
              <div className="text-red-500 text-[10px] font-bold tracking-widest uppercase border-b border-muted/20 pb-3 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                TRIAGE ALERT & CONTEXT
              </div>
              <div className="flex flex-col gap-3">
                {activeBranch.anomalyTags.map((tag, index) => {
                  const styles = getAnomalyStyles(tag.tone);

                  return (
                    <motion.div
                      key={tag.text}
                      initial={{ opacity: 0, x: 10 }}
                      animate={index < simulation.vitalsTagCount ? { opacity: 1, x: 0 } : { opacity: 0 }}
                      className={`flex items-center justify-between ${styles.className}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-1 h-1 rounded-full ${styles.dotClassName}`} style={styles.dotStyle} />
                        <span className="text-lg">{tag.text}</span>
                      </div>
                      <span className="text-[10px] font-bold border border-current px-1 rounded opacity-80">{tag.type}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : null}

          {isDesktopLayout ? renderAssessmentSection(false) : null}

          {simulation.showTrajectoryInsight ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col">
              <div
                className="text-[10px] font-bold tracking-widest uppercase border-b border-muted/20 pb-3 mb-4 flex items-center gap-2"
                style={{ color: "var(--sentra-warning)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--sentra-warning)" }} />
                AI TRAJECTORY INSIGHT
              </div>
              <TextScramble
                key={`trajectory-insight-${selectedSeverity}`}
                as="p"
                duration={0.85}
                speed={0.022}
                className="text-foreground text-lg leading-relaxed"
              >
                {activeBranch.trajectoryInsight}
              </TextScramble>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
