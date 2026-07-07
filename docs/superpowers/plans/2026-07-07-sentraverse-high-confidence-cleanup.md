# Sentraverse High-Confidence Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove high-confidence dead code from `@the-abyss/sentraverse` without
changing route behavior or UI output.

**Architecture:** Keep the cleanup app-scoped and behavior-neutral. Prefer
direct deletion of provably unused imports, variables, and file-local
declarations over structural refactors. Use static evidence first, then confirm
with fresh lint and build verification.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, ESLint, pnpm

## Global Constraints

- Do not introduce new dependencies.
- Do not modify `next.config.mjs` or `tsconfig.json`.
- Do not change route behavior, theme behavior, or API contracts.
- Keep edits limited to high-confidence dead code and the smallest required
  surrounding simplification.

---

### Task 1: Identify proven dead code candidates

**Files:**

- Modify:
  `docs/superpowers/specs/2026-07-07-sentraverse-high-confidence-cleanup-design.md`
- Inspect: `app/**/*.ts*`, `components/**/*.ts*`, `lib/**/*.ts*`

**Interfaces:**

- Consumes: current app source tree
- Produces: a short candidate list backed by static evidence

- [ ] Run: `pnpm exec tsc --noEmit --noUnusedLocals --noUnusedParameters`
- [ ] Record only candidates that are provably unused, such as:
  - default `React` imports not referenced under React 19 JSX transform
  - unused file-local variables
  - unused callback parameters
- [ ] Exclude any candidate that is part of an external contract or runtime
      branch that cannot be proven dead.

### Task 2: Apply the cleanup patch

**Files:**

- Modify: `app/insights/page.tsx`
- Modify: `components/About.tsx`
- Modify: `components/Audrey.tsx`
- Modify: `components/Clients.tsx`
- Modify: `components/ClinicalPrognosis.tsx`
- Modify: `components/ClinicalTrajectory.tsx`
- Modify: `components/CTA.tsx`
- Modify: `components/FAQ.tsx`
- Modify: `components/Hero.tsx`
- Modify: `components/Navbar.tsx`
- Modify: `components/News.tsx`
- Modify: `components/ScrollGallery.tsx`
- Modify: `components/Services.tsx`
- Modify: `components/Showcase.tsx`
- Modify: `components/ThemeToggle.tsx`
- Modify: `components/ui/immersive-scroll-gallery.tsx`
- Modify: `components/ui/interactive-image-accordion.tsx`
- Modify: `components/ui/sentra-kinetic-nav.tsx`

**Interfaces:**

- Consumes: candidate list from Task 1
- Produces: a behavior-neutral diff with smaller local codepaths

- [ ] Remove unused default `React` imports where the file only needs named
      imports or no React import at all.
- [ ] Remove the unused `quoteHandwriting` font handle in `components/Hero.tsx`.
- [ ] Remove the unused `i` callback parameter in `app/insights/page.tsx`.
- [ ] Remove the unused `seg` reducer parameter in
      `components/ClinicalPrognosis.tsx`.
- [ ] Preserve all existing exports, route modules, and component boundaries.

### Task 3: Verify and document

**Files:**

- Modify: `apps/healthcare/sentraverse/.agent/HANDOFF.md`
- Modify: `apps/healthcare/sentraverse/.agent/PROGRESS.md`
- Create:
  `D:/Devops/abyss-monorepo/.agent/HANDOFFS/20260707-sentraverse-high-confidence-cleanup.md`

**Interfaces:**

- Consumes: final diff from Task 2
- Produces: verification evidence and continuity notes

- [ ] Run: `pnpm --filter @the-abyss/sentraverse lint`
- [ ] Run: `pnpm --filter @the-abyss/sentraverse build`
- [ ] Run: `git diff --stat -- <touched paths>`
- [ ] Update local `.agent` notes with:
  - what was removed
  - why it was high-confidence
  - what verification passed
