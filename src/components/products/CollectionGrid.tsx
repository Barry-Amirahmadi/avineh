import type { ResolvedProduct } from "@/types/content";
import { collection } from "@/content/sections";
import { collectRuns } from "@/content/categories";
import { FALLBACK_TONE } from "@/content/resolveProducts";
import { ShadeField } from "@/components/motion/ShadeField";
import { CATALOGUE_ARRANGEMENT, CollectionItem } from "./CollectionItem";

/**
 * The collection itself.
 *
 * On the dark ground for the same reason the homepage showcase is — that is
 * where the product photography reads — and inside a ShadeField so the page
 * keeps taking the colour of the product being looked at. The signature is
 * extended to a second page here, not reimplemented: this is the same context,
 * the same registered custom property and the same two gradients.
 *
 * **Banded by collection, exactly as the homepage showcase is.** This page
 * carried a note explaining why it deliberately did not group: with five
 * single-product categories, grouping would have produced five headed groups of
 * one. That was true of the template this was forked from. It is not true here
 * — nine gowns in three categories of three — and leaving the flat list in
 * place meant the pigment system stopped at the homepage, on the one page whose
 * entire job is to show that there are three collections.
 *
 * The reveal index keeps running across the band boundaries rather than
 * restarting, so the stagger reads as one sequence down the page instead of
 * three. It is derived up front rather than counted during the render — a
 * counter incremented inside the map is a mutation the React compiler rejects,
 * and rightly: it would give a different answer on a partial re-render.
 *
 * There is no heading above the grid, and none above a band. The page's `<h1>`
 * is the masthead and each product is an `<h2>`, which is the correct outline
 * for a register of things; every gown already prints its own category in its
 * meta line, so a band heading would repeat what the three rows under it say.
 */
export function CollectionGrid({ products }: { products: ResolvedProduct[] }) {
  const runs = collectRuns(products);
  const offsets = runs.reduce<number[]>(
    (acc, run, i) => [...acc, acc[i] + run.items.length],
    [0],
  );

  return (
    <section aria-label={collection.listLabel} className="ground-dark on-dark">
      <ShadeField initialTone={products[0]?.tone ?? FALLBACK_TONE}>
        {runs.map((run, runIndex) => (
          <div
            key={`${run.category}-${runIndex}`}
            className={run.pigment ? `band band--${run.pigment}` : undefined}
          >
            <div className="container py-[var(--section-y-tight)]">
              <div className="grid-editorial collection-grid items-start">
                {/* Every product takes the same frame except the one declared
                    `feature`, which keeps the layout-driven breakout. The test
                    is the product's own `layout` value rather than its
                    position, so reordering the collection moves the breakout
                    with the product it belongs to instead of stranding it
                    wherever fifth happens to fall. */}
                {run.items.map((product, i) => (
                  <CollectionItem
                    key={product.id}
                    product={product}
                    index={offsets[runIndex] + i}
                    arrangement={
                      product.layout === "feature" ? undefined : CATALOGUE_ARRANGEMENT
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </ShadeField>
    </section>
  );
}
