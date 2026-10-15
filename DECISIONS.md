# DECISIONS (ADR-lite)

Locked choices + why. Don't silently reverse — propose a task instead.
Append new decisions with a date + author.

### D1 · 2026-10-16 · claude · 4 solution pillars, not 7 cards
Business Platforms · Custom Software · Automation & Integration · Robotics/R&D. **Why:** three mockup cards overlapped (Business Systems / POS-CRM-ERP-WMS / Enterprise); Support duplicated the Process section.

### D2 · 2026-10-16 · claude · One proof bar; no vanity stats
Hero badges + stats band merged into one bar of real numbers. **Why:** duplicate trust strips; "100% commitment" isn't a metric.

### D3 · 2026-10-16 · claude · Add Featured Work + inquiry form
**Why:** nav and CTA promised "work" that didn't exist; page had no conversion point.

### D4 · 2026-10-16 · claude · Stack: Next.js 15 + TS + Tailwind v4 + Motion, deploy Vercel
**Why:** static-fast page with one server route for the form; both agents fluent in it.

### D5 · 2026-10-16 · claude · Content/UI seam = `src/content/types.ts`
All copy lives in typed content files (Codex); components only render (Claude). **Why:** lets both agents work in parallel without touching the same files.

### D6 · 2026-10-16 · claude · Dark-only brand, gold accent, Michroma + Manrope
Tokens in `docs/PLAN.md` §4. **Why:** matches the approved mockup look.

### D7 · 2026-10-16 · claude · Only two public figures
Proof bar shows **300+ business systems** and **200+ robotics & automation projects**; the other two slots are qualitative (End-to-end, PH-based). Supersedes the "3–4 real numbers" in D2. **Why:** XTS wants to disclose little. No new figures without XTS approval.

### D8 · 2026-10-16 · claude · "Showcase" instead of case studies
Three anonymised solution showcases with generated visuals, capability bullets only — no client names, logos, or outcome metrics. **Why:** client work is confidential; invented results would mislead.

### D9 · 2026-10-16 · claude · Why-XTS merged into Process; no partner logos
6 content sections total. Nav: Solutions · Showcase · Industries · Process · Contact. **Why:** no partner logos may be shown, leaving the section too thin to stand alone.

### D10 · 2026-10-16 · claude · Domain is reference-only for now
xzentechsolutions.com is live elsewhere. Don't change its DNS or hardcode it: site URL via `NEXT_PUBLIC_SITE_URL`, deploy to a Vercel preview URL, form delivery must work without domain verification. **Why:** user instruction; cutover is task T40.
