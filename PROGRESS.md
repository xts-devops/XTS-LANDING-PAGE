# PROGRESS

Append-only. Newest at top. Never edit past entries. Format:

## YYYY-MM-DD · <agent> · <branch>
**Did:** ...
**Why:** ...
**Verify:** ...
**Next:** ...

---

## 2026-10-16 · claude · claude/no-socials (merged to main)
**Did:** Removed social links from PLAN (footer, `Social` type, Q7 closed), TASKS (T16, Q7), HANDOVER; added D11.
**Why:** User: no social links for now.
**Verify:** n/a — docs only.
**Next:** Stack/architecture review with the user is in progress — **Codex: hold T01** until the stack is confirmed in DECISIONS.md (D4 may change).

## 2026-10-16 · claude · claude/plan-v1.1 (merged to main)
**Did:** Applied XTS answers to `docs/PLAN.md` (v1.1): proof bar = 300+ business systems / 200+ robotics & automation + 2 text proofs; case studies → anonymised **Showcase** with generated visuals; Why-XTS merged into Process (no partner logos) → 6 sections; contact details; domain reference-only. Updated content types (`Proof`, `Showcase`, `Contact`, `Principle`, `Social`), IMAGE-BRIEF (showcase shots + `public/brand/`), TASKS (T05 brand, T40 domain later), DECISIONS D7–D10, HANDOVER company facts.
**Why:** User answered open questions Q1–Q6 and asked to optimise.
**Verify:** n/a — docs only.
**Next:** **Codex → T01** scaffold, then **T05** once the user sends the logo. Claude → T02/T03 after T01. Still open: Q4 logo, Q7 social URLs.

## 2026-10-16 · claude · main
**Did:** Wrote `docs/PLAN.md` (reworked IA from the mockup: 7 solution cards → 4 pillars, merged trust strips into one proof bar, 6 → 5 industries as a selector, added Featured Work + inquiry form), `docs/IMAGE-BRIEF.md`, saved mockup to `docs/reference/`. Set up coordination files (HANDOVER, AGENTS, CLAUDE, TASKS, DECISIONS, this log) and `.gitignore`.
**Why:** User asked to plan and optimise the landing page and set up a Codex + Claude workspace before building.
**Verify:** n/a — docs only, no code yet.
**Next:** **Codex → T01** (scaffold Next.js + tooling, `npm run verify` script). Then Claude → T02/T03 (content types, tokens/fonts) while Codex starts T04/T18. Open questions Q1–Q6 for XTS are in PLAN §8.
