# Sentraverse SentraSim Column Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract the remaining timeline and sidebar composition from
`SentraSim` into feature-local column components while keeping state and
orchestration in the parent.

**Architecture:** Create `TimelineColumn` and `SidebarColumn` as feature-local
presentational containers. They receive plain props, compose the existing
extracted presentation components, and preserve the current mobile/desktop
assessment placement logic.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Framer Motion, pnpm

## Global Constraints

- Do not introduce new dependencies.
- Do not change route structure, copy, or animation timing.
- Do not move feature-specific logic into `lib/`.
- Keep the `SentraSim` component export stable.

---

### Task 1: Extract timeline and sidebar columns

**Files:**

- Create: `components/sentrasim/TimelineColumn.tsx`
- Create: `components/sentrasim/SidebarColumn.tsx`

**Interfaces:**

- Consumes: `SimulationBranch`, `SimulationState`, current `SentraSim` layout
  subtrees
- Produces: two feature-local presentation containers composed from plain props
  and callbacks

- [ ] Extract the remaining left-column timeline composition into
      `TimelineColumn.tsx`
- [ ] Extract the remaining right-column sidebar composition into
      `SidebarColumn.tsx`
- [ ] Reuse `AssessmentSection` and `TrajectoryPanel` rather than re-inline
      their content

### Task 2: Simplify the parent component

**Files:**

- Modify: `components/SentraSim.tsx`

**Interfaces:**

- Consumes: `TimelineColumn`, `SidebarColumn`
- Produces: smaller stateful shell with top-level wrapper and status header only

- [ ] Replace the inline left column with `TimelineColumn`
- [ ] Replace the inline right column with `SidebarColumn`
- [ ] Remove parent imports that became column-local

### Task 3: Verify and document

**Files:**

- Modify: `apps/healthcare/sentraverse/.agent/HANDOFF.md`
- Modify: `apps/healthcare/sentraverse/.agent/PROGRESS.md`
- Create:
  `D:/Devops/abyss-monorepo/.agent/HANDOFFS/20260707-sentraverse-sentrasim-column-refactor.md`

**Interfaces:**

- Consumes: refactor diff from Tasks 1-2
- Produces: continuity notes with verification evidence and remaining risk

- [ ] Run: `pnpm --filter @the-abyss/sentraverse build`
- [ ] Run: `pnpm exec tsc --noEmit --noUnusedLocals --noUnusedParameters`
- [ ] Run: `pnpm --filter @the-abyss/sentraverse lint`
- [ ] Update continuity notes with scope, verification, and deferred follow-up
