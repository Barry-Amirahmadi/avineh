/**
 * Placeholder art direction generator.
 *
 * There is no atelier photography, because there is no atelier. Rather than
 * pulling unrelated stock images, every image slot is filled with a generated
 * study drawn in the brand palette.
 *
 * -----------------------------------------------------------------------------
 * WHY THIS FILE WAS REWRITTEN
 *
 * The previous version drew a defocused ellipse behind a blur filter. Measured
 * on the shipped site, images were 39–67% of the area of every page except the
 * about page — so more than half of what a visitor saw was grey fog, and no
 * amount of palette or typography work could compensate for that. A placeholder
 * does not have to be a photograph, but it does have to be *the shape of the
 * thing*, or the page is not a design of a gown atelier, it is a design of
 * rectangles.
 *
 * So these are gowns: a real silhouette — neckline, bodice, waist, skirt, hem,
 * train — with satin sheen along the fall of the cloth and folds that follow
 * the flare. Each gown's proportions are its own, so nine of them do not read
 * as one shape recoloured nine times.
 *
 * THREE RULES THIS FILE EXISTS TO ENFORCE:
 *
 * 1. **One canvas and one camera distance for every catalogue primary.** Only
 *    the single `feature` gown departs from the shared frame, and it departs in
 *    the ratio its content declares. Four different canvases is what made the
 *    source template read as mismatched photography rather than as one shoot.
 *
 * 2. **A gown's `views` are the same gown.** Not a different gown, and not a
 *    different drawing — the back, the detail and the hem are the *same path*
 *    with the camera moved, which is what cropping into one drawing does and
 *    what re-rolling a random shape does not.
 *
 * 3. **No invented numbers anywhere.** These are studies, not photographs of
 *    garments that exist, and nothing here implies otherwise.
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
  shab: "#12131A",
  shabDeep: "#0B0C11",
  varagh: "#E2E5E3",
  varaghDeep: "#D2D6D4",
  morvarid: "#141E28",
  sabz: "#132318",
  zereshk: "#231017",
};

/**
 * The one canvas every catalogue gown is shot on: 1050×1400, which is `3/4`.
 * A gown is photographed standing, so the frame is taller than it is wide.
 */
const CATALOGUE = { w: 1050, h: 1400 };

/**
 * How much of the frame the figure fills.
 *
 * At 1.0 the gown is drawn at the width of a 3:4 box of the frame's height,
 * which left a small dress marooned in a large empty ground — and an empty
 * ground is indistinguishable from an image that failed to load. 1.32 brings
 * the shoulders and hem close enough to the edges that the frame reads as a
 * crop of a figure rather than as a box with something in the middle.
 */
const FILL = 1.32;

/**
 * The `feature` gown, and only it, sits in a `4/5` frame — its content declares
 * that ratio because `feature` spans the full grid width, where a `3/4` frame
 * would push the rest of the page off the screen.
 */
const FEATURE = { w: 1100, h: 1375 };

/** Deterministic noise, so a rebuild produces byte-identical files. */
const rng = (seed) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

/**
 * Every derived number of one silhouette, in one place.
 *
 * It lives here rather than inside each drawing function because it did not,
 * and they drifted: `folds` ended its fan at a hardcoded `h * 0.96` while the
 * body ended wherever `length` and `train` put it. On a floor-length gown the
 * two agreed by coincidence. On the short dress the copy describes, the folds
 * would have run a third of the frame below the hem.
 *
 * Widths are fractions of `unit`, not of `w`. `unit` is the width of a 3:4 box
 * of this height, so a gown keeps human proportions on any canvas — the hero
 * frame is 4:3 and would otherwise draw a figure half as wide again as the
 * catalogue's. FILL then sizes the figure to the frame.
 *
 *   shoulder  width across the shoulders
 *   waist     width at the waist, and `waistY`, how high the waist sits
 *   hem       width at the hem — this is what makes a column a column and a
 *             ballgown a ballgown
 *   length    where the hem falls, as a fraction of the frame: 0.965 floor,
 *             ~0.84 midi, ~0.70 above the knee
 *   drop      the unit the neckline's depth is measured in
 */
function geom({ w, h, shoulder, waist, waistY, hem, length = 0.965, train = 0 }) {
  const unit = h * 0.75 * FILL;
  return {
    cx: w / 2,
    unit,
    shoulderY: h * 0.125,
    wy: h * waistY,
    hemY: h * (length - train * 0.02),
    sx: (unit * shoulder) / 2,
    wx: (unit * waist) / 2,
    hx: (unit * hem) / 2,
  };
}

