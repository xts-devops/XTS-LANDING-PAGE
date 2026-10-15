# T07 · Form provider spike

**Decision: Web3Forms (free plan)** → D18. Researched 2026-10-16.

## Constraints (from PLAN / DECISIONS)
- Site is 100% static, no server (D12) → submit from the browser.
- No DNS changes to xzentechsolutions.com (D10) → no domain-verified sender.
- Deliver to `info@xzentechsolutions.com`. Low volume (B2B inquiries).
- PH Data Privacy Act consent (D14).

## Comparison
| | **Web3Forms — Free** | **Formspree — Free** |
|---|---|---|
| Submissions / month | **250** | 50 ("for testing and development") |
| Browser (AJAX) submit | Yes — recommended way; **server-side needs paid plan + IP allow-list** | Yes (`Accept: application/json`) |
| Key exposure | Access key is public by design (only lets someone email you) | Form ID is public |
| Spam (free) | Honeypot (`botcheck`) + spam filter + **hCaptcha, zero-config** (shared site key) | Formshield ML filter + reCAPTCHA v2 (custom key) |
| Turnstile / reCAPTCHA v3 | Pro only | reCAPTCHA all plans; no Turnstile |
| Restrict to domain | Pro | Free |
| Autoresponder to visitor | Pro | Paid |
| Archive | 30 days | 30 days |
| Paid upgrade | Pro ≈ $12–18/mo (third-party sources disagree; check the official page) | $10/mo (200/mo) · $20/mo (2,000/mo) |

## Why Web3Forms
5× the free volume, designed for exactly this case (static site, browser submit), hCaptcha at
zero config, and nothing secret to protect. Formspree's free tier is explicitly for testing.

## Implementation notes (for T30)
- `POST https://api.web3forms.com/submit`, JSON body, `Accept: application/json`; check `success` in the response.
- Fields: `access_key` (from `PUBLIC_FORM_ACCESS_KEY`), `subject` ("New inquiry — XTS website"), `from_name` ("XTS Website"), `name`, `email` (Web3Forms sets reply-to to the visitor's email automatically), `company`, `need`, `message`, `consent`, `botcheck` (hidden honeypot — must stay empty).
- Validate with zod before sending; disable the button while sending; show the email address as a fallback on error/timeout (10s).
- **Spam, layered**: honeypot + minimum fill time (≥ 3s from first focus) on day one. **hCaptcha only if spam shows up** — its script is heavy (~100 KB+) and adds user friction. If enabled: load lazily on first form focus, `data-theme="dark"`, compact.
- `PUBLIC_CAPTCHA_SITE_KEY` isn't needed (Web3Forms uses its own shared key on free) — remove from `.env.example`.
- Privacy notice must name Web3Forms as the processor that relays submissions by email (T17).

## Upgrade paths
- More volume, Turnstile, autoresponder, domain lock → Web3Forms Pro.
- At domain cutover (T40) → Resend with a verified `xzentechsolutions.com` sender (needs a server endpoint or a serverless function — new DECISIONS entry then).

## User action needed
Create the access key at **web3forms.com** using `info@xzentechsolutions.com` (it's sent to that inbox), then put it in `.env` as `PUBLIC_FORM_ACCESS_KEY` and later in Vercel's environment variables. Agents can't create accounts.

## Sources
- [Web3Forms — API reference](https://docs.web3forms.com/getting-started/api-reference) (browser-side; server-side needs paid + IP allow-list)
- [Web3Forms — FAQ](https://docs.web3forms.com/getting-started/faq) (access key is public)
- [Web3Forms — hCaptcha](https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha) · [Pro features](https://docs.web3forms.com/getting-started/pro-features)
- [Formspree — Plans](https://formspree.io/plans) (free: 50/mo, testing)
- Web3Forms free = 250/mo: [agentdeals.dev](https://agentdeals.dev/vendor/web3forms), [splitforms review](https://splitforms.com/reviews/web3forms) (official pricing page blocked automated fetch)
