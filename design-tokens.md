# Sentra Healthcare AI — Design Tokens

> Auto-extracted from `app/globals.css`, `app/layout.tsx`, `lib/theme.ts`, and `components/ThemeProvider.tsx`.

---

## 1. Philosophy

- **Light theme (default):** Pure white surface + Oxford blue primary (`#002147`) + red-orange secondary accent (`#eb5939`).
- **Dark theme (opt-in):** Near-black surface (`#0d0d0d`) + warm stone foreground (`#b7ab98`) + softened Oxford primary (`#4a7bb5`).
- **SentraSim scoped dark:** Sections wrapped in `[data-sentra-sim]` inherit dark canvas/background semantics without toggling the global `data-theme` attribute.

---

## 2. Typography

| Token | Value | Source |
|-------|-------|--------|
| **Primary font** | `Plus Jakarta Sans` | `next/font/google` → `--font-jakarta` |
| **Secondary font** | `Inter` | `next/font/google` → `--font-inter` |
| **Tailwind `font-sans`** | `var(--font-jakarta), ui-sans-serif, system-ui, sans-serif` | `globals.css @theme` |
| **Tailwind `font-inter`** | `var(--font-inter), ui-sans-serif, system-ui, sans-serif` | `globals.css @theme` |
| **Base body size** | `19px` | `body` rule in `globals.css` |
| **Rendering** | `-webkit-font-smoothing: antialiased` | `body` rule |

---

## 3. Color Tokens

### 3.1 Core Palette

| Token | Light (`:root`) | Dark (`[data-theme="dark"]`) |
|-------|-----------------|------------------------------|
| `--sentra-bg` | `#ffffff` | `#0d0d0d` |
| `--sentra-fg` | `#002147` | `#b7ab98` |
| `--sentra-primary` | `#002147` | `#4a7bb5` |
| `--sentra-primary-rgb` | `0 33 71` | `74 123 181` |
| `--sentra-accent` | `#eb5939` | `#eb5939` |
| `--sentra-white` | `#ffffff` | `#fff` |

### 3.2 Oxford Ramp

| Token | Light | Dark |
|-------|-------|------|
| `--sentra-primary-dark` | `#001530` | `#1a4180` |
| `--sentra-primary-mid` | `#0a2e5e` | `#2d5d9c` |
| `--sentra-primary-soft` | `#1a4180` | `#6e9bd1` |
| `--sentra-primary-tint` | `#e6ebf2` | `#1a2a3f` |

### 3.3 Muted Scale

| Token | Light | Dark |
|-------|-------|------|
| `--sentra-muted` | `#3a4d63` | `#b8ac99` |
| `--sentra-muted-text` | `#3a4d63d9` | `#b8ac99cc` |
| `--sentra-muted-half` | `#47556980` | `#b8ac9980` |
| `--sentra-muted-subtle` | `#47556933` | `#b8ac9933` |
| `--sentra-muted-faint` | `#4755691a` | `#b8ac991a` |
| `--sentra-muted-line` | `#00214726` | `#b8ac9940` |

### 3.4 Canvas / Surfaces

| Token | Light | Dark |
|-------|-------|------|
| `--sentra-canvas` | `#fafafa` | `#1c1b1a` |
| `--sentra-canvas-dark` | `#f4f4f5` | `#141311` |
| `--sentra-panel-1` | `#fafafa` | `#111110` |
| `--sentra-panel-2` | `#f4f4f5` | `#17160f` |
| `--sentra-panel-3` | `#e4e4e7` | `#1c1b17` |

### 3.5 Semantic

