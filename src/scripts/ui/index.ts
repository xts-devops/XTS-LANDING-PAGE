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
  menu
    ?.querySelectorAll('a')
    .forEach((a) => a.addEventListener('click', () => (menu.open = false)));
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
initActiveNav();
initMobileMenu();
initTabs();
initSlides();
initForm();
