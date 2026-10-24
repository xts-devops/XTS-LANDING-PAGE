/** Native dialog gives keyboard focus trapping and Escape dismissal without a UI library. */
export function initScreenPreview() {
  const dialog = document.querySelector<HTMLDialogElement>(
    '[data-screen-dialog]',
  );
  const image = dialog?.querySelector<HTMLImageElement>('[data-dialog-image]');
  const title = dialog?.querySelector<HTMLElement>('#screen-dialog-title');
  const zoom = dialog?.querySelector<HTMLButtonElement>('[data-preview-zoom]');
  if (!dialog || !image) return;
  let opener: HTMLElement | null = null;
  document
    .querySelectorAll<HTMLButtonElement>('[data-screen-open]')
    .forEach((button) =>
      button.addEventListener('click', () => {
        const source = button
          .closest('.slide')
          ?.querySelector<HTMLElement>('[data-screen-source]')
          ?.dataset.screenSource;
        if (!source) return;
        opener = button;
        image.src = source;
        image.alt = button.dataset.screenTitle ?? '';
        if (title) title.textContent = image.alt;
        dialog.classList.remove('is-zoomed');
        zoom?.setAttribute('aria-pressed', 'false');
        image.onload = () =>
          dialog.style.setProperty(
            '--preview-width',
            `${image.naturalWidth / 2}px`,
          );
        document.dispatchEvent(
          new CustomEvent('site:preview', { detail: { open: true } }),
        );
        dialog.showModal();
      }),
    );
  dialog
    .querySelector('[data-preview-close]')
    ?.addEventListener('click', () => dialog.close());
  zoom?.addEventListener('click', () => {
    const enabled = dialog.classList.toggle('is-zoomed');
    zoom.setAttribute('aria-pressed', String(enabled));
  });
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.dispatchEvent(
      new CustomEvent('site:preview', { detail: { open: false } }),
    );
    opener?.focus({ preventScroll: true });
  });
}
