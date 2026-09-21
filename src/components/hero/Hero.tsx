import { hero } from "@/content/sections";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The hero is the measurement.
 *
 * It used to be a headline beside a photograph, which is the composition every
 * atelier, every studio and every furniture brand opens with, and it said
 * nothing about this one in particular. The thesis of this business is in one
 * line of its own copy: «اندازه، نه سایز» — no gown is cut to a standard size,
 * every pattern is cut on the client's own measurements. So the first thing on
 * the page is a gown being measured.
 *
 * Three callouts sit on the silhouette — bust, waist, bodice length — each a
 * brass point with a leader line running out to its name. They arrive in
 * sequence after the headline, so the page reads: the claim, then the claim
 * being performed.
 *
 * **No numbers on the callouts.** A measurement value here would be invented
 * data about a gown that does not exist. What is shown is *which* measurements
 * are taken, which is a true statement about how the atelier works.
 *
 * Desktop composition is right-weighted: type in the first five columns — the
 * right edge in RTL, where a Persian reader starts — and the photograph running
 * off the left edge, so the eye travels from type into image along the reading
 * direction rather than against it.
 *
 * Mobile is recomposed, not compressed. The section is built from three
 * placeable blocks so the photograph can sit BETWEEN the headline and the
 * supporting copy: the reader gets the claim, then the picture, then the
 * explanation. Stacking the desktop order would bury the only image below a
 * screen and a half of text.
 */

/**
 * Where each callout attaches to the silhouette, as a percentage of the frame.
 *
 * Geometry lives here and the words live in `sections.ts`, on purpose: the
 * labels are copy an editor rewrites, the anchor points are composition
 * against a specific crop. Ordered top-down to match the reading of a body.
 */
const ANCHORS = [
  { top: "30%", from: "46%", reach: "22%" },
  { top: "44%", from: "51%", reach: "31%" },
  { top: "64%", from: "43%", reach: "17%" },
] as const;

export function Hero() {
  return (
    <section className="ground-dark on-dark relative overflow-hidden pt-8 pb-[var(--section-y-tight)] lg:pt-14">
      <div className="container">
        <div className="grid-editorial">
          {/* 1 — the claim */}
          <div className="order-1 col-span-4 flex flex-col gap-6 md:col-span-8 lg:order-none lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:self-end">
            <Reveal>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="t-display max-w-[11ch]">{hero.heading}</h1>
            </Reveal>
          </div>

          {/* 2 — the gown, measured. Bleeds off both page edges on mobile, off
                 the left edge only on desktop where the type holds the right. */}
          <div className="order-2 col-span-4 md:col-span-8 lg:order-none lg:col-start-6 lg:col-span-7 lg:row-start-1 lg:row-span-2">
            <div className="relative mx-[calc(var(--gutter)*-1)] lg:ms-0 lg:me-[calc(var(--gutter)*-1)]">
              <div className="relative">
                {/* The 4:5 crop is the preferred shape; the frame is capped
                    against viewport height so the call to action stays
                    reachable, and the image crops rather than pushing the page
                    down. */}
                <EditorialImage
                  media={hero.image}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                  className="max-h-[52vh] lg:max-h-[70vh]"
                />

                {/* The callouts. A list, not decoration: these are three real
                    statements about what the atelier does, and they read in
                    order. Hidden below `md`, where the frame is too narrow for
                    a leader line to reach anywhere without crossing the gown. */}
                <ul
                  className="pointer-events-none absolute inset-0 hidden md:block"
                  aria-label={hero.measuresLabel}
                >
                  {hero.measures.map((measure, i) => (
                    <li
                      key={measure}
                      className="measure"
                      style={
                        {
                          top: ANCHORS[i].top,
                          "--from": ANCHORS[i].from,
                          "--reach": ANCHORS[i].reach,
                          "--reveal-delay": `${520 + i * 190}ms`,
                        } as React.CSSProperties
                      }
                    >
                      <span className="measure__point" />
                      <span className="measure__leader" />
                      <span className="measure__label">{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inset study, straddling the bottom edge of the main frame on
                  the side nearest the type — half on the photograph, half on
                  the page. */}
              <figure className="absolute -bottom-14 start-10 hidden w-[30%] max-w-[13rem] lg:block">
                <EditorialImage
                  media={hero.inset}
                  sizes="13rem"
                  delay={420}
                  className="shadow-[var(--shadow-lift)]"
                />
                <figcaption className="t-meta pt-2">{hero.insetCaption}</figcaption>
              </figure>
            </div>
          </div>

          {/* 3 — the explanation and the action */}
          <div className="order-3 col-span-4 flex flex-col gap-7 md:col-span-8 lg:order-none lg:col-start-1 lg:col-span-5 lg:row-start-2 lg:self-start lg:pt-10">
            <Reveal delay={180}>
              <p className="t-lead">{hero.lead}</p>
            </Reveal>
            <Reveal delay={260}>
              <div className="flex flex-wrap items-center gap-3">
                <Button href={hero.primary.href} variant="primary">
                  {hero.primary.label}
                </Button>
                <Button href={hero.secondary.href} variant="secondary">
                  {hero.secondary.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Closing rule, sewn rather than ruled: brand label at the start of the
            line, orientation at the end. Hidden on mobile, where the fold does
            the same job. */}
        <div className="mt-16 hidden md:block lg:mt-32">
          <hr className="rule rule--stitch" />
          <div className="flex items-center justify-between gap-6 pt-4">
            <p className="t-label">{site.brand.latin} — {site.brand.latinTrade}</p>
            <p className="t-meta flex items-center gap-2">
              {hero.scrollHint}
              <svg width="12" height="16" viewBox="0 0 12 16" aria-hidden="true" focusable="false">
                <path d="M6 1v13M1 9l5 5 5-5" stroke="currentColor" strokeWidth="1.1" fill="none" />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
