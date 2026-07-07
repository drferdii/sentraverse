# Sentraverse SentraSim Presentation Refactor Design

## Objective

Reduce remaining view complexity in `components/SentraSim.tsx` by extracting
isolated presentational subtrees into adjacent feature-local components while
preserving behavior, copy, timing, and layout structure.

## Scope

Included:

- extracting self-contained UI sections from `SentraSim`
- keeping state ownership and orchestration in the parent component
- keeping new components inside `components/sentrasim/`

Excluded:

- sequence logic changes
- branch data changes
- animation timing changes
- visual redesign
- shared abstraction promotion outside the feature folder

## Current Evidence

- After Phase 3, `SentraSim` still mixes:
  - React state and guards
  - layout composition
  - multiple large presentational sections
- The safest extraction candidates are already bounded by explicit props:
  - top hero and severity controls
  - assessment/management section
  - trajectory panel

## Design Principles

1. Keep `SentraSim` as the single state owner.
2. Extract only sections that can receive plain props and callbacks.
3. Do not move or rename feature data.
4. Preserve copy, class strings, and animation values unless a prop boundary
   requires mechanical movement only.

## Planned Refactor Shape

Create:

- `components/sentrasim/SimulationHero.tsx`
- `components/sentrasim/AssessmentSection.tsx`
- `components/sentrasim/TrajectoryPanel.tsx`

Keep in `components/SentraSim.tsx`:

- state and refs
- severity switching and reset behavior
- lifecycle-safe patching
- sequence execution
- the remaining timeline and sidebar composition

## Risk Controls

- No new dependency.
- No timing changes.
- No change to `TextScramble` copy or keys beyond mechanical relocation.
- Parent component remains the only place mutating simulation state.

## Verification

Required:

- `pnpm --filter @the-abyss/sentraverse build`
- `pnpm exec tsc --noEmit --noUnusedLocals --noUnusedParameters`
- `pnpm --filter @the-abyss/sentraverse lint`

## Success Criteria

- `SentraSim.tsx` delegates at least the hero, assessment, and trajectory UI
  blocks.
- The parent component is materially smaller and easier to scan.
- App-scoped verification stays green with no behavior regressions.
