# sentra-main — Light theme + toggle implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menambah tema **terang** sebagai opsi pengguna pada situs marketing `sentra-main`, dengan **tema gelap tetap default** (identik perilaku warna saat ini), persistensi `localStorage`, kontrol **Light/Dark** di kanan atas, serta token CSS yang aman untuk chart/SVG.

**Architecture:** `:root` di [`app/globals.css`](D:\Devop\abyss-monorepo\apps\healthcare\sentra-main\app\globals.css) tetap memuat palet **gelap** saat ini. Blok baru `html[data-theme="light"]` meng-override semua `--sentra-*` (dan turunan `--sdx-*` yang perlu) ke palet terang. Komponen klien `ThemeToggle` menulis `document.documentElement.dataset.theme` dan `localStorage` key `sentra-theme`. Skrip inline ringkas di root layout membaca `localStorage` sebelum paint untuk mengurangi FOUC. Token `--sentra-chart-fill` (nama final boleh disesuaikan) memisahkan **isi grafik** dari `--sentra-bg` agar chart tidak pucat di light.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4 (`@theme` + `var(--sentra-*)`), `lucide-react`, tanpa `next-themes` (YAGNI kecuali kebutuhan SSR meta tema muncul).

**Rujukan desain:** [`docs/superpowers/specs` tidak wajib — ringkasan keputusan produk] palet ringkas: page light `#f6f3ed` (krim) **atau** hibrida `#ffffff` + canvas `#f9f6f1`; fg `#252019`; accent `#eb5939`; Audrey `#8f5f2f`; teal `#3d6b5c`; shadow halus + border.

---

## File map (tanggung jawab)

| File | Peran |
|------|--------|
| [`app/globals.css`](D:\Devop\abyss-monorepo\apps\healthcare\sentra-main\app\globals.css) | Tambah `:root --sentra-chart-fill`; blok besar `html[data-theme="light"] { ... }` override token + shadow |
| [`components/ThemeToggle.tsx`](D:\Devop\abyss-monorepo\apps\healthcare\sentra-main\components\ThemeToggle.tsx) | **Baru** — tombol Sun/Moon, sync DOM + localStorage |
| [`components/ThemeToggleFloating.tsx`](D:\Devop\abyss-monorepo\apps\healthcare\sentra-main\components\ThemeToggleFloating.tsx) | **Baru** — fixed kanan atas; `usePathname`; sembunyikan di `/` dan `/story` |
| [`components/Navbar.tsx`](D:\Devop\abyss-monorepo\apps\healthcare\sentra-main\components\Navbar.tsx) | Sisipkan `<ThemeToggle variant="inline" />` sebelum tombol Menu |
| [`app/layout.tsx`](D:\Devop\abyss-monorepo\apps\healthcare\sentra-main\app\layout.tsx) | Skrip anti-FOUC di `<head>`; render `<ThemeToggleFloating />` dibungkus `<Suspense>` |
| [`app/story/page.tsx`](D:\Devop\abyss-monorepo\apps\healthcare\sentra-main\app\story\page.tsx) | Sisipkan `ThemeToggle` di nav kanan |
| [`components/SentraSim.tsx`](D:\Devop\abyss-monorepo\apps\healthcare\sentra-main\components\SentraSim.tsx) | Ganti `fill="var(--sentra-bg)"` → `var(--sentra-chart-fill)` (dan sejenis) |
| [`components/ClinicalTrajectory.tsx`](D:\Devop\abyss-monorepo\apps\healthcare\sentra-main\components\ClinicalTrajectory.tsx) | Sama |
| [`components/ClinicalPrognosis.tsx`](D:\Devop\abyss-monorepo\apps\healthcare\sentra-main\components\ClinicalPrognosis.tsx) | Sama |
| [`components/Hero.tsx`](D:\Devop\abyss-monorepo\apps\healthcare\sentra-main\components\Hero.tsx) | Pass kontras bubble/light (border/opacity) bila perlu |
| [`ARCHITECTURE.md`](D:\Devop\abyss-monorepo\apps\healthcare\sentra-main\ARCHITECTURE.md) | Satu paragraf / baris tabel: tema dual + lokasi toggle |

