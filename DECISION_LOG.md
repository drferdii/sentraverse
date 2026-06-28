# Decision Log — Sentra AI (sentra-main)

_Architected and built by Classy — Sentra Healthcare Solutions © 2025–2026_

> Formal ADR: [`docs/ADR-001-nextjs-app-router.md`](./docs/ADR-001-nextjs-app-router.md)

---

## [2026-03-15] — Next.js 16 App Router over plain React + Vite

**Status:** Decided
**Decider:** Classy (Principal Architect)
**Context:** Sentra-main needs rich SEO (JSON-LD, OG metadata, sitemap), image optimisation, and font loading with zero layout shift — requirements that are difficult to satisfy well with a Vite SPA.
**Decision:** Next.js 16 with App Router and React 19.
**Rationale:** `next/image` handles WebP conversion and lazy loading automatically. `next/font/google` eliminates font layout shift. App Router `Metadata` API centralises SEO in one place. Security headers via `headers()` in `next.config.mjs` are applied at the framework level — no middleware needed.
**Consequences:** All components must be `"use client"` due to Framer Motion dependency. No React Server Components benefit currently, but the path to RSC migration is preserved. See ADR-001 for full trade-off analysis.

---

## [2026-03-15] — Tailwind CSS v4 with CSS-native `@theme` (no `tailwind.config.ts`)

**Status:** Decided
**Decider:** Classy
**Context:** Tailwind v3 requires a JS config file for custom tokens. The team wanted design tokens accessible both in CSS and directly as CSS custom properties in Framer Motion `style={}` props without importing a JS module.
**Decision:** Tailwind CSS v4 with all tokens defined in `app/globals.css` via the `@theme { }` directive and `:root { }`.
**Rationale:** CSS custom properties (`var(--sentra-accent)`) are directly usable in inline styles, Framer Motion motion values, and SVG attributes. No JS import needed. Build is faster than v3. Zero `tailwind.config.ts` to maintain.
**Consequences:** No `tailwind.config.ts` exists in the repository — this is intentional, not an oversight. All token additions go in `app/globals.css`.

---

## [2026-03-15] — Framer Motion for component animations + GSAP for scroll sequences

**Status:** Decided
**Decider:** Classy
**Context:** Two distinct animation patterns exist in the site: (1) component-level enter/exit animations triggered by scroll or interaction, and (2) complex scroll-driven sequences tied to scroll position.
**Decision:** Framer Motion for pattern (1), GSAP for pattern (2).
**Rationale:** Framer Motion's `useInView`, `AnimatePresence`, and motion values are the cleanest API for scroll-triggered reveals and conditional animations. GSAP ScrollTrigger is more powerful for pixel-perfect scroll scrubbing in `ScrollGallery`. Using both keeps each library in its strength zone.
**Consequences:** Both libraries are in the client bundle. Total animation cost: ~120 KB gzipped. Acceptable for a marketing site where visual quality is the primary metric.

---

## [2026-03-15] — SentraSim: 21+ `useState` hooks, no external state manager

**Status:** Decided
**Decider:** Classy
**Context:** SentraSim implements a multi-step async clinical simulation with ~19 distinct state variables tracking simulation progress, panel visibility, and content reveal state.
**Decision:** All state is local `useState` within the component. No Redux, Zustand, or Jotai.
**Rationale:** The simulation is entirely self-contained — no other component reads or writes this state. A global state library would add dependencies and cognitive overhead for zero shared-state benefit. The 21+ hooks are complex but all scoped to one 57.1 KB file.
**Consequences:** `SentraSim` cannot be split across multiple components without significant refactor. Acceptable: it is a showcase component, not a reusable primitive.

---

## [2026-03-15] — Static articles in `data.ts` (not MDX or a CMS)

**Status:** Decided
**Decider:** Classy
**Context:** The site needs an Insights section with long-form clinical articles. Options: MDX files, a headless CMS (Contentful/Sanity), or a plain TypeScript data file.
**Decision:** All articles stored as TypeScript objects in `app/insights/data.ts`.
**Rationale:** At 3 articles, CMS overhead is not justified. MDX adds a build plugin and reader complexity. A plain `articles: Article[]` array with `getArticle(slug)` is type-safe, zero-dependency, and editable by anyone with TypeScript knowledge. Migrate to MDX or CMS when article count exceeds 20.
**Consequences:** Content edits require a code change and deployment. No live preview. Acceptable at current scale.

---

## [2026-03-15] — OWASP security headers applied via `next.config.mjs`

**Status:** Decided
**Decider:** Classy
**Context:** A marketing site with no auth or database still benefits from a security baseline — particularly CSP, HSTS, and clickjacking protection.
**Decision:** All OWASP headers applied globally via the `headers()` async function in `next.config.mjs`.
**Rationale:** Framework-level header injection is more reliable than middleware and applies to all routes including statically rendered pages. `X-Frame-Options: DENY` prevents the site from being embedded in malicious iframes. HSTS with `preload` ensures HTTPS-only access after first visit.
**Consequences:** `unsafe-inline` and `unsafe-eval` are currently required by Next.js and Framer Motion respectively. A nonce-based CSP is on the roadmap to eliminate these.

---

## [2026-01-15] — Package name `"sentra"` (not `"sentra-main"`)

**Status:** Decided
**Decider:** Classy
**Context:** The monorepo folder is named `sentra-main` for organisational clarity (alongside `sentra-assist`, `sentra-portal`, etc.). The `package.json` `name` field could either mirror the folder name or reflect the product identity.
**Decision:** `"name": "sentra"` in `package.json`.
**Rationale:** This is the primary brand website — `"sentra"` accurately reflects its role. `"sentra-main"` is a monorepo organisational convention, not a product identity. The package name matters for workspace references; `"sentra"` is cleaner for `pnpm --filter sentra` commands.
**Consequences:** None — the folder name (`sentra-main`) and package name (`sentra`) intentionally differ. Not an error.

---

## [2026-01-15] — `public/llms.txt` for LLM crawler discoverability

**Status:** Decided
**Decider:** Classy
**Context:** LLM-powered search engines and AI assistants use crawlers that read plain-text files for site context. The `robots.txt` convention does not cover this use case well.
**Decision:** Add `public/llms.txt` with a concise, structured plain-text summary of Sentra's products, metrics, team, and contact.
**Rationale:** Improves the accuracy of AI-generated summaries about Sentra across search and LLM surfaces. Low cost — a single static file. Follows the emerging `llms.txt` convention.
**Consequences:** Content in `llms.txt` must be kept in sync with the site. Currently manually maintained.

---

_Architected and built by Classy — Sentra Healthcare Solutions © 2025–2026_
