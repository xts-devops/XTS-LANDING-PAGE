/** Match the overlay to the photographed image's painted rectangle, including crop/letterbox. */
export function observePhotoStages(root: ParentNode = document) {
  const stages = root.querySelectorAll<HTMLElement>('[data-fit-stage]');
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const stage = entry.target.querySelector<HTMLElement>('[data-fit-stage]');
      if (!stage) continue;
      const nativeWidth = Number(stage.dataset.fitStage);
      const nativeHeight = stage.offsetHeight;
      if (!nativeWidth || !nativeHeight) continue;
      const { width, height } = entry.contentRect;
      const fit = stage.dataset.fitMode === 'contain' ? Math.min : Math.max;
      const scale = fit(width / nativeWidth, height / nativeHeight);
      const photo = entry.target.querySelector<HTMLImageElement>(
        ':scope > picture > img, :scope > img',
      );
      const position = photo
        ? getComputedStyle(photo).objectPosition.split(' ')
        : [];
      const fraction = (value: string | undefined) =>
        value?.endsWith('%') ? Number.parseFloat(value) / 100 : 0.5;
      stage.style.setProperty('--s', String(scale));
      stage.style.setProperty(
        '--photo-x',
        (width - nativeWidth * scale) * fraction(position[0]) + 'px',
      );
      stage.style.setProperty(
        '--photo-y',
        (height - nativeHeight * scale) * fraction(position[1]) + 'px',
      );
    }
  });
  stages.forEach((stage) => {
    if (stage.parentElement) observer.observe(stage.parentElement);
  });
  return () => observer.disconnect();
}
