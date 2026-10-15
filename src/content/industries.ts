import tonal from '../assets/images/draft/tonal.svg';
import type { Industry } from './types';

export const industries: Industry[] = [
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    icon: 'store',
    summary:
      'Bring your sales channels, stock and customer experience together. Give every branch a clearer view of the business.',
    examples: ['Point of sale', 'Inventory management', 'Customer platforms'],
    image: { src: tonal, alt: '' },
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: 'factory',
    summary:
      'Connect the production floor with the systems behind it. Build visibility into the way materials, equipment and teams work.',
    examples: [
      'Production dashboards',
      'Robotic handling',
      'Sensor integration',
    ],
    image: { src: tonal, alt: '' },
  },
  {
    id: 'logistics',
    name: 'Logistics & Supply Chain',
    icon: 'truck',
    summary:
      'Keep goods and information moving together. Connect warehouse operations with the people who depend on them.',
    examples: ['Warehouse management', 'Barcode and RFID', 'Stock visibility'],
    image: { src: tonal, alt: '' },
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: 'heart',
    summary:
      'Support the teams behind patient care. Bring clarity to administrative workflows, supplies and internal systems.',
    examples: [
      'Administrative workflows',
      'Inventory systems',
      'Internal tools',
    ],
    image: { src: tonal, alt: '' },
  },
  {
    id: 'government',
    name: 'Government & Public Sector',
    icon: 'landmark',
    summary:
      'Build practical digital services for institutions and the people they serve. Simplify the work behind public service.',
    examples: ['Service portals', 'Document workflows', 'System integration'],
    image: { src: tonal, alt: '' },
  },
];
