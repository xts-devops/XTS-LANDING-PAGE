import type { Showcase } from './types';

export const showcases: Showcase[] = [
  {
    id: 'retail-ops',
    title: 'Unified Retail Operations',
    tags: ['Business Platforms', 'Retail'],
    bullets: ['Multi-branch POS', 'Real-time inventory', 'Sales dashboards'],
    art: 'retail-ops',
    need: 'business-platforms',
  },
  {
    id: 'smart-warehouse',
    title: 'Smart Warehouse Flow',
    tags: ['Automation', 'Logistics'],
    bullets: [
      'WMS + barcode/RFID',
      'Pick-path automation',
      'Live stock visibility',
    ],
    art: 'warehouse',
    need: 'automation',
  },
  {
    id: 'production-cell',
    title: 'Automated Production Cell',
    tags: ['Robotics', 'Manufacturing'],
    bullets: ['Robotic handling', 'Sensor monitoring', 'Line dashboards'],
    art: 'production-cell',
    need: 'robotics',
  },
];
