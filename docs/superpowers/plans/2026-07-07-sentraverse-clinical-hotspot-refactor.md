# Sentraverse Clinical Hotspot Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce structural complexity in `SentraSim`, `ClinicalTrajectory`, and
`ClinicalPrognosis` by extracting local types, static data, and pure helpers
into adjacent modules without changing runtime behavior.

**Architecture:** Use feature-local extraction rather than broad redesign. Each
hotspot keeps its existing exported component while moving static and pure logic
into nearby modules with narrow responsibility boundaries.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Framer Motion, pnpm

## Global Constraints

- Do not introduce new dependencies.
- Do not change route structure, copy, or animation timing.
- Do not move feature-specific logic into `lib/`.
- Keep top-level component exports stable.

---

### Task 1: Refactor SentraSim support code

**Files:**

- Create: `components/sentrasim/types.ts`
- Create: `components/sentrasim/data.ts`
- Create: `components/sentrasim/helpers.ts`
- Modify: `components/SentraSim.tsx`

**Interfaces:**

- Consumes: current `SentraSim.tsx`
- Produces: feature-local types, branch data, and helpers imported by
  `SentraSim`

- [ ] Move domain types into `components/sentrasim/types.ts`
- [ ] Move branch constants and simulation data into
      `components/sentrasim/data.ts`
- [ ] Move pure helpers and subscriptions into `components/sentrasim/helpers.ts`
- [ ] Update `components/SentraSim.tsx` to import from those modules while
      preserving runtime flow

### Task 2: Refactor ClinicalTrajectory support code

**Files:**

- Create: `components/clinical-trajectory/data.ts`
- Create: `components/clinical-trajectory/AnnotationLine.tsx`
- Modify: `components/ClinicalTrajectory.tsx`

**Interfaces:**

- Consumes: current `ClinicalTrajectory.tsx`
- Produces: adjacent data/helper modules imported by `ClinicalTrajectory`

- [ ] Move static datasets, slide labels, and helper functions into `data.ts`
- [ ] Move the local annotation helper component into `AnnotationLine.tsx`
- [ ] Update `components/ClinicalTrajectory.tsx` imports and keep
      layout/orchestration behavior unchanged

### Task 3: Refactor ClinicalPrognosis support code

**Files:**

- Create: `components/clinical-prognosis/data.ts`
- Create: `components/clinical-prognosis/helpers.ts`
- Modify: `components/ClinicalPrognosis.tsx`

**Interfaces:**

- Consumes: current `ClinicalPrognosis.tsx`
- Produces: adjacent data/helper modules imported by `ClinicalPrognosis`

- [ ] Move static demo datasets into `data.ts`
- [ ] Move color and geometry helpers into `helpers.ts`
- [ ] Update `components/ClinicalPrognosis.tsx` imports and preserve
      presentational output

### Task 4: Verify and document

**Files:**

- Modify: `apps/healthcare/sentraverse/.agent/HANDOFF.md`
- Modify: `apps/healthcare/sentraverse/.agent/PROGRESS.md`
- Create:
  `D:/Devops/abyss-monorepo/.agent/HANDOFFS/20260707-sentraverse-clinical-hotspot-refactor.md`

**Interfaces:**

- Consumes: refactor diff from Tasks 1-3
- Produces: verification evidence and continuity notes

- [ ] Run: `pnpm exec tsc --noEmit --noUnusedLocals --noUnusedParameters`
- [ ] Run: `pnpm --filter @the-abyss/sentraverse lint`
- [ ] Run: `pnpm --filter @the-abyss/sentraverse build`
- [ ] Update continuity notes with scope, verification, and deferred follow-up