---

### Task 1: Token `--sentra-chart-fill` di dark (baseline)

**Files:**
- Modify: `D:\Devop\abyss-monorepo\apps\healthcare\sentra-main\app\globals.css` (di dalam `:root`, setelah `--sentra-bg`)

- [ ] **Step 1: Tambah variabel chart di `:root`**

Tambahkan agar isi donut / area gelap di chart **tetap sama** di tema gelap seperti saat ini memakai `fill="var(--sentra-bg)"`:

```css
  /* Chart / SVG interior — sama dengan page bg di dark; override di light */
  --sentra-chart-fill: #0d0d0d;
```

- [ ] **Step 2: Grep sisa penggunaan `var(--sentra-bg)` di SVG**

Run (PowerShell):

```powershell
Set-Location D:\Devop\abyss-monorepo\apps\healthcare\sentra-main
rg 'var\(--sentra-bg\)' components
```

Expected: minimal **SentraSim** (`stroke="var(--sentra-bg)"`), **ClinicalTrajectory** (`fill="var(--sentra-bg)"` pada circle), **ClinicalPrognosis** (`fill="var(--sentra-bg)"`). **Hero** memakai `--sentra-bg` di gradient card — **jangan** ganti ke chart-fill; biarkan token light yang mengatur kontras permukaan.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "chore(sentra-main): add --sentra-chart-fill token for theme-safe charts"
```

---

### Task 2: Ganti fill chart ke `--sentra-chart-fill`

**Files:**
- Modify: `components/SentraSim.tsx`, `components/ClinicalTrajectory.tsx`, `components/ClinicalPrognosis.tsx`

- [ ] **Step 1: Replace string**

Di **SentraSim**, **ClinicalTrajectory**, **ClinicalPrognosis** saja, ganti atribut SVG yang membutuhkan **area gelap pada chart** (bukan background halaman):

```tsx
fill="var(--sentra-bg)"   → fill="var(--sentra-chart-fill)"
stroke="var(--sentra-bg)" → stroke="var(--sentra-chart-fill)"
```

Jangan mengubah pemakaian `--sentra-bg` di class Tailwind / gradient non-SVG (contoh Hero).

- [ ] **Step 2: `pnpm build`**

Run:

```powershell
Set-Location D:\Devop\abyss-monorepo\apps\healthcare\sentra-main
pnpm build
```

Expected: `Compiled successfully` tanpa error TypeScript.

- [ ] **Step 3: Commit**

```bash
git add components/SentraSim.tsx components/ClinicalTrajectory.tsx components/ClinicalPrognosis.tsx
git commit -m "fix(sentra-main): use --sentra-chart-fill for SVG chart fills"
```

---

### Task 3: Blok palet `html[data-theme="light"]`

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Tambah blok override setelah `:root` … `}`**

Gunakan **satu** blok (sesuaikan hex setelah smoke test kontras):

```css
html[data-theme="light"] {
  --sentra-bg: #f6f3ed;
  --sentra-fg: #252019;
  --sentra-accent: #eb5939;
  --sentra-white: #fff;

  --sentra-muted: #6b625a;
  --sentra-muted-text: #5e564de6;
  --sentra-muted-half: #5e564d99;
  --sentra-muted-subtle: #5e564d33;
  --sentra-muted-faint: #5e564d1f;
  --sentra-muted-line: #25201926;

  --sentra-canvas: #fffcf7;
  --sentra-canvas-dark: #faf7f2;
  --sentra-panel-1: #f4f1eb;
  --sentra-panel-2: #efece6;
  --sentra-panel-3: #e8e5df;

  --sentra-critical: #c13d32;
  --sentra-warning: #d97706;

  --sentra-audrey: #8f5f2f;
  --sentra-audrey-teal: #3d6b5c;
  /* Set ulang RGB custom properties yang dipakai rgb(var(--sentra-audrey-rgb) / …) */
  --sentra-audrey-rgb: 143 95 47;
  --sentra-audrey-teal-rgb: 61 107 92;
  --sentra-critical-rgb: 193 61 50;

  --sentra-chart-fill: #1a1614;

  --sentra-shadow-card: 0 1px 2px rgb(0 0 0 / 0.06), 0 4px 12px rgb(0 0 0 / 0.04);
  --sentra-shadow-elevated: 0 1px 2px rgb(0 0 0 / 0.06);
  --sentra-shadow-subtle: 0 1px 1px rgb(0 0 0 / 0.04);
  --sentra-shadow-accent: 0 8px 24px rgba(235, 89, 57, 0.18);
  --sentra-shadow-accent-strong: 0 8px 28px rgba(235, 89, 57, 0.22);

  --sdx-grid-faint: rgba(37, 32, 25, 0.04);
}
```

**Catatan:** variabel yang memakai `rgb(var(--sentra-audrey-rgb) / …)` **wajib** punya `--sentra-audrey-rgb` light yang valid (bukan lagi 196 149 106). Audit `globals.css` untuk semua `*-rgb` dan duplikasi aturan `rgb(...)` yang masih mengasumsikan warna gelap.

- [ ] **Step 2: `pnpm build`**

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat(sentra-main): light theme CSS variables under html[data-theme=light]"
```

