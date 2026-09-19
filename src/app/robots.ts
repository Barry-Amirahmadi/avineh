import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/**
 * robots.txt — disallow everything.
 *
 * This is a demonstration published under a personal GitHub account, for a
 * fictional atelier. Nothing here should ever be found in a search result: a
 * brand that does not exist has no business ranking, and a prospect who finds
 * the same layout under a different name learns the wrong thing about it. The
 * root metadata in `layout.tsx` carries the same decision as a `noindex` on
 * every page, which is the half that a crawler actually obeys — see the caveat
 * below for why this file alone would not be enough.
 *
 * **A caveat worth knowing before reading anything into this file:** a crawler
 * only ever fetches `/robots.txt` from the *origin root*. On a GitHub Pages
 * project site the deployment owns `user.github.io/repo/`, not
 * `user.github.io/`, so the file generated here is served at
 * `/repo/robots.txt` and no crawler will look for it there — the rules that
 * actually apply come from whatever sits at the root, which this repository
 * does not control.
 *
 * It is generated anyway because it is correct for the two deployments that
 * matter for a template: a custom domain, and a user or organisation site. Both
 * serve this repo from the root, and there the file lands exactly where it
 * should. Nothing here needs changing when that happens.
 */
/** Required under `output: "export"` — see the note in `sitemap.ts`. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    /* `disallow: "/"` rather than the deployment's base path: a disallow is
       matched against the URL path as the crawler sees it, and "/" covers the
       whole origin on every hosting shape this template can be deployed to. */
    rules: [{ userAgent: "*", disallow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
