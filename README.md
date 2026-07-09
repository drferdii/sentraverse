<div align="center">

# Sentraverse

### _Official website of Sentra Healthcare AI — clinical decision support for Indonesian primary care_

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square)](https://gsap.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](./LICENSE)

**[sentrahai.com](https://sentrahai.com)** &nbsp;·&nbsp;
**[Report a Bug](https://github.com/drferdii/sentraverse/issues)** &nbsp;·&nbsp;
**[Request a Feature](https://github.com/drferdii/sentraverse/issues)**

</div>

---

## Overview

**Sentraverse** is the marketing and product hub for **Sentra Healthcare AI** —
an AI-powered clinical decision support platform built for Indonesian primary
care (Puskesmas, klinik pratama, and referral hospitals). The site presents the
Sentra product ecosystem through a scroll-driven, editorial dark experience:
pinned GSAP storytelling, live clinical simulations, and a structured knowledge
base.

Founded and developed by **dr. Ferdi Iskandar** at RSIA Melinda DHAI, Kediri,
under one uncompromising principle: **Guided by Human Insight, Powered by
Artificial Intelligence.**

## Pages

| Route                 | Description                                                                             |
| --------------------- | --------------------------------------------------------------------------------------- |
| `/`                   | Landing — hero with live Audrey consultation, ecosystem, SentraSim, clinical suite, FAQ |
| `/story`              | Founder & product story with animated milestones                                        |
| `/insights`           | Clinical-AI editorial articles                                                          |
| `/sentrapedia`        | Clinical reference — 144 diseases for primary care                                      |
| `/ekosistem`          | Product ecosystem & real application catalog per domain                                 |
| `/sentrawiki`         | Knowledge base — architecture, crown-jewel engines, governance ("paper" theme)          |
| `/privacy` · `/terms` | Legal                                                                                   |

## Highlights

- **Scroll-driven storytelling** — GSAP ScrollTrigger pins, scrubs, and a custom
  lerp smooth-scroll, all `prefers-reduced-motion`-aware where it matters
- **Editorial dark design system** — single accent, thin-border cards,
  mac-window chrome, line-dot-line signature; tokens governed in
  `lib/design-governance.ts` + `app/globals.css`
- **Scoped theming** — light "paper" sections (`[data-wiki-paper]`) inside a
  dark-only site without global theme switching
- **SEO-complete** — dynamic sitemap, robots, OpenGraph images, JSON-LD,
  llms.txt

## Tech Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
GSAP + ScrollTrigger · Framer Motion · Playwright (e2e)

## Getting Started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # serve production build
pnpm lint       # eslint
```

## Project Structure

```
app/            # App Router pages (/, story, insights, sentrapedia, ekosistem, sentrawiki, legal)
components/     # Feature components + per-feature folders (sentrasim/, sentrawiki/, ui/, …)
lib/            # design-governance tokens, site-links, smooth-scroll, utils
public/         # static assets
docs/           # documentation index — see docs/README.md
e2e/            # Playwright smoke tests
```

Full documentation index: [`docs/README.md`](./docs/README.md) · Architecture
deep-dive: [`ARCHITECTURE.md`](./ARCHITECTURE.md)

## Medical Disclaimer

Sentra AI functions as a **clinical decision support system** — an aid to
clinical decision-making. It does not replace professional medical judgment and
is not registered as a medical device. All diagnostic, therapeutic, and
follow-up decisions remain the full responsibility of licensed medical
professionals.

## License

[ISC](./LICENSE) © 2026 Sentra Healthcare Solutions

## Contact

**dr. Ferdi Iskandar** — Founder & CEO, Sentra Healthcare AI 📧
[drferdiiskandar@sentrahai.com](mailto:drferdiiskandar@sentrahai.com) · 📍
Melinda Advanced Technology Laboratory, RSIA Melinda DHAI, Kediri, Jawa Timur,
Indonesia
