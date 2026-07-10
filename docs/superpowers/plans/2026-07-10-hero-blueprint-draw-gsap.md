# Plan — Hero "Blueprint Draw": full-GSAP entrance

Date: 2026-07-10 · Approved in chat by Chief · Class B

## Goal

Replace the Hero section's mixed entrance system (CSS `sentra-load-reveal`
keyframes + 2 Framer Motion sketch-line draws) with one orchestrated GSAP master
timeline — "Blueprint Draw": sketch lines draw themselves first, then text
follows. Simple but attractive; stays within the existing design language
(sketch lines, editorial serif, single accent).

Decisions locked with Chief:

- Scope: whole hero section entrance. KonsultasiCard gets a container-level
  entrance beat only; its internal 4-phase chat stays Framer Motion untouched.
- Headline may depend on JS for its entrance (old "no-Framer-hydration"
  constraint relaxed). Anti-flash via CSS `visibility: hidden` + GSAP
  `autoAlpha`, `<noscript>` unhide as safety net.
- Reduced motion: `gsap.matchMedia` — everything shown instantly at final state.
  No setState in effects (CI `react-hooks/set-state-in-effect` safe).

## Choreography (master timeline on load)

| Beat | ~Time         | What                                                                                                                  |
| ---- | ------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1    | 0.0s          | Vertical sketch line draws top→bottom (`scaleY` 0→1)                                                                  |
| 2    | 0.3s overlap  | Horizontal line under points draws left→right (`scaleX` 0→1)                                                          |
| 3    | follows line  | Points 01/02/03 stamp in — fade + scale 0.96→1, stagger                                                               |
| 4    | ~0.7s         | Headline lines rise from mask — SplitText `type: "lines"` + mask, stagger 0.12s, `power4.out`                         |
| 5    | ~1.2s         | Subcopy fade-up                                                                                                       |
| 6    | ~1.4s         | Metrics row rises + count-up driven from the timeline (IntersectionObserver removed — hero is always visible on load) |
| 7    | ~1.5s         | CTA buttons fade-up, slight stagger                                                                                   |
| 8    | parallel w/ 6 | KonsultasiCard container fade + rise                                                                                  |

Total ≈1.8s. `RotatingWord` and `HeroScanLine` keep their existing GSAP code.

## Technical notes

- `gsap/SplitText` is bundled free in gsap 3.14 — no new dependency.
- After the entrance completes, call `split.revert()` so the h1 DOM returns to
  its original structure before `RotatingWord` (React span, first update at
  2.6s) mutates its text — avoids React-vs-SplitText DOM conflict.
- All entrance targets get a `data-hero-*` hook + CSS `visibility: hidden`
  scoped class; GSAP reveals with `autoAlpha`. `<noscript>` block unhides.
- Remove from Hero.tsx: both Framer `motion.div` sketch lines, all
  `sentra-load-reveal*` classes, `MetricCounter`'s IntersectionObserver.
- Remove from globals.css: `sentraFadeUp` keyframes + `.sentra-load-reveal*`
  rules (grep-verified: used only by Hero) incl. reduced-motion block entries.
- Framer Motion import stays (KonsultasiCard uses it).

## Tasks

1. globals.css: remove `sentraFadeUp`/`.sentra-load-reveal*`; add scoped
   pre-animation hide rule for hero entrance targets + `<noscript>` unhide.
2. Hero.tsx: build master timeline in a `useEffect` + `gsap.context` +
   `gsap.matchMedia`; wire beats 1–8; SplitText with revert; convert
   MetricCounter count-up to timeline-driven; strip Framer entrance pieces.
3. Verify: `pnpm --filter @the-abyss/sentraverse lint`,
   `pnpm exec tsc --noEmit`, `pnpm --filter @the-abyss/sentraverse build`.
4. Playwright headless: entrance completes (all targets autoAlpha 1),
   RotatingWord still rotates after revert, reduced-motion emulation shows
   content instantly, 0 console errors, no horizontal overflow at 375px.
5. Update `.agent/HANDOFF.md` + `PROGRESS.md`. No commit until Chief GO.
