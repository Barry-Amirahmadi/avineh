/**
 * Placeholder art direction generator.
 *
 * There is no atelier photography, because there is no atelier. Rather than
 * pulling unrelated stock images, every image slot is filled with a generated
 * "cloth study": a defocused tonal field in the brand palette with film grain
 * and a single soft light source coming from the top-right, which is the RTL
 * reading origin.
 *
 * They share one treatment, so the page reads as a single art-directed shoot.
 * Each file maps 1:1 onto a real photograph later — same path, same ratio.
 *
 * TWO RULES THIS FILE EXISTS TO ENFORCE:
 *
 * 1. **Every catalogue primary shares one canvas and one subject geometry**,
 *    varying only in tone and grain seed. The template this derives from
 *    shipped four different canvases and it read as mismatched photography
 *    rather than as editorial variety. Only the single `feature` gown departs
 *    from the shared frame, and it departs in the ratio the content declares.
 *
 * 2. **A gown's `views` are the same gown from another angle**, not another
 *    gown. Same tone, an adjacent seed, and the mass shifted and re-proportioned
 *    rather than recoloured — which is what turning an object actually does to
 *    its silhouette.
 *
 *   node scripts/generate-media.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "public", "media");
mkdirSync(outDir, { recursive: true });

/** Brand grounds — kept in sync with src/app/tokens.css */
const GROUND = {
  harir: "#F4F2F1",
  harirDeep: "#E6E2E1",
  makhmal: "#1C1418",
};

/**
 * The one canvas every catalogue gown is shot on: 1050×1400, which is `3/4`.
 * A gown is photographed standing, so the frame is taller than it is wide and
 * the subject is a single vertical mass a little below centre.
 */
const CATALOGUE = { w: 1050, h: 1400 };
/** The subject geometry that goes with it. Shared by all nine primaries. */
const STANDING = [0.5, 0.56, 0.44];

/**
 * The `feature` gown, and only it, sits in a `4/5` frame — its content declares
 * that ratio because `feature` spans the full grid width, where a `3/4` frame
 * would push the rest of the page off the screen.
 */
const FEATURE = { w: 1100, h: 1375 };

/** Cloth colours, in step with each gown's `tone` in src/content/products.ts */
const TONE = {
  sepidar: "#D8D2C6",
  mahtab: "#C8C6C9",
  niloofar: "#BFC1BC",
  shabnam: "#D3CFC8",
  nastaran: "#C4A9A2",
  termeh: "#A88B6E",
  shabaneh: "#3A3238",
  aazin: "#6B5560",
  sayeh: "#4A4148",
};

/**
 * One gown: the standing primary plus its extra views.
 *
 * The views keep the gown's own tone and take seeds adjacent to its primary's,
 * so the grain reads as frames from one roll. `mass` narrows and shifts rather
 * than changing colour — a back view of the same gown is the same cloth seen
 * from a quarter turn away, and the silhouette is what moves.
 */
const gown = (name, tone, seed, views, frame = CATALOGUE) => {
  const shapes = {
    back: [0.48, 0.58, 0.4],
    detail: [0.52, 0.44, 0.62],
    hem: [0.5, 0.72, 0.52],
  };
  return [
    { name: `gown-${name}`, ...frame, tone, ground: GROUND.makhmal, mass: STANDING, seed },
    ...views.map((view, i) => ({
      name: `gown-${name}-${view}`,
      ...frame,
      tone,
      ground: GROUND.makhmal,
      mass: shapes[view],
      seed: seed + i + 1,
    })),
  ];
};

/**
 * A slot = one image on the page.
 * `tone` is the dominant colour of the study; `ground` is what it sits on;
 * `mass` positions the defocused subject (0–1 in each axis) and sizes it.
 */
