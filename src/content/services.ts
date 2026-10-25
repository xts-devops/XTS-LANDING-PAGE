import type { Service } from './types';

/**
 * Services (D22). Screen keys match docs/CODEX-BRIEF-v2.md; photo keys match IMAGE-BRIEF-v2.
 * Product screens are sample systems built for showcasing, with fictional data.
 */
export const services: Service[] = [
  {
    slug: 'business-systems',
    title: 'Business Systems',
    tagline: 'ERP, POS, CRM and warehouse systems, set up around how you work.',
    intro:
      'We implement and integrate the systems that run your day: sales, stock, finance, people. One connected setup, configured for your branches and rolled out with your team.',
    photo: 'home/service-business',
    photoAlt:
      'Store owner using a tablet point-of-sale terminal at the counter',
    highlights: [
      'Multi-branch ready',
      'Integrated end to end',
      'Training and support included',
    ],
    systems: [
      {
        id: 'erp',
        name: 'ERP',
        summary:
          'Finance, purchasing, sales and inventory in one place, with approvals and audit trails.',
        features: [
          'Real-time financial dashboards',
          'Purchase-to-pay and order-to-cash',
          'Multi-company and multi-branch',
        ],
        slides: [
          { screen: 'erp/dashboard', caption: 'Company dashboard' },
          { screen: 'erp/sales-orders', caption: 'Sales orders' },
          { screen: 'erp/purchase-order', caption: 'Purchase order' },
          { screen: 'erp/inventory-valuation', caption: 'Inventory valuation' },
          { screen: 'erp/general-ledger', caption: 'General ledger' },
          { screen: 'erp/approvals', caption: 'Approvals inbox' },
        ],
      },
      {
        id: 'pos',
        name: 'POS',
        summary:
          'Fast, touch-friendly checkout that keeps every branch in sync with stock and sales.',
        features: [
          'Offline-capable register',
          'Shift and cash management',
          'Live branch sales',
        ],
        slides: [
          { screen: 'pos/checkout', caption: 'Register', device: 'tablet' },
          {
            screen: 'pos/receipt',
            caption: 'Receipt preview',
            device: 'tablet',
          },
          { screen: 'pos/shift-summary', caption: 'Shift summary' },
          { screen: 'pos/branch-sales', caption: 'Branch sales report' },
        ],
      },
      {
        id: 'crm',
        name: 'CRM',
        summary:
          'Track every lead, quote and customer conversation, and see your pipeline at a glance.',
        features: [
          'Visual sales pipeline',
          'Customer timeline',
          'Quotes and follow-ups',
        ],
        slides: [
          { screen: 'crm/pipeline', caption: 'Sales pipeline' },
          { screen: 'crm/contact', caption: 'Customer profile' },
          { screen: 'crm/quotes', caption: 'Quotes' },
          { screen: 'crm/dashboard', caption: 'Sales dashboard' },
        ],
      },
      {
        id: 'wms',
        name: 'WMS',
        summary:
          'Receiving, put-away, picking and transfers, guided on handheld scanners.',
        features: [
          'Barcode and RFID',
          'Guided pick paths',
          'Bin-level stock visibility',
        ],
        slides: [
          { screen: 'wms/dashboard', caption: 'Warehouse dashboard' },
          { screen: 'wms/receiving', caption: 'Receiving' },
          {
            screen: 'wms/pick-list',
            caption: 'Pick list on a handheld',
            device: 'mobile',
          },
          { screen: 'wms/bin-map', caption: 'Bin and location map' },
          { screen: 'wms/stock-transfer', caption: 'Stock transfer' },
        ],
      },
      {
        id: 'inventory',
        name: 'Inventory',
        summary:
          'Know what you have, where it is and when to reorder, across every location.',
        features: ['Reorder alerts', 'Movement history', 'Cycle counts'],
        slides: [
          {
            screen: 'inventory/stock-list',
            caption: 'Stock list with reorder alerts',
          },
          { screen: 'inventory/item-detail', caption: 'Item history' },
          { screen: 'inventory/stock-count', caption: 'Stock count' },
        ],
      },
      {
        id: 'hr',
        name: 'HR & Payroll',
        summary:
          'Employee records, leave and payroll with Philippine deductions built in.',
        features: [
          'SSS, PhilHealth, Pag-IBIG and tax',
          'Leave and attendance',
          'Employee self-service',
        ],
        slides: [
          { screen: 'hr/directory', caption: 'Employee directory' },
          { screen: 'hr/payroll-run', caption: 'Payroll run' },
          { screen: 'hr/leave-calendar', caption: 'Leave calendar' },
        ],
      },
    ],
  },
  {
    slug: 'custom-software',
    title: 'Custom Software',
    tagline: 'Web apps, mobile apps and portals built around your process.',
    intro:
      'When off-the-shelf doesn’t fit, we design and build it. From customer portals to internal tools and mobile apps, shipped in stages so you see progress every few weeks.',
    photo: 'home/service-software',
    photoAlt: 'Two developers reviewing code on large monitors',
    highlights: [
      'Web and mobile',
      'Designed with your users',
      'Delivered in stages',
    ],
    systems: [
      {
        id: 'portal',
        name: 'Client portals',
        summary:
          'Give customers and partners a secure place to see orders, documents and status.',
        features: [
          'Secure sign-in',
          'Documents and messages',
          'Status tracking',
        ],
        slides: [
          { screen: 'software/portal', caption: 'Client portal dashboard' },
        ],
      },
      {
        id: 'web',
        name: 'Web apps',
        summary:
          'Booking, scheduling and operations tools that run in any browser.',
        features: [
          'Responsive by default',
          'Role-based access',
          'Integrates with your systems',
        ],
        slides: [{ screen: 'software/booking', caption: 'Booking web app' }],
      },
      {
        id: 'mobile',
        name: 'Mobile apps',
        summary:
          'iOS and Android apps for customers or field teams, online or offline.',
        features: ['iOS and Android', 'Offline mode', 'Push notifications'],
        slides: [
          {
            screen: 'software/mobile-1',
            caption: 'Mobile app: home',
            device: 'mobile',
          },
          {
            screen: 'software/mobile-2',
            caption: 'Mobile app: booking',
            device: 'mobile',
          },
          {
            screen: 'software/mobile-3',
            caption: 'Mobile app: confirmation',
            device: 'mobile',
          },
        ],
      },
    ],
    galleryHeading: 'From first release to everyday use',
    gallery: [
      {
        photo: 'software/device-testing-v2',
        alt: 'A desktop, tablet and phones displaying an illustrative scheduling interface on a device testing bench',
        caption: 'Designed and checked across devices',
        ratio: '8 / 5',
      },
      {
        photo: 'software/field-inspection-v2',
        alt: 'Hands using an illustrative inspection checklist on a rugged tablet beside industrial equipment',
        caption: 'Built for the work beyond the desk',
        ratio: '8 / 5',
      },
    ],
  },
  {
    slug: 'automation',
    title: 'Automation & Integration',
    tagline:
      'Connect software, people and machines — from customer replies to the factory floor.',
    intro:
      'Connect customer conversations, email, business platforms and factory devices. We design workflows that move information between your tools, with clear reviews, traceable handoffs and hardware integrations where the work happens.',
    photo: 'automation/connected-factory',
    photoAlt:
      'Illustrative connected factory cell with an amber robot, turquoise conveyor, sensors and an edge controller',
    highlights: [
      'Customer and back-office workflows',
      'APIs, sensors and controllers',
      'Human review and exception handling',
    ],
    systems: [
      {
        id: 'customer-automation',
        name: 'Replies & BPO',
        summary:
          'Classify messages, prepare replies and route the right work to your team.',
        features: ['Message classification', 'Agent approval', 'Human handoff'],
        slides: [
          { screen: 'industry/support', caption: 'Customer support workflow' },
        ],
      },
      {
        id: 'document-automation',
        name: 'Email & documents',
        summary:
          'Index incoming mail, review extracted invoice fields and sync approved records.',
        features: [
          'Email and attachment indexing',
          'Field review',
          'Accounting integration',
        ],
        slides: [
          {
            screen: 'industry/documents',
            caption: 'Email and invoice processing',
          },
        ],
      },
      {
        id: 'factory-automation',
        name: 'Factory & IoT',
        summary:
          'Follow a sensor event through the edge controller into production software.',
        features: [
          'Sensor and controller signals',
          'Batch traceability',
          'Exception alerts',
        ],
        slides: [
          {
            screen: 'industry/factory',
            caption: 'Hardware and production systems',
          },
        ],
      },
      {
        id: 'flows',
        name: 'Integrations',
        summary:
          'Visual integration flows between POS, ERP, e-commerce and accounting.',
        features: [
          'API and file integrations',
          'Retries and alerts',
          'Audit log',
        ],
        slides: [
          { screen: 'automation/flow-builder', caption: 'Integration flow' },
          { screen: 'automation/sync-log', caption: 'Sync log' },
        ],
      },
      {
        id: 'ops',
        name: 'Operations dashboards',
        summary: 'Live numbers from every system on one screen.',
        features: [
          'Real-time KPIs',
          'Exceptions highlighted',
          'Wall-display mode',
        ],
        slides: [
          {
            screen: 'automation/ops-dashboard',
            caption: 'Operations dashboard',
          },
        ],
      },
    ],
    galleryHeading: 'Where the automation runs',
    gallery: [
      {
        photo: 'automation/control-room',
        alt: 'Operator at a desk watching live system dashboards on wall displays',
        caption: 'Live operations, one screen',
        ratio: '8 / 5',
      },
      {
        photo: 'automation/scanner-dock',
        alt: 'Worker scanning parcels on a conveyor at a loading dock',
        caption: 'Every scan synced to stock',
        ratio: '8 / 5',
      },
    ],
  },
  {
    slug: 'robotics',
    title: 'Robotics & R&D',
    tagline:
      'From prototype bench to factory floor: robotics, IoT and custom devices.',
    intro:
      'We research, prototype and build hardware that works in the real world: robotic cells, lab automation, drones and custom devices, from the first breadboard to deployment.',
    photo: 'home/service-robotics',
    photoAlt:
      'Industrial robotic arm on a factory line with an engineer observing',
    highlights: [
      'Prototyping to production',
      'Robotics and IoT',
      'Custom electronics',
    ],
    gallery: [
      {
        photo: 'robotics/tinkering-bench',
        alt: 'Engineer soldering on a workbench with breadboards',
        caption: 'Prototyping bench',
      },
      {
        photo: 'robotics/factory-cell',
        alt: 'Robot picking parts inside a fenced factory cell',
        caption: 'Factory robot cells',
      },
      {
        photo: 'robotics/lab-automation',
        alt: 'Robot handling sample tubes in a laboratory',
        caption: 'Lab automation',
      },
      {
        photo: 'robotics/arduino-build',
        alt: 'Arduino board wired to sensors on a prototype',
        caption: 'Arduino and microcontroller builds',
      },
      {
        photo: 'robotics/drone',
        alt: 'Custom drone with exposed electronics on a test bench',
        caption: 'Drones',
      },
      {
        photo: 'robotics/custom-device',
        alt: '3D-printed device enclosure with a visible circuit board',
        caption: 'Custom devices',
      },
      {
        photo: 'robotics/inspection-rig-v2',
        alt: 'A circuit board in an automated probe testing fixture with an inspection camera and oscilloscope',
        caption: 'Electronics testing and inspection',
      },
    ],
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
