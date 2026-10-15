# TASKS — board

Statuses: todo · in-progress · blocked · review · done
Rule: set owner + `status: in-progress` before editing. Keep tasks small & file-scoped.
Lanes: **claude** = components, layouts, pages, scripts, styles/tokens · **codex** = tooling/CI, content data, images, brand assets, form logic, SEO config, tests.
Spec: `docs/PLAN.md` (v1.2, stack in §5). `→` = depends on.

## In flight
_(none)_

## Backlog

### M0 · Setup
- [ ] **T00 GitHub repo** (private), push `main` ... owner: claude · status: todo (awaiting user go-ahead)
- [ ] **T01 Scaffold Astro 7 + TS strict + Tailwind v4** (`@tailwindcss/vite`), `@lucide/astro`, Fontsource fonts, `@astrojs/sitemap`, zod; ESLint (`eslint-plugin-astro`) + Prettier (`prettier-plugin-astro`); `.nvmrc`; scripts `dev/build/check/lint/format/verify`; `.env.example` (`PUBLIC_SITE_URL`, `PUBLIC_FORM_ACCESS_KEY`, `PUBLIC_CAPTCHA_SITE_KEY`) ... owner: codex · status: todo
- [ ] **T02 Content contract** `src/content/types.ts` per PLAN §6 → T01 ... owner: claude · status: todo (shared — Codex reviews)
- [ ] **T03 Tokens + fonts + Base layout** (`styles/global.css` `@theme`, `layouts/Base.astro`) → T01 ... owner: claude · status: todo
- [ ] **T04 Content** for all sections in `src/content/*.ts`, canonical contact + proof values from PLAN §6 → T02 ... owner: codex · status: todo
- [ ] **T05 Brand assets**: XTS logo → `public/brand/` per IMAGE-BRIEF §Brand; favicon set ... owner: codex · status: todo (waiting on logo file)
- [ ] **T06 CI**: GitHub Actions — `npm ci` → `verify` → Playwright, on push + PR → T00, T01 ... owner: codex · status: todo
- [ ] **T07 Form provider spike**: compare Web3Forms vs Formspree (free limits, client-side POST, captcha support, delivery to info@), record pick in DECISIONS ... owner: codex · status: todo

### M1 · Skeleton (6 sections, placeholder images)
- [ ] **T10 UI primitives**: Container, Section, Eyebrow, Button, Card, Chip, Icon → T03 ... owner: claude · status: todo
- [ ] **T11 Header + Hero + ProofBar** (count + text proofs) → T10 ... owner: claude · status: todo
- [ ] **T12 Solutions (4 pillars)** → T10 ... owner: claude · status: todo
- [ ] **T13 Showcase** (3 anonymised cards, CTA prefills form need) → T10 ... owner: claude · status: todo
- [ ] **T14 Industries selector** (accessible tabs pattern, vanilla TS) → T10 ... owner: claude · status: todo
- [ ] **T15 Process** (3 principles + 5-step timeline) → T10 ... owner: claude · status: todo
- [ ] **T16 Contact section + Footer** (form UI + states + consent checkbox, contact block) → T10 ... owner: claude · status: todo
- [ ] **T17 Privacy page** layout (claude) + copy in `content/privacy.ts` (codex), RA 10173 basics ... owner: claude + codex · status: todo
- [ ] **T18 Generated image set v1** per `docs/IMAGE-BRIEF.md` → `src/assets/images/`, source log ... owner: codex · status: todo

### M2 · Polish
- [ ] **T20 Motion pass** (reveals, count-up, process line draw, reduced-motion) ... owner: claude · status: todo
- [ ] **T21 Responsive + a11y pass** (375/768/1440, keyboard, contrast) ... owner: claude · status: todo
- [ ] **T22 Playwright smoke** (sections render, nav anchors, selector, form validation, tel/mailto) ... owner: codex · status: todo

### M3 · Ship
- [ ] **T30 Form wiring** `src/lib/form.ts`: zod, honeypot, captcha, provider POST → info@xzentechsolutions.com → T07 ... owner: codex · status: todo
- [ ] **T31 SEO**: meta/OG values, OG image, sitemap, robots, JSON-LD Organization (PH, email, phone); `site` from `PUBLIC_SITE_URL` ... owner: codex · status: todo
- [ ] **T32 Lighthouse CI budget** (Perf ≥95, A11y ≥95, SEO 100) + fixes ... owner: codex · status: todo
- [ ] **T33 Vercel**: connect GitHub repo, preview per branch, prod from `main`, Web Analytics on ... owner: user + codex · status: todo

### Later
- [ ] **T40 Domain cutover** to xzentechsolutions.com — DNS, switch form to Resend with verified sender, canonical URL. Only when XTS says the domain is free ... owner: user + codex · status: blocked

### Waiting on XTS (user)
- [ ] **Q4** logo file (being sent to Codex) ... owner: user · status: blocked

## Done (recent)
- [x] Stack decided: Astro, no CMS, GitHub, English only (claude + user)
- [x] Plan v1.1: XTS answers applied (claude)
- [x] Plan v1: IA rework, section specs, tokens, image brief (claude)
- [x] Coordination scaffold + git init (claude)
