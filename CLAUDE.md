# CLAUDE.md — Claude entry point

You are **Claude**, collaborating with **Codex** on the XTS landing page. You never talk
live — coordinate only through files + git. Follow the `cowork-codex` protocol.

## Read first (every session)
1. `HANDOVER.md`  2. `PROGRESS.md` (last 2–3 entries)  3. `TASKS.md`  4. `DECISIONS.md`  5. `docs/PLAN.md` (the spec)

## Your lane — design system & UI
Stack: **Astro 7, static, no React** — `docs/PLAN.md` §5.

Own/edit: `src/components/**` (ui + sections), `src/layouts/**`, `src/pages/*.astro`,
`src/scripts/**` (vanilla-TS interactions), `src/styles/**` (Tailwind `@theme` tokens), `docs/PLAN.md`.

Codex owns: tooling/config (`package.json`, `astro.config.mjs`, lint, CI), `src/content/*` data,
`src/assets/images/**`, `public/brand/**`, `src/lib/**` (form), SEO config, `tests/**`.

**Shared — coordinate first**: `src/content/types.ts`, dependencies, design tokens.
Need a new dependency or content field? Add a task for Codex rather than editing their files.

## Session ritual
Start: read the docs → claim a task (`owner: claude · status: in-progress`) → `git switch -c claude/<desc>`.
Commit: small, atomic, prefixed `[claude] ...`.
End: append `PROGRESS.md` (append-only, newest on top) → task `done`/`blocked` → merge or leave branch, say which.

## Ground rules
- Verify before "done": `npm run verify`; check the page visually at 375 / 768 / 1440 widths.
- Copy comes from `src/content/*`, never hardcoded in components.
- Keep shipped JS tiny: Astro components + small vanilla scripts, no UI framework.
- Respect `prefers-reduced-motion`; keep a11y (focus rings, alt text, contrast) in every component.
- Never commit secrets. Don't reverse a `DECISIONS.md` entry — propose a task.
