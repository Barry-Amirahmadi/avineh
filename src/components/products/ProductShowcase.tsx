import { publishedProducts } from "@/content/products";
import { collectRuns } from "@/content/categories";
import { FALLBACK_TONE } from "@/content/resolveProducts";
import { showcase } from "@/content/sections";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ShadeField } from "@/components/motion/ShadeField";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ProductRow } from "./ProductRow";

/**
 * The showcase, cut into collection bands.
 *
 * Every gown used to sit on one uniform dark ground, so scrolling nine of them
 * was nine repetitions of the same picture with different words. The catalogue
 * is not one list — it is three collections, عروس then نامزدی then مجلسی — and
 * that structure was invisible because nothing on the page carried it.
 *
 * Now each run of a category is a band with its own pigment, so the ground
 * shifts under the reader as the collection changes and the boundary is felt
 * before it is read. The pigment is assigned by the order categories appear,
 * derived from the data rather than matched against the Persian labels — see
 * `collectRuns`.
 *
 * **The pigment tints the band and colours its marker. It never colours type.**
 * That restraint is the entire reason three chromas can coexist here without
 * the page turning into a swatch card.
 *
 * The category name is not printed as a band heading. Every gown already
 * carries its category in its own meta line, and a run of three gowns under a
 * heading that repeats what each of them says is the kind of duplication a
 * reader reads twice and learns nothing from the second time.
 */
export function ProductShowcase() {
  const runs = collectRuns(publishedProducts);

  return (
    <section id="products" aria-labelledby="products-heading" className="ground-dark on-dark">
      <ShadeField initialTone={publishedProducts[0]?.tone ?? FALLBACK_TONE}>
        <div className="container pt-[var(--section-y)]">
          <SectionHeading
            id="products-heading"
            eyebrow={showcase.eyebrow}
            heading={showcase.heading}
            lead={showcase.lead}
            className="mb-[var(--section-y-tight)]"
          />
        </div>

        {/* Each band paints edge to edge — a collection change the reader can
            see has to cross the whole viewport, not sit inside the container's
            gutters like a card. The container moves inside the band. */}
        {runs.map((run, runIndex) => (
          <div
            key={`${run.category}-${runIndex}`}
            className={run.pigment ? `band band--${run.pigment}` : undefined}
          >
            <div className="container py-[var(--section-y-tight)]">
              {run.items.map((product, index) => (
                <ProductRow key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        ))}

        <div className="container pb-[var(--section-y)]">
          {/* The way out of the narrative sequence and into the register. The
              nav carries the same destination, but a reader who has just
              finished the showcase should not have to go back up to find it. */}
          <Reveal className="pt-[var(--section-y-tight)]">
            <Button href={showcase.allHref} variant="secondary">
              {showcase.allLabel}
            </Button>
          </Reveal>
        </div>
      </ShadeField>
    </section>
  );
}