/**
 * The necklines.
 *
 * This is the single change that turned nine pictures of one trapezoid into
 * nine gowns. Every silhouette used to be closed with the same shallow arc
 * across the shoulders, which at this scale reads as a flat horizontal cut — so
 * the catalogue showed nine identical shapes underneath nine texts describing a
 * column, a ballgown, a short dress, a one-shoulder and a closed back. The
 * neckline is the part of a gown a reader actually recognises, and it is where
 * the difference between these nine lives.
 *
 * Each returns the path from the RIGHT shoulder to the LEFT, plus how far below
 * the shoulder line the left end sits — only the asymmetric one is non-zero.
 *
 * `d` is the gown's `drop` in canvas units, and every depth is a multiple of
 * it, so one number per gown tunes a whole neckline rather than four.
 */
const NECKLINES = {
  /** Bandeau: nearly straight, with just enough curve to be cloth. */
  straight: ({ cx, sx, shoulderY }, d, n) => ({
    d: `Q ${n(cx)} ${n(shoulderY + d * 0.9)} ${n(cx - sx)} ${n(shoulderY)}`,
    leftY: 0,
  }),
  /** Two cups meeting at a centre peak. The shape most bridal necklines are. */
  sweetheart: ({ cx, sx, shoulderY }, d, n) => ({
    d:
      `C ${n(cx + sx * 0.82)} ${n(shoulderY + d * 1.45)} ${n(cx + sx * 0.3)} ${n(shoulderY + d * 1.6)} ${n(cx)} ${n(shoulderY + d * 0.5)} ` +
      `C ${n(cx - sx * 0.3)} ${n(shoulderY + d * 1.6)} ${n(cx - sx * 0.82)} ${n(shoulderY + d * 1.45)} ${n(cx - sx)} ${n(shoulderY)}`,
    leftY: 0,
  }),
  /** A deep V, softened — straight sides would read as an envelope flap. */
  v: ({ cx, sx, shoulderY }, d, n) => ({
    d:
      `Q ${n(cx + sx * 0.5)} ${n(shoulderY + d * 1.3)} ${n(cx)} ${n(shoulderY + d * 3.4)} ` +
      `Q ${n(cx - sx * 0.5)} ${n(shoulderY + d * 1.3)} ${n(cx - sx)} ${n(shoulderY)}`,
    leftY: 0,
  }),
  /** Closed to the collarbone: the line rises ABOVE the shoulders. */
  high: ({ cx, sx, shoulderY }, d, n) => ({
    d: `Q ${n(cx)} ${n(shoulderY - d * 1.5)} ${n(cx - sx)} ${n(shoulderY)}`,
    leftY: 0,
  }),
  /** One shoulder: a single diagonal falling across the chest. */
  one: ({ cx, sx, shoulderY }, d, n) => ({
    d: `C ${n(cx + sx * 0.42)} ${n(shoulderY + d * 1.0)} ${n(cx - sx * 0.08)} ${n(shoulderY + d * 2.5)} ${n(cx - sx)} ${n(shoulderY + d * 3.6)}`,
    leftY: d * 3.6,
  }),
};

/**
 * One gown silhouette, as an SVG path.
 *
 * Drawn from the shoulders down and mirrored about the centre line, except
 * where the neckline says otherwise. Every number is a fraction of the canvas,
 * so the same shape crops correctly at any size.
 */
function gownPath({ w, h, drop, neck = "straight", ...rest }) {
  const g = geom({ w, h, ...rest });
  const { cx, shoulderY, wy, hemY, sx, wx, hx } = g;
  const n = (v) => v.toFixed(1);
  const line = NECKLINES[neck](g, h * drop, n);
  // The skirt's control points are fractions of the skirt's OWN length. As
  // fractions of the frame they produced a short dress whose flare began below
  // its hem.
  const fall = hemY - wy;

  return [
    `M ${n(cx + sx)} ${n(shoulderY)}`,
    line.d,
    // Left side: bodice in to the waist, then the skirt flaring out to the hem.
    `C ${n(cx - sx * 0.92)} ${n(wy - h * 0.09)} ${n(cx - wx * 1.05)} ${n(wy - h * 0.04)} ${n(cx - wx)} ${n(wy)}`,
    `C ${n(cx - wx * 1.25)} ${n(wy + fall * 0.28)} ${n(cx - hx * 0.9)} ${n(hemY - fall * 0.32)} ${n(cx - hx)} ${n(hemY)}`,
    // The hem, drawn as a shallow arc — cloth touching the floor is never a
    // straight line, and a flat hem is the single tell of a drawn gown.
    `Q ${n(cx)} ${n(hemY + h * 0.035)} ${n(cx + hx)} ${n(hemY)}`,
    // Right side, back up to the shoulder.
    `C ${n(cx + hx * 0.9)} ${n(hemY - fall * 0.32)} ${n(cx + wx * 1.25)} ${n(wy + fall * 0.28)} ${n(cx + wx)} ${n(wy)}`,
    `C ${n(cx + wx * 1.05)} ${n(wy - h * 0.04)} ${n(cx + sx * 0.92)} ${n(wy - h * 0.09)} ${n(cx + sx)} ${n(shoulderY)}`,
    "Z",
  ].join(" ");
}

