/**
 * Accessible tabs (WAI-ARIA APG) for any container holding [data-tablist] + [data-tab]/[data-panel].
 * Roving tabindex; Left/Right/Up/Down, Home/End; deep link via #system-<id>.
 * Layout is decided in CSS before first paint (.js), so enhancing never shifts the page.
 */
export function initTabs(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-tablist]').forEach((list) => {
    const scope = list.parentElement;
    if (!scope) return;
    const tabs = [...list.querySelectorAll<HTMLElement>('[data-tab]')];
    const panels = tabs.map((t) =>
      scope.querySelector<HTMLElement>(`[data-panel="${t.dataset.tab}"]`),
    );
    if (!tabs.length || panels.some((p) => !p)) return;

    list.setAttribute('role', 'tablist');
    tabs.forEach((tab, i) => {
      const panel = panels[i]!;
      tab.id ||= `tab-${tab.dataset.tab}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panel.id);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.setAttribute('tabindex', '-1');
    });

    const select = (
      index: number,
      opts: { focus?: boolean; animate?: boolean } = {},
    ) => {
      tabs.forEach((tab, i) => {
        const active = i === index;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        panels[i]!.hidden = !active;
        panels[i]!.classList.toggle(
          'is-entering',
          active && opts.animate !== false,
        );
      });
      if (opts.focus) tabs[index].focus();
      list.dispatchEvent(new CustomEvent('tabs:change', { detail: { index } }));
    };

    const fromHash = panels.findIndex((p) => `#${p!.id}` === location.hash);
    select(Math.max(0, fromHash), { animate: false });
    scope.classList.add('tabs-ready');

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', (event) => {
        const last = tabs.length - 1;
        const map: Record<string, number> = {
          ArrowRight: i === last ? 0 : i + 1,
          ArrowDown: i === last ? 0 : i + 1,
          ArrowLeft: i === 0 ? last : i - 1,
          ArrowUp: i === 0 ? last : i - 1,
          Home: 0,
          End: last,
        };
        if (event.key in map) {
          event.preventDefault();
          select(map[event.key], { focus: true });
        }
      });
    });
  });
}
