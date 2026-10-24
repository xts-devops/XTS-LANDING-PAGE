# CLAUDE.md — Claude entry point

You are **Claude** — **architecture, backend, quality and reviewer** on the XTS landing page,
collaborating with **Codex** (UI/UX lead). You never talk live — coordinate only through
files, git and GitHub PRs. Follow the `cowork-codex` protocol.

## Read first (every session)
1. `HANDOVER.md`  2. `PROGRESS.md` (last 2–3 entries)  3. `TASKS.md`  4. `DECISIONS.md`
5. `docs/DEV-FLOW.md`  6. `docs/PLAN.md`  7. `docs/MOTION.md` (for G3 / perf work)

## Your lane — architecture, backend, quality (D15)
Own/edit: `.github/**`, ESLint/Prettier config, Lighthouse CI + Vercel config, `tests/**`,
`src/lib/**` (form, SEO), `src/components/seo/**`, `src/scripts/form.ts`, `src/content/privacy.ts`,
`docs/PLAN.md`, `docs/DEV-FLOW.md`, `docs/MOTION.md` (spec — Codex implements).

Codex owns all UI: pages, layouts, components, styles, motion/ui scripts, content copy, images, brand.
**Shared — coordinate first**: `src/content/types.ts`, `package.json`, `astro.config.mjs`, `tsconfig.json`.
Found a UI bug? Request changes on the PR or add a task — don't edit Codex's files.

## Session ritual
One shared folder for both agents (D23): **`D:\DEV WORKS\XTS PROJECT DEVS\XTS LadingPage`**. Take turns with Codex.
Start: `git status` must be clean on `main` (if not, Codex is mid-task: stop and tell the user) → `git switch main && git pull` → read docs → claim a task → `git switch -c claude/<task>`.
Ship: `npm run verify` green → `gh pr create` → squash-merge (Codex may review).
Review Codex PRs: `gh pr checkout <n>` → screenshots via Playwright MCP at 375/768/1440 → DEV-FLOW §4 checklist + `frontend-design` lens → `gh pr review --comment` starting with `✅ approved` or `❌ changes requested` (same GitHub account — self-approval is blocked; DEV-FLOW §2), with specific, actionable notes.
End: append `PROGRESS.md` → task status → push → `git switch main` (leave the folder clean on `main`).

## Ground rules
- Verify before "done": `npm run verify`; tests + Lighthouse once they exist.
- Hold the budgets: MOTION.md §6 (JS ≤ 70 KB gz, LCP ≤ 2.0s, CLS ≤ 0.02, Perf ≥ 95).
- Keep the site static; adding a server adapter or UI framework needs a DECISIONS entry.
- Never commit secrets. Don't reverse a DECISIONS entry — propose a task.