/**
 * Straps, drawn over the shoulder line rather than cut into the body.
 *
 * They exist because a strapless silhouette floating on a dark ground has
 * nothing at its top edge to say which way up it is. One pair of straps and the
 * shape becomes a garment on a body.
 *
 * Width is content here, not styling: آذین's copy says its straps are wider
 * than the rest of the collection's, because the gown is heavy enough to need
 * them to hold.
 */
function strapPaths({ w, h, cloth, strap, neck, ...rest }) {
  if (!strap) return "";
  const { cx, shoulderY, sx, unit } = geom({ w, h, ...rest });
  const n = (v) => v.toFixed(1);
  const width = unit * strap;
  /* Short and close to vertical. The first version ran them up and inward to
     `sx * 0.46` at `unit * 0.155` above the shoulder, which put both straps on
     a converging line toward a point off the top of the frame — a halter tied
     at a neck that is not drawn, on five of the nine gowns. A strap only has
     to clear the shoulder line to say which way up the garment is. */
  const top = shoulderY - unit * 0.05;
  /* The strap's foot runs well INSIDE the bodice rather than stopping on the
     shoulder line. Every neckline except `high` dips below that line, so a
     strap that ended on it left a slot of dark ground between itself and the
     cloth — five of the nine gowns wore a pair of floating tabs. Straps are
     drawn over the body and unclipped, so the overlap simply merges. */
  const foot = shoulderY + unit * 0.1;
  // The asymmetric gown gets one, on the side its neckline rises to.
  const sides = neck === "one" ? [1] : [1, -1];

  return sides
    .map((s) => {
      /* The strap CONTINUES the bodice's own shoulder edge; it does not start
         inboard of it. Set inboard, it left the bodice corner standing outside
         it as a thin spike with the neckline's dip cutting between the two —
         two horns and a notch, most visible on the hero. */
      const base = cx + s * sx;
      const tip = cx + s * sx * 0.86;
      const d =
        `M ${n(base)} ${n(foot)} C ${n(base - s * width * 0.1)} ${n(shoulderY - unit * 0.02)} ${n(tip + s * width * 0.3)} ${n(top + unit * 0.02)} ${n(tip)} ${n(top)} ` +
        `L ${n(tip - s * width)} ${n(top)} C ${n(tip - s * width * 0.7)} ${n(top + unit * 0.02)} ${n(base - s * width * 1.3)} ${n(shoulderY - unit * 0.02)} ${n(base - s * width * 1.2)} ${n(foot)} Z`;
      /* Two passes, the same as the body gets: the cloth, then the sheen over
         it. Filled flat, a strap is darker than the lit gown it belongs to and
         reads as a separate dark block — which is how آذین's wide pair and
         نسترن's sleeves both came out. */
      return `<path d="${d}" fill="${cloth}"/><path d="${d}" fill="url(#sheen-user)"/>`;
    })
    .join("\n      ");
}

/**
 * Long sleeves, for the one gown whose copy promises them.
 *
 * نسترن's whole argument is that covering more of the body need not look
 * heavier, and that the answer was a narrow sleeve with no gather in it. So the
 * sleeve is drawn narrow and straight. The drawing is the claim.
 */
function sleevePaths({ w, h, cloth, sleeve, ...rest }) {
  if (!sleeve) return "";
  const { cx, shoulderY, wy, sx, unit } = geom({ w, h, ...rest });
  const n = (v) => v.toFixed(1);
  /* Mid-forearm, not past the hem. At `0.52` the cuffs finished BELOW the
     midi hem, so the two sleeves read as panels hanging either side of the
     dress rather than as arms in it. */
  const wristY = wy + unit * 0.30;

  return [1, -1]
    .map((s) => {
      const shoulderOuter = cx + s * sx;
      const shoulderInner = cx + s * sx * 0.70;
      const wristOuter = cx + s * sx * 0.99;
      const wristInner = cx + s * sx * 0.82;
      const d =
        `M ${n(shoulderOuter)} ${n(shoulderY)} C ${n(shoulderOuter + s * unit * 0.03)} ${n(wy - h * 0.04)} ${n(wristOuter)} ${n(wy + h * 0.03)} ${n(wristOuter)} ${n(wristY)} ` +
        `Q ${n(cx + s * sx * 0.94)} ${n(wristY + h * 0.012)} ${n(wristInner)} ${n(wristY)} C ${n(wristInner)} ${n(wy + h * 0.03)} ${n(shoulderInner)} ${n(wy - h * 0.04)} ${n(shoulderInner)} ${n(shoulderY + h * 0.02)} Z`;
      return `<path d="${d}" fill="${cloth}"/><path d="${d}" fill="url(#sheen-user)"/>`;
    })
    .join("\n      ");
}

