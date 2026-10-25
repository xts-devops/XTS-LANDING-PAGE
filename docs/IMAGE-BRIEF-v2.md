# Image brief v2: real-life photography (2026-10-19)

Replaces IMAGE-BRIEF v1 for all new work. **Photoreal only.** No illustrations, renders that look
like renders, or UI drawn into photos. One shared grade, so the site reads as one shoot:

> **Grade suffix (append to every prompt):** `photorealistic, shot on a full-frame camera, 35mm lens,
> natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow
> depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people
> appear, no text, no logos, no watermarks`

**Rules**
- Deliver JPG or PNG at the size below into `src/assets/photos/<folder>/<name>.jpg`. Astro makes AVIF/WebP.
- People: diverse, natural, candid. No staring into camera, no stock smiles, no visible brand names.
- Screens inside photos: leave them dark or blurred. Real UI screens come from `showcase-ui/` captures.
- Log each image in the table at the bottom: file, source (generated / stock + licence), prompt.

## Home

| File | Size | Prompt |
|---|---|---|
| `home/hero-office.jpg` | ✅ already supplied (`src/assets/images/hero-office.png`) | — |
| `home/service-business.jpg` | 1600×1200 | Retail store owner at a modern counter using a tablet point-of-sale terminal, evening, warm shop lights |
| `home/service-software.jpg` | 1600×1200 | Two developers reviewing code on large monitors in a dim modern studio, city lights through window |
| `home/service-automation.jpg` | 1600×1200 | Operations manager in a warehouse office watching wall screens, forklifts blurred in background |
| `home/service-robotics.jpg` | 1600×1200 | Industrial robotic arm on a factory line, sparks of light, engineer in safety glasses observing |
| `home/cta-team.jpg` | 2000×1000 | Small engineering team in a glass meeting room at dusk, whiteboard sketches, candid discussion |

## Work (projects, anonymised until XTS confirms names)

| File | Size | Prompt |
|---|---|---|
| `work/retail-chain.jpg` | 1600×1000 | Busy multi-branch retail store, cashier using a POS terminal, customers in line |
| `work/warehouse.jpg` | 1600×1000 | Warehouse aisle, worker scanning a barcode with a handheld scanner, tall racks |
| `work/factory-line.jpg` | 1600×1000 | Automated production line with robotic arms and conveyor, warm industrial lighting |
| `work/clinic.jpg` | 1600×1000 | Clean clinic front desk, staff using a computer, calm daylight |
| `work/office-erp.jpg` | 1600×1000 | Finance team in a bright office reviewing reports on monitors |
| `work/field-team.jpg` | 1600×1000 | Field technician with a rugged tablet at an outdoor site |

## Robotics page (real-life tinkering and deployment)

| File | Size | Prompt |
|---|---|---|
| `robotics/hero-arm.jpg` | 2000×1200 | Six-axis industrial robotic arm in a dark lab, single warm key light, studio-like. **Also used as the poster and source for the exploded view.** |
| `robotics/tinkering-bench.jpg` | 1600×1200 | Engineer's workbench with soldering iron, breadboards, multimeter, wires, hands at work |
| `robotics/arduino-build.jpg` | 1600×1200 | Close-up of an Arduino board with sensors and jumper wires on a prototype, macro detail |
| `robotics/factory-cell.jpg` | 1600×1200 | Robot work cell in a factory, safety fencing, arm picking parts |
| `robotics/lab-automation.jpg` | 1600×1200 | Laboratory automation, robot handling sample tubes, clean white lab, people in lab coats |
| `robotics/drone.jpg` | 1600×1200 | Custom quadcopter drone on a test bench with exposed electronics, engineer adjusting it |
| `robotics/custom-device.jpg` | 1600×1200 | 3D-printed custom device enclosure with PCB visible, product prototype on a desk |
| `robotics/pcb-assembly.jpg` | 1600×1200 | Hands assembling a printed circuit board under a magnifier lamp |

## Software and automation pages

| File | Size | Prompt |
|---|---|---|
| `software/team-planning.jpg` | 1600×1000 | Product team planning on a glass wall with sticky notes |
| `software/mobile-in-hand.jpg` | 1200×1500 | Hand holding a smartphone in a café, screen dark (the UI is composited in code) |
| `automation/control-room.jpg` | 1600×1000 | Small operations control room with wall displays, operator at a desk |
| `automation/scanner-dock.jpg` | 1600×1000 | Loading dock, worker scanning parcels, conveyor |

## Exploded robotic arm (centrepiece)

