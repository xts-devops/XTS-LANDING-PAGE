import type { ImageMetadata } from 'astro';

export type Img = { src: ImageMetadata; alt: string };
export type Pillar = {
  id: string;
  title: string;
  summary: string;
  chips: string[];
  icon: string;
  image: Img;
};
export type Showcase = {
  id: string;
  title: string;
  tags: string[];
  bullets: string[];
  image: Img;
  need: Pillar['id'];
};
export type Industry = {
  id: string;
  name: string;
  icon: string;
  summary: string;
  examples: string[];
  image: Img;
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
