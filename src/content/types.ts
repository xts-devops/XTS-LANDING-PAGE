/**
 * Content contract v2 (D22). Images are referenced by key, not imported:
 *   photo  → src/assets/photos/<key>.(jpg|png|webp)
 *   screen → src/assets/showcase/<key>.png   (captured from showcase-ui/)
 * Missing files render a tidy placeholder, so content can ship before media does.
 */

/** e.g. 'home/service-business' → src/assets/photos/home/service-business.jpg */
export type PhotoKey = string;
/** e.g. 'erp/dashboard' → src/assets/showcase/erp/dashboard.png */
export type ScreenKey = string;

export type Proof =
  | { kind: 'count'; value: number; suffix: string; label: string }
  | { kind: 'text'; value: string; label: string };

export type Contact = {
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  location: string;
};

/** One slide in a system showcase. */
export type Slide = {
  screen: ScreenKey;
  caption: string;
  /** 'desktop' (1440×900), 'tablet' (1366×1024) or 'mobile' (390×844) frame. */
  device?: 'desktop' | 'tablet' | 'mobile';
};

/** A product family inside a service, e.g. ERP inside Business Systems. */
export type System = {
  id: string;
  name: string;
  summary: string;
  features: string[];
  slides: Slide[];
};

export type Service = {
  slug: string;
  title: string;
  /** One line for the home tile. */
  tagline: string;
  /** Two or three sentences for the service page intro. */
  intro: string;
  /** Home tile and service-page hero (shared-element transition). */
  photo: PhotoKey;
  photoAlt: string;
  highlights: string[];
  /** Business systems / software / automation: switchable product showcases. */
  systems?: System[];
  /** Robotics: real-life photo gallery. */
  gallery?: { photo: PhotoKey; alt: string; caption: string }[];
};

export type WorkItem = {
  id: string;
  title: string;
  sector: string;
  /** Leave empty until XTS confirms where it was delivered. */
  location?: string;
  summary: string;
  service: Service['slug'];
  photo: PhotoKey;
  photoAlt: string;
};
