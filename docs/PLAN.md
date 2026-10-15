# XTS Landing Page — Plan v1

Source mockup: [`docs/reference/mockup-v1.webp`](reference/mockup-v1.webp). We keep its
look (black + warm gold, cinematic night-office photography, wide display type) and fix its
structure.

---

## 1. What changes vs. the mockup (and why)

| Mockup | Problem | Plan |
|---|---|---|
| 7 solution cards (Business Systems, Custom Dev, Automation, POS/CRM/ERP/WMS, Enterprise Solutions, Robotics, Implementation & Support) | 3 cards say the same thing (Business Systems ≈ POS/CRM/ERP/WMS ≈ Enterprise). "Implementation & Support" repeats Process steps 4–5. 7 cards in two uneven rows (3 + 4) look busy. | **4 solution pillars** in a 2×2 grid, each with capability chips (see §3). Support moves into Process. "Enterprise" becomes a scale note, not a card. |
| Hero trust badges (Strategic Partner / End-to-End / Industry-Focused / Measurable Impact) **and** a stats band (50+ / 20+ / 100% / 24/7) | Two "why trust us" strips back to back. "100% Commitment to Quality" is not a real metric. "20+ industries" contradicts the 6 shown. | **One proof bar** under the hero with 3–4 *real* numbers. Badges removed (their message lives in the Why-XTS section). |
| 6 industry cards incl. "Enterprise & Corporate" | Enterprise is a company size, not an industry. Six image cards next to a text block = heavy. | **5 industries** in an interactive selector: list on the left, one big swapping image + detail panel on the right. |
| Nav has "Projects", CTA says "View Our Work" | There is no work shown anywhere on the page — a dead promise and the biggest credibility gap. | **New: Featured Work** — 3 case-study cards with outcome metrics. |
| Process (5 steps) | Good. | Keep 5 steps: Consult → Design → Build → Implement → **Support** (absorbs the removed card). |
| Final CTA (two buttons + logo art) | No way to actually start a conversation on the page. | CTA + **short inquiry form** (name, email, company, what you need). |
| Footer | Fine, but missing contact details. | Add email / phone / location + socials. |

Net effect: ~22 cards/tiles → ~12, one new section that adds proof, one form that adds conversion.

---

## 2. Final page structure

```
0  Header (sticky, blurs on scroll)       Logo · Solutions · Work · Industries · Process · About · [Let's Build]
1  Hero                                   Eyebrow · H1 · 1-line sub · 2 CTAs · dashboard visual
   └ Proof bar                            50+ projects · N industries · 24/7 support · X yrs
2  Solutions        #solutions            4 pillars, 2×2 image cards
3  Featured Work    #work                 3 case studies (1 large + 2 stacked)
4  Industries       #industries           5-item selector + swapping image panel
5  Process          #process              5 steps, horizontal timeline (vertical on mobile)
6  Why XTS + Stack  #about                3 differentiators + tech logo strip
7  CTA + Inquiry    #contact              Headline · form · direct contact
8  Footer
```

---

## 3. Section specs

