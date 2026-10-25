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
const icon = (name, extra = '') => {
  const paths = {
    play: '<path d="m9 6 9 6-9 6Z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M9 6v12M15 6v12"/>',
    replay: '<path d="M4 10a8 8 0 1 1 1 7M4 4v6h6"/>',
    expand: '<path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    mark: '<path d="m4 17 8-12 8 12M7 13h10M6 20h12"/>',
  };
  return `<svg ${extra} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
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
  const ready = config.chapters.every((c) => c.src),
    total = Math.round(config.chapters.reduce((sum, c) => sum + c.seconds, 0)),
    design = config.presentation;
  const e = escape;
  return `<!doctype html><html lang="en" class="no-js"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="${config.id === 'hotel' ? '#f3f0e8' : '#131615'}"><title>${e(design.label)} — An architectural experience</title><link rel="stylesheet" href="/demos/tours/player.css"><script defer src="/demos/tours/player.js"></script></head><body class="journey-page theme-${config.theme}"><div class="journey-shell" data-journey>
<header class="journey-header"><div class="journey-brand"><span class="journey-mark">${icon('mark')}</span><span>${e(design.label)}<small>An XTS interface concept</small></span></div><nav class="journey-links" aria-label="Page sections"><a href="#film">The film</a><a href="#details">Design notes</a></nav><span class="journey-edition">${config.id === 'hotel' ? 'HOSPITALITY' : 'RESIDENTIAL'}<span aria-hidden="true"> / </span>01</span></header>
<div class="journey-heading"><div><p class="journey-eyebrow">${e(design.category)}</p><h1>${e(design.lead)} <em>${e(design.accent)}</em></h1></div><div class="journey-intro"><p>${e(config.subtitle)}</p><span class="journey-intro-meta">${config.chapters.length} perspectives <span aria-hidden="true">·</span> ${total}-second film <span class="quiet-dot" aria-hidden="true"></span> Sound off</span></div></div>
<main class="journey-layout"><div class="journey-main"><section id="film" class="tour-stage" data-tour-stage tabindex="0" aria-label="${config.id === 'hotel' ? 'Hotel' : 'Property'} journey viewer"><img class="tour-cover" src="${config.cover}" alt="${e(config.alt)}" width="1600" height="900"><canvas class="tour-hold" data-tour-hold aria-hidden="true"></canvas><video data-journey-video muted playsinline preload="none" aria-label="${config.id === 'hotel' ? 'Hotel' : 'Property'} journey film"></video><div class="tour-topline"><span data-tour-index>CHAPTER / 01</span><span class="tour-quality" data-tour-quality>${ready ? 'Explore the film' : 'Generated concept'}</span></div><div class="tour-overlay"><div class="tour-caption"><p class="tour-location" data-tour-location>${e(config.chapters[0].location)}</p><h2 data-tour-title>${e(config.chapters[0].title)}</h2></div><div class="tour-controls"><button type="button" class="tour-play" data-tour-play data-play-mode="play" ${!ready ? 'disabled' : ''}><span class="tour-play-symbol">${icon('play', 'class="play-symbol"')}${icon('pause', 'class="pause-symbol"')}${icon('replay', 'class="replay-symbol"')}</span><span data-tour-play-label>${ready ? 'Play journey' : 'Footage pending'}</span></button><button type="button" class="tour-expand" data-tour-expand aria-label="Expand journey viewer">${icon('expand')}</button></div></div></section>
<nav class="journey-chapters" aria-label="Journey chapters" style="--chapters:${config.chapters.length}">${config.chapters.map((c, i) => `<button type="button" data-tour-chapter="${i}" aria-pressed="${!i}"><img class="chapter-preview" src="${c.thumbnail}" width="80" height="48" alt="" loading="lazy" decoding="async"><span class="chapter-copy"><span class="chapter-number">0${i + 1}<span class="chapter-active-dot" aria-hidden="true"></span></span><b>${e(c.title)}</b></span><span class="chapter-fill" aria-hidden="true"></span></button>`).join('')}</nav><p class="tour-status" data-tour-status role="status" aria-live="polite">${ready ? 'Hover to watch. Select a perspective to explore.' : 'The film is being prepared. Explore the concept stills.'}</p></div>
<aside class="journey-details" id="details" aria-label="Design notes"><div><p class="journey-eyebrow">${e(design.notesLabel)}</p><h2>${e(design.notesTitle)}</h2><div class="route-description"><span class="detail-label">IN FOCUS</span><h3 data-tour-detail-title>${e(config.chapters[0].title)}</h3><p data-tour-summary>${e(config.chapters[0].summary)}</p></div></div><dl class="journey-features">${design.features.map(([label, value]) => `<div><dt>${e(label)}</dt><dd>${e(value)}</dd></div>`).join('')}</dl><div class="journey-details-end"><a class="journey-back" href="${config.back}"><span>${e(design.cta)}</span>${icon('arrow')}</a><p class="journey-notice">Illustrative spaces. No real property listing or client project is represented.</p></div></aside></main>
<footer class="journey-footer"><span class="journey-signature">${e(design.signature)}</span><span class="journey-badge">${ready ? 'Generated architectural concept' : 'Design preview · footage pending'}</span></footer></div><script type="application/json" data-journey-config>${JSON.stringify(config).replaceAll('<', '\\u003c')}</script></body></html>`;
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
  fs.copyFileSync(
    path.join(root, 'showcase-ui/tours', file),
    path.join(publicDir, file),
  );
