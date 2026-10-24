/** A short brand ritual, not a loading dependency. The head guard owns a hard fail-open timer. */
export function initBootIntro() {
  const root = document.documentElement;
  const screen = document.querySelector<HTMLElement>('[data-boot-screen]');
  if (!screen) return;
  const preference = matchMedia('(prefers-reduced-motion:reduce)');
  const finish = (restoreFocus = false) => {
    const focused = screen.contains(document.activeElement);
    root.removeAttribute('data-boot');
    if (restoreFocus && focused) {
      const main = document.getElementById('main-content');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
        main.addEventListener('blur', () => main.removeAttribute('tabindex'), {
          once: true,
        });
      }
    }
  };
  screen.addEventListener('animationend', (e) => {
    if (e.animationName === 'xts-boot-out') finish(true);
  });
  screen.addEventListener('click', () => finish(true));
  const interrupt = (event: Event) => {
    if (!root.hasAttribute('data-boot')) return;
    if (
      event instanceof KeyboardEvent &&
      !['Escape', 'Tab', 'Enter', ' '].includes(event.key)
    )
      return;
    finish(true);
  };
  document.addEventListener('keydown', interrupt, { capture: true });
  addEventListener('wheel', interrupt, { passive: true });
  addEventListener('touchstart', interrupt, { passive: true });
  preference.addEventListener('change', () => {
    if (preference.matches) finish(true);
  });
  addEventListener('pageshow', (event) => {
    if (event.persisted) finish();
  });
  if (preference.matches) finish();
}
