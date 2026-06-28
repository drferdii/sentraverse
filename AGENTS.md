# AGENTS.md — Sentraverse

Last updated: 2026-06-28 | Owner: Chief

> Inherits root [`AGENTS.md`](../../../AGENTS.md) governance; this file may only
> ADD scoped context. **Root wins** on conflict.

## Identity

- Name: Sentraverse (formerly Sentra Main)
- Package: `@the-abyss/sentraverse`
- Type: NestJS healthcare platform hub + marketing surface
- Stack: NestJS + TypeScript
- Owner: Chief (Dr. Ferdi Iskandar)

## Run

```powershell
pnpm --filter @the-abyss/sentraverse format:check
pnpm --filter @the-abyss/sentraverse lint
pnpm --filter @the-abyss/sentraverse typecheck
pnpm --filter @the-abyss/sentraverse test
pnpm --filter @the-abyss/sentraverse build
pnpm --filter @the-abyss/sentraverse dev
```

## Operating Rules (scoped)

- Safety: never expose secrets/PHI; use the narrowest scope.
- Task class: A trivial -> proceed · B standard -> plan, do, verify · C -> Chief
  GO.
- Memory: read `.agent/` first; update `HANDOFF.md`/`PROGRESS.md` after
  meaningful work.

## Boundaries

- Public marketing and platform hub — breaking API or route changes need review.

## SSOT

- `.agent/`: `CONTEXT.md`, `HANDOFF.md`, `VALIDATION.md` (required);
  `PROGRESS.md`, `DECISIONS.md` (optional).
