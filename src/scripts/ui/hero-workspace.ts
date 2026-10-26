/** The illustrative screen activity runs only while its photo is visible. */
export function initHeroWorkspace() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const visual = hero?.querySelector<HTMLElement>('.hero-visual');
  if (!hero || !visual) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  const render = () => {
    hero.dataset.workspaceActive = String(
      visible && !document.hidden && !preference.matches,
    );
  };
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    render();
  }).observe(visual);
  preference.addEventListener('change', render);
  document.addEventListener('visibilitychange', render);
  addEventListener('pageshow', render);
  addEventListener('pagehide', () => {
    hero.dataset.workspaceActive = 'false';
  });
  render();
}
