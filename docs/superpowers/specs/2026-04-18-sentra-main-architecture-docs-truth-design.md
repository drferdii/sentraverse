# Design Spec: sentra-main architecture documentation (docs vs code truth)

**Date:** 2026-04-18  
**Scope:** Documentation accuracy and single canonical source for high-level architecture of `@the-abyss/sentra-main` (sentrahai.com marketing site).  
**Out of scope:** Application refactors, bundle optimization, new features.

---

## 1. Canonical documentation policy

| Role | Document | Policy |
|--------|-----------|--------|
| **Canonical (detailed)** | [`ARCHITECTURE.md`](../../../ARCHITECTURE.md) (repo root) | Primary narrative: stack, routes, sections, SentraSim/ClinicalTrajectory, SEO, headers. Update when behavior changes. |
| **Secondary (short overview)** | [`docs/architecture.md`](../../architecture.md) | Either kept in sync with root **or** reduced to a short abstract + links to `ARCHITECTURE.md`, `docs/ADR-001-nextjs-app-router.md`, and this spec. Avoid duplicating version numbers and file sizes. |
| **Decisions** | [`docs/ADR-001-nextjs-app-router.md`](../../ADR-001-nextjs-app-router.md) | Formal ADR; link from `docs/architecture.md` must use **correct path** (no non-existent `./adr/` directory). |

---

## 2. Route and SEO inventory (code as source of truth)

| Route / artifact | Evidence in repo |
|------------------|------------------|
| `/` | [`app/page.tsx`](../../../app/page.tsx) |
| `/story` | [`app/story/page.tsx`](../../../app/story/page.tsx) |
| `/insights` | [`app/insights/page.tsx`](../../../app/insights/page.tsx) |
| `/insights/[slug]` | [`app/insights/[slug]/page.tsx`](../../../app/insights/[slug]/page.tsx); slugs from [`app/insights/data.ts`](../../../app/insights/data.ts) |
| `/privacy` | [`app/privacy/page.tsx`](../../../app/privacy/page.tsx) |
| `/terms` | [`app/terms/page.tsx`](../../../app/terms/page.tsx) |
| `/dashboard/*` (proxied) | [`next.config.mjs`](../../../next.config.mjs) `rewrites()` when `SENTRA_DASHBOARD_URL` set; not a `page.tsx` in this app |
| `/sitemap.xml` | [`app/sitemap.ts`](../../../app/sitemap.ts) |
| `/robots.txt` | [`app/robots.ts`](../../../app/robots.ts) — disallows `/dashboard` paths |
| OG images | [`app/opengraph-image.tsx`](../../../app/opengraph-image.tsx), [`app/story/opengraph-image.tsx`](../../../app/story/opengraph-image.tsx) |
| Google Search Console HTML | [`app/google22238cc24e0d1002.html`](../../../app/google22238cc24e0d1002.html) (App Router static route), **not** under `public/` |
| `llms.txt` | [`public/llms.txt`](../../../public/llms.txt) |

**Sitemap URL count (2026-04-18):** `app/sitemap.ts` returns **9** `MetadataRoute.Sitemap` objects for the current `articles` array (**4** slugs): fixed URLs for `/`, `/story`, `/insights`, `/privacy`, `/terms` plus one entry per article. Root `ARCHITECTURE.md` previously stated “8 routes”; that count was **incorrect** for this codebase state.

---

## 3. Landing page section inventory (code as source of truth)

Order in [`app/page.tsx`](../../../app/page.tsx) — **15** imported components rendered under `<main>`:

1. Navbar  
2. Hero  
3. ProjectSlider  
4. About  
5. Clients  
6. SentraSim  
7. Showcase  
8. Services  
9. Audrey  
10. ClinicalTrajectory  
11. News  
12. ScrollGallery  
13. FAQ  
14. CTA  
15. Footer  

Root [`ARCHITECTURE.md`](../../../ARCHITECTURE.md) states “14 components” for the landing composition (likely counting **sections** while pairing CTA+Footer conceptually); the **literal** import/render count is **15**. `docs/architecture.md` claiming “13 section components” is **stale** relative to both.

**`ClinicalPrognosis.tsx`:** exists under `components/`; used inside `ClinicalTrajectory` per root `ARCHITECTURE.md`; **not** a top-level sibling on the home page.

---

## 4. Component file sizes (KB, Windows disk, 2026-04-18)

| File | Approx KB | `ARCHITECTURE.md` table |
|------|-------------|-------------------------|
| SentraSim.tsx | 57.1 | 57.1 ✓ |
| ClinicalPrognosis.tsx | 28.5 | 28.5 ✓ |
| ClinicalTrajectory.tsx | 27.5 | 27.5 ✓ |
| Audrey.tsx | 21.3 | 21.3 ✓ |
| Hero.tsx | 20.4 | 19.4 — **drift** (rounding / line endings) |
| Clients.tsx | 13.0 | 13.0 ✓ |
| ui/sentra-kinetic-nav.tsx | 12.8 | 12.8 ✓ |
| Services.tsx | 6.9 | 6.9 ✓ |
| Footer.tsx | 6.0 | 6.0 ✓ |
| FAQ.tsx / News.tsx | 4.6 each | News 3.7 — **drift** for News |
| Navbar.tsx | 3.2 | 3.2 ✓ |
| About.tsx | 3.4 | 3.4 ✓ |
| ProjectSlider.tsx | 2.2 | 2.0 — minor **drift** |
| Showcase / CTA | 2.0 | ✓ |
| ScrollGallery.tsx | 0.3 | 0.3 ✓ |