/** The train, pooling behind the hem on the side the light falls away from. */
function trainPath({ w, h, train, ...rest }) {
  if (!train) return "";
  const { cx, hemY, hx } = geom({ w, h, train, ...rest });
  const n = (v) => v.toFixed(1);
  return `M ${n(cx - hx * 0.55)} ${n(hemY - h * 0.05)} C ${n(cx - hx * 1.15)} ${n(hemY - h * 0.01)} ${n(cx - hx * 1.35)} ${n(hemY + h * 0.012)} ${n(cx - hx * 1.1)} ${n(hemY + h * 0.026)} C ${n(cx - hx * 0.75)} ${n(hemY + h * 0.036)} ${n(cx - hx * 0.3)} ${n(hemY + h * 0.03)} ${n(cx)} ${n(hemY + h * 0.018)} Z`;
}

/** The fall of the skirt: a fan of soft highlights from the waist toward the hem. */
function folds({ w, h, count, rand, ...rest }) {
  const { cx, wy, hemY, wx, hx } = geom({ w, h, ...rest });
  const n = (v) => v.toFixed(1);
  const fall = hemY - wy;
  const out = [];

  for (let i = 0; i < count; i += 1) {
    // -1 … 1 across the skirt, with a little jitter so the fan is not mechanical.
    const t = ((i + 0.5) / count) * 2 - 1 + (rand() - 0.5) * 0.1;
    const topX = cx + wx * t * 0.8;
    const botX = cx + hx * t;
    // Each fold stops short of the hem by a different amount, as a fraction of
    // the skirt's own length — a fraction of the FRAME ran past the hem of the
    // short dress and stopped halfway down the ballgown.
    const stop = hemY - fall * (0.04 + rand() * 0.14);
    const bend = (rand() - 0.5) * w * 0.05;
    out.push(
      `<path d="M ${n(topX)} ${n(wy + h * 0.01)} C ${n(topX + bend)} ${n(wy + fall * 0.34)} ${n(botX - bend)} ${n(stop - fall * 0.34)} ${n(botX)} ${n(stop)}" fill="none" stroke="url(#fold)" stroke-width="${(w * (0.004 + rand() * 0.006)).toFixed(1)}" stroke-linecap="round"/>`,
    );
  }
  return out.join("\n      ");
}

/**
 * What the back view shows.
 *
 * Every gown gets its centre seam, which is the thing that tells a reader this
 * is the same dress from behind and not a second dress. شبانه gets more than
 * that: its copy says the front is completely closed and the whole decision of
 * the garment is at the back, and a back view identical to the other eight
 * would have made that sentence false on the page that prints it.
 *
 * The cut is painted in the GROUND colour rather than cut out of the path,
 * because the body is already a clip region for the folds and the beading — a
 * second hole in it would take those with it.
 */
function backDetail({ w, h, ground, openBack, n, ...rest }) {
  const { cx, shoulderY, wy, unit } = geom({ w, h, ...rest });
  const seam = `<path d="M ${n(cx)} ${n(h * 0.2)} L ${n(cx)} ${n(h * 0.93)}" stroke="#FFFFFF" stroke-opacity="0.18" stroke-width="${(w * 0.003).toFixed(1)}"/>`;
  if (!openBack) return seam;

  const halfTop = unit * 0.085;
  const point = wy + unit * 0.06;
  return (
    `<path d="M ${n(cx - halfTop)} ${n(shoulderY - h * 0.01)} C ${n(cx - halfTop * 0.8)} ${n(point - unit * 0.22)} ${n(cx - halfTop * 0.3)} ${n(point - unit * 0.08)} ${n(cx)} ${n(point)} ` +
    `C ${n(cx + halfTop * 0.3)} ${n(point - unit * 0.08)} ${n(cx + halfTop * 0.8)} ${n(point - unit * 0.22)} ${n(cx + halfTop)} ${n(shoulderY - h * 0.01)} Z" fill="${ground}"/>` +
    seam
  );
}

/**
 * Hand beading.
 *
 * `zone` is content, not styling. ترمه's entire argument is that its handwork
 * is on the bodice and its skirt is left bare; آذین's is that it is beaded over
 * every surface and is heavy because of it. Two gowns making opposite claims,
 * and both were drawn identically before this existed.
 */
