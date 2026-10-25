# TASKS — board

Statuses: todo · in-progress · review · blocked · done
Rule: set owner + `status: in-progress` before editing. One section/concern per task & branch.
Lanes (D15): **codex** = UI/UX, motion, images, copy · **claude** = architecture, backend, tests, CI, perf, reviews.
Flow: `docs/DEV-FLOW.md` — phases P0→P5 with gates G1–G3. `→` = depends on.

## In flight
_(none)_ — **MVP merged to `main` (PR #6, 2026-10-18)**. #2–#5 closed/merged; GitHub has only `main` + Codex's backup `codex/wip-2026-10-18`.
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

## v2 media assignment
- [x] **V2-A Photoreal media** — 25 JPEGs, matched robotic-arm pair and complete source log ... owner: codex · status: done (merged via PR #7)
- [x] **V2-B Sample system UIs** — 33 HTML screens, DPR-2 PNGs, capture command and contact sheet ... owner: codex · status: done (merged via PR #7)

## v2 UI refinement
- [ ] **V2-UX Site refinement** — brand lockup, desktop/mobile composition, purposeful motion and photo art direction ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-DEMO Industry demo collection** — seven system-purpose previews, workflow overviews and robotic-arm media preparation ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-BOOT Global hero and brand entrance** — international/global copy, new studio composition and accessible session intro ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-SLIDES Preview controls and product media** — side navigation, accessible 3s rotation and photographic product thumbnails ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-OVERVIEW System-purpose previews** — descriptive naming, compact hover/tap workflows and photographic catalogue media ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-AUTOMATION Automation examples** — replies/BPO, email/document processing and factory hardware integrations with stronger visual direction ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-GALLERY Photo gallery motion** — scroll reveals, restrained image depth, hover/focus and full-photo inspection ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-PHONE Phone screen alignment** — perspective corners, responsive crop fitting and inspection overlay ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-PANORAMA Hero and sample-media audit** — panoramic hero, mobile media alignment and separated preview controls ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-HEADER Header balance** — brand scale, grouped navigation, action hierarchy and mobile menu ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-INTRO Extended XTS entrance** — deliberate staged reveal, visual polish and bounded accessible exit ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-SIGNAL Futuristic intro direction** — logo assembly, connection light and smooth hero dissolve ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-WORKSPACE Hero screen content** — sharp perspective-mapped workspace and controlled motion ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-ARM-VIDEO Higgsfield robotic arm transition** — one budgeted start/end-frame clip, review and scroll integration ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-ARM-HD 1080p arm and finite viewport transition** — quoted regeneration and shorter, smoother interaction ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-WORKSPACE-FIT Hero screen mounting and content** — precise photo insets and richer native-vector applications ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-SLIDE-IDLE Automatic showcase idle resumption** — compact controls, 3s cadence and 6s manual grace ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-OVERVIEW-FULL Hover workflow and fullscreen viewer** — automatic previews and accessible enlarged inspection ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-SLIDE-CADENCE POS automatic timing and looping** — stable 3s deadlines and cyclic navigation ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-PHOTO-VARIETY Distinct service gallery imagery** — audit repeated scenes and diversify software/hardware stories ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-ARM-HOLD Brief responsive arm showcase hold** — sticky desktop framing and finite viewport animation ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-SLIDE-LINE Thin playback progress control** — CSS fill, accessible pause and remaining-time rotation ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-CONSTRUCTION-PHASES Realistic construction phase showcase** — coherent phase imagery and synchronized project states ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-SPATIAL-JOURNEYS Property and hotel cinematic previews** — six HD films integrated; hover/fullscreen responsive viewer, native/mobile delivery and 91 checks ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-JOURNEY-CLEANUP Buffered cinematic preview UX** — bounded buffering, held-frame transitions and hover/fullscreen continuity; 98 checks ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-JOURNEY-POLISH Editorial property/hotel samples** — editorial themes, precise controls, lightweight thumbnails and 108 checks ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-BACK-TOP Quick footer return** — 550ms accessible footer return, native fallback and 31 checks ... owner: codex · status: review (codex/v2-ui-refinement)

- [ ] **V2-CAROUSEL-RECOVERY Autoplay and return positioning** — reliable visible autoplay, directional input and lower-right return; 61 checks ... owner: codex · status: review (codex/v2-ui-refinement)
