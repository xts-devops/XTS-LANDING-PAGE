/** Photographs keep native links as the no-JS fallback. Only the selected large image loads. */
export function initPhotoGallery() {
  const root = document.querySelector<HTMLElement>('[data-photo-gallery]');
  const dialog = root?.querySelector<HTMLDialogElement>(
    '[data-gallery-dialog]',
  );
  const image = dialog?.querySelector<HTMLImageElement>('[data-gallery-image]');
  const title = dialog?.querySelector<HTMLElement>('#gallery-dialog-title');
  const count = dialog?.querySelector<HTMLElement>('[data-gallery-count]');
  const previous = dialog?.querySelector<HTMLButtonElement>(
    '[data-gallery-prev]',
  );
  const next = dialog?.querySelector<HTMLButtonElement>('[data-gallery-next]');
  const links = [
    ...(root?.querySelectorAll<HTMLAnchorElement>('[data-gallery-open]') ?? []),
  ];
  if (!dialog || !image || !links.length) return;
  let current = 0;
  let opener: HTMLAnchorElement | null = null;
  const show = (index: number) => {
    current = Math.max(0, Math.min(links.length - 1, index));
    const link = links[current];
    image.src = link.dataset.galleryOpen ?? link.href;
    image.alt = link.dataset.galleryAlt ?? '';
    if (title) title.textContent = link.dataset.galleryCaption ?? '';
    if (count)
      count.textContent =
        String(current + 1).padStart(2, '0') +
        ' / ' +
        String(links.length).padStart(2, '0');
    if (previous) previous.disabled = current === 0;
    if (next) next.disabled = current === links.length - 1;
  };
  links.forEach((link, index) =>
    link.addEventListener('click', (event) => {
      if (
        event.button ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !link.dataset.galleryOpen
      )
        return;
      event.preventDefault();
      opener = link;
      show(index);
      dialog.showModal();
      document.dispatchEvent(
        new CustomEvent('site:preview', { detail: { open: true } }),
      );
    }),
  );
  previous?.addEventListener('click', () => show(current - 1));
  next?.addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
      return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog
    .querySelector('[data-gallery-close]')
    ?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.dispatchEvent(
      new CustomEvent('site:preview', { detail: { open: false } }),
    );
    opener?.focus({ preventScroll: true });
    image.removeAttribute('src');
  });
}
