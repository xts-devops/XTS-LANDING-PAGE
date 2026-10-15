# TASKS — board

Statuses: todo · in-progress · blocked · review · done
Rule: set owner + `status: in-progress` before editing. Keep tasks small & file-scoped.
Lanes: **claude** = components, layout/page, tokens · **codex** = tooling, content data, images, brand assets, API, SEO, tests.
Spec: `docs/PLAN.md` (v1.1). `→` = depends on.

## In flight
_(none)_

## Backlog

### M0 · Setup
- [ ] **T01 Scaffold Next.js 15 + TS + Tailwind v4**, add Motion, lucide-react, zod; scripts `dev/build/lint/typecheck/verify`; `.env.example` (`NEXT_PUBLIC_SITE_URL`, form provider key); Prettier ... owner: codex · status: todo
- [ ] **T02 Content contract** `src/content/types.ts` per PLAN §6 → T01 ... owner: claude · status: todo (shared — Codex reviews)
- [ ] **T03 Design tokens + fonts** in `globals.css` `@theme` + `layout.tsx` (Michroma, Manrope) → T01 ... owner: claude · status: todo
- [ ] **T04 Content** for all sections in `src/content/*.ts`, using the canonical contact + proof values in PLAN §6 → T02 ... owner: codex · status: todo
- [ ] **T05 Brand assets**: XTS logo (sent by user) → `public/brand/` per IMAGE-BRIEF §Brand; favicon set ... owner: codex · status: todo (waiting on logo file)

### M1 · Skeleton (6 sections, placeholder images)
- [ ] **T10 UI primitives**: Container, Section, Eyebrow, Button, Card, Chip → T03 ... owner: claude · status: todo
- [ ] **T11 Header + Hero + ProofBar** (count + text proofs) → T10 ... owner: claude · status: todo
- [ ] **T12 Solutions (4 pillars)** → T10 ... owner: claude · status: todo
- [ ] **T13 Showcase** (3 anonymised cards, CTA prefills form need) → T10 ... owner: claude · status: todo
- [ ] **T14 Industries selector** → T10 ... owner: claude · status: todo
- [ ] **T15 Process** (3 principles + 5-step timeline) → T10 ... owner: claude · status: todo
- [ ] **T16 Contact section + Footer** (form UI + states, contact block, socials hidden when empty) → T10 ... owner: claude · status: todo
- [ ] **T18 Generated image set v1** per `docs/IMAGE-BRIEF.md`, AVIF/WebP, source log ... owner: codex · status: todo

### M2 · Polish
- [ ] **T20 Motion pass** (reveals, count-up, process line draw, reduced-motion) ... owner: claude · status: todo
- [ ] **T21 Responsive + a11y pass** (375/768/1440, keyboard, contrast) ... owner: claude · status: todo
- [ ] **T22 Playwright smoke** (sections render, nav anchors, form validation, tel/mailto links) ... owner: codex · status: todo

### M3 · Ship
- [ ] **T30 Contact API** `api/contact` (zod, honeypot, rate limit) → delivers to info@xzentechsolutions.com via a provider needing **no DNS changes** (D10) ... owner: codex · status: todo
- [ ] **T31 SEO**: metadata, OG image, sitemap, robots, JSON-LD Organization (PH address country, email, phone); base URL from `NEXT_PUBLIC_SITE_URL` ... owner: codex · status: todo
- [ ] **T32 Lighthouse budget** (Perf ≥90, A11y ≥95, SEO 100) + fixes ... owner: codex · status: todo
- [ ] **T33 Vercel preview deploy** (no custom domain yet) ... owner: codex · status: todo

### Later
- [ ] **T40 Domain cutover** to xzentechsolutions.com — DNS, verified email sender, canonical URL. Only when XTS says the domain is free ... owner: user + codex · status: blocked

### Waiting on XTS (user)
- [ ] **Q4** logo file (being sent to Codex) · **Q7** social profile URLs ... owner: user · status: blocked

## Done (recent)
- [x] Plan v1.1: XTS answers applied — 2 proof figures, Showcase, Why-XTS merged into Process, contact details (claude)
- [x] Plan v1: IA rework, section specs, tokens, image brief (claude)
- [x] Coordination scaffold + git init (claude)
