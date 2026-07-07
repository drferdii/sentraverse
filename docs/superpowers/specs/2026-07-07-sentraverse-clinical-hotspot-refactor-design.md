# Sentraverse Clinical Hotspot Refactor Design

## Objective

Refactor the clinical hotspot slice covering `SentraSim`, `ClinicalTrajectory`,
and `ClinicalPrognosis` to reduce file complexity and improve maintainability
without changing route behavior, copy, animation timing, or clinical branch
output.

## Scope

Included:

- Extracting file-local types, static data, and pure helpers into adjacent
  modules
- Keeping the main components as orchestration and render shells
- Preserving existing UI structure and state behavior

Excluded:

- UX or visual redesign
- Copy changes
- New dependencies
- Shared abstraction promotion into `lib/`
- API or route changes
- Clinical logic changes

## Current Evidence

- `components/SentraSim.tsx` carries:
  - local type system
  - all branch data
  - runtime helper functions
  - state orchestration
  - render tree
- `components/ClinicalTrajectory.tsx` and `components/ClinicalPrognosis.tsx`
  both mix:
  - static demo datasets
  - chart helpers
  - presentational composition
- Current `lint`, `build`, and stricter `tsc --noUnused*` checks are green, so
  the opportunity is structural clarity rather than correctness repair.

## Design Principles

1. Prefer extraction over rewriting.
2. Keep exported component signatures stable.
3. Keep data local to the feature domain; do not invent cross-feature shared
   abstractions.
4. Only move code that is clearly static or pure.
5. Preserve behavior by moving code verbatim before considering simplification.

## Planned Refactor Shape

### SentraSim

Create adjacent feature modules:

- `components/sentrasim/types.ts`
- `components/sentrasim/data.ts`
- `components/sentrasim/helpers.ts`

Move:

- all local domain types
- branch datasets and base constants
- pure helper functions such as:
  - initial state creation
  - timing helper
  - tone/style mapping
  - desktop layout subscription helpers

Keep in `components/SentraSim.tsx`:

- selected severity state
- simulation state orchestration
- async run sequence
- JSX render tree

### ClinicalTrajectory

Create adjacent feature modules:

- `components/clinical-trajectory/data.ts`
- `components/clinical-trajectory/AnnotationLine.tsx`

Move:

- demo datasets
- chart helper functions
- slide labels
- local annotation component

Keep in `components/ClinicalTrajectory.tsx`:

- auto-slide orchestration
- chart coordinate assembly
- top-level layout and section composition

### ClinicalPrognosis

Create adjacent feature modules:

- `components/clinical-prognosis/data.ts`
- `components/clinical-prognosis/helpers.ts`

Move:

- KPI/chart/demo datasets
- color and geometry helpers

Keep in `components/ClinicalPrognosis.tsx`:

- local rendering composition
- layout and Framer Motion presentation

## Risk Controls

- No semantic edits to branch data while moving it.
- No animation timing changes.
- No prop signature changes for the top-level exported components.
- No deduplication across features unless it is already naturally shared.

## Verification

Required:

- `pnpm exec tsc --noEmit --noUnusedLocals --noUnusedParameters`
- `pnpm --filter @the-abyss/sentraverse lint`
- `pnpm --filter @the-abyss/sentraverse build`

Supporting:

- path-scoped `git diff --stat`
- path-scoped `git diff`

## Success Criteria

This phase is complete when:

- the three hotspot files are materially smaller
- their static data and pure helpers live in adjacent feature modules
- behavior remains unchanged under app-scoped verification
- the resulting structure makes later targeted refactors easier rather than
  harder
