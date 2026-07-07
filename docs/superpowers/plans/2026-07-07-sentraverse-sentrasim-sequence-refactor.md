# Sentraverse SentraSim Sequence Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract the scripted SentraSim reveal sequence into an adjacent module
so the main component stays focused on React state, guards, and rendering.

**Architecture:** Keep `SentraSim` as the exported component and move only the
sequential orchestration into `components/sentrasim/sequence.ts`. The new module
remains feature-local, consumes the active branch plus a patch callback, and
preserves the current status/timing progression exactly.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Framer Motion, pnpm

## Global Constraints

- Do not introduce new dependencies.
- Do not change route structure, copy, or animation timing.
- Do not move feature-specific logic into `lib/`.
- Keep the `SentraSim` component export stable.

---

### Task 1: Extract the sequence runner

**Files:**

- Create: `components/sentrasim/sequence.ts`

**Interfaces:**

- Consumes: `SimulationBranch`, `SimulationState`, `delay`, `STATUS_TEXT`
- Produces:
  `runSimulationSequence(branch: SimulationBranch, patchSimulation: (patch: Partial<SimulationState>) => void): Promise<void>`

- [ ] Create `components/sentrasim/sequence.ts`
- [ ] Move the ordered async reveal steps out of `SentraSim.tsx`
- [ ] Keep all timing values and status transitions unchanged
- [ ] Factor repeated count/text reveal loops into local helper functions only
      if behavior remains identical

### Task 2: Simplify SentraSim orchestration

**Files:**

- Modify: `components/SentraSim.tsx`

**Interfaces:**

- Consumes: `runSimulationSequence(...)`
- Produces: smaller component-level `runSimulation()` wrapper that only handles
  React guards and lifecycle-safe state patching

- [ ] Import `runSimulationSequence` from the new feature-local module
- [ ] Replace the inline scripted sequence with a thin wrapper around
      `runSimulationSequence(...)`
- [ ] Preserve severity switching, reset, and running guard behavior

### Task 3: Verify and document

**Files:**

- Modify: `apps/healthcare/sentraverse/.agent/HANDOFF.md`
- Modify: `apps/healthcare/sentraverse/.agent/PROGRESS.md`
- Create:
  `D:/Devops/abyss-monorepo/.agent/HANDOFFS/20260707-sentraverse-sentrasim-sequence-refactor.md`

**Interfaces:**

- Consumes: refactor diff from Tasks 1-2
- Produces: continuity notes with verification evidence and deferred follow-up

- [ ] Run: `pnpm exec tsc --noEmit --noUnusedLocals --noUnusedParameters`
- [ ] Run: `pnpm --filter @the-abyss/sentraverse lint`
- [ ] Run: `pnpm --filter @the-abyss/sentraverse build`
- [ ] Update continuity notes with scope, verification, and remaining risk