function beading({ w, h, rand, count, zone = "bodice", ...rest }) {
  const { cx, shoulderY, wy, hemY, unit } = geom({ w, h, ...rest });
  const { shoulder, waist, hem } = rest;
  const n = (v) => v.toFixed(1);
  const top = shoulderY + h * 0.02;
  const bottom = zone === "all" ? hemY : wy;
  const out = [];

  for (let i = 0; i < count; i += 1) {
    const p = rand();
    const y = top + (bottom - top) * p;
    // The scatter has to follow the silhouette, which narrows to the waist and
    // then opens again — sampling a rectangle puts beads outside the cloth.
    const q = y <= wy ? (y - top) / (wy - top || 1) : (y - wy) / (bottom - wy || 1);
    const width = y <= wy ? shoulder + (waist - shoulder) * q : waist + (hem - waist) * q;
    const halfWidth = (unit * width) / 2;
    const x = cx + (rand() - 0.5) * 2 * halfWidth * 0.82;
    out.push(
      `<circle cx="${n(x)}" cy="${n(y)}" r="${(w * (0.0016 + rand() * 0.0026)).toFixed(2)}" fill="#FFFFFF" opacity="${(0.18 + rand() * 0.4).toFixed(2)}"/>`,
    );
  }
  return out.join("\n      ");
}

/**
 * One study.
 *
 * `crop` is what makes a view a view: the drawing is always the same, and a
 * view simply narrows the viewBox onto part of it. Moving the camera rather
 * than re-rolling the shape is the whole reason a gown's three views read as
 * three photographs of one dress.
 */
