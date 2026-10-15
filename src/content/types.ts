import type { ImageMetadata } from 'astro';

export type Img = { src: ImageMetadata; alt: string };
/** Coded schematic shown when no photo is supplied (components/art/Schematic.astro). */
export type ArtName =
  | 'platforms'
  | 'software'
  | 'automation'
  | 'robotics'
  | 'retail-ops'
  | 'warehouse'
  | 'production-cell'
  | 'industry-retail'
  | 'industry-manufacturing'
  | 'industry-logistics'
  | 'industry-healthcare'
  | 'industry-government';
export type Pillar = {
  id: string;
  title: string;
  summary: string;
  chips: string[];
  icon: string;
  art: ArtName;
  /** Optional photo; replaces the schematic when supplied (IMAGE-BRIEF). */
  image?: Img;
};
export type Showcase = {
  id: string;
  title: string;
  tags: string[];
  bullets: string[];
  art: ArtName;
  /** Optional photo; replaces the schematic when supplied (IMAGE-BRIEF). */
  image?: Img;
  need: Pillar['id'];
};
export type Industry = {
  id: string;
  name: string;
  icon: string;
  summary: string;
  examples: string[];
  art: ArtName;
  /** Optional photo; replaces the schematic when supplied (IMAGE-BRIEF). */
  image?: Img;
};
export type Step = { n: number; title: string; summary: string; icon: string };
export type Principle = { title: string; summary: string; icon: string };
export type Proof =
  | { kind: 'count'; value: number; suffix: string; label: string }
  | { kind: 'text'; value: string; label: string };
export type Contact = {
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  location: string;
};