See PLAN-v2 §4. Codex: if your image tool can't make video, just deliver `robotics/hero-arm.jpg`
plus **`robotics/arm-exploded.jpg`**: the same arm in a clean technical exploded view (parts separated
along their axes, same angle and lighting). Claude builds the scroll transition between the two.

## Licence and source log

| File | Source | Licence / prompt |
|---|---|---|
| `src/assets/photos/robotics/hero-arm.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Photographic product hero, landscape 5:3, intended 2000×1200. A single fully assembled six-axis industrial robotic arm with charcoal graphite cast-metal body and restrained amber joint collars, small two-finger steel gripper. Three-quarter front camera angle, locked-off tripod, camera level with shoulder. Arm posed in a compact bent S profile, tool pointing diagonally down to the right. Fixed rectangular dark steel base centered at x=50%, bottom at y=86%; whole arm fits between x=29–71%, y=15–86%, generous empty margins for a later exploded version. Dark lab reduced to a perfectly plain seamless charcoal background and matte floor. Single warm key light from upper left, realistic fine machining marks, bolts, gaskets, soft contact shadow under the base. No loose objects or labels. This must look like a photograph of actual machinery, not illustration or CAD. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/robotics/arm-exploded.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. EDIT THE ATTACHED PHOTOGRAPH ONLY. Output same canvas, camera, focal length, lighting, color grade and plain dark background. Preserve the fixed rectangular base and floor contact shadow EXACTLY in their original pixel positions and preserve the overall bent arm pose and silhouette region. Create a restrained photoreal technical exploded view of THIS EXACT arm: retain its main skeletal links in place, separate joint outer covers, gold collars, bearing rings, motor housings, bolts and wrist/gripper components a short distance along each component's own mechanical axis, evenly spaced, exposing gears and bearings. No new arm design. Do not rotate, shift, enlarge, shrink or recenter the base, shoulder skeleton, camera or backdrop. Leave original background unchanged. No arrows, labels, outlines, text or graphics. Each part remains close to its assembled position for a matched crossfade, with plausible straight axial separations. Intended final delivery 2000x1200. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/robotics/tinkering-bench.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Editorial real-life photograph, 1600×1200, 4:3 framing. Engineer's workbench with soldering iron, unbranded breadboards, multimeter, wires and Southeast Asian engineer's hands actively soldering. Screens dark or blurred. Candid professional activity, no smiles at camera. No drawn graphics or UI overlays. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/robotics/arduino-build.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Editorial real-life photograph, 1600×1200, 4:3 framing. Close-up of an unbranded Arduino-compatible microcontroller board with sensors and jumper wires on a working prototype, authentic macro electronics detail; all silkscreen labels absent or unreadable. Screens dark or blurred. Candid professional activity, no smiles at camera. No drawn graphics or UI overlays. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/robotics/factory-cell.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Editorial real-life photograph, 1600×1200, 4:3 framing. Industrial robot work cell in a real factory, safety fencing, robotic arm picking machined parts. Screens dark or blurred. Candid professional activity, no smiles at camera. No drawn graphics or UI overlays. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/robotics/lab-automation.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Editorial real-life photograph, 1600×1200, 4:3 framing. Laboratory automation, a compact robot handling sample tubes, clean white lab, candid Southeast Asian scientists in lab coats in background. Screens dark or blurred. Candid professional activity, no smiles at camera. No drawn graphics or UI overlays. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/robotics/drone.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Editorial real-life photograph, 1600×1200, 4:3 framing. Custom quadcopter drone on a test bench with exposed electronics, Southeast Asian engineer adjusting its wiring; realistic carbon fiber frame, no branding. Screens dark or blurred. Candid professional activity, no smiles at camera. No drawn graphics or UI overlays. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/robotics/custom-device.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Editorial real-life photograph, 1600×1200, 4:3 framing. 3D-printed custom device enclosure with PCB visible, an authentic product prototype on an engineering desk. Screens dark or blurred. Candid professional activity, no smiles at camera. No drawn graphics or UI overlays. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/robotics/pcb-assembly.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Editorial real-life photograph, 1600×1200, 4:3 framing. Southeast Asian engineer's hands assembling a printed circuit board under a magnifier lamp, authentic tools and warm lab lighting. Screens dark or blurred. Candid professional activity, no smiles at camera. No drawn graphics or UI overlays. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/home/service-business.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Real-life editorial photograph, 1600×1200, 1.3333333333333333 aspect ratio. Retail store owner at a modern counter using a tablet point-of-sale terminal, evening, warm shop lights. Screens dark or blurred, no readable UI. People candid, never facing camera. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/home/service-software.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Real-life editorial photograph, 1600×1200, 1.3333333333333333 aspect ratio. Two developers reviewing code on large monitors in a dim modern studio, city lights through window. Screens dark or blurred, no readable UI. People candid, never facing camera. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/home/service-automation.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Real-life editorial photograph, 1600×1200, 1.3333333333333333 aspect ratio. Operations manager in a warehouse office watching wall screens, forklifts blurred in background. Screens dark or blurred, no readable UI. People candid, never facing camera. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/home/service-robotics.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Real-life editorial photograph, 1600×1200, 1.3333333333333333 aspect ratio. Industrial robotic arm on a factory line, sparks of light, engineer in safety glasses observing. Screens dark or blurred, no readable UI. People candid, never facing camera. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/home/cta-team.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Real-life editorial photograph, 2000×1000, 2 aspect ratio. Small engineering team in a glass meeting room at dusk, whiteboard with indistinct non-readable sketches, candid discussion. Screens dark or blurred, no readable UI. People candid, never facing camera. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/work/retail-chain.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Real-life editorial photography, 1600×1000. Busy retail store, cashier using a POS terminal, customers in line. Screens dark or blurred, no readable UI. Candid people never looking at camera. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/work/warehouse.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Real-life editorial photography, 1600×1000. Warehouse aisle, worker scanning an unmarked package with handheld scanner, tall racks. Screens dark or blurred, no readable UI. Candid people never looking at camera. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/work/factory-line.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Real-life editorial photography, 1600×1000. Automated production line with robotic arms and conveyor, warm industrial lighting. Screens dark or blurred, no readable UI. Candid people never looking at camera. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/work/clinic.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Real-life editorial photography, 1600×1000. Clean clinic front desk, staff using computer, calm daylight. Screens dark or blurred, no readable UI. Candid people never looking at camera. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/work/office-erp.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Real-life editorial photography, 1600×1000. Finance team in bright office reviewing reports on monitors. Screens dark or blurred, no readable UI. Candid people never looking at camera. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/work/field-team.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Real-life editorial photography, 1600×1000. Field technician with rugged tablet at outdoor construction site. Screens dark or blurred, no readable UI. Candid people never looking at camera. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/software/team-planning.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Real-life editorial photography, 1600×1000. Product team planning on glass wall with blank colored sticky notes. Screens dark or blurred, no readable UI. Candid people never looking at camera. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/software/mobile-in-hand.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Real-life editorial photography, 1200×1500. Hand holding smartphone in cafe, screen completely dark, portrait orientation. Screens dark or blurred, no readable UI. Candid people never looking at camera. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/automation/control-room.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Real-life editorial photography, 1600×1000. Small operations control room with blurred wall displays, operator at desk. Screens dark or blurred, no readable UI. Candid people never looking at camera. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/automation/scanner-dock.jpg` | Generated · built-in ImageGen | Project-generated illustrative asset, not client evidence. Real-life editorial photography, 1600×1000. Loading dock, worker scanning unmarked parcels beside conveyor. Screens dark or blurred, no readable UI. Candid people never looking at camera. photorealistic, shot on a full-frame camera, 35mm lens, natural light mixed with warm practical lighting, deep blacks, subtle amber highlights, shallow depth of field, authentic textures, Philippine/Southeast-Asian professional setting where people appear, no text, no logos, no watermarks |
| `src/assets/photos/home/hero-office.jpg` | Existing supplied generated asset | Project-generated illustrative asset, not client evidence. Already supplied in the repository; existing generated hero preserved and exported to JPEG. No new prompt used. |
## UI refinement assets · 2026-10-25