function study({ w, h, ground, cloth, gown, seed, crop, beads = 0, backSeam = false }) {
  const parts = { w, h, cloth, ground, ...gown };
  const rand = rng(seed);
  const view = crop ?? { x: 0, y: 0, w, h };
  const path = gownPath({ w, h, ...gown });
  const train = trainPath({ w, h, ...gown });
  const n = (v) => v.toFixed(1);

  /* The intrinsic size is the CROP's size, never the canvas's. The drawing
     always happens in canvas coordinates — that is what makes a view the same
     gown — so a cropped file whose width/height still described the whole
     canvas would declare an aspect ratio it does not have, and the browser
     would letterbox or re-crop it to fit. That is exactly how the hero inset
     came out as an empty rectangle: a 360×360 window into a 1600×1200 drawing,
     published as though it were 700×700. */
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${n(view.w)}" height="${n(view.h)}" viewBox="${n(view.x)} ${n(view.y)} ${n(view.w)} ${n(view.h)}" role="img">
  <defs>
    <linearGradient id="cloth" x1="0.82" y1="0" x2="0.15" y2="1">
      <stop offset="0%" stop-color="${cloth}" stop-opacity="1"/>
      <stop offset="46%" stop-color="${cloth}" stop-opacity="0.82"/>
      <stop offset="100%" stop-color="${cloth}" stop-opacity="0.52"/>
    </linearGradient>
    <linearGradient id="sheen" x1="0.9" y1="0.05" x2="0.35" y2="0.95">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.34"/>
      <stop offset="30%" stop-color="#FFFFFF" stop-opacity="0.06"/>
      <stop offset="62%" stop-color="#FFFFFF" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.22"/>
    </linearGradient>
    <!-- The same satin, mapped to the CANVAS instead of to each shape's own
         box. The body wears this gradient stretched across the whole frame, so
         a strap wearing it stretched across its own few pixels gets the entire
         light-to-dark run compressed into itself, and comes out darker than the
         cloth it is sewn to — آذین's wide pair read as two epaulettes. Light
         falls on a garment from one direction, not from each piece's corner.
         NOTE: no backticks in here. This comment is inside a template literal. -->
    <linearGradient id="sheen-user" gradientUnits="userSpaceOnUse" x1="${n(w * 0.9)}" y1="${n(h * 0.05)}" x2="${n(w * 0.35)}" y2="${n(h * 0.95)}">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.34"/>
      <stop offset="30%" stop-color="#FFFFFF" stop-opacity="0.06"/>
      <stop offset="62%" stop-color="#FFFFFF" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.22"/>
    </linearGradient>
    <linearGradient id="fold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.26"/>
      <stop offset="70%" stop-color="#FFFFFF" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="key" cx="80%" cy="10%" r="92%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.13"/>
      <stop offset="55%" stop-color="#FFFFFF" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.30"/>
    </radialGradient>
    <radialGradient id="floor" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="body"><path d="${path}"/></clipPath>
    <filter id="soften" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="${(w * 0.0016).toFixed(2)}"/>
    </filter>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="${seed}" result="n"/>
      <feColorMatrix type="saturate" values="0" in="n" result="g"/>
      <feComponentTransfer in="g" result="gt">
        <feFuncA type="linear" slope="0.18"/>
      </feComponentTransfer>
      <feBlend in="SourceGraphic" in2="gt" mode="overlay"/>
    </filter>
  </defs>

  <g filter="url(#grain)">
    <rect x="0" y="0" width="${w}" height="${h}" fill="${ground}"/>

    <!-- The cloth the gown is standing on. -->
    <ellipse cx="${n(w / 2)}" cy="${n(h * 0.965)}" rx="${n(h * 0.75 * FILL * 0.42)}" ry="${n(h * 0.032)}" fill="url(#floor)"/>

    <g filter="url(#soften)">
      ${train ? `<path d="${train}" fill="${cloth}" opacity="0.55"/>` : ""}
      ${sleevePaths(parts)}
      <path d="${path}" fill="url(#cloth)"/>

      <g clip-path="url(#body)">
        ${folds({ ...parts, count: 7, rand })}
        ${beads ? beading({ ...parts, rand, count: beads, zone: gown.beadZone }) : ""}
        ${backSeam ? backDetail({ ...parts, n }) : ""}
        <rect x="0" y="0" width="${w}" height="${h}" fill="url(#sheen)"/>
      </g>

      ${strapPaths(parts)}
    </g>

    <rect x="0" y="0" width="${w}" height="${h}" fill="url(#key)"/>
  </g>
</svg>
`;
}

/**
 * The nine gowns.
 *
 * **Every parameter here is read off that gown's own page, not chosen for
 * variety.** This table used to be nine sets of lightly jittered numbers, and
 * the result was nine pictures of the same floor-length trapezoid sitting under
 * nine texts that described a column, a ballgown, a short sleeveless dress, a
 * long-sleeved midi, a closed back with an open one behind it and the only
 * asymmetric piece in the collection. A catalogue whose pictures contradict its
 * copy is worse than a catalogue with plain pictures: the plain one is only
 * dull, and this one was wrong.
 *
 * So each line below cites the sentence it comes from. If the copy is edited,
 * this is the second place to edit.
 */
const GOWNS = {
  // «برش ستونی، بدون حجم اضافه» + «دنباله کوتاه است» — a column, so the hem is
  // barely wider than the waist, and it does have a train; it just is short.
  sepidar: {
    cloth: "#D8D2C6", ground: GROUND.morvarid, seed: 101, beads: 55,
    gown: { shoulder: 0.30, waist: 0.20, waistY: 0.42, hem: 0.25, drop: 0.032, train: 0.5, neck: "straight", strap: 0.017 },
  },
  // «فرم آ-لاین با دنبالهٔ بلند» + «بالاتنه ساده ماند» — the widest sweep of the
  // three bridal gowns, the longest train, and the fewest beads of any of them.
  mahtab: {
    cloth: "#C8C6C9", ground: GROUND.morvarid, seed: 111, beads: 26,
    gown: { shoulder: 0.26, waist: 0.19, waistY: 0.40, hem: 0.54, drop: 0.030, train: 1.4, neck: "sweetheart" },
  },
  // «دامن پرحجم، بدون دنباله» + «بالاتنه تنگ و کوتاه است» — the largest hem in
  // the collection, no train at all, and the waist sits high because the copy
  // says the bodice is short and the boundary between the two halves is the
  // one thing that moves at a fitting.
  niloofar: {
    cloth: "#BFC1BC", ground: GROUND.morvarid, seed: 121, beads: 130,
    gown: { shoulder: 0.30, waist: 0.21, waistY: 0.35, hem: 0.68, drop: 0.055, neck: "straight" },
  },
  // «کوتاه و بدون آستین. سبک‌ترین لباس مجموعه» — the only short one. `length`
  // exists for this gown.
  shabnam: {
    cloth: "#D3CFC8", ground: GROUND.sabz, seed: 131, beads: 45,
    gown: { shoulder: 0.28, waist: 0.20, waistY: 0.40, hem: 0.36, length: 0.70, drop: 0.04, neck: "v", strap: 0.015 },
  },
  // «بلندی میدی با آستین بلند» + «آستین باریک ماند و هیچ چین یا پفی نگرفت» —
  // mid-calf, sleeved, and the sleeve drawn narrow because that is the claim.
  nastaran: {
    cloth: "#C4A9A2", ground: GROUND.sabz, seed: 141, beads: 70,
    gown: { shoulder: 0.31, waist: 0.22, waistY: 0.41, hem: 0.40, length: 0.845, drop: 0.03, neck: "high", sleeve: true },
  },
  // «بالاتنهٔ دست‌دوز روی دامن ساده» — the heaviest beading of any bodice, and
  // a skirt with nothing on it. `beadZone` defaults to the bodice, which is
  // this gown's whole argument.
  termeh: {
    cloth: "#A88B6E", ground: GROUND.sabz, seed: 151, beads: 210,
    gown: { shoulder: 0.34, waist: 0.23, waistY: 0.45, hem: 0.38, drop: 0.022, train: 0.8, neck: "sweetheart", strap: 0.02 },
  },
  // «بلند، با پشت باز. جلو کاملاً بسته است» — a closed high neckline in front;
  // the back view carries the cut. The two statements are drawn by two
  // different parameters, which is the point.
  shabaneh: {
    cloth: "#6E6572", ground: GROUND.zereshk, seed: 161, beads: 30,
    gown: { shoulder: 0.25, waist: 0.19, waistY: 0.39, hem: 0.29, drop: 0.05, neck: "high", openBack: true },
  },
  // «مهره‌دوزی دست روی کل لباس» + «بندها پهن‌تر از بقیهٔ مجموعه است» — beading
  // over every surface, and the widest straps here by a factor of three.
  aazin: {
    cloth: "#8A7080", ground: GROUND.zereshk, seed: 171, beads: 300,
    gown: { shoulder: 0.32, waist: 0.21, waistY: 0.44, hem: 0.49, drop: 0.026, neck: "straight", strap: 0.052, beadZone: "all" },
  },
  // «یک‌شانه، با درپه‌های آزاد. تنها لباس نامتقارن مجموعه» — the only `one`
  // neckline, and therefore the only single strap.
  sayeh: {
    cloth: "#6F6472", ground: GROUND.zereshk, seed: 181, beads: 60,
    gown: { shoulder: 0.27, waist: 0.20, waistY: 0.42, hem: 0.35, drop: 0.042, train: 1.0, neck: "one", strap: 0.03 },
  },
};

/**
 * The three camera moves that make a view.
 *
 * **Every crop is square in canvas fractions, and that is a correctness
 * requirement, not a style.** The catalogue canvas is already 3:4, so a crop
 * taking the same fraction of width and of height is also 3:4 — which is the
 * ratio every view declares in `products.ts`. A crop with mismatched fractions
 * produces a file whose viewBox and whose intrinsic size disagree, and the
 * browser then crops or letterboxes it to fit the declared ratio. The picture
 * still appears, which is what makes it easy to ship.
 *
 * `back` stays at the primary's distance — a back view is a walk around the
 * model, not a step closer — while `detail` and `hem` move in.
 */
const VIEWS = {
  back: { x: 0.04, y: 0.04, w: 0.92, h: 0.92, backSeam: true, seedShift: 1 },
  detail: { x: 0.26, y: 0.14, w: 0.48, h: 0.48, seedShift: 2 },
  hem: { x: 0.25, y: 0.5, w: 0.5, h: 0.5, seedShift: 3 },
};

const files = [];

for (const [name, spec] of Object.entries(GOWNS)) {
  const frame = name === "niloofar" ? FEATURE : CATALOGUE;
  files.push({
    name: `gown-${name}`,
    svg: study({ ...frame, ...spec, beads: spec.beads, crop: null }),
  });

  /* Views are always drawn on the catalogue frame, even for the feature gown
     whose primary is 4:5. The silhouette is defined in fractions so it draws
     correctly on either canvas, and every view in `products.ts` declares 3:4 —
     the thumbnail strip is a row of equals, and one gown's views being a
     different shape from the rest would be the only thing a reader noticed
     about it. */
  for (const [viewName, v] of Object.entries(VIEWS)) {
    files.push({
      name: `gown-${name}-${viewName}`,
      svg: study({
        ...CATALOGUE,
        ...spec,
        seed: spec.seed + v.seedShift,
        backSeam: Boolean(v.backSeam),
        crop: {
          x: CATALOGUE.w * v.x,
          y: CATALOGUE.h * v.y,
          w: CATALOGUE.w * v.w,
          h: CATALOGUE.h * v.h,
        },
      }),
    });
  }
}

/**
 * The non-gown slots: hero, brand, gallery, CTA.
 *
 * The hero is a gown, and a specific one — the measurement callouts in the
 * hero component anchor to fixed percentages of this frame, so the bust, waist
 * and skirt have to land where they are pointed at. Change the proportions
 * here and the callouts point at nothing.
 */
const HERO = {
  cloth: "#DCD6CA", ground: GROUND.shab, seed: 7, beads: 120,
  gown: {
    shoulder: 0.29, waist: 0.20, waistY: 0.44, hem: 0.45, drop: 0.036, train: 1.2,
    /* Sweetheart and strapped, because the three callouts name a bust, a waist
       and a bodice length, and a leader line pointing at a flat-topped shape
       with no bodice in it is pointing at nothing. */
    neck: "sweetheart", strap: 0.02,
  },
};

/* 4:3, not 3:4. The hero frame is capped against viewport height so the call
   to action stays reachable, which makes its box far wider than it is tall — a
   3:4 source was centre-cropped into a column of cloth with no shoulders and no
   hem, which is to say not a gown. At the hero's column width a 4:3 frame comes
   in just under that cap, so nothing is cropped. Declared as `4/3` in
   sections.ts; the two have to agree or the crop comes back. */
const HERO_FRAME = { w: 1600, h: 1200 };

files.push({
  name: "hero-main",
  svg: study({ ...HERO_FRAME, ...HERO, crop: null }),
});
files.push({
  name: "hero-inset",
  /* Square, per its `1/1` ratio: equal pixel spans, not equal fractions, since
     this canvas is not square to begin with. Framed on the bodice, which is
     where the inset's caption says the hand-stitching is. */
  svg: study({
    ...HERO_FRAME, ...HERO, seed: 8,
    crop: { x: HERO_FRAME.w * 0.38, y: HERO_FRAME.h * 0.1, w: 360, h: 360 },
  }),
});

/**
 * Gallery plates and the brand study: cloth, not gowns.
 *
 * The gallery is shooting fabric, hands and the room, so it keeps its own
 * single frame and its own subject. Drawn as draped cloth — overlapping folds
 * with the same satin sheen — rather than as the defocused blobs these were.
 */
function drape({ w, h, ground, cloth, seed, bands = 5 }) {
  const rand = rng(seed);
  const n = (v) => v.toFixed(1);
  const out = [];
  for (let i = 0; i < bands; i += 1) {
    const y = h * (0.12 + (i / bands) * 0.72) + (rand() - 0.5) * h * 0.05;
    const amp = h * (0.06 + rand() * 0.09);
    out.push(
      `<path d="M ${n(-w * 0.1)} ${n(y)} C ${n(w * 0.3)} ${n(y - amp)} ${n(w * 0.7)} ${n(y + amp)} ${n(w * 1.1)} ${n(y - amp * 0.4)} L ${n(w * 1.1)} ${n(h * 1.1)} L ${n(-w * 0.1)} ${n(h * 1.1)} Z" fill="${cloth}" opacity="${(0.2 + rand() * 0.3).toFixed(2)}"/>`,
    );
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  <defs>
    <linearGradient id="sheen" x1="0.88" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.22"/>
      <stop offset="48%" stop-color="#FFFFFF" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.26"/>
    </linearGradient>
    <filter id="soften" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="${(w * 0.012).toFixed(2)}"/>
    </filter>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="${seed}" result="n"/>
      <feColorMatrix type="saturate" values="0" in="n" result="g"/>
      <feComponentTransfer in="g" result="gt"><feFuncA type="linear" slope="0.18"/></feComponentTransfer>
      <feBlend in="SourceGraphic" in2="gt" mode="overlay"/>
    </filter>
  </defs>
  <g filter="url(#grain)">
    <rect width="${w}" height="${h}" fill="${ground}"/>
    <g filter="url(#soften)">
      ${out.join("\n      ")}
    </g>
    <rect width="${w}" height="${h}" fill="url(#sheen)"/>
  </g>
</svg>
`;
}

