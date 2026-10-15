# Historical brand handoff — updated for D15

D15 supersedes the original ownership below: Codex now owns UI implementation, Claude owns backend/SEO/quality. Theme source is src/styles/tokens.css. Follow the current TASKS and DEV-FLOW.

# Brand integration — Codex → Claude

The user supplied the homepage theme and both logo images on 2026-10-16.
Originals are preserved without recolouring, tracing, cropping, or background removal.

## Assets and theme

- `docs/reference/homepage-theme-original.png`: visual reference only; do not ship as a full-page image.
- `public/brand/logo-gold-original.png`: primary logo, 426 × 204, dark textured background baked in.
- `public/brand/logo-white-original.png`: alternate logo, 411 × 225, dark textured background baked in.
- `src/content/brand.ts`: reusable logo paths, intrinsic dimensions, accessible name.
- `src/styles/tokens.css`: Tailwind v4 theme source matching PLAN §4. This is build input, not a standalone browser stylesheet.

Claude T03: import these from `src/styles/global.css`:

```css
@import 'tailwindcss';
@import '@fontsource/michroma';
@import '@fontsource-variable/manrope';
@import './tokens.css';
```

Use `bg-bg`, `text-text`, `text-gold`, `font-display`, `font-sans`, etc.
Set page background and text in global styles; use Manrope for body and controls,
Michroma for display text. Keep warm amber imagery, deep charcoal surfaces and restrained gold outlines.
Use the gold logo for the main brand treatment and the white logo where monochrome is clearer.
Render with explicit dimensions and `object-fit: contain`; do not stretch or fake transparency.
Because the supplied wordmark is small, avoid reducing it until the company name is unreadable.
Request the original vector/transparent mark before final compact header and favicon polish.

## Content constraints

The reference is visual guidance, not revised company facts or information architecture.
Keep the approved six sections, four solution pillars, 300+ business systems and
200+ robotics & automation projects. No 50+/20+/100%/24-7 claims, client names,
social links, invented results or copied dashboard statistics.

## Build and collaboration

Node 24 is shared by `.nvmrc`, package engines and CI. Use `npm ci` after pulling.
`npm run verify` checks types, lint, source formatting and the static build.
Markdown is intentionally excluded from automatic formatting to preserve the append-only
progress history and avoid changing another agent's spec during tooling work.
Set `PUBLIC_SITE_URL` to the actual preview URL to enable sitemap generation;
no production domain is assumed. Form keys remain empty until T07/T30.

Claude owns the page, layout and components: continue T02, T03, then T10–T16.
Codex has not created competing placeholder UI or modified PLAN.
Claim tasks before edits; shared contracts/dependencies/tokens need a TASKS entry
and PROGRESS flag. Keep one writer per file. Pull main before branching, use
agent-prefixed atomic commits and pass `npm run verify` before pushing.
Integration changes to this theme source belong to T03 and must remain coordinated.

The complete page and browser smoke tests are still future work. A successful
scaffold build without routes is not visual or end-to-end verification.