### 1 · Hero
- Eyebrow: `TECHNOLOGY · PEOPLE · REAL IMPACT`
- H1: `Technology solutions built for` **`real growth`** (gold gradient on the last two words).
- Sub (trimmed from 4 lines to 2): *We engineer, build, and implement intelligent systems — from business platforms and custom software to automation and robotics.*
- CTAs: `Book a Consultation →` (solid gold) · `See Our Work` (outline, scrolls to #work).
- Visual: dashboard-on-desk night-city photo (right 55%), subtle parallax; fades to bg at the bottom edge.
- Proof bar: 4 stats, count-up on first view. **Numbers must be real — see Open Questions.**

### 2 · Solutions — 4 pillars
| Pillar | One-liner | Chips | Image |
|---|---|---|---|
| **Business Platforms** | Configured, integrated POS, CRM, ERP and WMS — for growing teams up to enterprise scale. | POS · CRM · ERP · WMS · Inventory | Tablet POS + dashboards on a counter |
| **Custom Software** | Web, mobile and internal tools built around how you actually work. | Web apps · Mobile · Portals · Internal tools | Developer monitors with code, city view |
| **Automation & Integration** | Connect your systems, automate processes, and remove manual work. | APIs · Workflows · Data pipelines · AI | Node/flow diagram on a screen |
| **Robotics, R&D & Prototyping** | Research, engineering and rapid prototyping for advanced technology. | Robotics · IoT · Hardware · PoC | Robotic arm in a lab |

Card: image top (16:10), icon + title + one-liner + chips, `Learn more →`. Hover: image zoom 1.04, gold border glow. "Implementation & long-term support included with every engagement" as a single line under the grid.

### 3 · Featured Work (new)
3 cards: one large left (spans 2 rows), two stacked right. Each: image, industry tag, title, one outcome metric in gold (e.g. *"−40% stock-count time"*), `View case study →`. **Needs real projects from XTS** — placeholders until then.

### 4 · Industries — selector
Left: 5 rows (icon + name). Right: large image + 2-line description + 3 example solutions.
Retail & E-commerce · Manufacturing · Logistics & Supply Chain · Healthcare · Government & Public Sector.
Mobile: becomes a horizontal swipe carousel of image cards.

### 5 · Process
Consult → Design → Build → Implement → Support. Numbered gold-ring nodes joined by a line that draws in on scroll. Each: icon, title, 1-line description.

### 6 · Why XTS + Stack
Three differentiators (replacing the hero badges): **One partner, end to end** · **Industry-first thinking** · **Measured by outcomes**. Below: grayscale logo strip of the stack/partners (gold on hover).

### 7 · CTA + Inquiry
Left: `Let's build what's next` / `Your technology partner for a smarter tomorrow` + direct email/phone. Right: form card — Name, Work email, Company, "What do you need?" (select: the 4 pillars + Other), Message, `Send inquiry →`. Success + error states. Spam protection: honeypot + rate limit.

### 8 · Footer
Logo + one-liner · nav columns · contact · socials (LinkedIn, YouTube, Instagram) · © 2026 · Privacy · Terms.

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

Dark-only site (the brand *is* the dark look). Gold on `--bg` passes AA for large text; body text stays `--text`/`--muted`.

**Type**
- Display: **Michroma** (wide, techy — matches the mockup H1), uppercase for H1 + eyebrows only.
- Text/UI: **Manrope** 400/500/600/700.
- Eyebrows: 12px, letter-spacing 0.32em, gold.

**Layout & motion**: 1200px container, 24px gutters (16px mobile), 12-col grid, 120px section rhythm (72px mobile). Cards: 1px `--line` border, 16px radius. Motion: fade-up on enter (Motion, `prefers-reduced-motion` respected), no scroll-jacking.

**Imagery**: one consistent grade — night interiors, warm tungsten + amber screen glow, deep shadows, city bokeh. See [`IMAGE-BRIEF.md`](IMAGE-BRIEF.md).

---

## 5. Tech stack
- **Next.js 15 (App Router) + TypeScript**, static-first (form via route handler).
- **Tailwind CSS v4** with tokens above in `@theme`.
- **Motion** (framer-motion) for reveals; **lucide-react** icons.
- `next/image` with AVIF/WebP; `next/font` for Michroma + Manrope.
- Contact form: route handler → email via Resend (key in `.env.local`), zod validation.
- Quality: ESLint, Prettier, Playwright smoke test, Lighthouse budget (Perf ≥ 90, A11y ≥ 95, SEO 100).
- Deploy: Vercel.

---

## 6. Content model (shared contract)

All copy lives in `src/content/*.ts`, typed by `src/content/types.ts`. Components never hardcode copy. This is the seam between the two agents.

```ts
export type Pillar   = { id: string; title: string; summary: string; chips: string[]; icon: string; image: Img; href?: string };
export type CaseStudy= { id: string; title: string; industry: string; metric: { value: string; label: string }; image: Img; href?: string };
export type Industry = { id: string; name: string; icon: string; summary: string; examples: string[]; image: Img };
export type Step     = { n: number; title: string; summary: string; icon: string };
export type Stat     = { value: number; suffix?: string; label: string };
export type Img      = { src: string; alt: string; width: number; height: number };
```

---

## 7. Milestones
1. **M0 Setup** — repo, scaffold, tokens, fonts, content types. 
2. **M1 Skeleton** — all sections rendered with placeholder content + images.
3. **M2 Polish** — real images, motion, responsive pass, a11y pass.
4. **M3 Ship** — contact form live, SEO/OG, Lighthouse budget, deploy.

## 8. Open questions (need answers from XTS)
1. Real proof numbers — projects delivered, industries served, years in business?
2. 2–3 real projects we can feature (client name or anonymised, industry, one outcome)?
3. Contact email / phone / office location for the footer and form destination?
4. Logo files (SVG) — the mockup logo is a raster.
5. Tech/partner logos you're allowed to show?
6. Domain + hosting preference (Vercel assumed)?
