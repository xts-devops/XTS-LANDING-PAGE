/** The illustrative screen activity runs only while its photo is visible. */
export function initHeroWorkspace() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const visual = hero?.querySelector<HTMLElement>('.hero-visual');
  const toggle = hero?.querySelector<HTMLButtonElement>(
    '[data-workspace-toggle]',
  );
  if (!hero || !visual || !toggle) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false,
    paused = false;
  const render = () => {
    hero.dataset.workspaceActive = String(
      visible && !document.hidden && !preference.matches && !paused,
    );
    toggle.hidden = preference.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute(
      'aria-label',
      paused
        ? (toggle.dataset.resumeLabel ?? '')
        : (toggle.dataset.pauseLabel ?? ''),
    );
    toggle.querySelector('[data-workspace-toggle-label]')!.textContent = paused
      ? (toggle.dataset.resumeLabel ?? '')
      : (toggle.dataset.pauseLabel ?? '');
    toggle.querySelector('[aria-hidden]')!.textContent = paused ? '▶' : 'Ⅱ';
  };
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    render();
  }).observe(visual);
  toggle.addEventListener('click', () => {
    paused = !paused;
    render();
  });
  preference.addEventListener('change', render);
  document.addEventListener('visibilitychange', render);
  addEventListener('pageshow', render);
  addEventListener('pagehide', () => {
    hero.dataset.workspaceActive = 'false';
  });
  render();
}
