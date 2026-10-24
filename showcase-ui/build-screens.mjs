import { applyFeatured } from './featured-screens.mjs';
import fs from 'node:fs';
import path from 'node:path';
const root = 'showcase-ui',
  screens = {};
const names = [
  'Maria Santos',
  'Paolo Reyes',
  'Angela Cruz',
  'Miguel Dela Rosa',
  'Isabel Garcia',
  'Carlo Mendoza',
  'Bea Navarro',
  'Luis Ramos',
];
const firms = [
  'Amihan Home Supply',
  'Sinag Market Co.',
  'Dalisay Trading',
  'Hiraya Works',
  'Alon Retail Group',
  'Luntian Goods',
  'Bituin Distribution',
  'Siklab Services',
];
const cities = [
  'Quezon City',
  'Makati',
  'Cebu City',
  'Pasig',
  'Davao City',
  'Iloilo City',
  'Taguig',
  'Bacolod',
];
const money = (n) =>
  '₱' +
  n.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
const badge = (s, c = '') => `<span class="badge ${c}">${s}</span>`;
const btn = (s, p = false) =>
  `<button class="btn ${p ? 'primary' : ''}">${s}</button>`;
const panel = (t, b, s = 'View report →') =>
  `<section class="panel"><div class="panel-head"><h2>${t}</h2><small>${s}</small></div>${b}</section>`;
const stats = (items) =>
  `<div class="stats">${items.map(([l, v, n]) => `<div class="kpi"><p>${l}</p><strong>${v}</strong><small>${n || '↑ 8.4%'} <span>vs. previous period</span></small></div>`).join('')}</div>`;
