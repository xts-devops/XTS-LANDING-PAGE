import type { Pillar } from './types';

export const pillars: Pillar[] = [
  {
    id: 'business-platforms',
    title: 'Business Platforms',
    summary:
      'Configured, integrated POS, CRM, ERP and WMS — for growing teams up to enterprise scale.',
    chips: ['POS', 'CRM', 'ERP', 'WMS', 'Inventory'],
    icon: 'layers',
    art: 'platforms',
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    summary:
      'Web, mobile and internal tools built around how you actually work.',
    chips: ['Web apps', 'Mobile', 'Portals', 'Internal tools'],
    icon: 'code',
    art: 'software',
  },
  {
    id: 'automation',
    title: 'Automation & Integration',
    summary:
      'Connect your systems, automate processes, and remove manual work.',
    chips: ['APIs', 'Workflows', 'Data pipelines', 'AI'],
    icon: 'workflow',
    art: 'automation',
  },
  {
    id: 'robotics',
    title: 'Robotics, R&D & Prototyping',
    summary:
      'Research, engineering and rapid prototyping for advanced technology.',
    chips: ['Robotics', 'IoT', 'Hardware', 'PoC'],
    icon: 'bot',
    art: 'robotics',
  },
];
