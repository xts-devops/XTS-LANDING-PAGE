/* Local sample operations. No stock, payment or carrier mutations. */
(() => {
  const branch = document.querySelector('[data-retail-branch]');
  if (branch) {
    const transfer = document.querySelector('[data-retail-transfer]');
    const collect = document.querySelector('[data-retail-collect]');
    const stockByBranch = {
      Makati: [8, 42, 12, 24, 6, 36],
      'Quezon City': [20, 12, 26, 8, 20, 30],
      'Cebu City': [5, 60, 14, 19, 24, 14],
    };
    const targets = [16, 24, 20, 12, 18, 24];
    const names = [
      'Drill',
      'Measuring tape',
      'Safety helmet',
      'Extension cable',
      'Interior paint',
      'Work gloves',
    ];
    let suggested = 28;
    branch.addEventListener('change', () => {
      document.querySelector('[data-retail-store]').textContent = branch.value;
      document.querySelector('[data-retail-destination]').textContent =
        branch.value;
      document.querySelector('[data-retail-pickup]').textContent = branch.value;
      const stocks = stockByBranch[branch.value];
      const shortages = [];
      document.querySelectorAll('[data-retail-stock]').forEach((item, i) => {
        item.textContent = stocks[i];
        const badge = item.closest('.retail-product').querySelector('.pill');
        badge.className =
          'pill ' + (stocks[i] < targets[i] ? 'amber' : 'green');
        badge.textContent =
          stocks[i] < targets[i] ? 'Replenish soon' : 'In stock';
        if (stocks[i] < targets[i])
          shortages.push([names[i], targets[i] - stocks[i]]);
      });
      document.querySelector('[data-retail-low]').textContent =
        shortages.length;
      suggested = shortages.reduce((sum, item) => sum + item[1], 0);
      document.querySelector('[data-retail-suggestions]').replaceChildren(
        ...shortages.map(([name, count]) => {
          const li = document.createElement('li'),
            b = document.createElement('b');
          li.append(name + ' ');
          b.textContent = count + ' units';
          li.append(b);
          return li;
        }),
      );
      document.querySelector('[data-retail-transfer-status]').textContent =
        suggested + ' units suggested · Awaiting store review';
      document.querySelector('[data-retail-collect-status]').textContent =
        'Payment recorded · Store picking pending';
      transfer.disabled = false;
      collect.disabled = false;
    });
    transfer.addEventListener('click', () => {
      document.querySelector('[data-retail-transfer-status]').textContent =
        'TR-2026-042 drafted · ' +
        suggested +
        ' units to ' +
        branch.value +
        ' · Pending approval';
      transfer.disabled = true;
    });
    collect.addEventListener('click', () => {
      document.querySelector('[data-retail-collect-status]').textContent =
        'Ready for collection · Customer notification queued in this sample';
      collect.disabled = true;
    });
  }
  const action = document.querySelector('[data-warehouse-action]');
  if (!action) return;
  const stages = [
    {
      title: 'Verify the inbound shipment',
      detail:
        'Match the advance shipping notice, scan pallet labels and separate damaged cartons before putaway.',
      checks: [
        'ASN-2026-086 matched',
        '96 pallets counted',
        '12 cartons on quality hold',
      ],
      button: 'Confirm receipt checks',
      done: 'Receipt verified · Eligible stock ready for putaway',
      row: 'Awaiting release',
    },
    {
      title: 'Allocate the fulfilment wave',
      detail:
        'Group 1,248 orders by destination and storage zone. Held cartons remain unavailable for allocation.',
      checks: [
        'Available stock checked',
        'Zone A / B / C assigned',
        'Carrier cutoff reviewed',
      ],
      button: 'Release sample wave',
      done: 'W-1026-048 released · Zone tasks created',
      row: 'Allocated to wave',
    },
    {
      title: 'Pick, scan and consolidate',
      detail:
        'Follow zone tasks, confirm bin and item scans, then verify each order at the packing bench.',
      checks: [
        'Zone picking confirmed',
        'Pack verification recorded',
        'Parcel labels prepared',
      ],
      button: 'Confirm pick & pack checks',
      done: 'Packing verified · Sample parcels ready at outbound lanes',
      row: 'Packed & verified',
    },
    {
      title: 'Prepare the carrier handoff',
      detail:
        'Check the manifest against sealed parcels. Dispatch requires all previous checks; held stock stays in Zone D.',
      checks: [
        'Manifest quantities checked',
        'Seal reference recorded',
        'Outbound lane confirmed',
      ],
      button: 'Confirm sample dispatch',
      done: 'Sample dispatch confirmed · Manifest MF-2026-048 recorded',
      row: 'Dispatch confirmed',
    },
  ];
  const completed = new Set();
  let current = 0;
  const setText = (key, value) =>
    (document.querySelector('[data-warehouse-' + key + ']').textContent =
      value);
  function render() {
    const item = stages[current];
    document
      .querySelectorAll('[data-warehouse-stage]')
      .forEach((b, i) => b.setAttribute('aria-pressed', String(i === current)));
    setText(
      'pill',
      '0' +
        (current + 1) +
        ' / ' +
        ['Receiving', 'Wave allocation', 'Pick & pack', 'Dispatch'][current],
    );
    setText('title', item.title);
    setText('detail', item.detail);
    const list = document.querySelector('[data-warehouse-checks]');
    list.replaceChildren(
      ...item.checks.map((text) => {
        const li = document.createElement('li');
        li.textContent = text;
        return li;
      }),
    );
    const blocked = current > 0 && !completed.has(current - 1);
    action.disabled = completed.has(current) || blocked;
    action.textContent = completed.has(current)
      ? 'Checks recorded'
      : item.button;
    setText(
      'status',
      completed.has(current)
        ? item.done
        : blocked
          ? 'Complete the previous stage checks before this handoff.'
          : 'Waiting for operator review · Sample data only',
    );
    document
      .querySelectorAll('[data-zone]')
      .forEach((z) =>
        z.classList.toggle(
          'is-active',
          Number(z.dataset.zone) === (current === 0 ? 3 : current - 1),
        ),
      );
  }
  document.querySelectorAll('[data-warehouse-stage]').forEach((b) =>
    b.addEventListener('click', () => {
      current = Number(b.dataset.warehouseStage);
      render();
    }),
  );
  action.addEventListener('click', () => {
    if (action.disabled) return;
    completed.add(current);
    document
      .querySelectorAll('[data-wave-row]')
      .forEach((cell) => (cell.textContent = stages[current].row));
    setText(
      'audit',
      [
        'Receipt checks recorded',
        'Wave allocation approved',
        'Pack verification recorded',
        'Manifest ready for carrier',
      ][current],
    );
    render();
  });
  render();
})();
