import type { ResolvedProduct } from "@/types/content";

/**
 * What to show at the bottom of a product page.
 *
 * Nine gowns across three collections, so the same-category preference below
 * is live rather than aspirational: every gown has two siblings, and the pair
 * at the foot of a page is always from its own collection. The heading still
 * does not overclaim — «ادامهٔ کالکشن», not «طرح‌های مرتبط» — because sharing a
 * collection is a sequence, not a relationship anyone asserted.
 *
 * The rule, in order:
 *
 * 1. Start reading from the gown *after* this one and wrap around, so each
 *    page shows a different pair. Taking the first two of the list every time
 *    would make eight of the nine pages recommend the same two gowns.
 * 2. Prefer the same collection, which with three members each means the pair
 *    is always the other two gowns of that collection.
 */
export function relatedProducts(
  product: ResolvedProduct,
  all: readonly ResolvedProduct[],
  count = 2,
): ResolvedProduct[] {
  const position = all.findIndex((candidate) => candidate.id === product.id);
  if (position === -1) return all.slice(0, count);

  const following = [...all.slice(position + 1), ...all.slice(0, position)];

  return [
    ...following.filter((candidate) => candidate.category === product.category),
    ...following.filter((candidate) => candidate.category !== product.category),
  ].slice(0, count);
}