---

### Task 4: `ThemeToggle` (inline)

**Files:**
- Create: `components/ThemeToggle.tsx`

- [ ] **Step 1: Buat komponen**

```tsx
// Architected and built by Classy.
"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "sentra-theme";

type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export default function ThemeToggle({
  variant = "inline",
}: {
  variant?: "inline" | "floating";
}) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }, [theme]);

  const isLight = theme === "light";
  const baseBtn =
    "rounded-full border border-muted/30 p-2 text-foreground hover:border-accent/50 hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <button
      type="button"
      onClick={toggle}
      className={variant === "floating" ? `${baseBtn} bg-background/90 shadow-sm backdrop-blur-sm` : baseBtn}
      aria-label={isLight ? "Aktifkan tema gelap" : "Aktifkan tema terang"}
    >
      {isLight ? <Moon size={18} aria-hidden /> : <Sun size={18} aria-hidden />}
    </button>
  );
}
```

- [ ] **Step 2: `pnpm lint`**

- [ ] **Step 3: Commit**

```bash
git add components/ThemeToggle.tsx
git commit -m "feat(sentra-main): ThemeToggle client control for light/dark"
```

---

### Task 5: `ThemeToggleFloating` + root layout

**Files:**
- Create: `components/ThemeToggleFloating.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Buat `ThemeToggleFloating.tsx`**

```tsx
// Architected and built by Classy.
"use client";

import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function ThemeToggleFloating() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/story") return null;

  return (
    <div className="fixed top-6 right-6 z-[60]">
      <ThemeToggle variant="floating" />
    </div>
  );
}
```

- [ ] **Step 2: Edit `app/layout.tsx`**

1. Import:

```tsx
import { Suspense } from "react";
import ThemeToggleFloating from "@/components/ThemeToggleFloating";
```

2. Di dalam `<html>`, **di awal `<head>`**, tambahkan skrip inline (satu baris minify boleh):

```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `(function(){try{var k='sentra-theme',t=localStorage.getItem(k),d=document.documentElement;if(t==='light')d.setAttribute('data-theme','light');else d.setAttribute('data-theme','dark');}catch(e){}})();`,
  }}
/>
```

3. Di dalam `<body>`, dekat anak utama (mis. setelah `children` atau sebelum), tambahkan:

```tsx
<Suspense fallback={null}>
  <ThemeToggleFloating />
</Suspense>
```

Pastikan tidak merusak struktur JSON-LD / metadata yang ada.

- [ ] **Step 3: `pnpm build`**

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx components/ThemeToggleFloating.tsx
git commit -m "feat(sentra-main): floating theme toggle + anti-FOUC script in layout"
```

