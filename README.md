<div align="center">

# Sentraverse

### _Official website of Sentra Healthcare AI — clinical decision support for Indonesian primary care_

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=flat-square)](https://gsap.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-BB4BFF?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Playwright](https://img.shields.io/badge/Playwright-e2e-2EAD33?style=flat-square&logo=playwright)](https://playwright.dev/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](./LICENSE)

**[sentrahai.com](https://sentrahai.com)** &nbsp;·&nbsp;
**[Report a Bug](https://github.com/drferdii/sentraverse/issues)** &nbsp;·&nbsp;
**[Request a Feature](https://github.com/drferdii/sentraverse/issues)**

<br/>

> _Guided by Human Insight, Powered by Artificial Intelligence._

</div>

---

## Table of Contents

1. [Overview](#1-overview)
2. [Pages](#2-pages)
3. [Homepage Sections](#3-homepage-sections)
4. [Key Features](#4-key-features)
5. [Design System](#5-design-system)
6. [Tech Stack](#6-tech-stack)
7. [Project Structure](#7-project-structure)
8. [Getting Started](#8-getting-started)
9. [Scripts](#9-scripts)
10. [Configuration](#10-configuration)
11. [Testing](#11-testing)
12. [SEO & Discoverability](#12-seo--discoverability)
13. [Documentation](#13-documentation)
14. [Medical Disclaimer](#14-medical-disclaimer)
15. [License](#15-license)
16. [Contact](#16-contact)

---

## 1. Overview

**Sentraverse** is the marketing and product hub for **Sentra Healthcare AI** —
an AI-powered clinical decision support (CDSS) platform built for Indonesian
primary care: Puskesmas, klinik pratama, and referral hospitals. The site
presents the Sentra product ecosystem through a scroll-driven, editorial dark
experience — pinned GSAP storytelling, a live clinical simulation, a 144-disease
clinical reference, and a structured knowledge base.

The site communicates a single thesis: fragmented patient data, manual
administrative burden, and slow clinical decision-making are solvable problems —
and Sentra's engine suite is engineered specifically for Indonesia's national
healthcare ecosystem (SATUSEHAT, BPJS P-Care, SIMRS).

Founded and developed by **dr. Ferdi Iskandar** at RSIA Melinda DHAI, Kediri,
under one uncompromising principle: **Guided by Human Insight, Powered by
Artificial Intelligence.**

## 2. Pages

| Route                 | Rendering | Description                                                                                                                      |
| --------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `/`                   | Static    | Landing — 15-section scroll experience (see [Homepage Sections](#3-homepage-sections))                                           |
| `/story`              | Static    | Founder & product story — animated milestones, product timeline, roadmap                                                         |
| `/insights`           | Static    | Clinical-AI editorial — Substack-style article index (canonical articles on Medium/Substack)                                     |
| `/sentrapedia`        | Static    | Clinical reference — **144 diseases** for primary care with search, category filter, and slide-in detail panel                   |
| `/ekosistem`          | Static    | Product ecosystem — 14 Sentra products with status filter, plus real application catalog per domain                              |
| `/sentrawiki`         | Static    | Knowledge base — Abyss architecture, five crown-jewel engines, governance & compliance, rendered on a scoped light "paper" theme |
| `/privacy` · `/terms` | Static    | Legal pages                                                                                                                      |
| `/api/*`              | Edge/Node | Supporting API routes (medical knowledge, assistant integrations)                                                                |

## 3. Homepage Sections

Rendered in order on `/` (`app/page.tsx`):

| #   | Section            | What it does                                                                                                 |
| --- | ------------------ | ------------------------------------------------------------------------------------------------------------ |
| 1   | **Hero**           | Rotating headline keyword (GSAP), count-up metrics, live 4-phase Audrey consultation card, ambient scan-line |
| 2   | **ProjectSlider**  | Full-bleed clinical footage                                                                                  |
| 3   | **AboutSentra**    | Platform introduction                                                                                        |
| 4   | **About**          | Manifesto — light plate, GSAP draw-in rules, Asclepius clock mark                                            |
| 5   | **Ecosystem**      | Horizontally-pinned product cards (GSAP scrub) with typing subtitle                                          |
| 6   | **Clients**        | Technology & institution marks                                                                               |
| 7   | **SentraSim**      | Embedded clinical screen simulation with live code terminal                                                  |
| 8   | **Interlude**      | Static breather between the two pinned sequences                                                             |
| 9   | **BlueprintStory** | Pinned multi-scene blueprint narrative (AADI, console, trajectory)                                           |
| 10  | **Showcase**       | Orchestration agents & thinking-stack terminal                                                               |
| 11  | **Services**       | Service accordion                                                                                            |
| 12  | **ClinicalSuite**  | Tabbed clinical workspace — triage, trajectory, prognosis                                                    |
| 13  | **ScrollGallery**  | Scroll-driven imagery                                                                                        |
| 14  | **FAQ**            | 12 questions, two-column, cream plate, JSON-LD FAQPage                                                       |
| 15  | **Footer**         | Acid-yellow plate — giant brand mark, contact, waiting list, stewardship & medical disclaimer                |

## 4. Key Features

- **Scroll-driven storytelling** — GSAP ScrollTrigger pins, scrubs, and
  timelines; `anticipatePin` + `invalidateOnRefresh` discipline throughout
- **Custom lerp smooth-scroll** — wheel smoothing (`lerp 0.15`, delta caps)
  ported from the founder's portfolio; touch devices, keyboard, and scrollbar
  stay native; ScrollTrigger-safe (drives real `window.scrollTo`)
- **Editorial dark design system** — single accent, thin-border cards,
  mac-window chrome, corner ticks, line-dot-line signature divider
- **Scoped theming without a theme switch** — light "paper" scopes
  (`[data-wiki-paper]` cream/navy for SentraWiki; hardcoded plates for
  About/FAQ/Footer) inside a permanently dark site
- **Live clinical simulations** — 4-phase Audrey consultation flow (Puskesmas →
  Sp.JP consult → EKG confirmation → hospital referral) and SentraSim embedded
  screen
- **Accessibility-aware motion** — entrance animations honor
  `prefers-reduced-motion`; scrub-driven motion follows the user's own scroll

## 5. Design System

Tokens are governed centrally — `app/globals.css` (CSS custom properties +
Tailwind `@theme`) and `lib/design-governance.ts` (layout & typography
governance).

| Token              | Value                 | Role                                    |
| ------------------ | --------------------- | --------------------------------------- |
| `--sentra-bg`      | `#1e1e1e`             | Site background (dark-only)             |
| `--sentra-fg`      | `#b7ab98`             | Foreground ink                          |
| `--sentra-accent`  | `#eb5939`             | The single accent (red-orange)          |
| `--sentra-primary` | `#4a7bb5`             | Oxford blue, lifted for dark legibility |
| Paper scope        | `#f2ebe0` / `#002147` | SentraWiki cream plate / navy ink       |
| Footer plate       | `#e9fb5b` / `#111111` | Intentional acid-yellow brand anomaly   |

Layout: 1440px container, `px-6/12` gutters, four section-rhythm steps
(`compact/standard/spacious/hero`). Typography: Plus Jakarta Sans (UI), Inter
(body), Georgia serif (editorial display), 16px body.

## 6. Tech Stack

| Layer     | Technology                                           |
| --------- | ---------------------------------------------------- |
| Framework | Next.js **16.2** (App Router, webpack), React **19** |
| Language  | TypeScript **5.9** (strict)                          |
| Styling   | Tailwind CSS **v4** (`@theme`, zero-config)          |
| Animation | GSAP **3.14** + ScrollTrigger, Framer Motion **12**  |
| Testing   | Playwright (e2e smoke)                               |
| Runtime   | Node.js 22+, pnpm                                    |

## 7. Project Structure

```
sentraverse/
├── app/
│   ├── page.tsx               # Landing (15 sections)
│   ├── layout.tsx             # Root layout — fonts, JSON-LD, SmoothScrollProvider
│   ├── globals.css            # Design tokens, scoped themes, keyframes
│   ├── story/                 # Founder & product story
│   ├── insights/              # Editorial index + article data
│   ├── sentrapedia/           # 144-disease clinical reference
│   ├── ekosistem/             # Product ecosystem catalog
│   ├── sentrawiki/            # Knowledge base (paper theme)
│   ├── privacy/ · terms/      # Legal
│   ├── api/                   # Supporting API routes
│   ├── sitemap.ts · robots.ts # SEO conventions
│   └── opengraph-image.tsx    # Generated OG image
├── components/
│   ├── *.tsx                  # Section components (Hero, Ecosystem, SentraSim, …)
│   ├── blueprint-story/       # Pinned blueprint scenes
│   ├── sentrasim/             # Simulation columns, code terminal, sequence
│   ├── sentrapedia/           # Disease dataset + helpers
│   ├── sentrawiki/            # Engine cards, engine graph, doc library
│   ├── ekosistem/             # Product & application data
│   └── ui/                    # Primitives — reveal, sketch-lines, kinetic nav, …
├── lib/
│   ├── design-governance.ts   # Layout & typography governance tokens
│   ├── use-smooth-scroll.ts   # Custom lerp wheel-smoothing hook
│   ├── site-links.ts          # Single source of truth for internal links
│   └── utils.ts               # cn() helper
├── docs/                      # Documentation — see docs/README.md
├── e2e/                       # Playwright smoke tests
└── public/                    # Static assets (~2 MB, pruned)
```

## 8. Getting Started

**Prerequisites:** Node.js ≥ 22, pnpm ≥ 9.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Production:

```bash
pnpm build
pnpm start
```

## 9. Scripts

| Script           | Command                | Purpose                        |
| ---------------- | ---------------------- | ------------------------------ |
| `pnpm dev`       | `next dev --webpack`   | Development server             |
| `pnpm dev:turbo` | `next dev --turbopack` | Development server (Turbopack) |
| `pnpm build`     | `next build --webpack` | Production build               |
| `pnpm start`     | `next start`           | Serve production build         |
| `pnpm lint`      | `eslint .`             | Lint                           |
| `pnpm test:e2e`  | `playwright test`      | End-to-end smoke tests         |

## 10. Configuration

Environment variables (all optional — the site runs with zero configuration):

| Variable                      | Scope  | Purpose                                                                                                                        |
| ----------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_PILOT_LOGIN_URL` | Client | "Tes Pilot Login" CTA target. Validated against an allow-list of `sentrahai.com` hosts; falls back to `/dashboard`             |
| `SENTRA_DASHBOARD_URL`        | Server | When set, `next.config.mjs` rewrites `/dashboard/:path*` to that origin so the marketing host can front the clinical dashboard |

## 11. Testing

```bash
pnpm test:e2e     # Playwright smoke suite (e2e/smoke.spec.ts)
```

Every change is also gated by `pnpm lint` and a full `pnpm build` (strict
TypeScript) before commit.

## 12. SEO & Discoverability

- Dynamic `sitemap.xml` (`app/sitemap.ts`) and `robots.txt` (`app/robots.ts`,
  disallows `/dashboard`)
- Generated OpenGraph images for the site and `/story`
- JSON-LD structured data — Organization, Person (founder), FAQPage
- `public/llms.txt` for AI crawlers
- Google Search Console verification file

## 13. Documentation

| Document                                                   | Content                            |
| ---------------------------------------------------------- | ---------------------------------- |
| [`docs/README.md`](./docs/README.md)                       | Documentation index (categorized)  |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md)                     | Architecture deep-dive             |
| [`docs/design-governance.md`](./docs/design-governance.md) | Spacing, typography, density rules |
| [`docs/ai-governance.md`](./docs/ai-governance.md)         | Clinical-AI governance             |
| [`CHANGELOG.md`](./CHANGELOG.md)                           | Release history                    |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md)                     | Contribution workflow              |
| [`SECURITY.md`](./SECURITY.md)                             | Security policy                    |

## 14. Medical Disclaimer

Sentra AI functions as a **clinical decision support system** — an aid to
clinical decision-making. It does not replace professional medical judgment and
is not registered as a medical device. All diagnostic, therapeutic, and
follow-up decisions remain the full responsibility of licensed medical
professionals.

## 15. License

[ISC](./LICENSE) © 2026 Sentra Healthcare Solutions

## 16. Contact

**dr. Ferdi Iskandar** — Founder & CEO, Sentra Healthcare AI

📧 [drferdiiskandar@sentrahai.com](mailto:drferdiiskandar@sentrahai.com) 📍
Melinda Advanced Technology Laboratory, RSIA Melinda DHAI, Kediri, Jawa Timur,
Indonesia 🌐 [sentrahai.com](https://sentrahai.com) ·
[@sentraai](https://instagram.com/sentraai)
