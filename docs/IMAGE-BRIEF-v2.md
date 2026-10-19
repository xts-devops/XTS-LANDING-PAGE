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
| _(fill as added)_ | | |