---

### Task 6: Navbar + Story nav

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `app/story/page.tsx`

- [ ] **Step 1: `Navbar.tsx`**

Import:

```tsx
import ThemeToggle from "@/components/ThemeToggle";
```

Ubah cluster kanan dari satu `button` menjadi grup flex, mis.:

```tsx
<div className="flex items-center gap-3">
  <ThemeToggle variant="inline" />
  <button
    className="text-foreground hover:text-accent transition-colors flex items-center gap-3"
    onClick={() => setIsOpen(true)}
    aria-label="Open menu"
  >
    ...
  </button>
</div>
```

- [ ] **Step 2: `story/page.tsx`**

Di dalam `<nav>…` baris kanan (`flex items-center gap-4`), import `ThemeToggle` dan render `<ThemeToggle variant="inline" />` di dalam grup tersebut.

- [ ] **Step 3: Manual check**

Buka `http://localhost:3000/`, `/story`, `/insights` — pastikan **tepat satu** tombol tema terlihat per viewport; toggle tidak dobel.

- [ ] **Step 4: Commit**

```bash
git add components/Navbar.tsx app/story/page.tsx
git commit -m "feat(sentra-main): theme toggle in Navbar and Story nav"
```

---

### Task 7: Hero bubble contrast (light)

**Files:**
- Modify: `components/Hero.tsx`

- [ ] **Step 1:** Dengan `data-theme="light"`, periksa `KonsultasiCard` (border `audreyBubble` / gradient `sentra-canvas` → `sentra-bg`). Sesuaikan class Tailwind hanya jika kontras tidak cukup (mis. naikkan opacity border atau gelapkan teks sekunder).

- [ ] **Step 2: `pnpm build`**

- [ ] **Step 3: Commit** (jika ada diff)

```bash
git add components/Hero.tsx
git commit -m "fix(sentra-main): hero chat card contrast for light theme"
```

---

### Task 8: Dokumentasi + verifikasi akhir

**Files:**
- Modify: `ARCHITECTURE.md` (bagian desain / Navbar / globals)

- [ ] **Step 1:** Ringkas satu blok: dual theme, `data-theme`, `localStorage`, lokasi kontrol.

- [ ] **Step 2: `pnpm lint` && `pnpm build`**

- [ ] **Step 3: Playwright (opsional)**

```powershell
pnpm exec playwright test
```

Jika repo belum punya asersi tema, minimal smoke `homepage loads` tetap hijau.

- [ ] **Step 4: Commit**

```bash
git add ARCHITECTURE.md
git commit -m "docs(sentra-main): document dual theme and theme toggle"
```

---

## Self-review (skill checklist)

1. **Spec coverage:** Default dark — Task 3 + skrip Task 5. Toggle kanan atas — Task 4–6. Chart — Task 1–2. Hero — Task 7. Docs — Task 8.
2. **Placeholder scan:** Tidak ada TBD dalam langkah eksekusi; hex light boleh disesuaikan di Task 3 dengan catatan kontras.
3. **Konsistensi:** `dataset.theme` + `localStorage` key `sentra-theme` harus identik antara skrip inline dan `ThemeToggle`.

---

## Opsional ( luar scope utama )

- OG images (`app/opengraph-image.tsx`, `app/story/opengraph-image.tsx`) tetap gelap untuk brand, atau ikut token — keputusan produk terpisah.
- E2E baru: `localStorage` preset `light` lalu `goto('/')` assert `data-theme` pada `html`.

---

**Plan complete and saved to** `D:\Devop\abyss-monorepo\apps\healthcare\sentra-main\docs\superpowers\plans\2026-04-20-sentra-main-light-theme-toggle.md`.

**Opsi eksekusi:**

1. **Subagent-Driven (disarankan)** — subagent segar per task, review antar task.
2. **Inline execution** — jalankan task di sesi ini dengan checkpoint.

**Pilih pendekatan mana untuk implementasi?**
