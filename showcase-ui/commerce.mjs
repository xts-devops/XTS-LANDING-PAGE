const products = [
  ['drill', 'Cordless drill · 18V', 'TL-1048', '₱3,850', 8, 16],
  ['tape', 'Measuring tape · 5m', 'TL-2052', '₱245', 42, 24],
  ['helmet', 'Safety helmet', 'SF-3106', '₱320', 12, 20],
  ['cable', 'Extension cable · 10m', 'EL-4081', '₱980', 24, 12],
  ['paint', 'Interior paint · 1L', 'PT-5024', '₱460', 6, 18],
  ['gloves', 'Work gloves · pair', 'SF-6103', '₱185', 36, 24],
];
export function commerceBodies({ head, metric, panel, pill }) {
  const retail =
    head(
      'RETAIL OPERATIONS / SAMPLE WORKSPACE',
      'Every shelf. Every branch.',
      'Product availability, store transfers and collection orders.',
      '<label class="commerce-select">Branch<select data-retail-branch><option>Makati</option><option>Quezon City</option><option>Cebu City</option></select></label>',
    ) +
    '<div class="metrics">' +
    metric('Today’s sample sales', '₱128,450', 'Across three sample stores') +
    metric('Collection orders', '18', 'Awaiting store handoff') +
    metric(
      'Low-stock products',
      '<span data-retail-low>3</span>',
      'Below store target',
    ) +
    metric('Incoming transfer', '48 units', 'Central distribution centre') +
    '</div>' +
    '<div class="commerce-layout"><section>' +
    panel(
      'Shelf availability',
      '<div class="retail-toolbar"><p>Selected store · <b data-retail-store>Makati</b></p><span class="pill">6 tracked products</span></div><div class="retail-products">' +
        products
          .map(
            ([id, name, sku, price, stock, target]) =>
              '<article class="retail-product"><img src="/demos/media/retail/' +
              id +
              '.webp" alt="' +
              name +
              '" width="400" height="300"><div><small>' +
              sku +
              '</small><h3>' +
              name +
              '</h3><b>' +
              price +
              '</b><p><span data-retail-stock="' +
              stock +
              '">' +
              stock +
              '</span> on hand · Target ' +
              target +
              '</p><span class="pill ' +
              (stock < target ? 'amber' : 'green') +
              '">' +
              (stock < target ? 'Replenish soon' : 'In stock') +
              '</span></div></article>',
          )
          .join('') +
        '</div>',
      'Illustrative hardware assortment',
    ) +
    '</section><aside class="commerce-aside">' +
    panel(
      'Branch replenishment',
      '<p class="commerce-muted">Draft a transfer for the products below their store target. Stock only changes after receipt.</p><div class="commerce-transfer"><span>Central DC</span><b>→</b><span data-retail-destination>Makati</span></div><ul class="commerce-list" data-retail-suggestions><li>Drill <b>8 units</b></li><li>Safety helmet <b>8 units</b></li><li>Interior paint <b>12 units</b></li></ul><button class="primary" data-retail-transfer>Create transfer draft</button><p class="commerce-status" data-retail-transfer-status role="status">28 units suggested · Awaiting store review</p>',
    ) +
    panel(
      'Click & collect',
      '<div class="collection-order"><span class="pill">SO-2026-0814</span><h3>Maria Santos</h3><p>2 × extension cable · 1 × work gloves</p><p><span data-retail-pickup>Makati</span> · Pickup 14:00–16:00</p></div><button class="secondary" data-retail-collect>Mark ready for collection</button><p class="commerce-status" data-retail-collect-status role="status">Payment recorded · Store picking pending</p>',
    ) +
    '</aside></div>';
  const zones = [
    'A · Fast movers',
    'B · General stock',
    'C · Bulk storage',
    'D · Quality hold',
  ];
  const map =
    '<svg viewBox="0 0 680 195" role="img" aria-labelledby="warehouse-map-title"><title id="warehouse-map-title">Warehouse zones with receiving and dispatch lanes</title><rect x="8" y="10" width="84" height="172" rx="8" class="warehouse-dock"/><text x="50" y="88" text-anchor="middle">INBOUND</text><text x="50" y="109" text-anchor="middle">Docks 01–04</text>' +
    zones
      .map(
        (z, i) =>
          '<g class="warehouse-zone" data-zone="' +
          i +
          '"><rect x="' +
          (112 + i * 122) +
          '" y="10" width="108" height="128" rx="8"/><text x="' +
          (166 + i * 122) +
          '" y="34" text-anchor="middle">' +
          z.split(' · ')[0] +
          '</text>' +
          [0, 1, 2]
            .map(
              (r) =>
                '<path d="M' + (127 + i * 122) + ' ' + (54 + r * 26) + 'h78"/>',
            )
            .join('') +
          '<text x="' +
          (166 + i * 122) +
          '" y="159" text-anchor="middle">' +
          z.split(' · ')[1] +
          '</text></g>',
      )
      .join('') +
    '<path d="M112 181h476" class="warehouse-route"/><text x="352" y="191" text-anchor="middle">Consolidation → packing → outbound docks</text><rect x="610" y="10" width="62" height="172" rx="8" class="warehouse-dock"/><text x="641" y="88" text-anchor="middle">OUT</text><text x="641" y="109" text-anchor="middle">05–08</text></svg>';
  const warehouse =
    head(
      'DISTRIBUTION / SAMPLE CONTROL TOWER',
      'From dock to doorstep.',
      'Central distribution centre · Sample day shift · 08:00–17:00',
      pill('Illustrative workload'),
    ) +
    '<div class="metrics">' +
    metric('Orders in sample wave', '1,248', 'Retail + ecommerce allocation') +
    metric('Active SKUs', '8,640', 'Across four storage zones') +
    metric('Inbound appointments', '24', 'Scheduled across four docks') +
    metric('Quality hold', '12 cartons', 'Excluded from release') +
    '</div>' +
    '<div class="warehouse-stage-nav" role="group" aria-label="Fulfilment stage">' +
    ['Receive', 'Release wave', 'Pick & pack', 'Dispatch']
      .map(
        (x, i) =>
          '<button data-warehouse-stage="' +
          i +
          '" aria-pressed="' +
          !i +
          '"><small>0' +
          (i + 1) +
          '</small><span>' +
          x +
          '</span></button>',
      )
      .join('') +
    '</div><div class="commerce-layout warehouse-layout"><section>' +
    panel('Warehouse floor & flow', map, 'Not to scale · Sample layout') +
    panel(
      'Wave W-1026-048 · order allocation',
      '<div class="commerce-table" tabindex="0" role="region" aria-label="Wave order allocation"><table><thead><tr><th scope="col">Destination</th><th scope="col">Orders</th><th scope="col">Pick zone</th><th scope="col">Handoff</th></tr></thead><tbody><tr><td>Makati stores</td><td>416</td><td>A / B</td><td data-wave-row>Awaiting release</td></tr><tr><td>Cebu distribution</td><td>352</td><td>B / C</td><td data-wave-row>Awaiting release</td></tr><tr><td>Ecommerce parcels</td><td>480</td><td>A / C</td><td data-wave-row>Awaiting release</td></tr></tbody></table></div>',
      'Carrier cutoff · 16:30',
    ) +
    '</section><aside class="commerce-aside">' +
    panel(
      'Operator workspace',
      '<span class="pill" data-warehouse-pill>01 / Receiving</span><h3 class="warehouse-task" data-warehouse-title>Verify the inbound shipment</h3><p class="commerce-muted" data-warehouse-detail>Match the advance shipping notice, scan pallet labels and separate damaged cartons before putaway.</p><ol class="warehouse-checks" data-warehouse-checks><li>ASN-2026-086 matched</li><li>96 pallets counted</li><li>12 cartons on quality hold</li></ol><button class="primary" data-warehouse-action>Confirm receipt checks</button><p class="commerce-status" role="status" data-warehouse-status>Waiting for operator review · Sample data only</p>',
    ) +
    panel(
      'Quality & traceability',
      '<div class="warehouse-exception"><span class="pill amber">QA-0012 · Held</span><h3>Damaged outer cartons</h3><p>12 cartons · Zone D</p><small>Requires a quality decision; excluded from pickable stock throughout this preview.</small></div><div class="warehouse-audit"><span>Latest handoff</span><b data-warehouse-audit>Receiving review pending</b><small>No carrier or inventory service connected</small></div>',
    ) +
    '</aside></div>';
  return { retail, warehouse };
}
