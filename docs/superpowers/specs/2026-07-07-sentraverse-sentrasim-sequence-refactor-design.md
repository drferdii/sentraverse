# Sentraverse SentraSim Sequence Refactor Design

## Objective

Reduce the remaining orchestration complexity in `components/SentraSim.tsx` by
extracting the scripted simulation sequence into an adjacent feature-local
module without changing timing, copy, branch data, or visual structure.

## Scope

Included:

- extracting the async reveal sequence behind `runSimulation`
- extracting repeated count-reveal loops into local sequence helpers
- keeping `SentraSim` as the exported interactive shell

Excluded:

- branch data changes
- animation timing changes
- UI or layout changes
- shared abstraction promotion into `lib/`
- route, copy, or API changes

## Current Evidence

- After Phase 2, `SentraSim` still owns:
  - severity selection
  - mount/running guards
  - simulation patching
  - the entire scripted async sequence
  - the JSX render tree
- The remaining densest logic is the ordered state machine that reveals
  anamnesis, EMR history, vitals anomalies, labs, trajectory, diagnosis, and
  management.

## Design Principles

1. Preserve the current top-level component export and UI tree.
2. Move only orchestration code that is sequential and feature-local.
3. Keep timing values byte-for-byte identical.
4. Keep component-owned refs and React state in the component.
5. Prefer explicit helper names over generic framework abstractions.

## Planned Refactor Shape

Create:

- `components/sentrasim/sequence.ts`

Move into `sequence.ts`:

- the ordered async reveal sequence currently inside `runSimulation`
- small local helper functions for repeated count-reveal and word-by-word text
  reveal

Keep in `components/SentraSim.tsx`:

- selected severity state
- mounted/running refs
- `patchSimulation`
- severity switching/reset behavior
- start/stop guard around the sequence runner
- the full JSX render tree

## Risk Controls

- No changes to `STATUS_TEXT` content.
- No changes to `delay(...)` durations.
- No changes to severity branch selection or reset semantics.
- No new dependency or cross-feature helper extraction.

## Verification

Required:

- `pnpm exec tsc --noEmit --noUnusedLocals --noUnusedParameters`
- `pnpm --filter @the-abyss/sentraverse lint`
- `pnpm --filter @the-abyss/sentraverse build`

Supporting:

- path-scoped `git diff --stat`

## Success Criteria

This phase is complete when:

- `components/SentraSim.tsx` no longer contains the full scripted step sequence
- the ordered reveal logic lives in a feature-local module
- timing and UI behavior remain unchanged under app-scoped verification
- the next refactor can target presentation subtrees rather than orchestration
  logic
