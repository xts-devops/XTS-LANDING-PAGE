# TASKS — board

Statuses: todo · in-progress · review · blocked · done
Rule: set owner + `status: in-progress` before editing. One section/concern per task & branch.
Lanes (D15): **codex** = UI/UX, motion, images, copy · **claude** = architecture, backend, tests, CI, perf, reviews.
Flow: `docs/DEV-FLOW.md` — phases P0→P5 with gates G1–G3. `→` = depends on.

## In flight
_(none)_ — **MVP merged to  (PR #6, 2026-10-18)**. #2–#5 closed/merged; GitHub has only  + Codex's backup .
- Open: **U1** Web3Forms key · **T05** vector logo · **T33** Vercel · **T38** indexing at launch · **T09** dev-dep audit · **T18** extra photos (optional) · XTS review of Privacy + Terms copy.

## P0 · Foundation (codex)
- [x] **T01 Scaffold** Astro 7 + TS strict + Tailwind v4, Fontsource, `@lucide/astro`, sitemap, zod, ESLint/Prettier, `.nvmrc`, `verify` script, `.env.example` ... owner: codex · status: done (MVP PR, D20)
- [ ] **T05 Brand assets** → `public/brand/` + favicon set (originals are raster — vector still wanted before launch) ... owner: codex · status: blocked (originals ready; favicon derivatives await vector)
- [x] **T08 Theme foundation** — tokens from PLAN §4 + motion tokens from MOTION §2. Move `public/brand/theme.css` → `src/styles/tokens.css` (files in `public/` aren't processed by Tailwind) ... owner: codex · status: done (MVP PR, D20)
- [x] **T02 Content contract** `src/content/types.ts` per PLAN §6 ... owner: codex · status: done (MVP PR, D20)

## P1 · Draft UI (codex) — layout, type, real copy, placeholder images, no motion
- [x] **T10 Base layout + UI primitives** (Base.astro, Container, Section, Eyebrow, Button, Card, Chip, Icon) → T01, T08 ... owner: codex · status: done (MVP PR, D20)
- [x] **T11 Header + Hero + ProofBar** (hero dashboard as static blocks for now) → T10 ... owner: codex · status: done (MVP PR, D20)
- [x] **T12 Solutions** → T10 ... owner: codex · status: done (MVP PR, D20)
- [x] **T13 Showcase** → T10 ... owner: codex · status: done (MVP PR, D20)
- [x] **T14 Industries** (static first; selector logic in P2) → T10 ... owner: codex · status: done (MVP PR, D20)
- [x] **T15 Process** → T10 ... owner: codex · status: done (MVP PR, D20)
- [x] **T16 Contact + Footer** (form markup only) → T10 ... owner: codex · status: done (MVP PR, D20)
- [x] **T04 Content** for all sections in `src/content/*.ts` (canonical values PLAN §6) → T02 ... owner: codex · status: done (MVP PR, D20)
- [ ] **G1 Composition gate** — screenshots 375/768/1440, Claude review + user approval ... owner: user + claude · status: todo

## P2 · Hi-fi UI (codex)
- [ ] **T18 Generated image set v1** per IMAGE-BRIEF → `src/assets/images/` ... owner: codex · status: todo
- [x] **T19 Hero living dashboard** (coded SVG/HTML panels over backdrop, static) ... owner: codex · status: done (MVP PR, D20)
- [x] **T21 States pass** — hover, focus-visible, active, form states, industries selector (keyboard tabs pattern) ... owner: codex · status: done (MVP PR, D20)
- [x] **T17 Privacy page** layout (codex) + copy `content/privacy.ts` (claude) ... owner: codex + claude · status: done (MVP PR, D20)
- [ ] **G2 Visual gate** — pixel review + a11y/contrast/semantics pass ... owner: user + claude · status: todo

## P3 · Motion (codex)
- [x] **T20 Motion foundation** — GSAP + plugins + Lenis, `scripts/motion/index.ts`, tokens, `gsap.matchMedia` reduced-motion branch, `.js` reveal guard ... owner: codex · status: done (MVP PR, D20)
- [x] **T25 Hero sequence + dashboard animation + proof count-up** ... owner: codex · status: done (MVP PR, D20)
- [x] **T26 Section reveals** (heads, card batches, image clip reveals, showcase parallax/tilt) ... owner: codex · status: done (MVP PR, D20)
- [x] **T27 Industries transitions + process line scrub** ... owner: codex · status: done (MVP PR, D20)
- [x] **T28 Micro-interactions** (buttons sheen/magnetic, cursor spotlight, inputs, submit states) ... owner: codex · status: done (MVP PR, D20)
- [ ] **G3 Motion gate** — recording/preview + Claude perf check vs MOTION §6 ... owner: user + claude · status: todo

## Claude parallel track (during P1–P3, no UI files)
- [x] **T07 Form provider spike** → **Web3Forms** (D18, `docs/spikes/T07-form-provider.md`) ... owner: claude · status: done
- [ ] **U1 Create Web3Forms access key** with info@xzentechsolutions.com → `.env` `PUBLIC_FORM_ACCESS_KEY` ... owner: user · status: todo
- [x] **T23 Screenshot script** `npm run shots` (Playwright → `docs/review/<branch>/` at 375/768/1440) → PR #2 (stacked on Codex's scaffold) ... owner: claude · status: done (MVP PR, D20)
- [x] **T06 CI on PRs** — browser job (e2e + screenshot artifact `review-shots-pr<N>`) → PR #2 ... owner: claude · status: done (MVP PR, D20)
- [x] **T30 Form logic** `src/lib/form.ts` + `scripts/form.ts` (zod, honeypot, captcha, provider POST) → T07 ... owner: claude · status: done (MVP PR, D20)
- [x] **T31 SEO** — `<Seo />`, JSON-LD, robots, indexing gate (`PUBLIC_ALLOW_INDEXING`), Vercel URL fallback → PR #3 ... owner: claude · status: done (MVP PR, D20)
- [x] **T24 Test harness** — e2e smoke + axe a11y + Lighthouse budgets, wired into CI → PR #4 ... owner: claude · status: done (MVP PR, D20)
- [ ] **T38 Launch switch**: set `PUBLIC_ALLOW_INDEXING=true` on the production deploy only ... owner: user + claude · status: todo (at P5)

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
