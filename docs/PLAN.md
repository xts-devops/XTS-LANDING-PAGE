# XTS Landing Page — Plan v1.1

Source mockup: [`docs/reference/mockup-v1.webp`](reference/mockup-v1.webp). We keep its
look (black + warm gold, cinematic night-office photography, wide display type) and fix its
structure.

> **v1.1 (2026-10-16)** — updated with XTS answers: only two public figures, no client
> projects disclosed, no partner logos, contact details confirmed, domain reserved for later.
> Result: one fewer section, a "Showcase" instead of case studies, shorter nav.

---

## 1. What changes vs. the mockup (and why)

| Mockup | Problem | Plan |
|---|---|---|
| 7 solution cards | 3 cards overlap (Business Systems ≈ POS/CRM/ERP/WMS ≈ Enterprise); "Implementation & Support" repeats Process. | **4 solution pillars**, 2×2 grid. Support lives in Process. |
| Hero badges **and** stats band (50+ / 20+ / 100% / 24/7) | Two trust strips back to back; vanity stats. | **One proof bar**: 2 real figures + 2 qualitative proofs (§3.1). |
| 6 industry cards incl. "Enterprise & Corporate" | Enterprise is a size, not an industry; image-heavy. | **5 industries** in a selector with one swapping image. |
| "Projects" nav + "View Our Work" | Nothing to show; client work stays confidential. | **Showcase**: 3 anonymised *solution* showcases with generated presentation visuals — no client names, no invented results. |
| Why-XTS badges + partner logos | No partner logos allowed; a section of 3 badges alone is thin. | **Merged into Process** as a 3-point intro row. Section removed. |
| Final CTA, no form | No conversion point. | CTA + **short inquiry form** + direct contact. |

Net: 8 content sections → **6**, ~22 tiles → ~11.

---

## 2. Final page structure

```
0  Header (sticky)      Logo · Solutions · Showcase · Industries · Process · Contact · [Let's Build]
1  Hero  #top           Eyebrow · H1 · sub · 2 CTAs · dashboard visual
   └ Proof bar          300+ business systems · 200+ robotics & automation · end-to-end · PH-based
2  Solutions  #solutions     4 pillars, 2×2 image cards
3  Showcase   #showcase      3 anonymised solution showcases (1 large + 2 stacked)
4  Industries #industries    5-item selector + swapping image panel
5  Process    #process       3 "why XTS" points + 5-step timeline
6  Contact    #contact       CTA headline · inquiry form · email / phone / location
7  Footer
```

---

## 3. Section specs

