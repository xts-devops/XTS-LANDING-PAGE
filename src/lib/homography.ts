/**
 * CSS matrix3d() that maps a w×h box onto a four-corner quad (perspective warp).
 * Used to place a product screen onto a phone photographed at an angle.
 * Quad order: top-left, top-right, bottom-right, bottom-left (px in the same space).
 */
export type Point = readonly [number, number];
export type Quad = readonly [Point, Point, Point, Point];

/** Solve the 8x8 linear system for a projective map, Gaussian elimination. */
function solve(a: number[][], b: number[]): number[] {
  const n = b.length;
  const m = a.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c++) {
    let pivot = c;
    for (let r = c + 1; r < n; r++)
      if (Math.abs(m[r][c]) > Math.abs(m[pivot][c])) pivot = r;
    [m[c], m[pivot]] = [m[pivot], m[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = m[r][c] / m[c][c];
      for (let k = c; k <= n; k++) m[r][k] -= f * m[c][k];
    }
  }
  return m.map((row, i) => row[n] / row[i]);
}

export function quadMatrix3d(w: number, h: number, quad: Quad): string {
  const src: Point[] = [
    [0, 0],
    [w, 0],
    [w, h],
    [0, h],
  ];
  const a: number[][] = [];
  const b: number[] = [];
  src.forEach(([x, y], i) => {
    const [u, v] = quad[i];
    a.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    b.push(u);
    a.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    b.push(v);
  });
  const [p, q, r, s, t, o, g, k] = solve(a, b);
  // Column-major: x' = (p x + q y + r) / (g x + k y + 1), y' = (s x + t y + o) / (…)
  const m = [p, s, 0, g, q, t, 0, k, 0, 0, 1, 0, r, o, 0, 1];
  return `matrix3d(${m.map((n) => +n.toFixed(8)).join(',')})`;
}
