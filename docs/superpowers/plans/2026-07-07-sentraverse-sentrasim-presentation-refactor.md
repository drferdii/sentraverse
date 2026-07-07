# Sentraverse SentraSim Presentation Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract isolated presentational subtrees from `SentraSim` into
adjacent feature-local components while keeping all state and orchestration in
the parent.

**Architecture:** Create small feature-local components for the hero/controls
area, the assessment section, and the trajectory panel. `SentraSim` remains the
stateful shell and passes plain props plus callbacks downward.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Framer Motion, pnpm

## Global Constraints

- Do not introduce new dependencies.
- Do not change route structure, copy, or animation timing.
- Do not move feature-specific logic into `lib/`.
- Keep the `SentraSim` component export stable.

---

### Task 1: Extract presentational components

**Files:**

- Create: `components/sentrasim/SimulationHero.tsx`
- Create: `components/sentrasim/AssessmentSection.tsx`
- Create: `components/sentrasim/TrajectoryPanel.tsx`

**Interfaces:**

- Consumes: `SeverityKey`, `SimulationBranch`, current `SentraSim` JSX subtrees
- Produces: feature-local presentational components with plain props and
  callbacks

- [ ] Extract the top hero and severity controls into `SimulationHero.tsx`
- [ ] Extract the diagnosis/management subtree into `AssessmentSection.tsx`
- [ ] Extract the trajectory panel into `TrajectoryPanel.tsx`

### Task 2: Simplify the parent component

**Files:**

- Modify: `components/SentraSim.tsx`

**Interfaces:**

- Consumes: the new presentational components
- Produces: smaller parent component that still owns state, refs, patching, and
  sequence orchestration

- [ ] Replace the inline hero block with `SimulationHero`
- [ ] Replace the local assessment renderer with `AssessmentSection`
- [ ] Replace the inline trajectory block with `TrajectoryPanel`
- [ ] Remove imports and helpers that are no longer needed in the parent

### Task 3: Verify and document

**Files:**

- Modify: `apps/healthcare/sentraverse/.agent/HANDOFF.md`
- Modify: `apps/healthcare/sentraverse/.agent/PROGRESS.md`
- Create:
  `D:/Devops/abyss-monorepo/.agent/HANDOFFS/20260707-sentraverse-sentrasim-presentation-refactor.md`

**Interfaces:**

- Consumes: refactor diff from Tasks 1-2
- Produces: continuity notes with verification evidence and remaining risk

- [ ] Run: `pnpm --filter @the-abyss/sentraverse build`
- [ ] Run: `pnpm exec tsc --noEmit --noUnusedLocals --noUnusedParameters`
- [ ] Run: `pnpm --filter @the-abyss/sentraverse lint`
- [ ] Update continuity notes with scope, verification, and deferred follow-up
