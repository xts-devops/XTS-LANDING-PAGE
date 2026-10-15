# TASKS — board

Statuses: todo · in-progress · blocked · review · done
Rule: set owner + `status: in-progress` before editing. Keep tasks small & file-scoped.
Lanes: **claude** = components, layout/page, tokens · **codex** = tooling, content data, images, API, SEO, tests.
Spec: `docs/PLAN.md`. `→` = depends on.

## In flight
_(none)_

## Backlog

### M0 · Setup
- [ ] **T01 Scaffold Next.js 15 + TS + Tailwind v4**, add Motion, lucide-react, zod; scripts `dev/build/lint/typecheck/verify`; `.env.example`; Prettier ... owner: codex · status: todo
- [ ] **T02 Content contract** `src/content/types.ts` per PLAN §6 → T01 ... owner: claude · status: todo (shared — Codex reviews)
- [ ] **T03 Design tokens + fonts** in `globals.css` `@theme` + `layout.tsx` (Michroma, Manrope) → T01 ... owner: claude · status: todo
- [ ] **T04 Placeholder content** for all sections in `src/content/*.ts` → T02 ... owner: codex · status: todo

### M1 · Skeleton (all sections, placeholder images)
- [ ] **T10 UI primitives**: Container, Section, Eyebrow, Button, Card, Chip → T03 ... owner: claude · status: todo
- [ ] **T11 Header + Hero + ProofBar** → T10 ... owner: claude · status: todo
- [ ] **T12 Solutions (4 pillars)** → T10 ... owner: claude · status: todo
- [ ] **T13 Featured Work** → T10 ... owner: claude · status: todo
- [ ] **T14 Industries selector** → T10 ... owner: claude · status: todo
- [ ] **T15 Process timeline** → T10 ... owner: claude · status: todo
- [ ] **T16 Why XTS + stack strip** → T10 ... owner: claude · status: todo
- [ ] **T17 Contact section + Footer (form UI, states)** → T10 ... owner: claude · status: todo
- [ ] **T18 Image set v1** per `docs/IMAGE-BRIEF.md`, AVIF/WebP, licence log ... owner: codex · status: todo

### M2 · Polish
- [ ] **T20 Motion pass** (reveals, count-up, process line draw, reduced-motion) ... owner: claude · status: todo
- [ ] **T21 Responsive + a11y pass** (375/768/1440, keyboard, contrast) ... owner: claude · status: todo
- [ ] **T22 Playwright smoke** (sections render, nav anchors, form validation) ... owner: codex · status: todo

### M3 · Ship
- [ ] **T30 Contact API** `api/contact` (zod, honeypot, rate limit, Resend) ... owner: codex · status: todo
- [ ] **T31 SEO**: metadata, OG image, sitemap, robots, JSON-LD Organization ... owner: codex · status: todo
- [ ] **T32 Lighthouse budget** (Perf ≥90, A11y ≥95, SEO 100) + fixes ... owner: codex · status: todo
- [ ] **T33 Vercel deploy** ... owner: codex · status: todo

### Blocked on XTS (user)
- [ ] **Q1** Real proof numbers · **Q2** 2–3 case studies · **Q3** contact details · **Q4** SVG logo · **Q5** allowed partner logos · **Q6** domain — see PLAN §8 ... owner: user · status: blocked

## Done (recent)
- [x] Plan v1: IA rework, section specs, tokens, image brief (claude)
- [x] Coordination scaffold (claude)
