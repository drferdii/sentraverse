# Sentraverse High-Confidence Cleanup Design

## Objective

Execute the first slice of the approved sequential audit for
`@the-abyss/sentraverse` by removing only high-confidence dead code and
redundant local logic that can be proven unused through static inspection and
app-scoped verification.

## Scope

This phase is intentionally narrow.

Included:

- Unused local helpers
- Unused local constants
- Unused types declared in the same file or local module
- Redundant branches that are provably unreachable from current code paths
- Small local simplifications that are required to remove dead code cleanly

Excluded:

- Visual redesign
- Cross-route behavior changes
- Large file decomposition
- New dependencies
- Changes to `next.config.mjs` or `tsconfig.json`
- Broad architectural refactors for `SentraSim`, `Insights`, or `/story`

## Current Evidence

Static audit completed before design:

- `pnpm --filter @the-abyss/sentraverse lint` passes, so trivial unused-import
  cleanup is not the primary opportunity.
- Complexity hotspots remain:
  - `components/SentraSim.tsx`
  - `components/ClinicalTrajectory.tsx`
  - `components/ClinicalPrognosis.tsx`
  - `app/story/page.tsx`
  - `app/insights/data.ts`
- Because lint is clean, this phase should prioritize high-certainty local
  removals over speculative restructuring.

## Design Principles

1. Remove only code that can be justified with evidence from current references.
2. Prefer deletion over abstraction.
3. Do not restructure large modules unless the restructure is the smallest safe
   way to complete the deletion.
4. Preserve route output and existing interaction behavior.
5. Keep verification app-scoped and fresh.

## Identification Rules

Code qualifies for removal in this phase only if at least one of the following
is true:

1. It has zero references in the app after repo-local search.
2. It is shadowed by the only active code path and cannot be reached.
3. It is a duplicate local construct whose replacement is already the sole
   runtime source of truth.

The following do not qualify in this phase:

- “Looks unnecessary”
- “Probably legacy”
- “Could be merged later”
- “Would be nicer if split”

## Planned Audit Sequence

### Step 1: App-wide static inventory

Inspect `app/`, `components/`, and `lib/` for:

- one-off helpers with no call sites
- file-local constants no longer consumed
- stale types left behind after earlier refactors
- branches guarded by conditions that never vary in current runtime

### Step 2: Candidate validation

For each candidate:

- confirm current references with `rg`
- inspect surrounding file to ensure the construct is not intentionally
  documentary or reserved for exported contract stability
- exclude anything that affects public API, route metadata, or structured data
  without explicit proof

### Step 3: Minimal cleanup patch

Apply the smallest coherent patch set that:

- removes dead code
- keeps names, exports, and file boundaries stable where possible
- avoids opportunistic refactors

### Step 4: Verification

Required:

- `pnpm --filter @the-abyss/sentraverse lint`
- `pnpm --filter @the-abyss/sentraverse build`

Supporting review:

- path-scoped `git diff --stat`
- path-scoped `git diff`

## File Strategy

Expected primary touch points in this phase are whichever files contain the
proven dead code. At this stage there is no approval to edit hotspot files for
structural reasons alone. Any touched file must have a direct dead-code
justification.

## Risk Controls

- No deletion of exports unless all call sites are proven absent.
- No movement of code across modules in this phase.
- No edits to PHI, secrets, or environment handling.
- No claims of “optimization” unless the change measurably simplifies runtime or
  codepath count.

## Success Criteria

This phase is complete when:

- All removed code has a clear static proof trail.
- `lint` and `build` both pass after the patch.
- The resulting diff is smaller, simpler, and behavior-neutral.
- Remaining large-scale cleanup opportunities are documented for later phases
  rather than mixed into this one.

## Follow-on Phases

After this phase:

1. `SentraSim` and related clinical components
2. `Insights` and `/story` content layer

Those phases may include deeper structural refactors, but only after this
baseline cleanup lands cleanly.
