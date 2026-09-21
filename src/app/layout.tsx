import type { Metadata, Viewport } from "next";
import { Gulzar, Vazirmatn } from "next/font/google";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { organizationSchema } from "@/content/schema";
import { siteRoot } from "@/lib/seo";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { TapeRule } from "@/components/signature/TapeRule";
import "./globals.css";

/**
 * Both faces are fetched at build time and served from this origin — next/font
 * self-hosts rather than linking to Google. That matters for a site aimed at
 * Iranian users: no third-party font request to be slow or blocked, and no
 * layout shift while a webfont negotiates.
 *
 * Gulzar       — NASTALIQ. The wordmark and the display headings, nothing else.
 * Vazirmatn    — neutral Persian sans. Everything else.
 *
 * **Both subsets on both faces. Do not "optimise" the display face down to
 * `arabic`** — that was tried and measured, and it makes the page slower.
 *
 * The reasoning that suggests it is sound and wrong: nothing on this site sets
 * Latin in the display face, because the Latin half of the wordmark and every
 * micro-label are `.t-label`, which is `--font-body`. Walking every route for
 * an element computing to the display face with Latin text in it finds none.
 *
 * But Google splits these faces by unicode range, and the `arabic` subset covers
 * `U+0600-06FF` and friends — **it does not contain `U+0020`**. The space
 * character, the em-dash and the rest of general punctuation live in the `latin`
 * subset. Every Persian heading on the site has spaces in it, so the browser
 * downloads that file either way. Dropping the subset only removes its
 * `<link rel="preload">`, turning an early parallel fetch into a late one
 * discovered after layout — the same bytes, arriving in time to cause a visible
 * swap on the largest type on the page.
 */
const gulzar = Gulzar({
  subsets: ["arabic", "latin"],
  /* Gulzar ships one weight and there is no bold. Every piece of display
     hierarchy on this site therefore has to come from size, never from weight —
     asking for 700 here would silently synthesise a smeared faux-bold. */
  weight: ["400"],
  variable: "--font-gulzar",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazir",
  display: "swap",
});

/**
 * Site-wide defaults only. Every route composes its own title, description,
 * canonical and social card through `pageMetadata` — see `src/lib/seo.ts` for
 * why that is centralised rather than written per page.
 *
 * `metadataBase` carries the base path, unlike the bare origin the deploy
 * workflow supplies, so any relative URL Next resolves for itself lands inside
 * the deployed site rather than at the root of the host.
 */
export const metadata: Metadata = {
  metadataBase: new URL(`${siteRoot}/`),
  title: {
    default: site.seo.title,
    template: site.seo.titleTemplate,
  },
  description: site.seo.description,
  /**
   * The half of the exclusion that a crawler obeys.
   *
   * `robots.txt` asks a crawler not to *fetch* a page; a page already known
   * from a link elsewhere can still be listed from that link alone. `noindex`
   * is a directive on the page itself and is the one that keeps it out of an
   * index. Inherited by every route, because every route composes its metadata
   * on top of this object.
   */
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  /* Must track `--color-shab`. The dark ground is the page's own colour now,
     and a themeColor left on the old cream paints a bright band above the
     status bar on a phone — the one piece of the design the CSS cannot reach. */
  themeColor: "#12131a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${gulzar.variable}`}
      /* The inline script below stamps data-js before React hydrates; that is
         the point of it, so the resulting attribute difference is expected. */
      suppressHydrationWarning
    >
      <body>
        {/* Marks the document as scripted before first paint. Scroll reveals
            are hidden only under [data-js="on"], so a failed or blocked bundle
            leaves a fully readable page instead of a blank one. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute("data-js","on")`,
          }}
        />

        <a href="#main" className="skip-link">
          {ui.skipToContent}
        </a>

        <TapeRule />

        <Header />
        <main id="main">{children}</main>
        <Footer />

        {/* Brand-level structured data, on every page because the organisation
            is a property of the site rather than of any one route. */}
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
