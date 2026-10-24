/** Load a self-contained sandbox only after a visitor chooses a concept. */
export function initIndustryDemos() {
  const dialog =
    document.querySelector<HTMLDialogElement>('[data-demo-dialog]');
  const frame = dialog?.querySelector<HTMLIFrameElement>('[data-demo-frame]');
  const heading = dialog?.querySelector<HTMLElement>('#demo-dialog-heading');
  const hint = dialog?.querySelector<HTMLElement>('[data-demo-instruction]');
  const loading = dialog?.querySelector<HTMLElement>('[data-demo-loading]');
  if (!dialog || !frame) return;
  let opener: HTMLElement | null = null;
  frame.addEventListener('load', () => {
    if (loading) loading.hidden = true;
  });
  document
    .querySelectorAll<HTMLButtonElement>('[data-demo-open]')
    .forEach((button) =>
      button.addEventListener('click', () => {
        opener = button;
        if (heading) heading.textContent = button.dataset.demoTitle ?? '';
        if (hint) hint.textContent = button.dataset.demoHint ?? '';
        frame.title = button.dataset.demoTitle ?? '';
        if (loading) loading.hidden = false;
        document.dispatchEvent(
          new CustomEvent('site:preview', { detail: { open: true } }),
        );
        dialog.showModal();
        frame.src = button.dataset.demoUrl ?? '';
      }),
    );
  dialog
    .querySelector('[data-demo-close]')
    ?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  addEventListener('message', (e) => {
    if (
      e.source === frame.contentWindow &&
      e.data?.type === 'xts:demo-close' &&
      dialog.open
    )
      dialog.close();
  });
  dialog.addEventListener('close', () => {
    frame.removeAttribute('src');
    document.dispatchEvent(
      new CustomEvent('site:preview', { detail: { open: false } }),
    );
    opener?.focus({ preventScroll: true });
  });
}