const table = (heads, rows, foot = 'Showing 1–8 of 48 records') =>
  `<table><thead><tr>${heads.map((x) => `<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((v) => `<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table><div class="foot"><span>${foot}</span><span>‹ &nbsp; 1 &nbsp; 2 &nbsp; 3 &nbsp; … &nbsp; 6 &nbsp; ›</span></div>`;
const filters = (s = 'Search records…') =>
  `<div class="filters"><span class="filter grow">⌕ &nbsp; ${s}</span><span class="filter">All statuses ⌄</span><span class="filter">October 2026 ⌄</span><span class="filter">☷ Filters</span></div>`;
const tabs = (items) =>
  `<div class="tabs">${items.map((x, i) => `<span class="tab ${i === 0 ? 'active' : ''}">${x}</span>`).join('')}</div>`;
const list = (items) =>
  `<div class="pad">${items.map(([a, b], i) => `<div class="row"><div>${a}<small>${cities[i % 8]}</small></div><strong>${b}</strong></div>`).join('')}</div>`;
const details = (items) =>
  items
    .map(([a, b]) => `<div class="detail"><span>${a}</span><b>${b}</b></div>`)
    .join('');
const rows = (kind = 'SO') =>
  firms.map((f, i) => [
    `<b>${kind}-2026-${1048 - i}</b>`,
    `${f}<small>${cities[i]}</small>`,
    names[i],
    `Oct ${20 - i}, 2026`,
    money([84500, 56750, 123600, 38900, 67200, 45950, 98000, 27500][i]),
    badge(
      ['Confirmed', 'Awaiting approval', 'Processing', 'Completed'][i % 4],
      ['blue', 'amber', 'blue', ''][i % 4],
    ),
  ]);
function chart(bar = false) {
  return `<div class="pad"><svg class="chart" viewBox="0 0 700 250"><defs><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop stop-color="var(--accent)" stop-opacity=".2"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>${[30, 75, 120, 165, 210].map((y, i) => `<line x1="48" y1="${y}" x2="680" y2="${y}" stroke="#edf1f6"/><text x="6" y="${y + 4}" font-size="10" fill="#99a5b4">${(4 - i) * 100}k</text>`).join('')}${bar ? [90, 135, 110, 155, 172, 195].map((h, i) => `<rect x="${65 + i * 112}" y="${220 - h}" width="27" height="${h}" rx="4" fill="var(--accent)"/><rect x="${96 + i * 112}" y="${240 - h}" width="27" height="${h - 20}" rx="4" fill="#dfe8fa"/>`).join('') : `<path d="M60 190 C110 190 130 130 180 145 S270 75 310 112 S400 150 445 80 S530 110 570 58 S640 70 675 30 L675 220 L60 220Z" fill="url(#fade)"/><path d="M60 190 C110 190 130 130 180 145 S270 75 310 112 S400 150 445 80 S530 110 570 58 S640 70 675 30" fill="none" stroke="var(--accent)" stroke-width="3"/>`}${['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((m, i) => `<text x="${70 + i * 114}" y="240" fill="#95a1b1" font-size="10">${m}</text>`).join('')}</svg><div class="legend">● Current period &nbsp; ○ Previous period</div></div>`;
}
const dashboard = (ops = false) =>
  stats(
    ops
      ? [
          ['Orders today', '286'],
          ['Units processed', '4,820'],
          ['Accuracy', '99.4%', '↑ 0.3 pts'],
          ['Exceptions', '6', '↓ 4 today'],
        ]
      : [
          ['Total revenue', '₱2,486,500'],
          ['Net profit', '₱684,200'],
          ['Open orders', '148'],
          ['Receivables', '₱428,900', '↓ 6.2%'],
        ],
  ) +
  `<div class="grid">${panel(ops ? 'Order throughput' : 'Revenue overview', chart(ops), 'Monthly ⌄')}${panel('Branch performance', list(cities.slice(0, 4).map((c, i) => [c, money(642500 - i * 85000)])))}</div>` +
  panel(
    'Recent activity',
    table(
      ['REFERENCE', 'CUSTOMER', 'OWNER', 'DATE', 'AMOUNT', 'STATUS'],
      rows().slice(0, 3),
      'Latest 3 transactions',
    ),
  );
const stock = () =>
  [
    'Arabica coffee beans · 1kg',
    'Kraft takeaway cup · 12oz',
    'Thermal receipt roll',
    'Stainless tumbler · 500ml',
    'Recycled paper bag · M',
    'Canvas tote bag',
    'Storage bin · 25L',
    'LED desk lamp',
  ].map((n, i) => [
    `SKU-${4100 + i}`,
    `${n}<small>${['Beverages', 'Packaging', 'Supplies', 'Home'][i % 4]}</small>`,
    cities[i],
    `${[248, 42, 18, 680, 1250, 320, 84, 56][i]} units`,
    money([420, 4.5, 32, 285, 8, 95, 180, 450][i]),
    badge(
      i === 1 || i === 2 ? 'Reorder soon' : 'In stock',
      i === 1 || i === 2 ? 'amber' : '',
    ),
  ]);
const calendar = (leave = false) =>
  `<div class="calendar">${['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => `<div class="day head">${d}</div>`).join('')}${Array.from({ length: 35 }, (_, i) => `<div class="day">${i < 3 ? '' : i - 2 <= 31 ? i - 2 : ''}${[5, 8, 9, 12, 15, 18, 20, 22, 25, 29].includes(i) ? `<div class="appt">${leave ? names[i % 8].split(' ')[0] + ' · Annual leave' : ['09:00 · Consultation', '10:30 · Site visit', '14:00 · Demo session'][i % 3]}</div>` : ''}</div>`).join('')}</div>`;
const add = (key, title, sub, body, opts = {}) =>
  (screens[key] = { title, sub, body, ...opts });
add(
  'erp/dashboard',
  'Company overview',
  'A clear view of your business, across every branch.',
  dashboard(),
);
add(
  'erp/sales-orders',
  'Sales orders',
  'Manage customer orders from confirmation to fulfilment.',
  panel(
    'All sales orders',
    tabs(['All orders 148', 'Draft 12', 'To fulfil 36', 'Completed 100']) +
      filters('Search order number or customer…') +
      table(['ORDER', 'CUSTOMER', 'OWNER', 'DATE', 'TOTAL', 'STATUS'], rows()),
  ),
  { action: '＋ Create order' },
);
add(
  'erp/purchase-order',
  'Purchase order PO-2026-0086',
  'Purchasing / Purchase orders / PO-2026-0086',
  `<div class="grid">${panel(
    'Order details',
    `<div class="pad grid equal"><div><p>SUPPLIER</p><h3>Amihan Home Supply</h3><p>Quezon City, Metro Manila</p></div><div><p>DELIVERY</p><h3>Pasig warehouse</h3><p>Expected October 24, 2026</p></div></div>${table(
      ['ITEM', 'QUANTITY', 'UNIT PRICE', 'AMOUNT'],
      [
        ['Arabica coffee beans', '100 kg', '₱420.00', '₱42,000.00'],
        ['Kraft takeaway cups', '2,000 pcs', '₱4.50', '₱9,000.00'],
        ['Thermal receipt roll', '200 rolls', '₱32.00', '₱6,400.00'],
      ],
      '3 line items',
    )}<div class="pad"><p>Deliver during receiving hours: 08:00–17:00.</p></div>`,
  )}${panel(
    'Summary',
    `<div class="pad">${badge('Awaiting approval', 'amber')}<div style="margin-top:25px">${details(
      [
        ['Subtotal', '₱57,400.00'],
        ['VAT (12%)', '₱6,888.00'],
        ['Order total', '₱64,288.00'],
      ],
    )}</div><div class="dashed"></div><p>Prepared by</p><h3>Maria Santos</h3><p>Approval routed to Finance Manager</p></div>`,
  )}</div>`,
  { action: 'Approve purchase order' },
);
add(
  'erp/inventory-valuation',
  'Inventory valuation',
  'Stock value by item and location · October 20, 2026',
  stats([
    ['Inventory value', '₱3,824,680'],
    ['Active SKUs', '1,284'],
    ['Locations', '6'],
    ['Slow-moving value', '₱184,200'],
  ]) +
    panel(
      'Valuation detail',
      filters('Find SKU or location…') +
        table(
          ['SKU', 'ITEM', 'LOCATION', 'ON HAND', 'UNIT COST', 'STATUS'],
          stock().slice(0, 6),
        ),
    ),
);
add(
  'erp/general-ledger',
  'General ledger',
  'Posted journal entries · Fiscal year 2026',
  panel(
    'Transactions',
    filters('Search account or reference…') +
      table(
        ['DATE', 'JOURNAL', 'ACCOUNT', 'DESCRIPTION', 'DEBIT', 'CREDIT'],
        [
          [
            'Oct 20',
            'JE-00428',
            '1100 · Receivables',
            'Invoice SI-0482',
            '₱84,500.00',
            '—',
          ],
          [
            'Oct 20',
            'JE-00428',
            '4100 · Sales',
            'Invoice SI-0482',
            '—',
            '₱84,500.00',
          ],
          [
            'Oct 19',
            'JE-00427',
            '5100 · Cost of goods',
            'October stock issue',
            '₱32,800.00',
            '—',
          ],
          [
            'Oct 19',
            'JE-00427',
            '1200 · Inventory',
            'October stock issue',
            '—',
            '₱32,800.00',
          ],
          [
            'Oct 19',
            'JE-00426',
            '1000 · Cash in bank',
            'Customer settlement',
            '₱56,750.00',
            '—',
          ],
          [
            'Oct 19',
            'JE-00426',
            '1100 · Receivables',
            'Customer settlement',
            '—',
            '₱56,750.00',
          ],
        ],
        'Balanced · Debits ₱174,050.00 · Credits ₱174,050.00',
      ),
  ),
  { action: '＋ Journal entry' },
);
add(
  'erp/approvals',
  'Approvals inbox',
  'Review requests that need your decision.',
  stats([
    ['Pending review', '12'],
    ['Approved today', '8'],
    ['Total value', '₱428,650'],
    ['Turnaround', '3.2 hrs'],
  ]) +
    panel(
      'Needs your approval',
      table(
        [
          'REQUEST',
          'SUBMITTED BY',
          'DEPARTMENT',
          'AMOUNT',
          'SUBMITTED',
          'ACTION',
        ],
        names
          .slice(0, 6)
          .map((n, i) => [
            `${['Purchase order', 'Expense claim', 'Payment request'][i % 3]}<small>REQ-${320 + i}</small>`,
            n,
            ['Operations', 'Finance', 'Sales'][i % 3],
            money(12400 + i * 7300),
            `${i + 1} hours ago`,
            btn('Review →'),
          ]),
      ),
    ),
);
const cart = [
  ['Iced latte', '2 × ₱145.00', '₱290.00'],
  ['Butter croissant', '1 × ₱95.00', '₱95.00'],
  ['Cold brew', '1 × ₱130.00', '₱130.00'],
];
add(
  'pos/checkout',
  'Register 01',
  'Makati · Shift open since 07:00 · Maria Santos',
  `<div class="grid">${panel('Product catalogue', tabs(['All products', 'Coffee', 'Pastries', 'Merchandise']) + filters('Search product or scan barcode…') + `<div class="pad products">${['Iced latte', 'Americano', 'Cold brew', 'Butter croissant', 'Cinnamon roll', 'Matcha latte', 'Bottled water', 'Canvas tote', 'Coffee beans'].map((x, i) => `<div class="product"><div class="art">${['☕', '☕', '◒', '◔', '◉', '☕', '♧', '▱', '▣'][i]}</div><h3>${x}</h3><p>${28 + i * 3} available</p><strong>${money([145, 110, 130, 95, 105, 165, 45, 195, 420][i])}</strong></div>`).join('')}</div>`)}${panel(
    'Current sale · #00482',
    `<div class="pad">${badge('Dine in', 'blue')}<div class="row">Walk-in customer ${btn('＋ Customer')}</div>${cart.map(([n, q, p]) => `<div class="row"><div><h3>${n}</h3><p>${q}</p></div><b>${p}</b></div>`).join('')}<div class="dashed"></div>${details(
      [
        ['Subtotal', '₱515.00'],
        ['Discount', '₱0.00'],
        ['Total due', '₱515.00'],
      ],
    )}<p>Prices include applicable tax.</p><div style="margin-top:25px">${btn('Charge ₱515.00 →', true)}</div><div class="row">${btn('Hold sale')}${btn('Add note')}</div></div>`,
  )}</div>`,
  { action: 'Close shift' },
);
add(
  'pos/receipt',
  'Receipt preview',
  'Sale #00482 · Completed October 20, 2026 at 10:42',
  `<div class="grid equal"><div class="receipt"><h2>TINDAHAN SAMPLE STORE</h2><p class="center">Makati, Metro Manila<br>DEMONSTRATION RECEIPT<br>Not valid for tax purposes</p><div class="dashed"></div>${details(
    [
      ['Receipt', 'DEMO-00482'],
      ['Cashier', 'Maria Santos'],
      ['Register', '01'],
    ],
  )}<div class="dashed"></div>${cart.map(([n, q, p]) => `<div class="row"><div>${n}<small>${q}</small></div>${p}</div>`).join('')}<div class="dashed"></div>${details(
    [
      ['TOTAL', '₱515.00'],
      ['Cash tendered', '₱1,000.00'],
      ['Change', '₱485.00'],
    ],
  )}<div class="barcode"></div><p class="center">Thank you. See you again!</p></div>${panel(
    'Payment complete',
    `<div class="pad">${badge('Paid in cash')}<h1 style="margin:25px 0">₱515.00</h1><p>Receipt ready for printing.</p><div class="dashed"></div>${details(
      [
        ['Customer', 'Walk-in'],
        ['Items', '4'],
        ['Payment method', 'Cash'],
        ['Branch', 'Makati'],
      ],
    )}${btn('Print receipt', true)} ${btn('New sale')}</div>`,
  )}</div>`,
  { action: 'Download receipt' },
);
add(
  'pos/shift-summary',
  'Shift summary',
  'Register 01 · Makati · October 20, 2026',
  stats([
    ['Gross sales', '₱32,450'],
    ['Transactions', '86'],
    ['Average sale', '₱377.33'],
    ['Cash variance', '₱0.00', 'Balanced'],
  ]) +
    `<div class="grid">${panel('Sales by hour', chart(true))}${panel(
      'Cash reconciliation',
      `<div class="pad">${details([
        ['Opening float', '₱2,000.00'],
        ['Cash sales', '₱18,250.00'],
        ['Cash refunds', '−₱450.00'],
        ['Expected cash', '₱19,800.00'],
        ['Counted cash', '₱19,800.00'],
        ['Variance', '₱0.00'],
      ])}${badge('Ready to close')}</div>`,
    )}</div>` +
    panel(
      'Payment breakdown',
      table(
        ['METHOD', 'TRANSACTIONS', 'GROSS SALES'],
        [
          ['Cash', '49', '₱18,250.00'],
          ['Card', '25', '₱9,850.00'],
          ['QR payment', '12', '₱4,350.00'],
        ],
        '86 transactions · ₱32,450.00',
      ),
    ),
);
add(
  'pos/branch-sales',
  'Branch sales',
  'Compare sales performance across your stores.',
  stats([
    ['Total sales', '₱184,600'],
    ['Transactions', '482'],
    ['Active branches', '4'],
    ['Top branch', 'Makati', 'Leading today'],
  ]) +
    panel('Branch comparison', chart(true)) +
    panel(
      'Store performance',
      table(
        ['BRANCH', 'SALES', 'TRANSACTIONS', 'AVERAGE BASKET', 'STATUS'],
        [
          ['Makati', '₱64,200', '168', '₱382.14', badge('Open')],
          ['Quezon City', '₱48,900', '128', '₱382.03', badge('Open')],
          ['Pasig', '₱39,800', '104', '₱382.69', badge('Open')],
          ['Taguig', '₱31,700', '82', '₱386.59', badge('Open')],
        ],
        '4 branches',
      ),
    ),
);
add(
  'crm/pipeline',
  'Sales pipeline',
  'Keep every opportunity moving forward.',
  stats([
    ['Open pipeline', '₱4,860,000'],
    ['Open deals', '32'],
    ['Win rate', '38%'],
    ['Closing this month', '₱845,000'],
  ]) +
    `<div class="kanban">${['New lead', 'Qualified', 'Proposal', 'Negotiation'].map((s, i) => `<div class="lane"><h3>${s} <span style="float:right">${[8, 10, 9, 5][i]}</span></h3>${[0, 1].map((j) => `<article class="deal">${badge(['Retail', 'Distribution', 'Services', 'Manufacturing'][i], 'blue')}<h3>${firms[i + j * 4]}</h3><p>${['Branch rollout', 'Operations platform', 'Team workspace', 'Inventory upgrade'][i]}</p><strong>${money(95000 + i * 45000 + j * 18000)}</strong><footer><span>${names[i + j].split(' ')[0]}</span><span>Oct ${23 + i + j}</span></footer></article>`).join('')}<p>＋ Add opportunity</p></div>`).join('')}</div>`,
  { action: '＋ Add deal' },
);
add(
  'crm/contact',
  'Maria Santos',
  'Contacts / Amihan Home Supply / Maria Santos',
  `<div class="grid">${panel(
    'Activity timeline',
    tabs(['Timeline', 'Notes', 'Emails', 'Files']) +
      `<div class="timeline">${[
        [
          'Today · 10:30',
          'Discovery call completed',
          'Confirmed three branches and a November rollout.',
        ],
        [
          'Yesterday · 14:15',
          'Proposal shared',
          'Quotation QT-2026-0084 sent for review.',
        ],
        [
          'Oct 17 · 09:20',
          'Site visit scheduled',
          'Makati office · October 24, 10:00 AM.',
        ],
        ['Oct 15 · 16:40', 'Contact created', 'Assigned to Paolo Reyes.'],
      ]
        .map(
          ([d, t, s]) =>
            `<div class="event"><small>${d}</small><h3>${t}</h3><p>${s}</p></div>`,
        )
        .join('')}</div>`,
  )}${panel(
    'Contact details',
    `<div class="pad"><div class="profile"><div class="avatar">MS</div><div><h3>Maria Santos</h3><p>Operations Manager</p></div></div>${details(
      [
        ['Company', 'Amihan Home Supply'],
        ['City', 'Quezon City'],
        ['Email', 'maria@amihan.example'],
        ['Owner', 'Paolo Reyes'],
        ['Lifecycle', 'Active opportunity'],
      ],
    )}<div class="dashed"></div><h3>Linked opportunity</h3><p>Branch rollout · Proposal stage</p><h1 style="margin-top:20px">₱185,000</h1></div>`,
  )}</div>`,
  { action: '＋ Log activity' },
);
add(
  'crm/quotes',
  'Quotes',
  'Create, send and track customer proposals.',
  stats([
    ['Draft', '12'],
    ['Sent', '24'],
    ['Accepted', '18'],
    ['Accepted value', '₱1,285,000'],
  ]) +
    panel(
      'All quotations',
      filters('Search quote or company…') +
        table(
          ['QUOTE', 'COMPANY', 'OWNER', 'ISSUED', 'VALUE', 'STATUS'],
          rows('QT').slice(0, 6),
        ),
    ),
  { action: '＋ New quote' },
);
add(
  'crm/dashboard',
  'Sales overview',
  'Your team performance and forecast for October.',
  stats([
    ['Revenue won', '₱1,285,000'],
    ['Deals won', '18'],
    ['Conversion', '38%'],
    ['Average cycle', '24 days', '↓ 3 days'],
  ]) +
    `<div class="grid">${panel('Revenue trend', chart())}${panel('Team leaderboard', list(names.slice(0, 4).map((n, i) => [n, money(425000 - i * 65000)])))}</div>` +
    panel(
      'Upcoming follow-ups',
      table(
        ['CONTACT', 'COMPANY', 'ACTIVITY', 'DUE', 'OWNER'],
        names
          .slice(0, 3)
          .map((n, i) => [
            n,
            firms[i],
            'Proposal follow-up',
            `Today · ${11 + i}:00`,
            names[i + 3],
          ]),
        '3 tasks due today',
      ),
    ),
);
add(
  'wms/dashboard',
  'Warehouse overview',
  'Pasig distribution centre · Operations live',
  stats([
    ['Inbound shipments', '24'],
    ['Orders to pick', '86'],
    ['Space utilisation', '78%'],
    ['Picking accuracy', '99.6%', '↑ 0.2 pts'],
  ]) +
    `<div class="grid">${panel('Daily throughput', chart(true))}${panel(
      'Work queue',
      list([
        ['Awaiting receiving', '12 ASNs'],
        ['Ready to pick', '86 orders'],
        ['Packing', '24 orders'],
        ['Ready to dispatch', '18 loads'],
      ]),
    )}</div>` +
    panel(
      'Dock activity',
      table(
        ['DOCK', 'REFERENCE', 'CARRIER', 'ARRIVAL', 'STATUS'],
        [
          [
            'Dock 01',
            'ASN-0084',
            'Amihan Freight',
            '09:30',
            badge('Unloading', 'blue'),
          ],
          [
            'Dock 02',
            'ASN-0085',
            'Bituin Logistics',
            '10:00',
            badge('Checked in'),
          ],
          [
            'Dock 03',
            'OUT-0246',
            'Alon Transport',
            '10:15',
            badge('Loading', 'amber'),
          ],
        ],
        '3 of 6 docks occupied',
      ),
    ),
);
add(
  'wms/receiving',
  'Receive shipment',
  'ASN-2026-0084 · Amihan Home Supply · Dock 01',
  stats([
    ['Expected units', '640'],
    ['Received units', '480'],
    ['Variance', '0'],
    ['Completion', '75%'],
  ]) +
    panel(
      'Receiving checklist',
      filters('Scan item barcode…') +
        table(
          ['SKU', 'DESCRIPTION', 'EXPECTED', 'RECEIVED', 'BIN', 'STATUS'],
          [
            [
              'SKU-4100',
              'Arabica coffee beans · 1kg',
              '200',
              '200',
              'A-01-02',
              badge('Complete'),
            ],
            [
              'SKU-4101',
              'Kraft takeaway cup · 12oz',
              '240',
              '240',
              'A-02-01',
              badge('Complete'),
            ],
            [
              'SKU-4102',
              'Thermal receipt roll',
              '100',
              '40',
              'B-01-03',
              badge('In progress', 'blue'),
            ],
            [
              'SKU-4103',
              'Stainless tumbler · 500ml',
              '100',
              '0',
              'B-03-02',
              badge('Pending', 'amber'),
            ],
          ],
          '480 of 640 units received',
        ),
    ) +
    panel(
      'Shipment details',
      `<div class="pad grid equal">${details([
        ['Supplier reference', 'PO-2026-0086'],
        ['Assigned receiver', 'Miguel Dela Rosa'],
        ['Expected arrival', 'October 20 · 09:30'],
        ['Warehouse', 'Pasig DC'],
      ])}</div>`,
    ),
  { action: 'Complete receiving' },
);
add(
  'wms/pick-list',
  'Pick list #0248',
  'Pasig DC · Zone A',
  `<div class="panel"><div class="pad"><div class="detail"><b>Order SO-1048</b>${badge('In progress', 'blue')}</div><p>2 of 5 items picked</p><div class="progress"><i style="width:40%"></i></div></div></div><div class="panel"><div class="pad"><p>NEXT LOCATION</p><h1 style="font-size:38px;margin:10px 0">A-03-02</h1><p>Aisle A · Bay 03 · Level 02</p><div class="dashed"></div><h2>Thermal receipt roll</h2><p style="margin-top:8px">SKU-4102 · 80 × 80 mm</p><div class="row"><span>Quantity to pick</span><h1>12</h1></div><div class="filter">⌕ Scan item barcode</div><button class="btn primary" style="width:100%;margin-top:16px">Confirm 12 units picked</button></div></div><div class="panel"><div class="pad"><h3>Up next · B-01-01</h3><p>Canvas tote · 6 units &nbsp; / &nbsp; 1 more item</p></div></div>`,
  { mobile: true },
);
add(
  'wms/bin-map',
  'Location map',
  'Pasig distribution centre · Aisle A–F',
  stats([
    ['Total bins', '240'],
    ['Occupied', '187'],
    ['Available', '42'],
    ['Reserved', '11'],
  ]) +
    panel(
      'Zone A · Fast moving',
      tabs(['Zone A', 'Zone B', 'Zone C', 'Cold storage']) +
        `<div class="pad"><div class="legend" style="margin-bottom:20px">● Occupied &nbsp; ◌ Available &nbsp; ● Reserved</div><div class="bins">${Array.from({ length: 60 }, (_, i) => `<div class="bin ${i % 7 === 0 ? 'empty' : i % 11 === 0 ? 'busy' : ''}">${String.fromCharCode(65 + Math.floor(i / 10))}-${String((i % 10) + 1).padStart(2, '0')}<br>${i % 7 === 0 ? 'Available' : i % 11 === 0 ? 'Reserved' : `${35 + (i % 45)}% full`}</div>`).join('')}</div></div>`,
      '60 locations',
    ),
);
add(
  'wms/stock-transfer',
  'Stock transfer TR-0036',
  'Move stock between warehouses with a complete audit trail.',
  `<div class="grid equal">${panel('From', `<div class="pad"><h2>Pasig distribution centre</h2><p>Zone A · Ready to dispatch</p></div>`)}${panel('To', `<div class="pad"><h2>Cebu City warehouse</h2><p>Expected arrival · October 23, 2026</p></div>`)}</div>` +
    panel(
      'Transfer items',
      table(
        [
          'SKU',
          'DESCRIPTION',
          'SOURCE BIN',
          'TRANSFER QTY',
          'AVAILABLE',
          'STATUS',
        ],
        stock()
          .slice(0, 5)
          .map((r, i) => [
            r[0],
            r[1],
            `A-0${i + 1}-01`,
            [24, 12, 6, 48, 30][i],
            r[3],
            badge('Allocated'),
          ]),
        '5 items · 120 units',
      ),
    ) +
    panel(
      'Transfer activity',
      `<div class="pad">${details([
        ['Created by', 'Miguel Dela Rosa · Oct 20, 08:45'],
        ['Approved by', 'Angela Cruz · Oct 20, 09:10'],
        ['Shipment reference', 'Pending dispatch'],
      ])}</div>`,
    ),
  { action: 'Dispatch transfer' },
);
add(
  'inventory/stock-list',
  'Stock overview',
  'Know what is available, reserved and ready to reorder.',
  stats([
    ['Active items', '1,284'],
    ['Low stock', '18', 'Needs attention'],
    ['Out of stock', '4', 'Needs attention'],
    ['Stock value', '₱3,824,680'],
  ]) +
    panel(
      'All items',
      tabs(['All items', 'Low stock 18', 'Out of stock 4', 'Archived']) +
        filters('Search item or SKU…') +
        table(
          ['SKU', 'ITEM', 'LOCATION', 'ON HAND', 'UNIT COST', 'STATUS'],
          stock().slice(0, 6),
        ),
    ),
  { action: '＋ Add item' },
);
add(
  'inventory/item-detail',
  'Arabica coffee beans · 1kg',
  'Items / Beverages / SKU-4100',
  `<div class="grid">${panel(
    'Stock movement',
    table(
      ['DATE', 'REFERENCE', 'MOVEMENT', 'QUANTITY', 'BALANCE'],
      [
        ['Oct 20', 'GRN-0084', 'Purchase receipt', '+100', '248'],
        ['Oct 19', 'SO-1042', 'Sales issue', '−24', '148'],
        ['Oct 18', 'TR-0031', 'Transfer in', '+60', '172'],
        ['Oct 17', 'SO-1028', 'Sales issue', '−18', '112'],
        ['Oct 16', 'ADJ-0012', 'Count adjustment', '−2', '130'],
      ],
      'Latest 5 movements',
    ),
  )}${panel(
    'Item details',
    `<div class="pad">${badge('Active')}<div class="dashed"></div>${details([
      ['SKU', 'SKU-4100'],
      ['Category', 'Beverages'],
      ['Unit', 'Kilogram'],
      ['Unit cost', '₱420.00'],
      ['Selling price', '₱580.00'],
      ['Reorder level', '100 kg'],
      ['Available', '224 kg'],
      ['Reserved', '24 kg'],
    ])}</div>`,
  )}</div>` + panel('Stock trend', chart()),
  { action: 'Edit item' },
);
add(
  'inventory/stock-count',
  'Stock count SC-0024',
  'Pasig warehouse · Cycle count · October 20, 2026',
  stats([
    ['Items in count', '48'],
    ['Counted', '36'],
    ['With variance', '3'],
    ['Completion', '75%'],
  ]) +
    panel(
      'Count worksheet',
      filters('Find item or scan barcode…') +
        table(
          ['SKU', 'DESCRIPTION', 'SYSTEM QTY', 'COUNTED', 'VARIANCE', 'STATUS'],
          stock()
            .slice(0, 6)
            .map((r, i) => [
              r[0],
              r[1],
              [248, 42, 18, 680, 1250, 320][i],
              [248, 40, 18, 680, 1248, 320][i],
              i === 1 || i === 4 ? '−2' : '0',
              badge(
                i === 1 || i === 4 ? 'Review' : 'Matched',
                i === 1 || i === 4 ? 'amber' : '',
              ),
            ]),
        ),
    ),
  { action: 'Submit count' },
);
add(
  'hr/directory',
  'People directory',
  'The people behind your organisation.',
  stats([
    ['Active employees', '86'],
    ['Departments', '8'],
    ['On leave today', '4'],
    ['New this month', '6'],
  ]) +
    filters('Search name, team or location…') +
    `<div class="people" style="margin-top:18px">${names
      .map(
        (n, i) =>
          `<article class="person"><div class="avatar">${n
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join(
              '',
            )}</div><h3>${n}</h3><p>${['Operations Manager', 'Account Executive', 'Finance Analyst', 'Warehouse Lead', 'HR Specialist', 'Software Engineer', 'Customer Success', 'Procurement Officer'][i]}</p>${badge(['Operations', 'Sales', 'Finance', 'Warehouse', 'People', 'Engineering', 'Support', 'Purchasing'][i], 'blue')}<div class="dashed"></div><p>${cities[i]} · Full-time</p><p>EMP-${String(i + 1).padStart(4, '0')}</p></article>`,
      )
      .join('')}</div>`,
  { action: '＋ Add employee' },
);
const pay = names.slice(0, 6).map((n, i) => {
  const gross = 24000 + i * 3000,
    sss = 1000,
    ph = 600,
    pi = 200,
    tax = 500 + i * 200;
  return [
    n,
    money(gross),
    money(sss),
    money(ph),
    money(pi),
    money(tax),
    money(gross - sss - ph - pi - tax),
  ];
});
add(
  'hr/payroll-run',
  'Payroll run · October',
  'Monthly sample payroll · October 1–31, 2026',
  stats([
    ['Employees', '6'],
    ['Gross pay', '₱189,000'],
    ['Deductions', '₱16,800'],
    ['Net pay', '₱172,200'],
  ]) +
    panel(
      'Payroll breakdown',
      tabs(['Review payroll', 'Approvals', 'Payment file']) +
        table(
          [
            'EMPLOYEE',
            'GROSS',
            'SSS',
            'PHILHEALTH',
            'PAG-IBIG',
            'TAX',
            'NET PAY',
          ],
          pay,
          '6 employees · Illustrative figures, not a statutory payroll calculation',
        ),
    ) +
    panel(
      'Approval workflow',
      `<div class="pad">${details([
        ['Prepared by', 'Isabel Garcia'],
        ['Review status', 'Awaiting Finance approval'],
        ['Scheduled payment', 'October 30, 2026'],
      ])}</div>`,
    ),
  { action: 'Submit for approval' },
);
add(
  'hr/leave-calendar',
  'Leave calendar',
  'Plan coverage and keep your team in sync.',
  stats([
    ['On leave today', '4'],
    ['Pending requests', '7'],
    ['Approved this month', '24'],
    ['Available today', '82'],
  ]) + panel('October 2026', calendar(true), '‹   Today   ›'),
  { action: '＋ Leave request' },
);
add(
  'software/portal',
  'Welcome back, Maria',
  'Your projects, requests and documents in one place.',
  stats([
    ['Active projects', '3'],
    ['Open requests', '5'],
    ['Awaiting approval', '2'],
    ['Next milestone', 'Oct 28', 'On schedule'],
  ]) +
    `<div class="grid">${panel(
      'Your projects',
      `<div class="pad">${[
        ['Branch workspace rollout', 72, 'User acceptance testing'],
        ['Customer portal', 48, 'Development'],
        ['Reporting dashboard', 90, 'Final review'],
      ]
        .map(
          ([n, p, s]) =>
            `<div class="row" style="display:block"><div class="detail"><b>${n}</b>${badge(s, 'blue')}</div><p>${p}% complete</p><div class="progress"><i style="width:${p}%"></i></div></div>`,
        )
        .join('')}</div>`,
    )}${panel(
      'Your account',
      `<div class="pad"><h2>Amihan Home Supply</h2><p style="margin:12px 0 24px">Workspace administrator</p>${details(
        [
          ['Account manager', 'Paolo Reyes'],
          ['Next check-in', 'Oct 24 · 10:00'],
          ['Outstanding balance', '₱24,500.00'],
        ],
      )}${btn('View invoices')}</div>`,
    )}</div>` +
    panel(
      'Recent requests',
      table(
        ['REQUEST', 'SUBJECT', 'UPDATED', 'STATUS'],
        [
          [
            'REQ-0142',
            'Add Cebu branch users',
            'Today · 09:45',
            badge('In progress', 'blue'),
          ],
          [
            'REQ-0138',
            'Export monthly summary',
            'Yesterday',
            badge('Resolved'),
          ],
          ['REQ-0135', 'Update billing contact', 'Oct 18', badge('Resolved')],
        ],
        '3 recent requests',
      ),
    ),
  { action: '＋ New request' },
);
add(
  'software/booking',
  'Bookings',
  'Manage appointments and team availability.',
  stats([
    ['Today’s bookings', '12'],
    ['Confirmed', '10'],
    ['Awaiting confirmation', '2'],
    ['Available slots', '8'],
  ]) + panel('October 2026', calendar(), '‹   Month ⌄   ›'),
  { action: '＋ New booking' },
);
add(
  'software/mobile-1',
  'Good morning, Maria',
  'Luntian Workspace',
  `<div class="stats"><div class="kpi"><p>Open tasks</p><strong>12</strong><small>4 due today</small></div><div class="kpi"><p>Completed</p><strong>28</strong><small>This month</small></div></div>${panel('Today’s schedule', `<div class="pad"><p>10:00–10:30 · Online meeting</p><h2 style="margin:10px 0">Branch rollout review</h2><p>With Paolo Reyes and Angela Cruz</p><button class="btn primary" style="margin-top:15px;width:100%">View meeting details</button></div>`, 'Oct 20')}${panel(
    'Your tasks',
    `<div class="pad">${[
      ['Review acceptance checklist', 'Due today'],
      ['Approve user access list', 'Due today'],
      ['Upload branch inventory', 'Due tomorrow'],
    ]
      .map(
        ([n, d]) =>
          `<div class="row"><div><h3>◯ &nbsp; ${n}</h3><p>${d}</p></div><span>›</span></div>`,
      )
      .join('')}</div>`,
    'View all',
  )}`,
  { mobile: true },
);
add(
  'software/mobile-2',
  'Book an appointment',
  'Luntian Workspace',
  `<div class="panel"><div class="pad"><p>SELECT SERVICE</p><h2 style="margin:12px 0">Project consultation</h2><p>30 minutes · Online meeting</p><div class="dashed"></div><h3>October 2026</h3><div style="display:flex;justify-content:space-between;margin:18px 0">${[21, 22, 23, 24, 25].map((d, i) => `<div style="padding:12px 9px;border-radius:8px;background:${i === 2 ? 'var(--accent)' : '#edf1f6'};color:${i === 2 ? 'white' : 'inherit'}">${['Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}<br><b style="font-size:20px">${d}</b></div>`).join('')}</div><h3>Available times · Asia/Manila</h3><div class="grid equal" style="gap:10px;margin:16px 0">${['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM'].map((t, i) => btn(t, i === 1)).join('')}</div><div class="dashed"></div>${details(
    [
      ['Your specialist', 'Paolo Reyes'],
      ['Location', 'Video call'],
      ['Duration', '30 minutes'],
    ],
  )}<button class="btn primary" style="width:100%">Confirm appointment</button><p class="center" style="margin-top:13px;font-size:10px">Confirmation will appear in your workspace.</p></div></div>`,
  { mobile: true },
);
add(
  'software/mobile-3',
  'Request #0142',
  'Luntian Workspace',
  `${panel(
    'Add Cebu branch users',
    `<div class="pad">${badge('In progress', 'blue')}<p style="margin:15px 0">Please create access for our new Cebu branch team before Friday’s training.</p>${details(
      [
        ['Submitted', 'October 20 · 09:45'],
        ['Assigned to', 'Angela Cruz'],
        ['Priority', 'Normal'],
      ],
    )}</div>`,
    '',
  )}${panel('Updates', `<div class="pad"><h3>Angela Cruz <small>· 10:15</small></h3><p>Thanks, Maria. The access groups are ready. Please confirm the attached user list.</p><div class="filter" style="margin:15px 0">▤ Cebu-user-list.csv · 4 KB</div><div class="dashed"></div><h3>Maria Santos <small>· 10:32</small></h3><p>Confirmed. Please use the standard branch permissions.</p></div>`, '2 replies')}<div class="filter" style="background:white;padding:17px">Write a reply… <span style="float:right">➤</span></div>`,
  { mobile: true },
);
add(
  'automation/flow-builder',
  'Order fulfilment sync',
  'Flows / Commerce to warehouse / Production',
  `<div class="panel"><div class="panel-head"><div>${badge('Active')} <span style="margin-left:15px;font-size:11px">Last published by Carlo Mendoza · 2 hours ago</span></div>${btn('Test flow')}</div><div class="flow"><svg viewBox="0 0 1150 460"><path d="M230 205H290Q310 205 310 205H370M575 205H625Q650 205 650 125H720M650 205V335H720" fill="none" stroke="#aebfd8" stroke-width="2"/><circle cx="650" cy="205" r="5" fill="#5b69db"/></svg>${[
    [
      'Webhook received',
      'Order confirmed',
      'Trigger · HTTPS',
      '1,284 events today',
      35,
      140,
    ],
    [
      'Validate order',
      'Check stock & address',
      'Condition · All rules pass',
      '99.8% passed',
      360,
      140,
    ],
    [
      'Create pick request',
      'Bodega WMS',
      'Action · API request',
      'Average 142 ms',
      740,
      60,
    ],
    [
      'Notify operations',
      'Team inbox',
      'Action · Exception route',
      '3 routed for review',
      740,
      280,
    ],
  ]
    .map(
      ([t, s, k, m, x, y]) =>
        `<div class="node" style="left:${x}px;top:${y}px"><p>${k}</p><h3>${t}</h3><p>${s}</p><small>● ${m}</small></div>`,
    )
    .join(
      '',
    )}</div><div class="foot"><span>＋ Add step &nbsp; ↶ Undo &nbsp; ↷ Redo</span><span>100% &nbsp; − &nbsp; ＋</span></div></div>` +
    stats([
      ['Runs today', '1,284'],
      ['Success rate', '99.8%'],
      ['Median duration', '420 ms'],
      ['Needs review', '3', 'Action required'],
    ]),
  { action: 'Publish flow' },
);
add(
  'automation/sync-log',
  'Sync log',
  'Track every event across your connected systems.',
  stats([
    ['Events today', '12,846'],
    ['Successful', '12,801'],
    ['Retrying', '42'],
    ['Failed', '3', 'Needs review'],
  ]) +
    panel(
      'Event history',
      filters('Search event ID or entity…') +
        table(
          [
            'TIME',
            'EVENT',
            'SOURCE → DESTINATION',
            'RECORD',
            'DURATION',
            'RESULT',
          ],
          Array.from({ length: 8 }, (_, i) => [
            `10:${42 - i}:18`,
            ['Order created', 'Stock updated', 'Contact synced'][i % 3],
            ['Store → Warehouse', 'Warehouse → ERP', 'Portal → CRM'][i % 3],
            `EVT-${8246 - i}`,
            `${142 + i * 23} ms`,
            badge(
              i === 3 ? 'Retrying' : i === 6 ? 'Failed' : 'Success',
              i === 3 || i === 6 ? 'amber' : '',
            ),
          ]),
          'Showing latest 8 events',
        ),
    ),
);
add(
  'automation/ops-dashboard',
  'Operations monitor',
  'All integrations healthy · Updated 10:42:18',
  stats([
    ['Events processed', '12,846'],
    ['Success rate', '99.97%'],
    ['Queue depth', '24'],
    ['Median latency', '142 ms', '↓ 18 ms'],
  ]) +
    `<div class="grid">${panel('Event throughput', chart(true), 'Last 6 hours')}${panel(
      'Connected systems',
      list([
        ['Northwind ERP', '● Healthy'],
        ['Bodega WMS', '● Healthy'],
        ['Haraya CRM', '● Healthy'],
        ['Luntian Portal', '● Healthy'],
      ]),
    )}</div>` +
    panel(
      'Active flows',
      table(
        ['FLOW', 'LAST RUN', 'RUNS TODAY', 'SUCCESS', 'STATUS'],
        [
          [
            'Order fulfilment sync',
            '12 seconds ago',
            '1,284',
            '99.8%',
            badge('Active'),
          ],
          [
            'Inventory reconciliation',
            '2 minutes ago',
            '288',
            '100%',
            badge('Active'),
          ],
          [
            'Customer record sync',
            '34 seconds ago',
            '842',
            '100%',
            badge('Active'),
          ],
        ],
        '3 active flows',
      ),
    ),
);
applyFeatured(screens, { stats, panel, chart, table, rows });
const groups = {
  erp: ['Northwind ERP', '#3a72e8'],
  pos: ['Tindahan POS', '#168977'],
  crm: ['Haraya CRM', '#7d5ce2'],
  wms: ['Bodega WMS', '#277b9a'],
  inventory: ['Stockwise', '#326baf'],
  hr: ['Kawayan People', '#97704a'],
  software: ['Luntian Workspace', '#347e70'],
  automation: ['Habi Connect', '#5b69db'],
};
const contract = JSON.parse(
  fs.readFileSync(path.join(root, 'screen-contract.json'), 'utf8'),
);
if (
  contract.length !== Object.keys(screens).length ||
  contract.some((k) => !screens[k])
)
  throw Error('Screen contract mismatch');
const manifest = [];
for (const key of contract) {
  const s = screens[key],
    group = key.split('/')[0],
    [product, accent] = groups[group],
    mobile = !!s.mobile,
    tablet = key === 'pos/checkout' || key === 'pos/receipt';
  const width = mobile ? 390 : tablet ? 1366 : 1440,
    height = mobile ? 844 : tablet ? 1024 : 900;
  manifest.push({
    key,
    title: s.title,
    product: s.product || product,
    width,
    height,
  });
  const nav = contract
    .filter((k) => k.startsWith(group + '/'))
    .map(
      (k, i) =>
        `<a class="nav ${k === key ? 'active' : ''}" href="${k.split('/')[1]}.html"><span style="margin-right:12px">${['▦', '▤', '◈', '▥', '▧', '☷'][i % 6]}</span>${screens[k].title.split(' · ')[0].replace(/PO-.*/, '').replace(/TR-.*/, '').slice(0, 24)}</a>`,
    )
    .join('');
  const sample =
    '<div class="sample">Fictional sample system · Demonstration data</div>';
  const body = s.standalone
    ? s.body
    : mobile
      ? `<main class="mobile" style="--accent:${accent}"><div class="statusbar"><span>9:41</span><span>▮▮▮ &nbsp; ◉ &nbsp; ▰</span></div><header class="mobile-head"><p>${s.sub}</p><h1>${s.title}</h1></header><div class="mobile-body">${s.body}</div>${sample}<nav class="bottom-nav"><b>⌂ Home</b><span>▤ Tasks</span><span>▣ Schedule</span><span>◉ Account</span></nav></main>`
      : `<main class="app" style="--accent:${accent}"><aside class="sidebar"><div class="brand"><span class="mark">${product[0]}</span>${product.split(' ')[0]}</div><div class="nav-label">WORKSPACE</div>${nav}<div class="nav-label">MANAGE</div><div class="nav">⚙ &nbsp; Settings</div><div class="nav">◉ &nbsp; Help centre</div><div class="sidefoot">${product}<br>Philippines workspace<br>◉ All systems operational</div></aside><div class="shell"><header class="topbar"><span>Amihan workspace &nbsp;⌄</span><div class="topright"><span class="search">⌕ &nbsp; Search anything…</span><span>◷ &nbsp; Notifications</span><div class="avatar">MS</div></div></header><div class="content"><div class="crumb">${product} &nbsp; / &nbsp; ${s.title}</div><div class="heading"><div><h1>${s.title}</h1><p>${s.sub}</p></div><div class="actions">${btn('Export')}${btn(s.action || 'October 2026 ⌄', true)}</div></div>${s.body}</div></div>${sample}</main>`;
  const file = path.join(root, key + '.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(
    file,
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${s.title} — ${product}</title><link rel="stylesheet" href="../style.css"><link rel="stylesheet" href="../featured.css"></head><body class="product-${group}">${body}</body></html>\n`,
  );
}
fs.writeFileSync(
  path.join(root, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
);
fs.writeFileSync(
  path.join(root, 'index.html'),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sample systems — Contact sheet</title><style>body{margin:0;padding:40px;background:#eef2f7;color:#24374b;font:15px system-ui}h1{font-size:32px;margin:0}p{color:#61758c}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;margin-top:30px}a{display:block;background:white;border-radius:12px;overflow:hidden;text-decoration:none;color:inherit;border:1px solid #dce4ed}img{width:100%;height:220px;object-fit:contain;background:#e7edf5}article{padding:18px}h2{font-size:17px;margin:0 0 8px}small{color:#718299}</style></head><body><h1>Software that feels ready for work.</h1><p>33 fictional sample screens · Philippine demonstration data · Captured at native size, DPR 2</p><main>${manifest.map((s) => `<a href="${s.key}.html"><img src="../src/assets/showcase/${s.key}.png" alt="${s.title}" loading="lazy"><article><h2>${s.product} · ${s.title}</h2><small>${s.key} · ${s.width} × ${s.height}</small></article></a>`).join('')}</main></body></html>\n`,
);
console.log(`Built ${manifest.length} standalone screens and contact sheet.`);
