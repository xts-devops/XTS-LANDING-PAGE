# HANDOVER — XTS Landing Page

## What this is
Marketing landing page for **XZEN TECH SOLUTIONS (XTS)** — a Philippines-based technology
partner offering business platforms (POS/CRM/ERP/WMS), custom software, automation &
integration, and robotics/R&D. Single page + privacy page, dark + gold brand, built by
Claude and Codex together. Marketing site only (no app/portal planned), English only,
text edited in code (no CMS).

## Status (2026-10-16)
**MVP live on `main`** (PR #6 merged 2026-10-18; Claude + Codex combined). Repo: https://github.com/BFC-XZEN/xts-landing-page (private). Open: Web3Forms key (U1), vector logo (T05), Vercel (T33). D15 lanes resume after the MVP merges; see docs/DEV-FLOW.md.

Visuals are coded schematics (`src/components/art/`); add a photo to any pillar/showcase/industry via its optional `image` in `src/content/*` to replace its schematic. Brand favicons/OG: `node tools/make-brand-assets.mjs`.

## Company facts (approved for the site)
- Email `info@xzentechsolutions.com` · Phone `0969 244 2557` (`+63 969 244 2557`) · Philippines-based.
- Team: **international**, working with clients **globally** (user confirmed 2026-10-25). Use “globally”, not “abroad”; no specific offices, countries or headcount are confirmed.
- Public figures: **300+** business systems, **200+** robotics & automation projects. Nothing else.
- Client projects are confidential — no names, logos, or results. No partner logos. No social links.
- Domain `xzentechsolutions.com` is for later; it's live elsewhere now — don't touch DNS or hardcode it.

## Where things are
| Path | What |
|---|---|
| `docs/PLAN.md` | **The spec.** Structure, section specs, tokens, **stack & source layout (§5)**, content model, milestones. Read first. |
| `docs/IMAGE-BRIEF.md` | Every image the page needs, with prompts/ratios, brand assets, licence log. |
| `docs/reference/mockup-v1.webp` | Original visual mockup (look reference; structure superseded by PLAN.md). |
| `docs/DEV-FLOW.md` | **How we work**: phases, gates, PR + review loop, tooling. |
| `docs/MOTION.md` | Motion system, choreography, perf budget. |
| `AGENTS.md` / `CLAUDE.md` | Per-agent entry points, lanes, rules. **Codex = UI/UX lead · Claude = architecture/backend/quality** (D15). |
| `TASKS.md` · `PROGRESS.md` · `DECISIONS.md` | Board · session log · locked decisions. |

## Stack (summary — details in PLAN §5)
Astro 7 (static, TS strict) · Tailwind CSS v4 · vanilla-TS islands (no React) · GSAP + Lenis motion · `@lucide/astro` · Fontsource (Michroma + Manrope) · `astro:assets` images · client-side form → no-DNS email provider + captcha · Vercel (hosting + Web Analytics) · GitHub + Actions CI · Playwright + Lighthouse CI.

## Build / run / verify (once scaffolded)
```
npm ci
npm run serve          # production build + preview → http://localhost:4380 (also on your LAN, e.g. phone)
npm run dev            # live-reload dev server → http://localhost:4381
npm run verify         # astro check + eslint + prettier --check + astro build  (the gate both agents use)
npm run test:e2e       # Playwright: smoke, axe a11y, interactions, motion
npm run shots          # review screenshots → docs/review/<branch>/ (git-ignored)
npm run test:lighthouse  # after a build with PUBLIC_ALLOW_INDEXING=true
```

## Secrets
None expected — all keys are public-by-design (`PUBLIC_*`). Values in `.env` (git-ignored); `.env.example` committed with empty values. If a truly secret key becomes necessary, that needs a server endpoint — raise it as a task first.
