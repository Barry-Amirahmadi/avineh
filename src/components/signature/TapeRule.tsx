import { toFa } from "@/lib/digits";

/**
 * The measuring tape down the edge of the page.
 *
 * This is the site's signature, and it is the one place the design spends its
 * boldness. It is here because the atelier's actual claim is «اندازه، نه
 * سایز» — nothing is cut to a size, everything is cut to your measurements —
 * and the instrument that claim is made with is a tape measure. A bridal site
 * that decorates with florals is saying "wedding"; this one says "workroom",
 * which is the thing that is actually true about the business.
 *
 * **No JavaScript.** The travelling indicator is driven by
 * `animation-timeline: scroll()`, so there is no listener, no rAF loop and no
 * hydration cost, and it cannot fall out of step with the scroll position
 * because it never samples it. Where scroll-driven animations are not
 * supported the indicator simply parks at the top and the tape is still a
 * tape. See `.tape` in globals.css.
 *
 * Decorative, and marked so. It carries no information a screen reader does
 * not already get from the scrollbar, and the graduations would announce as a
 * meaningless run of numbers.
 *
 * Graduated in centimetres because that is what a tailor's tape is graduated
 * in. It is the instrument lying beside the page — it is deliberately NOT an
 * index of the page's sections, which is the decorative-numbering trap: a
 * numbered marker is only honest when the content is genuinely a sequence.
 */

/** Long graduations rendered. Covers a 2000px viewport at the token's step;
 *  anything past the fold of the tallest realistic window is clipped. */
const MARKS = 16;

export function TapeRule() {
  return (
    <div className="tape" aria-hidden="true">
      <div className="tape__indicator" />
      {Array.from({ length: MARKS }, (_, i) => (
        <span
          key={i}
          className="tape__mark"
          /* Every long graduation is four steps apart — the same relationship
             the ::before layer draws — so the numeral always lands on a long
             tick and never between two of them. */
          style={{ insetBlockStart: `calc(var(--tape-step) * 4 * ${i + 1})` }}
        >
          {toFa((i + 1) * 10)}
        </span>
      ))}
    </div>
  );
}
