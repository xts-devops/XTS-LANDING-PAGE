import { observePhotoStages } from './photo-fit';
import { initPhotoGallery } from './gallery';
import { initBootIntro } from './boot';
import { initIndustryDemos } from './industry';
import { initScreenPreview } from './preview';
import { initAnchors } from './anchors';
import { initTabs } from './tabs';
import { initSlides } from './slides';
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
  const summary = menu?.querySelector('summary');
  if (!menu || !summary) return;
  const close = (focus = false) => {
    menu.open = false;
    if (focus) summary.focus();
  };
  menu
    .querySelectorAll('a')
    .forEach((a) => a.addEventListener('click', () => close()));
  menu.addEventListener('toggle', () =>
    summary.setAttribute('aria-expanded', String(menu.open)),
  );
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.open) close(true);
  });
  document.addEventListener('pointerdown', (e) => {
    if (menu.open && !menu.contains(e.target as Node)) close();
  });
  document.addEventListener('focusin', (e) => {
    if (menu.open && !menu.contains(e.target as Node)) close();
  });
  matchMedia('(min-width:701px)').addEventListener('change', (e) => {
    if (e.matches) close();
  });
}

/** Highlight the nav link for the section in view (aria-current). Home page only. */
function initActiveNav() {
  const links = [
    ...document.querySelectorAll<HTMLAnchorElement>(
      '.desktop-nav a[href^="#"]',
    ),
  ];
  if (!links.length) return;
  const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        links.forEach((a) => a.removeAttribute('aria-current'));
        byId.get(e.target.id)?.setAttribute('aria-current', 'true');
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  byId.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) io.observe(section);
  });
}

initHeader();
observePhotoStages();
initActiveNav();
initMobileMenu();
initTabs();
initSlides();
initForm();

/** Buttons work with native swipe and with the desktop scroll-driven gallery. */
function initWorkControls() {
  const track = document.querySelector<HTMLElement>('[data-work-track]');
  const cards = [...(track?.querySelectorAll<HTMLElement>('.work-card') ?? [])];
  const prev = document.querySelector<HTMLButtonElement>('[data-work-prev]');
  const next = document.querySelector<HTMLButtonElement>('[data-work-next]');
  const count = document.querySelector<HTMLElement>('[data-work-count]');
  if (!track || !cards.length) return;
  let current = 0;
  const render = (index: number) => {
    current = Math.max(0, Math.min(cards.length - 1, index));
    if (count)
      count.textContent =
        String(current + 1).padStart(2, '0') +
        ' / ' +
        String(cards.length).padStart(2, '0');
    if (prev) prev.disabled = current === 0;
    if (next) next.disabled = current === cards.length - 1;
  };
  const update = () => {
    if (track.classList.contains('is-pinned')) return;
    const max = Math.max(1, track.scrollWidth - track.clientWidth);
    render(Math.round((track.scrollLeft / max) * (cards.length - 1)));
  };
  const go = (delta: number) => {
    const index = Math.max(0, Math.min(cards.length - 1, current + delta));
    const event = new CustomEvent('work:navigate', {
      detail: { index },
      cancelable: true,
    });
    if (!track.dispatchEvent(event)) return;
    const max = track.scrollWidth - track.clientWidth;
    track.scrollTo({
      left: (max * index) / Math.max(1, cards.length - 1),
      behavior: matchMedia('(prefers-reduced-motion:reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  };
  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));
  track.addEventListener('scroll', update, { passive: true });
  track.addEventListener('work:progress', (e) =>
    render((e as CustomEvent<{ index: number }>).detail.index),
  );
  new ResizeObserver(update).observe(track);
  render(0);
}
initWorkControls();

initAnchors();

initScreenPreview();

initIndustryDemos();

initBootIntro();

initPhotoGallery();
