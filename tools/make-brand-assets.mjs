/**
 * Derives favicons + the default social image from the supplied raster logo.
 * Re-run when XTS sends the vector logo (swap SOURCE / crop):  node tools/make-brand-assets.mjs
 * Uses sharp (already installed via Astro's image service).
 */
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';

const SOURCE = 'public/brand/logo-gold-original.png'; // 426×204, dark textured background
const MARK = { left: 138, top: 0, width: 146, height: 146 }; // the gold "A" mark
const BG = '#0a0a0b';

mkdirSync('public/og', { recursive: true });

const mark = (size) =>
  sharp(SOURCE)
    .extract(MARK)
    .resize(size, size, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 });

await mark(192).toFile('public/favicon.png');
await mark(180).toFile('public/apple-touch-icon.png');

// favicon.ico = ICO container holding one 32×32 PNG (supported by every current browser).
const png32 = await mark(32).toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // count
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // planes
header.writeUInt16LE(32, 12); // bpp
header.writeUInt32LE(png32.length, 14); // size
header.writeUInt32LE(22, 18); // offset
writeFileSync('public/favicon.ico', Buffer.concat([header, png32]));

// 1200×630 social card: blueprint grid + warm glow + the full logo, centred.
const W = 1200;
const H = 630;
const grid = Array.from(
  { length: Math.ceil(W / 40) + 1 },
  (_, i) => `<path d="M${i * 40} 0V${H}"/>`,
)
  .concat(
    Array.from(
      { length: Math.ceil(H / 40) + 1 },
      (_, i) => `<path d="M0 ${i * 40}H${W}"/>`,
    ),
  )
  .join('');
const backdrop = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="g" cx="50%" cy="52%" r="55%">
      <stop offset="0" stop-color="#b97a24" stop-opacity="0.32"/>
      <stop offset="1" stop-color="#b97a24" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="fade" cx="50%" cy="50%" r="70%">
      <stop offset="0.35" stop-color="#fff" stop-opacity="1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="m"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
  </defs>
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <g stroke="#2a2a2e" stroke-width="1" mask="url(#m)">${grid}</g>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <path d="M120 520H1080" stroke="#e9a944" stroke-opacity="0.35"/>
  <path d="M120 110H1080" stroke="#e9a944" stroke-opacity="0.15"/>
</svg>`);
const logo = await sharp(SOURCE).resize({ width: 640 }).png().toBuffer();
const { height: logoH = 306 } = await sharp(logo).metadata();
await sharp(backdrop)
  .composite([
    {
      input: logo,
      left: Math.round((W - 640) / 2),
      top: Math.round((H - logoH) / 2),
      blend: 'lighten',
    },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og/og-default.jpg');

console.log(
  'wrote favicon.ico, favicon.png, apple-touch-icon.png, og/og-default.jpg',
);
