# HANDOVER — XTS Landing Page

## What this is
Marketing landing page for **XZEN TECH SOLUTIONS (XTS)** — a technology partner offering
business platforms (POS/CRM/ERP/WMS), custom software, automation & integration, and
robotics/R&D. Single page, dark + gold brand, built by Claude and Codex together.

## Status (2026-10-16)
**Plan v1.1 done, no code yet.** Next step is M0 (scaffold). See `TASKS.md`.

## Company facts (approved for the site)
- Email `info@xzentechsolutions.com` · Phone `0969 244 2557` (`+63 969 244 2557`) · Philippines-based.
- Public figures: **300+** business systems, **200+** robotics & automation projects. Nothing else.
- Client projects are confidential — no names, logos, or results. No partner logos.
- Domain `xzentechsolutions.com` is for later; it's live elsewhere now — don't touch DNS or hardcode it.

## Where things are
| Path | What |
|---|---|
| `docs/PLAN.md` | **The spec.** Page structure, section specs, design tokens, content model, milestones, open questions. Read this first. |
| `docs/IMAGE-BRIEF.md` | Every image the page needs, with prompts/ratios + licence log. |
| `docs/reference/mockup-v1.webp` | Original visual mockup (look reference; structure superseded by PLAN.md). |
| `AGENTS.md` / `CLAUDE.md` | Per-agent entry points, lanes, rules. |
| `TASKS.md` · `PROGRESS.md` · `DECISIONS.md` | Board · session log · locked decisions. |

## Planned stack
Next.js 15 (App Router, TS) · Tailwind CSS v4 · Motion · lucide-react · next/font (Michroma + Manrope) · zod + a no-DNS email provider for the inquiry form · Playwright · Vercel.

## Planned source layout
```
src/
  app/
    layout.tsx, page.tsx, globals.css      # claude (page composition, tokens)
    api/contact/route.ts                   # codex
    sitemap.ts, robots.ts, opengraph-image # codex
  components/
    ui/        Button, Card, Chip, Eyebrow, Container, Section     # claude
    sections/  Header, Hero, ProofBar, Solutions, Showcase, Industries,
               Process, Contact, Footer                            # claude
  content/
    types.ts                               # SHARED contract
    site.ts (contact, proof), pillars.ts, showcase.ts,
    industries.ts, process.ts                                      # codex
  lib/                                     # codex (form, analytics helpers)
public/images/**, public/brand/**         # codex
tests/e2e/**                               # codex
```

## Build / run / verify (once scaffolded)
```
npm install
npm run dev            # http://localhost:3000
npm run verify         # = lint + typecheck + build (the gate both agents use)
npm run test:e2e       # Playwright smoke
```

## Secrets
`.env.local` only (e.g. form provider key, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`). Git-ignored. Commit `.env.example` with empty values.
