# Automation examples

Show four complementary fields: customer replies/BPO, email/document processing, factory hardware integration and infrastructure delivery. Three new purpose-built UIs extend the preserved 40-screen collection to 43. The automation service also exposes these examples in its system tabs beside the existing integration flow and operations console.

The visual direction uses violet/teal for conversations, amber/blue for document handling, and cyan/orange for physical signals. Colours separate stages and help scanning; visible labels and actual state changes carry the meaning. This is a design intention, not a measured psychological or conversion claim. The new factory photograph replaces the office-only service-card/hero image and connects the physical equipment to the software preview.

## Workflows

- Customer operations: classify a sample order question, prepare a response, explicitly approve it and create an agent handoff. No email or chat is sent.
- Back office: index the email/attachment, extract example invoice fields, approve them and sync a sample ledger record. Posting stays disabled until review; no accounting API is connected. This does not represent a financial factoring product.
- Factory: trace a sample sensor event through the PLC/edge layer, sync a batch record to ERP and route an exception for review. Counts are labelled sample telemetry; no device is connected or controlled.
- Infrastructure: preserve the existing stack inspection and dry-deployment overview.

Finite hover/tap playback, one sandbox at a time, static reduced-motion outcomes, stop/replay, source isolation and cleanup follow INDUSTRY-DEMOS.md. The four automation cards form a two-column desktop grid, with tablet/phone layouts and no added global animation library.

## Media and source

`showcase-ui/automation-overviews.mjs` authors the three screens. `automation-actions.js` implements local state changes; the industry builder combines it into the public demo script. Existing screen filename contracts remain intact; new keys are `industry/support`, `industry/documents` and `industry/factory`.

Generated connected-cell photograph: `src/assets/photos/automation/connected-factory.jpg`, with a smaller `public/demos/media/connected-factory.webp` for the sample UI. Exact prompt, tool provenance and export details: `docs/media-v2/automation-sources.json`. The original office photograph remains available. Images and sample states are illustrative, not client evidence or measured results.

Run the screen builder, capture all 43 screens, verify, and browser checks at 375/768/1440 including accessible contrast, action outcomes, explicit review gates, native viewport fit, finite overview playback and main-site regressions. Review files stay gitignored under `docs/review/automation-examples`.