---

## 5. Drift matrix (documentation vs code)

> **Reconciliation note (2026-04-18):** Rows below record the original audit findings. `ARCHITECTURE.md`, `docs/architecture.md`, `README.md`, `CHANGELOG.md` (including `[1.0.0]` landing/SEO/**Published Articles**), `docs/TESTING.md`, `docs/API.md`, and `docs/PRIVACY.md` have been updated to match the codebase; keep this matrix as the historical evidence trail.

| ID | Claim / location | Code / config truth | Status |
|----|------------------|----------------------|--------|
| D1 | `ARCHITECTURE.md` SEO: “8 routes” in sitemap | `sitemap.ts` builds **9** entries with current `articles` (4 slugs) | **Stale** — replace with rule-based description |
| D2 | `ARCHITECTURE.md` Search Console file path `public/google22238cc24e0d1002.html` | File at `app/google22238cc24e0d1002.html` | **Wrong path** |
| D3 | `docs/architecture.md` “imports all **13** section components” | `app/page.tsx` imports and renders **15** components | **Stale** |
| D4 | `docs/architecture.md` component tree omits FAQ, ClinicalTrajectory; SentraSim “~22KB” | FAQ + ClinicalTrajectory on page; SentraSim ~57KB | **Stale** |
| D5 | `docs/architecture.md` `ui/` list omits `morphing-cursor.tsx`, `text-scramble.tsx` | Both exist under `components/ui/` | **Incomplete** |
| D6 | `docs/architecture.md` `lib/` only `utils.ts` | Also [`lib/site-links.ts`](../../../lib/site-links.ts) | **Incomplete** |
| D7 | `docs/architecture.md` link “Architecture Decision Records `./adr/`” | No `docs/adr/` folder; ADR is [`docs/ADR-001-nextjs-app-router.md`](../../ADR-001-nextjs-app-router.md) | **Broken / wrong** |
| D8 | `docs/architecture.md` Future: Playwright, bundle-analyzer, CSP | `package.json`: `test:e2e`, `@next/bundle-analyzer`; `next.config.mjs`: full `headers()` + CSP | **Stale** |
| D9 | `docs/architecture.md` SentraSim tokens “scoped to `[data-sentra-sim]`” only | `--sdx-*` defined on **`:root`** in `globals.css`; `[data-sentra-sim]` used for scoped reset | **Ambiguous / imprecise** |
| D10 | `ARCHITECTURE.md` `siteLinks` snippet | Matches [`lib/site-links.ts`](../../../lib/site-links.ts) (ordering differs; keys equivalent) | **OK** (prefer pointing to file vs duplicating) |
| D11 | `ARCHITECTURE.md` Navbar “Get Started” | Separate `Link` to `siteLinks.contact` with label “Get Started” | **OK** |
| D12 | `robots.txt` disallow `/dashboard` | Not documented in root SEO table | **Gap** (optional row) |
| D13 | `next.config.mjs` dashboard rewrite + WebSocket caveat | Documented in `next.config.mjs` comments; root `ARCHITECTURE.md` does not summarize `/dashboard` proxy | **Gap** (cross-link from architecture doc to deploy docs) |
| D14 | `ARCHITECTURE.md` “14 components” for landing | [`app/page.tsx`](../../../app/page.tsx) has **15** component nodes | **Ambiguous** — clarify “14 sections” vs “15 components” or update count |

---

## 6. Prioritized remediation (documentation only)

1. **P0 — Fix factual errors:** D2 (Search Console path), D1 (sitemap counts), D7 (ADR link).  
2. **P1 — Refresh `docs/architecture.md`:** D3–D9; align with canonical `ARCHITECTURE.md` or slim down to abstract + links.  
3. **P2 — Enhance `ARCHITECTURE.md`:** D12, D13; optionally remove fragile KB tables or add “approximate / as of DATE” disclaimer.  
4. **P2 — Related docs:** [`docs/API.md`](../../API.md) sitemap section and [`docs/PRIVACY.md`](../../PRIVACY.md) Search Console path were aligned on **2026-04-18** (same drift class as D1/D2).

---

## 7. Definition of done

- [x] No broken link from `docs/architecture.md` to missing `docs/adr/`.  
- [x] Sitemap description matches `sitemap.ts` algorithm (dynamic articles + fixed routes).  
- [x] Search Console verification path matches `app/google22238cc24e0d1002.html`.  
- [x] Section count and component list match `app/page.tsx`.  
- [x] “Future improvements” in `docs/architecture.md` either removed or split into **open** vs **done** with evidence paths.

---

## 8. Spec self-review (2026-04-18)

- **Placeholders:** None intentional; article count verified via `slug:` occurrences in `data.ts` (4 articles).  
- **Consistency:** Canonical policy avoids duplicate version matrices in two files once `docs/architecture.md` is slimmed or synced.  
- **Scope:** Docs-only; no application behavior change required for this spec.

---

## 9. Chief review gate

Spec path: `docs/specs/aadi-v2/2026-04-18-sentra-main-architecture-docs-truth-design.md`

P0/P1 documentation updates from [`docs/guides/implementation-plans/2026-04-18-sentra-main-docs-consolidation.md`](../plans/2026-04-18-sentra-main-docs-consolidation.md) (Tasks 1–2) were applied in-repo on **2026-04-18**. Chief may still request copy edits or scope changes; update this spec and the two markdown sources accordingly.
