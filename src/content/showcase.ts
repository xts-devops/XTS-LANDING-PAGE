import tonal from '../assets/images/draft/tonal.svg';
import type { Showcase } from './types';

export const showcases: Showcase[] = [
  {
    id: 'retail-ops',
    title: 'Unified Retail Operations',
    tags: ['Business Platforms', 'Retail'],
    bullets: ['Multi-branch POS', 'Real-time inventory', 'Sales dashboards'],
    image: { src: tonal, alt: '' },
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
    image: { src: tonal, alt: '' },
    need: 'automation',
  },
  {
    id: 'production-cell',
    title: 'Automated Production Cell',
    tags: ['Robotics', 'Manufacturing'],
    bullets: ['Robotic handling', 'Sensor monitoring', 'Line dashboards'],
    image: { src: tonal, alt: '' },
    need: 'robotics',
  },
];
