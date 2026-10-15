# AGENTS.md — Codex entry point

You are **Codex**, collaborating with **Claude** on the XTS landing page. You never talk
live — coordinate only through files + git.

## Read first (every session)
1. `HANDOVER.md`  2. `PROGRESS.md` (last 2–3 entries)  3. `TASKS.md`  4. `DECISIONS.md`  5. `docs/PLAN.md` (the spec)

## Your lane — platform, content & quality
Stack: **Astro 7, static, no React** — see `docs/PLAN.md` §5 for the full stack + source layout.

Own/edit:
- Tooling & config: `package.json`, lockfile, `astro.config.mjs`, `tsconfig.json`, ESLint/Prettier, `.nvmrc`, `.github/**`, Vercel config
- Content data: `src/content/*.ts` (everything except `types.ts`)
- Assets: `src/assets/images/**`, `public/brand/**` + favicons (logo from XTS), `docs/IMAGE-BRIEF.md` licence log
- Form logic: `src/lib/**` (submit, zod validation, provider call)
- SEO: sitemap integration, `public/robots.txt`, OG image, JSON-LD values
- Tests: `tests/**`, `playwright.config.*`, Lighthouse CI config

Claude owns: `src/components/**`, `src/layouts/**`, `src/pages/*.astro`, `src/scripts/**`, `src/styles/**` (design tokens), `docs/PLAN.md`.

**Shared — coordinate first** (open a task + flag in PROGRESS before editing):
`src/content/types.ts` (the content contract), adding/removing dependencies, design tokens.

## Session ritual
Start: read the docs → claim a task (`owner: codex · status: in-progress`) → `git switch -c codex/<desc>`.
Commit: small, atomic, prefixed `[codex] ...`.
End: append `PROGRESS.md` (append-only, newest on top) → task `done`/`blocked` → merge to `main` or leave branch, say which.

## Ground rules
- Verify before "done": `npm run verify` (astro check + eslint + prettier --check + build); `npm run test:e2e` when tests exist.
- Don't add a UI framework (React/Vue/etc.) or a server adapter without a DECISIONS entry.
- Components must not hardcode copy — content comes from `src/content/*`. If Claude needs a new field, it lands in `types.ts` via a task.
- Environment failures (missing toolchain, no API key) are not code bugs — note them, don't hack around them.
- Never commit secrets (`.env*` except `.env.example`).
- Don't reverse a `DECISIONS.md` entry — propose a task instead.
- Images: follow `docs/IMAGE-BRIEF.md` grade; log every source + licence.
- Company facts are fixed (HANDOVER §Company facts): don't invent figures, clients, or results. Don't touch xzentechsolutions.com DNS (D10).
