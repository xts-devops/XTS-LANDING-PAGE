# HANDOVER — XTS Landing Page

## What this is
Marketing landing page for **XZEN TECH SOLUTIONS (XTS)** — a Philippines-based technology
partner offering business platforms (POS/CRM/ERP/WMS), custom software, automation &
integration, and robotics/R&D. Single page + privacy page, dark + gold brand, built by
Claude and Codex together. Marketing site only (no app/portal planned), English only,
text edited in code (no CMS).

## Status (2026-10-16)
**Plan v1.2 done (stack = Astro), no code yet.** Repo: https://github.com/BFC-XZEN/xts-landing-page (private). Next: M0 — scaffold (T01). See `TASKS.md`.

## Company facts (approved for the site)
- Email `info@xzentechsolutions.com` · Phone `0969 244 2557` (`+63 969 244 2557`) · Philippines-based.
- Public figures: **300+** business systems, **200+** robotics & automation projects. Nothing else.
- Client projects are confidential — no names, logos, or results. No partner logos. No social links.
- Domain `xzentechsolutions.com` is for later; it's live elsewhere now — don't touch DNS or hardcode it.

## Where things are
| Path | What |
|---|---|
| `docs/PLAN.md` | **The spec.** Structure, section specs, tokens, **stack & source layout (§5)**, content model, milestones. Read first. |
| `docs/IMAGE-BRIEF.md` | Every image the page needs, with prompts/ratios, brand assets, licence log. |
| `docs/reference/mockup-v1.webp` | Original visual mockup (look reference; structure superseded by PLAN.md). |
| `AGENTS.md` / `CLAUDE.md` | Per-agent entry points, lanes, rules. |
| `TASKS.md` · `PROGRESS.md` · `DECISIONS.md` | Board · session log · locked decisions. |

## Stack (summary — details in PLAN §5)
Astro 7 (static, TS strict) · Tailwind CSS v4 · vanilla-TS islands (no React) · `@lucide/astro` · Fontsource (Michroma + Manrope) · `astro:assets` images · client-side form → no-DNS email provider + captcha · Vercel (hosting + Web Analytics) · GitHub + Actions CI · Playwright + Lighthouse CI.

## Build / run / verify (once scaffolded)
```
npm install
npm run dev            # http://localhost:4321
npm run verify         # astro check + eslint + prettier --check + astro build  (the gate both agents use)
npm run test:e2e       # Playwright smoke
```

## Secrets
None expected — all keys are public-by-design (`PUBLIC_*`). Values in `.env` (git-ignored); `.env.example` committed with empty values. If a truly secret key becomes necessary, that needs a server endpoint — raise it as a task first.
