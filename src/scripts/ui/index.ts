import { initIndustries } from './industries';
import { initForm } from '../form';

/** Header gains its border/backdrop once the page scrolls. */
function initHeader() {
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!header) return;
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:24px;height:1px;width:1px;';
  document.body.prepend(sentinel);
  new IntersectionObserver(([entry]) =>
    header.classList.toggle('is-scrolled', !entry.isIntersecting),
  ).observe(sentinel);
}

/** Mobile menu closes after choosing a link. */
function initMobileMenu() {
  const menu = document.querySelector<HTMLDetailsElement>('.mobile-menu');
  menu
    ?.querySelectorAll('a')
    .forEach((a) => a.addEventListener('click', () => (menu.open = false)));
}

/** Pause ambient CSS loops (console feed, data flows) while they're off-screen. */
function initOffscreenPause() {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries)
      e.target.classList.toggle('is-offscreen', !e.isIntersecting);
  });
  document
    .querySelectorAll('.console, .visual')
    .forEach((el) => io.observe(el));
}

/** Cursor spotlight on cards: feed pointer position to CSS (--mx/--my). Fine pointers only. */
function initSpotlight() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('.card').forEach((card) =>
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }),
  );
}

initHeader();
initSpotlight();
initMobileMenu();
initOffscreenPause();
initIndustries();
initForm();
