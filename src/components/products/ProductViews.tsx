"use client";

import { useMemo, useState } from "react";
import type { GalleryItem, MediaAsset, ResolvedProduct } from "@/types/content";
import { ui } from "@/content/ui";
import { toFa } from "@/lib/digits";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

/**
 * The other angles of one gown.
 *
 * A jar of cream is the same object from any side, so the template this derives
 * from gave each item exactly one photograph. A gown is not: the back is often
 * the decision, and a buyer who cannot see it will ask for it in the first
 * message. This strip answers that before the message.
 *
 * **It reuses `GalleryLightbox` rather than enlarging images its own way.** That
 * component already solves modal semantics, the focus trap, Escape, the inert
 * background, the RTL arrow-key direction and the counter — a second
 * implementation would be a second set of those to get wrong, and the two would
 * drift the first time one was fixed. The only work here is projecting
 * `MediaAsset[]` into the `GalleryItem[]` shape it consumes.
 *
 * Renders nothing at all when a gown has no `views`. That is a real case — the
 * field is optional and a CMS editor can save a gown with one photograph — and
 * an empty strip under an image reads as a loading failure.
 */
export function ProductViews({ product }: { product: ResolvedProduct }) {
  const [open, setOpen] = useState<number | null>(null);
  const views = product.views;

  /**
   * Primary first, then the extra views.
   *
   * Opening thumbnail 2 should land on thumbnail 2, and the enlarged view is a
   * carousel over the whole set — so the set has to include the photograph the
   * thumbnails sit beneath, or stepping backwards from the first view would
   * wrap to the last instead of reaching the image on screen.
   */
  const items = useMemo<GalleryItem[]>(() => {
    const all: MediaAsset[] = [product.image, ...(views ?? [])];
    return all.map((image, index) => ({
      id: `${product.id}-view-${index}`,
      title: product.name,
      category: product.category,
      caption: image.alt,
      image,
      order: index,
    }));
  }, [product.id, product.name, product.category, product.image, views]);

  if (!views?.length) return null;

  return (
    <>
      <ul className="view-strip" aria-label={ui.views.label}>
        {views.map((view, index) => (
          <li key={view.src} className="view-strip__item">
            {/* index + 1: `items` is primary-first, so view 0 is item 1. */}
            <button
              type="button"
              className="view-strip__button"
              onClick={() => setOpen(index + 1)}
            >
              <EditorialImage media={view} sizes="(max-width: 768px) 30vw, 12vw" />
              <span className="sr-only">
                {ui.views.open} {toFa(index + 1)}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <GalleryLightbox
        items={items}
        index={open}
        onClose={() => setOpen(null)}
        onNavigate={setOpen}
      />
    </>
  );
}
