"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { ResolvedProduct } from "@/types/content";
import { showcase } from "@/content/sections";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ToneSwatch } from "@/components/ui/ToneSwatch";
import { ArrowLead } from "@/components/ui/ArrowLead";
import { Reveal } from "@/components/motion/Reveal";
import { useShade } from "@/components/motion/ShadeField";
import { useInView } from "@/components/motion/useInView";
import { cn } from "@/lib/cn";

/**
 * Grid placement per layout. Column 1 is the RIGHT edge of the page, because
 * the document is RTL and grid lines are flow-relative.
 *
 * **Every spread but `feature` now uses the same five columns, and the rhythm
 * is which side the image takes.** The spans used to differ too — seven
 * columns for `wide`, four for `compact` — and read as the pictures being
 * mismatched rather than as a composed sequence. A spread alternating right,
 * left, right, left with one full-width finish is a cadence; four different
 * widths is not.
 *
 * `lg:row-start-1` on the copy is load-bearing, not tidiness. Grid's sparse
 * auto-placement never moves its cursor backwards, so a copy block asking for
 * column 1 after the media has taken columns 8–12 cannot be put beside it and
 * is pushed into a second implicit row instead — which is what silently
 * happened to `wide` and `compact`, leaving the image with an empty half beside
 * it and the copy stranded underneath. Their `self-center` was dead code all
 * along: the row it was centring in was exactly as tall as the copy itself.
 * Pinning the row is what lets `self-center` mean anything.
 */
/**
 * Four arrangements, and they have to be four.
 *
 * `compact` was a byte-for-byte copy of `wide` in the template this derives
 * from, so the "five different arrangements" the page claimed were really
 * three, and a nine-gown scroll repeated the same picture. Each one now differs
 * in column span, in which edge the image is held to, and in how much air the
 * copy gets — because a catalogue whose every row is composed the same way
 * reads as a grid no matter how good the photography is.
 *
 * Column positions are flow-relative: in RTL `col-start-1` is the RIGHT edge.
 *
 * DO NOT REMOVE `lg:row-start-1` FROM A COPY BLOCK. Grid sparse auto-placement
 * never moves its cursor backwards, so a copy block asking for a column before
 * the media it pairs with lands on the next row instead — silently, and only
 * at `lg`.
 */
const arrangements = {
  /** Held to the reading edge and bled off it — the image starts before the
   *  page does. The copy sits far across, centred against it. */
  tall: {
    media: "lg:col-start-1 lg:col-span-6 lg:ms-[calc(var(--gutter)*-1)]",
    copy: "lg:col-start-8 lg:col-span-4 lg:row-start-1 lg:self-center",
    sizes: "(max-width: 1024px) 100vw, 46vw",
  },
  /** The mirror, and wider: image on the far edge, copy baseline-aligned to the
   *  bottom of it rather than centred, so the pair does not read as `tall`
   *  flipped. */
  wide: {
    media: "lg:col-start-6 lg:col-span-7 lg:me-[calc(var(--gutter)*-1)]",
    copy: "lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:self-end lg:pb-6",
    sizes: "(max-width: 1024px) 100vw, 54vw",
  },
  /** The quiet row. A small plate set in from both edges with the copy given
   *  more width than the picture — the only arrangement where the words lead. */
  compact: {
    media: "lg:col-start-3 lg:col-span-3",
    copy: "lg:col-start-7 lg:col-span-5 lg:row-start-1 lg:self-center",
    sizes: "(max-width: 1024px) 100vw, 26vw",
  },
  /** Full bleed, with the copy ON the photograph rather than under it. Both
   *  blocks claim row 1 and column 1, so they occupy the same grid area and
   *  overlap; the scrim below keeps the type legible over whatever is there. */
  feature: {
    media: "lg:col-start-1 lg:col-span-12",
    copy: "lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:self-end lg:relative lg:z-10 lg:p-10",
    sizes: "100vw",
  },
} as const;

export function ProductRow({ product, index }: { product: ResolvedProduct; index: number }) {
  const claimShade = useShade();
  const arrangement = arrangements[product.layout];

  // Tracks the row across its whole pass through the viewport — `once: false`
  // — so the ambient shade follows the reader in both directions.
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.45,
    rootMargin: "-18% 0px -18% 0px",
    once: false,
  });

  useEffect(() => {
    if (inView) claimShade(product.tone);
  }, [inView, claimShade, product.tone]);

  const headingId = `product-${product.slug}`;
  const href = `/products/${product.slug}`;

  return (
    <article
      ref={ref}
      aria-labelledby={headingId}
      data-layout={product.layout}
      className={cn(
        "product-row grid-editorial items-start",
        index > 0 && "mt-[var(--section-y-tight)]",
      )}
    >
      <Reveal className={cn("group-media col-span-4 md:col-span-8", arrangement.media)}>
        {/* Hidden from the tab order and the accessibility tree: the text link
            below goes to the same place, and one destination deserves one stop. */}
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
          <EditorialImage media={product.image} sizes={arrangement.sizes} />
        </Link>
      </Reveal>

      <div
        className={cn(
          "col-span-4 flex flex-col gap-5 md:col-span-8",
          arrangement.copy,
        )}
      >
        <Reveal delay={80}>
          <p className="t-meta flex items-center gap-3">
            <ToneSwatch tone={product.tone} />
            {product.category}
          </p>
        </Reveal>

        <Reveal delay={140}>
          <h3 id={headingId} className="t-h2">
            {product.name}
          </h3>
        </Reveal>

        <Reveal delay={200}>
          <p className="t-body max-w-[30ch]">{product.description}</p>
        </Reveal>

        <Reveal delay={260}>
          <Link href={href} className="link-lead group-link">
            <span className="link-lead__text">{showcase.linkLabel}</span>
            <ArrowLead />
            <span className="sr-only">— {product.name}</span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
