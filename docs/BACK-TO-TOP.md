# Back to top

The shared return control is fixed at the lower-right viewport edge when the visitor approaches the footer. It retains visible text on desktop and a labelled 48px circular target on mobile, with native safe-area spacing. An IntersectionObserver owns its availability; offscreen controls are hidden/inert and modal dialogs hide it. Focus or an active return keeps it available until focus transfers. Footer-bottom spacing reserves room so it does not obscure legal links. No-JS visitors retain the inline native anchor.

A fixed 550ms cubic ease uses the existing Lenis engine or a bounded touch/native scroll-frame fallback. Reduced motion jumps instantly. New user input, hidden documents or a preference change cancels safely. Finish restores focus to the header brand and removes stale section hashes without adding history. A return flag resets the robotics transition directly instead of reversing it. No idle animation loop, dependencies or media.

Coverage: all seven main routes, mobile/desktop placement, near-footer visibility, legal-link clearance, reduced motion, normal timing, native touch, interruption/focus, no-JS and existing service navigation/motion.