| File | Source | Licence / prompt |
|---|---|---|
| `src/assets/photos/home/hero-studio-v3.jpg` | Generated · built-in ImageGen, then edited to remove labels | Project-generated illustrative engineering studio. Full generation and refinement prompts: `docs/media-v2/ui-refinement-sources.json`. Exported 2400×1400; replaces only the homepage visual. |
| `src/assets/brand/mark-gold-transparent.png` | Built-in ImageGen edit of the supplied gold logo | XTS-supplied mark isolated on transparent alpha for the header/footer lockup. Original assets retained. Full extraction prompt and export record: `docs/media-v2/ui-refinement-sources.json`. Raster derivative; no vector source claimed. |

## Industry concept visuals — 2026-10-25

| Filename | Origin | Prompt record |
|---|---|---|
| `public/demos/media/vista-exterior.webp` | Generated with built-in imagegen; no third-party stock. Fictional architectural concept. | Full exterior prompt and export details in `docs/media-v2/industry-sources.json` |
| `public/demos/media/vista-interior.webp` | Generated with built-in imagegen; no third-party stock. Fictional architectural concept. | Full interior prompt and export details in `docs/media-v2/industry-sources.json` |

These are illustrative design directions, not a continuous filmed walkthrough, an existing property listing or XTS client work. The seven new `src/assets/showcase/industry/*.png` screens are captured from the repository's own HTML/CSS/JS concept demos; their source and screen contract are documented in `docs/INDUSTRY-DEMOS.md`.
## Catalogue product photography — 2026-10-25

