# TASKS — board

Statuses: todo · in-progress · review · blocked · done
Rule: set owner + `status: in-progress` before editing. One section/concern per task & branch.
Lanes (D15): **codex** = UI/UX, motion, images, copy · **claude** = architecture, backend, tests, CI, perf, reviews.
Flow: `docs/DEV-FLOW.md` — phases P0→P5 with gates G1–G3. `→` = depends on.

## In flight
- **T01** scaffold + dependencies — owner: codex · status: in-progress
- **T05** supplied brand assets — owner: codex · status: in-progress
- **T08** theme foundation — owner: codex · status: in-progress

## P0 · Foundation (codex)
- [ ] **T01 Scaffold** Astro 7 + TS strict + Tailwind v4, Fontsource, `@lucide/astro`, sitemap, zod, ESLint/Prettier, `.nvmrc`, `verify` script, `.env.example` ... owner: codex · status: in-progress
- [ ] **T05 Brand assets** → `public/brand/` + favicon set (originals are raster — vector still wanted before launch) ... owner: codex · status: in-progress
- [ ] **T08 Theme foundation** — tokens from PLAN §4 + motion tokens from MOTION §2. Move `public/brand/theme.css` → `src/styles/tokens.css` (files in `public/` aren't processed by Tailwind) ... owner: codex · status: in-progress
- [ ] **T02 Content contract** `src/content/types.ts` per PLAN §6 ... owner: codex · status: todo (shared — Claude reviews)

## P1 · Draft UI (codex) — layout, type, real copy, placeholder images, no motion
- [ ] **T10 Base layout + UI primitives** (Base.astro, Container, Section, Eyebrow, Button, Card, Chip, Icon) → T01, T08 ... owner: codex · status: todo
- [ ] **T11 Header + Hero + ProofBar** (hero dashboard as static blocks for now) → T10 ... owner: codex · status: todo
- [ ] **T12 Solutions** → T10 ... owner: codex · status: todo
- [ ] **T13 Showcase** → T10 ... owner: codex · status: todo
- [ ] **T14 Industries** (static first; selector logic in P2) → T10 ... owner: codex · status: todo
- [ ] **T15 Process** → T10 ... owner: codex · status: todo
- [ ] **T16 Contact + Footer** (form markup only) → T10 ... owner: codex · status: todo
- [ ] **T04 Content** for all sections in `src/content/*.ts` (canonical values PLAN §6) → T02 ... owner: codex · status: todo
- [ ] **G1 Composition gate** — screenshots 375/768/1440, Claude review + user approval ... owner: user + claude · status: todo

## P2 · Hi-fi UI (codex)
- [ ] **T18 Generated image set v1** per IMAGE-BRIEF → `src/assets/images/` ... owner: codex · status: todo
- [ ] **T19 Hero living dashboard** (coded SVG/HTML panels over backdrop, static) ... owner: codex · status: todo
- [ ] **T21 States pass** — hover, focus-visible, active, form states, industries selector (keyboard tabs pattern) ... owner: codex · status: todo
- [ ] **T17 Privacy page** layout (codex) + copy `content/privacy.ts` (claude) ... owner: codex + claude · status: todo
- [ ] **G2 Visual gate** — pixel review + a11y/contrast/semantics pass ... owner: user + claude · status: todo

## P3 · Motion (codex)
- [ ] **T20 Motion foundation** — GSAP + plugins + Lenis, `scripts/motion/index.ts`, tokens, `gsap.matchMedia` reduced-motion branch, `.js` reveal guard ... owner: codex · status: todo
- [ ] **T25 Hero sequence + dashboard animation + proof count-up** ... owner: codex · status: todo
- [ ] **T26 Section reveals** (heads, card batches, image clip reveals, showcase parallax/tilt) ... owner: codex · status: todo
- [ ] **T27 Industries transitions + process line scrub** ... owner: codex · status: todo
- [ ] **T28 Micro-interactions** (buttons sheen/magnetic, cursor spotlight, inputs, submit states) ... owner: codex · status: todo
- [ ] **G3 Motion gate** — recording/preview + Claude perf check vs MOTION §6 ... owner: user + claude · status: todo

## Claude parallel track (during P1–P3, no UI files)
- [ ] **T07 Form provider spike** — Web3Forms vs Formspree: free limits, client-side POST, captcha, delivery to info@; record in DECISIONS ... owner: claude · status: todo
- [ ] **T23 Screenshot script** `npm run shots` (Playwright → `docs/review/<branch>/` at 375/768/1440) ... owner: claude · status: todo
- [ ] **T06 CI on PRs** — `npm ci` → `verify` → Playwright → upload screenshots artifact ... owner: claude · status: todo
- [ ] **T30 Form logic** `src/lib/form.ts` + `scripts/form.ts` (zod, honeypot, captcha, provider POST) → T07 ... owner: claude · status: todo
- [ ] **T31 SEO** — `components/seo/Seo.astro` + `JsonLd.astro` (Organization, PH, email, phone), OG image, robots, sitemap ... owner: claude · status: todo
- [ ] **T24 Test harness** — Playwright smoke + axe a11y + Lighthouse CI config with MOTION §6 budgets ... owner: claude · status: todo

## P4 · Harden (claude; codex fixes UI findings)
- [ ] **T32 Wire form + SEO into Codex's layout/contact** (small PR, Codex reviews) ... owner: claude · status: todo
- [ ] **T34 Visual-regression baselines** after G3 ... owner: claude · status: todo
- [ ] **T35 Perf + a11y audit & fix list** ... owner: claude · status: todo
- [ ] **T33 Vercel** — connect repo, previews per PR, prod from `main`, Web Analytics ... owner: user + claude · status: todo

## P5 · Launch (both)
- [ ] **T36 Cross-browser + real-device pass** (Chrome, iOS Safari, Firefox, Samsung Internet) ... owner: both · status: todo
- [ ] **T37 Production deploy** on Vercel URL ... owner: claude · status: todo

## Later
- [ ] **T40 Domain cutover** to xzentechsolutions.com — DNS, Resend sender, canonical URL. Only when XTS says the domain is free ... owner: user + claude · status: blocked

## Waiting on XTS (user)
- [ ] Vector (SVG) logo before launch — raster originals received ... owner: user · status: todo

## Done (recent)
- [x] T00 GitHub repo `BFC-XZEN/xts-landing-page` (claude)
- [x] Dev flow, motion system, lane swap (claude + user)
- [x] Stack decided: Astro, no CMS, GitHub, English only (claude + user)
- [x] Plan v1–v1.1, coordination scaffold, git init (claude)
