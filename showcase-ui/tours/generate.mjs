import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);
const routes = JSON.parse(
  fs.readFileSync(path.join(root, 'showcase-ui/tours/routes.json'), 'utf8'),
);
const escape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('"', '&quot;');
const available = (url) => {
  if (!/^\/demos\/media\/tours\/[a-z0-9-]+\.mp4$/.test(url)) return false;
  const file = path.join(root, 'public', url);
  return fs.existsSync(file) && fs.statSync(file).size > 0;
};
export function renderJourney(source) {
  const config = {
    ...source,
    chapters: source.chapters.map((c) => ({
      ...c,
      src: available(c.desktop) ? c.desktop : null,
      mobileSrc: available(c.mobile) ? c.mobile : null,
    })),
  };
  const ready = config.chapters.every((c) => c.src);
  const total = config.chapters.reduce((sum, c) => sum + c.seconds, 0);
  return `<!doctype html><html lang="en" class="no-js"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escape(config.eyebrow)} — Architectural journey</title><link rel="stylesheet" href="/demos/demo.css"><link rel="stylesheet" href="/demos/tours/player.css"><script defer src="/demos/tours/player.js"></script></head><body class="journey-page theme-${config.theme}"><div class="journey-shell" data-journey>
<header class="journey-header"><a class="journey-brand" href="${config.back}"><span class="journey-mark" aria-hidden="true">↗</span><span>${config.eyebrow}<small>Spatial storytelling / architectural film</small></span></a><a class="journey-back" href="${config.back}">${config.backLabel} ↗</a></header>
<div class="journey-heading"><div><p class="journey-eyebrow">EXPERIENCE THE SPACE</p><h1>${config.title}</h1><p>${config.subtitle}</p></div><span class="journey-badge">${ready ? 'Generated architectural concept' : 'Design preview · footage pending'}</span></div>
<main class="journey-layout"><div class="journey-main"><section class="tour-stage" data-tour-stage tabindex="0" aria-label="${config.id === 'hotel' ? 'Hotel' : 'Property'} journey viewer"><img class="tour-cover" src="${config.cover}" alt="${escape(config.alt)}" width="1600" height="900"><canvas class="tour-hold" data-tour-hold aria-hidden="true"></canvas><video data-journey-video muted playsinline preload="none" aria-label="${config.id === 'hotel' ? 'Hotel' : 'Property'} journey film"></video><div class="tour-topline"><span data-tour-index>${ready ? 'JOURNEY / 01' : 'CONCEPT COVER / ROUTE REVIEW'}</span><span data-tour-quality>${ready ? 'Video on demand' : 'Generated concept'}</span></div><div class="tour-overlay"><p class="tour-location" data-tour-location>${config.chapters[0].location}</p><h2 data-tour-title>${config.chapters[0].title}</h2><div class="tour-controls"><button type="button" class="tour-play" data-tour-play ${!config.chapters[0].src ? 'disabled' : ''}>${ready ? 'Play journey' : 'Footage pending'}</button><div><button type="button" data-tour-expand aria-label="Expand journey viewer">⛶</button></div></div></div></section>
<nav class="journey-chapters" aria-label="Journey chapters" style="--chapters:${config.chapters.length}">${config.chapters.map((c, i) => `<button type="button" data-tour-chapter="${i}" aria-pressed="${!i}"><span class="chapter-number">0${i + 1}</span><span><b>${c.title}</b><small>${c.location}</small></span><span class="chapter-fill" aria-hidden="true"></span></button>`).join('')}</nav><p class="tour-status" data-tour-status role="status" aria-live="polite">${ready ? 'Hover to preview, or press Play. Choose any chapter to explore.' : 'Review the route and controls. Actual video is awaiting a footage source; this cover is not a walkthrough.'}</p></div>
<aside class="journey-details"><p class="journey-eyebrow">THE ROUTE</p><h2>One connected experience.</h2><p class="route-meta">${config.chapters.length} chapters · approximately ${Math.round(total)} seconds</p><ol class="journey-route">${config.chapters.map((c, i) => `<li data-route-step="${i}" aria-current="${i === 0 ? 'step' : 'false'}"><span>0${i + 1}</span><div><b>${c.title}</b><small>${c.location}</small></div></li>`).join('')}</ol><div class="route-description"><span>SELECTED CHAPTER</span><h3 data-tour-detail-title>${config.chapters[0].title}</h3><p data-tour-summary>${config.chapters[0].summary}</p></div><p class="journey-notice">${ready ? 'Generated architectural concept. No listing or client project is represented.' : 'Concept cover and planned route only. No continuous filmed walkthrough is represented. Source footage must match the route before publishing.'}</p></aside></main><footer class="journey-footer"><span>Illustrative architecture · no real property listing</span><span>Quiet playback · chapter navigation · motion-aware</span></footer></div><script type="application/json" data-journey-config>${JSON.stringify(config).replaceAll('<', '\u003c')}</script></body></html>`;
}
const publicDir = path.join(root, 'public/demos/tours');
fs.mkdirSync(publicDir, { recursive: true });
for (const route of routes) {
  const html = renderJourney(route);
  fs.writeFileSync(path.join(publicDir, route.id + '.html'), html);
  fs.writeFileSync(
    path.join(root, 'showcase-ui/tours', route.id + '.html'),
    html,
  );
}
for (const file of ['player.js', 'player.css'])
  if (fs.existsSync(path.join(root, 'showcase-ui/tours', file)))
    fs.copyFileSync(
      path.join(root, 'showcase-ui/tours', file),
      path.join(publicDir, file),
    );