const slots = [
  // — Hero —
  { name: "hero-main", w: 1200, h: 1600, tone: "#D8D2C6", ground: GROUND.harirDeep, mass: [0.52, 0.58, 0.44], seed: 3 },
  { name: "hero-inset", w: 700, h: 700, tone: "#A88B6E", ground: GROUND.harir, mass: [0.44, 0.5, 0.62], seed: 11 },

  // — The nine gowns, each with its own views —
  ...gown("sepidar", TONE.sepidar, 100, ["back", "detail"]),
  ...gown("mahtab", TONE.mahtab, 110, ["back", "detail", "hem"]),
  ...gown("niloofar", TONE.niloofar, 120, ["back", "detail"], FEATURE),
  ...gown("shabnam", TONE.shabnam, 130, ["back", "detail"]),
  ...gown("nastaran", TONE.nastaran, 140, ["back", "detail"]),
  ...gown("termeh", TONE.termeh, 150, ["back", "detail", "hem"]),
  ...gown("shabaneh", TONE.shabaneh, 160, ["back", "detail"]),
  ...gown("aazin", TONE.aazin, 170, ["back", "detail"]),
  ...gown("sayeh", TONE.sayeh, 180, ["back", "detail"]),

  // — Brand / values —
  { name: "values-texture", w: 1050, h: 1400, tone: "#9A7870", ground: GROUND.harirDeep, mass: [0.48, 0.54, 0.58], seed: 13 },

  /* — Gallery — eight plates on one `4/5` canvas. The gallery is not shooting
       gowns, it is shooting cloth, hands and the room, so it keeps its own
       single frame rather than borrowing the catalogue's. */
  { name: "gallery-01", w: 1000, h: 1250, tone: "#DAD5CC", ground: GROUND.harirDeep, mass: [0.5, 0.52, 0.52], seed: 41 },
  { name: "gallery-02", w: 1000, h: 1250, tone: "#C3BEB8", ground: GROUND.harir, mass: [0.46, 0.48, 0.6], seed: 43 },
  { name: "gallery-03", w: 1000, h: 1250, tone: "#A88B6E", ground: GROUND.makhmal, mass: [0.54, 0.56, 0.5], seed: 47 },
  { name: "gallery-04", w: 1000, h: 1250, tone: "#CFC8BF", ground: GROUND.harir, mass: [0.5, 0.5, 0.42], seed: 53 },
  { name: "gallery-05", w: 1000, h: 1250, tone: "#6B5560", ground: GROUND.harirDeep, mass: [0.48, 0.54, 0.54], seed: 59 },
  { name: "gallery-06", w: 1000, h: 1250, tone: "#9A7870", ground: GROUND.makhmal, mass: [0.56, 0.5, 0.46], seed: 61 },
  { name: "gallery-07", w: 1000, h: 1250, tone: "#E0DAD1", ground: GROUND.harir, mass: [0.44, 0.5, 0.56], seed: 67 },
  { name: "gallery-08", w: 1000, h: 1250, tone: "#C8C6C9", ground: GROUND.harirDeep, mass: [0.54, 0.62, 0.48], seed: 71 },

  // — Closing CTA —
  { name: "cta-field", w: 1920, h: 1000, tone: "#745952", ground: GROUND.makhmal, mass: [0.34, 0.58, 0.78], seed: 73 },
];

/* `name` is destructured off by the caller, not used in the markup. */
const svg = ({ w, h, tone, ground, mass, seed }) => {
  const [mx, my, msize] = mass;
  const cx = w * mx;
  const cy = h * my;
  const rx = Math.min(w, h) * msize * 0.5;
  const ry = rx * 1.28;
  const blur = Math.min(w, h) * 0.13;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  <defs>
    <radialGradient id="light" cx="78%" cy="18%" r="88%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.34"/>
      <stop offset="52%" stop-color="#FFFFFF" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.18"/>
    </radialGradient>
    <linearGradient id="fall" x1="1" y1="0" x2="0.1" y2="1">
      <stop offset="0%" stop-color="${tone}" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="${tone}" stop-opacity="0.34"/>
    </linearGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="${blur.toFixed(1)}"/>
    </filter>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="${seed}" result="n"/>
      <feColorMatrix type="saturate" values="0" in="n" result="g"/>
      <feComponentTransfer in="g" result="gt">
        <feFuncA type="linear" slope="0.5"/>
      </feComponentTransfer>
      <feBlend in="SourceGraphic" in2="gt" mode="overlay"/>
    </filter>
  </defs>

  <g filter="url(#grain)">
    <rect width="${w}" height="${h}" fill="${ground}"/>
    <rect width="${w}" height="${h}" fill="url(#fall)" opacity="0.55"/>
    <g filter="url(#soft)">
      <ellipse cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" rx="${rx.toFixed(0)}" ry="${ry.toFixed(0)}" fill="${tone}" opacity="0.85"/>
      <ellipse cx="${(cx + rx * 0.42).toFixed(0)}" cy="${(cy - ry * 0.46).toFixed(0)}" rx="${(rx * 0.5).toFixed(0)}" ry="${(ry * 0.34).toFixed(0)}" fill="#FFFFFF" opacity="0.26"/>
      <ellipse cx="${(cx - rx * 0.62).toFixed(0)}" cy="${(cy + ry * 0.5).toFixed(0)}" rx="${(rx * 0.7).toFixed(0)}" ry="${(ry * 0.4).toFixed(0)}" fill="#000000" opacity="0.2"/>
    </g>
    <rect width="${w}" height="${h}" fill="url(#light)"/>
  </g>
</svg>
`;
};

let count = 0;
for (const slot of slots) {
  writeFileSync(join(outDir, `${slot.name}.svg`), svg(slot), "utf8");
  count += 1;
}
console.log(`generated ${count} placeholder studies → public/media/`);
