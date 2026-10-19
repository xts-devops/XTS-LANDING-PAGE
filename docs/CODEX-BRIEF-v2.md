# Codex brief v2 (2026-10-19)

You (Codex) produce two things Claude needs for the v2 site (PLAN-v2):
**A) photoreal images** and **B) realistic sample system UIs** to screenshot for showcases.
Work on branch `codex/v2-media`, open one PR per part. Don't edit `src/` (Claude is rebuilding it).

## A · Images

Follow `docs/IMAGE-BRIEF-v2.md` exactly: file names, sizes, grade, licence log.
Priority order: home (5) → robotics (8 + exploded) → work (6) → software/automation (4).

## B · Sample system UIs: `showcase-ui/`

A **standalone static mini-app** at the repo root (not part of the site build):
`showcase-ui/index.html` plus one HTML file per screen, plain HTML/CSS (+ tiny JS if needed),
no frameworks. It only needs to *look* like a real, finished product at **1440×900**
(and 390×844 for the mobile screens).

**Standard:** believable MVP software that a client would recognise as production-quality.
Clean light or dark theme (pick one per product, consistent), real-looking tables, charts (inline
SVG), filters, sidebars, empty states avoided. Fictional but realistic Philippine data: ₱ amounts,
PH city names, Filipino names, plausible SKUs. **No real client names or logos.** Each product gets a
neutral fictional brand mark (e.g. "Northwind ERP", "Tindahan POS").

| Folder | Screens (one HTML file each) |
|---|---|
| `erp/` | dashboard (KPIs + revenue chart), sales orders list, purchase order detail, inventory valuation, general ledger, approvals inbox |
| `pos/` | checkout/register (product grid + cart, touch-friendly, 1366×1024 tablet), receipt preview, shift summary, branch sales report |
| `crm/` | pipeline kanban, contact profile with timeline, quotes list, sales dashboard |
| `wms/` | warehouse dashboard, receiving (ASN), pick list (mobile 390×844), bin/location map, stock transfer |
| `inventory/` | stock list with reorder alerts, item detail with movement history, stock count |
| `hr/` | employee directory, payroll run summary (PH deductions: SSS, PhilHealth, Pag-IBIG, tax), leave calendar |
| `software/` | client portal dashboard, booking web app, **mobile app** screens ×3 (390×844) |
| `automation/` | integration flow builder (nodes), sync log, operations dashboard (live KPIs) |

**Capture:** add `npm run capture:ui` (Playwright, already a dev dependency). It serves `showcase-ui/`,
screenshots every screen at its native size and DPR 2, and writes PNGs to
`src/assets/showcase/<folder>/<screen>.png`. Claude converts and wires them in.

**Done when:** every screen above exists, `npm run capture:ui` produces all PNGs, and the screenshots
look like real software at first glance. Put a contact sheet (all thumbnails on one page) at
`showcase-ui/index.html`.

## Ground rules

Same as AGENTS.md. Don't invent XTS figures, clients or results. Fictional sample data inside product
screens is fine (it's clearly a sample system), but no real company names.
