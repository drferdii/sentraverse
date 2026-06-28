# Project Context: sentra-main

> Dokumen ini adalah sumber kebenaran utama untuk agent. Jika ada konflik,
ikuti bagian `Agent Contract` dan `Decision Log`.

## 1. Ringkasan Project
- Nama project: sentra-main (Sentra Core)
- ID project: sentra-healthcare-core
- Domain: Healthcare AI Platform / Core System
- Repo: D:\Devops\abyss-monorepo\app\sentra-main
- Owner: Dr. Ferdi Iskandar (Chief)
- Status: active
- Last updated: 2026-04-01

## 2. Tujuan Utama
- Masalah yang diselesaikan: Fragmentasi sistem AI kesehatan dan kebutuhan akan infrastruktur inti yang kuat untuk berbagai layanan Sentra.
- Outcome yang diharapkan: Platform inti yang stabil, performan, dan menjadi pusat orkestrasi bagi seluruh layanan Sentra Healthcare AI.
- Definisi sukses: Uptime sistem yang tinggi, integrasi antar modul yang mulus, dan kemudahan deployment layanan baru.
- Non-goals: Menjadi aplikasi end-user tunggal (fokus pada platform/core).

## 3. Agent Contract
### 3.1 Harus Dilakukan
- Selalu sapa user sebagai Boss atau Chief.
- Gunakan Next.js 16, React 19, dan TypeScript Strict Mode.
- Gunakan Tailwind CSS 4 dan Framer Motion untuk UI yang premium.
- Pastikan perubahan pada core-logic tidak merusak kompatibilitas dengan layanan satelit (assist, portal, dashboard).

### 3.2 Jangan Dilakukan
- Jangan mengubah konfigurasi `next.config.mjs` tanpa izin eksplisit.
- Jangan mengabaikan peringatan linting atau type-checking.
- Jangan memasukkan logika bisnis yang terlalu spesifik ke dalam modul core (jaga agar tetap generik dan modular).

### 3.3 Gaya Kerja
- Jawaban harus: Berwibawa, arsitektural, dan sangat teknis.
- Saat ragu, agent harus: Melakukan audit kode pada modul terkait sebelum memberikan rekomendasi.
- Jika ada konflik konteks, agent harus: Mengacu pada `ARCHITECTURE.md` sebagai standar tertinggi.

### 3.4 Escalation Rules
- Escalate jika: Menemukan celah keamanan pada core API atau regresi performa pada Next.js Turbopack.
- Jangan menebak jika: Terkait dengan integrasi LLM tingkat rendah.
- Minta konfirmasi hanya jika: Melakukan update mayor pada dependensi core.

## 4. Konteks Bisnis
- User utama: Internal Developers, Partners, Power Users.
- Use case utama: Orchestration of AI services, Data processing pipeline, Core UI components distribution.
- Terminologi domain: Sentra Core, Abyss Monorepo, Orchestration Layer, Turbopack.
- Constraint bisnis: Harus mendukung skalabilitas tinggi untuk melayani ribuan fasilitas kesehatan.
- Risiko bisnis: Kegagalan sistem core akan berdampak pada seluruh ekosistem Sentra.

## 5. Konteks Teknis
- Stack: Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion, GSAP.
- Arsitektur: Modern Micro-Frontend-ready Monolith Core.
- Service / module penting: `app/core`, `lib/orchestrator`, `components/shared`.
- Data flow ringkas: Request -> Core Gateway -> Service Orchestration -> Unified Response.
- Integrasi eksternal: Berbagai AI Providers (OpenAI, Anthropic, local-first fallback) via Orchestrator.
- Dependency kritis: `next`, `react`, `framer-motion`, `lucide-react`.

## 6. Struktur Repo
- Folder penting: `app/`, `components/`, `lib/`, `docs/`, `scripts/`, `public/`.
- File entry point: `app/layout.tsx`, `next.config.mjs`.
- File yang sering disentuh: `app/core/`, `lib/`, `components/shared/`.
- File yang dilarang diubah sembarangan: `next.config.mjs`, `tsconfig.json`.

## 7. Workflow Kerja
### 7.1 Setup
- Install: `npm install`
- Env var: `.env` (berdasarkan `.env.example`)
- Command bootstrap: `npm run dev:turbo`

