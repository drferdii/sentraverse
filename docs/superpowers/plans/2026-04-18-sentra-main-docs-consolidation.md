# sentra-main documentation consolidation — implementation plan

Per **writing-plans**: this file is the implementation plan for documentation-only edits in `sentra-main`.

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align `ARCHITECTURE.md` and `docs/architecture.md` with the repository as verified in [`docs/specs/aadi-v2/2026-04-18-sentra-main-architecture-docs-truth-design.md`](../specs/2026-04-18-sentra-main-architecture-docs-truth-design.md).

**Architecture:** Keep **root `ARCHITECTURE.md`** as the canonical deep reference; make **`docs/architecture.md`** a short overview that links out and avoids duplicated, stale numbers.

**Tech Stack:** Markdown only; no application code changes required for this plan.

---

### Task 1: Fix factual SEO paths and sitemap wording in `ARCHITECTURE.md`

**Files:**

- Modify: [`ARCHITECTURE.md`](../../../ARCHITECTURE.md)

- [x] **Step 1:** Replace the sitemap table row that claims a fixed “8 routes” with a description that matches [`app/sitemap.ts`](../../../app/sitemap.ts): home, `/story`, `/insights`, one URL per entry in `articles` from [`app/insights/data.ts`](../../../app/insights/data.ts), `/privacy`, `/terms`. Example replacement text for the **Implementation** column:

  `Dynamic entries from app/sitemap.ts — home, story, insights index, one row per article in app/insights/data.ts, privacy, terms (count varies with articles array).`

- [x] **Step 2:** In the same SEO table, change Search Console verification path from `public/google22238cc24e0d1002.html` to `app/google22238cc24e0d1002.html` (static route in App Router).

- [x] **Step 3:** Add a row under **SEO Architecture** for `robots.ts`: note `https://sentrahai.com/robots.txt` and that `/dashboard` is **disallowed** for crawlers (see [`app/robots.ts`](../../../app/robots.ts)).

- [x] **Step 4:** In **Application Structure** (directory tree), update the `page.tsx` comment from “14 components” to **“15 components (Navbar … Footer)”** or add a footnote that the table counts **14 marketing sections** while the file imports **15** components — pick one convention and use it consistently in the Landing table intro sentence.

- [x] **Step 5:** Add a short **“Dashboard proxy”** bullet under deployment / platform notes (or after Technology Stack): when `SENTRA_DASHBOARD_URL` is set, `next.config.mjs` rewrites `/dashboard/:path*` to the dashboard origin; WebSocket upgrades may need edge/proxy configuration (see comments in [`next.config.mjs`](../../../next.config.mjs)).

- [ ] **Step 6:** Commit from repository root that tracks `sentra-main` (in some monorepos `apps/` is gitignored — commit locally as applicable):

```bash
git add apps/healthcare/sentra-main/ARCHITECTURE.md
git commit -m "docs(sentra-main): align ARCHITECTURE.md with sitemap, robots, and GSC path"
```

---

### Task 2: Replace stale `docs/architecture.md` with overview + links

**Files:**

- Modify: [`docs/architecture.md`](../architecture.md)

- [x] **Step 1:** Replace the entire file body with the version below (preserves frontmatter comment style if desired). This removes incorrect counts, fixes the ADR link, records Playwright / bundle-analyzer / CSP as present, and points readers to root `ARCHITECTURE.md` for detail.

```markdown
<!-- Architected and built by Classy. -->

# Architecture Documentation — Sentra AI Landing Site

_Last updated: 2026-04-18_

> **Canonical deep-dive:** [`ARCHITECTURE.md`](../ARCHITECTURE.md) (repository root).  
> **ADR:** [`ADR-001-nextjs-app-router.md`](./ADR-001-nextjs-app-router.md).  
> **Docs vs code audit:** [`superpowers/specs/2026-04-18-sentra-main-architecture-docs-truth-design.md`](./superpowers/specs/2026-04-18-sentra-main-architecture-docs-truth-design.md).

---

## Overview

The Sentra marketing site (**sentrahai.com**) is a **Next.js 16** App Router application with **React 19**, **Tailwind CSS v4** (`@theme` in `app/globals.css`), **Framer Motion**, and **GSAP**. There is no first-party database or authenticated API in this app; insights copy lives in `app/insights/data.ts`.

For the full route map, landing page composition (15 components in `app/page.tsx`), SentraSim state model, design tokens, SEO (JSON-LD, sitemap, OG images), and security headers, read **[`ARCHITECTURE.md`](../ARCHITECTURE.md)**.

---

## Technology decisions

Formal record: **[`docs/ADR-001-nextjs-app-router.md`](./ADR-001-nextjs-app-router.md)**.

---

## Tooling (verified in repo)

| Area | Location |
|------|-----------|
| E2E | `npm run test:e2e` — `playwright.config.ts`, `e2e/` |
| Bundle analysis | `@next/bundle-analyzer` in `package.json` devDependencies |
| Security headers + CSP | `next.config.mjs` `headers()` — details in `SECURITY.md` |
| Dashboard reverse proxy | `next.config.mjs` `rewrites()` when `SENTRA_DASHBOARD_URL` is set |

---

## Open improvement ideas (not yet implemented)

- OpenTelemetry or exported Web Vitals pipelines  
- Further React Server Component adoption for static slices (per ADR mitigations)  
- Lazy-loading the heaviest client-only sections if bundle budgets tighten  

---

_Architected and built by Classy._
```

- [ ] **Step 2:** Commit (paths depend on repo layout):

```bash
git add apps/healthcare/sentra-main/docs/architecture.md
git commit -m "docs(sentra-main): refresh docs/architecture.md as overview with correct links"
```

---

### Task 3: Mark design spec definition-of-done (optional)

**Files:**

- Modify: [`docs/specs/aadi-v2/2026-04-18-sentra-main-architecture-docs-truth-design.md`](../specs/2026-04-18-sentra-main-architecture-docs-truth-design.md)

- [x] **Step 1:** In section **7. Definition of done**, change each `- [ ]` to `- [x]` once Tasks 1–2 are merged.

- [ ] **Step 2:** Commit:

```bash
git add apps/healthcare/sentra-main/docs/specs/aadi-v2/2026-04-18-sentra-main-architecture-docs-truth-design.md
git commit -m "docs(sentra-main): check off docs-truth definition of done"
```

---

### Task 4: Verify

- [x] **Step 1:** Open `ARCHITECTURE.md` and confirm no remaining `public/google22238cc24e0d1002.html` reference and no fixed “8 routes” claim without dynamic explanation.

- [ ] **Step 2:** Click-test relative links from `docs/architecture.md` to `ARCHITECTURE.md`, ADR, and the spec file in the IDE or GitHub UI.