| File | Source | Licence / prompt |
|---|---|---|
| `showcase-ui/assets/products/iced-latte.webp` | Generated · built-in imagegen | Photographic sample product; no third-party stock or actual client products. Full prompt and source sheet `cafe-products-source.png` logged in `docs/media-v2/product-sources.json`. |
| `showcase-ui/assets/products/americano.webp` | Generated · built-in imagegen | Photographic sample product; no third-party stock or actual client products. Full prompt and source sheet `cafe-products-source.png` logged in `docs/media-v2/product-sources.json`. |
| `showcase-ui/assets/products/cold-brew.webp` | Generated · built-in imagegen | Photographic sample product; no third-party stock or actual client products. Full prompt and source sheet `cafe-products-source.png` logged in `docs/media-v2/product-sources.json`. |
| `showcase-ui/assets/products/croissant.webp` | Generated · built-in imagegen | Photographic sample product; no third-party stock or actual client products. Full prompt and source sheet `cafe-products-source.png` logged in `docs/media-v2/product-sources.json`. |
| `showcase-ui/assets/products/cinnamon-roll.webp` | Generated · built-in imagegen | Photographic sample product; no third-party stock or actual client products. Full prompt and source sheet `cafe-products-source.png` logged in `docs/media-v2/product-sources.json`. |
| `showcase-ui/assets/products/matcha-latte.webp` | Generated · built-in imagegen | Photographic sample product; no third-party stock or actual client products. Full prompt and source sheet `cafe-products-source.png` logged in `docs/media-v2/product-sources.json`. |
| `showcase-ui/assets/products/water.webp` | Generated · built-in imagegen | Photographic sample product; no third-party stock or actual client products. Full prompt and source sheet `cafe-products-source.png` logged in `docs/media-v2/product-sources.json`. |
| `showcase-ui/assets/products/tote.webp` | Generated · built-in imagegen | Photographic sample product; no third-party stock or actual client products. Full prompt and source sheet `cafe-products-source.png` logged in `docs/media-v2/product-sources.json`. |
| `showcase-ui/assets/products/coffee-beans.webp` | Generated · built-in imagegen | Photographic sample product; no third-party stock or actual client products. Full prompt and source sheet `cafe-products-source.png` logged in `docs/media-v2/product-sources.json`. |
| `showcase-ui/assets/products/flat-white.webp` | Generated · built-in imagegen | Photographic sample product; no third-party stock or actual client products. Full prompt and source sheet `market-products-source.png` logged in `docs/media-v2/product-sources.json`. |
| `showcase-ui/assets/products/rice.webp` | Generated · built-in imagegen | Photographic sample product; no third-party stock or actual client products. Full prompt and source sheet `market-products-source.png` logged in `docs/media-v2/product-sources.json`. |
| `showcase-ui/assets/products/fruit-box.webp` | Generated · built-in imagegen | Photographic sample product; no third-party stock or actual client products. Full prompt and source sheet `market-products-source.png` logged in `docs/media-v2/product-sources.json`. |
| `showcase-ui/assets/products/greens.webp` | Generated · built-in imagegen | Photographic sample product; no third-party stock or actual client products. Full prompt and source sheet `market-products-source.png` logged in `docs/media-v2/product-sources.json`. |

The six live-demo thumbnails are also exported under `public/demos/media/products/`. Source PNG sheets are retained in `docs/media-v2/`; crops are resized to 480×480 WebP at quality 82. These generated photographs replace symbols in the fictional Tindahan POS and Morrow & Moss demos. They are illustrative catalogue products, not XTS client evidence.

## Hospitality system photographs — 2026-10-25