### 1 · Hero
- Eyebrow: `TECHNOLOGY · PEOPLE · REAL IMPACT`
- H1: `Technology solutions built for` **`real growth`** (gold gradient on last two words).
- Sub: *We engineer, build, and implement intelligent systems — from business platforms and custom software to automation and robotics.*
- CTAs: `Book a Consultation →` (solid gold → #contact) · `Explore Solutions` (outline → #solutions).
- Visual: generated dashboard-on-desk night-city image (right 55%), fades into bg at bottom.

### 3.1 · Proof bar (under hero)
| Value | Label | Type |
|---|---|---|
| **300+** | Business systems delivered | count-up |
| **200+** | Robotics & automation projects | count-up |
| **End-to-end** | Strategy → build → support | text |
| **PH-based** | Serving clients across the Philippines | text |

Only these two figures are public. Do not add other numbers without XTS approval.

### 2 · Solutions — 4 pillars
| Pillar | One-liner | Chips | Image |
|---|---|---|---|
| **Business Platforms** | Configured, integrated POS, CRM, ERP and WMS — for growing teams up to enterprise scale. | POS · CRM · ERP · WMS · Inventory | Tablet POS + dashboards on a counter |
| **Custom Software** | Web, mobile and internal tools built around how you actually work. | Web apps · Mobile · Portals · Internal tools | Developer monitors with code, city view |
| **Automation & Integration** | Connect your systems, automate processes, and remove manual work. | APIs · Workflows · Data pipelines · AI | Node/flow diagram on a screen |
| **Robotics, R&D & Prototyping** | Research, engineering and rapid prototyping for advanced technology. | Robotics · IoT · Hardware · PoC | Robotic arm in a lab |

Card: image top (16:10), icon + title + one-liner + chips. Hover: image zoom 1.04, gold border glow. Under grid: *"Implementation, training and long-term support included with every engagement."*

### 3 · Showcase (replaces case studies)
Eyebrow `SOLUTION SHOWCASE` · H2 `What we build` · note: *"Client engagements are confidential — these showcases illustrate the kind of systems we deliver."*

| Showcase | Tag | Capability bullets (no metrics) | Visual (generated) |
|---|---|---|---|
| **Unified Retail Operations** (large card) | Business Platforms · Retail | Multi-branch POS · Real-time inventory · Sales dashboards | POS + inventory dashboard UI mock on tablet & monitor |
| **Smart Warehouse Flow** | Automation · Logistics | WMS + barcode/RFID · Pick-path automation · Live stock visibility | Warehouse with handheld scanners + WMS screen |
| **Automated Production Cell** | Robotics · Manufacturing | Robotic handling · Sensor monitoring · Line dashboards | Robot arm cell with control-room screen |

Card: image, tag, title, 3 bullets, `Discuss a similar project →` (→ #contact, prefills the form's "need" field). **No client names, logos, or outcome numbers** — illustrative only.

### 4 · Industries — selector
Left: 5 rows (icon + name). Right: large image + 2-line description + 3 example solutions.
Retail & E-commerce · Manufacturing · Logistics & Supply Chain · Healthcare · Government & Public Sector.
Mobile: horizontal swipe carousel of image cards.

### 5 · Process (+ Why XTS)
- Eyebrow `OUR PROCESS` · H2 `From vision to real-world impact`.
- Intro row, 3 points: **One partner, end to end** · **Industry-first thinking** · **Built to last** (support after go-live).
- Timeline: Consult → Design → Build → Implement → Support. Gold-ring nodes joined by a line that draws in on scroll. Each: icon, title, 1-line description.

### 6 · Contact
Left: eyebrow `LET'S BUILD WHAT'S NEXT` · H2 `Your technology partner for a smarter tomorrow` · direct contact:
- ✉ `info@xzentechsolutions.com` (mailto)
- ☎ `0969 244 2557` (tel:`+639692442557`)
- ⌖ Philippines-based · serving clients nationwide

Right: form card — Name, Email, Company (optional), "What do you need?" (select: 4 pillars + Other), Message, `Send inquiry →`. States: idle / sending / success / error (error shows the email as fallback). Spam: honeypot + rate limit.

### 7 · Footer
Logo + one-liner · section links · contact block (same 3 lines) · © 2026 XZEN TECH SOLUTIONS · Privacy · Terms.

---

## 4. Design system

**Colour tokens**
| Token | Value | Use |
|---|---|---|
| `--bg` | `#0A0A0B` | page |
| `--surface` | `#131315` | cards |
| `--surface-2` | `#1B1B1E` | raised / inputs |
| `--line` | `#2A2A2E` | borders, dividers |
| `--text` | `#F3F0E8` | primary text (warm white) |
| `--muted` | `#9B978E` | body copy, captions |
| `--gold` | `#E9A944` | accent, CTAs |
| `--gold-hi` | `#F7C873` | gradient top / hover |
| `--gold-lo` | `#B97A24` | gradient bottom |

Dark-only. Gold on `--bg` for large text and accents; body text stays `--text`/`--muted`.

**Type**: Display **Michroma** (H1 + eyebrows, uppercase). Text/UI **Manrope** 400–700. Eyebrows 12px, tracking 0.32em, gold.

**Layout & motion**: 1200px container, 24px gutters (16px mobile), 120px section rhythm (72px mobile). Cards: 1px `--line`, 16px radius. Fade-up reveals via Motion, `prefers-reduced-motion` respected, no scroll-jacking.

**Imagery**: one grade — night interiors, tungsten + amber screen glow, deep shadows. All imagery is generated "presentation" visuals; see [`IMAGE-BRIEF.md`](IMAGE-BRIEF.md).

---

## 5. Tech stack
- **Next.js 15 (App Router) + TypeScript**, static-first; one route handler for the form.
- **Tailwind CSS v4** (`@theme` tokens), **Motion**, **lucide-react**, `next/image`, `next/font`.
- Form: route handler + zod. Delivery provider must **not require DNS changes to xzentechsolutions.com** for now (domain is live elsewhere) — see D10.
- Site URL from `NEXT_PUBLIC_SITE_URL` (Vercel preview URL now; `https://xzentechsolutions.com` at launch).
- Quality: ESLint, Prettier, Playwright smoke, Lighthouse (Perf ≥ 90, A11y ≥ 95, SEO 100).
- Deploy: Vercel (preview URL until domain cutover).

---

## 6. Content model (shared contract)

All copy lives in `src/content/*.ts`, typed by `src/content/types.ts`. Components never hardcode copy.

```ts
export type Img       = { src: string; alt: string; width: number; height: number };
export type Pillar    = { id: string; title: string; summary: string; chips: string[]; icon: string; image: Img };
export type Showcase  = { id: string; title: string; tags: string[]; bullets: string[]; image: Img; need: Pillar['id'] };
export type Industry  = { id: string; name: string; icon: string; summary: string; examples: string[]; image: Img };
export type Step      = { n: number; title: string; summary: string; icon: string };
export type Principle = { title: string; summary: string; icon: string };
export type Proof     = { kind: 'count'; value: number; suffix: string; label: string }
                      | { kind: 'text'; value: string; label: string };
export type Contact   = { email: string; phoneDisplay: string; phoneHref: string; location: string };
```

Canonical values (Codex puts these in `src/content/site.ts`):
```ts
contact = { email: 'info@xzentechsolutions.com', phoneDisplay: '0969 244 2557',
            phoneHref: 'tel:+639692442557', location: 'Philippines-based · serving clients nationwide' }
proof   = [ {kind:'count', value:300, suffix:'+', label:'Business systems delivered'},
            {kind:'count', value:200, suffix:'+', label:'Robotics & automation projects'},
            {kind:'text',  value:'End-to-end', label:'Strategy → build → support'},
            {kind:'text',  value:'PH-based',   label:'Serving clients across the Philippines'} ]
```

---

## 7. Milestones
1. **M0 Setup** — scaffold, tokens, fonts, content types, logo in place.
2. **M1 Skeleton** — all 6 sections with placeholder content + images.
3. **M2 Polish** — generated image set, motion, responsive + a11y pass.
4. **M3 Ship** — form live, SEO/OG, Lighthouse budget, Vercel preview.
5. **Later** — domain cutover to xzentechsolutions.com (DNS, email sender, canonical URL).

## 8. Status of open questions
| # | Question | Answer |
|---|---|---|
| Q1 | Proof numbers | 300+ business systems · 200+ robotics & automation. Nothing else public. ✅ |
| Q2 | Case studies | None disclosed → anonymised Showcase with generated visuals. ✅ |
| Q3 | Contact | info@xzentechsolutions.com · 0969 244 2557 · Philippines-based ✅ |
| Q4 | Logo | XTS sending to Codex → `public/brand/`. ⏳ |
| Q5 | Partner logos | None → logo strip removed. ✅ |
| Q6 | Domain | xzentechsolutions.com, **reference only** — no DNS/config changes until cutover. ✅ |
| Q7 | Social links | Not shown for now — no social icons on the site. ✅ |