| Token | Light | Dark |
|-------|-------|------|
| `--sentra-critical` | `#dc2626` | `#e65a4c` |
| `--sentra-critical-rgb` | `220 38 38` | `230 90 76` |
| `--sentra-warning` | `#d97706` | `#fbbf24` |
| `--sentra-warning-rgb` | `217 119 6` | `251 191 36` |
| `--sentra-critical-faint` | `rgb(220 38 38 / 0.06)` | `rgb(230 90 76 / 0.04)` |
| `--sentra-critical-border` | `rgb(220 38 38 / 0.25)` | `rgb(230 90 76 / 0.2)` |
| `--sentra-warning-faint` | `rgb(217 119 6 / 0.07)` | `rgb(251 191 36 / 0.05)` |
| `--sentra-warning-soft` | `rgb(217 119 6 / 0.35)` | `rgb(251 191 36 / 0.3)` |
| `--sentra-warning-muted` | `rgb(217 119 6 / 0.7)` | `rgb(251 191 36 / 0.7)` |
| `--sentra-grid-line-strong` | `rgb(0 33 71 / 0.18)` | `rgb(183 171 152 / 0.3)` |
| `--sentra-neutral-soft` | `rgb(0 33 71 / 0.03)` | `rgb(183 171 152 / 0.04)` |
| `--sentra-neutral-border` | `rgb(0 33 71 / 0.1)` | `rgb(183 171 152 / 0.1)` |
| `--sentra-neutral-text` | `rgb(0 33 71 / 0.7)` | `rgb(183 171 152 / 0.6)` |

### 3.6 Audrey AI Persona

| Token | Light | Dark |
|-------|-------|------|
| `--sentra-audrey` | `#002147` | `#c4956a` |
| `--sentra-audrey-muted` | `#00214780` | `#c4956a80` |
| `--sentra-audrey-faint` | `#00214712` | `#c4956a15` |
| `--sentra-audrey-glow` | `#00214708` | `#c4956a08` |
| `--sentra-audrey-bubble` | `#002147` | `#f2ebe0` |
| `--sentra-audrey-bubble-text` | `#ffffff` | `#1a1510` |
| `--sentra-audrey-rgb` | `0 33 71` | `196 149 106` |
| `--sentra-audrey-ambient` | `rgb(0 33 71 / 0.04)` | `rgb(196 149 106 / 0.04)` |
| `--sentra-audrey-ring-border` | `rgb(0 33 71 / 0.12)` | `rgb(196 149 106 / 0.08)` |
| `--sentra-audrey-accent-border` | `rgb(0 33 71 / 0.25)` | `rgb(196 149 106 / 0.19)` |
| `--sentra-audrey-accent-bubble` | `rgb(0 33 71 / 0.06)` | `rgb(196 149 106 / 0.06)` |
| `--sentra-audrey-accent-bubble-border` | `rgb(0 33 71 / 0.12)` | `rgb(196 149 106 / 0.09)` |
| `--sentra-audrey-feature-divider` | `rgb(0 33 71 / 0.1)` | `rgb(196 149 106 / 0.08)` |
| `--sentra-audrey-corner-border` | `rgb(0 33 71 / 0.1)` | `rgb(196 149 106 / 0.07)` |
| `--sentra-audrey-line` | `rgb(0 33 71 / 0.4)` | `rgb(196 149 106 / 0.31)` |
| `--sentra-audrey-teal` | `#475569` | `#6b9b8a` |
| `--sentra-audrey-teal-faint` | `#47556918` | `#6b9b8a18` |
| `--sentra-audrey-teal-rgb` | `71 85 105` | `107 155 138` |

### 3.7 SentraSim (SDX) Tokens

| Token | Light | Dark |
|-------|-------|------|
| `--sdx-bg-canvas` | `var(--sentra-canvas)` | `var(--sentra-canvas)` |
| `--sdx-bg-page` | `var(--sentra-bg)` | `var(--sentra-bg)` |
| `--sdx-text-main` | `var(--sentra-fg)` | `var(--sentra-fg)` |
| `--sdx-text-muted` | `var(--sentra-muted-text)` | `var(--sentra-muted-text)` |
| `--sdx-line-base` | `var(--sentra-muted-line)` | `var(--sentra-muted-line)` |
| `--sdx-grid-faint` | `rgba(0, 33, 71, 0.04)` | `rgba(184, 172, 153, 0.03)` |
| `--sdx-c-anamnesa` | `var(--sentra-muted-text)` | `var(--sentra-muted-text)` |
| `--sdx-c-asesmen` | `var(--sentra-accent)` | `var(--sentra-accent)` |
| `--sdx-c-critical` | `var(--sentra-critical)` | `var(--sentra-critical)` |
| `--sdx-c-warning` | `var(--sentra-warning)` | `var(--sentra-warning)` |

