# Header balance

The original desktop header measured 77px high. Its small wordmark, quiet outline action and equally separated ungrouped links gave the impression of excess space. The revision keeps the page's content alignment grid and makes the three elements visually stronger.

The header-only logo uses a 48px mark, larger primary wordmark and clearer secondary text. Navigation links form one outlined capsule with a gold-tinted current section and distinct hover/focus states. On desktop, equal outer grid columns center this group between the brand and a filled consultation action. Below the CTA breakpoint, the remaining navigation aligns right. The header is 73px including its border; mobile is 69px. The line separating navigation from the page is visible from the start.

Mobile retains the native details menu, now with a clear pill control. Its panel remains outside the header's flow, so opening it does not shift the page. Escape, outside interaction, link selection and the expanded state retain the existing behavior. The summary and navigation actions remain at least 44px high. Header spacing still uses the shared height variable and anchor controller, preserving service tab and section offsets.

No new logo artwork, JavaScript, media or dependency is introduced. Acceptance covers 320/375/768/1024/1440/1920 on home and a service deep link: no group collisions, correct vertical alignment, bounded height and no page overflow, plus mobile menu state/selection and existing accessibility/anchor/intro regressions. Responsive review captures and before/after header crops are under docs/review/header-balance (gitignored).