### 7.2 Development
- Run app (turbo): `npm run dev:turbo`
- Run app (standard): `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Analyze: `npm run build` (with bundle analyzer enabled)

### 7.3 Release / Deploy
- Proses deploy: Vercel / Railway / Custom Infrastructure.
- Approval yang dibutuhkan: Chief (Dr. Ferdi).
- Checklist sebelum release: Bundle size audit, Turbopack build success.

## 8. Keputusan Penting
- 2026-03-16 - Migrasi ke Next.js 16 dan Tailwind 4 untuk performa maksimal.
- Penggunaan Turbopack sebagai default development engine untuk kecepatan iterasi.

## 9. Known Constraints
- Next.js 16 mungkin memiliki isu kompatibilitas dengan beberapa library React 18 legacy.
- Penggunaan memori tinggi saat build menggunakan Turbopack pada CI terbatas.

## 10. Known Issues / Tech Debt
- Beberapa modul lama masih perlu refactoring ke pola Server Components yang lebih efisien.

## 11. Open Questions
- Apakah akan memisahkan core menjadi package NPM internal yang terdistribusi?

## 12. Acceptance Criteria
- Output dianggap benar jika: Sistem core stabil, performa Lighthouse hijau, dan modul shared berfungsi di semua app.
- Test yang harus lolos: Build success & Typecheck clean.
- Sinyal selesai: Pull Request disetujui oleh Chief.

## 13. Change Log
- 2026-04-01 - Initial creation of PROJECT_CONTEXT.md.

## 14. JSON Snapshot
```json
{
  "project": {
    "name": "sentra-main",
    "id": "sentra-healthcare-core",
    "domain": "Healthcare AI Core Platform",
    "repo": "D:\\Devops\\abyss-monorepo\\app\\sentra-main",
    "owner": "Dr. Ferdi Iskandar (Chief)",
    "status": "active",
    "last_updated": "2026-04-01"
  },
  "objective": {
    "problem": "Healthcare AI system fragmentation and need for robust core infrastructure.",
    "desired_outcome": "Stable, high-performance orchestration core for all Sentra services.",
    "success_definition": "High uptime, seamless module integration, and easy service deployment.",
    "non_goals": ["Single end-user application focus"]
  },
  "agent_contract": {
    "must_do": [
      "Sapa sebagai Boss/Chief",
      "Next.js 16 / React 19 standards",
      "Tailwind 4 / Framer Motion usage",
      "Maintain core-logic compatibility"
    ],
    "must_not_do": [
      "Modify next.config.mjs without permission",
      "Ignore lint/typecheck errors",
      "Add hyper-specific business logic to core"
    ],
    "working_style": {
      "response_style": "Authoritative, Architectural, Highly Technical",
      "when_unsure": "Audit related code before suggesting",
      "conflict_policy": "ARCHITECTURE.md is the highest standard"
    },
    "escalation_rules": [
      "Core API security breaches",
      "Turbopack performance regressions"
    ]
  },
  "business_context": {
    "users": ["Internal Developers", "Partners"],
    "primary_use_cases": ["Service orchestration", "Data pipeline", "Shared components"],
    "terminology": {
      "Sentra Core": "Primary Platform Engine",
      "Turbopack": "Next.js Build Engine"
    },
    "business_constraints": ["High scalability requirements"],
    "business_risks": ["Core failure affects entire ecosystem"]
  },
  "technical_context": {
    "stack": ["Next.js 16", "React 19", "Tailwind 4", "GSAP"],
    "architecture": "Modern Micro-Frontend Monolith Core",
    "core_services": ["Orchestrator", "Gateway", "Shared UI"],
    "data_flow": ["Request -> Gateway -> Orchestration -> Response"],
    "external_integrations": ["OpenAI", "Anthropic", "local-first fallback"],
    "critical_dependencies": ["next", "react", "framer-motion"]
  },
  "repo_map": {
    "important_folders": ["app", "components", "lib", "docs"],
    "entry_points": ["app/layout.tsx", "next.config.mjs"],
    "frequently_changed_files": ["app/core/**", "lib/**"],
    "protected_files": ["next.config.mjs", "tsconfig.json"]
  },
  "workflow": {
    "setup": {
      "install": ["npm install"],
      "env_vars": [".env.example"],
      "bootstrap_commands": ["npm run dev:turbo"]
    },
    "development": {
      "run": ["npm run dev:turbo"],
      "build": ["npm run build"],
      "lint": ["npm run lint"]
    },
    "release": {
      "deploy_process": ["Vercel / Custom Infra"],
      "required_approvals": ["Chief"],
      "pre_release_checklist": ["Bundle audit", "Turbopack build pass"]
    }
  },
  "decisions": [
    {
      "date": "2026-03-16",
      "decision": "Migration to Next.js 16 and Tailwind 4"
    }
  ],
  "known_constraints": ["Next.js 16 compatibility issues", "CI memory usage"],
  "known_issues": ["Legacy module refactoring pending"],
  "open_questions": ["Distribute core as NPM package?"],
  "acceptance_criteria": ["System stability", "Green Lighthouse", "Functional shared modules"],
  "change_log": [
    {
      "date": "2026-04-01",
      "summary": "Initial creation"
    }
  ]
}
```