---

## 4. Shadows / Elevation

| Token | Light | Dark |
|-------|-------|------|
| `--sentra-shadow-card` | `0 1px 2px rgba(0,33,71,0.04), 0 4px 16px rgba(0,33,71,0.06)` | `8px 8px 20px #050505, -8px -8px 20px #1a1a1a, inset 0 1px 0 rgba(255,255,255,0.02)` |
| `--sentra-shadow-elevated` | `0 2px 4px rgba(0,33,71,0.05), 0 12px 28px rgba(0,33,71,0.1)` | `6px 6px 16px #050505, -6px -6px 16px #1a1a1a` |
| `--sentra-shadow-subtle` | `0 1px 2px rgba(10,10,10,0.04)` | `3px 3px 8px #050505, -2px -2px 6px #2a2a2a` |
| `--sentra-shadow-accent` | `0 0 24px rgba(235,89,57,0.25)` | `0 0 32px rgba(235,89,57,0.4)` |
| `--sentra-shadow-accent-strong` | `0 0 32px rgba(235,89,57,0.4)` | `0 0 32px rgba(235,89,57,0.5)` |

---

## 5. Tailwind v4 Theme Mapping

Defined inside `@theme` block in `globals.css`:

| Tailwind Key | CSS Variable |
|--------------|--------------|
| `--color-background` | `var(--sentra-bg)` |
| `--color-foreground` | `var(--sentra-fg)` |
| `--color-primary` | `var(--sentra-primary)` |
| `--color-accent` | `var(--sentra-accent)` |
| `--color-muted` | `var(--sentra-muted-text)` |
| `--font-sans` | `var(--font-jakarta), ui-sans-serif, system-ui, sans-serif` |
| `--font-inter` | `var(--font-inter), ui-sans-serif, system-ui, sans-serif` |

---

## 6. Motion & Animation

| Name | Behavior |
|------|----------|
| `sdxPulse` | `opacity: 0.5` at `50%` |
| `sdxBlurReveal` | Blur clears, `translateY(0)`, color snaps to `--sdx-text-main`, subtle text-shadow glow |
| `sdxSmoothBlink` | Opacity oscillates `1 → 0.3 → 1` |
| `marquee` | `translateX(0) → translateX(-50%)` |
| `.animate-marquee` | `marquee 60s linear infinite` |

### Transitions
- **Body theme transition:** `background-color 0.3s ease, color 0.3s ease`

---

## 7. Surface Effects & Chrome

| Element | Light | Dark |
|---------|-------|------|
| **Atmospheric mesh** | 3-layer radial gradient (oxford top-left, accent top-right, oxford bottom) at very low opacity | Disabled (`display: none`) |
| **Selection** | Background: `--sentra-fg`, Text: `--sentra-bg` | Background: `--sentra-accent`, Text: `--sentra-bg` |
| **Focus ring** | `2px solid var(--sentra-fg)`, offset `3px`, radius `2px` | `2px solid var(--sentra-accent)` |
| **Scrollbar thumb** | `rgba(0,33,71,0.18)` → hover `0.35` | `rgba(184,172,153,0.2)` |

---

## 8. Theme Infrastructure

| Property | Value |
|----------|-------|
| **Default theme** | `light` |
| **Allowed themes** | `light`, `dark` |
| **Persistence** | `localStorage` (primary) + `cookie` (SSR fallback) |
| **Cookie name** | `sentra-theme` |
| **localStorage key** | `sentra-theme` |
| **Hydration guard** | Inline `<head>` script runs before first paint to set `data-theme` |
| **SSR source of truth** | Cookie value injected into `html[data-theme]` |
| **Toggle API** | `theme.toggle()` switches `light ↔ dark` |
| **Scoped dark** | `[data-sentra-sim]` overrides canvas/bg/muted tokens without changing global theme |
