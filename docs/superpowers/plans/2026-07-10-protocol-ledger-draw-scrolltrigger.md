# Plan — "Protocol Ledger Draw": ScrollTrigger untuk section bawah homepage

Date: 2026-07-10 · Approved in chat by Chief · Class B

## Goal

Bagian bawah homepage (mulai "Introducing the Protocols 7") terasa datar —
semuanya cuma `Reveal` fade. Tambahkan scroll-driven animation GSAP
ScrollTrigger dengan bahasa visual yang sama dengan BlueprintStory & hero
Blueprint Draw: garis menggambar diri, stempel, dan satu momen khas — formula
protokol menyusun diri via ScrambleText.

Keputusan desain (dikunci di chat):

- Konsep: **Protocol Ledger Draw** — TANPA pin baru (panjang scroll sensitif
  bagi Chief; tidak berubah).
- Cakupan: `Services`, `ClinicalSuite`, `ScrollGallery`/`SentraBentoCards`.
  `FAQ` TIDAK disentuh (mood kertas terang memang sengaja beda).
- Always-on tanpa cek prefers-reduced-motion (preseden
  hero/marquee/BlueprintStory).
- Interaksi accordion Services & tab ClinicalSuite tidak boleh berubah.

## Per section

### Services — pusat perhatian

- Header (eyebrow/judul/deskripsi): rise sekali saat masuk (`top 80%`).
- Rail progres: hairline vertikal di tepi kiri list (lg-only, dekoratif), fill
  accent `scaleY` scrub mengikuti scroll sepanjang list.
- Tiap baris protokol (7): overlay hairline accent di bawah baris menggambar
  `scaleX 0→1` lalu memudar (kesan tinta menjiplak border statis); nomor stempel
  (autoAlpha+scale); judul rise; **formula ScrambleText** menyusun diri (SSR
  merender formula final — scramble hanya efek enter, sekali).
- Semua `Reveal` framer di file ini diganti GSAP.

### ClinicalSuite

- Header rise; kontainer workspace autoAlpha+y; tab sidebar cascade dari kiri
  (stagger); double-rule accent bawah menyapu `scaleX` sekali.

### SentraBentoCards (via ScrollGallery)

- `Reveal` diganti GSAP: kartu entrance stagger (fade+rise).
- Parallax halus scrub per kartu (offset y berbeda-beda, drift ke 0) — lg-only
  via `ScrollTrigger.matchMedia`. Restrukturisasi kecil `PlusCard`: root div =
  target parallax, wrapper konten = target entrance (hindari konflik transform
  di elemen yang sama).
- `CountUp` (rAF) yang sudah ada dibiarkan.

## Teknis

- Plugin: `ScrollTrigger` (sudah dipakai BlueprintStory) + `ScrambleTextPlugin`
  (bundled gsap 3.14, tanpa dependency baru). Register per komponen
  (idempotent).
- Pola per komponen: `useEffect` + `gsap.context(scope)` +
  `gsap.utils.selector`; initial state via `gsap.set` di effect (bukan CSS
  hidden) — no-JS fallback = konten langsung terlihat.
- `once: true`/`toggleActions: 'play none none none'` untuk entrance; scrub
  hanya untuk rail Services & parallax bento.
- `ScrollTriggerSync` sudah menangani refresh saat layout shift.

## Verifikasi

1. lint + `tsc --noEmit` + build.
2. Playwright (localhost, BUKAN 127.0.0.1): scroll ke tiap section — trigger
   jalan, formula kembali persis ke teks asli pasca-scramble, accordion & tab
   masih berfungsi, rail fill bergerak saat scrub, 0 console error, overflow-x
   375px = 0.
3. Screenshot momen enter tiap section, desktop + mobile.
4. Update `.agent/HANDOFF.md` + `PROGRESS.md`. Commit menunggu GO Chief.
