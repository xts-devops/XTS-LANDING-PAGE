# Service image direction

Each section should explain a different part of the work. Avoid filling adjacent sections with another meeting, monitor-watching scene or soldering portrait. Capability photographs are generated illustrations, never evidence of client work.

## 2026-10-25 audit and revision

Reviewed all 27 existing photo sources together, their references in services/work content, the shared gallery and image delivery.

| Area | Role | Revision |
|---|---|---|
| Custom software gallery | Cross-device quality and real-world mobile use | Replace sticky-note planning and café phone imagery with a device testing bench and field inspection tablet. Equal 8:5 tiles balance the two ideas. |
| Robotics gallery | Prototype, manufacture, lab, controller, drone, device, verification | Replace the second soldering portrait with an electronics inspection fixture. Keep the first hands-on prototype scene as the human entry point. |
| Automation gallery | Monitoring and physical data capture | Control-room and scanning scenes remain distinct from the connected-factory hero and software-only workflow samples. |
| Home service links / service heroes | Service recognition during navigation | Shared service-cover images deliberately connect a home link with its destination; gallery images now add a different subject. |
| Home application examples | Industry use cases | Retail, warehouse, factory, office, clinic and field work each have their own source image. |

The new photographs contain their device displays within a single image. The retired café composition no longer mounts a separate UI overlay in the gallery. Real sample systems and their fullscreen workflow previews remain available in their own sections.

New files and complete built-in imagegen prompts: [gallery-variety-sources.json](media-v2/gallery-variety-sources.json). Versioned JPEGs retain the older originals. The three exports total about 602 KiB; Astro delivers lazy responsive AVIF/WebP. Gallery sizes now match its 901/561px grid breakpoints, the wide final robotics tile and 721px short-row breakpoint, avoiding undersized sources in wider cells or full-width requests for tablet half-columns. Inspector images remain contain-fit WebP with keyboard navigation and focus return.

Review captures, timing-free integrity checks and build logs: docs/review/image-variety (gitignored).