const PLATES = [
  ["gallery-01", "#DAD5CC", GROUND.shab, 41],
  ["gallery-02", "#C3BEB8", GROUND.morvarid, 43],
  ["gallery-03", "#A88B6E", GROUND.sabz, 47],
  ["gallery-04", "#CFC8BF", GROUND.shabDeep, 53],
  ["gallery-05", "#8A7080", GROUND.zereshk, 59],
  ["gallery-06", "#B08D57", GROUND.shab, 61],
  ["gallery-07", "#E0DAD1", GROUND.morvarid, 67],
  ["gallery-08", "#C8C6C9", GROUND.sabz, 71],
];

for (const [name, cloth, ground, seed] of PLATES) {
  files.push({ name, svg: drape({ w: 1000, h: 1250, cloth, ground, seed }) });
}

files.push({
  name: "values-texture",
  svg: drape({ w: 1050, h: 1400, cloth: "#B08D57", ground: GROUND.shabDeep, seed: 13, bands: 6 }),
});
files.push({
  name: "cta-field",
  svg: drape({ w: 1920, h: 1000, cloth: "#6F5834", ground: GROUND.shabDeep, seed: 73, bands: 4 }),
});

for (const file of files) {
  writeFileSync(join(outDir, `${file.name}.svg`), file.svg, "utf8");
}
console.log(`generated ${files.length} studies → public/media/`);
