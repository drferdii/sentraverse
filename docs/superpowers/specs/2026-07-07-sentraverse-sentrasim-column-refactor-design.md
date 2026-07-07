# Sentraverse SentraSim Column Refactor Design

## Objective

Reduce the remaining `SentraSim.tsx` view density by extracting the leftover
timeline and sidebar subsections into adjacent feature-local column components
while preserving state ownership, timing, copy, and layout behavior.

## Scope

Included:

- extracting the remaining left timeline composition into a feature-local
  component
- extracting the remaining right sidebar composition into a feature-local
  component
- reusing the Phase 4 presentational components inside those new column
  components

Excluded:

- sequence logic changes
- state ownership changes
- branch data changes
- animation timing changes
- visual redesign

## Current Evidence

- After Phase 4, `SentraSim.tsx` still contains:
  - timeline sections 01-04
  - the composer input
  - right sidebar entity/anomaly/trajectory-insight panels
  - placement rules for mobile vs desktop assessment blocks
- These sections are still presentational and prop-driven, making them safe
  extraction targets.

## Design Principles

1. Keep `SentraSim` as the only stateful shell.
2. Extract by layout ownership, not by micro-fragmentation.
3. Reuse existing `AssessmentSection` and `TrajectoryPanel` components rather
   than duplicating them.
4. Preserve copy, classes, and motion behavior byte-for-byte where possible.

## Planned Refactor Shape

Create:

- `components/sentrasim/TimelineColumn.tsx`
- `components/sentrasim/SidebarColumn.tsx`

Keep in `components/SentraSim.tsx`:

- state and refs
- severity switching/reset behavior
- lifecycle-safe patching
- sequence execution
- top-level section wrapper and status header

## Risk Controls

- No new dependencies.
- No new shared abstractions outside `components/sentrasim/`.
- Parent remains the only place mutating simulation state.
- Existing extracted components remain unchanged except for composition reuse.

## Verification

Required:

- `pnpm --filter @the-abyss/sentraverse build`
- `pnpm exec tsc --noEmit --noUnusedLocals --noUnusedParameters`
- `pnpm --filter @the-abyss/sentraverse lint`

## Success Criteria

- `SentraSim.tsx` delegates the remaining timeline and sidebar composition.
- The parent component primarily reads as state + orchestration + top-level
  layout.
- App-scoped verification remains green.
