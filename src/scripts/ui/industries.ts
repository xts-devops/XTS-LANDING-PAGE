/**
 * Industries: progressive enhancement from an anchor list + scrollable panels (no-JS)
 * to an accessible tabs pattern (WAI-ARIA APG: roving tabindex, arrows/Home/End, manual focus
 * follows selection).
 */
export function initIndustries(root: ParentNode = document) {
  const layout = root.querySelector<HTMLElement>('[data-industries]');
  if (!layout) return;
  const list = layout.querySelector<HTMLElement>('[data-tablist]');
  const tabs = [...layout.querySelectorAll<HTMLAnchorElement>('[data-tab]')];
  const panels = [...layout.querySelectorAll<HTMLElement>('[data-panel]')];
  const region = layout.querySelector<HTMLElement>('.industry-panels');
  if (!list || !tabs.length || tabs.length !== panels.length || !region) return;

  layout.classList.add('is-tabs');
  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-orientation', 'vertical');
  region.removeAttribute('role');
  region.removeAttribute('tabindex');
  region.removeAttribute('aria-label');
  list
    .querySelectorAll('li')
    .forEach((li) => li.setAttribute('role', 'presentation'));

  tabs.forEach((tab, i) => {
    const panel = panels[i];
    tab.id = `tab-${tab.dataset.tab}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.setAttribute('tabindex', '0');
  });

  const select = (index: number, focus = false) => {
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[i].hidden = !active;
      panels[i].classList.toggle('is-entering', active);
    });
    if (focus) tabs[index].focus();
  };

  // Honour a deep link (#industry-healthcare) on first load.
  const fromHash = tabs.findIndex((t) => t.hash === location.hash);
  select(fromHash >= 0 ? fromHash : 0);
  panels.forEach((p) => p.classList.remove('is-entering'));

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      select(i);
    });
    tab.addEventListener('keydown', (event) => {
      const last = tabs.length - 1;
      const next: Record<string, number> = {
        ArrowDown: i === last ? 0 : i + 1,
        ArrowRight: i === last ? 0 : i + 1,
        ArrowUp: i === 0 ? last : i - 1,
        ArrowLeft: i === 0 ? last : i - 1,
        Home: 0,
        End: last,
      };
      if (event.key in next) {
        event.preventDefault();
        select(next[event.key], true);
      }
    });
  });
}
