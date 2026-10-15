/** Motion tokens — mirror of src/styles/tokens.css (MOTION §2). Seconds, for GSAP. */
export const DUR = { 1: 0.16, 2: 0.32, 3: 0.64, 4: 1.1 } as const;
export const EASE = {
  out: 'expo.out', // ≈ cubic-bezier(.16,1,.3,1)
  inout: 'power3.inOut', // ≈ cubic-bezier(.65,0,.35,1)
} as const;