| File | Source | Licence / prompt |
|---|---|---|
| `public/demos/media/studio.webp` | Generated · built-in imagegen | Illustrative room/court photograph, no client or actual availability claimed. Full prompt and 720×540 WebP export in `docs/media-v2/hospitality-sources.json`; source sheet retained in `docs/media-v2/hospitality-source.png`. |
| `public/demos/media/garden-suite.webp` | Generated · built-in imagegen | Illustrative room/court photograph, no client or actual availability claimed. Full prompt and 720×540 WebP export in `docs/media-v2/hospitality-sources.json`; source sheet retained in `docs/media-v2/hospitality-source.png`. |
| `public/demos/media/family-loft.webp` | Generated · built-in imagegen | Illustrative room/court photograph, no client or actual availability claimed. Full prompt and 720×540 WebP export in `docs/media-v2/hospitality-sources.json`; source sheet retained in `docs/media-v2/hospitality-source.png`. |
| `public/demos/media/pickleball-court.webp` | Generated · built-in imagegen | Illustrative room/court photograph, no client or actual availability claimed. Full prompt and 720×540 WebP export in `docs/media-v2/hospitality-sources.json`; source sheet retained in `docs/media-v2/hospitality-source.png`. |

## Connected automation photograph — 2026-10-25

| File | Source | Licence / prompt |
|---|---|---|
| `src/assets/photos/automation/connected-factory.jpg` | Generated · built-in imagegen | Illustrative robot/conveyor/sensor/edge-controller cell; not client evidence. Full prompt and 1600×1200 JPEG export: `docs/media-v2/automation-sources.json`. |
| `public/demos/media/connected-factory.webp` | Generated derivative | 960×720 WebP for the factory system sample; same source/prompt record. |

## Distinct service gallery photographs — 2026-10-25

| File | Source | Licence / prompt |
|---|---|---|
| `src/assets/photos/software/device-testing-v2.jpg` | Generated · built-in imagegen | Illustrative responsive device testing; replaces the generic sticky-note meeting scene. Full prompt, source and export: `docs/media-v2/gallery-variety-sources.json`. |
| `src/assets/photos/software/field-inspection-v2.jpg` | Generated · built-in imagegen | Illustrative mobile inspection in a plant; replaces the café phone scene and its separately composited UI. Full prompt, source and export: `docs/media-v2/gallery-variety-sources.json`. |
| `src/assets/photos/robotics/inspection-rig-v2.jpg` | Generated · built-in imagegen | Illustrative circuit-board test fixture; replaces another soldering portrait. Full prompt, source and export: `docs/media-v2/gallery-variety-sources.json`. |

These are generated capability concepts, not client photos or real deployed systems. No Higgsfield calls. Versioned source assets preserve the earlier originals. Gallery exports are lazy responsive AVIF/WebP; full-size inspection uses WebP.

## Construction phase records — 2026-10-25

| File | Source | Licence / prompt |
|---|---|---|
| `public/demos/media/construction/foundation.webp` | Generated · built-in imagegen | Foundation snapshot edited from the shared handover reference. Full prompt/source/export: `docs/media-v2/construction-sources.json`. |
| `public/demos/media/construction/structure.webp` | Generated · built-in imagegen | Concrete frame snapshot edited from the shared handover reference. Full prompt/source/export: `docs/media-v2/construction-sources.json`. |
| `public/demos/media/construction/enclosure.webp` | Generated · built-in imagegen | Masonry/window installation snapshot edited from the shared handover reference. Full prompt/source/export: `docs/media-v2/construction-sources.json`. |
| `public/demos/media/construction/fitout.webp` | Generated · built-in imagegen | Late fit-out/services coordination snapshot edited from the shared handover reference. Full prompt/source/export: `docs/media-v2/construction-sources.json`. |
| `public/demos/media/construction/handover.webp` | Generated · built-in imagegen | Completed residential building used as the reference for all preceding stages. Full prompt/source/export: `docs/media-v2/construction-sources.json`. |

1600×900 WebP photographs are illustrative phase snapshots, not actual client/site evidence, verified engineering geometry or a filmed construction timelapse. Earlier phases use the same finished reference/camera/landmarks. Native system poster remains `src/assets/showcase/industry/formafield.png` at 2880×1800, captured from the local sample. No Higgsfield calls.

## Property/hotel journey concept covers — 2026-10-25

| File | Source | Licence / prompt |
|---|---|---|
| `public/demos/media/tours/property-cover.webp` | Generated · built-in imagegen | Fictional waterfront tower/arrival concept for the route review prototype. Full prompt, source path and export: `docs/media-v2/journey-covers.json`. |
| `public/demos/media/tours/hotel-cover.webp` | Generated · built-in imagegen | Fictional boutique lobby concept with a legible lift/corridor path. Full prompt, source path and export: `docs/media-v2/journey-covers.json`. |

These are static concept covers, not generated video, an actual filmed walkthrough, a famous landmark or client evidence. Tour footage is pending a source choice; current marketing cards are unchanged. See SPATIAL-JOURNEYS.md. No Higgsfield calls.
